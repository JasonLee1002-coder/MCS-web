import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { venuePrompt } from '@/lib/prompts/venue'
import { brandPrompt } from '@/lib/prompts/brand'
import { franchisePrompt } from '@/lib/prompts/franchise'
import { customPrompt } from '@/lib/prompts/custom'

export const maxDuration = 30

const systemPrompts: Record<string, string> = {
  venue: venuePrompt,
  brand: brandPrompt,
  franchise: franchisePrompt,
  custom: customPrompt,
}

export async function POST(req: Request) {
  const { messages, role = 'venue' }: { messages: UIMessage[]; role: string } = await req.json()
  const systemPrompt = systemPrompts[role] ?? systemPrompts.venue

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
