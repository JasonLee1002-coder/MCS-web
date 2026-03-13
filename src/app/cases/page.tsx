import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { LightboxImage, LightboxVideo } from "@/components/Lightbox";


export const metadata: Metadata = {
  title: "客戶實績 | 麗嬰國際、麥味登、鼎新電腦、首都高速公路合作案例",
  description:
    "銓幻元科技客戶成功案例：麗嬰國際 Funbox Toys 智能販賣機、麥味登智取櫃、宮廟數位功德箱、自助旅店 Kiosk、玩具加乘潮流販賣機、日本首都高速公路合作。台灣在地製造，跨產業 AI 智慧設備整合。",
  openGraph: {
    title: "客戶實績 | 銓幻元科技 MCS",
    description:
      "從文創玩具到餐飲連鎖、從宮廟文化到日本海外 — 銓幻元科技跨產業 AI 智慧設備整合案例。",
    images: ["/images/cases/funbox/vending-machines.jpg"],
  },
};

const cases = [
  {
    id: "funbox",
    client: "麗嬰國際 Funbox Toys",
    title: "20+ 台品牌主題智能販賣機進駐全台",
    subtitle: "文創玩具 × 智能零售的全新體驗",
    description:
      "麗嬰國際旗下 Funbox Toys 與銓幻元科技合作，在全台多個高人流商場部署品牌主題智能販賣機。寶可夢、TOMICA、Disney Motors、KEEPPLAY 等知名 IP 玩具，透過觸控螢幕互動、信用卡感應支付，24 小時自助販售，為消費者帶來全新購物體驗。",
    highlights: [
      "20+ 台品牌主題智能販賣機",
      "寶可夢、TOMICA、Disney、KEEPPLAY 等知名 IP",
      "台北地下街「來玩聚 Play Together」專區",
      "美麗華百樂園 4F · 新竹巨城 5F · 裕隆城",
      "觸控螢幕 + 信用卡感應支付",
      "雲端即時銷售數據與庫存監控",
      "鼎新電腦 ERP 系統整合",
      "加值服務平台 3 年維護合約",
    ],
    images: [
      { src: "/images/illustrations/funbox.png", alt: "麗嬰國際 Funbox 寶可夢 TOMICA 品牌智能販賣機 商場實景" },
      { src: "/images/cases/funbox/vending-machines.jpg", alt: "麗嬰國際 Funbox 寶可夢 TOMICA KEEPPLAY 品牌智能販賣機" },
      { src: "/images/cases/funbox/store-front.jpg", alt: "台北地下街 來玩聚 Play Together 智能販賣機專區" },
    ],
    tags: ["智能販賣機", "文創玩具", "百貨商場", "多元支付", "雲端管理"],
  },
  {
    id: "mwd",
    client: "麥味登 MWD（揚秦國際）",
    title: "智慧餐飲門市 × My SMART 智取櫃",
    subtitle: "連鎖餐飲品牌的數位轉型標竿",
    description:
      "與台灣知名連鎖早午餐品牌麥味登（揚秦國際集團）合作，打造全新智慧門市概念。首間智能店型於桃園大興店啟動，導入「智能取餐櫃」，APP 點餐後掃 QR Code 直接取餐，不需經過櫃台。AI 預測模組分析尖峰時段點餐率，提前預製半成品加快出餐速度，智取櫃採租賃制納入加盟金內。",
    highlights: [
      "首間智能店：桃園大興店，第二站忠孝新生店",
      "智能取餐櫃：APP 掃 QR Code 自助取餐",
      "AI 尖峰預測：分析點餐數據，預製加速出餐",
      "KDS 廚房顯示系統串接",
      "PEANUTS / Snoopy 聯名主題店與周邊商品",
      "智取櫃租賃制，加盟金含設備",
    ],
    images: [
      { src: "/images/cases/mwd/mwd-snoopy-storefront.jpg", alt: "麥味登 Snoopy 聯名智慧門市外觀 My Express 智取櫃 TAKE OUT" },
      { src: "/images/cases/mwd/grabox-closeup.jpg", alt: "GraBox 智取櫃 12 格 LED 燈號近拍 麥味登門市" },
      { src: "/images/cases/mwd/grabox-use-cases.png", alt: "GraBox 智取櫃應用場景 麥味登 東方美 全家 佳德鳳梨酥" },
      { src: "/images/cases/mwd/snoopy-menu.jpg", alt: "麥味登 PEANUTS Snoopy 聯名菜單" },
      { src: "/images/cases/mwd/grabox-features.png", alt: "GraBox 智取櫃核心特色 智慧設計 安全可靠 靈活配置" },
    ],
    videos: [
      { src: "/images/cases/mwd/grabox-demo.mp4", alt: "GraBox 智取櫃取餐實際操作示範" },
      { src: "/images/cases/mwd/kaohsiung-expo.mp4", alt: "高雄加盟展 GraBox 智取櫃展示" },
    ],
    tags: ["智取櫃", "餐飲連鎖", "自助取餐", "POS串接", "數位轉型"],
  },
  {
    id: "temple",
    client: "宮廟數位功德香油箱",
    title: "傳統信仰 × 數位科技的跨界創新",
    subtitle: "全台首創智能數位功德箱｜已進駐多間宮廟",
    description:
      "將智能販賣機技術應用在台灣宮廟文化，打造全台首創的「數位功德香油箱」。傳統廟宇造型搭配觸控螢幕、電子支付，信眾可以刷卡或行動支付捐獻功德金。已成功進駐中壢仁海宮、士林成功廟、桃園護國宮太子廟等多間宮廟，金碧輝煌的外觀完美融合傳統美學與現代科技，是 OEM 客製化能力的最佳展現。",
    highlights: [
      "全台首創數位功德香油箱",
      "已進駐：中壢仁海宮、士林成功廟、桃園護國宮太子廟",
      "傳統宮廟造型 × 觸控螢幕互動",
      "信用卡 / 行動支付捐獻功德金",
      "客製化外觀設計（金龍、鳳凰雕刻）",
      "「有求必應」「祈願功德箱」「招財開運」主題機台",
      "可選四種神明動畫互動",
      "100% 台灣在地設計製造",
    ],
    images: [
      { src: "/images/cases/temple/renhai-temple-overview.jpg", alt: "中壢仁海宮數位功德香油箱部署實景 四張角度總覽" },
      { src: "/images/cases/temple/temple-machine-closeup.jpg", alt: "中壢仁海宮功德箱近拍 金龍雕刻傳統廟宇造型" },
      { src: "/images/cases/temple/shilin-front.jpg", alt: "士林成功廟祈願功德箱正面 觸控螢幕四神明選擇" },
      { src: "/images/cases/temple/shilin-temple-interior.jpg", alt: "士林成功廟大殿內功德箱部署環境" },
      { src: "/images/cases/temple/shilin-side.jpg", alt: "士林成功廟招財開運功德箱側面" },
      { src: "/images/cases/temple/huguo-037.jpg", alt: "桃園護國宮太子廟功德箱正面 觸控螢幕顯示天上聖母" },
      { src: "/images/cases/temple/huguo-042.jpg", alt: "桃園護國宮太子廟功德箱全景 傳統壁畫與龍柱" },
      { src: "/images/cases/temple/huguo-045.jpg", alt: "桃園護國宮太子廟大殿功德箱遠景" },
    ],
    videos: [
      { src: "/images/cases/temple/temple-machine-01.mp4", alt: "數位功德香油箱操作示範影片" },
      { src: "/images/cases/temple/temple-machine-02.mp4", alt: "數位功德香油箱觸控互動展示" },
      { src: "/images/cases/temple/temple-machine-03.mp4", alt: "數位功德香油箱完整導覽" },
      { src: "/images/cases/temple/renhai-kid.mp4", alt: "中壢仁海宮小朋友體驗數位功德箱" },
    ],
    tags: ["OEM客製", "宮廟文化", "數位支付", "文化創新", "台灣製造"],
  },
  {
    id: "toyplus",
    client: "玩具加乘「潮流合作社」",
    title: "潮流展會 × 限量公仔智能販賣",
    subtitle: "年輕世代的潮玩新體驗",
    description:
      "與玩具加乘合作，在潮流展會及活動現場部署「潮流合作社」品牌智能販賣機。販售限量公仔、潮流玩具，現場總是排隊人潮不斷。觸控螢幕展示商品細節，搭配多元支付，讓年輕消費者用全新方式購買潮玩。",
    highlights: [
      "潮流展會現場部署",
      "限量公仔 / 潮流玩具販售",
      "觸控螢幕商品展示",
      "現場排隊人潮驗證市場需求",
      "品牌視覺客製化",
    ],
    images: [
      { src: "/images/cases/toyplus/event-crowd.jpg", alt: "玩具加乘 潮流合作社 智能販賣機 展會現場排隊人潮" },
    ],
    tags: ["潮流玩具", "展會活動", "限量商品", "年輕族群", "品牌客製"],
  },
  {
    id: "hotel",
    client: "靈知科技 × 長林自助旅店",
    title: "旅宿業自助 Check-in/out Kiosk",
    subtitle: "無人櫃台的智慧旅宿體驗",
    description:
      "與靈知科技合作，為長林旅店集團（水漾月明度假文旅 MIZUTSUKI HOTEL）導入自助 Check-in/Check-out Kiosk。旅客可自助辦理入住、退房、停車繳費，支援多國語言介面，大幅降低櫃台人力需求，提升旅客入住效率。",
    highlights: [
      "自助 Check-in / Check-out",
      "多國語言介面（中/英/日/韓/越）",
      "信用卡 / 現金 / 行動支付",
      "發票列印功能",
      "停車繳費整合",
      "24 小時無人化營運支援",
    ],
    images: [
      { src: "/images/illustrations/kiosk.png", alt: "飯店自助 Check-in Kiosk 多國語言介面" },
      { src: "/images/cases/hotel/self-checkin.jpg", alt: "水漾月明度假文旅 自助 Check-in Kiosk 多語言介面" },
    ],
    tags: ["旅宿業", "自助Kiosk", "多語言", "無人櫃台", "智慧飯店"],
  },
  {
    id: "expressway",
    client: "日本首都高速公路",
    title: "冷凍微波機外銷日本 × 高速公路智能服務",
    subtitle: "台灣製造冷凍微波販賣機，走進日本首都高速公路",
    description:
      "與日本首都高速公路（Shuto Expressway）合作，將台灣製造的冷凍微波販賣機導入日本高速公路服務區。旅客可 24 小時自助選購冷凍餐點，機台自動微波加熱出餐，實現無人化熱食供應。這項跨國合作展現銓幻元的技術實力獲國際市場認可，是「台灣製造、外銷日本」的最佳證明。",
    highlights: [
      "冷凍微波販賣機外銷日本",
      "日本首都高速公路服務區部署",
      "24H 無人化熱食供應",
      "自動微波加熱出餐",
      "100% 台灣設計製造",
      "跨國技術合作典範",
    ],
    images: [
      { src: "/images/cases/expressway/shuto-group-photo.jpg", alt: "銓幻元科技團隊與日本首都高速道路合作夥伴合影" },
      { src: "/images/cases/expressway/shuto-office-reception.jpg", alt: "日本首都高速道路サービス辦公室接待處" },
      { src: "/images/cases/expressway/service-area-interior.jpg", alt: "日本首都高速公路服務區智能販賣機部署現場" },
      { src: "/images/cases/expressway/vending-closeup.jpg", alt: "團隊實地視察販賣機運作情形" },
      { src: "/images/cases/expressway/vending-menu-screen.jpg", alt: "冷凍微波販賣機日文餐點菜單觸控螢幕" },
      { src: "/images/cases/expressway/mitsui-soko-sign.jpg", alt: "三井倉庫物流株式會社 Mitsui-Soko Logistics" },
      { src: "/images/cases/expressway/warehouse-meeting.jpg", alt: "銓幻元團隊於三井倉庫物流中心商務會議" },
      { src: "/images/cases/expressway/overview-collage.png", alt: "日本首都高速公路合作案實地考察總覽" },
    ],
    tags: ["國際合作", "日本市場", "高速公路", "智慧交通", "台灣之光"],
  },
  {
    id: "oem",
    client: "台灣在地 OEM 製造",
    title: "100% 台灣設計、台灣製造",
    subtitle: "從設計到量產，品質嚴格把關",
    description:
      "委託銓幻元，所有智慧設備均可在台灣工廠設計、開發、製造。從電路板焊接、機構組裝到軟體燒錄，每一台設備都經過嚴格品質檢測。在地製造確保快速交貨、即時售後服務，不需等待海外零件，真正做到「台灣品質、國際水準」。",
    highlights: [
      "100% 台灣設計、台灣製造",
      "嚴格品質檢測流程",
      "少量多樣、彈性生產",
      "快速交貨，彈性排程",
      "全台售後服務網絡",
      "軟硬體一站式整合",
    ],
    images: [
      { src: "/images/illustrations/factory.png", alt: "台灣在地工廠品質檢測產線 - 銓幻元科技 100% 台灣製造" },
      { src: "/images/cases/oem/factory-inspection.jpg", alt: "台灣在地工廠品質檢測 - 銓幻元科技智慧設備製造" },
    ],
    tags: ["台灣製造", "OEM", "品質保證", "彈性生產", "在地服務"],
  },
];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
    { "@type": "ListItem", position: 2, name: "客戶實績", item: "https://www.mcstation.ai/cases" },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "客戶實績 | 銓幻元科技 MCS",
  description:
    "銓幻元科技客戶成功案例：麗嬰國際、麥味登、宮廟數位功德箱、日本首都高速公路等跨產業 AI 智慧設備整合。",
  url: "https://www.mcstation.ai/cases",
  mainEntity: cases.map((c) => ({
    "@type": "CreativeWork",
    name: `${c.client} — ${c.title}`,
    description: c.description,
    url: `https://www.mcstation.ai/cases#${c.id}`,
  })),
};

export default function CasesPage() {
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      {/* Header */}
      <section className="bg-gradient-to-br from-mcs-blue-dark to-mcs-blue pt-28 pb-16 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-white/60 hover:text-white text-sm mb-6"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            回首頁
          </Link>
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">客戶實績</h1>
          <p className="text-xl text-white/80 max-w-2xl">
            從文創玩具到餐飲連鎖、從宮廟文化到日本海外 — 看銓幻元科技如何用 AI
            智慧設備，為不同產業創造價值。
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {cases.map((c) => (
              <a
                key={c.id}
                href={`#${c.id}`}
                className="bg-white/10 hover:bg-white/20 border border-white/20 px-4 py-2 rounded-full text-sm transition-colors"
              >
                {c.client.split("（")[0].split("「")[0]}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Cases */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
          {cases.map((c, index) => (
            <article key={c.id} id={c.id} className="scroll-mt-24">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-mcs-orange/10 text-mcs-orange px-4 py-1.5 rounded-full text-sm font-medium">
                  Case {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-gray-400 text-sm">|</span>
                <span className="text-mcs-blue-dark font-medium">{c.client}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
                {c.title}
              </h2>
              <p className="text-lg text-mcs-orange font-medium mb-6">{c.subtitle}</p>

              <p className="text-gray-600 text-lg leading-relaxed mb-8 max-w-3xl">
                {c.description}
              </p>

              {c.images.length > 0 && (
                <div className={`grid gap-4 mb-8 ${c.images.length === 1 ? "grid-cols-1 max-w-2xl" : c.images.length === 2 ? "grid-cols-1 sm:grid-cols-2" : c.images.length > 4 ? "grid-cols-2 sm:grid-cols-3 lg:grid-cols-4" : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"}`}>
                  {c.images.map((img, i) => (
                    <div
                      key={i}
                      className={`rounded-2xl overflow-hidden shadow-lg ${
                        c.images.length === 3 && i === 0 ? "sm:col-span-2" : ""
                      }${c.images.length > 4 && i === 0 ? " col-span-2 row-span-2" : ""}`}
                    >
                      <LightboxImage
                        src={img.src}
                        alt={img.alt}
                        width={800}
                        height={500}
                        className="w-full h-64 sm:h-80 object-cover object-top hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              )}

              {("videos" in c) && (c as { videos: { src: string; alt: string }[] }).videos.length > 0 && (
                <div className="grid gap-4 mb-8 grid-cols-1 sm:grid-cols-2">
                  {(c as { videos: { src: string; alt: string }[] }).videos.map((vid, i) => (
                    <div key={i} className="rounded-2xl overflow-hidden shadow-lg">
                      <LightboxVideo
                        src={vid.src}
                        alt={vid.alt}
                        className="w-full h-64 sm:h-80 object-cover bg-black"
                      />
                    </div>
                  ))}
                </div>
              )}

              <div className="bg-gray-50 rounded-2xl p-6 sm:p-8">
                <h3 className="text-sm font-bold text-mcs-blue-dark uppercase tracking-wider mb-4">
                  專案亮點
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {c.highlights.map((h, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 bg-mcs-orange rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{h}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mt-6">
                {c.tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-white border border-gray-200 text-gray-500 px-3 py-1 rounded-full text-xs"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-mcs-orange to-mcs-orange-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">您的產業也能智慧升級</h2>
          <p className="text-lg text-white/90 mb-8">
            不論餐飲、零售、文創、交通、旅宿、宗教 — 銓幻元科技為您量身打造 AI 智慧設備解決方案
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-white text-mcs-orange px-8 py-3 rounded-full font-medium hover:bg-white/90 transition-colors"
            >
              回首頁了解更多
            </Link>
            <Link
              href="/products/grabox"
              className="border-2 border-white text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
            >
              看 GraBox 智取櫃
            </Link>
          </div>
        </div>
      </section>
    </main>
    <Footer />
    </>
  );
}
