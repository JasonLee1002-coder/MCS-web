#!/usr/bin/env node

/**
 * SEO submission script for mcstation.ai
 * - Submit URLs to IndexNow (Bing, Yandex, etc.)
 * - Auto-discovers blog posts from content/blog/ directory
 *
 * Usage:
 *   node scripts/seo-submit.js                   # Submit all URLs via IndexNow
 *   node scripts/seo-submit.js <url>             # Submit a specific URL
 */

import { readdirSync } from "fs";
import { resolve, basename } from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));
const SITE_URL = "https://www.mcstation.ai";
const INDEXNOW_KEY = "94ce3922543309ce70f4a6d4a9f5cfea";

// Static pages
const STATIC_PAGES = ["/", "/cases", "/products/frozen-microwave", "/products/grabox", "/blog"];

// Auto-discover blog posts
function getBlogSlugs() {
  const blogDir = resolve(__dirname, "..", "content", "blog");
  try {
    return readdirSync(blogDir)
      .filter((f) => f.endsWith(".md"))
      .map((f) => `/blog/${basename(f, ".md")}`);
  } catch {
    return [];
  }
}

async function submitIndexNow(urls) {
  const fullUrls = urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`));

  console.log(`\n📡 Submitting ${fullUrls.length} URLs to IndexNow...`);
  fullUrls.forEach((u) => console.log(`   ${u}`));

  const body = {
    host: "www.mcstation.ai",
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: fullUrls,
  };

  try {
    const res = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    console.log(`\n   Status: ${res.status} ${res.statusText}`);
    if (res.ok || res.status === 200 || res.status === 202) {
      console.log("   ✅ IndexNow submission successful!");
    } else {
      const text = await res.text();
      console.log(`   ⚠️ Response: ${text}`);
    }
  } catch (err) {
    console.error("   ❌ IndexNow submission failed:", err.message);
  }
}

async function main() {
  const specificUrl = process.argv[2];

  console.log("🚀 MCS SEO Submission Tool");
  console.log(`   Site: ${SITE_URL}`);

  if (specificUrl) {
    await submitIndexNow([specificUrl]);
  } else {
    const allPages = [...STATIC_PAGES, ...getBlogSlugs()];
    console.log(`   Found ${allPages.length} pages (${STATIC_PAGES.length} static + ${allPages.length - STATIC_PAGES.length} blog)`);
    await submitIndexNow(allPages);
  }

  console.log("\n✨ Done!");
}

main();
