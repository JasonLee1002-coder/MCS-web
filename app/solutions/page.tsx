import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '解決方案 | 銓幻元科技 — 場域自動化智慧設備',
  description: '銓幻元 6 大解決方案：冷凍微波機、智慧取物櫃、蒸氣拉麵機、蒸氣便當機、AI 勞動力、幽靈廚房設備。依場域需求選擇，或透過 AI 顧問快速配對。',
}

const SOLUTIONS = [
  {
    keyword: 'frozen-microwave',
    label: '冷凍微波機',
    icon: '❄️',
    tagline: '24 小時自助冷凍熱食，解決夜班與封閉場域餐食問題',
    venues: ['工廠夜班', '移工宿舍', '軍方場域', '長照機構'],
    stat: '3 個月回收',
    statLabel: '設備投資',
  },
  {
    keyword: 'smart-locker',
    label: '智慧取物櫃',
    icon: '📦',
    tagline: '外帶等待從 8 分鐘降至 1 分鐘，釋放人力專注服務',
    venues: ['餐廳外帶', '辦公大樓', '校園', '幽靈廚房'],
    stat: '1.1 分鐘',
    statLabel: '外帶等待',
  },
  {
    keyword: 'steam-ramen',
    label: '蒸氣拉麵機',
    icon: '🍜',
    tagline: '60 秒熱騰騰拉麵，無需廚師，護理師深夜最愛',
    venues: ['醫院', '宿舍', '夜班場域', '軍方'],
    stat: '60 秒',
    statLabel: '加熱完成',
  },
  {
    keyword: 'steam-bento',
    label: '蒸氣便當機',
    icon: '🍱',
    tagline: '企業員工餐食自動化，大容量 80 格，人力降至零',
    venues: ['工廠', '企業辦公', '校園', '醫院'],
    stat: '80 格',
    statLabel: '單機容量',
  },
  {
    keyword: 'ai-labor',
    label: 'AI 勞動力',
    icon: '🤖',
    tagline: '台灣缺工 15 萬人，AI 設備一台頂三人，24h 不休',
    venues: ['餐飲連鎖', '企業食堂', '幽靈廚房', '大型場域'],
    stat: '3 倍',
    statLabel: '相當人力',
  },
  {
    keyword: 'ghost-kitchen',
    label: '幽靈廚房設備',
    icon: '👻',
    tagline: '中央廚房製作，AI 設備在各場域加熱取餐，打造多點通路',
    venues: ['幽靈廚房', '中央廚房', '多場域連鎖', '企業餐飲'],
    stat: '1 : 5',
    statLabel: '廚房對場域',
  },
]

export default function SolutionsPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4" style={{ color: '#FF6B35' }}>解決方案</h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          銓幻元提供 6 種智慧餐飲自動化方案，涵蓋封閉場域到餐廳外帶全場景。
          選擇你的場域類型，或讓 AI 顧問直接幫你配對。
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-3 gap-5">
          {SOLUTIONS.map(({ keyword, label, icon, tagline, venues, stat, statLabel }) => (
            <Link key={keyword} href={`/solutions/${keyword}`} className="group block">
              <div className="rounded-2xl p-5 h-full transition-all duration-200 group-hover:scale-[1.02]"
                style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl">{icon}</span>
                  <div className="text-right">
                    <p className="text-2xl font-black" style={{ color: '#FF6B35' }}>{stat}</p>
                    <p className="text-xs text-slate-500">{statLabel}</p>
                  </div>
                </div>
                <h2 className="font-bold text-slate-100 mb-2 group-hover:text-[#FF6B35] transition-colors">{label}</h2>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{tagline}</p>
                <div className="flex flex-wrap gap-1">
                  {venues.map(v => (
                    <span key={v} className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,107,53,0.08)', color: '#FF6B35' }}>{v}</span>
                  ))}
                </div>
                <p className="text-xs mt-4 font-medium" style={{ color: '#FF6B35' }}>與 AI 顧問對話 →</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center border-t border-slate-700/40">
        <h2 className="text-xl font-bold text-slate-100 mb-3">不確定哪個方案適合你？</h2>
        <p className="text-slate-400 mb-6">3 分鐘 AI 顧問對話，精準推薦場域最佳配置</p>
        <Link href="/ai-advisor"
          className="inline-block px-10 py-4 rounded-full font-bold text-white"
          style={{ background: '#FF6B35' }}>
          免費諮詢 AI 顧問 →
        </Link>
      </section>
    </main>
  )
}
