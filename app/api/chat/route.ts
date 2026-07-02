import { google } from '@ai-sdk/google'
import { streamText, tool, convertToModelMessages, stepCountIs, type UIMessage } from 'ai'
import { z } from 'zod'
import { BRAND_SYSTEM_PROMPTS, type Brand } from '@/lib/chat-config'

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, keyword, brand, sourceUrl } = await req.json() as {
    messages: UIMessage[]
    keyword: string
    brand: Brand
    sourceUrl: string
  }

  const result = streamText({
    model: google('gemini-2.5-flash'),
    system: BRAND_SYSTEM_PROMPTS[brand ?? 'mcstation'](keyword ?? '智慧餐飲自助化'),
    messages: await convertToModelMessages(messages),
    temperature: 0.7,
    maxOutputTokens: 512,
    stopWhen: stepCountIs(3),
    tools: {
      summarize_lead: tool({
        description: '當 AI 已收集到足夠資訊（場域、需求、聯絡人、偏好聯絡方式）時呼叫此工具',
        inputSchema: z.object({
          venue: z.string().describe('場域類型，如：台南東區商場、台北辦公大樓'),
          need: z.string().describe('核心需求摘要'),
          headcount: z.string().optional().describe('每日人流或出餐量估算'),
          name: z.string().describe('聯絡人姓名'),
          contact: z.string().describe('電話、LINE ID 或 Email'),
          contactMethod: z.enum(['LINE', '電話', 'Email']).describe('偏好聯絡方式'),
          institution: z.string().optional().describe('公司或單位名稱'),
        }),
        execute: async (input) => ({ ...input, confirmed: false }),
      }),
    },
  })

  return result.toUIMessageStreamResponse()
}
