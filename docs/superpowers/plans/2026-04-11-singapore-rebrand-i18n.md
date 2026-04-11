# Singapore Rebrand + 4-Language i18n Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Transform MCS_web into an international Singapore company website with 4-language support (ZH-TW, EN, ID, JA), Singapore ACRA company branding, new Consulting & Global Presence sections, and high-tech enterprise visual style.

**Architecture:** React Context for language state (persisted to localStorage, no URL routing changes), single `translations.ts` file for all 4 languages generated via Gemini API script, new components for Consulting and GlobalPresence inserted into home page.

**Tech Stack:** Next.js 16, React Context, TypeScript, Tailwind CSS, Framer Motion, @google/generative-ai (existing)

**Singapore Company Info:**
- Name: META CLEARING STATION PTE. LTD.
- UEN: 202316403G  
- Incorporated: 28 APR 2023
- Address: 138 Cecil Street, #13-02, Cecil Court, Singapore 069538
- Taiwan R&D: 103 台北市大同區長安西路78巷4弄10號1樓

---

## File Map

| File | Action | Purpose |
|------|--------|---------|
| `src/lib/translations.ts` | CREATE | All strings for ZH-TW, EN, ID, JA |
| `src/contexts/LanguageContext.tsx` | CREATE | Language state + useLanguage hook |
| `src/components/LanguageSwitcher.tsx` | CREATE | Flag dropdown in header |
| `src/components/Consulting.tsx` | CREATE | New consulting services section |
| `src/components/GlobalPresence.tsx` | CREATE | SG + TW dual-HQ presence section |
| `scripts/generate-translations.mjs` | CREATE | Gemini script to produce ID+JA |
| `src/app/layout.tsx` | MODIFY | Wrap with LanguageProvider |
| `src/components/Header.tsx` | MODIFY | SG company name + language switcher |
| `src/components/Hero.tsx` | MODIFY | i18n all strings |
| `src/components/About.tsx` | MODIFY | Singapore company story + i18n |
| `src/components/Footer.tsx` | MODIFY | SG address, UEN, i18n |
| `src/components/Services.tsx` | MODIFY | i18n service cards |
| `src/components/Numbers.tsx` | MODIFY | i18n stats |
| `src/app/page.tsx` | MODIFY | Add Consulting + GlobalPresence sections |
| `src/app/globals.css` | MODIFY | Add SG enterprise style tokens |

---

## Task 1: Create LanguageContext

**Files:** Create `src/contexts/LanguageContext.tsx`

- [ ] Create context with type `'zh' | 'en' | 'id' | 'ja'`
- [ ] Persist to localStorage key `mcs-lang`
- [ ] Export `useLanguage()` hook

```tsx
"use client";
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type Lang = 'zh' | 'en' | 'id' | 'ja';

const LanguageContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
}>({ lang: 'zh', setLang: () => {} });

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>('zh');

  useEffect(() => {
    const saved = localStorage.getItem('mcs-lang') as Lang;
    if (saved && ['zh','en','id','ja'].includes(saved)) setLangState(saved);
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem('mcs-lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
```

- [ ] Commit: `feat: add LanguageContext for 4-lang i18n`

---

## Task 2: Generate Translations via Gemini

**Files:** Create `scripts/generate-translations.mjs`, then output → `src/lib/translations.ts`

- [ ] Create script that reads ZH+EN strings and calls Gemini to produce ID+JA
- [ ] Run: `node scripts/generate-translations.mjs`
- [ ] Verify output has all 4 languages
- [ ] Save result to `src/lib/translations.ts`

The translations object structure:
```ts
export type Translations = {
  nav: { home: string; services: string; cases: string; products: string; blog: string; about: string; faq: string; contact: string; consulting: string; };
  hero: { badge: string; headline1: string; headline2: string; tagline: string; cta1: string; cta2: string; stat1v: string; stat1l: string; stat2v: string; stat2l: string; stat3v: string; stat3l: string; };
  services: { title: string; subtitle: string; };
  consulting: { title: string; subtitle: string; items: { icon: string; title: string; desc: string; }[]; };
  globalPresence: { title: string; subtitle: string; sgTitle: string; sgDesc: string; twTitle: string; twDesc: string; bridge: string; };
  about: { title: string; subtitle: string; desc: string; feat1t: string; feat1d: string; feat2t: string; feat2d: string; feat3t: string; feat3d: string; feat4t: string; feat4d: string; };
  numbers: { v1: string; l1: string; v2: string; l2: string; v3: string; l3: string; v4: string; l4: string; };
  contact: { title: string; subtitle: string; company: string; person: string; service: string; message: string; submit: string; };
  footer: { quickLinks: string; products: string; legal: string; uen: string; sgAddress: string; twAddress: string; allRights: string; };
};

export const t: Record<'zh'|'en'|'id'|'ja', Translations> = { zh: {...}, en: {...}, id: {...}, ja: {...} };
```

Script content:
```mjs
import { GoogleGenerativeAI } from "@google/generative-ai";
import { writeFileSync } from "fs";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

const zh = {
  nav: { home:"首頁", services:"服務方案", cases:"客戶實績", products:"產品", blog:"部落格", about:"關於我們", faq:"常見問題", contact:"聯絡我們", consulting:"顧問服務" },
  hero: { badge:"新加坡 ACRA 認證企業", headline1:"AI 智慧設備", headline2:"商業系統整合", tagline:"Meta Clearing Station Pte. Ltd. 以新加坡為基地，整合台灣頂尖軟硬體技術，為亞太企業提供 GraBox AI 智取櫃、冷凍微波販賣機、自助服務設備到 POS/KDS 雲端系統的一站式數位化解決方案。", cta1:"探索解決方案", cta2:"聯絡顧問", stat1v:"SG", stat1l:"新加坡總部", stat2v:"6+", stat2l:"核心方案", stat3v:"AI", stat3l:"智慧驅動" },
  services: { title:"服務方案", subtitle:"從硬體設備到雲端軟體，全方位覆蓋您的數位化需求" },
  consulting: { title:"顧問服務", subtitle:"由新加坡專業團隊提供亞太市場進入策略與數位轉型諮詢", items:[
    { icon:"🎯", title:"市場進入策略", desc:"協助台灣企業切入新加坡、東南亞市場，提供法規、通路、夥伴資源全套規劃。" },
    { icon:"🔧", title:"系統整合諮詢", desc:"從 POS、KDS 到 ERP，提供客製化軟硬體整合架構設計與導入支援。" },
    { icon:"📊", title:"數位轉型規劃", desc:"評估現有流程，設計 AI 驅動的自動化方案，提升運營效率與客戶體驗。" },
    { icon:"🌐", title:"跨國合規輔導", desc:"新加坡 ACRA、PDPA 法規遵循，協助企業建立符合國際標準的數據治理架構。" },
  ]},
  globalPresence: { title:"雙核心佈局", subtitle:"新加坡總部 × 台灣研發——以亞太為舞台，輸出世界級技術", sgTitle:"新加坡總部", sgDesc:"Meta Clearing Station Pte. Ltd.\nUEN: 202316403G\n138 Cecil Street, #13-02\nCecil Court, Singapore 069538\n\nASEAN 市場進入窗口\n國際合規與金融整合", twTitle:"台灣研發中心", twDesc:"銓幻元科技股份有限公司\n103 台北市大同區長安西路78巷4弄10號1樓\n\n硬體研發製造 100% 台灣\n軟體工程與 AI 模組開發", bridge:"技術 × 市場 × 合規" },
  about: { title:"關於 MCS", subtitle:"新加坡立案 × 台灣技術", desc:"Meta Clearing Station Pte. Ltd. 於 2023 年在新加坡 ACRA 正式立案（UEN: 202316403G），以新加坡為國際營運總部，深度整合台灣頂尖軟硬體製造能力，為亞太企業提供從設備到雲端的完整數位化解決方案。", feat1t:"新加坡立案", feat1d:"ACRA 認證，合規國際營運", feat2t:"台灣研發製造", feat2d:"100% 台灣硬體，品質保證", feat3t:"AI 驅動", feat3d:"自主 AI 模組，持續進化", feat4t:"一站整合", feat4d:"硬體＋軟體＋雲端全包" },
  numbers: { v1:"2023", l1:"新加坡立案", v2:"6+", l2:"核心服務項目", v3:"100%", l3:"台灣自主研發", v4:"3", l4:"服務市場（TW/JP/SG）" },
  contact: { title:"聯絡我們", subtitle:"告訴我們您的需求，我們的顧問團隊將在 24 小時內回應", company:"公司名稱", person:"聯絡人", service:"感興趣的服務", message:"需求說明", submit:"送出詢問" },
  footer: { quickLinks:"快速導覽", products:"產品與服務", legal:"法律資訊", uen:"UEN: 202316403G", sgAddress:"138 Cecil Street, #13-02, Cecil Court, Singapore 069538", twAddress:"103 台北市大同區長安西路78巷4弄10號1樓", allRights:"All rights reserved." },
};

const en = {
  nav: { home:"Home", services:"Services", cases:"Cases", products:"Products", blog:"Blog", about:"About", faq:"FAQ", contact:"Contact", consulting:"Consulting" },
  hero: { badge:"ACRA Registered Singapore Company", headline1:"AI Smart Equipment", headline2:"Business System Integration", tagline:"Meta Clearing Station Pte. Ltd., headquartered in Singapore, integrates Taiwan's finest hardware and software technology to deliver end-to-end digital solutions — from GraBox AI smart cabinets and frozen microwave vending machines to POS/KDS cloud systems — for enterprises across Asia-Pacific.", cta1:"Explore Solutions", cta2:"Talk to a Consultant", stat1v:"SG", stat1l:"Singapore HQ", stat2v:"6+", stat2l:"Core Solutions", stat3v:"AI", stat3l:"AI-Driven" },
  services: { title:"Our Services", subtitle:"Full-stack digital solutions from hardware to cloud software" },
  consulting: { title:"Consulting Services", subtitle:"Asia-Pacific market entry strategy and digital transformation advisory from our Singapore team", items:[
    { icon:"🎯", title:"Market Entry Strategy", desc:"Help Taiwan companies enter Singapore and Southeast Asian markets with full-suite planning covering regulations, channels, and partner networks." },
    { icon:"🔧", title:"System Integration Advisory", desc:"Custom hardware-software integration architecture design and deployment support across POS, KDS, ERP, and beyond." },
    { icon:"📊", title:"Digital Transformation Planning", desc:"Evaluate existing workflows and design AI-driven automation solutions to boost operational efficiency and customer experience." },
    { icon:"🌐", title:"Cross-Border Compliance", desc:"Singapore ACRA and PDPA compliance guidance, helping businesses build internationally-standard data governance frameworks." },
  ]},
  globalPresence: { title:"Dual-Core Architecture", subtitle:"Singapore HQ × Taiwan R&D — Delivering world-class technology across Asia-Pacific", sgTitle:"Singapore Headquarters", sgDesc:"Meta Clearing Station Pte. Ltd.\nUEN: 202316403G\n138 Cecil Street, #13-02\nCecil Court, Singapore 069538\n\nASEAN Market Gateway\nInternational Compliance & Finance Hub", twTitle:"Taiwan R&D Center", twDesc:"Transtep Technology Co., Ltd.\n103 Taipei City, Datong Dist.\nChangan W. Rd., Ln. 78, Aly. 4, No. 10, 1F\n\n100% Taiwan Hardware Manufacturing\nSoftware Engineering & AI Module Development", bridge:"Technology × Market × Compliance" },
  about: { title:"About MCS", subtitle:"Singapore Incorporated × Taiwan Technology", desc:"Meta Clearing Station Pte. Ltd. was incorporated in Singapore under ACRA in 2023 (UEN: 202316403G). Operating from Singapore as the international HQ, we deeply integrate Taiwan's elite hardware manufacturing capabilities to deliver complete digital transformation solutions — from devices to cloud — for Asia-Pacific enterprises.", feat1t:"Singapore Incorporated", feat1d:"ACRA certified, compliant international operations", feat2t:"Taiwan R&D & Manufacturing", feat2d:"100% Taiwan hardware, quality assured", feat3t:"AI-Powered", feat3d:"Proprietary AI modules, continuously evolving", feat4t:"All-in-One Integration", feat4d:"Hardware + Software + Cloud, fully covered" },
  numbers: { v1:"2023", l1:"Singapore Incorporated", v2:"6+", l2:"Core Service Categories", v3:"100%", l3:"Taiwan-Developed Technology", v4:"3", l4:"Markets Served (TW/JP/SG)" },
  contact: { title:"Contact Us", subtitle:"Tell us your requirements. Our consulting team will respond within 24 hours.", company:"Company Name", person:"Contact Person", service:"Service of Interest", message:"Project Details", submit:"Send Inquiry" },
  footer: { quickLinks:"Quick Links", products:"Products & Services", legal:"Legal", uen:"UEN: 202316403G", sgAddress:"138 Cecil Street, #13-02, Cecil Court, Singapore 069538", twAddress:"No. 10, Aly. 4, Ln. 78, Changan W. Rd., Datong Dist., Taipei 103, Taiwan", allRights:"All rights reserved." },
};

async function translate(obj, targetLang) {
  const prompt = `You are a professional translator. Translate the following JSON object values from Chinese/English to ${targetLang}. Keep JSON keys unchanged. Keep proper nouns (MCS, GraBox, Meta Clearing Station, UEN, ACRA, PDPA, POS, KDS, ERP, AI, ASEAN) unchanged. For addresses and UEN numbers keep them exactly as-is. Return ONLY valid JSON with no markdown. Input:\n${JSON.stringify(obj, null, 2)}`;
  const result = await model.generateContent(prompt);
  const text = result.response.text().replace(/```json\n?|\n?```/g, "").trim();
  return JSON.parse(text);
}

async function main() {
  console.log("Generating Indonesian translations...");
  const id = await translate(en, "Bahasa Indonesia");
  console.log("Generating Japanese translations...");
  const ja = await translate(en, "Japanese (professional business Japanese, use keigo)");
  
  const output = `import type { Translations } from "./translation-types";

export const t: Record<'zh'|'en'|'id'|'ja', Translations> = {
  zh: ${JSON.stringify(zh, null, 2)},
  en: ${JSON.stringify(en, null, 2)},
  id: ${JSON.stringify(id, null, 2)},
  ja: ${JSON.stringify(ja, null, 2)},
} as const;
`;
  writeFileSync("src/lib/translations.ts", output, "utf8");
  console.log("Done! src/lib/translations.ts written.");
}
main().catch(console.error);
```

- [ ] Run script: `node scripts/generate-translations.mjs`
- [ ] Verify output file has all 4 languages with no empty strings
- [ ] Commit: `feat: add 4-language translations (ZH/EN/ID/JA)`

---

## Task 3: LanguageSwitcher Component

**Files:** Create `src/components/LanguageSwitcher.tsx`

- [ ] Build dropdown with flag emoji + language name
- [ ] Use `useLanguage()` hook
- [ ] Animate with Framer Motion

```tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage, type Lang } from "@/contexts/LanguageContext";

const LANGS: { code: Lang; flag: string; label: string; short: string }[] = [
  { code: "zh", flag: "🇹🇼", label: "繁體中文", short: "中文" },
  { code: "en", flag: "🇸🇬", label: "English", short: "EN" },
  { code: "id", flag: "🇮🇩", label: "Bahasa Indonesia", short: "ID" },
  { code: "ja", flag: "🇯🇵", label: "日本語", short: "JP" },
];

export default function LanguageSwitcher({ dark = false }: { dark?: boolean }) {
  const { lang, setLang } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const current = LANGS.find(l => l.code === lang)!;

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(o => !o)}
        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
          dark
            ? "bg-white/10 text-white hover:bg-white/20 border border-white/20"
            : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
        }`}
      >
        <span>{current.flag}</span>
        <span>{current.short}</span>
        <svg className={`w-3 h-3 transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="absolute right-0 top-full mt-2 w-44 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden z-50"
          >
            {LANGS.map(l => (
              <button
                key={l.code}
                onClick={() => { setLang(l.code); setOpen(false); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-orange-50 transition-colors text-left ${lang === l.code ? "bg-orange-50 text-orange-600 font-semibold" : "text-gray-700"}`}
              >
                <span className="text-lg">{l.flag}</span>
                <span>{l.label}</span>
                {lang === l.code && <span className="ml-auto text-orange-500">✓</span>}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] Commit: `feat: add LanguageSwitcher component`

---

## Task 4: Update layout.tsx — Add LanguageProvider

**Files:** Modify `src/app/layout.tsx`

- [ ] Import `LanguageProvider`
- [ ] Wrap the body content with `<LanguageProvider>`
- [ ] Keep all existing providers/scripts unchanged

```tsx
// Add import at top
import { LanguageProvider } from "@/contexts/LanguageContext";

// Wrap children in body:
<LanguageProvider>
  {children}
  <AiConsultant />
  <BackToTop />
</LanguageProvider>
```

- [ ] Commit: `feat: wrap app with LanguageProvider`

---

## Task 5: Update Header — SG Branding + Language Switcher

**Files:** Modify `src/components/Header.tsx`

- [ ] Import `useLanguage`, `LanguageSwitcher`, and `t` translations
- [ ] Add Singapore company subtitle under logo
- [ ] Add `LanguageSwitcher` to desktop nav (before contact button)
- [ ] Add `LanguageSwitcher` to mobile menu bottom
- [ ] Translate nav items using `t[lang].nav.*`
- [ ] Add `consulting` nav item linking to `#consulting`

Key changes:
```tsx
// Logo area — add SG company subtitle
<div>
  <span className="font-bold text-xl ...">MCS</span>
  <div className="text-[10px] text-gray-400 leading-tight hidden sm:block">
    META CLEARING STATION PTE. LTD.
  </div>
</div>

// Desktop nav — add before contact button
<LanguageSwitcher dark={!scrolled} />

// Nav items — use translations
const tr = t[lang];
const navItems = [
  { label: tr.nav.home, href: "/#hero" },
  { label: tr.nav.services, href: "/#services" },
  { label: tr.nav.consulting, href: "/#consulting" },
  { label: tr.nav.cases, href: "/cases" },
  { label: tr.nav.products, href: "#", children: [...] },
  { label: tr.nav.blog, href: "/blog" },
  { label: tr.nav.about, href: "/#about" },
  { label: tr.nav.faq, href: "/#faq" },
];
```

- [ ] Commit: `feat: update header with SG branding and language switcher`

---

## Task 6: Update Hero — i18n + Singapore Positioning

**Files:** Modify `src/components/Hero.tsx`

- [ ] Import `useLanguage` and `t`
- [ ] Add Singapore badge above headline (ACRA badge)
- [ ] Replace all hardcoded strings with `tr.hero.*`
- [ ] Update stats to SG/6+/AI

Key additions:
```tsx
const { lang } = useLanguage();
const tr = t[lang];

// Badge above headline
<motion.div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 mb-6 backdrop-blur-sm">
  <span className="text-base">🇸🇬</span>
  <span>{tr.hero.badge}</span>
</motion.div>

// Headline
<h1>
  <span className="text-mcs-orange">{tr.hero.headline1}</span>
  <span className="text-white/40"> × </span>
  <span className="text-white">{tr.hero.headline2}</span>
</h1>
```

- [ ] Commit: `feat: update hero with i18n and SG positioning`

---

## Task 7: Update About — Singapore Company Story

**Files:** Modify `src/components/About.tsx`

- [ ] Import `useLanguage` and `t`
- [ ] Replace all strings with `tr.about.*`
- [ ] Add "Singapore Incorporated" as visual trust badge
- [ ] Update the 4 feature cards with SG-aware content

- [ ] Commit: `feat: update about section with SG company story`

---

## Task 8: Update Footer — SG Address + UEN + i18n

**Files:** Modify `src/components/Footer.tsx`

- [ ] Import `useLanguage` and `t`
- [ ] Add Singapore address block as PRIMARY company info
- [ ] Keep Taiwan R&D address as secondary
- [ ] Display UEN: 202316403G
- [ ] Add ACRA registered badge
- [ ] Translate quick links + column headers

New footer company block:
```tsx
<div>
  <div className="text-white font-bold text-lg mb-3">META CLEARING STATION PTE. LTD.</div>
  <div className="text-xs text-mcs-orange mb-3 font-mono">UEN: 202316403G · Est. 2023</div>
  <address className="text-sm leading-relaxed not-italic space-y-1">
    <p className="flex items-start gap-1.5">
      <span>🇸🇬</span>
      <span>138 Cecil Street, #13-02, Cecil Court, Singapore 069538</span>
    </p>
    <p className="flex items-start gap-1.5 text-gray-500">
      <span>🇹🇼</span>
      <span>103 台北市大同區長安西路78巷4弄10號1樓</span>
    </p>
    <p className="mt-2">
      <a href="mailto:service@transtep.com" className="hover:text-mcs-orange transition-colors">
        service@transtep.com
      </a>
    </p>
  </address>
</div>
```

- [ ] Commit: `feat: update footer with SG address and UEN`

---

## Task 9: Create Consulting Section

**Files:** Create `src/components/Consulting.tsx`

- [ ] 4 consulting service cards in bento grid
- [ ] Import `useLanguage` and `t`
- [ ] Use Framer Motion scroll reveal + hover glow
- [ ] Dark background section to visually break from services

```tsx
"use client";
import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export default function Consulting() {
  const { lang } = useLanguage();
  const tr = t[lang].consulting;

  return (
    <section id="consulting" className="py-24 bg-mcs-blue-dark relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-mcs-orange/5 rounded-full blur-3xl pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 bg-mcs-orange/10 border border-mcs-orange/20 rounded-full px-4 py-1.5 text-sm text-mcs-orange mb-4">
              <span>💼</span> Singapore Advisory Team
            </div>
            <h2 className="text-4xl font-bold text-white mb-4">{tr.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">{tr.subtitle}</p>
          </div>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {tr.items.map((item, i) => (
            <motion.div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-mcs-orange/30 hover:bg-white/8 transition-all duration-300 cursor-default"
              whileHover={{ y: -4 }}
            >
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mcs-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="relative z-10">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-12 text-center">
            <a href="#contact" className="btn-shine bg-mcs-orange text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-all shadow-lg shadow-mcs-orange/25 inline-block">
              {lang === 'zh' ? '預約顧問諮詢' : lang === 'ja' ? 'コンサルタントに相談' : lang === 'id' ? 'Konsultasi Gratis' : 'Book a Consultation'}
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
```

- [ ] Commit: `feat: add Consulting section component`

---

## Task 10: Create GlobalPresence Section

**Files:** Create `src/components/GlobalPresence.tsx`

- [ ] Visual dual-HQ layout: SG card | bridge | TW card
- [ ] Singapore Lion City themed left card (navy + orange)
- [ ] Taiwan tech themed right card
- [ ] Connecting "bridge" animation in center
- [ ] Import `useLanguage` and `t`

```tsx
"use client";
import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

export default function GlobalPresence() {
  const { lang } = useLanguage();
  const tr = t[lang].globalPresence;

  return (
    <section id="global" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-50 via-white to-white" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-mcs-blue-dark mb-4">{tr.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto">{tr.subtitle}</p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto_1fr] gap-6 items-center">
          {/* Singapore HQ */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-mcs-blue-dark rounded-3xl p-8 text-white relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-48 h-48 bg-mcs-orange/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="text-4xl mb-4">🇸🇬</div>
            <h3 className="text-2xl font-bold mb-4">{tr.sgTitle}</h3>
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{tr.sgDesc}</div>
            <div className="mt-6 inline-flex items-center gap-2 bg-mcs-orange/20 border border-mcs-orange/30 rounded-full px-3 py-1 text-xs text-mcs-orange font-mono">
              UEN: 202316403G
            </div>
          </motion.div>

          {/* Bridge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-2 px-4"
          >
            <div className="hidden lg:flex flex-col items-center gap-2">
              <div className="w-px h-16 bg-gradient-to-b from-mcs-blue-dark to-mcs-orange" />
              <div className="bg-gradient-to-br from-mcs-orange to-mcs-orange-light text-white rounded-full w-14 h-14 flex items-center justify-center text-xl font-bold shadow-lg shadow-mcs-orange/30">
                ×
              </div>
              <div className="w-px h-16 bg-gradient-to-b from-mcs-orange to-mcs-blue" />
              <div className="text-xs text-gray-400 text-center font-medium max-w-[80px]">{tr.bridge}</div>
            </div>
          </motion.div>

          {/* Taiwan R&D */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-mcs-blue to-mcs-blue-dark rounded-3xl p-8 text-white relative overflow-hidden border border-mcs-orange/20"
          >
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-mcs-purple/10 rounded-full translate-y-1/2 -translate-x-1/2" />
            <div className="text-4xl mb-4">🇹🇼</div>
            <h3 className="text-2xl font-bold mb-4">{tr.twTitle}</h3>
            <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-line">{tr.twDesc}</div>
            <div className="mt-6 inline-flex items-center gap-2 bg-white/10 rounded-full px-3 py-1 text-xs text-white/70">
              100% Taiwan-Made Hardware
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] Commit: `feat: add GlobalPresence dual-HQ section`

---

## Task 11: Update Services + Numbers i18n

**Files:** Modify `src/components/Services.tsx`, `src/components/Numbers.tsx`

- [ ] Import `useLanguage` and `t` in both
- [ ] Replace section titles/subtitles with `tr.services.*`
- [ ] Replace numbers stats with `tr.numbers.*`

- [ ] Commit: `feat: i18n services and numbers sections`

---

## Task 12: Update page.tsx — Add New Sections

**Files:** Modify `src/app/page.tsx`

- [ ] Import `Consulting` and `GlobalPresence`
- [ ] Add `<GlobalPresence />` after `<Services />`
- [ ] Add `<Consulting />` after `<GlobalPresence />`

Page order:
```
Hero → Services → GlobalPresence → Consulting → Clients → Numbers → About → FAQ → Contact
```

- [ ] Commit: `feat: add GlobalPresence and Consulting to home page`

---

## Task 13: CSS Style Additions

**Files:** Modify `src/app/globals.css`

- [ ] Add `--mcs-sg-teal: #0A9396` (Singapore accent)
- [ ] Add `.sg-badge` glass card style for ACRA badges
- [ ] Add `@theme inline` entry for new token

```css
:root {
  /* ... existing ... */
  --mcs-sg-teal: #0A9396;
}

@theme inline {
  /* ... existing ... */
  --color-mcs-sg-teal: var(--mcs-sg-teal);
}

.sg-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.375rem;
  background: rgba(10, 147, 150, 0.1);
  border: 1px solid rgba(10, 147, 150, 0.25);
  border-radius: 9999px;
  padding: 0.25rem 0.75rem;
  font-size: 0.75rem;
  color: #0A9396;
  font-weight: 500;
}
```

- [ ] Commit: `style: add Singapore brand tokens`

---

## Task 14: Final Verification + Commit

- [ ] Run `npm run build` — verify 0 errors
- [ ] Check all 4 language switches work in browser
- [ ] Verify SG company info in footer/header
- [ ] Verify Consulting + GlobalPresence sections render
- [ ] Final commit: `feat: Singapore rebrand + 4-language i18n complete`
