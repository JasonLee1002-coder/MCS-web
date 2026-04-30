import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCS 銓幻元科技 | AI 智慧設備平台 — Company Overview",
  description:
    "MCS builds AI-powered smart device platforms — hardware, firmware, cloud, and AI — all designed and operated in-house. Serving leading convenience chains, EB+ 970 stores, Japan Shuto Expressway, and more. 100% Made in Taiwan.",
  openGraph: {
    title: "MCS 銓幻元科技 — AI Smart Device Platform",
    description:
      "Full-stack integrator: IoT hardware + OmniCore cloud platform + AI — all in-house. 20+ years, 200+ chain store units, Japan Shuto Expressway.",
    url: "https://www.mcstation.ai/intro",
    siteName: "MCS 銓幻元科技",
    images: [
      {
        url: "https://www.mcstation.ai/images/intro/backend-device-monitor.jpg",
        width: 1200,
        height: 630,
        alt: "OmniCore — MCS 銓幻元科技 智慧設備管理平台",
      },
    ],
    locale: "zh_TW",
    alternateLocale: ["en_US", "ja_JP"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MCS 銓幻元科技 — AI Smart Device Platform",
    description:
      "Full-stack smart device integrator: hardware + OmniCore cloud platform + AI — all in-house. Leading Chains · EB+ · Japan Shuto Expressway.",
    images: ["https://www.mcstation.ai/images/intro/backend-device-monitor.jpg"],
  },
  robots: {
    index: false, // This is a confidential intro/pitch page — keep noindex
    follow: false,
  },
};

export default function IntroLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
