import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  async redirects() {
    return [
      // Redirect all old URLs from previous mcstation.ai site
      { source: "/index.php/zh/lian-luo-wo-men", destination: "/#contact", permanent: true },
      { source: "/index.php/zh/chan-pin-jie-shao", destination: "/products/grabox", permanent: true },
      { source: "/index.php/zh/guan-yu-wo-men", destination: "/#about", permanent: true },
      { source: "/index.php/zh/:path*", destination: "/", permanent: true },
      { source: "/index.php/en/contact-us", destination: "/#contact", permanent: true },
      { source: "/index.php/en/:path*", destination: "/", permanent: true },
      { source: "/index.php/:path*", destination: "/", permanent: true },
      { source: "/index.php", destination: "/", permanent: true },
      { source: "/index", destination: "/", permanent: true },
      { source: "/index.html", destination: "/", permanent: true },

      // 2026-08-19 修 404：blog 的關鍵字連結與文末 CTA 長期指向 /solutions/{slug}，
      // 但那組路由只存在於 transtep.com，本站從來沒有。連結已改指產品頁，
      // 這裡再補 301，讓已經流出去（分享連結、外部引用、既有索引）的舊網址不要落在 404。
      // ⚠️ 不要改成 /solutions/:slug* 全包，會蓋掉真實存在的 /solutions/breakfast-chain-ai。
      { source: "/solutions/frozen-microwave", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/frozen-machine", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/steam-ramen", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/steam-bento", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/steam-dimsum", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/vending-machine", destination: "/products/frozen-microwave", permanent: true },
      { source: "/solutions/smart-locker", destination: "/products/grabox", permanent: true },
      { source: "/solutions/ghost-kitchen", destination: "/products/grabox", permanent: true },
      { source: "/solutions/ai-labor", destination: "/", permanent: true },

      // 2026-08-13 智取櫃品類詞去重：「2026 智取櫃品牌推薦」原本有兩篇近重複文章
      // （發布只差 6 天、評估面向與 GraBox 定位段落幾乎相同），分食同一批曝光，
      // 導致「智取櫃」品類詞在 GSC 上幾乎零能見度。獨有的場景配置表已併入留存頁。
      {
        source: "/blog/smart-pickup-cabinet-recommendation-2026",
        destination: "/blog/smart-pickup-cabinet-brand-comparison",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
