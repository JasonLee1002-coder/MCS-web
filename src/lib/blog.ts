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

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(blogDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);

  const processed = await remark().use(gfm).use(html).process(markdown);

  // Extract headings and inject anchor IDs
  const toc: TocItem[] = [];
  const idCount: Record<string, number> = {};
  const contentHtml = processed.toString().replace(
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
