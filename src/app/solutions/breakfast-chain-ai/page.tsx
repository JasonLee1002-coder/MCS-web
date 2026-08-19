import type { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BreakfastChainAIShowcase from "@/components/BreakfastChainAIShowcase";

export const metadata: Metadata = {
  // 根 layout 的 title template 是 "%s | 銓幻元科技 MCS"，會自動接在後面，此處不重複品牌名。
  title: "連鎖早餐門市 AI 導入：門市代理人與總部協同技術能量",
  description:
    "連鎖早餐體系導入門市 AI 的技術能量說明：店長以通訊軟體自然語言操作、總部與門市雙層 AI 自治協同、加盟體系資料主權切分、廠商中立介接層、斷線續轉，以及智取櫃等 IoT 設備事件整合。軟硬體同一團隊、100% 台灣研發製造。",
  keywords: [
    "早餐店 AI",
    "連鎖早餐 AI 導入",
    "門市 AI 代理人",
    "餐飲 AI 系統",
    "連鎖餐飲數位轉型",
    "POS KDS 整合",
    "加盟體系 資料主權",
    "門市智慧化",
    "智取櫃",
    "銓幻元科技",
  ],
  alternates: {
    canonical: "/solutions/breakfast-chain-ai",
  },
  openGraph: {
    title: "連鎖早餐門市 AI 導入技術能量 | 銓幻元科技 MCS",
    description:
      "尖峰兩小時才是門市 AI 的考題。門市代理人、雙層自治協同、加盟資料主權、廠商中立介接、斷線續轉與設備事件整合。",
    url: "https://www.mcstation.ai/solutions/breakfast-chain-ai",
    type: "website",
  },
};

/**
 * 常見問題。刻意不放價格、交期，也不放未經驗證的效益數字——
 * 這頁講的是技術能量，不是案例成果。
 */
const faqItems = [
  {
    q: "連鎖早餐導入門市 AI，第一線人員需要學新系統嗎？",
    a: "不需要。門市 AI 代理人以既有通訊軟體對話操作，店長與員工用自然語言問答即可完成查詢、叫貨與客訴記錄，免安裝 App、免額外介面訓練，對中高齡與外籍夥伴特別友善。",
  },
  {
    q: "加盟店自行採購的資料會被總部看到嗎？",
    a: "不會。我們在設計上把資料分成總部共享層與分店私有層：品牌標準品項的銷售與時段資料可跨店共享；加盟主自行採購的往來與價格、員工個資、分店財務明細留在門市端，跨店特徵一律先去識別化與彙總後才離開門市。",
  },
  {
    q: "門市網路斷線的時候，系統會停擺嗎？",
    a: "不會。門市 AI 在連線異常時改用本地快取自主運作，作業查詢與叫貨紀錄先暫存門市端，恢復連線後自動補送，不需要人工重打。早餐尖峰時段最不能承受的就是等雲端恢復。",
  },
  {
    q: "我們已經有收銀系統了，需要換掉嗎？",
    a: "不需要。我們採廠商中立的介接層設計，各家收銀與菜單系統透過標準化轉接層接入，資料先正規化進自有資料層，不直接依賴特定廠商的資料格式。日後要換系統，只需要更換轉接層，不必連 AI 一起重做。",
  },
  {
    q: "門市需要另外採購 AI 硬體嗎？",
    a: "不需要。推論集中在雲端執行，門市端不必額外擺放 AI 運算設備。門市既有的收銀、廚房顯示與智取櫃等設備事件，會透過轉接層匯入同一條事件流。",
  },
  {
    q: "可以先小範圍試做嗎？",
    a: "可以，而且我們建議這樣開始。門市 AI 值不值得做，要看它在真實尖峰時段能不能撐住，先從少數門市驗證再決定擴展範圍，比先做一份完整規劃書務實。歡迎透過網站聯絡我們討論適合的驗證範圍。",
  },
];

export default function BreakfastChainAIPage() {
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqItems.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "首頁", item: "https://www.mcstation.ai" },
      {
        "@type": "ListItem",
        position: 2,
        name: "連鎖早餐門市 AI",
        item: "https://www.mcstation.ai/solutions/breakfast-chain-ai",
      },
    ],
  };

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
        />

        <BreakfastChainAIShowcase />

        {/* FAQ */}
        <section className="bg-gray-50 py-20">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">常見問題</h2>
            <div className="space-y-4">
              {faqItems.map((item) => (
                <details
                  key={item.q}
                  className="group rounded-xl bg-white border border-gray-100 p-5 open:shadow-md transition-shadow"
                >
                  <summary className="cursor-pointer font-bold text-gray-900 list-none flex justify-between items-start gap-4">
                    <span>{item.q}</span>
                    <span className="text-mcs-orange shrink-0 transition-transform group-open:rotate-45" aria-hidden="true">
                      ＋
                    </span>
                  </summary>
                  <p className="mt-3 text-gray-600 text-sm leading-relaxed">{item.a}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
