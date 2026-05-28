import { NextRequest, NextResponse } from 'next/server'
import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'

const POC_PASSWORD = process.env.POC_PASSWORD ?? 'xu4bj6D1l41le4'

function auth(req: NextRequest) {
  const token = req.headers.get('x-poc-token') ?? req.cookies.get('poc_token')?.value
  return token === POC_PASSWORD
}

/** GET /api/poc — list all reports */
export async function GET(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const rows = await db.select({
    id: schema.pocReports.id,
    title: schema.pocReports.title,
    category: schema.pocReports.category,
    author: schema.pocReports.author,
    slug: schema.pocReports.slug,
    createdAt: schema.pocReports.createdAt,
  }).from(schema.pocReports).orderBy(schema.pocReports.createdAt)
  return NextResponse.json(rows)
}

/** POST /api/poc — publish a report */
export async function POST(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const { title, category, author, htmlContent, slug } = await req.json()
  if (!title || !htmlContent || !slug) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }
  const [row] = await db.insert(schema.pocReports).values({
    title, category: category ?? 'report', author: author ?? 'CLO', htmlContent, slug,
  }).returning()
  return NextResponse.json({ id: row!.id, slug: row!.slug }, { status: 201 })
}

/** DELETE /api/poc?id=xxx — delete a report */
export async function DELETE(req: NextRequest) {
  if (!auth(req)) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  const id = req.nextUrl.searchParams.get('id')
  if (!id) return NextResponse.json({ error: 'Missing id' }, { status: 400 })
  await db.delete(schema.pocReports).where(eq(schema.pocReports.id, id))
  return NextResponse.json({ ok: true })
}
