import { streamText, tool, convertToModelMessages, stepCountIs, type UIMessage } from 'ai'
import { anthropic } from '@ai-sdk/anthropic'
import { z } from 'zod'
import { getSystemPrompt } from '@/lib/chat-config'
import { leakGuardTransform } from '@/lib/leak-guard'
import { checkRateLimit, getClientIp } from '@/lib/rate-limit'

export const maxDuration = 30

const YUZU_BASE = process.env.YUZU_INTERNAL_URL ?? 'https://poc.mcstation.ai/yuzu'

/** 背景記錄一筆 AI 用量到 CTO 追蹤系統（與 transtep-web 共用同一套 ai-usage 端點） */
function logAiUsage(payload: Record<string, unknown>) {
  fetch(`${YUZU_BASE}/api/ai-usage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
    signal: AbortSignal.timeout(5000),
  }).catch(() => { /* silent — 不影響主流程 */ })
}

/** 收單欄位鍵 */
const LEAD_FIELD_KEYS = ['venue', 'need', 'headcount', 'name', 'contact', 'contactMethod', 'institution', 'category'] as const

/**
 * 從對話歷史（先前每輪 summarize_lead 的 output）累積已知欄位。
 * 模型有時在後續回合漏帶先前欄位；以歷史聯集為準，讓 ready 判斷穩定不倒退。
 */
function accumulateFields(messages: UIMessage[]): Record<string, string> {
  const acc: Record<string, string> = {}
  for (const m of messages ?? []) {
    for (const part of m.parts ?? []) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const p = part as any
      const out = p?.output
      if ((p?.type === 'tool-summarize_lead' || p?.type === 'dynamic-tool') && out && typeof out === 'object') {
        for (const k of LEAD_FIELD_KEYS) {
          const v = out[k]
          if (typeof v === 'string' && v.trim()) acc[k] = v
        }
      }
    }
  }
  return acc
}

export async function POST(req: Request) {
  // 輕量 rate limit：避免聊天端點被灌爆浪費 Anthropic 額度（Upstash 未設定時 fail-open）
  const ip = getClientIp(req)
  const rl = await checkRateLimit(`mcstation:chat:rl:${ip}`, 30, 60)
  if (!rl.ok) {
    return new Response(JSON.stringify({ error: 'rate_limited' }), {
      status: 429,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const { messages, sourceUrl, pageContext } = await req.json() as {
    messages: UIMessage[]
    sourceUrl?: string
    pageContext?: string
  }

  const startMs = Date.now()
  const priorFields = accumulateFields(messages)

  const result = streamText({
    model: anthropic('claude-haiku-4-5'),
    system: getSystemPrompt(pageContext),
    messages: await convertToModelMessages(messages),
    temperature: 0.3,
    maxOutputTokens: 512,
    experimental_transform: leakGuardTransform(),
    // 放寬步數：每一輪都會先呼叫 summarize_lead（工具）再產生問句，
    // 需要足夠步數才不會在送出流程被打斷。
    stopWhen: stepCountIs(6),
    tools: {
      summarize_lead: tool({
        description:
          '需求收集進度回報工具。每一輪對話都要呼叫一次，帶入「目前已知的所有欄位」（包含先前回合已問到的，一律重帶，不要因為這輪沒提到就留空）。只要使用者提過痛點/用途，一定要填入 need 欄位，不可留空。當同時具備「場域」「需求」「聯絡方式」時，將 ready 設為 true 觸發送出確認卡。',
        inputSchema: z.object({
          venue: z.string().optional().describe('場域類型，如：桃園辦公大樓、台北工廠'),
          need: z.string().optional().describe('核心需求／痛點摘要（必填：使用者一提到用途或痛點就填，例：夜班宵夜、無人取餐、SEO排名下滑）'),
          headcount: z.string().optional().describe('每日人流或出餐量估算'),
          name: z.string().optional().describe('聯絡人姓名'),
          contact: z.string().optional().describe('電話、LINE ID 或 Email'),
          contactMethod: z.enum(['LINE', '電話', 'Email']).optional().describe('偏好聯絡方式'),
          institution: z.string().optional().describe('公司或單位名稱'),
          category: z.enum(['IoT無人商店', 'SEO顧問服務']).optional().describe('業務軌別：一旦從對話內容判斷得出就務必填入，精確使用這兩個字串之一，不可自行改寫'),
          ready: z
            .boolean()
            .describe('是否已收齊「場域＋需求＋聯絡方式」可產生方案並送出（true=顯示送出確認卡）'),
        }),
        // 以「歷史聯集 + 本輪輸入」合併後的欄位，用確定性規則覆寫 LLM 回傳的 ready，
        // 只有同時具備「場域＋需求＋聯絡方式」三欄才 ready=true。
        execute: async (input) => {
          const filled = (v?: string) => typeof v === 'string' && v.trim().length > 0
          const merged: Record<string, string> = { ...priorFields }
          for (const k of LEAD_FIELD_KEYS) {
            const v = (input as Record<string, unknown>)[k]
            if (typeof v === 'string' && v.trim()) merged[k] = v
          }
          // 2026-08-18 移除「venue 長度 >= 4 就當成 need」的替代條件。
          // 那等於把字串長度當成需求的代理指標，實際造成「場域填了、需求空的」
          // 也判定收齊送出，業務收到只有場域沒有需求的單。
          // need 必須自己成立。
          const ready = filled(merged.venue) && filled(merged.need) && filled(merged.contact)
          return { ...merged, ready, confirmed: false }
        },
      }),
    },
    onFinish: ({ usage }) => {
      logAiUsage({
        service:       'anthropic',
        model:         'claude-haiku-4.5',
        callType:      'chat',
        sourceProject: 'mcstation',
        sourceFeature: 'ai-chat',
        inputTokens:   (usage as unknown as Record<string, number> | undefined)?.promptTokens ?? (usage as unknown as Record<string, number> | undefined)?.inputTokens,
        outputTokens:  (usage as unknown as Record<string, number> | undefined)?.completionTokens ?? (usage as unknown as Record<string, number> | undefined)?.outputTokens,
        latencyMs:     Date.now() - startMs,
        metadata:      { sourceUrl, pageContext },
      })
    },
  })

  return result.toUIMessageStreamResponse()
}
