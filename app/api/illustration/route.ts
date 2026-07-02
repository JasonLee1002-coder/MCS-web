import { NextRequest, NextResponse } from 'next/server'

export const maxDuration = 30

const PROMPTS: Record<string, string> = {
  venue: 'Photorealistic modern smart vending machine in bright office lobby, Taiwan. Teal white color scheme, professional lighting, futuristic IoT retail. 16:9 aspect ratio.',
  brand: 'Premium packaged goods displayed inside smart automated retail cabinet, modern retail Taiwan. Vibrant packaging, teal lighting, product photography style. 16:9.',
  franchise: 'Confident entrepreneur next to modern smart vending machines in busy commercial space, Taiwan. Professional portrait with technology, teal lighting. 16:9.',
  custom: 'High-tech workshop engineers assembling IoT vending equipment, Taiwan factory. Technical illustration, teal white palette, modern industrial design. 16:9.',
}

async function tryGemini(prompt: string, apiKey: string): Promise<{ data: string; mimeType: string } | null> {
  // Try experimental image generation model
  const models = ['gemini-2.0-flash-exp', 'gemini-2.0-flash-exp-image-generation']
  for (const model of models) {
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseModalities: ['IMAGE', 'TEXT'] },
          }),
          signal: AbortSignal.timeout(12000),
        }
      )
      if (!res.ok) continue
      const data = await res.json()
      const part = data.candidates?.[0]?.content?.parts?.find(
        (p: { inlineData?: { mimeType: string; data: string } }) => p.inlineData
      )
      if (part?.inlineData) return { data: part.inlineData.data, mimeType: part.inlineData.mimeType }
    } catch {
      continue
    }
  }
  return null
}

async function tryImagen(prompt: string, apiKey: string): Promise<{ data: string; mimeType: string } | null> {
  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          instances: [{ prompt }],
          parameters: { sampleCount: 1, aspectRatio: '16:9' },
        }),
        signal: AbortSignal.timeout(15000),
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const prediction = data.predictions?.[0]
    if (prediction?.bytesBase64Encoded) {
      return {
        data: prediction.bytesBase64Encoded,
        mimeType: prediction.mimeType ?? 'image/png',
      }
    }
  } catch {
    // timeout or error
  }
  return null
}

export async function GET(req: NextRequest) {
  const role = req.nextUrl.searchParams.get('role') ?? 'venue'
  const prompt = PROMPTS[role] ?? PROMPTS.venue
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) return NextResponse.json({ error: 'no key' }, { status: 500 })

  // Try Imagen 3 first (most reliable for image gen), then Gemini
  const result = (await tryImagen(prompt, apiKey)) ?? (await tryGemini(prompt, apiKey))

  if (!result) {
    return NextResponse.json({ error: 'no image' }, { status: 500 })
  }

  const buffer = Buffer.from(result.data, 'base64')
  return new NextResponse(buffer, {
    headers: {
      'Content-Type': result.mimeType,
      'Cache-Control': 'public, max-age=86400',
    },
  })
}
