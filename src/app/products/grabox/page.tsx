import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "GraBox AI 智取櫃 | 三溫層智慧取餐櫃",
  description:
    "GraBox AI 智取櫃：結合 AI 訂餐系統的智慧取餐櫃。三溫層控制（常溫/冷藏/冷凍）、人臉辨識、多元支付、24H無人取餐。單機版 NT$15-25萬，100% 台灣製造。適用餐廳、飯店、企業、學校。",
  keywords: [
    "GraBox",
    "AI智取櫃",
    "智取櫃",
    "智慧取餐櫃",
    "三溫層智取櫃",
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
      "三溫層 AI 智慧取餐櫃，人臉辨識取餐、多元支付、雲端管理。100% 台灣製造。",
    images: ["/images/01_grabox_main.png"],
  },
};

const specs = [
  { label: "格數規格", value: "6 / 12 / 18 / 24 格", icon: "grid" },
  { label: "溫控範圍", value: "常溫 · 冷藏 · 冷凍", icon: "temp" },
  { label: "標準寬度", value: "60 - 120 cm", icon: "size" },
  { label: "電壓", value: "110V / 60Hz", icon: "power" },
];

const features = [
  {
    title: "AI 智慧訂餐",
    desc: "內建 AI 訂餐系統，消費者可透過手機、觸控螢幕或語音下單，智能推薦餐點。",
  },
  {
    title: "三溫層混搭",
    desc: "同一台機器可同時配置常溫（15-25°C）、冷藏（2-8°C）、冷凍（-18°C以下）格位。",
  },
  {
    title: "人臉辨識取餐",
    desc: "刷臉即可開櫃取餐，免掃碼、免輸密碼，3 秒完成取餐動作。",
  },
  {
    title: "多元支付",
    desc: "LINE Pay、街口、悠遊卡、信用卡、Apple Pay、Google Pay，一機搞定。",
  },
  {
    title: "雲端即時管理",
    desc: "即時 Dashboard 監控所有櫃位狀態、溫度、銷售數據，自動補貨提醒。",
  },
  {
    title: "OEM/ODM 客製",
    desc: "外觀、軟體介面、品牌 Logo 全客製。少量多樣，彈性生產。",
  },
];

const useCases = [
  { scene: "餐廳 / 便當店", desc: "24H 無人取餐，解決尖峰等候問題" },
  { scene: "飯店 / 民宿", desc: "房客自助取餐，降低人力成本" },
  { scene: "企業 / 辦公大樓", desc: "員工訂餐直取，提升午餐效率" },
  { scene: "學校 / 醫院", desc: "大量配餐場景，分流取餐人潮" },
  { scene: "便利商店 / 超市", desc: "擴充自助取貨，延伸服務時段" },
  { scene: "外送平台整合", desc: "UberEats / Foodpanda 訂單自動入櫃" },
];

const advantages = [
  {
    title: "vs 傳統密碼鎖櫃",
    points: [
      "GraBox 內建 AI 系統，不只是「放東西的櫃子」",
      "三溫層混搭，傳統櫃只有常溫",
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
      "4-6 週即可上線，自建至少半年",
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

export default function GraBoxPage() {
  return (
    <main className="min-h-screen bg-white">
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
                不只是取餐櫃 — 結合 AI 訂餐系統、人臉辨識、三溫層控制的
                新一代智慧設備。100% 台灣設計製造。
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  單機版 NT$15-25 萬
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  聯網版 NT$25-40 萬
                </span>
                <span className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-sm">
                  交期 4-6 週
                </span>
              </div>
            </div>
            <div className="flex justify-center">
              <div className="w-72 h-72 lg:w-96 lg:h-96 rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src="/images/01_grabox_main.png"
                  alt="GraBox AI 智取櫃產品圖"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                  priority
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

      {/* Features */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-4">
            六大核心功能
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-2xl mx-auto">
            GraBox 不只是硬體，是一套完整的 AI 智慧取餐解決方案
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
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-900 mb-12">
            適用場景
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {useCases.map((u) => (
              <div key={u.scene} className="flex items-start gap-4 p-5 bg-gray-50 rounded-xl">
                <span className="w-2 h-2 bg-mcs-orange rounded-full mt-2 flex-shrink-0" />
                <div>
                  <div className="font-bold text-gray-900">{u.scene}</div>
                  <div className="text-sm text-gray-500 mt-1">{u.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-r from-mcs-orange to-mcs-orange-light py-16">
        <div className="max-w-4xl mx-auto px-4 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">準備好升級了嗎？</h2>
          <p className="text-lg text-white/90 mb-8">
            從諮詢到安裝，4-6 週即可上線。全台到府服務，含教育訓練。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
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
  );
}
