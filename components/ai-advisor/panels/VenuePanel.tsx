import { PanelState } from '@/lib/chat-stages'
import { products } from '@/lib/products'
import Image from 'next/image'

const venueTypes = ['辦公室', '學校', '場館', '餐廳', '交通樞紐', '觀光景點', '工廠', '醫院']

export default function VenuePanel({ state }: { state: PanelState }) {
  const product = products.find(p => p.id === state.recommendedProduct)

  if (state.stage === 'initial') {
    return (
      <div className="h-full flex flex-col justify-center items-center p-10 text-center">
        <div className="text-7xl mb-8">🏢</div>
        <h2 className="text-3xl font-black text-white mb-3">場地主方案</h2>
        <p className="text-white/50 text-base mb-10 max-w-xs leading-relaxed">
          讓您的場地空間產生被動收益<br />
          零成本導入，月月有收入
        </p>
        <div className="grid grid-cols-4 gap-3 w-full max-w-md">
          {venueTypes.map(t => (
            <div key={t} className="bg-white/8 border border-white/10 rounded-xl p-3 text-sm text-white/70 text-center hover:border-[var(--accent)]/40 hover:text-white transition-colors">
              {t}
            </div>
          ))}
        </div>
        <div className="mt-10 grid grid-cols-3 gap-4 w-full max-w-md">
          {[
            { v: '500+', l: '台設備' },
            { v: '30+', l: '產業別' },
            { v: '24hr', l: '無人化' },
          ].map(({ v, l }) => (
            <div key={l} className="bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl p-3 text-center">
              <p className="text-2xl font-black text-[var(--accent)]">{v}</p>
              <p className="text-xs text-white/50 mt-1">{l}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (product) {
    return (
      <div className="h-full flex flex-col p-8 overflow-auto">
        <div className="mb-2">
          <p className="text-xs text-[var(--accent)] tracking-widest uppercase">為您推薦</p>
          {state.venueType && (
            <span className="inline-block mt-1 text-xs px-3 py-1 bg-white/10 text-white/60 rounded-full">
              {state.venueType} 場域
            </span>
          )}
        </div>
        <h2 className="text-2xl font-black text-white mt-3 mb-1">{product.name}</h2>
        <p className="text-[var(--accent)] mb-5 text-sm">{product.tagline}</p>
        <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] bg-gradient-to-br from-[#1a2540] to-[var(--bg-card)]">
          <Image src={product.image} alt={product.name} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
        </div>
        <p className="text-sm text-white/60 leading-relaxed mb-5">{product.description}</p>
        <div className="grid grid-cols-2 gap-3">
          {product.specs.map(s => (
            <div key={s.label} className="bg-white/8 border border-white/10 rounded-xl px-3 py-2.5">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="text-sm font-medium text-white mt-0.5">{s.value}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-4 bg-[var(--accent)]/10 border border-[var(--accent)]/20 rounded-xl text-center">
          <p className="text-[var(--accent)] font-bold">{product.highlight}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-white/30">正在為您分析最佳方案...</p>
    </div>
  )
}
