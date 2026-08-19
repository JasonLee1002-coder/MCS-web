import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import FrozenMicrowaveShowcase from "@/components/FrozenMicrowaveShowcase";

export const metadata: Metadata = {
  // 同 /products/grabox：根 layout 的 template 是 "%s | 銓幻元科技 MCS"，
  // 這裡不要再寫一次品牌名，否則成品標題會出現兩次「銓幻元科技 MCS」並被截斷。
  title: "冷凍微波販賣機：台灣製造，日本高速公路指定",
  description:
    "銓幻元科技 100% 台灣研發製造冷凍微波販賣機，搭載商用 3600W 微波加熱，冷食瞬間變熱餐。服務大型連鎖通路數百台智慧販賣機經驗，食安管控業界領先。受日本首都高速公路青睞，簽訂 MOU 布點全日本休息站。提供台製與進口機型選擇。",
  keywords: [
    "冷凍微波販賣機",
    "冷凍微波販賣機台灣",
    "微波加熱販賣機",
    "冷凍販賣機",
    "智能販賣機",
    "無人販賣機",
    "冷凍食品販賣機",
    "24H無人服務區",
    "自動加熱販賣機",
    "冷凍微波機台灣製造",
    "日本高速公路販賣機",
    "食安管控販賣機",
    "智慧販賣機平台",
    "冷凍鮮食販賣機",
    "無人熟食販賣機",
    "銓幻元科技",
    "販賣機廠商推薦",
    "台灣自動販賣機廠商",
    "冷凍販賣機設點",
    "販賣機營運模式",
    "連鎖通路販賣機",
  ],
  alternates: {
    canonical: "/products/frozen-microwave",
  },
  openGraph: {
    title: "冷凍微波販賣機 | 台灣唯一百台實績 · 日本首都高速指定",
    description:
      "100% 台灣研發製造，搭載商用 3600W 微波。服務大型連鎖通路實戰經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
    images: ["/images/products/frozen-microwave/th-21ms-catalog.png"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "冷凍微波販賣機 TH-21MS",
  description:
    "100% 台灣研發製造冷凍微波販賣機，搭載商用 3600W 微波加熱，-18°C~4°C 全溫域控制。服務大型連鎖通路實戰經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
  image: "https://www.mcstation.ai/images/products/frozen-microwave/th-21ms-catalog.png",
  brand: { "@type": "Brand", name: "銓幻元科技 MCS" },
  manufacturer: { "@type": "Organization", name: "銓幻元科技股份有限公司" },
  countryOfOrigin: "TW",
  // 2026-08-20 移除 offers：原本帶 `price: "0"` + priceCurrency TWD。
  // Google 把 price 0 解讀為「免費提供」，等於在結構化資料層宣告這台設備不用錢——
  // 比完全沒有 offers 更糟。業主 2026-08-19 已定 WEB 不出現金額，
  // 沒有真實價格就不要硬湊一個 Offer（price:null／"洽詢"／假 AggregateOffer 同樣不行）。
  // 代價是失去 Product rich result 資格，但保留合法的 Schema.org Product 語意。
  additionalProperty: [
    { "@type": "PropertyValue", name: "微波功率", value: "3600W" },
    { "@type": "PropertyValue", name: "溫度範圍", value: "-18°C ~ 4°C" },
    { "@type": "PropertyValue", name: "製造地", value: "台灣" },
  ],
  category: "冷凍微波販賣設備",
  inLanguage: "zh-Hant",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
    { "@type": "ListItem", position: 2, name: "冷凍微波販賣機", item: "https://www.mcstation.ai/products/frozen-microwave" },
  ],
};

const faqItems = [
  { q: "冷凍微波販賣機的加熱時間需要多久？", a: "搭載 3600W 商用級微波爐，一般冷凍餐盒加熱約 2-4 分鐘即可完成，視食品種類與份量而定。" },
  { q: "食品安全如何管控？", a: "累積服務大型連鎖通路數百台智慧販賣機經驗，具備溫度 24H 即時監控、食品有效期限自動管理、異常溫度 LINE 即時通知、銷售紀錄完整可追溯。" },
  { q: "有台灣製造和進口兩種機型可選嗎？", a: "是的。100% 台灣研發製造品質穩定，同時也提供性價比優異的進口機型。所有機型搭配 MIT 雲端管理平台與全台服務。" },
  { q: "適合賣什麼商品？", a: "冷凍便當、調理包、水餃、湯品、海鮮、牛排、甜點等。TH-21MS 微波後即食，TH-21FD/FS 適合冷凍食材帶回家料理。" },
  { q: "與日本首都高速公路的合作是什麼？", a: "冷凍微波販賣機技術受日本首都高速公路集團青睞，簽訂 MOU 計劃在全日本高速公路休息站布點。" },
  { q: "冷凍食材品牌如何合作？", a: "提供自購自營、合作設點分潤、場地合作等多種模式。設備、平台、維護由我們負責，品牌負責商品供應。" },
  { q: "冷凍微波販賣機是銓幻元科技製造的嗎？", a: "是的。TH-21MS/FD/FS 系列冷凍微波販賣機由銓幻元科技股份有限公司（MCS）自主研發，100% 台灣製造。銓幻元科技同時提供 iVM 雲端管理平台與完整的售後維護服務。" },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: { "@type": "Answer", text: item.a },
  })),
};

export default function FrozenMicrowavePage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050a15]">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
        <FrozenMicrowaveShowcase />
      </main>
      <Footer />
    </>
  );
}
