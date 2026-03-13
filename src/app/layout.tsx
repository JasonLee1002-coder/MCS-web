import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import AiConsultant from "@/components/AiConsultant";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "銓幻元科技 | MCS Meta Clearing Station - 冷凍微波販賣機 · GraBox AI智取櫃 | 智慧設備整合方案",
    template: "%s | 銓幻元科技 MCS",
  },
  description:
    "銓幻元科技股份有限公司（MCS Meta Clearing Station Pte. Ltd.）新加坡商，專業提供 GraBox AI智取櫃、智慧販賣機、自助服務機、冷凍微波販賣機、AI訂餐系統、OEM/ODM貼牌客製、企業會員系統整合、餐飲零售POS/KDS串接、雲端營運平台及AI分析模組。100%台灣製造，外銷日本。AI智慧設備 x 商業系統整合的領導品牌。",
  keywords: [
    "銓幻元科技",
    "銓幻元",
    "MCS",
    "Meta Clearing Station",
    "新加坡MCS",
    "GraBox",
    "AI智取櫃",
    "智取櫃",
    "AI訂餐",
    "智慧取餐櫃",
    "自助服務設備",
    "OEM貼牌",
    "ODM客製",
    "企業會員系統",
    "餐飲系統串接",
    "POS系統",
    "KDS廚房顯示",
    "雲端營運平台",
    "AI分析模組",
    "台灣製造智取櫃",
    "MCStation",
    "智能販賣機",
    "智慧販賣機",
    "AI虛擬顧問",
    "智能櫃",
    "智慧櫃",
    "無人販賣機",
    "自動販賣機台灣",
    "冷凍微波販賣機",
    "冷凍微波機",
    "冷凍販賣機",
    "冷凍食品販賣機",
    "24H無人服務區",
    "微波加熱販賣機",
    "自助服務機",
    "外銷日本",
    "日本首都高速公路",
    "餐飲數位轉型",
    "智慧餐飲設備",
    "經銷商系統",
    "會員積分系統",
  ],
  authors: [{ name: "銓幻元科技股份有限公司" }],
  creator: "銓幻元科技股份有限公司",
  publisher: "Meta Clearing Station Pte. Ltd.",
  metadataBase: new URL("https://www.mcstation.ai"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://www.mcstation.ai",
    siteName: "銓幻元科技 MCS",
    title: "銓幻元科技 | GraBox AI智取櫃 - 新加坡MCS Meta Clearing Station",
    description:
      "銓幻元科技（新加坡MCS）專業提供 GraBox AI智取櫃、智能販賣機、自助服務設備AI整合、OEM/ODM貼牌客製、企業會員與餐飲零售系統串接。台灣製造，AI智慧設備 x 商業系統整合。",
    images: [
      {
        url: "/images/mcs-logo.png",
        width: 1200,
        height: 630,
        alt: "銓幻元科技 MCS Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "銓幻元科技 | GraBox AI智取櫃 - MCS Meta Clearing Station",
    description:
      "新加坡MCS銓幻元科技，GraBox AI智取櫃、自助服務設備、POS/KDS系統串接、雲端營運平台。",
    images: ["/images/mcs-logo.png"],
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GSC_ID,
    other: {
      "msvalidate.01": process.env.NEXT_PUBLIC_BING_ID || "",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-Hant">
      <head>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "銓幻元科技股份有限公司",
              alternateName: [
                "MCS",
                "Meta Clearing Station Pte. Ltd.",
                "新加坡MCS",
                "銓幻元科技",
              ],
              url: "https://www.mcstation.ai",
              logo: "https://www.mcstation.ai/images/mcs-logo.png",
              description:
                "銓幻元科技（新加坡MCS Meta Clearing Station）專業提供 GraBox AI智取櫃、自助服務設備AI系統整合、OEM/ODM貼牌客製、企業會員系統、餐飲零售POS/KDS串接、雲端營運平台及AI分析模組。",
              address: {
                "@type": "PostalAddress",
                streetAddress: "長安西路78巷4弄10號1樓",
                addressLocality: "大同區",
                addressRegion: "台北市",
                postalCode: "103",
                addressCountry: "TW",
              },
              contactPoint: { "@type": "ContactPoint", contactType: "customer service", email: "service@transtep.com" },
              email: "steven.fan@transtep.com",
              sameAs: [],
              makesOffer: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Product",
                    name: "GraBox AI智取櫃",
                    description:
                      "結合AI技術的智慧取餐櫃，提供AI訂餐、人臉辨識取餐功能，多種規格可選。",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "OEM/ODM 貼牌客製",
                    description: "100%台灣製造，提供完整硬體客製化與品牌貼牌服務。",
                  },
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "餐飲與零售系統串接",
                    description: "POS點餐系統、KDS廚房顯示系統與雲端營運管理平台串接。",
                  },
                },
              ],
            }),
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        {children}
        <AiConsultant />
      </body>
    </html>
  );
}
