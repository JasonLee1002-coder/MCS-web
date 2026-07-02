'use client'
import { PanelState } from '@/lib/chat-stages'
import { products } from '@/lib/products'
import Image from 'next/image'

const venueTypes = ['辦公室', '學校', '場館', '餐廳', '交通樞紐', '觀光景點', '工廠', '醫院']

// Premium SVG illustration for venue (smart vending machine in office)
function VenueIllustration() {
  return (
    <div className="relative w-full h-56 rounded-2xl overflow-hidden mb-6 bg-gradient-to-br from-[#e8faf8] to-[#c5f0ea]">
      <svg viewBox="0 0 600 300" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        {/* Background */}
        <defs>
          <linearGradient id="bgGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#e8faf8"/>
            <stop offset="100%" stopColor="#c5f0ea"/>
          </linearGradient>
          <linearGradient id="machineGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ffffff"/>
            <stop offset="100%" stopColor="#e8f8f6"/>
          </linearGradient>
          <linearGradient id="screenGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00C6AD"/>
            <stop offset="100%" stopColor="#00a896"/>
          </linearGradient>
          <filter id="shadow" x="-10%" y="-10%" width="120%" height="130%">
            <feDropShadow dx="0" dy="4" stdDeviation="8" floodColor="#00C6AD" floodOpacity="0.15"/>
          </filter>
        </defs>

        {/* Floor */}
        <ellipse cx="300" cy="290" rx="280" ry="20" fill="rgba(0,198,173,0.08)"/>

        {/* Back wall panels */}
        <rect x="0" y="0" width="600" height="300" fill="url(#bgGrad)"/>
        <rect x="40" y="20" width="2" height="260" fill="rgba(0,198,173,0.15)" rx="1"/>
        <rect x="100" y="20" width="2" height="260" fill="rgba(0,198,173,0.1)" rx="1"/>
        <rect x="500" y="20" width="2" height="260" fill="rgba(0,198,173,0.15)" rx="1"/>
        <rect x="560" y="20" width="2" height="260" fill="rgba(0,198,173,0.1)" rx="1"/>

        {/* Main vending machine body */}
        <g filter="url(#shadow)">
          <rect x="200" y="40" width="200" height="240" rx="12" fill="url(#machineGrad)" stroke="rgba(0,198,173,0.3)" strokeWidth="1.5"/>
        </g>

        {/* Machine top accent */}
        <rect x="200" y="40" width="200" height="8" rx="4" fill="#00C6AD" opacity="0.6"/>

        {/* Screen/display */}
        <rect x="215" y="58" width="170" height="90" rx="8" fill="url(#screenGrad)"/>
        {/* Screen content */}
        <text x="300" y="95" textAnchor="middle" fill="white" fontSize="14" fontWeight="bold" fontFamily="sans-serif">銓幻元智取</text>
        <text x="300" y="115" textAnchor="middle" fill="rgba(255,255,255,0.8)" fontSize="10" fontFamily="sans-serif">MCS SmartRetail</text>
        {/* Screen shine */}
        <rect x="215" y="58" width="80" height="30" rx="8" fill="rgba(255,255,255,0.1)"/>

        {/* Product slots */}
        <rect x="215" y="158" width="170" height="100" rx="8" fill="rgba(0,198,173,0.06)" stroke="rgba(0,198,173,0.2)" strokeWidth="1"/>
        {/* Product rows */}
        {[0,1,2].map(row => (
          [0,1,2,3].map(col => (
            <rect key={`${row}-${col}`}
              x={219 + col * 42} y={162 + row * 30}
              width="36" height="24" rx="4"
              fill={`hsl(${170 + col * 15}, 50%, ${85 - row * 5}%)`}
              stroke="rgba(0,198,173,0.2)" strokeWidth="0.5"
            />
          ))
        ))}

        {/* Coin/payment slot */}
        <rect x="330" y="268" width="50" height="8" rx="4" fill="rgba(0,198,173,0.3)" stroke="rgba(0,198,173,0.4)" strokeWidth="1"/>

        {/* IoT indicator lights */}
        <circle cx="355" cy="52" r="4" fill="#00C6AD" opacity="0.9">
          <animate attributeName="opacity" values="0.9;0.3;0.9" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="368" cy="52" r="3" fill="#4ade80" opacity="0.8"/>

        {/* Left decorative element - person silhouette */}
        <g opacity="0.7">
          <circle cx="130" cy="140" r="22" fill="rgba(0,198,173,0.15)"/>
          <ellipse cx="130" cy="170" rx="18" ry="30" fill="rgba(0,198,173,0.12)"/>
          <circle cx="130" cy="108" r="14" fill="#00C6AD" opacity="0.25"/>
        </g>

        {/* Right: floating stats */}
        <g>
          <rect x="430" y="60" width="130" height="45" rx="10" fill="white" opacity="0.9" filter="url(#shadow)"/>
          <text x="495" y="80" textAnchor="middle" fill="#00C6AD" fontSize="16" fontWeight="bold" fontFamily="sans-serif">500+</text>
          <text x="495" y="95" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">台設備全台運營中</text>

          <rect x="430" y="115" width="130" height="45" rx="10" fill="white" opacity="0.9" filter="url(#shadow)"/>
          <text x="495" y="135" textAnchor="middle" fill="#00C6AD" fontSize="16" fontWeight="bold" fontFamily="sans-serif">零成本</text>
          <text x="495" y="150" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">場地主導入方案</text>

          <rect x="430" y="170" width="130" height="45" rx="10" fill="white" opacity="0.9" filter="url(#shadow)"/>
          <text x="495" y="190" textAnchor="middle" fill="#00C6AD" fontSize="16" fontWeight="bold" fontFamily="sans-serif">24hr</text>
          <text x="495" y="205" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">無人化自動運作</text>
        </g>

        {/* Floating coins / revenue icons */}
        {[{x:170, y:70, r:12}, {x:155, y:95, r:8}, {x:185, y:100, r:6}].map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r={c.r} fill="#00C6AD" opacity={0.15 + i*0.05}/>
        ))}

        {/* IoT signal waves */}
        <g opacity="0.3" transform="translate(355, 42)">
          <path d="M-12,0 A12,12 0 0,1 12,0" fill="none" stroke="#00C6AD" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M-20,8 A22,22 0 0,0 20,8" fill="none" stroke="#00C6AD" strokeWidth="1" strokeLinecap="round"/>
        </g>
      </svg>
    </div>
  )
}

interface VenuePanelProps {
  state: PanelState
  onSendMessage?: (text: string) => void
}

export default function VenuePanel({ state, onSendMessage }: VenuePanelProps) {
  const product = products.find(p => p.id === state.recommendedProduct)

  if (state.stage === 'initial' || !product) {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="p-8 max-w-xl mx-auto">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 bg-[#00C6AD]/10 text-[#00C6AD] px-3 py-1.5 rounded-full text-xs font-semibold mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00C6AD]" />
              場地主方案
            </div>
            <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">
              讓空間<span className="text-[#00C6AD]">產生收益</span>
            </h1>
            <p className="text-gray-500 text-base leading-relaxed">
              零成本導入智慧設備，月月被動收益。<br />
              全台 970+ 門市的選擇，實績有口皆碑。
            </p>
          </div>

          {/* Premium SVG Illustration */}
          <VenueIllustration />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3 mb-6">
            {[
              { v: '500+', l: '台設備', color: '#00C6AD' },
              { v: '30+', l: '產業別', color: '#7B61FF' },
              { v: '24hr', l: '無人化', color: '#F5A623' },
            ].map(({ v, l, color }) => (
              <div key={l} className="bg-gray-50 border border-gray-100 rounded-2xl p-4 text-center hover:border-[#00C6AD]/30 hover:bg-[#00C6AD]/5 transition-colors">
                <p className="text-2xl font-black mt-1" style={{ color }}>{v}</p>
                <p className="text-xs text-gray-500 mt-0.5 font-medium">{l}</p>
              </div>
            ))}
          </div>

          {/* Venue types — clickable */}
          <div className="mb-6">
            <p className="text-sm font-semibold text-gray-700 mb-3">
              點選您的場地類型，AI 立即分析 👇
            </p>
            <div className="grid grid-cols-4 gap-2">
              {venueTypes.map(t => (
                <button
                  key={t}
                  onClick={() => onSendMessage?.(`我的場地是${t}`)}
                  className="bg-white border border-gray-200 rounded-xl p-2.5 text-xs text-gray-600 text-center font-medium hover:border-[#00C6AD] hover:text-[#00C6AD] hover:bg-[#00C6AD]/5 active:scale-95 transition-all cursor-pointer"
                >
                  {t}
                </button>
              ))}
            </div>
          </div>

          {/* CTA hint */}
          <div className="bg-gradient-to-r from-[#00C6AD]/10 to-[#00b09b]/5 border border-[#00C6AD]/20 rounded-2xl p-4 text-center">
            <p className="text-sm font-semibold text-[#00C6AD] mb-0.5">💬 或直接在右側輸入您的問題</p>
            <p className="text-xs text-gray-500">AI 顧問將為您量身推薦最適合的設備方案</p>
          </div>
        </div>
      </div>
    )
  }

  if (product && state.stage !== 'initial') {
    return (
      <div className="h-full overflow-y-auto bg-white">
        <div className="p-8 max-w-xl mx-auto">
          <div className="mb-2">
            <span className="inline-block text-xs px-3 py-1 bg-[#00C6AD]/10 text-[#00C6AD] rounded-full font-medium">
              為您推薦
            </span>
            {state.venueType && (
              <span className="inline-block ml-2 text-xs px-3 py-1 bg-gray-100 text-gray-500 rounded-full">
                {state.venueType} 場域
              </span>
            )}
          </div>
          <h2 className="text-2xl font-black text-gray-900 mt-3 mb-1">{product.name}</h2>
          <p className="text-[#00C6AD] mb-5 text-sm font-medium">{product.tagline}</p>
          <div className="relative rounded-2xl overflow-hidden mb-6 h-[200px] bg-gradient-to-br from-[#e8faf8] to-[#d0f5f0]">
            <Image src={product.image} alt={product.name} fill className="object-cover" onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0' }} />
          </div>
          <p className="text-sm text-gray-600 leading-relaxed mb-5">{product.description}</p>
          <div className="grid grid-cols-2 gap-3">
            {product.specs.map(s => (
              <div key={s.label} className="bg-gray-50 border border-gray-100 rounded-xl px-3 py-2.5">
                <p className="text-xs text-gray-400 font-medium">{s.label}</p>
                <p className="text-sm font-bold text-gray-800 mt-0.5">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 bg-[#00C6AD]/10 border border-[#00C6AD]/20 rounded-2xl text-center">
            <p className="text-[#00C6AD] font-bold">{product.highlight}</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center bg-white">
      <div className="text-center">
        <div className="w-10 h-10 rounded-full border-2 border-[#00C6AD] border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-gray-400 text-sm">正在為您分析最佳方案...</p>
      </div>
    </div>
  )
}
