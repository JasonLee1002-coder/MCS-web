'use client'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useRef, useEffect, useState } from 'react'
import { Role } from '@/lib/chat-stages'

function getSessionId(): string {
  const key = 'mcs_session_id'
  let id = localStorage.getItem(key)
  if (!id) {
    id = crypto.randomUUID()
    localStorage.setItem(key, id)
  }
  return id
}

const welcomeMessages: Record<Role, string> = {
  venue: '您好！我是銓幻元的 AI 顧問 👋\n\n請問您的場地是什麼類型呢？（例如：辦公室、工廠、學校、醫院...）',
  brand: '您好！我是銓幻元的 AI 顧問 👋\n\n想讓您的品牌進入全台智慧設備通路嗎？請問您的品牌屬於哪個類別呢？',
  franchise: '您好！我是銓幻元的 AI 顧問 👋\n\n想透過銓幻元設備自己當老闆嗎？請問您預計的投資規模大概是多少呢？',
  custom: '您好！我是銓幻元的 AI 顧問 👋\n\n請告訴我您的客製化需求，我來幫您評估可行性。',
}

interface ChatPanelProps {
  role: Role
  onStageChange?: (content: string) => void
  /** External trigger: when triggerText changes, auto-send that message */
  triggerText?: string
  triggerVersion?: number
}

export default function ChatPanel({ role, onStageChange, triggerText, triggerVersion }: ChatPanelProps) {
  const [input, setInput] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const [sessionId] = useState<string>(() =>
    typeof window !== 'undefined' ? getSessionId() : ''
  )
  const prevTriggerRef = useRef<number | undefined>(undefined)

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: '/api/chat', body: { role, sessionId } }),
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

  // ★ External trigger: when triggerVersion changes, auto-send triggerText
  useEffect(() => {
    if (
      triggerText &&
      triggerVersion !== undefined &&
      triggerVersion !== prevTriggerRef.current &&
      status === 'ready'
    ) {
      prevTriggerRef.current = triggerVersion
      sendMessage({ text: triggerText })
    }
  }, [triggerText, triggerVersion, status, sendMessage])

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
    <div className="flex flex-col h-full bg-white">
      {/* Chat header */}
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-[#00C6AD] flex items-center justify-center text-white font-bold text-sm">AI</div>
        <div>
          <p className="text-base font-semibold text-gray-800">銓幻元 AI 顧問</p>
          <p className="text-xs text-gray-400">智慧設備專家 · 隨時為您解答</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-5">
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
            <div key={m.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} items-end gap-2`}>
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-[#00C6AD] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  AI
                </div>
              )}
              <div
                className={`max-w-[78%] rounded-2xl px-5 py-3.5 text-base leading-relaxed whitespace-pre-wrap shadow-sm ${
                  isUser
                    ? 'bg-[#00C6AD] text-white font-medium rounded-br-sm'
                    : 'bg-gray-100 text-gray-800 rounded-bl-sm'
                }`}
              >
                {text}
              </div>
            </div>
          )
        })}

        {isStreaming && (
          <div className="flex justify-start items-end gap-2">
            <div className="w-8 h-8 rounded-full bg-[#00C6AD] flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              AI
            </div>
            <div className="bg-gray-100 rounded-2xl rounded-bl-sm px-5 py-3.5">
              <div className="flex gap-1.5 items-center h-5">
                {[0, 1, 2].map(i => (
                  <div
                    key={i}
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
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
      <form onSubmit={handleSubmit} className="p-4 border-t border-gray-100 bg-white">
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入您的問題..."
            disabled={status !== 'ready'}
            className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-5 py-3.5 text-base text-gray-800 placeholder-gray-400 outline-none focus:border-[#00C6AD] focus:ring-2 focus:ring-[#00C6AD]/20 disabled:opacity-50 transition-colors"
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="px-6 py-3.5 bg-[#00C6AD] text-white font-semibold text-base rounded-xl hover:bg-[#00b09b] disabled:opacity-40 transition flex-shrink-0 shadow-sm"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  )
}
