import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/present", "/present/control", "/api/"],
      },
    ],
    sitemap: [
      "https://www.mcstation.ai/sitemap.xml",
      "https://www.mcstation.ai/video-sitemap.xml",
    ],
  };
}
