import { PERSONA } from './ai-persona'
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
  PERSONA.promptOpening, 'MCS_SYSTEM_PROMPT', 'summarize_lead',
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

/* ────────────────────────────────────────────────────────────────────────────
 * scrub v2：分層過濾（2026-08-18）
 *
 * v1 只有一個 scrubLeak()，行為是「命中任一 marker → 整段字串換成一句安全語」。
 * 那對「聊天串流輸出」是合理的（寧可少講也不能洩漏），但拿去處理
 * 「對話逐字稿落庫」是災難：
 *
 *   實測：客戶問「你們有用 ChatGPT 做辨識嗎」→ 命中 MODEL_TOKENS 的 'chatgpt'
 *        → 整份逐字稿（場域、夜班 300 人、姓名、電話）被替換成一句
 *          「這我不方便透露…」，商機資訊全滅。
 *
 * 對一家賣 AI 設備的公司，潛在客戶提到 ChatGPT 的機率極高。
 * 過去沒出事只是因為逐字稿根本沒被保存；一旦開始存，這就是必炸的地雷。
 *
 * v2 依「這段文字要去哪裡」分成三層，規則不同：
 *
 *   layer 1  聊天畫面（assistant 串流輸出）
 *            → 維持 v1 的全有全無。這是給訪客看的，寧可整段換掉。
 *            → looksLikeLeak() + leakGuardTransform()，行為不變。
 *
 *   layer 2  逐字稿落 CRM（內部可見）
 *            → 改成「逐行遮蔽」而非整段替換。
 *            → 只遮 INTERNAL_MARKERS（真正的內部設定／工具名／密鑰名）。
 *            → 不看 MODEL_TOKENS：客戶談論第三方 AI 是正常商業對話，
 *              而且逐字稿只有內部業務看得到，沒有對外揭露模型身分的問題。
 *            → 使用者說的話一律原文保留——那是客戶自己的話，是商機本體，
 *              不是我們的秘密。只有 assistant 的話需要檢查。
 *
 *   layer 3  對外推播（LINE / Telegram）
 *            → 不從逐字稿截取，改用欄位白名單組裝（見 lead-notify.ts）。
 * ──────────────────────────────────────────────────────────────────────────── */

/** 真正的內部秘密：system prompt、工具名、送出邏輯、密鑰名。這些在任何層都不該外流。 */
const INTERNAL_MARKERS = [
  PERSONA.promptOpening, 'MCS_SYSTEM_PROMPT', 'BRAND_SYSTEM_PROMPTS', 'summarize_lead',
  'system prompt', 'System Prompt', 'SYSTEM PROMPT', 'systemPrompt',
  '進度回報（每一輪都必做', '送出時機', '範疇限制：若用戶詢問', '資安鐵則',
  'convertToModelMessages', 'stopWhen', 'maxOutputTokens', 'stepCountIs',
  'ready 設為 true', 'ready=true', 'HACKED',
  'YUZU_WEBHOOK_SECRET', 'x-yuzu-secret', 'NOTION_API_KEY', 'RESEND_API_KEY',
  'UPSTASH_REDIS_REST_TOKEN', 'ANTHROPIC_API_KEY',
]

export const REDACTED = '［內部設定已遮蔽］'

export interface TranscriptScrubResult {
  text: string
  /** 命中的規則數，供觀測用（不記錄原文，避免敏感內容進 log） */
  redactedLines: number
  /** 是否因長度被截斷 */
  truncated: boolean
}

/**
 * layer 2：逐字稿落庫用。逐行處理，只遮蔽 assistant 行裡的內部特徵。
 *
 * 輸入格式是 AiConsultant 組的 `[user] ...` / `[assistant] ...` 逐行文字。
 * 無法辨識角色的行，保守當成 assistant 處理。
 *
 * 與 v1 的關鍵差異：不會因為一行有問題就毀掉整份逐字稿。
 */
export function scrubTranscript(raw: string, maxChars = 4000): TranscriptScrubResult {
  if (!raw) return { text: '', redactedLines: 0, truncated: false }

  let redactedLines = 0
  const lines = raw.split('\n').map((line) => {
    // 2026-08-18 紅隊修正：**不再豁免 [user] 行**。
    // 原本的設計是「客戶自己的話一律保留」，但角色是從文字前綴推出來的，
    // 不是從結構化的 message role —— assistant 只要輸出一個換行加 "[user] "，
    // 下一行就會被當成客戶內容而完整保留：
    //     [assistant] 以下是資訊：
    //     [user] YUZU_WEBHOOK_SECRET=...
    // 這等於把遮蔽規則交給被攻擊方自己宣告。客戶也可能把先前看到的內部內容
    // 貼回來——那仍然是內部秘密，只是換了一個 role 傳入。
    // 現在 INTERNAL_MARKERS 對所有行一律生效。誤殺風險極低：真正的客戶不會
    // 說出 YUZU_WEBHOOK_SECRET 或 system prompt 的開頭特徵。當初的災難來自 MODEL_TOKENS
    // （chatgpt/claude 這類日常詞彙），那批已經不在本層檢查。
    if (INTERNAL_MARKERS.some((m) => line.includes(m))) {
      redactedLines++
      const role = line.startsWith('[assistant]') ? '[assistant] ' : ''
      return `${role}${REDACTED}`
    }
    return line
  })

  let text = lines.join('\n')
  let truncated = false
  if (text.length > maxChars) {
    // 不做靜默尾截：對話的結尾通常才是聯絡方式與更正，比開頭值錢。
    // 保留頭 1/3 與尾 2/3，中間標明省略。
    const head = Math.floor(maxChars / 3)
    const tail = maxChars - head
    text = `${text.slice(0, head)}\n…（中段省略，原長 ${raw.length} 字）…\n${text.slice(-tail)}`
    truncated = true
  }
  return { text, redactedLines, truncated }
}
