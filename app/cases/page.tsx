import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '客戶案例 | 銓幻元科技 mcstation.ai',
  description: '銓幻元客戶實際案例：移工宿舍、工廠夜班、軍方場域、醫院、餐廳外帶。真實使用數據、投資回收期、員工滿意度，完整呈現。',
}

const CASES = [
  {
    id: 'factory-night-shift',
    label: '工廠夜班',
    company: '桃園電子製造廠（320 人）',
    product: '冷凍微波機 × 2',
    icon: '🏭',
    results: [
      { metric: '夜班熱食覆蓋率', before: '0%', after: '100%' },
      { metric: '員工夜班申請率', before: '基準', after: '+23%' },
      { metric: '設備投資回收', before: '—', after: '第 12 週' },
    ],
    quote: '以前夜班員工只能吃泡麵，現在可以隨時吃到熱便當，流動率明顯下降。',
    author: '該廠 HR 主管',
    slug: 'frozen-microwave-factory-night-shift',
  },
  {
    id: 'migrant-dormitory',
    label: '移工宿舍',
    company: '台中精密機械廠（520 人，三班制）',
    product: '冷凍販賣機 × 4 + 智慧取物櫃 × 2',
    icon: '🛏️',
    results: [
      { metric: '日均使用次數', before: '0', after: '210–250 次' },
      { metric: '月均利潤（自營）', before: '—', after: 'NT$24,000' },
      { metric: '季度離職率', before: '18%', after: '12%' },
    ],
    quote: '越南、印尼移工都很喜歡，加入家鄉口味食材後使用率大幅提升。',
    author: '宿舍業者負責人',
    slug: 'frozen-vending-migrant-worker-dormitory',
  },
  {
    id: 'restaurant-takeout',
    label: '餐廳外帶',
    company: '台北日式定食連鎖（3 家門市）',
    product: '智慧取物櫃 GraBox × 1（20 格）',
    icon: '🍱',
    results: [
      { metric: '外帶等待時間', before: '8.4 分鐘', after: '1.1 分鐘' },
      { metric: '外帶訂單比例', before: '55%', after: '63%' },
      { metric: '月省人力成本', before: '—', after: 'NT$35,000' },
    ],
    quote: '導入第一個月就正回報，3 個月後全門市展開，員工和顧客都很滿意。',
    author: '連鎖餐廳老闆',
    slug: 'smart-locker-restaurant-takeout',
  },
  {
    id: 'military',
    label: '軍方場域',
    company: '北部某軍事基地（值班士兵）',
    product: '冷凍販賣機軍方版 × 2',
    icon: '🪖',
    results: [
      { metric: '夜間餐食選擇', before: '泡麵 / 零食', after: '12 種冷凍熱食' },
      { metric: '離線運作能力', before: '不支援', after: '72 小時' },
      { metric: '存取記錄', before: '無', after: '軍方 IC 卡 + 雲端 365 天' },
    ],
    quote: '符合國防部採購規範，文件齊全，場域導入過程非常順利。',
    author: '後勤主管',
    slug: 'frozen-vending-military-closed-venue',
  },
  {
    id: 'hospital',
    label: '醫院護理宿舍',
    company: '台北某區域醫院（護理師值班）',
    product: '蒸氣拉麵機 × 1',
    icon: '🏥',
    results: [
      { metric: '深夜熱食可及性', before: '無', after: '24 小時' },
      { metric: '護理師滿意度', before: '—', after: '88%' },
      { metric: '每月額外收入', before: '—', after: 'NT$18,000' },
    ],
    quote: '護理師深夜輪班最需要熱食補充，蒸氣拉麵機放了之後一直被搶購。',
    author: '醫院總務主任',
    slug: 'steam-ramen-hospital-24hr',
  },
  {
    id: 'office',
    label: '辦公大樓',
    company: '台北信義區 SaaS 公司（220 人）',
    product: '智慧取物櫃 GraBox × 1（40 格）',
    icon: '🏢',
    results: [
      { metric: '前台外送接收時間', before: '65 分鐘/天', after: '8 分鐘/天' },
      { metric: '外送漏失事件', before: '月均 12 次', after: '0 次' },
      { metric: '員工午餐滿意度', before: '72%', after: '89%' },
    ],
    quote: '這是我們 2025 年花最少錢買到最多員工好感的福利投入。',
    author: 'HR 主管',
    slug: 'smart-locker-office-building',
  },
]

export default function CasesPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <section className="max-w-5xl mx-auto px-6 pt-28 pb-16">
        <h1 className="text-4xl font-black mb-4" style={{ color: '#FF6B35' }}>客戶案例</h1>
        <p className="text-xl text-slate-300 max-w-2xl">
          真實數據，不是廣告文案。以下是銓幻元服務過的各類場域實際成果。
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 pb-20">
        <div className="grid md:grid-cols-2 gap-6">
          {CASES.map(({ id, label, company, product, icon, results, quote, author, slug }) => (
            <div key={id} className="rounded-2xl overflow-hidden" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-1">
                  <span>{icon}</span>
                  <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{label}</span>
                </div>
                <p className="font-bold text-slate-100 text-sm mb-1">{company}</p>
                <p className="text-xs text-slate-500 mb-5">{product}</p>

                <div className="rounded-xl overflow-hidden border border-slate-700/50 mb-5">
                  <table className="w-full text-xs">
                    <thead style={{ background: '#1e293b' }}>
                      <tr>
                        <th className="text-left px-3 py-2 text-slate-400">指標</th>
                        <th className="text-center px-3 py-2 text-slate-400">導入前</th>
                        <th className="text-center px-3 py-2 font-bold" style={{ color: '#FF6B35' }}>導入後</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.map(({ metric, before, after }, i) => (
                        <tr key={metric} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                          <td className="px-3 py-2 text-slate-300">{metric}</td>
                          <td className="px-3 py-2 text-slate-500 text-center">{before}</td>
                          <td className="px-3 py-2 text-center font-semibold" style={{ color: '#FF6B35' }}>{after}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <blockquote className="border-l-2 pl-4 mb-4" style={{ borderColor: '#FF6B35' }}>
                  <p className="text-slate-300 text-sm italic leading-relaxed">&ldquo;{quote}&rdquo;</p>
                  <p className="text-slate-500 text-xs mt-1">— {author}</p>
                </blockquote>

                <Link href={`/blog/${slug}`}
                  className="text-xs font-medium transition-colors hover:opacity-80"
                  style={{ color: '#FF6B35' }}>
                  閱讀完整案例文章 →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-12 text-center border-t border-slate-700/40">
        <h2 className="text-2xl font-bold text-slate-100 mb-4">你的場域適合哪個方案？</h2>
        <p className="text-slate-400 mb-8">AI 顧問分析你的場域需求，給出個人化推薦</p>
        <Link href="/ai-advisor"
          className="inline-block px-10 py-4 rounded-full font-bold text-white"
          style={{ background: '#FF6B35' }}>
          免費諮詢 AI 顧問 →
        </Link>
      </section>
    </main>
  )
}
