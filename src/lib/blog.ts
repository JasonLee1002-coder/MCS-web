import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import gfm from "remark-gfm";

const blogDir = path.join(process.cwd(), "content", "blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  description: string;
  keywords: string[];
  image?: string;
  content: string;
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

export async function getBlogPost(slug: string): Promise<BlogPost> {
  const filePath = path.join(blogDir, `${slug}.md`);
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: markdown } = matter(raw);

  const processed = await remark().use(gfm).use(html).process(markdown);

  return {
    slug,
    title: data.title || slug,
    date: data.date || "2026-01-01",
    description: data.description || "",
    keywords: data.keywords || [],
    image: data.image,
    content: processed.toString(),
  };
}
