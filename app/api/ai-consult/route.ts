import { NextRequest, NextResponse } from 'next/server'

const VENUE_LABEL: Record<string, string> = {
  hospital:   '醫療院所',
  nursing:    '長照機構',
  office:     '辦公大樓',
  restaurant: '其他',
  school:     '大學校園',
  factory:    '工廠',
  other:      '其他',
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { caseId, keyword, venue, situation, description, decisionMaker, timeline, name, contact, institution, sourceUrl, contactMethod, aiSummary } = body
    const timestamp = new Date().toISOString()

    // ── 1. Write to Notion CRM Database ──────────────────
    const NOTION_TOKEN = process.env.NOTION_TOKEN
    const NOTION_DB_ID = process.env.NOTION_CRM_DATABASE_ID

    if (NOTION_TOKEN && NOTION_DB_ID) {
      const notionPayload = {
        parent: { database_id: NOTION_DB_ID },
        properties: {
          'Case ID': { title: [{ text: { content: caseId } }] },
          '狀態': { select: { name: '新詢問' } },
          '來源網站': { select: { name: 'mcstation.ai' } },
          '來源表單': { select: { name: aiSummary ? 'AI對話顧問' : 'AI顧問診斷' } },
          '場域類型': { select: { name: VENUE_LABEL[venue] ?? venue ?? '其他' } },
          '改善目標': { rich_text: [{ text: { content: situation ?? '' } }] },
          '現有條件': { rich_text: [{ text: { content: description ?? '' } }] },
          '聯絡人': { rich_text: [{ text: { content: `${name}${institution ? `（${institution}）` : ''}` } }] },
          '聯絡方式': { phone_number: contact ?? '' },
          ...(contactMethod ? { '聯絡偏好': { rich_text: [{ text: { content: contactMethod } }] } } : {}),
          ...(decisionMaker ? { '決策角色': { rich_text: [{ text: { content: decisionMaker } }] } } : {}),
          ...(timeline ? { '評估時程': { rich_text: [{ text: { content: timeline } }] } } : {}),
          '原始資料': {
            rich_text: [{
              text: {
                content: (aiSummary
                  ? `=== AI對話摘要 ===\n${aiSummary}\n\n=== 原始資料 ===\n`
                  : '') +
                  JSON.stringify({ caseId, venue, situation, description, name, contact, institution, sourceUrl, contactMethod, timestamp }).slice(0, 1800)
              }
            }]
          },
        },
      }

      await fetch('https://api.notion.com/v1/pages', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${NOTION_TOKEN}`,
          'Notion-Version': '2022-06-28',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notionPayload),
      })
    }

    // ── 2. Forward to Yuzu-san (LINE notify + PostgreSQL) ─
    const YUZU_URL = process.env.YUZU_LEAD_WEBHOOK_URL
    if (YUZU_URL) {
      await fetch(YUZU_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caseId, keyword, venue, situation, description, decisionMaker, timeline, name, contact, institution, sourceUrl: 'mcstation.ai', timestamp }),
      }).catch(() => {}) // non-blocking
    }

    // ── 3. Fallback log ───────────────────────────────────
    console.log('[AI Consult Lead]', { caseId, venue, situation, name, contact, institution, sourceUrl, timestamp })

    return NextResponse.json({ success: true, caseId })
  } catch (err) {
    console.error('[AI Consult]', err)
    return NextResponse.json({ success: false }, { status: 500 })
  }
}
