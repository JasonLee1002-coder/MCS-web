/**
 * AI 顧問人格設定（mcstation.ai）— 單一改名點。
 *
 * 2026-08-19 建立。原本「小龍」硬編在 chat-config 的 prompt、AiConsultant 的五處 UI 字串、
 * LeadConfirmCard 的確認語、以及 leak-guard 的洩漏偵測標記裡，改名要同時動四個檔案。
 *
 * ⚠️ leak-guard 用「你是「<名字>」」當作 system prompt 外洩的偵測特徵，
 *    改名時那組標記必須跟著改，否則防洩漏會漏掉新的 prompt 開頭。
 *    所以那裡直接引用 PERSONA.promptOpening，不要再寫死字串。
 */
export const PERSONA = {
  name: 'NEON',
  nickname: '小霓',
  avatar: '◈',
  /** leak-guard 偵測用：system prompt 的開頭特徵 */
  promptOpening: '你是「NEON」',
} as const;
