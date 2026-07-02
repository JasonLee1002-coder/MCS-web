import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'

const YUZU_BASE = process.env.YUZU_INTERNAL_URL ?? 'https://poc.mcstation.ai/yuzu'

/**
 * POST /api/ai-consult
 *
 * 收到 LeadConfirmCard 送出後立即回應 200，
 * 背景轉發給 Yuzu /api/lead，由 Yuzu 統一處理：
 *   1. LINE Flex Message → Jason + Monique
 *   2. Notion CRM 寫入（含自動指派 負責業務）
 *   3. PostgreSQL leads 表
 *   4. BD 追蹤案建立
 */
export async function POST(req: NextRequest) {
  const data = await req.json()
  const response = NextResponse.json({ success: true, caseId: data.caseId })

  after(async () => {
    try {
      await fetch(`${YUZU_BASE}/api/lead`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          caseId:       data.caseId,
          keyword:      data.keyword ?? '',
          venue:        data.venue,
          situation:    data.situation,
          description:  data.description ?? '',
          name:         data.name,
          contact:      data.contact,
          institution:  data.institution ?? '',
          sourceUrl:    data.sourceUrl ?? 'mcstation.ai',
          source:       'mcstation.ai',
          timestamp:    new Date().toISOString(),
          contactMethod: data.contactMethod,
          aiSummary:    data.aiSummary ?? '',
        }),
        signal: AbortSignal.timeout(10000),
      })
      console.log('[ai-consult]', data.caseId, `keyword="${data.keyword}"`, '→ Yuzu ✓')
    } catch (err) {
      console.error('[ai-consult] Yuzu forward failed:', err)
    }
  })

  return response
}
