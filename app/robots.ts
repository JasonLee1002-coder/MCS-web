import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/poc/'],
      },
    ],
    sitemap: 'https://mcstation.ai/sitemap.xml',
  }
}
