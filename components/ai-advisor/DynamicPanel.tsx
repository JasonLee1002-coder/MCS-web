'use client'
import { PanelState } from '@/lib/chat-stages'
import VenuePanel from './panels/VenuePanel'

// ── Brand Illustration: Premium product shelf in smart cabinet ──
function BrandIllustration() {
  return (
    <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="bBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f0eeff"/>
          <stop offset="100%" stopColor="#dcd5ff"/>
        </linearGradient>
        <filter id="bShadow"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#7B61FF" floodOpacity="0.12"/></filter>
      </defs>
      <rect width="600" height="280" fill="url(#bBg)"/>
      {/* Cabinet frame */}
      <rect x="150" y="20" width="300" height="240" rx="14" fill="white" filter="url(#bShadow)" stroke="rgba(123,97,255,0.2)" strokeWidth="1.5"/>
      <rect x="150" y="20" width="300" height="10" rx="5" fill="#7B61FF" opacity="0.5"/>
      {/* Shelves */}
      {[70, 130, 190].map((y, si) => (
        <g key={si}>
          <rect x="160" y={y} width="280" height="2" rx="1" fill="rgba(123,97,255,0.15)"/>
          {[0,1,2,3,4].map(i => (
            <g key={i}>
              <rect x={170 + i * 54} y={y + 6} width="44" height="50" rx="6"
                fill={`hsl(${250 + i*15 + si*20}, 60%, ${82 - si*5}%)`}
                stroke="rgba(123,97,255,0.2)" strokeWidth="1"/>
              <rect x={175 + i * 54} y={y + 10} width="34" height="18" rx="3"
                fill={`hsl(${250 + i*15 + si*20}, 70%, ${70 - si*5}%)`} opacity="0.6"/>
            </g>
          ))}
        </g>
      ))}
      {/* Smart door / glass */}
      <rect x="150" y="20" width="300" height="240" rx="14" fill="rgba(255,255,255,0.15)" stroke="rgba(123,97,255,0.3)" strokeWidth="1.5"/>
      {/* Screen panel */}
      <rect x="480" y="40" width="100" height="60" rx="8" fill="white" opacity="0.9" filter="url(#bShadow)"/>
      <text x="530" y="63" textAnchor="middle" fill="#7B61FF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">品牌</text>
      <text x="530" y="78" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">通路佈局</text>
      <rect x="480" y="110" width="100" height="60" rx="8" fill="white" opacity="0.9" filter="url(#bShadow)"/>
      <text x="530" y="133" textAnchor="middle" fill="#7B61FF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">500+</text>
      <text x="530" y="148" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">台設備通路</text>
      <rect x="480" y="180" width="100" height="60" rx="8" fill="white" opacity="0.9" filter="url(#bShadow)"/>
      <text x="530" y="203" textAnchor="middle" fill="#7B61FF" fontSize="14" fontWeight="bold" fontFamily="sans-serif">即時</text>
      <text x="530" y="218" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">銷售數據</text>
      {/* IoT dots */}
      <circle cx="440" cy="35" r="5" fill="#7B61FF" opacity="0.7">
        <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.8s" repeatCount="indefinite"/>
      </circle>
      <circle cx="455" cy="35" r="4" fill="#4ade80" opacity="0.8"/>
      <text x="300" y="265" textAnchor="middle" fill="rgba(123,97,255,0.4)" fontSize="11" fontFamily="sans-serif">智慧設備通路 · 全台佈局</text>
    </svg>
  )
}

// ── Franchise Illustration: Entrepreneur + machine row ──
function FranchiseIllustration() {
  return (
    <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="fBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff8ed"/>
          <stop offset="100%" stopColor="#ffe8c0"/>
        </linearGradient>
        <filter id="fShadow"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#F5A623" floodOpacity="0.12"/></filter>
      </defs>
      <rect width="600" height="280" fill="url(#fBg)"/>
      {/* Three vending machines */}
      {[80, 220, 360].map((x, i) => (
        <g key={i} filter="url(#fShadow)">
          <rect x={x} y="50" width="110" height="210" rx="10" fill="white" stroke="rgba(245,166,35,0.25)" strokeWidth="1.5"/>
          <rect x={x} y="50" width="110" height="7" rx="4" fill="#F5A623" opacity="0.5"/>
          <rect x={x+8} y="65" width="94" height="60" rx="6" fill={`hsl(${35+i*20}, 80%, ${75-i*5}%)`} opacity="0.8"/>
          <text x={x+55} y="100" textAnchor="middle" fill="white" fontSize="12" fontWeight="bold" fontFamily="sans-serif">設備 {i+1}</text>
          {[0,1,2].map(row => (
            [0,1,2].map(col => (
              <rect key={`${row}-${col}`} x={x+10+col*31} y={138+row*26} width="26" height="20" rx="4"
                fill={`hsl(${35+i*20+col*15}, 60%, ${80-row*5}%)`} opacity="0.7"/>
            ))
          ))}
          <circle cx={x+95} cy={x > 300 ? 60 : 58} r="4" fill={i===0 ? "#4ade80" : i===1 ? "#F5A623" : "#00C6AD"} opacity="0.9">
            <animate attributeName="opacity" values="0.9;0.3;0.9" dur={`${1.5+i*0.3}s`} repeatCount="indefinite"/>
          </circle>
        </g>
      ))}
      {/* Entrepreneur figure (right side) */}
      <g opacity="0.85">
        <circle cx="515" cy="120" r="28" fill="#F5A623" opacity="0.2"/>
        <circle cx="515" cy="105" r="20" fill="#F5A623" opacity="0.35"/>
        <ellipse cx="515" cy="155" rx="25" ry="45" fill="#F5A623" opacity="0.25"/>
        <text x="515" y="200" textAnchor="middle" fill="#F5A623" fontSize="28" fontFamily="sans-serif">👤</text>
      </g>
      {/* Stats */}
      <rect x="430" y="35" width="120" height="40" rx="8" fill="white" opacity="0.95" filter="url(#fShadow)"/>
      <text x="490" y="52" textAnchor="middle" fill="#F5A623" fontSize="13" fontWeight="bold" fontFamily="sans-serif">3-6 個月</text>
      <text x="490" y="67" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">預估回本週期</text>
      <text x="300" y="268" textAnchor="middle" fill="rgba(245,166,35,0.4)" fontSize="11" fontFamily="sans-serif">低門檻創業 · 全程支援</text>
    </svg>
  )
}

// ── Custom Illustration: Tech workshop / design scene ──
function CustomIllustration() {
  return (
    <svg viewBox="0 0 600 280" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <linearGradient id="cBg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#e8faf8"/>
          <stop offset="100%" stopColor="#d0f5f0"/>
        </linearGradient>
        <filter id="cShadow"><feDropShadow dx="0" dy="3" stdDeviation="6" floodColor="#00C6AD" floodOpacity="0.12"/></filter>
      </defs>
      <rect width="600" height="280" fill="url(#cBg)"/>
      {/* Blueprint grid */}
      {Array.from({length: 12}).map((_, i) => (
        <line key={`v${i}`} x1={i*50} y1="0" x2={i*50} y2="280" stroke="rgba(0,198,173,0.08)" strokeWidth="1"/>
      ))}
      {Array.from({length: 7}).map((_, i) => (
        <line key={`h${i}`} x1="0" y1={i*50} x2="600" y2={i*50} stroke="rgba(0,198,173,0.08)" strokeWidth="1"/>
      ))}
      {/* Main machine design frame */}
      <rect x="160" y="30" width="280" height="220" rx="14" fill="white" filter="url(#cShadow)" stroke="rgba(0,198,173,0.25)" strokeWidth="1.5" strokeDasharray="6,3"/>
      {/* Machine body draft */}
      <rect x="195" y="55" width="210" height="175" rx="10" fill="rgba(0,198,173,0.06)" stroke="rgba(0,198,173,0.3)" strokeWidth="1.5"/>
      {/* Design elements */}
      <rect x="205" y="65" width="190" height="80" rx="8" fill="rgba(0,198,173,0.1)" stroke="rgba(0,198,173,0.2)" strokeWidth="1"/>
      <text x="300" y="100" textAnchor="middle" fill="#00C6AD" fontSize="13" fontWeight="bold" fontFamily="sans-serif">客製外殼設計</text>
      <text x="300" y="118" textAnchor="middle" fill="rgba(0,198,173,0.7)" fontSize="10" fontFamily="sans-serif">OEM / ODM</text>
      {/* Dimension lines */}
      <line x1="170" y1="55" x2="170" y2="230" stroke="rgba(0,198,173,0.4)" strokeWidth="1" strokeDasharray="4,2"/>
      <line x1="165" y1="55" x2="175" y2="55" stroke="rgba(0,198,173,0.4)" strokeWidth="1.5"/>
      <line x1="165" y1="230" x2="175" y2="230" stroke="rgba(0,198,173,0.4)" strokeWidth="1.5"/>
      <text x="155" y="145" fill="rgba(0,198,173,0.6)" fontSize="9" fontFamily="sans-serif" transform="rotate(-90, 155, 145)">高度客製</text>
      {/* Component chips */}
      {[{x:210,y:158,l:'IoT'}, {x:260,y:158,l:'UI'}, {x:310,y:158,l:'AI'}, {x:360,y:158,l:'API'}].map(({x,y,l}) => (
        <g key={l}>
          <rect x={x} y={y} width="40" height="30" rx="5" fill="rgba(0,198,173,0.15)" stroke="rgba(0,198,173,0.3)" strokeWidth="1"/>
          <text x={x+20} y={y+19} textAnchor="middle" fill="#00C6AD" fontSize="10" fontWeight="bold" fontFamily="sans-serif">{l}</text>
        </g>
      ))}
      {/* Info cards */}
      <rect x="460" y="40" width="120" height="50" rx="8" fill="white" opacity="0.95" filter="url(#cShadow)"/>
      <text x="520" y="60" textAnchor="middle" fill="#00C6AD" fontSize="13" fontWeight="bold" fontFamily="sans-serif">OEM/ODM</text>
      <text x="520" y="78" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">外殼全客製</text>
      <rect x="460" y="100" width="120" height="50" rx="8" fill="white" opacity="0.95" filter="url(#cShadow)"/>
      <text x="520" y="120" textAnchor="middle" fill="#00C6AD" fontSize="13" fontWeight="bold" fontFamily="sans-serif">API 整合</text>
      <text x="520" y="138" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">系統無縫串接</text>
      <rect x="460" y="160" width="120" height="50" rx="8" fill="white" opacity="0.95" filter="url(#cShadow)"/>
      <text x="520" y="180" textAnchor="middle" fill="#00C6AD" fontSize="13" fontWeight="bold" fontFamily="sans-serif">小量試產</text>
      <text x="520" y="198" textAnchor="middle" fill="#6b7280" fontSize="10" fontFamily="sans-serif">快速 MVP 驗證</text>
      {/* Left card */}
      <rect x="20" y="80" width="115" height="110" rx="10" fill="white" opacity="0.9" filter="url(#cShadow)"/>
      <text x="77" y="105" textAnchor="middle" fill="#00C6AD" fontSize="11" fontWeight="bold" fontFamily="sans-serif">需求分析</text>
      <text x="77" y="120" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="sans-serif">↓</text>
      <text x="77" y="135" textAnchor="middle" fill="#00C6AD" fontSize="11" fontWeight="bold" fontFamily="sans-serif">設計打樣</text>
      <text x="77" y="150" textAnchor="middle" fill="#6b7280" fontSize="9" fontFamily="sans-serif">↓</text>
      <text x="77" y="165" textAnchor="middle" fill="#00C6AD" fontSize="11" fontWeight="bold" fontFamily="sans-serif">量產交付</text>
      <text x="300" y="268" textAnchor="middle" fill="rgba(0,198,173,0.4)" fontSize="11" fontFamily="sans-serif">全流程客製 · 從構想到量產</text>
    </svg>
  )
}

interface PanelConfig {
  title: string
  headline: string[]
  sub: string
  color: string
  quickOptions: string[]
  quickPrefix: string
  IllustrationComponent: React.FC
}

const panelConfigs: Record<string, PanelConfig> = {
  brand: {
    title: '品牌商通路佈局',
    headline: ['品牌進入', '全台通路'],
    sub: '全台 500+ 台智慧設備，覆蓋辦公室、校園、醫院等高流量場域，讓您的品牌無縫進入每個生活場景。',
    color: '#7B61FF',
    quickOptions: ['飲料食品', '日用品', '藥品健康', '零食點心'],
    quickPrefix: '我們的品牌類別是',
    IllustrationComponent: BrandIllustration,
  },
  franchise: {
    title: '加盟方案',
    headline: ['低門檻', '自己當老闆'],
    sub: '銓幻元提供設備、平台、補貨、維修全方位支援，讓您專注收益，我們處理其他一切。',
    color: '#F5A623',
    quickOptions: ['30萬以內', '30-60萬', '60-100萬', '100萬以上'],
    quickPrefix: '我的預算規模是',
    IllustrationComponent: FranchiseIllustration,
  },
  custom: {
    title: '客製化設備',
    headline: ['從構想到', '量產交付'],
    sub: '從外殼造型到嵌入式軟體，全程客製。支援 OEM/ODM，配合您的品牌識別與業務場景量身打造。',
    color: '#00C6AD',
    quickOptions: ['外殼造型客製', '軟體界面定制', 'API 系統整合', '全套 OEM/ODM'],
    quickPrefix: '我的客製化需求是',
    IllustrationComponent: CustomIllustration,
  },
}

interface PlaceholderPanelProps {
  state: PanelState
  onSendMessage?: (text: string) => void
}

function PlaceholderPanel({ state, onSendMessage }: PlaceholderPanelProps) {
  const c = panelConfigs[state.role]
  if (!c) return null
  const { IllustrationComponent } = c

  return (
    <div className="h-full overflow-y-auto bg-white">
      <div className="p-8 max-w-xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-4"
            style={{ background: c.color + '15', color: c.color }}
          >
            <span className="w-1.5 h-1.5 rounded-full" style={{ background: c.color }} />
            {c.title}
          </div>
          <h1 className="text-3xl font-black text-gray-900 leading-tight mb-2">
            {c.headline[0]}
            <span style={{ color: c.color }}>{c.headline[1]}</span>
          </h1>
          <p className="text-gray-500 text-base leading-relaxed">{c.sub}</p>
        </div>

        {/* SVG Illustration */}
        <div
          className="relative w-full h-52 rounded-2xl overflow-hidden mb-6"
          style={{ background: `linear-gradient(135deg, ${c.color}12 0%, white 100%)`, border: `1px solid ${c.color}25` }}
        >
          <IllustrationComponent />
        </div>

        {/* Quick option buttons */}
        <div className="mb-6">
          <p className="text-sm font-semibold text-gray-700 mb-3">
            快速選擇，AI 立即分析 👇
          </p>
          <div className="grid grid-cols-2 gap-2">
            {c.quickOptions.map(opt => (
              <button
                key={opt}
                onClick={() => onSendMessage?.(`${c.quickPrefix}${opt}`)}
                className="bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-600 font-medium hover:border-opacity-60 hover:text-current active:scale-95 transition-all text-left"
                style={{ '--hover-border': c.color } as React.CSSProperties}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = c.color
                  ;(e.currentTarget as HTMLElement).style.color = c.color
                  ;(e.currentTarget as HTMLElement).style.background = c.color + '08'
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.borderColor = ''
                  ;(e.currentTarget as HTMLElement).style.color = ''
                  ;(e.currentTarget as HTMLElement).style.background = ''
                }}
              >
                {opt}
              </button>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div
          className="rounded-2xl p-4 text-center"
          style={{ background: c.color + '10', border: `1px solid ${c.color}25` }}
        >
          <p className="text-sm font-semibold mb-0.5" style={{ color: c.color }}>
            💬 或直接輸入您的問題
          </p>
          <p className="text-xs text-gray-500">AI 顧問將為您提供專屬方案建議</p>
        </div>
      </div>
    </div>
  )
}

interface DynamicPanelProps {
  state: PanelState
  onSendMessage?: (text: string) => void
}

export default function DynamicPanel({ state, onSendMessage }: DynamicPanelProps) {
  if (state.role === 'venue') return <VenuePanel state={state} onSendMessage={onSendMessage} />
  return <PlaceholderPanel state={state} onSendMessage={onSendMessage} />
}
