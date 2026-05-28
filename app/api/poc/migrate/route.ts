import { NextRequest, NextResponse } from 'next/server'
import { neon } from '@neondatabase/serverless'

/** GET /api/poc/migrate?token=xxx — 一次性建表 */
export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get('token')
  if (token !== (process.env.POC_PASSWORD ?? 'xu4bj6D1l41le4')) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const sql = neon(process.env.DATABASE_URL!)
  await sql`
    CREATE TABLE IF NOT EXISTS poc_reports (
      id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
      title TEXT NOT NULL,
      category TEXT NOT NULL DEFAULT 'report',
      author TEXT NOT NULL DEFAULT 'CLO',
      html_content TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `
  return NextResponse.json({ ok: true, message: 'poc_reports 資料表已建立' })
}
