import { PanelState } from '@/lib/chat-stages'
import VenuePanel from './panels/VenuePanel'

function PlaceholderPanel({ state }: { state: PanelState }) {
  const config = {
    brand:     { emoji: '🏷️', title: '品牌商通路佈局', sub: '全台 500+ 台設備等您上架' },
    franchise: { emoji: '🤝', title: '加盟方案試算',  sub: '低門檻創業，銓幻元全力支援' },
    custom:    { emoji: '⚙️', title: '客製化流程',    sub: '從外殼到軟體，全程客製' },
  }
  const c = config[state.role as keyof typeof config]
  if (!c) return null

  return (
    <div className="h-full flex flex-col justify-center items-center p-10 text-center">
      <div className="text-7xl mb-6">{c.emoji}</div>
      <h2 className="text-2xl font-black text-white mb-2">{c.title}</h2>
      <p className="text-white/40 text-sm leading-relaxed max-w-xs">{c.sub}</p>
      <p className="text-white/25 text-xs mt-6">面板內容依對話進度動態更新</p>
    </div>
  )
}

export default function DynamicPanel({ state }: { state: PanelState }) {
  if (state.role === 'venue') return <VenuePanel state={state} />
  return <PlaceholderPanel state={state} />
}
