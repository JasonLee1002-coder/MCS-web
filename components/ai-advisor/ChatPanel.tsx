'use client'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useRef, useEffect, useState } from 'react'
import { Role } from '@/lib/chat-stages'

const welcomeMessages: Record<Role, string> = {
  venue: '您好！我是銓幻元的 AI 顧問 👋\n\n請問您的場地是什麼類型呢？（例如：辦公室、工廠、學校、醫院...）',
  brand: '您好！我是銓幻元的 AI 顧問 👋\n\n想讓您的品牌進入全台智慧設備通路嗎？請問您的品牌屬於哪個類別呢？',
  franchise: '您好！我是銓幻元的 AI 顧問 👋\n\n想透過銓幻元設備自己當老闆嗎？請問您預計的投資規模大概是多少呢？',
  custom: '您好！我是銓幻元的 AI 顧問 👋\n\n請告訴我您的客製化需求，我來幫您評估可行性。',
}

interface ChatPanelProps {
  role: Role
  onStageChange?: (content: string) => void
}

export default function ChatPanel({ role, onStageChange }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat', body: { role } }),
    messages: [{
      id: 'welcome',
      role: 'assistant',
      parts: [{ type: 'text', text: welcomeMessages[role] }],
    }],
    onFinish: ({ message }) => {
      const text = message.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map(p => p.text)
        .join('')
      onStageChange?.(text)
    },
  })

  const isStreaming = status === 'streaming' || status === 'submitted'

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isStreaming])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || status !== 'ready') return
    sendMessage({ text: input })
    setInput('')
  }

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {messages.map((m) => {
          const text = m.parts
            .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
            .map(p => p.text)
            .join('')
            .replace(/\|\|\|JSON:[\s\S]*?\|\|\|/g, '')
            .trim()

          if (!text) return null

          const isUser = (m.role as string) === 'user'
          return (
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
              {!isUser && (
                <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center text-xs mr-2 flex-shrink-0 mt-0.5">
                  AI
                </div>
              )}
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
                  isUser
                    ? 'bg-[var(--accent)] text-[#0A0E1A] font-medium rounded-br-sm'
                    : 'bg-white/10 text-white rounded-bl-sm'
                }`}
              >
                {text}
              </div>
            </div>
          )
        })}

        {isStreaming && (
          <div className="flex justify-start">
            <div className="w-7 h-7 rounded-full bg-[var(--accent)]/20 border border-[var(--accent)]/40 flex items-center justify-center text-xs mr-2 flex-shrink-0">
              AI
            </div>
            <div className="bg-white/10 rounded-2xl rounded-bl-sm px-4 py-3">
              <div className="flex gap-1.5 items-center h-4">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 border-t border-white/10">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入訊息..."
            disabled={status !== 'ready'}
            className="flex-1 bg-white/8 border border-white/15 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[var(--accent)]/50 focus:ring-1 focus:ring-[var(--accent)]/30 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="px-5 py-3 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-xl hover:brightness-110 disabled:opacity-40 transition flex-shrink-0"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  )
}
