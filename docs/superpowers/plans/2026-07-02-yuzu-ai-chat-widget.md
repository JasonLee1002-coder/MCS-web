# Yuzu AI 對話顧問視窗 — mcstation.ai 實作計畫

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 mcstation.ai 現有 /ai-advisor 靜態問卷替換為真正的 Gemini AI 對話視窗，並新增 6 個 SEO 著陸頁，統一導流至 Notion CRM + Yuzu LINE

**Architecture:** Vercel AI SDK v6 useChat + AI Gateway `google/gemini-3.5-flash`，後端 `/api/chat` streaming + `summarize_lead` tool，前端 `AIChatWindow`（銓幻元品牌色 #FF6B35）

**Tech Stack:** Next.js App Router, Vercel AI SDK v6 (`ai`, `@ai-sdk/react`), AI Gateway, TypeScript, Tailwind CSS

**設計規格：** `docs/superpowers/specs/2026-07-02-yuzu-ai-chat-lead-system-design.md`

**執行者：** Yuzu-san  
**專案路徑：** `C:\Users\JasonLee\claude_code_projects\WEB_mcstation\`  
**注意：** 此專案無 `src/` 前綴，直接是 `app/`, `components/`, `lib/`

**🔁 大量共用 transtep.com 代碼：** Task 2-4 可直接從 `C:\Users\JasonLee\claude_code_projects\WEB_transtep\` 複製，只改 brand 預設值

---

## 檔案結構

```
components/
  AIChatWindow.tsx         ← 複製自 transtep（brand 預設改 mcstation）
  LeadConfirmCard.tsx      ← 直接複製自 transtep（不需修改）
lib/
  chat-config.ts           ← 直接複製自 transtep（不需修改）
app/
  api/
    chat/
      route.ts             ← 直接複製自 transtep（不需修改）
  ai-advisor/
    page.tsx               ← 修改：靜態 5 題問卷 → AIChatWindow
  solutions/
    [keyword]/
      page.tsx             ← 新建：6 個 SEO 著陸頁
```

---

## Task 1：安裝依賴

**Files:** `package.json`

- [ ] **Step 1: 確認或安裝套件**

```bash
cd C:/Users/JasonLee/claude_code_projects/WEB_mcstation
npm list ai @ai-sdk/react 2>/dev/null || npm install ai @ai-sdk/react
```

- [ ] **Step 2: 確認版本**

```bash
npm list ai @ai-sdk/react
```

Expected：`ai@6.x.x`, `@ai-sdk/react@1.x.x`

- [ ] **Step 3: 同步 AI Gateway 環境變數**

```bash
npx vercel env pull .env.local
```

- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: install Vercel AI SDK v6 + @ai-sdk/react"
```

---

## Task 2：複製共用檔案（從 transtep.com）

**Files:**
- Create: `lib/chat-config.ts`
- Create: `components/LeadConfirmCard.tsx`
- Create: `app/api/chat/route.ts`

- [ ] **Step 1: 複製三個檔案**

```bash
cp "C:/Users/JasonLee/claude_code_projects/WEB_transtep/src/lib/chat-config.ts" "lib/chat-config.ts"
cp "C:/Users/JasonLee/claude_code_projects/WEB_transtep/src/components/LeadConfirmCard.tsx" "components/LeadConfirmCard.tsx"
mkdir -p app/api/chat
cp "C:/Users/JasonLee/claude_code_projects/WEB_transtep/src/app/api/chat/route.ts" "app/api/chat/route.ts"
```

- [ ] **Step 2: 確認 route.ts 的 import 路徑正確（無 src/ 前綴）**

```bash
grep "@/lib/chat-config" app/api/chat/route.ts
```

若 tsconfig.json 的 `paths` 設定 `"@/*": ["./src/*"]`，需要修改為 `"@/*": ["./*"]`，或直接改 import 路徑：

```typescript
// 若有路徑問題，改為相對路徑：
import { BRAND_SYSTEM_PROMPTS, type Brand } from '../../lib/chat-config';
```

- [ ] **Step 3: 確認 zod 已安裝**

```bash
npm list zod || npm install zod
```

- [ ] **Step 4: Commit**

```bash
git add lib/chat-config.ts components/LeadConfirmCard.tsx app/api/chat/route.ts
git commit -m "feat: add chat-config, LeadConfirmCard, /api/chat route (from transtep)"
```

---

## Task 2.5：建立 /api/ai-consult route（銓幻元版）

**Files:**
- Create: `app/api/ai-consult/route.ts`

> AIChatWindow 的 `handleLeadSubmit` 會 POST 到此 endpoint，必須在 Task 3 前完成。

- [ ] **Step 1: 複製 transtep 版本並改來源**

```bash
mkdir -p app/api/ai-consult
cp "C:/Users/JasonLee/claude_code_projects/WEB_transtep/src/app/api/ai-consult/route.ts" "app/api/ai-consult/route.ts"
```

- [ ] **Step 2: 修改三處（來源 + Case ID 前綴 + import 路徑）**

找到並替換：
```typescript
// 1. 來源網站標示
'來源網站': { select: { name: 'transtep.com' } },
// ↓ 改為
'來源網站': { select: { name: 'mcstation.ai' } },

// 2. Case ID 前綴
const caseId = `TRP-${Date.now().toString().slice(-5)}`;
// ↓ 改為
const caseId = `MCS-${Date.now().toString().slice(-5)}`;

// 3. notifyYuzu 的 source 欄位
body: JSON.stringify({ caseId, message: msg, source: 'transtep.com' }),
// ↓ 改為
body: JSON.stringify({ caseId, message: msg, source: 'mcstation.ai' }),
```

- [ ] **Step 3: Commit**

```bash
git add app/api/ai-consult/route.ts
git commit -m "feat: add /api/ai-consult route — 銓幻元版 Notion CRM + Yuzu LINE notify"
```

---

## Task 3：建立 AIChatWindow（銓幻元品牌版）

**Files:**
- Create: `components/AIChatWindow.tsx`

- [ ] **Step 1: 複製並修改 brand 預設值**

```bash
cp "C:/Users/JasonLee/claude_code_projects/WEB_transtep/src/components/AIChatWindow.tsx" "components/AIChatWindow.tsx"
```

- [ ] **Step 2: 修改 brand 預設值**

在 `components/AIChatWindow.tsx` 找到：
```typescript
{ keyword, brand = 'longcloud', sourceSlug, openOnLoad = false }: AIChatWindowProps
```
改為：
```typescript
{ keyword, brand = 'mcstation', sourceSlug, openOnLoad = false }: AIChatWindowProps
```

- [ ] **Step 3: 確認 import 路徑（無 src/ 前綴）**

```bash
grep "@/lib/chat-config" components/AIChatWindow.tsx
```

若有路徑問題，改為相對路徑：
```typescript
import { getOpener, type Brand } from '../lib/chat-config';
```

- [ ] **Step 4: Commit**

```bash
git add components/AIChatWindow.tsx
git commit -m "feat: add AIChatWindow — 銓幻元 AI 助理版 (brand=mcstation, #FF6B35)"
```

---

## Task 4：替換 /ai-advisor 頁面

**Files:**
- Modify: `app/ai-advisor/page.tsx`

- [ ] **Step 1: 備份現有 ai-advisor**

```bash
cp app/ai-advisor/page.tsx app/ai-advisor/page.tsx.bak
```

- [ ] **Step 2: 替換為 AIChatWindow**

```tsx
// app/ai-advisor/page.tsx
import type { Metadata } from 'next';
import { AIChatWindow } from '@/components/AIChatWindow';

export const metadata: Metadata = {
  title: 'AI 場域顧問 | 銓幻元科技',
  description: '與銓幻元 AI 顧問對話，了解智取物流櫃、冷凍微波機等餐飲自助化解決方案。',
};

export default function AiAdvisorPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-white flex flex-col items-center justify-center px-4 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4">銓幻元 AI 場域顧問</h1>
        <p className="text-slate-400 text-lg max-w-xl mx-auto">
          告訴我您的場域需求，AI 助理將為您分析最適合的智慧餐飲自助化方案。
        </p>
      </div>

      {/* 頁面中央嵌入對話視窗（openOnLoad=true） */}
      <div className="w-full max-w-lg">
        <AIChatWindow
          keyword="智慧餐飲自助化"
          brand="mcstation"
          sourceSlug="/ai-advisor"
          openOnLoad={true}
        />
      </div>
    </main>
  );
}
```

- [ ] **Step 3: 本地測試**

```bash
npm run dev
# 開 http://localhost:3000/ai-advisor
# 確認 AI 對話視窗直接顯示（不是靜態 5 題問卷）
# 輸入「你好」，確認 Gemini AI 有回應
```

- [ ] **Step 4: Commit**

```bash
git add app/ai-advisor/page.tsx
git commit -m "feat: replace /ai-advisor static quiz with AIChatWindow (Gemini AI)"
```

---

## Task 5：首頁 + 主要頁面加入浮動 AI 按鈕

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 在全站 layout 加入浮動按鈕（最簡單做法）**

```bash
grep -n "AIChatWindow\|ai-advisor" app/layout.tsx | head -5
```

- [ ] **Step 2: 在 layout.tsx 的 `<body>` 最底部加入**

```tsx
// app/layout.tsx — 在 </body> 前加入：
import { AIChatWindow } from '@/components/AIChatWindow';

// 在 {children} 之後，</body> 之前：
<AIChatWindow
  keyword="銓幻元智慧餐飲"
  brand="mcstation"
  sourceSlug={/* 用 next/headers 或留空 */ '/'}
  openOnLoad={false}
/>
```

**注意：** layout.tsx 需加 `'use client'` 才能用 useState，或改用 Server Component 包一個 Client Component wrapper。

更簡單的方式：在各頁面個別加，跳過 layout 全域掛載。

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add floating AIChatWindow to global layout"
```

---

## Task 6：建立 solutions/[keyword] SEO 著陸頁

**Files:**
- Create: `app/solutions/[keyword]/page.tsx`

- [ ] **Step 1: 建立目錄**

```bash
mkdir -p app/solutions/[keyword]
```

- [ ] **Step 2: 建立 page.tsx**

```typescript
// app/solutions/[keyword]/page.tsx
import type { Metadata } from 'next';
import { AIChatWindow } from '@/components/AIChatWindow';

const SOLUTIONS = [
  { keyword: 'steam-ramen',      label: '蒸氣拉麵機',   title: '蒸氣拉麵機自助加熱解決方案', desc: '24 小時提供熱騰騰拉麵，無需廚師，夜班員工隨時可享用。' },
  { keyword: 'steam-bento',      label: '蒸氣便當',     title: '蒸氣便當無人加熱設備',       desc: '企業、學校、醫院的員工便當加熱自動化，省去廚房人力。' },
  { keyword: 'frozen-microwave', label: '冷凍微波機',   title: '冷凍微波機 24 小時餐食方案', desc: '冷凍食品現場微波，適合夜班、值班、偏遠廠區場域。' },
  { keyword: 'smart-locker',     label: '智慧取物櫃',   title: '智慧取物櫃無人取餐系統',     desc: '餐廳外帶自取、企業訂餐自助領取，降低人力等待成本。' },
  { keyword: 'ai-labor',         label: 'AI 勞動力',    title: 'AI 勞動力降低餐飲人力成本',  desc: '台灣缺工 15 萬人，AI 設備一台頂三人，24 小時不休。' },
  { keyword: 'ghost-kitchen',    label: '幽靈廚房設備', title: '幽靈廚房 AI 設備整合方案',   desc: '中央廚房製作、AI 設備在各場域加熱取餐，打造多點通路。' },
];

// SSG — build 時靜態生成所有著陸頁，SEO 最佳化
export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ keyword: s.keyword }));
}

export async function generateMetadata(
  { params }: { params: Promise<{ keyword: string }> }
): Promise<Metadata> {
  const { keyword } = await params;
  const sol = SOLUTIONS.find(s => s.keyword === keyword);
  return {
    title: `${sol?.title ?? keyword} | 銓幻元科技`,
    description: sol?.desc ?? `了解銓幻元${sol?.label ?? keyword}解決方案，立即與 AI 顧問對話。`,
  };
}

export default async function SolutionPage(
  { params }: { params: Promise<{ keyword: string }> }
) {
  const { keyword } = await params;
  const sol = SOLUTIONS.find(s => s.keyword === keyword);
  const accentColor = '#FF6B35';

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

      {/* 第二屏：AI 對話視窗（頁面中央，openOnLoad=true） */}
      <section id="chat" className="max-w-2xl mx-auto px-6 pb-24">
        <h2 className="text-xl font-bold text-center mb-8 text-slate-300">
          與 AI 顧問對話，30 秒了解您的需求
        </h2>
        <AIChatWindow
          keyword={sol?.label ?? keyword}
          brand="mcstation"
          sourceSlug={`/solutions/${keyword}`}
          openOnLoad={true}
        />
      </section>
    </main>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add app/solutions/
git commit -m "feat: solutions/[keyword] SSG 著陸頁 — 銓幻元 6 個關鍵字頁面"
```

---

## Task 7：Build 驗證 + 部署

- [ ] **Step 1: TypeScript 型別檢查**

```bash
npx tsc --noEmit
```

Expected：無錯誤

- [ ] **Step 2: Build**

```bash
npm run build
```

Expected：`✓ Compiled successfully`，6 個 solutions 頁面靜態生成

- [ ] **Step 3: 部署**

```bash
npx vercel --prod --scope jasonlee1002-coders-projects --yes
```

- [ ] **Step 4: 驗證**

```
桌面：
- /ai-advisor → AI 對話視窗直接顯示（不是 5 題問卷）
- AI 開場：「您好！我是銓幻元 AI 助理...」
- /solutions/steam-ramen → 頁面中央顯示對話，開場詢問蒸氣拉麵機相關問題

手機 (iPhone)：
agent-browser set device "iPhone 14 Pro"
agent-browser open https://mcstation.ai/ai-advisor
agent-browser screenshot --annotate

手機 (Android)：
agent-browser set device "Pixel 7"
agent-browser open https://mcstation.ai/ai-advisor
agent-browser screenshot --annotate

功能：
- 對話 4-5 輪後出現 LeadConfirmCard
- 「修改」按鈕可回退繼續對話
- 送出後 Notion CRM 有新 Case（來源：mcstation.ai）
- Jason LINE 收到通知
```

- [ ] **Step 5: 最終 Push**

```bash
git add -A
git commit -m "feat: Yuzu AI 對話顧問系統上線 — 銓幻元版 mcstation.ai"
git push origin main
```

---

## 完成驗收

- [ ] `/ai-advisor` 替換為 Gemini AI 對話（非靜態問卷）
- [ ] 6 個 `/solutions/[keyword]` 著陸頁上線並靜態生成（SSG）
- [ ] 全站浮動「💬 AI 顧問諮詢」按鈕（橘色 #FF6B35）
- [ ] AI 依關鍵字開場，銓幻元品牌語氣
- [ ] 最多 6 輪對話後自動整理需求
- [ ] LeadConfirmCard 可修改 + 確認送出
- [ ] Notion CRM `來源網站` = `mcstation.ai`
- [ ] Jason LINE 即時通知
- [ ] 桌面 + iPhone + Android 三端正常
