import { NextRequest, NextResponse } from 'next/server'
import { after } from 'next/server'

const NOTION_DB_ID = process.env.NOTION_CRM_DATABASE_ID ?? ''
const YUZU_BASE   = process.env.YUZU_INTERNAL_URL ?? 'https://poc.mcstation.ai/yuzu'

// 場域文字 → Notion Select（符合 LEAD_CRM_SPEC）
function mapVenue(venue: string): string {
  if (/醫院|醫療|診所|長照|護理/.test(venue)) return '醫療'
  if (/辦公|商辦|大樓/.test(venue))           return '辦公'
  if (/工廠|製造|廠區|倉儲/.test(venue))       return '工廠'
  if (/大學|校園|學校/.test(venue))            return '校園'
  if (/機場|捷運|車站|交通/.test(venue))       return '交通'
  if (/健身|運動|體育/.test(venue))            return '健身'
  if (/餐廳|餐飲|廚房/.test(venue))           return '餐飲'
  return '其他'
}

// 人流文字 → Notion Select
function mapHeadcount(h: string): string {
  const n = parseInt(h.replace(/[^0-9]/g, ''))
  if (isNaN(n))  return ''
  if (n < 100)   return '<100'
  if (n < 500)   return '100-500'
  if (n < 2000)  return '500-2000'
  if (n < 5000)  return '2000-5000'
  return '5000+'
}

async function writeToNotion(data: Record<string, unknown>): Promise<string | null> {
  const token = process.env.NOTION_API_KEY
  if (!token || !NOTION_DB_ID) { console.warn('[ai-consult] NOTION_API_KEY or DB_ID not set'); return null }

  const venueSelect     = mapVenue(data.venue as string)
  const headcountSelect = mapHeadcount((data.description as string) ?? '')

  const props: Record<string, unknown> = {
    'Case ID':   { title: [{ text: { content: data.caseId as string } }] },
    '狀態':      { select: { name: '新詢問' } },
    '來源網站':  { select: { name: 'mcstation.ai' } },
    '來源表單':  { select: { name: 'AI對話顧問' } },
    '改善目標':  { rich_text: [{ text: { content: (data.situation as string) ?? '' } }] },
    '聯絡人':    { rich_text: [{ text: { content: (data.name as string) ?? '' } }] },
    '現有條件':  { rich_text: [{ text: { content: `${data.institution ?? ''}｜${data.contactMethod} ${data.contact}` } }] },
    '原始資料':  {
      rich_text: [{
        text: {
          content: (data.aiSummary
            ? `=== 對話摘要 ===\n${data.aiSummary}\n\n=== 原始資料 ===\n`
            : '') + JSON.stringify(data).slice(0, 1800)
        }
      }]
    },
  }
  if (venueSelect)     props['場域類型'] = { select: { name: venueSelect } }
  if (headcountSelect) props['每日人流'] = { select: { name: headcountSelect } }

  const res = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ parent: { database_id: NOTION_DB_ID }, properties: props }),
  })
  if (!res.ok) {
    console.error('[ai-consult] Notion error', res.status, await res.text())
    return null
  }
  const json = await res.json() as { url?: string }
  return json.url ?? null
}

// Forward to Yuzu /api/lead → Flex Message + BD 追蹤
async function notifyYuzu(data: Record<string, unknown>, notionUrl: string | null) {
  const notionLink = notionUrl
    ? `\n\n📋 Notion 指派連結：\n${notionUrl}\n👆 Monique 點此指派業務`
    : ''

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
        sourceUrl:    'mcstation.ai',
        timestamp:    new Date().toISOString(),
        source:       'mcstation.ai',
        notionUrl:    notionUrl ?? '',
        notionLink,
      }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (err) {
    console.error('[ai-consult] Yuzu forward failed:', err)
  }
}

export async function POST(req: NextRequest) {
  const data = await req.json()
  const response = NextResponse.json({ success: true, caseId: data.caseId })

  after(async () => {
    const notionUrl = await writeToNotion(data)
    await notifyYuzu(data, notionUrl)
    console.log('[ai-consult]', data.caseId, `keyword="${data.keyword}"`, '→ Notion', notionUrl ? '✓' : '✗')
  })

  return response
}
