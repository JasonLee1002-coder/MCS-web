import type { Metadata } from 'next'
import { AIChatWindow } from '@/components/AIChatWindow'

const SOLUTIONS = [
  { keyword: 'steam-ramen',      label: '蒸氣拉麵機',   title: '蒸氣拉麵機自助加熱解決方案', desc: '24 小時提供熱騰騰拉麵，無需廚師，夜班員工隨時可享用。' },
  { keyword: 'steam-bento',      label: '蒸氣便當',     title: '蒸氣便當無人加熱設備',       desc: '企業、學校、醫院的員工便當加熱自動化，省去廚房人力。' },
  { keyword: 'frozen-microwave', label: '冷凍微波機',   title: '冷凍微波機 24 小時餐食方案', desc: '冷凍食品現場微波，適合夜班、值班、偏遠廠區場域。' },
  { keyword: 'smart-locker',     label: '智慧取物櫃',   title: '智慧取物櫃無人取餐系統',     desc: '餐廳外帶自取、企業訂餐自助領取，降低人力等待成本。' },
  { keyword: 'ai-labor',         label: 'AI 勞動力',    title: 'AI 勞動力降低餐飲人力成本',  desc: '台灣缺工 15 萬人，AI 設備一台頂三人，24 小時不休。' },
  { keyword: 'ghost-kitchen',    label: '幽靈廚房設備', title: '幽靈廚房 AI 設備整合方案',   desc: '中央廚房製作、AI 設備在各場域加熱取餐，打造多點通路。' },
]

export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ keyword: s.keyword }))
}

export async function generateMetadata(
  { params }: { params: Promise<{ keyword: string }> }
): Promise<Metadata> {
  const { keyword } = await params
  const sol = SOLUTIONS.find(s => s.keyword === keyword)
  return {
    title: `${sol?.title ?? keyword} | 銓幻元科技`,
    description: sol?.desc ?? `了解銓幻元${sol?.label ?? keyword}解決方案，立即與 AI 顧問對話。`,
  }
}

export default async function SolutionPage(
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params
  const sol = SOLUTIONS.find(s => s.keyword === keyword)
  const accentColor = '#FF6B35'

  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      {/* 第一屏：SEO 文案 */}
      <section className="max-w-3xl mx-auto px-6 py-24 text-center">
        <h1 className="text-4xl font-bold mb-6" style={{ color: accentColor }}>
          {sol?.title ?? keyword}
        </h1>
        <p className="text-slate-400 text-lg mb-8 leading-relaxed">
          {sol?.desc ?? `銓幻元提供完整的${sol?.label ?? keyword}解決方案。`}
          <br />立即與 AI 顧問對話，獲得針對您場域的專屬評估。
        </p>
        <a
          href="#chat"
          className="inline-block px-8 py-3 rounded-xl font-bold text-white"
          style={{ background: accentColor }}
        >
          立即 AI 諮詢 ↓
        </a>
      </section>

      {/* 第二屏：AI 對話視窗 */}
      <section id="chat" className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold text-center mb-8 text-slate-300">
          與 AI 顧問對話，30 秒了解您的需求
        </h2>
        <AIChatWindow
          keyword={sol?.label ?? keyword}
          brand="mcstation"
          sourceSlug={`/solutions/${keyword}`}
          openOnLoad={true}
          embedded={true}
        />
      </section>
    </main>
  )
}
