# mcstation.ai 改版 — Plan A: 專案建置 + 首頁

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 建立全新 mcstation.ai Next.js 專案，實作雜誌媒體風首頁（Hero + 案例牆 + 產品展示）

**Architecture:** Next.js 15 App Router + Tailwind CSS + framer-motion。首頁分 3 大 Section：全螢幕影片 Hero（含 4 角色入口）、雜誌風案例牆、產品橫向滑動卡片。所有動畫用 IntersectionObserver + CSS keyframes，避免 framer-motion 過度使用。

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, framer-motion 11, Geist Sans + Noto Sans TC, Vercel 部署

---

## File Structure

```
mcstation-web/
├── app/
│   ├── layout.tsx              # Root layout, font loading, global CSS
│   ├── page.tsx                # 首頁，組合 Section 元件
│   ├── globals.css             # CSS variables, animations, base styles
│   └── consult/                # Plan B 範圍
│       └── page.tsx
├── components/
│   ├── home/
│   │   ├── HeroSection.tsx     # 全螢幕影片 + 角色選擇按鈕
│   │   ├── CasesWall.tsx       # 雜誌風案例牆（大圖 + 網格 + 影片）
│   │   └── ProductsSlider.tsx  # 產品橫向滑動卡片
│   ├── layout/
│   │   ├── Nav.tsx             # 固定頂部導覽
│   │   └── Footer.tsx          # Footer
│   └── ui/
│       ├── RoleButton.tsx      # 角色入口大按鈕（含 icon + hover 效果）
│       ├── CaseCard.tsx        # 案例卡片（大/中/小尺寸）
│       └── ProductCard.tsx     # 產品卡片
├── lib/
│   ├── cases.ts                # 案例資料（static，之後可改 CMS）
│   └── products.ts             # 產品資料
├── public/
│   ├── videos/                 # 背景影片（placeholder mp4）
│   └── images/                 # 案例圖片、產品圖片
├── package.json
├── tailwind.config.ts
├── tsconfig.json
└── next.config.ts
```

---

## Task 1: 建立 Next.js 專案

**Files:**
- Create: `mcstation-web/` (new project root)
- Create: `package.json`, `next.config.ts`, `tailwind.config.ts`, `tsconfig.json`

- [ ] **Step 1: 建立專案**

```bash
cd C:/Users/JasonLee/claude_code_projects
npx create-next-app@latest mcstation-web \
  --typescript \
  --tailwind \
  --app \
  --no-src-dir \
  --no-import-alias \
  --turbopack
cd mcstation-web
```

- [ ] **Step 2: 安裝依賴**

```bash
npm install framer-motion
npm install @vercel/analytics
npm install -D @types/node
```

- [ ] **Step 3: 設定 next.config.ts**

```typescript
// next.config.ts
import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: '**.mcstation.ai' },
    ],
  },
}

export default nextConfig
```

- [ ] **Step 4: 設定 globals.css（CSS variables + animations）**

```css
/* app/globals.css */
@import "tailwindcss";

@layer base {
  :root {
    --bg: #0A0E1A;
    --bg-card: #111827;
    --accent: #00C6AD;
    --accent-warm: #F5A623;
    --text: #F0F4F8;
    --text-muted: #8B9CB0;
    --border: rgba(255,255,255,0.08);
    --radius: 16px;
  }
}

/* Fade up on scroll */
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}

.fade-up {
  opacity: 0;
  animation: fadeUp 0.7s ease forwards;
}

.fade-up.visible { animation-play-state: running; }
.fade-up:not(.visible) { animation-play-state: paused; }

/* Shimmer text */
@keyframes shimmer {
  0%   { background-position: -200% center; }
  100% { background-position: 200% center; }
}

.shimmer-text {
  background: linear-gradient(
    90deg,
    var(--text) 0%,
    var(--accent) 40%,
    var(--text) 60%,
    var(--text) 100%
  );
  background-size: 200% auto;
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 4s linear infinite;
}

/* Scroll reveal hook */
.reveal { opacity: 0; transform: translateY(24px); transition: opacity 0.6s ease, transform 0.6s ease; }
.reveal.is-visible { opacity: 1; transform: translateY(0); }

html { background: var(--bg); color: var(--text); }
```

- [ ] **Step 5: 設定字型 layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_TC } from 'next/font/google'
import './globals.css'

const geist = Geist({ subsets: ['latin'], variable: '--font-geist' })
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-mono' })
const notoTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-tc',
})

export const metadata: Metadata = {
  title: '銓幻元科技 | 智慧販賣機 · GraBox · 智取設備',
  description: '銓幻元科技 mcstation.ai — 提供智慧販賣機、GraBox 自助取餐、冷凍微波設備，服務場地主、品牌商與加盟夥伴。',
  openGraph: {
    title: '銓幻元科技 | 智慧販賣機',
    description: '對話式 AI 諮詢，找到最適合你的智慧設備方案',
    url: 'https://mcstation.ai',
    siteName: '銓幻元科技',
    locale: 'zh_TW',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${geist.variable} ${geistMono.variable} ${notoTC.variable}`}>
      <body className="font-[var(--font-tc)] antialiased bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  )
}
```

- [ ] **Step 6: 驗證 dev server 啟動**

```bash
npm run dev
```
預期：`http://localhost:3000` 可看到 Next.js 預設頁面，無 TypeScript 錯誤。

- [ ] **Step 7: 初始 commit**

```bash
git init && git add -A
git commit -m "feat: init mcstation-web Next.js 15 project"
```

---

## Task 2: 靜態資料層

**Files:**
- Create: `lib/cases.ts`
- Create: `lib/products.ts`

- [ ] **Step 1: 建立案例資料**

```typescript
// lib/cases.ts
export type CaseSize = 'hero' | 'medium' | 'small'

export interface Case {
  id: string
  title: string
  client: string
  category: '辦公室' | '餐飲連鎖' | '交通樞紐' | '校園' | '場館' | '零售'
  description: string
  image: string          // /images/cases/{id}.jpg
  videoUrl?: string      // autoplay loop
  size: CaseSize
  metrics?: { label: string; value: string }[]
}

export const cases: Case[] = [
  {
    id: 'mcdiner',
    title: '麥味登早餐連鎖導入 GraBox',
    client: '麥味登',
    category: '餐飲連鎖',
    description: '全台 200+ 門市，GraBox 自助取餐讓顛峰時段出餐效率提升 40%',
    image: '/images/cases/mcdiner.jpg',
    size: 'hero',
    metrics: [
      { label: '導入門市', value: '200+' },
      { label: '出餐效率', value: '+40%' },
      { label: '客訴率', value: '-60%' },
    ],
  },
  {
    id: 'familymart',
    title: '全家便利商店智慧取餐試點',
    client: '全家',
    category: '零售',
    description: '指定門市試行 GraBox，整合 POS 系統，提升自助取餐比例',
    image: '/images/cases/familymart.jpg',
    size: 'medium',
  },
  {
    id: 'japan-highway',
    title: '日本首都高速服務區',
    client: '首都高速株式會社',
    category: '交通樞紐',
    description: '冷凍微波販賣機進駐高速公路服務區，24 小時無人化服務',
    image: '/images/cases/japan-highway.jpg',
    size: 'medium',
  },
  {
    id: 'office-park',
    title: '科學園區辦公室部署',
    client: '富田電機 / 竹科',
    category: '辦公室',
    description: '企業員工餐飲自助解決方案，節省 30% 餐飲空間成本',
    image: '/images/cases/office-park.jpg',
    size: 'small',
  },
  {
    id: 'sports-venue',
    title: '展望運動場館',
    client: '展望運動',
    category: '場館',
    description: '運動後補給站，冷飲 + 輕食 24 小時自助供應',
    image: '/images/cases/sports-venue.jpg',
    size: 'small',
  },
]
```

- [ ] **Step 2: 建立產品資料**

```typescript
// lib/products.ts
export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  videoUrl?: string
  specs: { label: string; value: string }[]
  targetRoles: ('venue' | 'brand' | 'franchise' | 'custom')[]
  highlight: string  // 一句話賣點
}

export const products: Product[] = [
  {
    id: 'grabox',
    name: 'GraBox 自助取餐櫃',
    tagline: '讓取餐等待，成為過去式',
    description: '智能保溫格層，LINE / APP 掃碼取餐，與 POS 系統無縫整合。適合餐飲連鎖、美食外送、辦公室供餐。',
    image: '/images/products/grabox.jpg',
    specs: [
      { label: '格層', value: '12 / 24 / 36 格（可選）' },
      { label: '保溫', value: '40°C–75°C 精準控溫' },
      { label: '取餐', value: 'QR Code / NFC / APP' },
      { label: '尺寸', value: 'W900 × D600 × H1800 mm' },
    ],
    targetRoles: ['venue', 'brand', 'franchise'],
    highlight: '尖峰出餐效率 +40%',
  },
  {
    id: 'frozen-vending',
    name: '冷凍微波販賣機',
    tagline: '24 小時，熱食隨時有',
    description: '內建微波爐，冷凍食品即買即熱。適合交通樞紐、醫院、校園、24 小時場域。',
    image: '/images/products/frozen-vending.jpg',
    specs: [
      { label: '容量', value: '60–120 個品項' },
      { label: '溫度', value: '-18°C 冷凍保鮮' },
      { label: '加熱', value: '內建微波 90 秒' },
      { label: '支付', value: '信用卡 / LINE Pay / 悠遊卡' },
    ],
    targetRoles: ['venue', 'franchise'],
    highlight: '無人化 24hr 熱食供應',
  },
  {
    id: 'smart-vending',
    name: '智慧販賣機（標準款）',
    tagline: '你的品牌，智能上架',
    description: '模組化設計，支援飲料、零食、保健品、生活用品上架。品牌商專屬貼牌，OmniCore 後台即時監控。',
    image: '/images/products/smart-vending.jpg',
    specs: [
      { label: '格層', value: '可客製 5–10 排' },
      { label: '溫控', value: '常溫 / 冷藏 / 冷凍（可選）' },
      { label: '螢幕', value: '21.5 吋廣告觸控螢幕' },
      { label: '後台', value: 'OmniCore 即時庫存 + 銷售報表' },
    ],
    targetRoles: ['brand', 'franchise', 'custom'],
    highlight: '品牌廣告 + 銷售一體',
  },
]
```

- [ ] **Step 3: commit**

```bash
git add lib/
git commit -m "feat: add cases and products static data"
```

---

## Task 3: Nav + Footer

**Files:**
- Create: `components/layout/Nav.tsx`
- Create: `components/layout/Footer.tsx`

- [ ] **Step 1: Nav 元件**

```typescript
// components/layout/Nav.tsx
'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'

const roles = [
  { label: '場地主', href: '/ai-advisor?role=venue' },
  { label: '品牌商', href: '/ai-advisor?role=brand' },
  { label: '加盟合作', href: '/ai-advisor?role=franchise' },
  { label: '客製化', href: '/ai-advisor?role=custom' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#0A0E1A]/90 backdrop-blur-md border-b border-white/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          <span className="text-[var(--accent)]">銓幻元</span>
          <span className="text-white/80 ml-1 text-sm font-normal">mcstation.ai</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {roles.map((r) => (
            <Link
              key={r.href}
              href={r.href}
              className="px-4 py-2 text-sm text-white/70 hover:text-[var(--accent)] hover:bg-white/5 rounded-lg transition-colors"
            >
              {r.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/ai-advisor"
          className="hidden md:block px-5 py-2 bg-[var(--accent)] text-[#0A0E1A] font-semibold text-sm rounded-full hover:brightness-110 transition"
        >
          AI 諮詢
        </Link>
      </div>
    </header>
  )
}
```

- [ ] **Step 2: Footer 元件**

```typescript
// components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060A14] py-12 mt-24">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between gap-8">
        <div>
          <p className="text-lg font-bold text-[var(--accent)]">銓幻元科技</p>
          <p className="text-sm text-white/50 mt-1">META CLEARING STATION PTE. LTD.</p>
          <p className="text-sm text-white/40 mt-4">138 Cecil Street, #13-02, Singapore</p>
          <p className="text-sm text-white/40">台北市大同區長安西路78巷4弄10號1樓</p>
        </div>
        <div className="flex gap-12 text-sm text-white/50">
          <div className="flex flex-col gap-2">
            <p className="text-white/80 font-medium mb-1">產品</p>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">GraBox 取餐櫃</a>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">冷凍微波機</a>
            <a href="/ai-advisor?role=brand" className="hover:text-[var(--accent)] transition-colors">智慧販賣機</a>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-white/80 font-medium mb-1">合作</p>
            <a href="/ai-advisor?role=venue" className="hover:text-[var(--accent)] transition-colors">我是場地主</a>
            <a href="/ai-advisor?role=brand" className="hover:text-[var(--accent)] transition-colors">我是品牌商</a>
            <a href="/ai-advisor?role=franchise" className="hover:text-[var(--accent)] transition-colors">加盟合作</a>
          </div>
        </div>
        <p className="text-xs text-white/30 self-end">
          © 2026 銓幻元科技 mcstation.ai. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
```

- [ ] **Step 3: 更新 layout.tsx 加入 Nav + Footer**

```typescript
// app/layout.tsx（更新 body 部分）
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'

// body 內容改為：
<body ...>
  <Nav />
  <main>{children}</main>
  <Footer />
</body>
```

- [ ] **Step 4: commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add Nav and Footer layout components"
```

---

## Task 4: RoleButton UI 元件

**Files:**
- Create: `components/ui/RoleButton.tsx`

- [ ] **Step 1: 實作 RoleButton**

```typescript
// components/ui/RoleButton.tsx
'use client'
import Link from 'next/link'

interface RoleButtonProps {
  role: 'venue' | 'brand' | 'franchise' | 'custom'
  label: string
  sublabel: string
  emoji: string
  href: string
}

const gradients = {
  venue:     'from-[#00C6AD]/20 to-[#00C6AD]/5 hover:from-[#00C6AD]/30 border-[#00C6AD]/30',
  brand:     'from-[#F5A623]/20 to-[#F5A623]/5 hover:from-[#F5A623]/30 border-[#F5A623]/30',
  franchise: 'from-[#7B61FF]/20 to-[#7B61FF]/5 hover:from-[#7B61FF]/30 border-[#7B61FF]/30',
  custom:    'from-[#FF6B6B]/20 to-[#FF6B6B]/5 hover:from-[#FF6B6B]/30 border-[#FF6B6B]/30',
}

export default function RoleButton({ role, label, sublabel, emoji, href }: RoleButtonProps) {
  return (
    <Link
      href={href}
      className={`
        group relative flex flex-col items-center gap-3 p-6 rounded-2xl
        bg-gradient-to-b ${gradients[role]}
        border transition-all duration-300
        hover:scale-105 hover:shadow-2xl active:scale-100
      `}
    >
      <span className="text-4xl">{emoji}</span>
      <span className="text-lg font-bold text-white">{label}</span>
      <span className="text-xs text-white/50 text-center leading-relaxed">{sublabel}</span>
      <span className="absolute bottom-3 right-4 text-white/20 text-xs group-hover:text-white/60 transition-colors">→</span>
    </Link>
  )
}
```

- [ ] **Step 2: commit**

```bash
git add components/ui/RoleButton.tsx
git commit -m "feat: add RoleButton UI component"
```

---

## Task 5: HeroSection

**Files:**
- Create: `components/home/HeroSection.tsx`

- [ ] **Step 1: 實作 HeroSection**

```typescript
// components/home/HeroSection.tsx
import RoleButton from '@/components/ui/RoleButton'

const roles = [
  {
    role: 'venue' as const,
    label: '我是場地主',
    sublabel: '評估場地收益、安裝設備',
    emoji: '🏢',
    href: '/ai-advisor?role=venue',
  },
  {
    role: 'brand' as const,
    label: '我是品牌商',
    sublabel: '上架產品、拓展通路',
    emoji: '🏷️',
    href: '/ai-advisor?role=brand',
  },
  {
    role: 'franchise' as const,
    label: '我要加盟合作',
    sublabel: '自己當老闆、設備創業',
    emoji: '🤝',
    href: '/ai-advisor?role=franchise',
  },
  {
    role: 'custom' as const,
    label: '我要客製化',
    sublabel: '特殊需求、客製設備',
    emoji: '⚙️',
    href: '/ai-advisor?role=custom',
  },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* 背景影片 */}
      <video
        autoPlay muted loop playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        poster="/images/hero-poster.jpg"
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
      </video>

      {/* 漸層疊層 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#0A0E1A]/60 via-[#0A0E1A]/40 to-[#0A0E1A]" />

      {/* 光暈 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#00C6AD]/10 blur-[120px] pointer-events-none" />

      {/* 內容 */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <p className="text-sm font-medium tracking-[0.3em] text-[var(--accent)] uppercase mb-6">
          銓幻元科技 · mcstation.ai
        </p>
        <h1 className="shimmer-text text-5xl md:text-7xl font-black leading-tight mb-6">
          智慧設備<br />讓生意更聰明
        </h1>
        <p className="text-lg md:text-xl text-white/60 mb-16 max-w-2xl mx-auto leading-relaxed">
          GraBox 取餐櫃、冷凍微波販賣機、智慧設備一站式服務。
          告訴 AI 你的需求，3 分鐘找到最適合你的方案。
        </p>

        {/* 角色選擇 */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {roles.map((r) => (
            <RoleButton key={r.role} {...r} />
          ))}
        </div>
      </div>

      {/* 向下滾動提示 */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs">
        <span>探索更多</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/30 to-transparent animate-bounce" />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: 接上首頁**

```typescript
// app/page.tsx
import HeroSection from '@/components/home/HeroSection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
    </>
  )
}
```

- [ ] **Step 3: 在 public/videos/ 放 placeholder**

```bash
mkdir -p public/videos public/images/cases public/images/products
# 先建立空白 placeholder 影片（1秒黑幕）
ffmpeg -f lavfi -i color=c=black:s=1920x1080:d=1 -c:v libx264 public/videos/hero.mp4 2>/dev/null || \
  echo "placeholder" > public/videos/hero.mp4.placeholder
```

- [ ] **Step 4: 驗證頁面（dev server）**

訪問 `http://localhost:3000`，應看到：
- 深色背景 Hero
- "智慧設備讓生意更聰明" shimmer 標題
- 4 個 RoleButton 卡片
- Nav 固定在頂部

- [ ] **Step 5: commit**

```bash
git add components/home/HeroSection.tsx app/page.tsx public/
git commit -m "feat: add Hero section with role selector buttons"
```

---

## Task 6: CasesWall（雜誌媒體風）

**Files:**
- Create: `components/home/CasesWall.tsx`
- Create: `components/ui/CaseCard.tsx`

- [ ] **Step 1: CaseCard 元件**

```typescript
// components/ui/CaseCard.tsx
import Image from 'next/image'
import { Case } from '@/lib/cases'

interface CaseCardProps {
  data: Case
  className?: string
}

export default function CaseCard({ data, className = '' }: CaseCardProps) {
  return (
    <div className={`group relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/10 cursor-pointer ${className}`}>
      {/* 圖片 */}
      <div className="relative w-full h-full min-h-[200px]">
        <Image
          src={data.image}
          alt={data.title}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          onError={(e) => {
            // fallback to gradient placeholder
            const target = e.target as HTMLImageElement
            target.style.display = 'none'
          }}
        />
        {/* 漸層疊層 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
      </div>

      {/* 文字 */}
      <div className="absolute bottom-0 left-0 right-0 p-5">
        <span className="inline-block text-xs px-2 py-1 bg-[var(--accent)]/20 text-[var(--accent)] rounded-full mb-2">
          {data.category}
        </span>
        <h3 className="text-white font-bold text-sm md:text-base leading-snug">{data.title}</h3>
        <p className="text-white/60 text-xs mt-1 line-clamp-2">{data.description}</p>

        {/* Metrics（只有 hero size 顯示）*/}
        {data.metrics && (
          <div className="flex gap-4 mt-3">
            {data.metrics.map((m) => (
              <div key={m.label}>
                <p className="text-[var(--accent)] font-bold text-lg">{m.value}</p>
                <p className="text-white/40 text-xs">{m.label}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: CasesWall 元件（雜誌版面）**

```typescript
// components/home/CasesWall.tsx
'use client'
import { useEffect, useRef } from 'react'
import { cases } from '@/lib/cases'
import CaseCard from '@/components/ui/CaseCard'

export default function CasesWall() {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
          }
        })
      },
      { threshold: 0.15 }
    )
    const els = sectionRef.current?.querySelectorAll('.reveal')
    els?.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const heroCase = cases.find((c) => c.size === 'hero')!
  const mediumCases = cases.filter((c) => c.size === 'medium')
  const smallCases = cases.filter((c) => c.size === 'small')

  return (
    <section ref={sectionRef} className="py-24 px-6 max-w-7xl mx-auto">
      {/* 標題 */}
      <div className="reveal mb-12">
        <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">Success Stories</p>
        <h2 className="text-4xl md:text-5xl font-black text-white">
          真實案例，<br />
          <span className="text-white/40">看見改變</span>
        </h2>
      </div>

      {/* 主網格：雜誌版面 */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {/* 主打大圖（跨 2 行 2 列）*/}
        <div className="reveal col-span-2 md:col-span-2 row-span-2 h-[480px]" style={{ animationDelay: '0.1s' }}>
          <CaseCard data={heroCase} className="h-full" />
        </div>

        {/* 中圖 */}
        {mediumCases.map((c, i) => (
          <div key={c.id} className="reveal h-[230px]" style={{ animationDelay: `${0.2 + i * 0.1}s` }}>
            <CaseCard data={c} className="h-full" />
          </div>
        ))}

        {/* 小圖 */}
        {smallCases.map((c, i) => (
          <div key={c.id} className="reveal h-[200px]" style={{ animationDelay: `${0.4 + i * 0.1}s` }}>
            <CaseCard data={c} className="h-full" />
          </div>
        ))}
      </div>

      {/* 自動播放短影片行 */}
      <div className="reveal mt-4" style={{ animationDelay: '0.6s' }}>
        <div className="relative rounded-2xl overflow-hidden h-[200px] bg-[var(--bg-card)] border border-white/10">
          <video
            autoPlay muted loop playsInline
            className="w-full h-full object-cover opacity-60"
          >
            <source src="/videos/cases-reel.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-2xl font-black text-white">全台 500+ 台設備，持續擴張中</p>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 加入首頁**

```typescript
// app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import CasesWall from '@/components/home/CasesWall'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CasesWall />
    </>
  )
}
```

- [ ] **Step 4: 驗證 scroll reveal 動畫**

滾動頁面時，案例卡片應依序淡入（staggered）。

- [ ] **Step 5: commit**

```bash
git add components/home/CasesWall.tsx components/ui/CaseCard.tsx app/page.tsx
git commit -m "feat: add magazine-style cases wall with scroll reveal"
```

---

## Task 7: ProductsSlider

**Files:**
- Create: `components/home/ProductsSlider.tsx`
- Create: `components/ui/ProductCard.tsx`

- [ ] **Step 1: ProductCard 元件**

```typescript
// components/ui/ProductCard.tsx
import Image from 'next/image'
import Link from 'next/link'
import { Product } from '@/lib/products'

export default function ProductCard({ data }: { data: Product }) {
  return (
    <div className="group flex-shrink-0 w-[320px] md:w-[380px] relative overflow-hidden rounded-2xl bg-[var(--bg-card)] border border-white/10 hover:border-[var(--accent)]/50 transition-all duration-300 hover:-translate-y-2">
      {/* 圖片 */}
      <div className="relative h-[220px] overflow-hidden">
        <Image
          src={data.image}
          alt={data.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[var(--bg-card)]" />
      </div>

      {/* 內容 */}
      <div className="p-6">
        <p className="text-xs text-[var(--accent)] tracking-widest uppercase mb-1">{data.highlight}</p>
        <h3 className="text-xl font-bold text-white mb-1">{data.name}</h3>
        <p className="text-sm text-[var(--accent)]/80 mb-3">{data.tagline}</p>
        <p className="text-sm text-white/50 leading-relaxed mb-5">{data.description}</p>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-5">
          {data.specs.map((s) => (
            <div key={s.label} className="bg-white/5 rounded-lg px-3 py-2">
              <p className="text-xs text-white/40">{s.label}</p>
              <p className="text-xs text-white font-medium">{s.value}</p>
            </div>
          ))}
        </div>

        <Link
          href={`/ai-advisor?role=${data.targetRoles[0]}&product=${data.id}`}
          className="block text-center py-2.5 bg-[var(--accent)]/10 text-[var(--accent)] rounded-xl text-sm font-semibold hover:bg-[var(--accent)] hover:text-[#0A0E1A] transition-colors"
        >
          AI 諮詢這款設備 →
        </Link>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: ProductsSlider 元件**

```typescript
// components/home/ProductsSlider.tsx
'use client'
import { useRef } from 'react'
import { products } from '@/lib/products'
import ProductCard from '@/components/ui/ProductCard'

export default function ProductsSlider() {
  const sliderRef = useRef<HTMLDivElement>(null)

  const scroll = (dir: 'left' | 'right') => {
    const el = sliderRef.current
    if (!el) return
    el.scrollBy({ left: dir === 'right' ? 400 : -400, behavior: 'smooth' })
  }

  return (
    <section className="py-24 overflow-hidden">
      {/* 標題 */}
      <div className="px-6 max-w-7xl mx-auto flex items-end justify-between mb-10">
        <div>
          <p className="text-xs tracking-[0.3em] text-[var(--accent)] uppercase mb-3">Our Products</p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            智慧設備<br />
            <span className="text-white/40">一次看清楚</span>
          </h2>
        </div>
        <div className="hidden md:flex gap-2">
          <button
            onClick={() => scroll('left')}
            className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center"
          >
            ←
          </button>
          <button
            onClick={() => scroll('right')}
            className="w-10 h-10 rounded-full border border-white/20 text-white/60 hover:border-[var(--accent)] hover:text-[var(--accent)] transition-colors flex items-center justify-center"
          >
            →
          </button>
        </div>
      </div>

      {/* 橫向滑動 */}
      <div
        ref={sliderRef}
        className="flex gap-6 px-6 overflow-x-auto scrollbar-hide scroll-smooth"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        <div className="flex-shrink-0 w-6 md:w-[calc((100vw-1280px)/2)]" /> {/* left padding */}
        {products.map((p) => (
          <ProductCard key={p.id} data={p} />
        ))}
        <div className="flex-shrink-0 w-6" />
      </div>
    </section>
  )
}
```

- [ ] **Step 3: 加入首頁**

```typescript
// app/page.tsx
import HeroSection from '@/components/home/HeroSection'
import CasesWall from '@/components/home/CasesWall'
import ProductsSlider from '@/components/home/ProductsSlider'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CasesWall />
      <ProductsSlider />
    </>
  )
}
```

- [ ] **Step 4: commit**

```bash
git add components/home/ProductsSlider.tsx components/ui/ProductCard.tsx app/page.tsx
git commit -m "feat: add products horizontal slider section"
```

---

## Task 8: 部署 Vercel + 設定域名

**Files:**
- Modify: `next.config.ts`

- [ ] **Step 1: 確認 build 無錯誤**

```bash
npm run build
```
預期：無 TypeScript 錯誤，build 成功。

- [ ] **Step 2: 部署 Vercel**

```bash
npx vercel --prod --scope jasonlee1002-coders-projects --yes
```

- [ ] **Step 3: 設定 mcstation.ai 自定義域名**（Vercel Dashboard）

進入 Vercel 專案 → Settings → Domains → 加入 `mcstation.ai` 和 `www.mcstation.ai`。
DNS CNAME 指向 `cname.vercel-dns.com`。

- [ ] **Step 4: 驗證線上網址**

```bash
curl -s -o /dev/null -w "%{http_code}" https://mcstation.ai
```
預期：200

- [ ] **Step 5: 最終 commit**

```bash
git add -A
git commit -m "feat: Plan A complete - homepage with hero, cases wall, products slider"
git push origin main
```

---

## 驗收標準

- [ ] `https://mcstation.ai` 首頁可存取（200）
- [ ] Hero 背景影片（或 poster 圖）+ shimmer 標題
- [ ] 4 個角色入口按鈕，各 hover 有效果
- [ ] 案例牆：大圖 + 中圖 + 小圖雜誌排版
- [ ] 滾動時卡片依序 fade-in
- [ ] 產品橫向滑動，含左右按鈕
- [ ] RWD：手機版正常顯示
- [ ] build 無錯誤、無 console.error
