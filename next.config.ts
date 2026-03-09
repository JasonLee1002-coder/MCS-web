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
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
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
