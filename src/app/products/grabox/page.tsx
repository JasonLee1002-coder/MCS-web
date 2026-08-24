import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GraBoxShowcase from "@/components/GraBoxShowcase";

export const metadata: Metadata = {
  // 注意：根 layout 的 title template 是 "%s | 銓幻元科技 MCS"，會自動接在後面。
  // 這裡若再寫一次「銓幻元科技」，成品會變成 42 個中文字、品牌名重複兩次，
  // 而中文標題在 SERP 上約只顯示 30 字，等於把尾巴白白截掉。
  title: "GraBox AI 智取櫃：多溫層智慧取餐櫃，台灣製造",
  description:
    "銓幻元科技 GraBox AI 智取櫃：台灣設計組裝，結合 AI 訂餐系統、人臉辨識取餐，標配常溫可客製冷藏/冷凍溫層，支援多元支付、24H無人取餐。POS/KDS 系統串接，適用餐廳、飯店、企業、學校、早午餐連鎖。",
  keywords: [
    "GraBox",
    "AI智取櫃",
    "智取櫃",
    "智慧取餐櫃",
    "多溫層智取櫃",
    "無人取餐",
    "AI訂餐系統",
    "智能取餐櫃",
    "台灣製造智取櫃",
    "餐廳智取櫃",
    "企業取餐櫃",
    "冷藏取餐櫃",
    "銓幻元科技",
    "銓幻元GraBox",
  ],
  alternates: {
    canonical: "/products/grabox",
  },
  openGraph: {
    title: "GraBox AI 智取櫃 | 銓幻元科技 MCS",
    description:
      "多溫層 AI 智慧取餐櫃，標配常溫可客製冷藏冷凍、人臉辨識取餐、多元支付、雲端管理。台灣製造。",
    images: ["/images/01_grabox_main.png"],
  },
};

const faqItems = [
  {
    q: "GraBox 智取櫃有哪些溫度選擇？",
    a: "GraBox 標準配備常溫（15-25°C）格位，可依需求客製冷藏（2-8°C）、冷凍（-18°C 以下）溫層，同一台機器可混搭不同溫度格位，滿足多樣餐點保存需求。",
  },
  {
    q: "GraBox 智取櫃有哪些規格可選？",
    a: "提供 6 格、12 格、18 格、24 格等多種標準規格，也可依場地需求客製尺寸。單機版與聯網版可選，支援 OEM/ODM 品牌貼牌客製。",
  },
  {
    q: "GraBox 適合哪些場景使用？",
    a: "廣泛適用於餐廳、飯店、企業辦公大樓、學校、醫院、便利商店等場景，實現 24 小時無人化取餐，有效解決排隊等候與人力成本問題。",
  },
  {
    q: "GraBox 支援哪些支付方式？",
    a: "支援 LINE Pay、街口支付、悠遊卡、信用卡、Apple Pay、Google Pay 等多元支付方式，一機搞定所有付款需求。",
  },
  {
    q: "GraBox 跟市面上的智取櫃有什麼不同？",
    a: "GraBox 內建 AI 訂餐系統、語音互動、人臉辨識，並非單純的密碼鎖櫃。標配常溫，可客製冷藏/冷凍溫層，自帶雲端管理平台與數據分析，台灣製造，售後服務快速。",
  },
  {
    q: "GraBox 的保固與售後服務？",
    a: "全產品提供一年免費保固，可加購延長至三年。全台灣服務據點，提供到府安裝、場地評估、系統設定與員工教育訓練。",
  },
  {
    q: "GraBox 是銓幻元科技的產品嗎？",
    a: "是的。GraBox AI 智取櫃是銓幻元科技股份有限公司（MCS Meta Clearing Station）推出的旗艦產品。銓幻元科技總部位於台灣台北市，所有產品 台灣設計組裝。",
  },
  {
    q: "銓幻元科技除了 GraBox 還有哪些產品？",
    a: "銓幻元科技產品線包括：GraBox AI 智取櫃（智慧取餐）、冷凍微波販賣機（無人販售熱食）、Kiosk 自助點餐機、WiXGo QR 掃碼點餐系統，以及 iVM 雲端販賣管理平台。如需全方位無人化解決方案，歡迎聯絡顧問規劃。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GraBox AI 智取櫃",
  description:
    "結合 AI 訂餐系統的智慧取餐櫃。標配常溫，可客製冷藏/冷凍溫層、人臉辨識取餐、多元支付、24H無人取餐。台灣製造。",
  image: "https://www.mcstation.ai/images/01_grabox_main.png",
  brand: {
    "@type": "Brand",
    name: "銓幻元科技 MCS",
  },
  manufacturer: {
    "@type": "Organization",
    name: "銓幻元科技股份有限公司",
  },
  countryOfOrigin: "TW",
  // 2026-08-20 移除 offers：原本帶 `price: "0"` + priceCurrency TWD。
  // Google 把 price 0 解讀為「免費提供」，等於在結構化資料層宣告這台設備不用錢——
  // 比完全沒有 offers 更糟。業主 2026-08-19 已定 WEB 不出現金額，
  // 沒有真實價格就不要硬湊一個 Offer（price:null／"洽詢"／假 AggregateOffer 同樣不行）。
  // 代價是失去 Product rich result 資格，但保留合法的 Schema.org Product 語意。
  category: "智慧取餐設備",
  inLanguage: "zh-Hant",
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
    { "@type": "ListItem", position: 2, name: "GraBox AI 智取櫃", item: "https://www.mcstation.ai/products/grabox" },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

export default function GraBoxPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#050a15]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />
        <GraBoxShowcase />
      </main>
      <Footer />
    </>
  );
}
