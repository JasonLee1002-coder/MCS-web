'use client'
import { useState } from 'react'
import { Role, PanelState, parsePanelState } from '@/lib/chat-stages'
import ChatPanel from './ChatPanel'
import DynamicPanel from './DynamicPanel'
import DemoModeToggle from './DemoModeToggle'

const roleLabels: Record<Role, string> = {
  venue: '場地主',
  brand: '品牌商',
  franchise: '加盟合作',
  custom: '客製化',
}

export default function ConsultLayout({ role }: { role: Role }) {
  const [msgHistory, setMsgHistory] = useState<{ role: string; content: string }[]>([])
  const [panelState, setPanelState] = useState<PanelState>({ role, stage: 'initial' })
  const [isDemo, setIsDemo] = useState(false)

  const handleStageChange = (content: string) => {
    const updated = [...msgHistory, { role: 'assistant', content }]
    setMsgHistory(updated)
    setPanelState(parsePanelState(updated, role))
  }

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg)]">

      {/* Role badge */}
      <div className="hidden md:flex absolute top-20 left-6 z-40">
        <span className="text-xs px-3 py-1.5 bg-white/8 border border-white/15 rounded-full text-white/50">
          {roleLabels[role]} 模式
        </span>
      </div>

      {/* PC: split layout */}
      <div className="hidden md:flex h-[calc(100vh-4rem)]">
        {/* Left: dynamic panel */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-white/10 ${
            isDemo ? 'w-full' : 'w-3/5'
          }`}
        >
          <DynamicPanel state={panelState} />
        </div>

        {/* Right: chat */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col bg-[#0D1221] ${
            isDemo ? 'w-0' : 'w-2/5'
          }`}
        >
          <ChatPanel role={role} onStageChange={handleStageChange} />
        </div>
      </div>

      {/* Mobile: full-screen chat */}
      <div className="md:hidden h-[calc(100vh-4rem)] flex flex-col bg-[#0D1221]">
        <ChatPanel role={role} onStageChange={handleStageChange} />
      </div>

      <DemoModeToggle isDemo={isDemo} onToggle={() => setIsDemo(v => !v)} />
    </div>
  )
}
