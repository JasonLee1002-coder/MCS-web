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

  // ★ External message trigger: clicking panel buttons auto-sends a message
  const [triggerText, setTriggerText] = useState<string>('')
  const [triggerVersion, setTriggerVersion] = useState<number>(0)

  const handleSendMessage = (text: string) => {
    setTriggerText(text)
    setTriggerVersion(v => v + 1)
  }

  const handleStageChange = (content: string) => {
    const updated = [...msgHistory, { role: 'assistant', content }]
    setMsgHistory(updated)
    setPanelState(parsePanelState(updated, role))
  }

  return (
    <div className="min-h-screen pt-14 bg-[#F5F7FA]">

      {/* Role badge */}
      <div className="hidden md:flex absolute top-16 left-6 z-40">
        <span className="text-sm px-4 py-1.5 bg-white border border-[#00C6AD]/30 rounded-full text-[#00C6AD] font-medium shadow-sm">
          {roleLabels[role]} 模式
        </span>
      </div>

      {/* PC: split layout */}
      <div className="hidden md:flex h-[calc(100vh-3.5rem)]">
        {/* Left: dynamic panel */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden border-r border-gray-200 ${
            isDemo ? 'w-full' : 'w-3/5'
          }`}
        >
          <DynamicPanel state={panelState} onSendMessage={handleSendMessage} />
        </div>

        {/* Right: chat */}
        <div
          className={`transition-all duration-500 ease-in-out overflow-hidden flex flex-col bg-white ${
            isDemo ? 'w-0' : 'w-2/5'
          }`}
        >
          <ChatPanel
            role={role}
            onStageChange={handleStageChange}
            triggerText={triggerText}
            triggerVersion={triggerVersion}
          />
        </div>
      </div>

      {/* Mobile: full-screen chat */}
      <div className="md:hidden h-[calc(100vh-3.5rem)] flex flex-col bg-white">
        <ChatPanel
          role={role}
          onStageChange={handleStageChange}
          triggerText={triggerText}
          triggerVersion={triggerVersion}
        />
      </div>

      <DemoModeToggle isDemo={isDemo} onToggle={() => setIsDemo(v => !v)} />
    </div>
  )
}
