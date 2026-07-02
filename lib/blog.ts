import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import remarkHtml from 'remark-html'

const blogDir = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  date: string
  description: string
  keywords: string[]
  category: string
  image: string
  contentHtml: string
  wordCount: number
}

export function getAllBlogSlugs(): string[] {
  if (!fs.existsSync(blogDir)) return []
  return fs
    .readdirSync(blogDir)
    .filter(f => f.endsWith('.md'))
    .map(f => f.replace(/\.md$/, ''))
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`)
  if (!fs.existsSync(filePath)) return null

  const file = fs.readFileSync(filePath, 'utf-8')
  const { data, content } = matter(file)
  const processed = await remark().use(remarkGfm).use(remarkHtml).process(content)
  const contentHtml = processed.toString()

  const cjkCount = (content.match(/[\u4e00-\u9fff]/g) || []).length
  const engWords = content.replace(/[\u4e00-\u9fff]/g, ' ').split(/\s+/).filter(w => /[a-zA-Z]{2,}/.test(w)).length
  const wordCount = cjkCount + engWords

  return {
    slug,
    title: data.title ?? '',
    date: data.date ?? '',
    description: data.description ?? '',
    keywords: data.keywords ?? [],
    category: data.category ?? '',
    image: data.image ?? '/images/og-mcstation.png',
    contentHtml,
    wordCount,
  }
}
