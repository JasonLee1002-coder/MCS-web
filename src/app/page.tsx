import type { Metadata } from "next";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import GlobalPresence from "@/components/GlobalPresence";
import Consulting from "@/components/Consulting";
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
  potentialAction: {
    "@type": "SearchAction",
    target: "https://www.mcstation.ai/blog?q={search_term_string}",
    "query-input": "required name=search_term_string",
  },
  publisher: {
    "@type": "Organization",
    name: "銓幻元科技股份有限公司",
  },
};

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": "https://www.mcstation.ai/#organization",
  name: "銓幻元科技股份有限公司",
  alternateName: ["銓幻元科技", "MCS", "Meta Clearing Station", "MCS Meta Clearing Station"],
  url: "https://www.mcstation.ai",
  logo: {
    "@type": "ImageObject",
    url: "https://www.mcstation.ai/images/mcs-logo.png",
    width: 300,
    height: 100,
  },
  description: "銓幻元科技股份有限公司，台灣 100% 自主研發製造，專注 GraBox AI 智取櫃、冷凍微波販賣機、智慧販賣機設備，服務台灣、日本、新加坡市場。",
  foundingDate: "2023",
  foundingLocation: "Singapore",
  areaServed: ["TW", "JP", "SG"],
  knowsAbout: ["AI智取櫃", "智慧取餐櫃", "冷凍微波販賣機", "無人販賣機", "GraBox", "智慧零售設備"],
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+886-2-2558-8848",
    email: "service@mcstation.ai",
    contactType: "customer service",
    availableLanguage: ["zh-TW", "en", "ja"],
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
  alternateName: ["MCS", "Meta Clearing Station", "銓幻元科技", "MCS Meta Clearing Station"],
  image: "https://www.mcstation.ai/images/mcs-logo.png",
  url: "https://www.mcstation.ai",
  email: "service@mcstation.ai",
  telephone: "+886-2-2558-8848",
  sameAs: [
    "https://www.facebook.com/mcstation.ai",
    "https://www.instagram.com/mcstation.ai",
  ],
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
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
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
        <GlobalPresence />
        <Consulting />
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
