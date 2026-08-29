import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface FaqItem {
  q: string;
  a: string;
}

export interface TocItem {
  text: string;
  level: number;
  id: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  image?: string;
  faq?: FaqItem[];
  content: string;
  toc: TocItem[];
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  image?: string;
}

export function getAllBlogSlugs(): string[] {
  return fs
    .readdirSync(blogDir)
    .filter((f) => f.endsWith(".md"))
    .map((f) => f.replace(/\.md$/, ""));
}

export function getAllBlogPosts(): BlogPostMeta[] {
  const slugs = getAllBlogSlugs();
  return slugs
    .map((slug) => {
      const filePath = path.join(blogDir, `${slug}.md`);
      const raw = fs.readFileSync(filePath, "utf-8");
      const { data } = matter(raw);
      return {
        slug,
        title: data.title || slug,
        date: data.date || "2026-01-01",
        description: data.description || "",
        keywords: data.keywords || [],
        image: data.image,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));
}

export function getAdjacentPosts(slug: string): {
  prev: BlogPostMeta | null;
  next: BlogPostMeta | null;
} {
  const posts = getAllBlogPosts();
  const index = posts.findIndex((p) => p.slug === slug);
  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

export function getRelatedPosts(slug: string, limit = 3): BlogPostMeta[] {
  const posts = getAllBlogPosts();
  const current = posts.find((p) => p.slug === slug);
  if (!current) return [];
  const currentKeywords = new Set(current.keywords);
  return posts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.keywords.filter((k) => currentKeywords.has(k)).length,
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((r) => r.post);
}

// 回傳 null 而不是讓 readFileSync 拋 ENOENT：在 Server Component 裡未捕捉的例外
// 會被 Next.js 當成伺服器錯誤，對不存在的 slug 回 HTTP 500 而不是 404。
// 爬蟲（含 GPTBot/ClaudeBot 等 AI 爬蟲）遇到 5xx 會判定站台不穩並降低抓取頻率，
// 對小站傷害尤其大，所以這裡一律走 notFound() 路徑。（2026-08-18 修）
export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  const filePath = path.join(blogDir, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);

  const processed = await remark().use(gfm).use(html).process(markdown);

  // 內文的 H1 一律降成 H2（2026-08-29）
  //
  // 頁面模板已經用文章標題算繪了一個 <h1>，而 107 篇裡有 18 篇的 markdown 內文
  // 又以「# 同一個標題」開頭——結果那 18 頁有兩個 <h1>，而且文字一模一樣。
  // 一頁兩個 H1 會讓搜尋引擎與 AI 抓不準這頁的主題，對 AI 摘要更不利。
  // 線上抽驗 40 頁抓到 7 頁中招（17.5%），與檔案層的 18/107 比例吻合。
  //
  // 修在這裡而不是逐篇改 markdown：這是模板層的問題，改一次連未來新寫的文章
  // 一起保護；逐篇改只解決今天這 18 篇，下一篇照樣會再犯。
  const demoted = processed.toString().replace(/<h1>([\s\S]*?)<\/h1>/g, "<h2>$1</h2>");

  // Extract headings and inject anchor IDs
  const toc: TocItem[] = [];
  const idCount: Record<string, number> = {};
  const contentHtml = demoted.replace(
    /<(h[23])>(.*?)<\/h[23]>/g,
    (_, tag: string, content: string) => {
      const level = parseInt(tag[1]);
      const text = content.replace(/<[^>]+>/g, "").trim();
      let id = text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\u4e00-\u9fffA-Za-z0-9\-]/g, "")
        .substring(0, 60);
      if (!id) id = `heading-${toc.length}`;
      idCount[id] = (idCount[id] || 0) + 1;
      if (idCount[id] > 1) id = `${id}-${idCount[id]}`;
      toc.push({ text, level, id });
      return `<${tag} id="${id}">${content}</${tag}>`;
    }
  );

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-01-01",
    description: data.description || "",
    keywords: data.keywords || [],
    image: data.image,
    faq: data.faq || undefined,
    content: contentHtml,
    toc,
  };
}
