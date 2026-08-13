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
