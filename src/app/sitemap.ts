import type { MetadataRoute } from "next";
import { getAllBlogPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.mcstation.ai";

  const now = Date.now();
  const thirtyDays = 30 * 24 * 60 * 60 * 1000;
  const ninetyDays = 90 * 24 * 60 * 60 * 1000;

  const blogPosts = getAllBlogPosts().map((post) => {
    const age = now - new Date(post.date).getTime();
    const priority = age < thirtyDays ? 0.8 : age < ninetyDays ? 0.75 : 0.7;
    return {
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority,
    };
  });

  // Static SEO article pages (migrated 2026-07-03, closed-venue / smart-locker series)
  const staticBlogSlugs = [
    "frozen-microwave-factory-night-shift",
    "frozen-vending-elderly-care",
    "frozen-vending-electricity-maintenance",
    "frozen-vending-factory-night-solution",
    "frozen-vending-lease-vs-purchase",
    "frozen-vending-machine-factory-guide",
    "frozen-vending-migrant-worker-dormitory",
    "frozen-vending-military-closed-venue",
    "frozen-vending-school-campus",
    "frozen-vending-vendor-selection",
    "frozen-vending-vs-regular-vending",
    "ghost-kitchen-smart-locker-guide",
    "clinic-waiting-area-smart-vending",
    "one-ping-space-equipment-guide",
    "salon-studio-waiting-smart-device",
    "smart-locker-api-integration",
    "smart-locker-brunch-chain",
    "smart-locker-campus",
    "smart-locker-complete-guide",
    "smart-locker-cost-calculator",
    "smart-locker-factory-migrant",
    "smart-locker-hospital-system",
    "smart-locker-office-building",
    "smart-locker-restaurant-takeout",
    "smart-locker-vs-regular-fridge",
    "steam-ramen-hospital-24hr",
  ];
  const staticBlogPosts = staticBlogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.8,
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
    ...staticBlogPosts,
  ];
}
