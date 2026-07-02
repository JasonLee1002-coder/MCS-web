import { db, schema } from './db'
import { eq, and, or, isNull, gt, desc, sql } from 'drizzle-orm'

export interface Memory {
  category: string
  subject: string | null
  content: string
  confidence: number
}

/** 載入此 session 的長期記憶（過濾過期，按 confidence 排序） */
export async function loadMemories(sessionId: string): Promise<Memory[]> {
  if (!db) return []
  const now = new Date()
  return db.select({
    category: schema.aiMemories.category,
    subject: schema.aiMemories.subject,
    content: schema.aiMemories.content,
    confidence: schema.aiMemories.confidence,
  })
    .from(schema.aiMemories)
    .where(and(
      eq(schema.aiMemories.sessionId, sessionId),
      or(isNull(schema.aiMemories.expiresAt), gt(schema.aiMemories.expiresAt, now))
    ))
    .orderBy(desc(schema.aiMemories.confidence), desc(schema.aiMemories.updatedAt))
    .limit(30)
}

/** 從對話萃取新記憶（呼叫 Gemini） */
export async function extractMemories(
  userMessage: string,
  aiResponse: string,
  role: string
): Promise<{ category: string; subject: string | null; content: string; expires_days: number | null }[]> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) return []

  const prompt = `你是一個記憶管理系統，負責從顧客與 AI 顧問的對話中萃取值得長期記憶的事實。

角色背景：這是銓幻元科技（智慧設備公司）的 AI 諮詢對話，訪客身份是「${role}」（venue=場地主, brand=品牌商, franchise=加盟者, custom=客製化需求）。

對話：
訪客：${userMessage}
AI顧問：${aiResponse}

請萃取「值得下次記住的新事實」（例如：場地類型、需求規模、預算、聯絡方式、產業類別）。
非新事實、閒聊、一般問候 → 回傳空陣列。

category 選項：preference（偏好/習慣）| need（具體需求）| constraint（限制/條件）| general（其他）
expires_days：時間性事實（「本週」「下個月」）設 7，永久事實設 null

輸出 JSON 陣列（無新事實則 []）：
[{"category":"need","subject":"場地類型","content":"訪客的場地是辦公室，約200人","expires_days":null}]`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0.1 },
        }),
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '[]'
    return JSON.parse(text)
  } catch {
    return []
  }
}

/** v5.3 矛盾檢查：新事實是否與現有記憶衝突 */
async function checkConflict(
  newFact: string,
  existingFacts: string[]
): Promise<{ conflicts: boolean; conflictIndex?: number }> {
  if (existingFacts.length === 0) return { conflicts: false }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) return { conflicts: false }

  const prompt = `判斷新事實是否與某條現有記憶直接矛盾（如態度反轉、數字大幅不同、地點改變）。
新事實：「${newFact}」
現有記憶：
${existingFacts.map((f, i) => `${i}. ${f}`).join('\n')}

輸出 JSON：{"conflicts":true/false,"conflictIndex":0或null}`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { responseMimeType: 'application/json', temperature: 0 },
        }),
      }
    )
    if (!res.ok) return { conflicts: false }
    const data = await res.json()
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'
    return JSON.parse(text)
  } catch {
    return { conflicts: false }
  }
}

/** v5.3 智慧 upsert：矛盾 → update；重複 → confidence+1；全新 → insert */
export async function upsertMemory(
  sessionId: string,
  mem: { category: string; subject: string | null; content: string; expires_days: number | null }
): Promise<void> {
  if (!db) return
  const expiresAt = mem.expires_days
    ? new Date(Date.now() + mem.expires_days * 24 * 60 * 60 * 1000)
    : null

  const existing = await db.select()
    .from(schema.aiMemories)
    .where(and(
      eq(schema.aiMemories.sessionId, sessionId),
      eq(schema.aiMemories.category, mem.category),
    ))
    .orderBy(desc(schema.aiMemories.confidence))
    .limit(5)

  if (existing.length === 0) {
    await db.insert(schema.aiMemories).values({
      sessionId,
      category: mem.category,
      subject: mem.subject,
      content: mem.content,
      expiresAt,
    }).onConflictDoNothing()
    return
  }

  const conflict = await checkConflict(mem.content, existing.map((e: { content: string }) => e.content))

  if (conflict.conflicts && conflict.conflictIndex !== undefined) {
    // 矛盾 → 覆蓋舊記憶
    const old = existing[conflict.conflictIndex]
    await db.update(schema.aiMemories)
      .set({ content: mem.content, confidence: 1, updatedAt: new Date(), expiresAt })
      .where(eq(schema.aiMemories.id, old.id))
  } else {
    // 相似 → confidence+1；全新 → insert
    const similar = existing.find((e: { content: string; id: string }) =>
      e.content.slice(0, 30) === mem.content.slice(0, 30)
    )
    if (similar) {
      await db.update(schema.aiMemories)
        .set({ confidence: sql`confidence + 1`, updatedAt: new Date() })
        .where(eq(schema.aiMemories.id, similar.id))
    } else {
      await db.insert(schema.aiMemories).values({
        sessionId,
        category: mem.category,
        subject: mem.subject,
        content: mem.content,
        expiresAt,
      }).onConflictDoNothing()
    }
  }
}

/** 處理一輪對話後非同步更新記憶（不阻塞回應） */
export function processMemoriesAsync(
  sessionId: string,
  userMessage: string,
  aiResponse: string,
  role: string
): void {
  extractMemories(userMessage, aiResponse, role).then(async (mems) => {
    for (const mem of mems) {
      await upsertMemory(sessionId, mem)
    }
  }).catch(() => {})
}
