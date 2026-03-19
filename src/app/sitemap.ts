import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mcstation.ai";

  const blogPosts = getAllBlogPosts().map((post) => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${baseUrl}/cases`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/products/grabox`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/products/frozen-microwave`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.85,
    },
    ...blogPosts,
  ];
}
