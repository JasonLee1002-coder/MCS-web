"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// ── helpers ──────────────────────────────────────────────────────────────────
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } },
};
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp} initial="hidden" whileInView="show"
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >{children}</motion.div>
  );
}

// ── language ─────────────────────────────────────────────────────────────────
type Lang = "zh" | "en" | "ja";
const LANGS: { code: Lang; label: string }[] = [
  { code: "zh", label: "中文" },
  { code: "en", label: "EN" },
  { code: "ja", label: "日本語" },
];

// ── copy ─────────────────────────────────────────────────────────────────────
const T = {
  zh: {
    nav: { brand: "MCS 銓幻元", tagline: "AI 自助零售方案" },
    stagingBanner: "⚠️ 預覽版 — 正式上線前請勿對外分享",
    hero: {
      eyebrow: "AI × IoT × 自助零售",
      h1a: "讓您的場域",
      h1b: "24 小時自動賺錢",
      sub: "設備我們裝・AI 我們管・收益一起分\n旅館 / 診所 / 宿舍 / 商辦 — 一週完成上線",
      cta1: "了解合作模式",
      cta2: "查看場域案例",
    },
    guarantees: {
      eyebrow: "為什麼選擇我們",
      title: "三個承諾，讓您放心交出場域",
      items: [
        { emoji: "😤", color: "#ff6b6b", title: "不麻煩", desc: "安裝布建全包，設備壞掉我們修。您只需要提供場地。" },
        { emoji: "💸", color: "#F5A623", title: "不虧錢", desc: "零前期費用模式可選。收益按比例分潤，我們的利益與您一致。" },
        { emoji: "🛡️", color: "#00C6AD", title: "不出包", desc: "AI 即時監控所有機台，異常 5 分鐘內 LINE 通知，遠端重啟不用等工程師。" },
      ],
    },
    howItWorks: {
      eyebrow: "核心能力",
      title: "設備 × AI × 營運，三位一體",
      sub: "一般 IoT 廠商做設備不做營運；通路商做補貨不造設備；AI 系統商沒有機電能力。三者在同一家公司，才是真正的護城河。",
      pillars: [
        {
          icon: "🔧", color: "#22c55e", title: "硬體自主製造",
          points: ["GraBox 雙面智取櫃（台灣自研）", "智慧茶飲機 / 自助販賣機", "OEM / ODM 客製貼牌"],
        },
        {
          icon: "🤖", color: "#00C6AD", title: "AI 管理平台",
          points: ["庫存低於閾值自動提醒補貨", "銷售趨勢分析 + 需求預測", "設備異常 5 分鐘 LINE 告警"],
        },
        {
          icon: "🏪", color: "#F5A623", title: "場域營運整合",
          points: ["安裝 → 補貨 → 維修全包", "場域方完全免管理日常操作", "月報自動生成，手機即查"],
        },
      ],
    },
    venues: {
      eyebrow: "適合場域",
      title: "哪些場域最適合導入？",
      items: [
        { emoji: "🏨", title: "旅館 / 民宿", tag: "藍海首選", desc: "50房以下無法引進超商，GraBox 無最低保證金門檻，1 天安裝即上線。" },
        { emoji: "🏥", title: "診所 / 候診區", tag: "決策最快", desc: "候診時間長、消費意願強，院長一人拍板，3 天內完成部署。" },
        { emoji: "🏭", title: "移工宿舍 / 廠區", tag: "高頻消費", desc: "24H 穩定消費，悠遊卡支付移工友善，透過仲介公司批量落地。" },
        { emoji: "🏢", title: "商辦 / 企業大樓", tag: "午餐峰值", desc: "午餐高峰取代外送，福委採購月票批量方案，坪效最大化。" },
        { emoji: "🎓", title: "大學宿舍", tag: "夜間高黏著", desc: "宵夜高需求，冷凍拉麵碗 + 蒸煮機，深夜 24H 無人運作。" },
        { emoji: "🏘️", title: "社區大樓", tag: "鄰里日常", desc: "物管室旁 24H，居民下班取飲料・宵夜，全年齡友善操作。" },
      ],
    },
    revenue: {
      eyebrow: "商業模式",
      title: "可預期的月經常性收入（MRR）",
      sub: "三種收入流疊加，讓場域方與我們共同成長",
      streams: [
        { icon: "📦", title: "設備租賃費", desc: "每台設備月費制，穩定基礎收入", badge: "月費制" },
        { icon: "🛒", title: "補貨 / 商品分潤", desc: "按實際銷售 GMV 比例分潤", badge: "GMV %" },
        { icon: "☁️", title: "平台管理月費", desc: "OmniCore SaaS 月訂閱費用", badge: "SaaS" },
      ],
      note: "具體分潤比例依場域規模與合作條款洽談",
    },
    trust: {
      eyebrow: "為什麼信任我們",
      title: "背後有上市公司，您的合作不怕跑路",
      items: [
        { icon: "🏢", title: "上市公司旗下子公司", desc: "有母公司背書，財務透明，銀行往來信用有保障" },
        { icon: "🤝", title: "上市公司 SI 合作夥伴", desc: "三家上市公司共同推廣、安裝、維護 MCS 設備（2468.TW / 4523.TW / 6214.TW）" },
        { icon: "🇯🇵", title: "日本首都高速 MOU 已簽", desc: "日本市場導入，PSE 認證進行中，國際商業信用背書" },
        { icon: "🏆", title: "麥味登 90 天整合實績", desc: "90 天完整整合（含硬體），打贏日本知名大廠競標" },
      ],
    },
    cta: {
      title: "準備好了嗎？",
      sub: "一週內完成場域評估，三週上線，開始分潤",
      btn: "立即洽談合作",
      contact: "或直接聯繫：",
    },
  },
  en: {
    nav: { brand: "MCS", tagline: "AI Self-Service Retail" },
    stagingBanner: "⚠️ Staging Preview — Do not share publicly",
    hero: {
      eyebrow: "AI × IoT × Self-Service Retail",
      h1a: "Turn Your Venue Into",
      h1b: "24/7 Automated Revenue",
      sub: "We Install · We Manage · We Share Profits\nHotels / Clinics / Dorms / Offices — Live in 1 Week",
      cta1: "See Partnership Model",
      cta2: "Browse Venue Cases",
    },
    guarantees: {
      eyebrow: "Why Choose Us",
      title: "Three Promises That Let You Hand Over Your Space",
      items: [
        { emoji: "😤", color: "#ff6b6b", title: "Zero Hassle", desc: "Full installation included. We fix it when it breaks. You just provide the space." },
        { emoji: "💸", color: "#F5A623", title: "Zero Risk", desc: "Zero upfront option available. Revenue is split proportionally — our interests align with yours." },
        { emoji: "🛡️", color: "#00C6AD", title: "Zero Surprises", desc: "AI monitors all units 24/7. Anomalies trigger LINE alerts within 5 minutes — remote restart, no engineer needed." },
      ],
    },
    howItWorks: {
      eyebrow: "Core Capabilities",
      title: "Hardware × AI × Operations — One Company",
      sub: "IoT vendors make devices but don't run operations. Distributors restock but don't manufacture. AI firms lack mechanical capabilities. Combining all three in-house is the real moat.",
      pillars: [
        {
          icon: "🔧", color: "#22c55e", title: "In-House Hardware",
          points: ["GraBox Dual-Access Locker (Taiwan-made)", "Smart Tea Machine / Smart Vending", "OEM / ODM Custom Branding"],
        },
        {
          icon: "🤖", color: "#00C6AD", title: "AI Management Platform",
          points: ["Auto restock alerts when below threshold", "Sales trend analysis + demand forecasting", "Device anomaly LINE alert within 5 min"],
        },
        {
          icon: "🏪", color: "#F5A623", title: "Full Operations Package",
          points: ["Install → restock → repair all covered", "Venue owner needs zero daily management", "Monthly reports auto-generated, view on phone"],
        },
      ],
    },
    venues: {
      eyebrow: "Target Venues",
      title: "Which Venues Are the Best Fit?",
      items: [
        { emoji: "🏨", title: "Hotels / B&Bs", tag: "Blue Ocean", desc: "Under 50 rooms can't get a convenience store. GraBox has no MG requirement — installs in 1 day." },
        { emoji: "🏥", title: "Clinics / Waiting Areas", tag: "Fastest Decision", desc: "Long wait times, high purchase intent. Doctor decides alone — deployment in 3 days." },
        { emoji: "🏭", title: "Migrant Dorms / Factories", tag: "High-Frequency", desc: "24H stable consumption, EasyCard migrant-friendly payment, batch placement via agencies." },
        { emoji: "🏢", title: "Office Buildings", tag: "Lunch Peak", desc: "Replace delivery at lunch peak, corporate welfare bulk monthly plans, maximize floor efficiency." },
        { emoji: "🎓", title: "University Dorms", tag: "Night Sticky", desc: "High late-night demand, frozen ramen + steam cooker, 24H unmanned." },
        { emoji: "🏘️", title: "Residential Lobbies", tag: "Daily Habit", desc: "Next to management desk, residents grab drinks after work, all-age friendly operation." },
      ],
    },
    revenue: {
      eyebrow: "Business Model",
      title: "Predictable Monthly Recurring Revenue (MRR)",
      sub: "Three stacked revenue streams, growing together with venue partners",
      streams: [
        { icon: "📦", title: "Equipment Lease Fee", desc: "Monthly fee per unit — stable baseline revenue", badge: "Monthly Fee" },
        { icon: "🛒", title: "Product Revenue Share", desc: "Proportional split based on actual GMV", badge: "GMV %" },
        { icon: "☁️", title: "Platform Monthly Fee", desc: "OmniCore SaaS monthly subscription", badge: "SaaS" },
      ],
      note: "Specific revenue split ratios depend on venue scale and partnership terms",
    },
    trust: {
      eyebrow: "Why Trust Us",
      title: "Listed Company Backing — We're Not Going Anywhere",
      items: [
        { icon: "🏢", title: "Listed Company Subsidiary", desc: "Parent company backing, transparent financials, strong banking relationships" },
        { icon: "🤝", title: "Listed Company SI Partners", desc: "Three public companies co-promote, install, and maintain MCS equipment (2468.TW / 4523.TW / 6214.TW)" },
        { icon: "🇯🇵", title: "Japan Shuto Expressway MOU Signed", desc: "Japan market entry, PSE certification in progress, international commercial credibility" },
        { icon: "🏆", title: "MWD 90-Day Integration", desc: "Full 90-day integration (incl. hardware), beat a major Japanese competitor in bidding" },
      ],
    },
    cta: {
      title: "Ready to Get Started?",
      sub: "Venue assessment within 1 week, live in 3 weeks, revenue sharing begins",
      btn: "Contact Us Now",
      contact: "Or reach us directly:",
    },
  },
  ja: {
    nav: { brand: "MCS 銓幻元", tagline: "AI セルフサービス小売" },
    stagingBanner: "⚠️ ステージングプレビュー — 公開前につき共有禁止",
    hero: {
      eyebrow: "AI × IoT × セルフサービス小売",
      h1a: "あなたの施設を",
      h1b: "24時間自動収益化",
      sub: "設置は当社・管理は当社・収益は折半\nホテル / 診療所 / 寮 / オフィス — 1週間で稼働",
      cta1: "提携モデルを見る",
      cta2: "施設事例を見る",
    },
    guarantees: {
      eyebrow: "選ばれる理由",
      title: "安心して施設を任せられる3つの約束",
      items: [
        { emoji: "😤", color: "#ff6b6b", title: "手間なし", desc: "設置・布線はすべてお任せ。故障しても当社が修理。スペースを提供するだけでOK。" },
        { emoji: "💸", color: "#F5A623", title: "損なし", desc: "初期費用ゼロモデルも選択可能。収益は比例配分で、利害関係が一致します。" },
        { emoji: "🛡️", color: "#00C6AD", title: "トラブルなし", desc: "AIが全機器を24時間監視。異常は5分以内にLINE通知、遠隔再起動でエンジニア不要。" },
      ],
    },
    howItWorks: {
      eyebrow: "コア能力",
      title: "ハードウェア × AI × 運営、一社完結",
      sub: "IoTベンダーはデバイスを作るが運営はしない。流通業者は補充するが製造しない。AIシステム会社には機械電気の能力がない。3つを一社に統合することが真の競争優位です。",
      pillars: [
        {
          icon: "🔧", color: "#22c55e", title: "自社製造ハードウェア",
          points: ["GraBoxデュアルアクセスロッカー（台湾製）", "スマートティーマシン / スマート自販機", "OEM / ODMカスタムブランディング"],
        },
        {
          icon: "🤖", color: "#00C6AD", title: "AI管理プラットフォーム",
          points: ["閾値以下で自動補充アラート", "売上トレンド分析＋需要予測", "機器異常を5分以内にLINE通報"],
        },
        {
          icon: "🏪", color: "#F5A623", title: "フル運営パッケージ",
          points: ["設置→補充→修理すべて込み", "施設オーナーは日常管理ゼロ", "月次レポート自動生成、スマホで確認"],
        },
      ],
    },
    venues: {
      eyebrow: "対象施設",
      title: "どんな施設に最適？",
      items: [
        { emoji: "🏨", title: "ホテル / B&B", tag: "ブルーオーシャン", desc: "50室以下はコンビニ入居不可。GraBoxは最低保証金なし — 1日で設置完了。" },
        { emoji: "🏥", title: "診療所 / 待合室", tag: "最速意思決定", desc: "待ち時間が長く購買意欲が高い。院長一人の決裁で3日以内に導入可能。" },
        { emoji: "🏭", title: "外国人労働者寮 / 工場", tag: "高頻度消費", desc: "24時間安定消費、悠遊カードで外国人労働者にも優しく、仲介会社経由で一括展開。" },
        { emoji: "🏢", title: "オフィスビル", tag: "ランチピーク", desc: "昼食時のデリバリー代替、法人向け月額一括プラン、フロア効率最大化。" },
        { emoji: "🎓", title: "大学寮", tag: "夜間定着率高", desc: "夜食需要が高く、冷凍ラーメン＋スチームクッカーで24時間無人稼働。" },
        { emoji: "🏘️", title: "マンションロビー", tag: "生活習慣", desc: "管理室横に24H設置、帰宅後の飲み物・夜食に、全年齢対応操作。" },
      ],
    },
    revenue: {
      eyebrow: "ビジネスモデル",
      title: "予測可能な月次経常収益（MRR）",
      sub: "3つの収入源が積み重なり、施設パートナーと共に成長",
      streams: [
        { icon: "📦", title: "機器リース料", desc: "台数単位の月額制、安定した基本収益", badge: "月額制" },
        { icon: "🛒", title: "商品収益シェア", desc: "実際のGMVに基づく比例配分", badge: "GMV %" },
        { icon: "☁️", title: "プラットフォーム月額費", desc: "OmniCore SaaS月次サブスクリプション", badge: "SaaS" },
      ],
      note: "具体的な収益配分比率は施設規模と提携条件により協議",
    },
    trust: {
      eyebrow: "信頼できる理由",
      title: "上場会社が後ろ盾 — 長期安心パートナー",
      items: [
        { icon: "🏢", title: "上場会社の子会社", desc: "親会社の保証、透明な財務、銀行との信用関係" },
        { icon: "🤝", title: "上場企業SIパートナー", desc: "3社の上場企業がMCS機器を共同販促・設置・保守（2468.TW / 4523.TW / 6214.TW）" },
        { icon: "🇯🇵", title: "首都高速道路MOU締結済", desc: "日本市場参入、PSE認証進行中、国際商業信用の証明" },
        { icon: "🏆", title: "MWD 90日統合実績", desc: "ハード含む90日完全統合、日本大手競合に入札で勝利" },
      ],
    },
    cta: {
      title: "始める準備はできていますか？",
      sub: "1週間以内に施設評価、3週間で稼働、収益配分開始",
      btn: "今すぐ相談する",
      contact: "直接ご連絡：",
    },
  },
};

// ── main component ────────────────────────────────────────────────────────────
export default function IntroV2Page() {
  const [lang, setLang] = useState<Lang>("zh");
  const t = T[lang];

  return (
    <div className="min-h-screen bg-[#0A1628] text-white font-sans">

      {/* ── Staging Banner ─────────────────────────── */}
      <div className="bg-yellow-500 text-black text-center text-sm font-bold py-2 px-4">
        {t.stagingBanner}
      </div>

      {/* ── Nav ────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 bg-[#0A1628]/90 backdrop-blur-md border-b border-white/10">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#00C6AD] flex items-center justify-center font-black text-[#0A1628] text-sm">M</div>
            <div>
              <div className="font-black text-white text-sm">{t.nav.brand}</div>
              <div className="text-white/40 text-[10px]">{t.nav.tagline}</div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {LANGS.map(({ code, label }) => (
              <button
                key={code}
                onClick={() => setLang(code)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  lang === code ? "bg-[#00C6AD] text-[#0A1628]" : "text-white/50 hover:text-white hover:bg-white/10"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* ── ① HERO ─────────────────────────────────── */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient orbs */}
        <motion.div
          className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(0,198,173,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(245,166,35,0.08) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />

        <div className="max-w-6xl mx-auto px-6 py-24 relative z-10">
          <div className="max-w-3xl">
            <FadeIn>
              <div className="inline-flex items-center gap-2 bg-[#00C6AD]/15 border border-[#00C6AD]/30 rounded-full px-4 py-1.5 mb-8">
                <div className="w-1.5 h-1.5 rounded-full bg-[#00C6AD] animate-pulse" />
                <span className="text-[#00C6AD] text-sm font-bold tracking-wide">{t.hero.eyebrow}</span>
              </div>
            </FadeIn>

            <FadeIn delay={0.08}>
              <h1 className="text-5xl md:text-7xl font-black leading-tight mb-6">
                <span className="text-white">{t.hero.h1a}</span>
                <br />
                <span className="text-[#00C6AD]">{t.hero.h1b}</span>
              </h1>
            </FadeIn>

            <FadeIn delay={0.16}>
              <p className="text-white/60 text-xl leading-relaxed mb-10 whitespace-pre-line">{t.hero.sub}</p>
            </FadeIn>

            <FadeIn delay={0.24}>
              <div className="flex flex-wrap gap-4">
                <motion.a
                  href="#revenue"
                  className="bg-[#00C6AD] text-[#0A1628] font-black px-8 py-4 rounded-xl text-base shadow-lg shadow-[#00C6AD]/25 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {t.hero.cta1}
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </motion.a>
                <motion.a
                  href="#venues"
                  className="border border-white/20 text-white font-bold px-8 py-4 rounded-xl text-base hover:bg-white/5 inline-flex items-center gap-2"
                  whileHover={{ scale: 1.04, y: -2 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  {t.hero.cta2}
                </motion.a>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── ② 三大保證 ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0f1923]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#00C6AD] font-black text-sm uppercase tracking-widest mb-3">{t.guarantees.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16">{t.guarantees.title}</h2>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {t.guarantees.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="bg-[#0A1628] rounded-2xl p-8 border border-white/10 h-full"
                  whileHover={{ y: -6, borderColor: item.color + "66" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-5xl mb-5">{item.emoji}</div>
                  <h3 className="text-2xl font-black mb-3" style={{ color: item.color }}>{item.title}</h3>
                  <p className="text-white/60 leading-relaxed">{item.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ③ How It Works ─────────────────────────── */}
      <section className="py-20 px-6 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#F5A623] font-black text-sm uppercase tracking-widest mb-3">{t.howItWorks.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.howItWorks.title}</h2>
            <p className="text-white/50 max-w-2xl mb-16 leading-relaxed">{t.howItWorks.sub}</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {t.howItWorks.pillars.map((pillar, i) => (
              <FadeIn key={i} delay={i * 0.12}>
                <motion.div
                  className="rounded-2xl overflow-hidden border border-white/10 h-full"
                  whileHover={{ y: -4 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="px-6 py-5 font-black flex items-center gap-3" style={{ background: pillar.color + "22", borderBottom: `1px solid ${pillar.color}44` }}>
                    <span className="text-2xl">{pillar.icon}</span>
                    <span style={{ color: pillar.color }}>{pillar.title}</span>
                  </div>
                  <div className="p-6 bg-[#0f1923] space-y-3">
                    {pillar.points.map((pt, j) => (
                      <div key={j} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0" style={{ background: pillar.color }} />
                        <span className="text-white/75 text-sm leading-relaxed">{pt}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <div className="mt-8 text-center text-white/30 text-sm">
              {lang === "zh" ? "↑ 護城河在於三者同一家公司，競爭對手無法快速複製" : lang === "en" ? "↑ The moat: all three capabilities in-house — impossible to replicate quickly" : "↑ 競争優位：3つの能力を一社に統合 — 他社には簡単に真似できない"}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── ④ 場域案例 ─────────────────────────────── */}
      <section id="venues" className="py-20 px-6 bg-[#0f1923]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#00C6AD] font-black text-sm uppercase tracking-widest mb-3">{t.venues.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16">{t.venues.title}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.venues.items.map((v, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <motion.div
                  className="bg-[#0A1628] rounded-2xl p-6 border border-white/10 h-full"
                  whileHover={{ y: -4, borderColor: "#00C6AD44" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="flex items-start justify-between mb-4">
                    <span className="text-4xl">{v.emoji}</span>
                    <span className="bg-[#00C6AD]/15 text-[#00C6AD] text-[10px] font-bold px-2.5 py-1 rounded-full">{v.tag}</span>
                  </div>
                  <h3 className="font-black text-white text-lg mb-2">{v.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{v.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ⑤ MRR 收益模式 ─────────────────────────── */}
      <section id="revenue" className="py-20 px-6 bg-[#0A1628]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#38bdf8] font-black text-sm uppercase tracking-widest mb-3">{t.revenue.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.revenue.title}</h2>
            <p className="text-white/50 mb-16">{t.revenue.sub}</p>
          </FadeIn>
          <div className="grid md:grid-cols-3 gap-6">
            {t.revenue.streams.map((s, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="bg-[#0f1923] rounded-2xl p-8 border border-[#38bdf8]/20 text-center"
                  whileHover={{ y: -4, borderColor: "#38bdf866" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-4xl mb-4">{s.icon}</div>
                  <div className="inline-block bg-[#38bdf8]/15 text-[#38bdf8] text-xs font-black px-3 py-1 rounded-full mb-4">{s.badge}</div>
                  <h3 className="font-black text-white text-lg mb-2">{s.title}</h3>
                  <p className="text-white/50 text-sm">{s.desc}</p>
                </motion.div>
              </FadeIn>
            ))}
          </div>
          <FadeIn delay={0.3}>
            <p className="text-center text-white/25 text-sm mt-8">{t.revenue.note}</p>
          </FadeIn>
        </div>
      </section>

      {/* ── ⑥ 信任背書 ─────────────────────────────── */}
      <section className="py-20 px-6 bg-[#0f1923]">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <p className="text-[#fbbf24] font-black text-sm uppercase tracking-widest mb-3">{t.trust.eyebrow}</p>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-16">{t.trust.title}</h2>
          </FadeIn>
          <div className="grid sm:grid-cols-2 gap-5">
            {t.trust.items.map((item, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <motion.div
                  className="bg-[#0A1628] rounded-2xl p-6 border border-white/10 flex gap-4"
                  whileHover={{ borderColor: "#fbbf2444" }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="text-3xl flex-shrink-0">{item.icon}</div>
                  <div>
                    <h3 className="font-black text-white mb-1">{item.title}</h3>
                    <p className="text-white/50 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </motion.div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── ⑦ CTA ───────────────────────────────────── */}
      <section className="py-24 px-6 bg-gradient-to-br from-[#0A1628] via-[#0d2040] to-[#0A1628] relative overflow-hidden">
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(0,198,173,0.12) 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="max-w-2xl mx-auto text-center relative z-10">
          <FadeIn>
            <h2 className="text-4xl md:text-6xl font-black text-white mb-4">{t.cta.title}</h2>
            <p className="text-white/50 text-lg mb-10">{t.cta.sub}</p>
            <motion.a
              href="mailto:info@mcstation.ai"
              className="bg-[#00C6AD] text-[#0A1628] font-black px-10 py-5 rounded-2xl text-lg shadow-xl shadow-[#00C6AD]/25 inline-block"
              whileHover={{ scale: 1.05, y: -3 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              {t.cta.btn}
            </motion.a>
            <p className="text-white/30 text-sm mt-6">{t.cta.contact} info@mcstation.ai</p>
          </FadeIn>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────── */}
      <footer className="py-8 px-6 bg-[#060e1a] border-t border-white/10 text-center">
        <p className="text-white/25 text-sm">© 2025 MCS 銓幻元科技股份有限公司 · 上市公司旗下子公司</p>
        <p className="text-white/15 text-xs mt-2">{t.stagingBanner}</p>
      </footer>
    </div>
  );
}
