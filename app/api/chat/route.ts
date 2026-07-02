import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { venuePrompt } from '@/lib/prompts/venue'
import { brandPrompt } from '@/lib/prompts/brand'
import { franchisePrompt } from '@/lib/prompts/franchise'
import { customPrompt } from '@/lib/prompts/custom'
import { loadMemories, processMemoriesAsync } from '@/lib/ai-memory'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { sendLeadEmail } from '@/lib/lead-email'

export const maxDuration = 30

const systemPrompts: Record<string, string> = {
  venue: venuePrompt,
  brand: brandPrompt,
  franchise: franchisePrompt,
  custom: customPrompt,
}

const roleLabels: Record<string, string> = {
  venue: '場地主',
  brand: '品牌商',
  franchise: '加盟合作',
  custom: '客製化',
}

/** 從 AI 回應中萃取聯絡資訊 */
function extractContact(text: string): { name?: string; contact?: string } {
  const nameMatch = text.match(/(?:姓名|您好|先生|小姐|稱呼)[：:是]?\s*([^\s,，。！？]+(?:先生|小姐|總|董|經理)?)/u)
  const phoneMatch = text.match(/0[0-9]{9}/)
  const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[a-z]{2,}/i)
  return {
    name: nameMatch?.[1],
    contact: phoneMatch?.[0] ?? emailMatch?.[0],
  }
}

/** 轉發 lead 到 Yuzu-san（Notion CRM + PostgreSQL + LINE push） */
async function forwardToYuzu(payload: {
  role: string;
  actualName: string | null;
  actualContact: string | null;
  capturedInfo: Record<string, string>;
  allText: Array<{ role: string; content: string }>;
}): Promise<void> {
  const yuzuUrl = process.env.YUZU_LEAD_WEBHOOK_URL;
  if (!yuzuUrl) return;

  const { role, actualName, actualContact, capturedInfo, allText } = payload;
  const description = allText.map(m => `[${m.role}] ${m.content}`).join('\n').slice(0, 500);
  const caseId = `MCS-${Date.now()}`;

  try {
    await fetch(`${yuzuUrl}/api/lead`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        caseId,
        venue: capturedInfo.venueType ?? role,
        situation: capturedInfo.cooperationModel ?? role,
        description,
        name: actualName ?? '',
        contact: actualContact ?? '',
        institution: capturedInfo.brandCategory ?? '',
        sourceUrl: 'mcstation.ai/ai-advisor',
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (e) {
    console.error('[mcstation→yuzu] forward failed:', e);
  }
}

/** 發 LINE 通知給 Jason */
async function notifyLine(message: string): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN
  const userId = process.env.OWNER_LINE_USER_ID
  if (!token || !userId) return
  await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      to: userId,
      messages: [{ type: 'text', text: message }],
    }),
  })
}

export async function POST(req: Request) {
  const {
    messages,
    role = 'venue',
    sessionId,
  }: { messages: UIMessage[]; role: string; sessionId?: string } = await req.json()

  const basePrompt = systemPrompts[role] ?? systemPrompts.venue

  // 注入長期記憶
  let systemPrompt = basePrompt
  if (sessionId && process.env.DATABASE_URL) {
    try {
      const memories = await loadMemories(sessionId)
      if (memories.length > 0) {
        const memBlock = memories
          .map(m => `- ${m.subject ? `[${m.subject}] ` : ''}${m.content}`)
          .join('\n')
        systemPrompt = `${basePrompt}

【你記得這位訪客的事（過去對話累積）】
${memBlock}

根據以上記憶，主動跳過重複詢問，直接切入他們的需求。`
      }
    } catch {
      // 降級為無記憶模式
    }
  }

  // Gemini 要求對話以 user 開頭
  const filtered = messages.filter((m) => m.id !== 'welcome')
  const firstUserIdx = filtered.findIndex((m) => m.role === 'user')
  const modelMessages = firstUserIdx >= 0 ? filtered.slice(firstUserIdx) : filtered

  if (modelMessages.length === 0) {
    return new Response('No user message', { status: 400 })
  }

  const lastUserMsg = [...modelMessages].reverse().find(m => m.role === 'user')
  const userText = lastUserMsg?.parts
    .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
    .map(p => p.text).join('') ?? ''

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(modelMessages),
    onFinish: async ({ text }) => {
      // 1. 萃取並儲存記憶
      if (sessionId && userText && process.env.DATABASE_URL) {
        processMemoriesAsync(sessionId, userText, text, role)
      }

      // 2. 儲存對話 + 偵測聯絡資訊
      if (sessionId && db) {
        try {
          // 合併所有訊息文字存入 DB
          const allText = modelMessages.map(m => {
            const t = m.parts.filter((p): p is { type: 'text'; text: string } => p.type === 'text').map(p => p.text).join('')
            return { role: m.role as string, content: t }
          })
          allText.push({ role: 'assistant', content: text })

          // 從用戶訊息累積萃取聯絡資訊
          const allUserText = allText.filter(m => m.role === 'user').map(m => m.content).join(' ')
          const { name, contact } = extractContact(allUserText)

          // upsert conversation
          const existing = await db.select({ id: schema.conversations.id })
            .from(schema.conversations)
            .where(eq(schema.conversations.sessionId, sessionId))
            .limit(1)

          if (existing.length > 0) {
            await db.update(schema.conversations)
              .set({
                messages: allText as any,
                ...(name && { leadName: name }),
                ...(contact && { leadContact: contact }),
                updatedAt: new Date(),
              })
              .where(eq(schema.conversations.sessionId, sessionId))
          } else {
            await db.insert(schema.conversations).values({
              sessionId,
              role,
              messages: allText as any,
              ...(name && { leadName: name }),
              ...(contact && { leadContact: contact }),
            })
          }

          // 3. 偵測 AI 回應中的 contact_captured JSON（最精確的觸發點）
          const contactJsonMatch = text.match(/\|\|\|JSON:(.*?)\|\|\|/)
          let capturedInfo: Record<string, string> = {}
          if (contactJsonMatch) {
            try { capturedInfo = JSON.parse(contactJsonMatch[1]) } catch { /* ignore */ }
          }

          // 從 JSON 中優先取聯絡資訊，否則用正則萃取的結果
          const finalName = capturedInfo.leadName || name || null
          const finalContact = capturedInfo.leadContact || contact || null
          const isContactCaptured = capturedInfo.stage === 'contact_captured'

          // 更新 DB 中的聯絡資訊
          if (finalName || finalContact) {
            await db.update(schema.conversations)
              .set({
                ...(finalName && { leadName: finalName }),
                ...(finalContact && { leadContact: finalContact }),
                updatedAt: new Date(),
              })
              .where(eq(schema.conversations.sessionId, sessionId))
          }

          // 4. contact_captured → 發 LINE + Email（一次性，不重複）
          if (isContactCaptured && finalContact) {
            const conv = await db.select({
              notifiedAt: schema.conversations.notifiedAt,
              leadName: schema.conversations.leadName,
              leadContact: schema.conversations.leadContact,
            })
              .from(schema.conversations)
              .where(eq(schema.conversations.sessionId, sessionId))
              .limit(1)

            const alreadyNotified = conv[0]?.notifiedAt != null

            if (!alreadyNotified) {
              const actualName = conv[0]?.leadName ?? finalName
              const actualContact = conv[0]?.leadContact ?? finalContact

              // LINE 即時通知
              if (process.env.LINE_CHANNEL_ACCESS_TOKEN) {
                const roleName = roleLabels[role] ?? role
                const msg = `🔔 MCS 新詢問\n身份：${roleName}\n姓名：${actualName ?? '未取得'}\n聯絡：${actualContact}\n\n📋 追蹤表：https://docs.google.com/spreadsheets/d/18ztvHiFz57aNnsgaBB1DpTzhgk5Ggix86BwooHk4AcU/edit\n\n請在 24 小時內跟進！`
                await notifyLine(msg)
              }

              // Email 通知（含 AI 分析 + 完整對話）
              if (process.env.RESEND_API_KEY) {
                const { venueType, brandCategory, investmentScale, requirement, cooperationModel } = capturedInfo
                const extraInfo: Record<string, string> = {}
                if (venueType) extraInfo['場地類型'] = venueType
                if (brandCategory) extraInfo['品牌類別'] = brandCategory
                if (investmentScale) extraInfo['投資規模'] = investmentScale
                if (requirement) extraInfo['客製需求'] = requirement
                if (cooperationModel) extraInfo['合作模式偏好'] = cooperationModel

                await sendLeadEmail({
                  sessionId,
                  role,
                  leadName: actualName,
                  leadContact: actualContact,
                  conversation: allText,
                  extraInfo,
                })
              }

              // 轉發到 Yuzu（Notion CRM + PostgreSQL）
              await forwardToYuzu({
                role,
                actualName,
                actualContact,
                capturedInfo,
                allText,
              });

              // 標記已通知
              await db.update(schema.conversations)
                .set({ notifiedAt: new Date() })
                .where(eq(schema.conversations.sessionId, sessionId))
            }
          }
        } catch {
          // DB 操作失敗不影響主流程
        }
      }
    },
  })

  return result.toUIMessageStreamResponse()
}
