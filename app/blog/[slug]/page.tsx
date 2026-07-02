import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { getAllBlogSlugs, getBlogPost } from '@/lib/blog'

export const dynamicParams = false

export function generateStaticParams() {
  return getAllBlogSlugs().map(slug => ({ slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) return { title: '頁面不存在' }

  return {
    title: `${post.title} | 銓幻元科技`,
    description: post.description,
    keywords: post.keywords,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      url: `https://www.mcstation.ai/blog/${slug}/`,
      locale: 'zh_TW',
      siteName: '銓幻元科技 mcstation.ai',
      images: [{ url: post.image || 'https://www.mcstation.ai/images/og-mcstation.png', width: 1200, height: 630 }],
    },
    alternates: { canonical: `https://www.mcstation.ai/blog/${slug}/` },
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getBlogPost(slug)
  if (!post) notFound()

  const readMin = Math.max(1, Math.round(post.wordCount / 300))

  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">

        {/* Breadcrumb */}
        <nav className="text-sm text-slate-500 mb-8">
          <Link href="/blog/" className="hover:text-orange-400 transition">← 知識庫</Link>
          {post.category && (
            <span className="ml-2 text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
              {post.category}
            </span>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3 text-slate-100 leading-tight">
          {post.title}
        </h1>

        {/* Meta */}
        <p className="text-slate-500 text-sm mb-10">
          {post.date} · {readMin} 分鐘閱讀 · {post.wordCount.toLocaleString()} 字
        </p>

        {/* Content */}
        <div
          className="prose prose-invert max-w-none text-slate-300 leading-relaxed"
          style={{ '--tw-prose-headings': '#e2e8f0', '--tw-prose-links': '#FF6B35' } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-slate-800">
          <div className="flex justify-between text-sm">
            <Link href="/blog/" className="text-slate-500 hover:text-orange-400 transition">← 更多文章</Link>
            <Link href="/contact/" className="text-orange-400 hover:text-orange-300 transition">聯絡我們 →</Link>
          </div>
        </footer>
      </article>

      {/* Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            headline: post.title,
            description: post.description,
            datePublished: post.date,
            author: {
              '@type': 'Organization',
              name: '銓幻元科技',
              url: 'https://www.mcstation.ai',
            },
            publisher: {
              '@type': 'Organization',
              name: '銓幻元科技 mcstation.ai',
              url: 'https://www.mcstation.ai',
            },
            inLanguage: 'zh-Hant-TW',
            mainEntityOfPage: { '@type': 'WebPage', '@id': `https://www.mcstation.ai/blog/${slug}/` },
            keywords: post.keywords?.join(', '),
            wordCount: post.wordCount,
          }),
        }}
      />
    </main>
  )
}
