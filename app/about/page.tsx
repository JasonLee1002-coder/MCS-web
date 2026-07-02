import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '關於銓幻元科技 | META CLEARING STATION PTE. LTD.',
  description: '銓幻元科技（mcstation.ai）是一家專注於智慧餐飲自動化的科技公司，提供冷凍販賣機、智慧取物櫃、蒸氣加熱設備，服務工廠、醫院、軍方、餐廳等封閉場域。',
}

const MILESTONES = [
  { year: '2022', event: '銓幻元科技（MCS）在新加坡成立，開始研發智慧自助設備' },
  { year: '2023', event: '台灣辦公室設立，首批冷凍販賣機進入台灣工廠場域' },
  { year: '2024', event: '累積服務超過 80 個封閉場域，推出軍方場域專用規格' },
  { year: '2025', event: '智慧取物櫃 GraBox 系列上市，進入餐廳外帶市場' },
  { year: '2026', event: 'AI 顧問系統上線（mcstation.ai），目標場域累積達 500+' },
]

const VALUES = [
  {
    icon: '🏭',
    title: '封閉場域專家',
    desc: '我們深耕工廠、宿舍、醫院、軍方等一般餐飲無法服務的封閉場域，提供 24 小時自助餐食解方。',
  },
  {
    icon: '🤖',
    title: 'AI 驅動選型',
    desc: '透過 AI 顧問對話，幫助場域主在 3 分鐘內找到最適合的設備配置，降低選型錯誤成本。',
  },
  {
    icon: '🔧',
    title: '端到端服務',
    desc: '從場域評估、設備安裝、食材供應到售後維護，銓幻元提供完整的一條龍服務。',
  },
  {
    icon: '📊',
    title: '數據透明',
    desc: 'IoT 即時監控庫存、銷售、異常狀況，場域主透過管理後台隨時掌握設備狀態。',
  },
]

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4" style={{ color: '#FF6B35' }}>關於銓幻元科技</h1>
        <p className="text-xl text-slate-300 leading-relaxed max-w-2xl">
          我們相信，每個需要吃飯的人都值得吃到熱食。不論是深夜工廠的夜班工人、
          軍營裡的值班士兵、還是醫院的護理師——銓幻元的使命是讓自助熱食不再是奢望。
        </p>
      </section>

      {/* Company Info */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-700/40">
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">公司資訊</h2>
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">公司全名</span>
                <span>META CLEARING STATION PTE. LTD.（銓幻元科技）</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">登記地點</span>
                <span>138 Cecil Street, #13-02, Singapore 069538</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">台灣辦公室</span>
                <span>台北市大同區長安西路78巷4弄10號1樓</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">聯絡信箱</span>
                <span>service@transtep.com</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">業務諮詢</span>
                <span>henry.ho@transtep.com（何嘉程）</span>
              </div>
              <div className="flex gap-4">
                <span className="text-slate-500 w-24 shrink-0">LINE 諮詢</span>
                <span>
                  <a href="https://lin.ee/mcstation" className="underline" style={{ color: '#FF6B35' }}>@mcstation</a>
                </span>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold text-slate-100 mb-6">核心數字</h2>
            <div className="grid grid-cols-2 gap-4">
              {[
                { num: '80+', label: '服務場域' },
                { num: '25+', label: '移工宿舍' },
                { num: '6', label: '軍方場域' },
                { num: '120+', label: '合作餐廳' },
              ].map(({ num, label }) => (
                <div key={label} className="rounded-xl p-4 text-center" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.15)' }}>
                  <p className="text-3xl font-black" style={{ color: '#FF6B35' }}>{num}</p>
                  <p className="text-xs text-slate-400 mt-1">{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-700/40">
        <h2 className="text-2xl font-bold text-slate-100 mb-8">我們的核心理念</h2>
        <div className="grid md:grid-cols-2 gap-5">
          {VALUES.map(({ icon, title, desc }) => (
            <div key={title} className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
              <p className="text-2xl mb-3">{icon}</p>
              <p className="font-bold text-slate-100 mb-2">{title}</p>
              <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Milestones */}
      <section className="max-w-4xl mx-auto px-6 py-12 border-t border-slate-700/40">
        <h2 className="text-2xl font-bold text-slate-100 mb-8">發展歷程</h2>
        <div className="space-y-4">
          {MILESTONES.map(({ year, event }) => (
            <div key={year} className="flex gap-6 items-start">
              <span className="font-black text-lg shrink-0 w-12" style={{ color: '#FF6B35' }}>{year}</span>
              <div className="flex-1 pt-0.5 border-l border-slate-700/50 pl-6">
                <p className="text-slate-300 text-sm leading-relaxed">{event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center border-t border-slate-700/40">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">想了解更多？與 AI 顧問對話</h2>
        <p className="text-slate-400 mb-8">3 分鐘內，AI 顧問為你整理最適合場域的設備方案</p>
        <a href="/ai-advisor"
          className="inline-block px-10 py-4 rounded-full font-bold text-white text-lg"
          style={{ background: '#FF6B35' }}>
          立即與 AI 顧問對話 →
        </a>
      </section>
    </main>
  )
}
