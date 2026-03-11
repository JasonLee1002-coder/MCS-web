#!/usr/bin/env node

/**
 * SEO submission script for mcstation.ai
 * - Submit URLs to IndexNow (Bing, Yandex, etc.)
 * Note: Google/Bing sitemap ping is deprecated. Use IndexNow for Bing/Yandex.
 *       Google discovers sitemaps via robots.txt automatically.
 *
 * Usage:
 *   node scripts/seo-submit.js                   # Submit all URLs via IndexNow
 *   node scripts/seo-submit.js <url>             # Submit a specific URL
 */

const SITE_URL = "https://www.mcstation.ai";
const INDEXNOW_KEY = "94ce3922543309ce70f4a6d4a9f5cfea";

// All known pages
const PAGES = [
  "/",
  "/cases",
  "/products/grabox",
  "/blog",
  "/blog/ai-smart-pickup-cabinet-trend-2026",
  "/blog/frozen-microwave-vending-machine-japan",
  "/blog/smart-vending-machine-taiwan-2026",
  "/blog/grabox-vs-traditional-pickup",
  "/blog/digital-transformation-restaurant-2026",
  "/blog/oem-odm-smart-device-taiwan",
];

async function submitIndexNow(urls) {
  const fullUrls = urls.map((u) => (u.startsWith("http") ? u : `${SITE_URL}${u}`));

  console.log(`\n📡 Submitting ${fullUrls.length} URLs to IndexNow...`);

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
    console.log(`   Status: ${res.status} ${res.statusText}`);
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
    await submitIndexNow(PAGES);
  }

  console.log("\n✨ Done!");
}

main();
