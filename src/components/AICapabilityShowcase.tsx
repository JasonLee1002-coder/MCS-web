'use client'

import { useEffect, useRef, useState } from 'react'
import { AI_CAPABILITY_FAQS } from '@/data/ai-capabilities'

/**
 * AI 技術能量頁的內容主體。
 *
 * 內容邊界（2026-08-20，沿用 8/19 建 breakfast-chain-ai 時 Jason 定的同一條線）：
 *  - 不出現合作夥伴的產品名與架構圖。那是對方的 IP，掛我們的名字寫出來等於冒領。
 *  - 不出現客戶名、門市數量、供應商名、後台系統名。
 *  - 不出現價格、交期（全站規範），也不出現延遲毫秒數、準確率、節省百分比這類
 *    我方無法自證的效益數字——這正是 2026-08 全站杜撰數字清查在清的東西。
 *  - 全篇寫「我們具備什麼能力、為什麼這樣設計」，不寫「我們已經幫誰做到多少」。
 *
 * 寫法上刻意講「取捨」而不是列功能。功能清單誰都寫得出來，
 * 講清楚為什麼這樣選、代價是什麼，才是技術能量的證據。
 */

const ACCENT = '#FF6B35'

function Reveal({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [shown, setShown] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') { setShown(true); return }
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect() } },
      { threshold: 0.12 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return (
    <div
      ref={ref}
      style={{
        opacity: shown ? 1 : 0,
        transform: shown ? 'none' : 'translateY(14px)',
        transition: `opacity .55s ease ${delay}ms, transform .55s cubic-bezier(.16,1,.3,1) ${delay}ms`,
      }}
    >
      {children}
    </div>
  )
}

/** 四層能力堆疊 */
const LAYERS = [
  {
    tag: '資料層',
    en: 'Event Ingestion',
    title: '先讓事件流進來，AI 才有東西可想',
    body: '門市的資料散在點餐、廚房、庫存與設備四個地方，格式與更新頻率都不一樣。我們做的是事件驅動的匯流層：訂單成立、出餐完成、庫存異動、設備開關門與溫度回報，全部標準化成同一種事件送進同一條流。',
    detail: '沒有這一層，後面的預測與問答都只能拿到某一個系統的片面資料，講出來的答案會比人工判斷還糟。',
  },
  {
    tag: '檢索層',
    en: 'Semantic Access',
    title: '把營運資料變成可以用問的',
    body: '店長要的是「上週哪個時段最容易缺貨」，不是一張報表。這一層把自然語言的問題對應到實際的資料結構，再把查詢結果組回人話。難的不是產生查詢語句，是欄位命名跟真實語意常常對不上——這需要一份維護中的語意映射，不是接上模型就會通。',
    detail: '設計上，模型看得到資料的結構，看不到原始資料本身。',
  },
  {
    tag: '推論層',
    en: 'Inference',
    title: '異常要即時抓，需求要提前算',
    body: '兩種推論的節奏完全不同。異常偵測是連續的：溫度飄移、訂單量突然斷掉、設備回報停止，發生當下就要有人知道。需求預測是週期的：把歷史銷售與外部變數一起算，給出下一段時間的備貨方向。',
    detail: '預測給的是方向與區間，不是保證值。把預測講成承諾，是這類系統最常見的失信來源。',
  },
  {
    tag: '互動層',
    en: 'Interaction',
    title: '會用的人不一定會打字',
    body: '第一線是中高齡員工與外籍同仁，介面越複雜，實際使用率越低。這一層做的是語音問答與多語言介面，把 SOP 與作業知識整理成可檢索的形式，讓人用問的就能拿到答案，而不是翻紙本手冊。',
    detail: '知識要先被萃取出來才有得檢索——這件事的瓶頸從來不是技術，是有沒有人願意把老師傅的做法講出來。',
  },
]

/** 三個設計取捨 */
const TRADEOFFS = [
  {
    n: '01',
    title: '推論集中在雲端，門市端不放 AI 硬體',
    why: '門市端放推論硬體，就要面對數百個點位的維護、故障與版本不一致。集中在雲端只需要維護一套。',
    cost: '代價是對網路的依賴變高，所以斷線行為必須先設計好（見 03）。',
  },
  {
    n: '02',
    title: '模型看資料結構，不看原始資料',
    why: '要回答營運問題，模型需要知道有哪些欄位、彼此怎麼關聯，不需要知道每一筆交易的內容。把原始資料送進模型，是把風險換成一點方便。',
    cost: '代價是語意映射要人工維護，欄位改名就要跟著改，不能全自動。',
  },
  {
    n: '03',
    title: '斷線的時候，門市要能繼續做生意',
    why: '網路斷掉不能變成不能出餐。核心交易流程在本地完成，AI 提供的是建議與洞察，屬於可降級的部分。',
    cost: '代價是要明確切分「什麼是必要功能、什麼是加值功能」，並在斷線時誠實告訴使用者哪些暫時不可用。',
  },
]

/** 落到設備上 */
const ON_DEVICE = [
  { t: '取餐與販售設備', d: '開關門、取貨完成、庫存扣減與溫度回報，都是事件來源，也是異常偵測的觸發點。' },
  { t: '溫控與效期', d: '溫度與效期資料進到同一條流，超出設定範圍時可即時告警，紀錄也可作為稽核依據。' },
  { t: '補貨節奏', d: '銷售資料回推補貨頻率與品項結構，讓補貨從固定班表變成依實際消耗調整。' },
]


export default function AICapabilityShowcase() {
  return (
    <main style={{ background: '#0B1524' }} className="min-h-screen">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(900px 420px at 18% -10%, rgba(255,107,53,0.16), transparent 60%),' +
              'radial-gradient(700px 380px at 88% 8%, rgba(56,189,248,0.10), transparent 62%)',
          }}
        />
        <div className="relative max-w-3xl mx-auto px-5 pt-20 pb-14">
          <Reveal>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-4" style={{ color: ACCENT }}>
              AI Capability
            </p>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-100 leading-snug mb-5">
              AI 不是加在系統外面的一個功能，<br className="hidden sm:block" />
              是資料流本身
            </h1>
            <p className="text-slate-300 leading-relaxed mb-3">
              多數「導入 AI」的失敗，不是模型不夠好，是資料根本沒串起來。點餐一套、廚房一套、庫存一套、設備又一套，
              每一套都只看得到自己那一段，AI 拿到片面資料，給出的建議自然比店長的直覺還糟。
            </p>
            <p className="text-slate-400 text-sm leading-relaxed">
              這頁講的是我們怎麼處理這件事，以及為什麼這樣選。功能清單誰都列得出來，
              講清楚取捨與代價才是技術能量。
            </p>
          </Reveal>
        </div>
      </section>

      {/* 四層堆疊 */}
      <section className="max-w-3xl mx-auto px-5 pb-6">
        <Reveal>
          <h2 className="text-xl font-bold text-slate-100 mb-2">四層能力，缺一層前面都白做</h2>
          <p className="text-slate-500 text-sm mb-8">由下而上，每一層都依賴前一層的品質。</p>
        </Reveal>
        <div className="space-y-4">
          {LAYERS.map((l, i) => (
            <Reveal key={l.tag} delay={i * 60}>
              <div
                className="rounded-xl p-5 sm:p-6"
                style={{ background: '#0f1f36', border: '1px solid #1e293b', borderLeft: `2px solid ${ACCENT}` }}
              >
                <div className="flex items-baseline gap-3 mb-2 flex-wrap">
                  <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ background: `${ACCENT}22`, color: ACCENT }}>
                    {l.tag}
                  </span>
                  <span className="text-[11px] tracking-widest uppercase text-slate-600">{l.en}</span>
                </div>
                <h3 className="text-slate-100 font-bold mb-2">{l.title}</h3>
                <p className="text-slate-300 text-sm leading-relaxed mb-2">{l.body}</p>
                <p className="text-slate-500 text-xs leading-relaxed">{l.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 設計取捨 */}
      <section className="max-w-3xl mx-auto px-5 pt-14 pb-6">
        <Reveal>
          <h2 className="text-xl font-bold text-slate-100 mb-2">三個設計上的取捨</h2>
          <p className="text-slate-500 text-sm mb-8">每一個選擇都有代價，寫出來才叫負責。</p>
        </Reveal>
        <div className="space-y-4">
          {TRADEOFFS.map((t, i) => (
            <Reveal key={t.n} delay={i * 60}>
              <div className="rounded-xl p-5 sm:p-6" style={{ background: '#0f1f36', border: '1px solid #1e293b' }}>
                <div className="flex gap-4">
                  <span className="text-2xl font-black shrink-0 leading-none" style={{ color: `${ACCENT}55` }}>{t.n}</span>
                  <div>
                    <h3 className="text-slate-100 font-bold mb-2">{t.title}</h3>
                    <p className="text-slate-300 text-sm leading-relaxed mb-2">{t.why}</p>
                    <p className="text-xs leading-relaxed" style={{ color: '#94a3b8' }}>
                      <span style={{ color: ACCENT }}>代價：</span>{t.cost}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* 落到設備 */}
      <section className="max-w-3xl mx-auto px-5 pt-14 pb-6">
        <Reveal>
          <h2 className="text-xl font-bold text-slate-100 mb-2">這些能力怎麼落到設備上</h2>
          <p className="text-slate-500 text-sm mb-8">
            我們同時做設備與系統，所以設備不只是終端，它本身就是資料來源。
          </p>
        </Reveal>
        <div className="grid sm:grid-cols-3 gap-4">
          {ON_DEVICE.map((d, i) => (
            <Reveal key={d.t} delay={i * 60}>
              <div className="rounded-xl p-5 h-full" style={{ background: '#0f1f36', border: '1px solid #1e293b' }}>
                <h3 className="text-slate-100 font-bold text-sm mb-2">{d.t}</h3>
                <p className="text-slate-400 text-sm leading-relaxed">{d.d}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="max-w-3xl mx-auto px-5 pt-14 pb-6">
        <Reveal>
          <h2 className="text-xl font-bold text-slate-100 mb-8">常被問到的四件事</h2>
        </Reveal>
        <div className="space-y-4">
          {AI_CAPABILITY_FAQS.map((f, i) => (
            <Reveal key={f.q} delay={i * 50}>
              <div className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid #1e293b' }}>
                <p className="text-slate-100 font-semibold text-sm mb-2">{f.q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{f.a}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-3xl mx-auto px-5 pt-12 pb-24">
        <Reveal>
          <div className="rounded-xl p-6" style={{ background: '#0f2744', border: `1px solid ${ACCENT}4d` }}>
            <p className="text-slate-200 font-bold mb-2">想知道你現有的系統接得起來嗎？</p>
            <p className="text-slate-400 text-sm mb-5 leading-relaxed">
              第一步不是選模型，是盤點你現在有哪些系統、各自開放哪些介面、資料有沒有斷。
              這一步做完才談得上導入。
            </p>
            <a
              href="/#contact"
              className="inline-block px-6 py-2.5 rounded-lg font-bold text-white text-sm"
              style={{ background: ACCENT }}
            >
              聯絡我們做系統盤點 →
            </a>
          </div>
        </Reveal>
      </section>
    </main>
  )
}
