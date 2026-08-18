import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'
import { scrubLeak } from '@/lib/leak-guard'
import { forwardToYuzu, writeLeadToNotionDirect, alertLeadFailure, type LeadPayload } from '@/lib/lead-fallback'

/**
 * 判斷是否為「有效聯絡方式」。無聯絡卻仍派單是下游死單主因，
 * 前端 buildLead 缺聯絡時會填佔位字串（待業務致電確認），也可能出現
 * 000、待確認 等無效值 → 一律視為無效。
 * 有效條件：Email／電話（≥8 碼數字）／LINE ID（僅當 contactMethod==='LINE' 且整串符合格式）任一。
 * （邏輯移植自 transtep-web src/app/api/ai-consult/route.ts；2026-07-19 修正 LINE 規則誤放行 test@/not sure yet 等假聯絡方式）
 */
function hasValidContact(raw: unknown, contactMethod?: unknown): boolean {
  const c = (typeof raw === 'string' ? raw : '').trim()
  if (!c) return false
  const PLACEHOLDERS = [
    '待業務致電確認', '待確認', '待確認場域', '現場聯絡人', '未提供', '無', 'n/a', 'na', '-',
    '不確定', '不知道', '看情況', 'not sure', 'not sure yet', 'unsure', 'maybe', 'idk', 'tbc', 'to be confirmed',
  ]
  if (PLACEHOLDERS.includes(c.toLowerCase()) || PLACEHOLDERS.includes(c)) return false
  const digits = c.replace(/\D/g, '')
  if (digits.length > 0 && /^0+$/.test(digits) && !/[a-zA-Z@]/.test(c)) return false // 000 之類
  const looksEmail = /\S+@\S+\.\S+/.test(c)
  const looksPhone = digits.length >= 8
  // LINE ID 只在使用者實際選 LINE 時才啟用，且要求整串符合格式（不是 contains-any-char）
  const looksLine = contactMethod === 'LINE' && /^[a-zA-Z0-9_.]{4,20}$/.test(c.replace(/\s/g, ''))
  return looksEmail || looksPhone || looksLine
}

/**
 * POST /api/lead
 *
 * 收到 LeadConfirmCard 送出後立即回應 200，
 * 背景轉發給 Yuzu /api/lead，由 Yuzu 統一處理：
 *   1. LINE Flex Message → Jason + 業務
 *   2. Notion CRM 寫入（含自動指派負責業務）
 *   3. PostgreSQL leads 表
 *   4. BD 追蹤案建立
 *
 * 三道防護：
 *   - rate limit（Upstash，60 秒 5 次／IP）
 *   - 假聯絡方式防呆（hasValidContact）
 *   - leak-guard（aiSummary 對話紀錄二次過濾，避免內部設定外洩進 Notion 備註）
 */
export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const rl = await checkRateLimit(`mcstation:lead:rl:${ip}`, 5, 60)
  if (!rl.ok) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let data: Record<string, unknown>
  try {
    data = await req.json()
  } catch {
    return NextResponse.json({ error: 'invalid json' }, { status: 400 })
  }

  const contactOk = hasValidContact(data.contact, data.contactMethod)
  const caseId = typeof data.caseId === 'string' && data.caseId ? data.caseId : `MCS-${Date.now()}`

  const response = NextResponse.json({
    success: true,
    caseId,
    testMode: !!data.testMode,
    needs_contact: !contactOk,
  })

  // 測試模式（前端帶 ?test=1）：只回 200 + 記 log，不轉發 Yuzu，避免污染 LINE / Notion CRM
  if (data.testMode) {
    console.log('[lead][TEST]', caseId, `venue="${data.venue ?? ''}"`, `needs_contact=${!contactOk}`, '→ 已略過 Yuzu 轉發')
    return response
  }

  // 無有效聯絡方式 → 標記 needs_contact，僅記錄、不進正式派單佇列（不轉發 Yuzu），
  // 避免下游收到「無法聯絡」的死單。有聯絡的 lead 才照常送 Yuzu。
  if (!contactOk) {
    console.warn('[lead][NEEDS_CONTACT]', caseId, `venue="${data.venue ?? ''}"`, `contact="${data.contact ?? ''}"`, '→ 待補聯絡，未派單')
    return response
  }

  const payload: LeadPayload = {
    caseId,
    keyword:       typeof data.keyword === 'string' ? data.keyword : '',
    venue:         data.venue as string | undefined,
    situation:     data.situation as string | undefined,
    description:   (data.description as string | undefined) ?? '',
    name:          data.name as string | undefined,
    contact:       data.contact as string | undefined,
    institution:   (data.institution as string | undefined) ?? '',
    sourceUrl:     (data.sourceUrl as string | undefined) ?? 'mcstation.ai',
    source:        'mcstation.ai',
    leadCategory:  (data.leadCategory as string | undefined) ?? 'IoT無人商店',
    timestamp:     new Date().toISOString(),
    contactMethod: data.contactMethod as string | undefined,
    aiSummary:     scrubLeak(typeof data.aiSummary === 'string' ? data.aiSummary : '').slice(0, 2000),
    TEST_MODE:     !!data.YUZU_TEST_MODE, // 內部驗測用：Yuzu 端驗證格式但不寫入 CRM/LINE
  }

  after(async () => {
    // 2026-08-18：原本只送一次，失敗只寫 console.error —— 客戶端已看到「已送出」，
    // 單子卻不存在於任何地方。改為重試三次 → 直接寫 CRM → 寄信告警。
    const reason = await forwardToYuzu(payload)
    if (reason === null) {
      console.log('[lead]', caseId, `venue="${data.venue ?? ''}"`, '→ Yuzu ✓')
      return
    }
    console.error('[lead] Yuzu 轉發三次皆失敗:', caseId, reason)
    const notionOk = await writeLeadToNotionDirect(payload, reason)
    await alertLeadFailure(payload, reason, notionOk)
  })

  return response
}
