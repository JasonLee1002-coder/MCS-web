import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Numbers from "@/components/Numbers";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "銓幻元科技 MCS | GraBox AI 智取櫃 · 冷凍微波販賣機 · 台灣製造智慧設備領導品牌",
  description:
    "銓幻元科技 100% 台灣研發製造 GraBox AI 智取櫃、冷凍微波販賣機、智慧販賣機。服務知名連鎖通路實績，日本首都高速公路 MOU 指定合作。提供 AI 訂餐、人臉辨識取餐、多溫層控制、雲端營運管理平台。",
  keywords: [
    "銓幻元科技",
    "MCS",
    "GraBox",
    "AI智取櫃",
    "智慧取餐櫃",
    "冷凍微波販賣機",
    "冷凍販賣機",
    "智能販賣機",
    "台灣製造販賣機",
    "無人販賣機",
    "24H無人服務區",
    "智慧販賣機平台",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "銓幻元科技 MCS | GraBox AI 智取櫃 · 冷凍微波販賣機",
    description:
      "100% 台灣研發製造智慧設備。GraBox AI 智取櫃、冷凍微波販賣機、智慧販賣機。知名連鎖通路實績，日本高速公路 MOU 合作。",
    url: "https://www.mcstation.ai",
    images: ["/images/mcs-logo.png"],
  },
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "銓幻元科技 MCS",
  alternateName: "MCS Meta Clearing Station",
  url: "https://www.mcstation.ai",
  publisher: {
    "@type": "Organization",
    name: "銓幻元科技股份有限公司",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "首頁",
      item: "https://www.mcstation.ai",
    },
  ],
};

const localBusinessJsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://www.mcstation.ai/#business",
  name: "銓幻元科技股份有限公司",
  alternateName: ["MCS", "Meta Clearing Station", "銓幻元科技"],
  image: "https://www.mcstation.ai/images/mcs-logo.png",
  url: "https://www.mcstation.ai",
  email: "service@transtep.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "長安西路78巷4弄10號1樓",
    addressLocality: "大同區",
    addressRegion: "台北市",
    postalCode: "103",
    addressCountry: "TW",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.0504,
    longitude: 121.5168,
  },
  areaServed: [
    { "@type": "Country", name: "TW" },
    { "@type": "Country", name: "JP" },
    { "@type": "Country", name: "SG" },
  ],
  priceRange: "$$",
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <Hero />
        <Services />
        <Clients />
        <Numbers />
        <About />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
