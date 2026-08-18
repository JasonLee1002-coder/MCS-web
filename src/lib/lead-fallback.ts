/**
 * 接單備援：讓詢問單不會因為 Yuzu 掛掉而人間蒸發。
 *
 * 為什麼需要這個（2026-08-18 實查）：
 *   原本 /api/lead 的流程是「立刻回 success:true → 背景 fetch Yuzu →
 *   失敗只寫一行 console.error」。沒有重試、沒有留存、沒有告警。
 *   Yuzu 一旦逾時或重啟，客戶端看到「已送出」，而這張單不存在於任何地方，
 *   而且沒有人會知道少了幾張。對一個主要靠網路接單的站，這是最大的單點風險。
 *
 * 三層防線：
 *   1. forwardToYuzu()  — 最多送 3 次（1s / 3s 退避），涵蓋重啟與瞬斷
 *   2. writeLeadToNotionDirect() — 三次都失敗就繞過 Yuzu 直接寫 CRM。
 *      transtep 生產環境本來就有 NOTION_API_KEY + NOTION_CRM_DATABASE_ID，
 *      只是從來沒被用過。寧可重複也不要遺失：Yuzu 若其實有寫成功，
 *      這裡會產生一筆重複單，但備註欄有「備援寫入」標記可辨識、可刪；
 *      反過來遺失的單無法救回。
 *   3. alertLeadFailure() — 用 Resend 寄信通知，讓人知道發生過。
 *      連 CRM 都寫不進去時，這是最後一道。
 *
 * 備援寫入的單不做自動指派（那是 Yuzu 的邏輯），備註會註明要人工認領。
 */

const YUZU_BASE = process.env.YUZU_INTERNAL_URL ?? 'https://poc.mcstation.ai/yuzu'
const YUZU_WEBHOOK_SECRET = process.env.YUZU_WEBHOOK_SECRET

export interface LeadPayload {
  caseId: string
  keyword?: string
  venue?: string
  situation?: string
  description?: string
  name?: string
  contact?: string
  institution?: string
  sourceUrl?: string
  source?: string
  leadCategory?: string
  timestamp?: string
  contactMethod?: string
  aiSummary?: string
  TEST_MODE?: boolean
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** 場域字串 → CRM「場域類型」select，鏡射 Yuzu apps/web/src/app/api/lead/route.ts 的 mapVenueType */
function mapVenueType(venue?: string): string {
  const v = venue ?? ''
  if (/醫院|診所|醫療|藥局|健康/.test(v)) return '醫療'
  if (/辦公|大樓|公司|企業/.test(v)) return '辦公'
  if (/工廠|製造|廠房|生產線|倉庫|物流/.test(v)) return '工廠'
  if (/學校|大學|校園|教育|圖書館/.test(v)) return '校園'
  if (/車站|機場|交通|捷運|高鐵/.test(v)) return '交通'
  if (/健身|運動|球場|游泳/.test(v)) return '健身'
  if (/長照|養護|安養|護理之家/.test(v)) return '長照'
  return '其他'
}

/** 送 Yuzu，最多 attempts 次。回傳 null 代表全部失敗，字串是最後一次的失敗原因。 */
export async function forwardToYuzu(payload: LeadPayload, attempts = 3): Promise<string | null> {
  let lastErr = 'unknown'
  for (let i = 1; i <= attempts; i++) {
    try {
      const res = await fetch(`${YUZU_BASE}/api/lead`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(YUZU_WEBHOOK_SECRET ? { 'x-yuzu-secret': YUZU_WEBHOOK_SECRET } : {}),
        },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(10000),
      })
      if (res.ok) return null
      lastErr = `HTTP ${res.status} ${(await res.text()).slice(0, 200)}`
    } catch (err) {
      lastErr = err instanceof Error ? err.message : String(err)
    }
    console.warn(`[lead] Yuzu 第 ${i}/${attempts} 次失敗:`, payload.caseId, lastErr)
    if (i < attempts) await sleep(i === 1 ? 1000 : 3000)
  }
  return lastErr
}

/** 繞過 Yuzu 直接寫 Notion CRM。回傳 true 代表寫成功。 */
export async function writeLeadToNotionDirect(payload: LeadPayload, reason: string): Promise<boolean> {
  const token = process.env.NOTION_API_KEY ?? process.env.NOTION_TOKEN ?? ''
  const dbId = process.env.NOTION_CRM_DATABASE_ID ?? ''
  if (!token || !dbId) {
    console.error('[lead] 備援寫入失敗：缺 NOTION_API_KEY / NOTION_CRM_DATABASE_ID')
    return false
  }

  const note = [
    '⚠️ 備援寫入（Yuzu 轉發失敗，由 mcstation.ai 直接寫入）— 未自動指派業務，需人工認領',
    `失敗原因：${reason}`,
    payload.institution ? `機構：${payload.institution}` : '',
    payload.keyword ? `🔑 關鍵字：${payload.keyword}` : '',
    payload.venue ? `原始場域填寫：${payload.venue}` : '',
  ].filter(Boolean).join(' ｜ ')

  try {
    const res = await fetch('https://api.notion.com/v1/pages', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Notion-Version': '2022-06-28',
      },
      body: JSON.stringify({
        parent: { database_id: dbId },
        properties: {
          'Case ID':  { title: [{ text: { content: payload.caseId } }] },
          '狀態':     { select: { name: '新詢問' } },
          '來源網站': { select: { name: 'mcstation.ai' } },
          '來源表單': { select: { name: 'AI顧問診斷' } },
          '場域類型': { select: { name: mapVenueType(payload.venue) } },
          // 業務作業看板以此欄過濾，沒填就等於隱形（2026-08-18 踩過，31 筆卡了最久 19 天）
          '資料品質': { select: { name: '真實客戶' } },
          '改善目標': { rich_text: [{ text: { content: payload.situation ?? '' } }] },
          '現有條件': { rich_text: [{ text: { content: (payload.description ?? '').slice(0, 2000) } }] },
          '聯絡人':   { rich_text: [{ text: { content: payload.name ?? '' } }] },
          '聯絡方式': { rich_text: [{ text: { content: payload.contact ?? '' } }] },
          '備註':     { rich_text: [{ text: { content: note.slice(0, 2000) } }] },
          '原始資料': { rich_text: [{ text: { content: `來源：${payload.sourceUrl ?? ''}\n時間：${payload.timestamp ?? ''}` } }] },
        },
      }),
      signal: AbortSignal.timeout(10000),
    })
    if (!res.ok) {
      console.error('[lead] 備援 Notion 寫入失敗:', res.status, (await res.text()).slice(0, 300))
      return false
    }
    console.log('[lead] 備援 Notion 寫入成功:', payload.caseId)
    return true
  } catch (err) {
    console.error('[lead] 備援 Notion 寫入例外:', err)
    return false
  }
}

/** 最後一道：寄信告警。notionOk=false 代表連 CRM 都沒寫進去，這封信就是唯一的紀錄。 */
export async function alertLeadFailure(payload: LeadPayload, reason: string, notionOk: boolean): Promise<void> {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    console.error('[lead] 無法告警：缺 RESEND_API_KEY。單內容：', JSON.stringify(payload))
    return
  }
  const subject = notionOk
    ? `[mcstation 接單] Yuzu 轉發失敗，已備援寫入 CRM — ${payload.caseId}`
    : `[mcstation 接單] ⚠️ 單可能遺失：Yuzu 與 CRM 都寫入失敗 — ${payload.caseId}`

  const body = [
    subject,
    '',
    `Case ID：${payload.caseId}`,
    `姓名：${payload.name ?? ''}`,
    `聯絡：${payload.contact ?? ''}（${payload.contactMethod ?? ''}）`,
    `場域：${payload.venue ?? ''}`,
    `需求：${payload.situation ?? ''}`,
    `說明：${(payload.description ?? '').slice(0, 500)}`,
    `來源：${payload.sourceUrl ?? ''}`,
    '',
    `Yuzu 失敗原因：${reason}`,
    notionOk
      ? 'CRM 已用備援管道寫入，但沒有自動指派業務也沒有 LINE 通知，請人工認領。'
      : '⚠️ CRM 也寫入失敗。這封信是這張單唯一的紀錄，請立刻手動建檔並聯絡客戶。',
  ].join('\n')

  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: 'MCS 接單守門 <onboarding@resend.dev>',
        to: ['lcs@transtep.com', 'leechishen@gmail.com'],
        subject,
        text: body,
      }),
      signal: AbortSignal.timeout(10000),
    })
  } catch (err) {
    console.error('[lead] 告警信寄送失敗:', err, JSON.stringify(payload))
  }
}
