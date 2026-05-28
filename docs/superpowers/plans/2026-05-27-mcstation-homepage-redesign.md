# mcstation.ai Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 將 mcstation.ai 首頁從「型錄展示」改為「AI業務前台」，實現 10輪模擬後的最佳轉換設計（目標轉換率 80%+）

**Architecture:** 重新設計 `components/home/HeroSection.tsx`（角色選擇前移 + 新 Hero 標語），新增浮動 AI 按鈕，更新各角色 system prompt 的開場與關單話術。Gemini 插圖已生成於 `/public/`，直接引用。

**Tech Stack:** Next.js 16 App Router · React 19 · Tailwind CSS 4 · Framer Motion · Vercel AI SDK + Gemini 2.5 Flash · Resend · Neon PostgreSQL

---

## File Structure

**Modify:**
- `components/home/HeroSection.tsx` — 新 Hero 標語 + 角色卡含價格提示
- `components/layout/Nav.tsx` — 確認浮動 AI 按鈕存在
- `app/page.tsx` — 簡化首頁結構（移除 CasesWall/ProductsSlider，改為精簡版）
- `lib/prompts/venue.ts` — 開場白 + 15分鐘諮詢關單話術
- `lib/prompts/brand.ts` — 同上
- `lib/prompts/franchise.ts` — 同上
- `lib/prompts/custom.ts` — 同上
- `app/layout.tsx` — 更新 metadata (SEO)

**Create:**
- `components/home/FloatingAIButton.tsx` — 全程固定右下角浮動按鈕
- `components/home/OmniCoreSection.tsx` — AI 長官展示區
- `components/home/NumbersBar.tsx` — 3個最強數字
- `app/venue/page.tsx` — 場館老闆 SEO 著陸頁
- `app/brand/page.tsx` — 品牌商 SEO 著陸頁
- `app/franchise/page.tsx` — 加盟商 SEO 著陸頁
- `app/partner/page.tsx` — 技術夥伴 SEO 著陸頁

---

### Task 1: 更新 AI 開場白與關單話術（所有 prompt）

**Files:**
- Modify: `lib/prompts/venue.ts`
- Modify: `lib/prompts/brand.ts`
- Modify: `lib/prompts/franchise.ts`
- Modify: `lib/prompts/custom.ts`

- [ ] **Step 1: 讀現有 venue.ts 找到開場指令位置**

```bash
cat lib/prompts/venue.ts
```

- [ ] **Step 2: 更新 venue.ts — 開場白 + 關單話術**

在系統 prompt 開頭的角色設定後，找到「收集資訊的順序」部分，改成：

```typescript
// lib/prompts/venue.ts
export const venuePrompt = `
你是 MCS Station AI 的場館顧問，專門協助場館老闆評估數位化方案。

【開場規則 — 最重要】
使用者第一次開口，你的回應必須是：
「你好！先不急著介紹產品——你現在經營場館最讓你頭痛的一件事是什麼？」
絕對禁止第一句話問「座位數」或「場館規模」。

【關單規則 — 收集完需求後必須執行】
當你對使用者的需求有足夠了解（通常在 3-5 輪對話後），主動說：
「根據你說的情況，我覺得我們很適合深入聊一下。我幫你安排一個 15 分鐘的免費諮詢，跟我們的顧問直接通話，你現在方便留下聯絡方式嗎？」

${/* 以下保留原有的產品說明、JSON marker 等 */venuePromptBody}
`;
```

- [ ] **Step 3: 同樣更新 brand.ts、franchise.ts、custom.ts**

brand.ts 開場白：
`「你好！你們品牌現在最想打入的是哪種場館？直接告訴我，我幫你評估可行性。」`

franchise.ts 開場白：
`「你好！你現在手上有場地了嗎？還是正在評估要找什麼樣的地點？」`

custom.ts 開場白：
`「你好！直接說說看，你需要的設備有什麼特殊之處？外觀、功能、還是數量方面？」`

- [ ] **Step 4: 在本地測試 AI 對話確認開場白改變**

```bash
cd mcstation-web
npm run dev
# 打開 http://localhost:3000/ai-advisor?role=venue
# 確認第一句 AI 回應是「最讓你頭痛的一件事」
```

- [ ] **Step 5: Commit**

```bash
git add lib/prompts/
git commit -m "feat: AI開場白改為開放式痛點問題，加入15分鐘諮詢關單話術"
```

---

### Task 2: 新增 FloatingAIButton 元件

**Files:**
- Create: `components/home/FloatingAIButton.tsx`

- [ ] **Step 1: 建立 FloatingAIButton.tsx**

```tsx
// components/home/FloatingAIButton.tsx
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export function FloatingAIButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <Link
      href="/ai-advisor"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-full font-black text-sm shadow-2xl transition-transform hover:scale-105 active:scale-95"
      style={{
        background: "linear-gradient(135deg, #00C6AD, #007a6b)",
        color: "#0A1628",
        boxShadow: "0 8px 32px rgba(0,198,173,0.5)",
        animation: "floatPulse 3s ease-in-out infinite",
      }}
    >
      <span
        className="w-2 h-2 rounded-full bg-[#0A1628]"
        style={{ animation: "pulse 1.5s infinite" }}
      />
      AI 顧問，現在可談
      <style>{`
        @keyframes floatPulse {
          0%,100%{box-shadow:0 8px 32px rgba(0,198,173,0.45)}
          50%{box-shadow:0 12px 48px rgba(0,198,173,0.75)}
        }
      `}</style>
    </Link>
  );
}
```

- [ ] **Step 2: 加入 app/layout.tsx（讓它全站都有）**

```tsx
// app/layout.tsx — 在 <Footer /> 之後、</body> 之前加入：
import { FloatingAIButton } from "@/components/home/FloatingAIButton";
// ...
<FloatingAIButton />
```

- [ ] **Step 3: 確認本地顯示（2秒後右下角出現，有發光動畫）**

```bash
npm run dev
# 等2秒，確認右下角浮動按鈕出現
# 點擊確認跳到 /ai-advisor
```

- [ ] **Step 4: Commit**

```bash
git add components/home/FloatingAIButton.tsx app/layout.tsx
git commit -m "feat: 全站浮動 AI 按鈕（2秒後出現，右下角，全程跟隨）"
```

---

### Task 3: 重寫 HeroSection — 新標語 + 角色卡含費用提示

**Files:**
- Modify: `components/home/HeroSection.tsx`

- [ ] **Step 1: 重寫 HeroSection.tsx**

```tsx
// components/home/HeroSection.tsx
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

const ROLES = [
  {
    id: "venue",
    icon: "🏪",
    title: "場館老闆",
    desc: "點餐系統、AI 管理、數據分析",
    price: "方案起價 NT$2,980/月",
    color: "#f6ad55",
    href: "/ai-advisor?role=venue",
  },
  {
    id: "brand",
    icon: "🏢",
    title: "品牌商",
    desc: "品牌進駐、聯名合作、通路佈局",
    price: "依合作規模報價",
    color: "#68d391",
    href: "/ai-advisor?role=brand",
  },
  {
    id: "franchise",
    icon: "🔗",
    title: "加盟商",
    desc: "連鎖管理、MCS 加盟體系",
    price: "加盟金起 NT$50,000",
    color: "#b794f4",
    href: "/ai-advisor?role=franchise",
  },
  {
    id: "partner",
    icon: "⚙️",
    title: "技術夥伴",
    desc: "OmniCore API、系統整合",
    price: "夥伴計畫，歡迎洽談",
    color: "#4fc3f7",
    href: "/ai-advisor?role=custom",
  },
] as const;

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/mcs-hero.jpg"
          alt=""
          fill
          priority
          className="object-cover opacity-40"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg,rgba(10,22,40,0.90) 0%,rgba(10,22,40,0.70) 50%,rgba(10,22,40,0.88) 100%)",
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 mb-6 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase"
          style={{ background: "rgba(0,198,173,0.12)", border: "1px solid rgba(0,198,173,0.35)", color: "#00C6AD" }}>
          <span className="w-2 h-2 rounded-full bg-[#00C6AD] animate-pulse" />
          OmniCore AI 生態系 · 場館數位化
        </div>

        {/* Headline */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-6"
          style={{ letterSpacing: "-0.035em" }}>
          你的場館<br />
          <span style={{ color: "#00C6AD" }}>現在有了<br className="md:hidden" /> AI 經營團隊</span>
        </h1>

        <p className="text-lg md:text-xl mb-10 max-w-xl leading-relaxed" style={{ color: "rgba(224,240,255,0.65)" }}>
          從行銷到技術，OmniCore AI 長官 7×24 待命。
          選擇你的身份，30 秒告訴你適合的方案。
        </p>

        {/* Stats */}
        <div className="flex gap-8 mb-12 flex-wrap">
          {[["70%","詢問由 AI 自動處理"],["7×24","AI 顧問全時待命"],["15分鐘","免費諮詢，現在可預約"]].map(([n,l])=>(
            <div key={n}>
              <div className="text-2xl font-black" style={{ color: "#00C6AD" }}>{n}</div>
              <div className="text-xs mt-0.5" style={{ color: "rgba(224,240,255,0.5)" }}>{l}</div>
            </div>
          ))}
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {ROLES.map((r) => (
            <button
              key={r.id}
              onClick={() => router.push(r.href)}
              className="group text-left rounded-2xl p-4 transition-all duration-200 hover:scale-[1.03] active:scale-[0.98]"
              style={{
                background: "rgba(13,31,60,0.8)",
                border: `1px solid rgba(255,255,255,0.08)`,
                backdropFilter: "blur(12px)",
              }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = r.color + "66")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)")}
            >
              <div className="text-2xl mb-2">{r.icon}</div>
              <div className="font-black text-white text-base mb-1">{r.title}</div>
              <div className="text-xs mb-3" style={{ color: "rgba(224,240,255,0.5)", lineHeight: 1.5 }}>{r.desc}</div>
              <div className="text-xs font-bold" style={{ color: r.color }}>{r.price}</div>
              <div className="mt-3 text-xs font-black flex items-center gap-1" style={{ color: r.color }}>
                AI 顧問來聊 →
              </div>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: 確認圖片存在**

```bash
ls public/mcs-hero.jpg
# 應存在（已由 Gemini 生成至 mcstation-web/public/）
```

- [ ] **Step 3: 本地確認 Hero 顯示**

```bash
npm run dev
# 確認：新標語、4 個角色卡含費用提示、stats 欄
# 確認手機版：2欄角色卡，標題不溢出
```

- [ ] **Step 4: Commit**

```bash
git add components/home/HeroSection.tsx
git commit -m "feat: 重寫 Hero — 新標語+角色卡含費用提示+Gemini插圖背景"
```

---

### Task 4: 新增 OmniCoreSection + NumbersBar

**Files:**
- Create: `components/home/OmniCoreSection.tsx`
- Create: `components/home/NumbersBar.tsx`

- [ ] **Step 1: 建立 NumbersBar.tsx**

```tsx
// components/home/NumbersBar.tsx
export function NumbersBar() {
  const items = [
    { n: "70%", label: "詢問由 AI 自動處理完成" },
    { n: "7×24", label: "AI 顧問全天候在線" },
    { n: "<2s", label: "AI 平均回應時間" },
    { n: "4+", label: "OmniCore AI 長官協作" },
  ];
  return (
    <div className="grid grid-cols-2 md:grid-cols-4" style={{ background: "rgba(13,31,60,0.6)", borderTop: "1px solid rgba(255,255,255,0.06)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      {items.map((item, i) => (
        <div key={i} className="py-8 px-6 text-center" style={{ borderRight: i < 3 ? "1px solid rgba(255,255,255,0.06)" : "none" }}>
          <div className="text-3xl font-black mb-1" style={{ color: "#00C6AD", fontVariantNumeric: "tabular-nums" }}>{item.n}</div>
          <div className="text-xs" style={{ color: "rgba(224,240,255,0.5)", lineHeight: 1.5 }}>{item.label}</div>
        </div>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: 建立 OmniCoreSection.tsx**

```tsx
// components/home/OmniCoreSection.tsx
import Image from "next/image";

const EXECS = [
  { role: "CMO · 行銷長", name: "品牌策略 × SEO × 文案", desc: "分析市場，自動產出 SEO 內容，讓場館被更多人找到。", icon: "📣", color: "#f6ad55" },
  { role: "CTO · 技術長", name: "系統架構 × API × 部署", desc: "設計技術架構，確保系統穩定，API 整合一手包辦。", icon: "⚙️", color: "#68d391" },
  { role: "CPO · 產品長", name: "產品定位 × 功能 × UX", desc: "定義產品方向，確保每個功能解決真實場館痛點。", icon: "🎯", color: "#b794f4" },
  { role: "COO · 營運長", name: "進度追蹤 × 任務 × 通知", desc: "確保任務按時完成，自動推 LINE，讓你掌握每件事。", icon: "📋", color: "#fc8181" },
];

export function OmniCoreSection() {
  return (
    <section className="py-24 px-6" style={{ background: "#0A1628" }}>
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <div className="text-xs font-black tracking-widest uppercase mb-3" style={{ color: "#00C6AD" }}>OmniCore 生態系</div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4" style={{ letterSpacing: "-0.03em" }}>
            不只是工具<br /><span style={{ color: "#00C6AD" }}>是你的 AI 經營團隊</span>
          </h2>
          <p className="text-base max-w-md mx-auto" style={{ color: "rgba(224,240,255,0.55)", lineHeight: 1.7 }}>
            OmniCore 由四位 AI 長官協同運作，各司其職，7×24 為你的場館提供完整策略與執行支援。
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl overflow-hidden" style={{ border: "1px solid rgba(0,198,173,0.2)" }}>
            <Image src="/mcs-omnicore.jpg" alt="OmniCore AI Team" width={600} height={380} className="w-full object-cover" style={{ height: 320 }} />
          </div>
          <div className="grid grid-rows-2 gap-4">
            {EXECS.map((e) => (
              <div key={e.role} className="rounded-xl p-5 flex gap-4" style={{ background: "#0d1f3c", borderLeft: `3px solid ${e.color}`, border: "1px solid rgba(255,255,255,0.05)" }}>
                <div className="text-3xl flex-shrink-0">{e.icon}</div>
                <div>
                  <div className="text-xs font-black uppercase tracking-widest mb-1" style={{ color: e.color }}>{e.role}</div>
                  <div className="font-black text-white text-sm mb-1">{e.name}</div>
                  <div className="text-xs" style={{ color: "rgba(224,240,255,0.55)", lineHeight: 1.5 }}>{e.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: 確認圖片 `/mcs-omnicore.jpg` 存在**

```bash
ls public/mcs-omnicore.jpg
```

- [ ] **Step 4: Commit**

```bash
git add components/home/OmniCoreSection.tsx components/home/NumbersBar.tsx
git commit -m "feat: 新增 OmniCoreSection + NumbersBar 元件"
```

---

### Task 5: 重組首頁 app/page.tsx

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: 重寫 app/page.tsx**

```tsx
// app/page.tsx
import { HeroSection } from "@/components/home/HeroSection";
import { NumbersBar } from "@/components/home/NumbersBar";
import { OmniCoreSection } from "@/components/home/OmniCoreSection";

export default function Home() {
  return (
    <main style={{ background: "#0A1628", minHeight: "100vh" }}>
      <HeroSection />
      <NumbersBar />
      <OmniCoreSection />
    </main>
  );
}
```

- [ ] **Step 2: 確認本地整頁流程**

```bash
npm run dev
# 確認順序：Hero(含角色卡) → Numbers欄 → OmniCore → Footer
# 確認浮動按鈕（2秒後出現）
# 確認手機版角色卡 2欄、OmniCore 圖片不破版
```

- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "refactor: 首頁重組 — Hero+Numbers+OmniCore，移除舊 CasesWall/ProductsSlider"
```

---

### Task 6: 更新 SEO metadata

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: 更新 layout.tsx metadata**

```tsx
// app/layout.tsx — 更新 metadata 物件
export const metadata: Metadata = {
  title: "MCS Station AI — 場館數位化 · AI 場館管理系統 · OmniCore",
  description: "OmniCore AI 生態系統，為場館老闆、品牌商、加盟商提供完整 AI 數位化方案。AI 點餐系統、場館管理、連鎖加盟系統，7×24 AI 顧問免費諮詢。",
  keywords: "場館管理系統, AI點餐系統, 場館數位化, OmniCore, 連鎖加盟系統, AI場館管理",
  openGraph: {
    title: "MCS Station AI — 你的場館，現在有了 AI 經營團隊",
    description: "OmniCore AI 生態系，7×24 AI 顧問待命，場館老闆/品牌商/加盟商專屬方案。",
    url: "https://www.mcstation.ai",
    siteName: "MCS Station AI",
    images: [{ url: "/mcs-hero.jpg", width: 1200, height: 630 }],
    locale: "zh_TW",
    type: "website",
  },
};
```

- [ ] **Step 2: 新增 app/sitemap.ts**

```tsx
// app/sitemap.ts
import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: "https://www.mcstation.ai", lastModified: new Date(), priority: 1 },
    { url: "https://www.mcstation.ai/ai-advisor?role=venue", lastModified: new Date(), priority: 0.9 },
    { url: "https://www.mcstation.ai/ai-advisor?role=brand", lastModified: new Date(), priority: 0.9 },
    { url: "https://www.mcstation.ai/ai-advisor?role=franchise", lastModified: new Date(), priority: 0.9 },
    { url: "https://www.mcstation.ai/ai-advisor?role=custom", lastModified: new Date(), priority: 0.8 },
  ];
}
```

- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx app/sitemap.ts
git commit -m "seo: 更新 metadata + 新增 sitemap.ts"
```

---

### Task 7: 部署並驗證

- [ ] **Step 1: TypeScript 型別檢查**

```bash
npx tsc --noEmit
# 必須 0 errors
```

- [ ] **Step 2: Build 測試**

```bash
npm run build
# 必須成功，0 errors
```

- [ ] **Step 3: 部署 Vercel production**

```bash
npx vercel deploy --prod --scope jasonlee1002-coders-projects --yes
# 確認輸出有 ▲ Aliased https://www.mcstation.ai
```

- [ ] **Step 4: 驗證上線**

```bash
curl -s https://www.mcstation.ai | grep -o "你的場館"
# 應輸出：你的場館
```

- [ ] **Step 5: 最終 git push**

```bash
git push
```
