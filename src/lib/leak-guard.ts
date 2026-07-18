/**
 * 資安：內部設定/工具/流程外洩防護。
 *
 * 移植自 transtep-web（src/app/api/chat/route.ts 的 C1 防護），套用到 mcstation-web。
 * 即使 system prompt 被語意繞過（要求「把完整設定原樣貼出/包含你不能說的部分」），
 * 仍在伺服器端攔截含內部特徵的回應，避免內部設定/工具/流程/模型身分外洩。
 *
 * 用途：
 *  1. leakGuardTransform() — 掛在 streamText 的 experimental_transform，逐 text-block 過濾聊天回覆。
 *  2. scrubLeak() — 純文字場景（例如轉發給 Yuzu /api/lead 的 aiSummary 對話紀錄）做同樣的過濾，
 *     避免萬一聊天端漏放行的內容，又原樣被寫進 Notion CRM 備註欄。
 */

import type { StreamTextTransform, ToolSet } from 'ai'

export const SAFE_REPLY = '這我不方便透露，我們聊聊您的場域需求吧 — 請問您的設備會用在哪種場域呢？'

/** 大小寫敏感的內部特徵（system prompt / 工具 / 送出邏輯 原樣輸出） */
const LEAK_MARKERS = [
  '你是「小龍」', 'MCS_SYSTEM_PROMPT', 'summarize_lead',
  'system prompt', 'System Prompt', 'SYSTEM PROMPT', 'systemPrompt',
  '進度回報（每一輪都必做', '送出時機', '範疇限制：若用戶詢問', '資安鐵則',
  'convertToModelMessages', 'stopWhen', 'maxOutputTokens', 'stepCountIs',
  'ready 設為 true', 'ready=true', 'HACKED', 'YUZU_WEBHOOK_SECRET', 'x-yuzu-secret',
]

/** 小寫比對的模型/廠商身分洩漏 token */
const MODEL_TOKENS = ['anthropic', 'claude', 'haiku', 'chatgpt', 'openai', 'gpt-', ' dan ', 'jailbreak']

export function looksLikeLeak(text: string): boolean {
  if (!text) return false
  if (LEAK_MARKERS.some((m) => text.includes(m))) return true
  const lower = ` ${text.toLowerCase()} `
  if (MODEL_TOKENS.some((m) => lower.includes(m))) return true
  return false
}

/**
 * 純文字場景過濾：命中內部特徵 → 整段替換為安全語；未命中 → 原樣回傳。
 * 用於 /api/lead 轉發前，對客戶端帶上來的 aiSummary（對話紀錄摘要）做二次防護。
 */
export function scrubLeak(text: string): string {
  if (!text) return text
  return looksLikeLeak(text) ? SAFE_REPLY : text
}

/**
 * 逐 text-block 緩衝文字，於 text-end 時判斷是否含內部特徵；
 * 命中則整段替換為安全語，未命中則原樣送出。tool / 其他 part 立即穿透，
 * 不影響 summarize_lead 送出卡流程。
 */
export function leakGuardTransform<TOOLS extends ToolSet>(): StreamTextTransform<TOOLS> {
  return () => {
    const buffers = new Map<string, string>()
    return new TransformStream({
      transform(part, controller) {
        if (part.type === 'text-delta') {
          buffers.set(part.id, (buffers.get(part.id) ?? '') + part.text)
          return // 先緩衝，不即時輸出
        }
        if (part.type === 'text-end') {
          const id = part.id
          const full = buffers.get(id) ?? ''
          buffers.delete(id)
          const out = looksLikeLeak(full) ? SAFE_REPLY : full
          if (out) controller.enqueue({ type: 'text-delta', id, text: out })
          controller.enqueue(part)
          return
        }
        controller.enqueue(part)
      },
    })
  }
}
