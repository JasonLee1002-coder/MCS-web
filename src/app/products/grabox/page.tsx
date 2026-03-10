import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LightboxImage } from "@/components/Lightbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "GraBox AI 智取櫃 | 多溫層智慧取餐櫃",
  description:
    "GraBox AI 智取櫃：結合 AI 訂餐系統的智慧取餐櫃。標配常溫，可客製冷藏/冷凍溫層、人臉辨識、多元支付、24H無人取餐。100% 台灣製造，規格客製化。適用餐廳、飯店、企業、學校。",
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
  ],
  openGraph: {
    title: "GraBox AI 智取櫃 | 銓幻元科技 MCS",
    description:
      "多溫層 AI 智慧取餐櫃，標配常溫可客製冷藏冷凍、人臉辨識取餐、多元支付、雲端管理。100% 台灣製造。",
    images: ["/images/01_grabox_main.png"],
  },
};

const specs = [
  { label: "格數規格", value: "模組化自由組合", icon: "grid" },
  { label: "溫控範圍", value: "常溫 · 冷藏 · 冷凍", icon: "temp" },
  { label: "標準組合", value: "1375 × 1280 mm", icon: "size" },
  { label: "電壓", value: "110V / 60Hz", icon: "power" },
];

const features = [
  {
    title: "彈性模組化組合",
    desc: "小格櫃、大格櫃、中控櫃自由堆疊組合，可直立彈性配置，適應各種場地需求。",
  },
  {
    title: "雙面獨立工業螢幕",
    desc: "前後雙螢幕獨立運作，前面消費者點餐取餐，後面店員放餐管理，穩定高品質工業級電腦。",
  },
  {
    title: "安全可靠設計",
    desc: "通過上市連鎖餐飲近萬次開關門壓力測試。雷射感應防夾手，自動閘門無接觸開啟。",
  },
  {
    title: "一體成形板金",
    desc: "100% MIT 一體成形不鏽鋼板金，抗菌無縫設計，不漏液、衛生好清潔。內建紫外線殺菌功能。",
  },
  {
    title: "多溫層可客製",
    desc: "標準配備常溫格位，可依需求客製冷藏（2-8°C）、冷凍（-18°C以下）溫層，靈活搭配。",
  },
  {
    title: "智慧功能整合",
    desc: "五色可控燈光、外送員簽名自取功能、會員數位集點。可單機作業，也可聯網升級雲端管理。",
  },
];

const useCases = [
  { scene: "連鎖早餐店", desc: "外帶餐點自取，提升營運效率（實績：麥味登）", image: "/images/products/grabox/r101-scene.png" },
  { scene: "知名糕餅店", desc: "網路預訂、智取櫃取貨，免排隊（示意：佳德鳳梨酥）", image: "/images/products/grabox/chiate-scenario.png" },
  { scene: "便利商店門口", desc: "24 小時自助服務，便利店門口展示（實績：全家超商）", image: "/images/products/grabox/dm-scenarios.png" },
  { scene: "飯店 / 民宿", desc: "房客自助取餐，降低人力成本", image: "" },
  { scene: "企業 / 辦公大樓", desc: "員工訂餐直取，提升午餐效率", image: "" },
  { scene: "外送平台整合", desc: "外送員持碼自取，減少店員確認訂單的衝突", image: "" },
];

const advantages = [
  {
    title: "vs 傳統密碼鎖櫃",
    points: [
      "GraBox 內建 AI 系統，不只是「放東西的櫃子」",
      "可客製冷藏/冷凍溫層，傳統櫃只有常溫",
      "自帶雲端平台，傳統櫃無數據能力",
    ],
  },
  {
    title: "vs 進口智取櫃",
    points: [
      "100% 台灣製造，維修不用等進口零件",
      "軟硬體全客製，進口機型固定規格",
      "在地售後服務，全台到府支援",
    ],
  },
  {
    title: "vs 自建系統",
    points: [
      "軟硬體一體交付，不用自己整合",
      "快速上線，自建至少半年",
      "持續更新 AI 功能，自建維護成本高",
    ],
  },
];

function SpecIcon({ type }: { type: string }) {
  if (type === "grid")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
      </svg>
    );
  if (type === "temp")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    );
  if (type === "size")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
      </svg>
    );
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z" />
    </svg>
  );
}

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
    a: "GraBox 內建 AI 訂餐系統、語音互動、人臉辨識，並非單純的密碼鎖櫃。標配常溫，可客製冷藏/冷凍溫層，自帶雲端管理平台與數據分析，100% 台灣製造，售後服務快速。",
  },
  {
    q: "GraBox 的保固與售後服務？",
    a: "全產品提供一年免費保固，可加購延長至三年。全台灣服務據點，提供到府安裝、場地評估、系統設定與員工教育訓練。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "GraBox AI 智取櫃",
  description:
    "結合 AI 訂餐系統的智慧取餐櫃。標配常溫，可客製冷藏/冷凍溫層、人臉辨識取餐、多元支付、24H無人取餐。100% 台灣製造。",
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
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    url: "https://www.mcstation.ai/products/grabox",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
    { "@type": "ListItem", position: 2, name: "產品", item: "https://www.mcstation.ai/products/grabox" },
    { "@type": "ListItem", position: 3, name: "GraBox AI 智取櫃", item: "https://www.mcstation.ai/products/grabox" },
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
    <main className="min-h-screen bg-white">
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
      {/* Hero */}
      <section className="bg-gradient-to-br from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark pt-28 pb-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, #E8751A 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            回首頁
          </Link>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="bg-mcs-orange/20 text-mcs-orange px-4 py-1.5 rounded-full text-sm font-medium">
                明星產品
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-4 leading-tight">
                GraBox<br />
                <span className="text-mcs-orange">AI 智取櫃</span>
              </h1>
              <p className="text-xl text-white/80 mb-8 leading-relaxed">
                不只是取餐櫃 — 結合 AI 訂餐系統、人臉辨識、多溫層可客製的
                新一代智慧設備。100% 台灣設計製造。
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  單機版 / 聯網版可選
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  多溫層可客製
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  OEM/ODM 客製
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 h-72 lg:w-96 lg:h-[28rem] rounded-3xl overflow-hidden shadow-2xl">
                <LightboxImage
                  src="/images/products/grabox/r101-spec.png"
                  alt="GraBox-R101 智慧取餐櫃產品規格圖 - 100% 台灣製造"
                  width={500}
                  height={700}
                  className="w-full h-full object-cover object-top"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Specs */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {specs.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-6 text-center shadow-sm">
                <div className="w-12 h-12 bg-mcs-orange/10 rounded-xl flex items-center justify-center mx-auto mb-3 text-mcs-orange">
                  <SpecIcon type={s.icon} />
                </div>
                <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                <div className="font-bold text-mcs-blue-dark">{s.value}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Detail Images */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            GraBox-R101 產品細節
          </h2>
          <p className="text-center text-gray-500 mb-12">
            100% 台灣製造 · 模組化設計 · 通過上市連鎖餐飲品質驗證
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <LightboxImage
                src="/images/products/grabox/dm-features.png"
                alt="GraBox 智取櫃核心特色 - 智慧設計、安全可靠、靈活配置"
                width={600}
                height={800}
                className="w-full h-auto"
              />
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 text-center">示意情境圖</div>
            </div>
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <LightboxImage
                src="/images/products/grabox/r101-scene.png"
                alt="GraBox-R101 實際應用場景 - 麥味登早餐連鎖門市"
                width={600}
                height={800}
                className="w-full h-auto"
              />
              <div className="bg-gray-50 px-4 py-2 text-xs text-gray-400 text-center">示意情境圖</div>
            </div>
          </div>
          {/* Spec Table */}
          <div className="mt-12 bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
            <div className="bg-mcs-blue-dark text-white px-6 py-4 font-bold text-lg">
              GraBox-R101 產品規格
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">項目</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">寬度 (W)</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">高度 (H)</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">深度 (D)</th>
                    <th className="px-6 py-3 text-left font-medium text-gray-500">備註</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">小格單元</td>
                    <td className="px-6 py-3 text-gray-600">~295mm</td>
                    <td className="px-6 py-3 text-gray-600">~295mm</td>
                    <td className="px-6 py-3 text-gray-600">390mm</td>
                    <td className="px-6 py-3 text-gray-600">4 層堆疊</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">大格單元</td>
                    <td className="px-6 py-3 text-gray-600">~415mm</td>
                    <td className="px-6 py-3 text-gray-600">~295mm</td>
                    <td className="px-6 py-3 text-gray-600">390mm</td>
                    <td className="px-6 py-3 text-gray-600">4 層堆疊</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">中控櫃</td>
                    <td className="px-6 py-3 text-gray-600">~665mm</td>
                    <td className="px-6 py-3 text-gray-600">1280mm</td>
                    <td className="px-6 py-3 text-gray-600">390mm</td>
                    <td className="px-6 py-3 text-gray-600">含主控電腦與顯控板</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-3 font-medium text-gray-900">底座高度</td>
                    <td className="px-6 py-3 text-gray-600" colSpan={3}>450 - 700mm（可調）</td>
                    <td className="px-6 py-3 text-gray-600"></td>
                  </tr>
                  <tr className="bg-mcs-orange/5">
                    <td className="px-6 py-3 font-bold text-mcs-blue-dark">標準組合</td>
                    <td className="px-6 py-3 font-bold text-mcs-blue-dark">1375mm</td>
                    <td className="px-6 py-3 font-bold text-mcs-blue-dark">1280mm</td>
                    <td className="px-6 py-3 font-bold text-mcs-blue-dark">390mm</td>
                    <td className="px-6 py-3 font-bold text-mcs-blue-dark">2小格+1大格+中控櫃</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            六大核心特色
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            通過上市連鎖餐飲每日數百次實戰驗證的品質
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div
                key={i}
                className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-mcs-orange/30 transition-all"
              >
                <div className="w-10 h-10 bg-mcs-orange rounded-xl flex items-center justify-center text-white font-bold mb-4">
                  {i + 1}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-20 bg-gradient-to-br from-mcs-blue-dark to-mcs-blue text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            為什麼選 GraBox？
          </h2>
          <p className="text-center text-white/70 mb-12">
            跟市面上的方案比一比
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {advantages.map((a) => (
              <div key={a.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-mcs-orange mb-4">{a.title}</h3>
                <ul className="space-y-3">
                  {a.points.map((p, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                      <svg className="w-4 h-4 text-mcs-orange mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            應用場景
          </h2>
          <p className="text-center text-gray-500 mb-12">
            從早餐店到糕餅名店，GraBox 已在多種場景實戰驗證
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.scene} className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-shadow">
                {u.image ? (
                  <div className="h-48 overflow-hidden">
                    <LightboxImage
                      src={u.image}
                      alt={`${u.scene} - GraBox 智取櫃應用場景`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-mcs-blue-dark to-mcs-blue flex items-center justify-center">
                    <span className="text-4xl text-white/30 font-bold">GraBox</span>
                  </div>
                )}
                <div className="p-5">
                  <div className="font-bold text-gray-900 mb-1">{u.scene}</div>
                  <div className="text-sm text-gray-500">{u.desc}</div>
                  {u.image && (
                    <div className="text-[10px] text-gray-300 mt-2">示意情境圖</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            常見問題
          </h2>
          <p className="text-center text-gray-500 mb-12">
            關於 GraBox AI 智取櫃的常見疑問
          </p>
          <div className="space-y-4">
            {faqItems.map((item, i) => (
              <details
                key={i}
                className="bg-white rounded-xl border border-gray-100 group"
              >
                <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-gray-900 hover:text-mcs-orange transition-colors">
                  {item.q}
                  <svg
                    className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase: 佳德 scenario */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            實際應用想像
          </h2>
          <p className="text-center text-gray-500 mb-10">
            知名糕餅店導入 GraBox 智取櫃，網路預訂、到店免排隊取貨
          </p>
          <div className="rounded-2xl overflow-hidden shadow-xl">
            <LightboxImage
              src="/images/products/grabox/chiate-scenario.png"
              alt="佳德糕餅導入 GraBox 智取櫃 - 消費者排隊取貨場景"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
            <div className="bg-white px-6 py-3 text-xs text-gray-400 text-center">示意情境圖</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-mcs-orange to-mcs-orange-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">準備好升級了嗎？</h2>
          <p className="text-lg text-white/90 mb-8">
            從諮詢到安裝，快速上線。全台到府服務，含教育訓練。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/#contact"
              className="bg-white text-mcs-orange px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              聯絡我們
            </Link>
            <Link
              href="/cases"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              看客戶實績
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
