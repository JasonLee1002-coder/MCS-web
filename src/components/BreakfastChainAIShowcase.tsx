"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/**
 * 早餐連鎖 × 門市 AI 代理人｜技術能量頁
 *
 * 內容邊界（2026-08-19 建立時定下，之後改版請一併遵守）：
 *  - 不出現任何客戶名、門市數量、供應商名稱或後台系統名
 *  - 不出現合作夥伴的產品名（那是對方的 IP，不是我們的技術能量）
 *  - 不出現價格與交期（全站規範）
 *  - 不出現未經驗證的效益百分比與延遲數字
 *    （本站 2026-08 才做完全站杜撰數字清查，不能再種一批回去）
 *  - 寫「我們具備什麼技術能量」，不寫「我們已經幫誰做到多少」
 */

function useFadeUp<T extends HTMLElement>(delay = 0) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setTimeout(() => el.classList.add("bca-in"), delay);
          obs.disconnect();
        }
      },
      { threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return ref;
}

function Section({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useFadeUp<HTMLDivElement>(delay);
  return (
    <div ref={ref} className={"bca-fade " + className}>
      {children}
    </div>
  );
}

const CHALLENGES = [
  {
    no: "01",
    title: "尖峰兩小時，系統同時被三邊拉扯",
    body: "早餐生意的營收高度集中在開店後的頭兩個小時。同一個時間點，櫃檯在結帳、廚房在出餐、外送平台在派單，三套系統各自要人操作。介面一複雜，第一線就會放棄使用，訂單在最忙的時候從流程裡掉出去。",
    cap: "解法方向：事件驅動的統一介面層，讓門市只面對一個對話視窗",
  },
  {
    no: "02",
    title: "會做的人走了，做法就跟著走了",
    body: "作業標準多半留在紙本手冊與資深員工的手感裡。人力結構常見中高齡與外籍夥伴，新人培訓要好幾週；店長一異動，那間店的做法等於重來一次。",
    cap: "解法方向：把作業知識向量化，讓現場用講的就能問到步驟與出處",
  },
  {
    no: "03",
    title: "備貨靠直覺，賺的利潤留在垃圾桶裡",
    body: "叫多少貨往往取決於店長的經驗值。既有進銷存系統只看得到自己的歷史數字，天氣、學校行事曆、周邊活動這些真正影響早餐客流的變數，從來沒有進到決策裡。",
    cap: "解法方向：把外部變數接進預測，並與既有叫貨系統交叉驗證",
  },
];

const CAPABILITIES = [
  {
    icon: "💬",
    title: "門市 AI 代理人",
    lead: "店長用講的，不用學系統",
    points: [
      "以通訊軟體對話操作，免安裝 App、免介面訓練",
      "一句話問到今日訂單、備料狀況與設備狀態",
      "叫貨、客訴、交班紀錄都用自然語言完成",
      "支援中英與台語口音，對中高齡與外籍夥伴友善",
    ],
  },
  {
    icon: "🔗",
    title: "總部與門市雙層自治",
    lead: "不是上對下的遙控，是兩個代理人協同",
    points: [
      "門市端負責即時、低延遲的本地決策",
      "總部端負責跨店比較、異常根因與品牌層預測",
      "任務下派、異常上報、同儕學習三條協議並行",
      "超出授權範圍的決策自動請示，不自作主張",
    ],
  },
  {
    icon: "🛡️",
    title: "加盟體系的資料主權切分",
    lead: "共享的歸共享，私有的留在店裡",
    points: [
      "品牌標準品項的銷售與時段資料可跨店共享",
      "加盟主自行採購的往來與價格屬商業機密，不強制上傳",
      "員工個資與分店財務明細留在門市端",
      "跨店特徵一律先去識別化與彙總才離開門市",
    ],
  },
  {
    icon: "🔌",
    title: "廠商中立的介接層",
    lead: "換系統只換轉接頭，不用重做 AI",
    points: [
      "各家收銀與菜單系統透過標準化轉接層接入",
      "資料先正規化進自有資料層，不直接依賴廠商格式",
      "事件統一轉成標準格式，替換來源不動核心邏輯",
      "推論模型可替換，不鎖定單一供應商",
    ],
  },
  {
    icon: "📡",
    title: "斷線也要能做生意",
    lead: "尖峰時段不能等雲端恢復",
    points: [
      "連線正常時門市與總部即時協同",
      "連線異常時改用本地快取自主運作",
      "作業查詢與叫貨紀錄先暫存門市端",
      "恢復連線後自動補送，不需人工重打",
    ],
  },
  {
    icon: "🧊",
    title: "設備事件直接進同一條流",
    lead: "這是我們自己做的硬體，不是外接",
    points: [
      "智取櫃格位使用率與溫控告警即時上報",
      "餐點入櫃逾時自動提醒通知取餐",
      "設備健康狀態併入異常根因分析",
      "軟硬體同一團隊，介接不必跨公司協調",
    ],
  },
];

const FLOW = [
  { k: "門市端", v: "收銀、廚房出餐、外送單、智取櫃與環境感測，各自產生事件" },
  { k: "轉接層", v: "不同廠牌的資料格式在此正規化，成為系統可以一致理解的事件" },
  { k: "事件匯流", v: "訂單、菜單、庫存、會員各走各的通道，互不阻塞" },
  { k: "AI 推論層", v: "集中在雲端，門市端不需要另外擺 AI 硬體" },
  { k: "回到現場", v: "結論以對話回覆店長，或直接回寫叫貨與補救動作" },
];

const WHY_US = [
  {
    t: "軟硬體同一個團隊",
    d: "設備、韌體、雲端後台都是自己做。門市端要多加一個感測事件，不必跨三家公司開會。",
  },
  {
    t: "本來就在做系統串接",
    d: "收銀、廚房顯示、會員、金流與外送平台的整合是我們既有的工作內容，不是為了這個題目才學。",
  },
  {
    t: "100% 台灣研發製造",
    d: "現場出狀況時，人和料都在同一個時區。這在尖峰時段的營運系統上，比規格表更重要。",
  },
];

export default function BreakfastChainAIShowcase() {
  return (
    <>
      <style>{`
        .bca-fade { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
        .bca-in { opacity: 1; transform: none; }
        @media (prefers-reduced-motion: reduce) {
          .bca-fade { opacity: 1; transform: none; transition: none; }
        }
        .bca-grid-bg {
          background-image:
            linear-gradient(rgba(255,255,255,.045) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.045) 1px, transparent 1px);
          background-size: 44px 44px;
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden bg-gradient-to-br from-mcs-blue-dark via-[#10233d] to-mcs-blue pt-28 pb-20 text-white">
        <div className="absolute inset-0 bca-grid-bg opacity-60" aria-hidden="true" />
        <div
          className="absolute -top-24 -right-24 w-[420px] h-[420px] rounded-full blur-3xl opacity-25"
          style={{ background: "radial-gradient(circle, #E8751A 0%, transparent 65%)" }}
          aria-hidden="true"
        />
        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <span className="inline-block text-xs tracking-[0.2em] text-mcs-orange font-semibold mb-5">
              技術能量 ／ 連鎖早餐 × 門市 AI
            </span>
            <h1 className="text-3xl sm:text-5xl font-bold leading-tight mb-6">
              早餐店最忙的兩個小時，
              <br className="hidden sm:block" />
              才是 AI 真正要證明自己的時候
            </h1>
            <p className="text-white/70 text-base sm:text-lg max-w-3xl leading-relaxed">
              多數餐飲 AI 的示範都在離峰時段跑得很漂亮。連鎖早餐不一樣——營收擠在開店後兩小時，
              系統要同時扛住結帳、出餐與外送派單，操作它的人可能是第一天上工的新人。
              我們把門市 AI 當成一個必須在這種條件下站得住的系統來設計。
            </p>
            <div className="mt-9 flex flex-col sm:flex-row gap-3">
              <Link
                href="/#contact"
                className="bg-mcs-orange hover:bg-mcs-orange-light transition-colors px-8 py-3.5 rounded-full font-medium text-center"
              >
                談談你的門市場景
              </Link>
              <Link
                href="/products/grabox"
                className="border border-white/25 hover:bg-white/10 transition-colors px-8 py-3.5 rounded-full font-medium text-center"
              >
                看設備端能力
              </Link>
            </div>
          </Section>
        </div>
      </section>

      {/* ── 三個難題 ── */}
      <section className="bg-white py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              連鎖早餐的三個結構性難題
            </h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
              這三件事幾乎每個多店早餐體系都會遇到。它們不是換一套收銀系統就能解決的，
              因為問題出在跨系統的縫隙裡。
            </p>
          </Section>
          <div className="space-y-5">
            {CHALLENGES.map((c, i) => (
              <Section key={c.no} delay={i * 90}>
                <div className="group rounded-2xl border border-gray-100 hover:border-mcs-orange/40 hover:shadow-lg transition-all p-6 sm:p-8 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-5">
                    <span className="text-3xl font-bold text-mcs-orange/25 group-hover:text-mcs-orange/60 transition-colors shrink-0">
                      {c.no}
                    </span>
                    <div className="min-w-0">
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">{c.title}</h3>
                      <p className="text-gray-600 leading-relaxed mb-4">{c.body}</p>
                      <p className="text-sm text-mcs-orange font-medium border-l-2 border-mcs-orange/40 pl-3">
                        {c.cap}
                      </p>
                    </div>
                  </div>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── 六項技術能量 ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">六項技術能量</h2>
            <p className="text-gray-500 mb-12 max-w-2xl">
              我們把門市 AI 拆成六個必須各自成立的能力。少了任何一項，整套在真實門市裡都會卡住。
            </p>
          </Section>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {CAPABILITIES.map((c, i) => (
              <Section key={c.title} delay={(i % 3) * 80}>
                <div className="h-full rounded-2xl bg-white border border-gray-100 hover:border-mcs-orange/40 hover:shadow-lg transition-all p-6">
                  <div className="text-3xl mb-4" aria-hidden="true">
                    {c.icon}
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-1.5">{c.title}</h3>
                  <p className="text-sm text-mcs-orange font-medium mb-4">{c.lead}</p>
                  <ul className="space-y-2.5">
                    {c.points.map((p) => (
                      <li key={p} className="flex gap-2.5 text-sm text-gray-600 leading-relaxed">
                        <span className="text-mcs-orange mt-0.5 shrink-0" aria-hidden="true">
                          ▸
                        </span>
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── 資料怎麼流 ── */}
      <section className="bg-mcs-blue-dark py-20 text-white relative overflow-hidden">
        <div className="absolute inset-0 bca-grid-bg opacity-40" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-3">
              一筆事件從現場到決策，會經過什麼
            </h2>
            <p className="text-white/60 mb-12">
              每一層都可以獨立替換。這是為了讓體系日後換收銀、換供應商時，不必連 AI 一起重做。
            </p>
          </Section>
          <ol className="space-y-3">
            {FLOW.map((f, i) => (
              <Section key={f.k} delay={i * 80}>
                <li className="flex gap-4 sm:gap-6 items-start rounded-xl bg-white/[0.06] border border-white/10 p-5 hover:bg-white/[0.1] transition-colors">
                  <span className="text-mcs-orange font-mono text-sm pt-0.5 shrink-0 w-6">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0">
                    <div className="font-bold mb-1">{f.k}</div>
                    <div className="text-white/65 text-sm leading-relaxed">{f.v}</div>
                  </div>
                </li>
              </Section>
            ))}
          </ol>
        </div>
      </section>

      {/* ── 為什麼找我們 ── */}
      <section className="bg-white py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Section>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-10">
              為什麼是我們來做這件事
            </h2>
          </Section>
          <div className="grid sm:grid-cols-3 gap-6">
            {WHY_US.map((x, i) => (
              <Section key={x.t} delay={i * 90}>
                <div className="h-full rounded-2xl border border-gray-100 p-6 hover:shadow-md transition-shadow">
                  <h3 className="font-bold text-gray-900 mb-2">{x.t}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{x.d}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-gradient-to-r from-mcs-orange to-mcs-orange-light py-16">
        <div className="max-w-3xl mx-auto px-4 text-center text-white">
          <Section>
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              先從一間店開始，比先做一份規劃書實在
            </h2>
            <p className="text-white/90 mb-8 leading-relaxed">
              門市 AI 值不值得做，不是看簡報，是看它在你店裡最忙的那兩個小時能不能撐住。
              告訴我們你的門市型態與現有系統，我們可以先談一個小範圍的驗證做法。
            </p>
            <Link
              href="/#contact"
              className="inline-block bg-white text-mcs-orange px-10 py-3.5 rounded-full font-bold hover:bg-white/90 transition-colors"
            >
              聊聊你的場景
            </Link>
          </Section>
        </div>
      </section>
    </>
  );
}
