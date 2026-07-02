import { MetadataRoute } from 'next'

const BASE_URL = 'https://mcstation.ai'

const BLOG_SLUGS = [
  'frozen-vending-migrant-worker-dormitory',
  'smart-locker-restaurant-takeout',
  'frozen-vending-military-closed-venue',
  'frozen-vending-machine-factory-guide',
  'smart-locker-complete-guide',
  'frozen-microwave-factory-night-shift',
  'ghost-kitchen-smart-locker-guide',
  'steam-ramen-hospital-24hr',
  'frozen-vending-vs-regular-vending',
  'smart-locker-office-building',
  'frozen-vending-lease-vs-purchase',
]

const SOLUTION_SLUGS = [
  'steam-ramen',
  'steam-bento',
  'frozen-microwave',
  'smart-locker',
  'ai-labor',
  'ghost-kitchen',
]

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE_URL}/`,          lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${BASE_URL}/about`,     lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/products`,  lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/solutions`, lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/cases`,     lastModified: now, changeFrequency: 'weekly',  priority: 0.8 },
    { url: `${BASE_URL}/contact`,   lastModified: now, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/ai-advisor`,lastModified: now, changeFrequency: 'weekly',  priority: 0.9 },
    { url: `${BASE_URL}/blog`,      lastModified: now, changeFrequency: 'daily',   priority: 0.9 },
  ]

  const blogPages: MetadataRoute.Sitemap = BLOG_SLUGS.map(slug => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.8,
  }))

  const solutionPages: MetadataRoute.Sitemap = SOLUTION_SLUGS.map(slug => ({
    url: `${BASE_URL}/solutions/${slug}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }))

  return [...staticPages, ...blogPages, ...solutionPages]
}
