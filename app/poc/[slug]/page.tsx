import { db, schema } from '@/lib/db'
import { eq } from 'drizzle-orm'
import { notFound } from 'next/navigation'

export default async function ReportPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [report] = await db.select().from(schema.pocReports).where(eq(schema.pocReports.slug, slug)).limit(1)
  if (!report) notFound()

  return (
    <html lang="zh-TW">
      <body
        style={{ margin: 0, padding: 0 }}
        dangerouslySetInnerHTML={{ __html: report.htmlContent }}
      />
    </html>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const [report] = await db.select({ title: schema.pocReports.title }).from(schema.pocReports).where(eq(schema.pocReports.slug, slug)).limit(1)
  return { title: report?.title ?? '龍雲內部報告' }
}
