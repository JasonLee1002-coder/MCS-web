import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { LightboxImage } from "@/components/Lightbox";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "冷凍微波販賣機 | 台灣唯一百台實績 · 日本首都高速公路指定合作",
  description:
    "銓幻元科技 100% 台灣研發製造冷凍微波販賣機，搭載商用 3600W 微波加熱，冷食瞬間變熱餐。服務全家超商數百台智慧販賣機經驗，食安管控業界領先。受日本首都高速公路青睞，簽訂 MOU 布點全日本休息站。提供台製與進口機型選擇。",
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
  ],
  openGraph: {
    title: "冷凍微波販賣機 | 台灣唯一百台實績 · 日本首都高速指定",
    description:
      "100% 台灣研發製造，搭載商用 3600W 微波。服務全家超商數百台經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
    images: ["/images/products/frozen-microwave/th-21ms-catalog.png"],
  },
};

const specs = [
  { label: "冷凍溫控", value: "-18°C ~ 4°C", icon: "freeze" },
  { label: "商用微波", value: "3600W 瞬間加熱", icon: "microwave" },
  { label: "智能貨梯", value: "平行運送不翻倒", icon: "elevator" },
  { label: "觸控螢幕", value: '21" Full HD', icon: "display" },
];

const products = [
  {
    model: "TH-21MS",
    name: "冷凍微波加熱販賣機",
    badge: "旗艦主力",
    desc: "冷食瞬間變熱餐 — 搭載商用級 3600W 微波加熱，智能貨梯平行運送保證食物不翻倒。可調貨道適應各種尺寸，除霧玻璃清晰展示。",
    temp: "-18°C ~ 4°C",
    size: "1885 × 1071 × 1992mm",
    weight: "300KG",
    power: "220V/60Hz · 2000W + 3840W",
    tracks: "6 層 · 履帶貨道",
    image: "/images/products/frozen-microwave/th-21ms-main.png",
    catalogImage: "/images/products/frozen-microwave/th-21ms-catalog.png",
  },
  {
    model: "TH-21FD",
    name: "智能下取冷凍販賣機",
    badge: "大容量冷凍",
    desc: "極致 -18°C 冷凍保鮮，大容量設計。創新升降梯及可調貨道保護每份商品，三層除霧技術讓清晰可見成為常態。",
    temp: "-18°C",
    size: "1375 × 850 × 1960mm",
    weight: "410KG",
    power: "220V/60Hz · 1320W",
    tracks: "5 層 · 45 貨道",
    image: "/images/products/frozen-microwave/th-21fd-main.png",
    catalogImage: "",
  },
  {
    model: "TH-21FS",
    name: "智能側取冷凍販賣機",
    badge: "人性化設計",
    desc: "獨特側取設計，站著輕鬆拿取商品，無需彎腰。-18°C 強效冷凍、升降系統保護商品、超大側取貨口。",
    temp: "-18°C",
    size: "1420 × 952 × 1950mm",
    weight: "410KG",
    power: "220V/60Hz · 1320W",
    tracks: "6 層 · 54 貨道",
    image: "/images/products/frozen-microwave/th-21fs-main.png",
    catalogImage: "",
  },
];

const features = [
  {
    title: "商用級微波即時加熱",
    desc: "搭載 3600W 商用微波爐，冷凍食品從 -18°C 瞬間加熱至可口溫度。消費者選購後即可享用熱騰騰的餐點，打破傳統冷凍販賣的限制。",
    icon: "🔥",
  },
  {
    title: "智能貨梯平穩運送",
    desc: "獨家智能貨梯技術，以平行運輸方式將商品從貨架送至微波加熱區，確保食物全程不翻倒、不變形，湯品便當都能完美送達。",
    icon: "🛗",
  },
  {
    title: "全溫域精準控制",
    desc: "支援 -18°C 至 4°C 全溫域精準控制，同一台機器可同時存放冷凍與冷藏商品，靈活滿足不同食材保存需求。",
    icon: "❄️",
  },
  {
    title: "食安管控業界領先",
    desc: "累積服務全家超商數百台智慧販賣機經驗，具備食品有效期限管理、溫度即時監控、異常警報通知等完整食安管控能力。",
    icon: "🛡️",
  },
  {
    title: "雲端 IVM 管理平台",
    desc: "MIT 自主研發 IVM 智能販賣機管理平台，即時掌握銷售數據、庫存狀態、溫度紀錄、設備健康。LINE Notify 異常即時推播。",
    icon: "☁️",
  },
  {
    title: "台製與進口可選",
    desc: "提供 100% 台灣研發製造機型，也有性價比優異的進口機型可選。無論選擇哪種，都搭配相同的 MIT 管理平台與全台服務。",
    icon: "🇹🇼",
  },
];

const useCases = [
  {
    scene: "高速公路休息站",
    desc: "日本首都高速公路指定合作，24H 提供熱食服務。旅客深夜也能享用熱騰騰的餐點。",
    icon: "🛣️",
    highlight: true,
  },
  {
    scene: "冷凍食材業 24H 自助站",
    desc: "海產、肉品、調理包等冷凍食材，消費者隨時取貨。品牌直營無中間商，拓展 24H 銷售通路。",
    icon: "🦐",
    highlight: true,
  },
  {
    scene: "早午餐 / 餐飲連鎖",
    desc: "門市營業外時段延伸為 24H 無人店面，招牌餐點冷凍微波即食，不浪費品牌流量。",
    icon: "🍳",
    highlight: true,
  },
  {
    scene: "便利商店 / 超市通路",
    desc: "店外擴增冷凍鮮食銷售點位，不佔店內空間。服務全家超商數百台的成熟經驗。",
    icon: "🏪",
    highlight: false,
  },
  {
    scene: "工業區 / 科技園區",
    desc: "深夜加班族的熱食救星。大量員工需求穩定，投報率高。搭配員工卡整合支付。",
    icon: "🏭",
    highlight: false,
  },
  {
    scene: "社區 / 住宅大樓",
    desc: "社區一樓設置 24H 冷凍微波站，住戶隨時下樓就能取得熱食，打造智慧社區服務。",
    icon: "🏢",
    highlight: false,
  },
];

const advantages = [
  {
    title: "vs 傳統冷凍販賣機",
    points: [
      "內建微波加熱，消費者即買即食熱餐",
      "智能貨梯保證食物不翻倒",
      "完整食安管控平台，不只是賣機器",
    ],
  },
  {
    title: "vs 進口冷凍微波機",
    points: [
      "台灣自主研發，維修零件不用等進口",
      "搭配 MIT 雲端管理平台，全中文介面",
      "全台在地服務團隊，故障快速排除",
    ],
  },
  {
    title: "vs 無人便利商店",
    points: [
      "單機投入成本遠低於整間無人店",
      "免裝潢、免租大坪數，一機一插座搞定",
      "專注冷凍鮮食，客單價高、損耗低",
    ],
  },
];

const faqItems = [
  {
    q: "冷凍微波販賣機的加熱時間需要多久？",
    a: "搭載 3600W 商用級微波爐，一般冷凍餐盒加熱約 2-4 分鐘即可完成，視食品種類與份量而定。消費者選購後稍候即可取得熱騰騰的餐點。",
  },
  {
    q: "食品安全如何管控？",
    a: "我們累積服務全家超商數百台智慧販賣機的經驗，具備完整的食安管控能力：溫度 24H 即時監控、食品有效期限自動管理（過期自動下架）、異常溫度 LINE 即時通知、銷售紀錄完整可追溯。所有數據均在雲端 IVM 平台可查。",
  },
  {
    q: "有台灣製造和進口兩種機型可選嗎？",
    a: "是的。我們投資開發 100% 台灣研發製造的冷凍微波販賣機，品質穩定、維修方便。同時也提供性價比優異的進口機型。無論選擇哪種，都搭配相同的 MIT 雲端管理平台與全台服務能量。",
  },
  {
    q: "適合賣什麼商品？",
    a: "冷凍便當、冷凍調理包、冷凍水餃、湯品、海鮮、牛排、甜點等各類冷凍食品均可販售。TH-21MS 支援微波加熱後即食，TH-21FD/FS 則適合冷凍食材帶回家料理。可依場景與客群靈活配置商品組合。",
  },
  {
    q: "與日本首都高速公路的合作是什麼？",
    a: "我們的冷凍微波販賣機技術受到日本首都高速公路集團青睞，已簽訂 MOU 合作備忘錄，計劃在全日本高速公路休息站進行布點。這是對我們技術品質與食安管控能力的國際級肯定。",
  },
  {
    q: "我是冷凍食材品牌商，可以怎麼合作？",
    a: "我們提供多種合作模式：品牌可以自購設備自行營運，也可以與我們合作設點、分潤經營。我們負責設備、平台、維護；品牌負責商品供應。打造 24H 無人自助取貨站，拓展全新銷售通路。歡迎聯繫我們討論最適合的合作方案。",
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "冷凍微波販賣機 TH-21MS",
  description:
    "100% 台灣研發製造冷凍微波販賣機，搭載商用 3600W 微波加熱，-18°C~4°C 全溫域控制。服務全家超商數百台經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
  image: "https://www.mcstation.ai/images/products/frozen-microwave/th-21ms-catalog.png",
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
    url: "https://www.mcstation.ai/products/frozen-microwave",
  },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
    { "@type": "ListItem", position: 2, name: "產品", item: "https://www.mcstation.ai/products/frozen-microwave" },
    { "@type": "ListItem", position: 3, name: "冷凍微波販賣機", item: "https://www.mcstation.ai/products/frozen-microwave" },
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

function SpecIcon({ type }: { type: string }) {
  if (type === "freeze")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-6-3l6-6 6 6M6 9l6 6 6-6M9 3h6M9 21h6" />
      </svg>
    );
  if (type === "microwave")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
      </svg>
    );
  if (type === "elevator")
    return (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5-3L16.5 18m0 0L12 13.5m4.5 4.5V4.5" />
      </svg>
    );
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 17.25v1.007a3 3 0 01-.879 2.122L7.5 21h9l-.621-.621A3 3 0 0115 18.257V17.25m6-12V15a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 15V5.25A2.25 2.25 0 015.25 3h13.5A2.25 2.25 0 0121 5.25z" />
    </svg>
  );
}

export default function FrozenMicrowavePage() {
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
        <section className="bg-gradient-to-br from-[#0a1628] via-[#0f2440] to-[#1a3a5c] pt-28 pb-20 text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "radial-gradient(circle, #3b82f6 1px, transparent 1px)",
                backgroundSize: "50px 50px",
              }}
            />
          </div>
          {/* Animated frost effect */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-72 h-72 bg-cyan-400/10 rounded-full blur-3xl" />

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
                <div className="flex flex-wrap gap-3 mb-4">
                  <span className="bg-red-500/20 text-red-300 px-4 py-1.5 rounded-full text-sm font-medium border border-red-500/30">
                    🔥 主力推薦
                  </span>
                  <span className="bg-blue-500/20 text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/30">
                    🇯🇵 日本首都高速指定
                  </span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mt-4 mb-4 leading-tight">
                  冷凍微波<br />
                  <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">販賣機</span>
                </h1>
                <p className="text-xl text-white/80 mb-6 leading-relaxed">
                  冷食瞬間變熱餐 — 台灣唯一擁有上百台實績，投資開發 100% 台製冷凍微波機。
                  受日本首都高速公路青睞，簽訂 MOU 布點全日本休息站。
                </p>
                <div className="flex flex-wrap gap-3 mb-8">
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                    商用 3600W 微波
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                    -18°C 精準冷凍
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                    食安管控平台
                  </span>
                  <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                    台製 / 進口可選
                  </span>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link
                    href="/#contact"
                    className="bg-gradient-to-r from-mcs-orange to-orange-500 text-white px-8 py-3 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                  >
                    立即諮詢
                  </Link>
                  <Link
                    href="#products"
                    className="border-2 border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-all"
                  >
                    查看機型
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative">
                  <div className="w-72 h-80 lg:w-80 lg:h-[26rem] rounded-3xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-white/10">
                    <LightboxImage
                      src="/images/products/frozen-microwave/th-21ms-catalog.png"
                      alt="TH-21MS 冷凍微波加熱販賣機 - 100% 台灣製造"
                      width={500}
                      height={700}
                      className="w-full h-full object-cover object-top"
                    />
                  </div>
                  {/* Floating badge */}
                  <div className="absolute -bottom-4 -right-4 bg-white rounded-2xl shadow-xl p-4 text-center">
                    <div className="text-3xl font-bold text-mcs-blue-dark">100+</div>
                    <div className="text-xs text-gray-500">台灣實績台數</div>
                  </div>
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
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mx-auto mb-3 text-blue-600">
                    <SpecIcon type={s.icon} />
                  </div>
                  <div className="text-sm text-gray-500 mb-1">{s.label}</div>
                  <div className="font-bold text-mcs-blue-dark">{s.value}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Japan MOU Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <span className="bg-red-50 text-red-600 px-4 py-1.5 rounded-full text-sm font-medium">
                🇯🇵 國際肯定
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-4">
                日本首都高速公路 MOU 指定合作
              </h2>
              <p className="text-gray-500 max-w-3xl mx-auto">
                我們的冷凍微波販賣機技術品質與食安管控能力，獲得日本首都高速公路集團的高度認可，
                簽訂 MOU 合作備忘錄，計劃在全日本高速公路休息站進行布點，提供旅客 24 小時熱食服務。
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <LightboxImage
                  src="/images/products/frozen-microwave/japan-mou.jpg"
                  alt="銓幻元科技與日本首都高速公路集團簽訂 MOU 合作備忘錄"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 text-center">
                  與日本首都高速公路集團簽訂 MOU 合影
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-lg">
                <LightboxImage
                  src="/images/products/frozen-microwave/japan-expressway.png"
                  alt="日本首都高速公路休息站實地考察 - 冷凍微波販賣機布點規劃"
                  width={800}
                  height={600}
                  className="w-full h-auto"
                />
                <div className="bg-gray-50 px-4 py-2 text-xs text-gray-500 text-center">
                  日本首都高速公路休息站實地考察
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Safety & Platform */}
        <section className="py-20 bg-gradient-to-br from-green-50 to-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="bg-green-100 text-green-700 px-4 py-1.5 rounded-full text-sm font-medium">
                  食安管控
                </span>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-4 mb-6">
                  服務全家超商數百台經驗<br />
                  <span className="text-green-600">食安管控業界領先</span>
                </h2>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  不只賣機器，更提供完整的營運管理解決方案。我們累積服務全家超商數百台智慧販賣機的實戰經驗，
                  打造出業界最完善的食安管控系統，確保每一份餐點從入庫到售出全程可追溯、可管控。
                </p>
                <div className="space-y-4">
                  {[
                    { title: "溫度 24H 即時監控", desc: "全天候溫度紀錄，異常立即 LINE 推播通知" },
                    { title: "食品效期自動管理", desc: "過期商品自動下架，杜絕食安風險" },
                    { title: "銷售庫存即時掌握", desc: "雲端平台隨時查看，補貨時機精準判斷" },
                    { title: "全台服務能量", desc: "從安裝到維護，全台灣到府服務" },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <svg className="w-3.5 h-3.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <div className="font-medium text-gray-900">{item.title}</div>
                        <div className="text-sm text-gray-500">{item.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl">
                <LightboxImage
                  src="/images/products/frozen-microwave/ivm-platform-full.png"
                  alt="IVM 智能販賣機管理平台 - 食安管控、溫度監控、銷售數據"
                  width={800}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Product Lineup */}
        <section id="products" className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              冷凍 · 微波機型陣容
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              從冷凍保鮮到即時加熱，提供完整的冷凍販賣解決方案。台製與進口機型可選。
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {products.map((p, idx) => (
                <div
                  key={p.model}
                  className={`rounded-2xl overflow-hidden border transition-all hover:shadow-xl ${
                    idx === 0
                      ? "border-blue-200 shadow-lg ring-2 ring-blue-100"
                      : "border-gray-100 shadow-sm"
                  }`}
                >
                  {/* Product Image */}
                  <div className={`relative h-72 flex items-center justify-center ${
                    idx === 0 ? "bg-gradient-to-br from-blue-50 to-cyan-50" : "bg-gray-50"
                  }`}>
                    <LightboxImage
                      src={p.image}
                      alt={`${p.model} ${p.name}`}
                      width={300}
                      height={400}
                      className="h-64 w-auto object-contain"
                    />
                    <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold ${
                      idx === 0
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-700"
                    }`}>
                      {p.badge}
                    </div>
                  </div>
                  {/* Product Info */}
                  <div className="p-6">
                    <div className="text-sm text-blue-600 font-mono font-bold mb-1">{p.model}</div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{p.name}</h3>
                    <p className="text-sm text-gray-500 mb-4 leading-relaxed">{p.desc}</p>
                    {/* Spec Grid */}
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-400">溫控</div>
                        <div className="font-medium text-gray-700">{p.temp}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-400">貨道</div>
                        <div className="font-medium text-gray-700">{p.tracks}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-400">尺寸</div>
                        <div className="font-medium text-gray-700">{p.size}</div>
                      </div>
                      <div className="bg-gray-50 rounded-lg p-2">
                        <div className="text-gray-400">電源</div>
                        <div className="font-medium text-gray-700">{p.power}</div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              六大核心技術優勢
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              台灣唯一擁有上百台冷凍販賣機實績，技術與服務經驗領先業界
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((f, i) => (
                <div
                  key={i}
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg hover:border-blue-200 transition-all"
                >
                  <div className="text-3xl mb-4">{f.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{f.title}</h3>
                  <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
              應用場景 · 合作模式
            </h2>
            <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
              從高速公路到社區大樓，冷凍微波販賣機正在改變熱食的取得方式
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {useCases.map((u) => (
                <div
                  key={u.scene}
                  className={`rounded-2xl p-6 transition-all hover:shadow-lg ${
                    u.highlight
                      ? "bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200"
                      : "bg-white border border-gray-100"
                  }`}
                >
                  <div className="text-4xl mb-4">{u.icon}</div>
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{u.scene}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{u.desc}</p>
                  {u.highlight && (
                    <div className="mt-3 inline-flex items-center text-xs text-blue-600 font-medium">
                      <svg className="w-3.5 h-3.5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                      重點推廣場景
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Comparison */}
        <section className="py-20 bg-gradient-to-br from-[#0a1628] to-[#1a3a5c] text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl sm:text-4xl font-bold text-center mb-4">
              為什麼選我們的冷凍微波販賣機？
            </h2>
            <p className="text-center text-white/70 mb-12">
              台灣唯一百台實績 · 食安管控業界標竿 · 國際認證品質
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {advantages.map((a) => (
                <div key={a.title} className="bg-white/10 backdrop-blur rounded-2xl p-6 border border-white/10">
                  <h3 className="text-lg font-bold text-cyan-400 mb-4">{a.title}</h3>
                  <ul className="space-y-3">
                    {a.points.map((p, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-white/85">
                        <svg className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
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

        {/* FamilyMart Proof */}
        <section className="py-20 bg-white">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-3xl p-8 md:p-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    服務全家超商<br />數百台實戰經驗
                  </h2>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    我們的智慧販賣機已大規模部署於全家便利商店，累積數百台的運營管理經驗。
                    這代表我們的設備品質、食安管控系統、以及全台服務能量，
                    都已通過大型連鎖通路的嚴格驗證。
                  </p>
                  <div className="flex flex-wrap gap-4 text-sm">
                    <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                      <div className="text-2xl font-bold text-green-600">數百台</div>
                      <div className="text-gray-500">服務全家設備數</div>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                      <div className="text-2xl font-bold text-blue-600">全台灣</div>
                      <div className="text-gray-500">服務涵蓋範圍</div>
                    </div>
                    <div className="bg-white rounded-xl px-4 py-3 shadow-sm">
                      <div className="text-2xl font-bold text-mcs-orange">24/7</div>
                      <div className="text-gray-500">即時監控管理</div>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl overflow-hidden shadow-lg">
                  <LightboxImage
                    src="/images/products/frozen-microwave/familymart-case.jpeg"
                    alt="全家便利商店智慧販賣機 - 銓幻元科技服務實績"
                    width={600}
                    height={500}
                    className="w-full h-auto"
                  />
                </div>
              </div>
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
              關於冷凍微波販賣機的常見疑問
            </p>
            <div className="space-y-4">
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  className="bg-white rounded-xl border border-gray-100 group"
                >
                  <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-gray-900 hover:text-blue-600 transition-colors">
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

        {/* CTA */}
        <section className="bg-gradient-to-r from-blue-600 to-cyan-600 py-16">
          <div className="max-w-4xl mx-auto px-4 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">開啟 24H 無人熱食新商機</h2>
            <p className="text-lg text-white/90 mb-4">
              無論您是餐飲連鎖、冷凍食材業者、還是通路營運商，我們都有最適合的合作方案。
            </p>
            <p className="text-white/70 mb-8">
              從場地評估、設備安裝、到營運管理，全程一站式服務。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/#contact"
                className="bg-white text-blue-600 px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors shadow-lg"
              >
                立即諮詢合作
              </Link>
              <Link
                href="/products/grabox"
                className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                看智取櫃產品
              </Link>
              <Link
                href="/cases"
                className="border-2 border-white/50 text-white/90 px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
              >
                客戶實績
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
