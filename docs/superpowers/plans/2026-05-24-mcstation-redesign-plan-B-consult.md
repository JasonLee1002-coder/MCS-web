# mcstation.ai 改版 — Plan B: AI 諮詢頁 + 業務模式

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 實作 `/ai-advisor` 頁 — 左右分割 AI Chat + 動態內容面板，支援 4 角色，含業務模式切換

**Architecture:** Vercel AI SDK `useChat` streaming + React state 管理對話階段。左側面板根據 `role` query param 和對話階段動態切換 component。業務模式用 `?demo=true` query param 觸發，左側改為全螢幕 Pitch Deck。

**Tech Stack:** Next.js 15 App Router, Vercel AI SDK `useChat`, Gemini 2.5 Flash via `@ai-sdk/google`, Tailwind CSS, framer-motion

**依賴：** Plan A 完成（共用 Nav/Footer/UI 元件）

---

## File Structure

```
app/
└── consult/
    ├── page.tsx                    # Consult 頁（client component, reads query params）
    └── api/
        └── chat/
            └── route.ts            # API route: streaming AI chat
lib/
├── prompts/
│   ├── venue.ts                    # 場地主 system prompt
│   ├── brand.ts                    # 品牌商 system prompt
│   ├── franchise.ts                # 加盟合作 system prompt
│   └── custom.ts                   # 客製化 system prompt
└── chat-stages.ts                  # 定義對話階段 → 面板狀態 mapping
components/
└── consult/
    ├── ConsultLayout.tsx           # 左右分割容器（PC）/ 全螢幕 Chat（手機）
    ├── ChatPanel.tsx               # 右側 AI Chat UI
    ├── DynamicPanel.tsx            # 左側動態面板（根據 stage 換內容）
    ├── DemoModeToggle.tsx          # 業務模式切換按鈕
    └── panels/
        ├── VenuePanel.tsx          # 場地主左側面板（依 stage）
        ├── BrandPanel.tsx          # 品牌商左側面板
        ├── FranchisePanel.tsx      # 加盟合作左側面板
        └── CustomPanel.tsx         # 客製化左側面板
```

---

## Task 1: 安裝 AI SDK 依賴

**Files:**
- Modify: `package.json`

- [ ] **Step 1: 安裝**

```bash
npm install ai @ai-sdk/google @ai-sdk/react
```

- [ ] **Step 2: 確認 Gemini API Key 在環境變數**

```bash
# .env.local
GOOGLE_GENERATIVE_AI_API_KEY=your_gemini_key_here
```

確認 `C:/Users/JasonLee/.claude/MASTER_CONTEXT.md` 中有記錄 Gemini API Key，填入 `.env.local`。

- [ ] **Step 3: commit**

```bash
git add package.json package-lock.json .env.local.example
git commit -m "feat: install Vercel AI SDK + Google Gemini provider"
```

---

## Task 2: System Prompts（4 角色）

**Files:**
- Create: `lib/prompts/venue.ts`
- Create: `lib/prompts/brand.ts`
- Create: `lib/prompts/franchise.ts`
- Create: `lib/prompts/custom.ts`

- [ ] **Step 1: 場地主 prompt**

```typescript
// lib/prompts/venue.ts
export const venuePrompt = `你是銓幻元科技（mcstation.ai）的 AI 業務顧問，專門服務「場地主」——即有場地空間、想導入智慧設備創造收益的客戶。

你的目標是：
1. 了解場地類型（辦公室/學校/場館/餐廳/交通樞紐/觀光景點）
2. 了解場地規模（坪數或日流量）
3. 推薦最適合的設備方案（GraBox / 冷凍微波機 / 智慧販賣機）
4. 收集聯絡資訊（姓名/電話/Email）

對話原則：
- 繁體中文，語氣親切專業，像一個有經驗的業務顧問
- 每次只問一個問題，不要一次問太多
- 根據場地類型給出具體建議（不是通用回答）
- 遇到「坪數」「流量」等數字，給範圍選項讓用戶選擇
- 在第3-4輪後，自然地引導上傳場地照片（說「能幫我們更精準評估」）
- 最後收集聯絡資訊時，告知「業務將在 24 小時內聯繫」

設備知識：
- GraBox：適合餐廳、便利商店、辦公室供餐，12/24/36格，QR Code取餐，保溫40-75°C
- 冷凍微波販賣機：適合24小時場域（交通/醫院/學校），-18°C冷凍，內建微波90秒加熱
- 智慧販賣機：適合辦公室、場館，21.5吋廣告螢幕，OmniCore後台管理

當用戶選擇場地類型後，在 JSON 中回傳 stage 資訊，格式如下（附在訊息最後，用 |||JSON:...|||）：
|||JSON:{"stage":"場地類型已確認","venueType":"辦公室","recommendedProduct":"grabox"}|||`

export type VenueStage = 'initial' | 'venue_type' | 'scale' | 'photo_upload' | 'cooperation_model' | 'contact' | 'done'
```

- [ ] **Step 2: 品牌商 prompt**

```typescript
// lib/prompts/brand.ts
export const brandPrompt = `你是銓幻元科技（mcstation.ai）的 AI 業務顧問，專門服務「品牌商」——想將產品上架到智慧設備通路的廠商。

你的目標是：
1. 了解品牌類別（食品飲料/保健品/生活用品/電子3C/其他）
2. 了解目標通路場域（辦公室/學校/醫院/場館/交通樞紐）
3. 介紹分潤模式和合作流程
4. 鼓勵上傳品牌簡介或產品目錄
5. 收集聯絡資訊

對話原則：
- 繁體中文，語氣專業，像品牌合作 BD
- 強調「全台 XXX 台設備、覆蓋多種場域」的通路價值
- 提到現有合作品牌（益節、杜蕾斯等 Reckitt 旗下產品）作為社會證明
- 分潤模式：簡單說明「場地主分潤 + 銓幻元平台費，品牌商無需固定費用」

當用戶確認品牌類別後，回傳 |||JSON:{"stage":"品牌類別確認","brandCategory":"食品飲料"}|||`

export type BrandStage = 'initial' | 'brand_category' | 'target_venue' | 'doc_upload' | 'contact' | 'done'
```

- [ ] **Step 3: 加盟合作 prompt**

```typescript
// lib/prompts/franchise.ts
export const franchisePrompt = `你是銓幻元科技（mcstation.ai）的 AI 業務顧問，專門服務想「加盟合作」的創業者。

你的目標是：
1. 了解預計投資規模（小資 50 萬內 / 中型 50-200 萬 / 大型 200 萬以上）
2. 了解目標場域（有無自有場地、還是需要推薦場地）
3. 介紹三種合作模式（設備租賃/設備購買/營收分潤）
4. 提供粗估回本時間
5. 收集聯絡資訊

對話原則：
- 繁體中文，語氣鼓勵，像一個成功加盟顧問
- 回本試算範例：以日流量 200 人、平均消費 50 元計算，月營業額約 30 萬
- 說明銓幻元提供設備、後台、維修，加盟者只需管場地和補貨`

export type FranchiseStage = 'initial' | 'investment_scale' | 'venue_status' | 'model_selection' | 'contact' | 'done'
```

- [ ] **Step 4: 客製化 prompt**

```typescript
// lib/prompts/custom.ts
export const customPrompt = `你是銓幻元科技（mcstation.ai）的 AI 業務顧問，服務有「客製化設備」需求的客戶。

你的目標是：
1. 了解客製需求（外觀/功能/尺寸/品牌LOGO貼牌）
2. 了解數量需求（樣品 1 台 / 小批量 2-10 台 / 大批量 10 台以上）
3. 鼓勵上傳參考圖或現有設備照片
4. 說明客製流程（需求 → 評估報價 → 設計確認 → 製造 → 交付），大約 6-12 週
5. 收集聯絡資訊

對話原則：
- 繁體中文，語氣有彈性，像工程師+業務的組合
- 強調「從外殼到軟體都可以客製」
- 小批量客製最低 2 台起`

export type CustomStage = 'initial' | 'requirement' | 'quantity' | 'ref_upload' | 'contact' | 'done'
```

- [ ] **Step 5: chat-stages mapping**

```typescript
// lib/chat-stages.ts
export type Role = 'venue' | 'brand' | 'franchise' | 'custom'

export interface PanelState {
  role: Role
  stage: string
  venueType?: string
  recommendedProduct?: string
  brandCategory?: string
}

export function parsePanelState(messages: { role: string; content: string }[], role: Role): PanelState {
  const state: PanelState = { role, stage: 'initial' }
  
  // 從 AI 訊息中提取最新 JSON 指令
  for (const msg of [...messages].reverse()) {
    if (msg.role !== 'assistant') continue
    const match = msg.content.match(/\|\|\|JSON:(.*?)\|\|\|/)
    if (match) {
      try {
        const parsed = JSON.parse(match[1])
        return { ...state, ...parsed }
      } catch { /* ignore */ }
    }
  }
  
  return state
}
```

- [ ] **Step 6: commit**

```bash
git add lib/prompts/ lib/chat-stages.ts
git commit -m "feat: add role-based system prompts and chat stage parser"
```

---

## Task 3: API Route（Streaming Chat）

**Files:**
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: 實作 streaming chat API**

```typescript
// app/api/chat/route.ts
import { google } from '@ai-sdk/google'
import { convertToModelMessages, streamText, UIMessage } from 'ai'
import { venuePrompt } from '@/lib/prompts/venue'
import { brandPrompt } from '@/lib/prompts/brand'
import { franchisePrompt } from '@/lib/prompts/franchise'
import { customPrompt } from '@/lib/prompts/custom'

const systemPrompts: Record<string, string> = {
  venue: venuePrompt,
  brand: brandPrompt,
  franchise: franchisePrompt,
  custom: customPrompt,
}

export const maxDuration = 30

export async function POST(req: Request) {
  const { messages, role = 'venue' }: { messages: UIMessage[]; role: string } = await req.json()

  const systemPrompt = systemPrompts[role] ?? systemPrompts.venue

  const result = streamText({
    model: google('gemini-2.0-flash'),
    system: systemPrompt,
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
```

- [ ] **Step 2: 測試 API（curl）**

```bash
curl -X POST http://localhost:3000/api/chat \
  -H "Content-Type: application/json" \
  -d '{"role":"venue","messages":[{"role":"user","content":"你好"}]}'
```
預期：streaming 文字回應，無錯誤

- [ ] **Step 3: commit**

```bash
git add app/api/chat/route.ts
git commit -m "feat: add streaming chat API route with role-based prompts"
```

---

## Task 4: ChatPanel UI

**Files:**
- Create: `components/ai-advisor/ChatPanel.tsx`

- [ ] **Step 1: 實作 ChatPanel**

```typescript
// components/ai-advisor/ChatPanel.tsx
'use client'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import { useRef, useEffect, useState } from 'react'
import { Role } from '@/lib/chat-stages'

interface ChatPanelProps {
  role: Role
  onStageChange?: (content: string) => void
}

export default function ChatPanel({ role, onStageChange }: ChatPanelProps) {
  const [input, setInput] = useState('')

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: '/api/chat',
      body: { role },
    }),
    initialMessages: [
      {
        id: 'welcome',
        role: 'assistant',
        parts: [{ type: 'text', text: welcomeMessages[role] }],
      },
    ],
    onFinish: ({ message }) => {
      const text = message.parts
        .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
        .map(p => p.text)
        .join('')
      onStageChange?.(text)
    },
  })

  const isStreaming = status === 'streaming' || status === 'submitted'
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex flex-col h-full">
      {/* 訊息列表 */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                m.role === 'user'
                  ? 'bg-[var(--accent)] text-[#0A0E1A] font-medium'
                  : 'bg-white/10 text-white'
              }`}
            >
              {/* 過濾掉 |||JSON:...||| 指令，用 parts 渲染 */}
              {m.parts
                .filter((p): p is { type: 'text'; text: string } => p.type === 'text')
                .map(p => p.text)
                .join('')
                .replace(/\|\|\|JSON:.*?\|\|\|/g, '')
                .trim()}
            </div>
          </div>
        ))}

        {isStreaming && (
          <div className="flex justify-start">
            <div className="bg-white/10 rounded-2xl px-4 py-3">
              <div className="flex gap-1.5">
                {[0, 1, 2].map(i => (
                  <div key={i} className="w-2 h-2 rounded-full bg-white/40 animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                ))}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* 輸入框 */}
      <form
        onSubmit={e => {
          e.preventDefault()
          if (!input.trim()) return
          sendMessage({ text: input })
          setInput('')
        }}
        className="p-4 border-t border-white/10"
      >
        <div className="flex gap-3">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            placeholder="輸入訊息..."
            disabled={status !== 'ready'}
            className="flex-1 bg-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:ring-1 focus:ring-[var(--accent)] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={status !== 'ready' || !input.trim()}
            className="px-5 py-3 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-xl hover:brightness-110 disabled:opacity-40 transition"
          >
            送出
          </button>
        </div>
      </form>
    </div>
  )
}

const welcomeMessages: Record<Role, string> = {
  venue: '您好！我是銓幻元的 AI 顧問。請問您的場地是什麼類型呢？',
  brand: '您好！我是銓幻元的 AI 顧問，專門協助品牌商拓展智慧設備通路。請問您的品牌屬於哪個類別呢？',
  franchise: '您好！我是銓幻元的 AI 顧問。想了解加盟合作方案嗎？請告訴我您預計的投資規模。',
  custom: '您好！我是銓幻元的 AI 顧問。請告訴我您的客製化需求，我來幫您評估可行性。',
}
```

- [ ] **Step 2: commit**

```bash
git add components/ai-advisor/ChatPanel.tsx
git commit -m "feat: add ChatPanel with useChat streaming and role welcome messages"
```

---

## Task 5: 左側動態面板（各角色）

**Files:**
- Create: `components/ai-advisor/panels/VenuePanel.tsx`
- Create: `components/ai-advisor/DynamicPanel.tsx`

- [ ] **Step 1: VenuePanel（場地主）**

```typescript
// components/ai-advisor/panels/VenuePanel.tsx
import { PanelState } from '@/lib/chat-stages'
import { products } from '@/lib/products'
import Image from 'next/image'

export default function VenuePanel({ state }: { state: PanelState }) {
  const product = products.find(p => p.id === state.recommendedProduct)

  if (state.stage === 'initial') {
    return (
      <div className="h-full flex flex-col justify-center items-center p-8 text-center">
        <div className="text-6xl mb-6">🏢</div>
        <h2 className="text-3xl font-black text-white mb-3">場地主方案</h2>
        <p className="text-white/50 text-lg mb-8">讓您的場地空間產生被動收益</p>
        <div className="grid grid-cols-3 gap-4 w-full max-w-sm">
          {['辦公室', '學校', '場館', '餐廳', '交通樞紐', '觀光景點'].map(t => (
            <div key={t} className="bg-white/10 rounded-xl p-3 text-sm text-white/70 text-center">{t}</div>
          ))}
        </div>
      </div>
    )
  }

  if (product) {
    return (
      <div className="h-full flex flex-col p-8">
        <p className="text-xs text-[var(--accent)] tracking-widest uppercase mb-4">推薦方案</p>
        <h2 className="text-2xl font-black text-white mb-2">{product.name}</h2>
        <p className="text-[var(--accent)] mb-6">{product.tagline}</p>
        <div className="relative flex-1 min-h-[200px] rounded-2xl overflow-hidden mb-6">
          <Image src={product.image} alt={product.name} fill className="object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          {product.specs.map(s => (
            <div key={s.label} className="bg-white/10 rounded-xl p-3">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="text-sm font-medium text-white">{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="h-full flex items-center justify-center">
      <p className="text-white/30">正在為您準備資料...</p>
    </div>
  )
}
```

- [ ] **Step 2: DynamicPanel（dispatch 給各角色 panel）**

```typescript
// components/ai-advisor/DynamicPanel.tsx
import { PanelState } from '@/lib/chat-stages'
import VenuePanel from './panels/VenuePanel'

// Brand/Franchise/Custom panels 格式相同，暫用 placeholder
function PlaceholderPanel({ state }: { state: PanelState }) {
  const labels: Record<string, string> = {
    brand: '品牌商通路佈局',
    franchise: '加盟方案試算',
    custom: '客製化流程',
  }
  return (
    <div className="h-full flex flex-col justify-center items-center p-8 text-center">
      <div className="text-5xl mb-4">
        {state.role === 'brand' ? '🏷️' : state.role === 'franchise' ? '🤝' : '⚙️'}
      </div>
      <h2 className="text-2xl font-black text-white">{labels[state.role]}</h2>
      <p className="text-white/40 mt-2 text-sm">面板內容依對話進度動態更新</p>
    </div>
  )
}

export default function DynamicPanel({ state }: { state: PanelState }) {
  switch (state.role) {
    case 'venue': return <VenuePanel state={state} />
    default: return <PlaceholderPanel state={state} />
  }
}
```

- [ ] **Step 3: commit**

```bash
git add components/ai-advisor/
git commit -m "feat: add VenuePanel and DynamicPanel with stage-based content"
```

---

## Task 6: DemoModeToggle

**Files:**
- Create: `components/ai-advisor/DemoModeToggle.tsx`

- [ ] **Step 1: 實作 DemoModeToggle**

```typescript
// components/ai-advisor/DemoModeToggle.tsx
'use client'

interface DemoModeToggleProps {
  isDemo: boolean
  onToggle: () => void
}

export default function DemoModeToggle({ isDemo, onToggle }: DemoModeToggleProps) {
  return (
    <button
      onClick={onToggle}
      className={`
        fixed bottom-6 right-6 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-semibold
        transition-all duration-300 shadow-lg
        ${isDemo
          ? 'bg-[var(--accent-warm)] text-[#0A0E1A] shadow-[0_0_20px_rgba(245,166,35,0.4)]'
          : 'bg-white/10 text-white/60 hover:bg-white/20'
        }
      `}
    >
      <span>{isDemo ? '💼' : '💼'}</span>
      {isDemo ? '業務模式 ON' : '業務模式'}
    </button>
  )
}
```

- [ ] **Step 2: commit**

```bash
git add components/ai-advisor/DemoModeToggle.tsx
git commit -m "feat: add DemoModeToggle button"
```

---

## Task 7: ConsultLayout + /ai-advisor 頁整合

**Files:**
- Create: `components/ai-advisor/ConsultLayout.tsx`
- Create: `app/ai-advisor/page.tsx`

- [ ] **Step 1: ConsultLayout**

```typescript
// components/ai-advisor/ConsultLayout.tsx
'use client'
import { useState } from 'react'
import { Role, PanelState, parsePanelState } from '@/lib/chat-stages'
import ChatPanel from './ChatPanel'
import DynamicPanel from './DynamicPanel'
import DemoModeToggle from './DemoModeToggle'

interface ConsultLayoutProps {
  role: Role
}

export default function ConsultLayout({ role }: ConsultLayoutProps) {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([])
  const [panelState, setPanelState] = useState<PanelState>({ role, stage: 'initial' })
  const [isDemo, setIsDemo] = useState(false)

  const handleStageChange = (content: string) => {
    const newMessages = [...messages, { role: 'assistant', content }]
    setMessages(newMessages)
    setPanelState(parsePanelState(newMessages, role))
  }

  return (
    <div className="min-h-screen pt-16 bg-[var(--bg)]">
      {/* PC: 左右分割 */}
      <div className="hidden md:flex h-[calc(100vh-4rem)]">
        {/* 左側動態面板 */}
        <div
          className={`transition-all duration-500 ${
            isDemo ? 'w-full' : 'w-3/5'
          } border-r border-white/10 overflow-hidden`}
        >
          <DynamicPanel state={panelState} />
        </div>

        {/* 右側 Chat（Demo 模式下隱藏主面板，縮為側邊欄）*/}
        <div
          className={`transition-all duration-500 ${
            isDemo ? 'w-0 overflow-hidden' : 'w-2/5'
          } flex flex-col bg-[#0D1221]`}
        >
          <ChatPanel role={role} onStageChange={handleStageChange} />
        </div>
      </div>

      {/* 手機: 全螢幕 Chat */}
      <div className="md:hidden h-[calc(100vh-4rem)] flex flex-col bg-[#0D1221]">
        <ChatPanel role={role} onStageChange={handleStageChange} />
      </div>

      {/* 業務模式切換按鈕 */}
      <DemoModeToggle isDemo={isDemo} onToggle={() => setIsDemo(prev => !prev)} />
    </div>
  )
}
```

- [ ] **Step 2: /ai-advisor page（讀 role query param）**

```typescript
// app/ai-advisor/page.tsx
import { Suspense } from 'react'
import ConsultLayoutWrapper from './ConsultLayoutWrapper'

export default function ConsultPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-white/50">載入中...</div>}>
      <ConsultLayoutWrapper />
    </Suspense>
  )
}
```

```typescript
// app/ai-advisor/ConsultLayoutWrapper.tsx
'use client'
import { useSearchParams } from 'next/navigation'
import ConsultLayout from '@/components/ai-advisor/ConsultLayout'
import { Role } from '@/lib/chat-stages'

const VALID_ROLES: Role[] = ['venue', 'brand', 'franchise', 'custom']

export default function ConsultLayoutWrapper() {
  const params = useSearchParams()
  const rawRole = params.get('role') as Role
  const role: Role = VALID_ROLES.includes(rawRole) ? rawRole : 'venue'
  return <ConsultLayout role={role} />
}
```

- [ ] **Step 3: 驗證完整流程**

1. 訪問 `http://localhost:3000/ai-advisor?role=venue`
2. 應看到左右分割（桌機）
3. 左側顯示場地主初始面板
4. 右側 AI 歡迎訊息出現
5. 輸入「辦公室」→ AI 回應，左側面板更新
6. 點擊「業務模式」按鈕 → 左側佔全寬

- [ ] **Step 4: commit**

```bash
git add app/ai-advisor/ components/ai-advisor/ConsultLayout.tsx
git commit -m "feat: complete consult page with split layout and demo mode toggle"
```

---

## Task 8: 部署

- [ ] **Step 1: build 驗證**

```bash
npm run build
```
無錯誤。

- [ ] **Step 2: 設定 Vercel 環境變數**

```
GOOGLE_GENERATIVE_AI_API_KEY=<填入>
```

- [ ] **Step 3: 部署**

```bash
npx vercel --prod --scope jasonlee1002-coders-projects --yes
```

- [ ] **Step 4: 最終 commit**

```bash
git add -A
git commit -m "feat: Plan B complete - AI consult page with demo mode"
git push origin main
```

---

## 驗收標準

- [ ] `/ai-advisor?role=venue` 頁面可載入（200）
- [ ] AI 歡迎訊息正確顯示（依角色不同）
- [ ] 輸入訊息後 AI streaming 回應
- [ ] 左側面板根據對話更新（至少 venue 初始 → 產品推薦）
- [ ] 業務模式按鈕：ON 時左側佔全寬
- [ ] 手機版：全螢幕 Chat
- [ ] 4 個角色各自的 welcome 訊息正確
