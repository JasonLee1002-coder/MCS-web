"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { LightboxImage } from "@/components/Lightbox";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  AnimatedCounter,
  FloatingElement,
  GlowPulse,
  TiltCard,
} from "@/components/motion";

/* ───── Data ───── */
const specs = [
  { label: "格數規格", value: "模組化自由組合", icon: "⊞", stat: null },
  { label: "溫控範圍", value: "常溫 · 冷藏 · 冷凍", icon: "🌡", stat: null },
  { label: "標準組合", value: "1375 × 1280 mm", icon: "⤢", stat: null },
  { label: "電壓", value: "110V / 60Hz", icon: "⚡", stat: null },
];

const features = [
  {
    title: "彈性模組化組合",
    desc: "小格櫃、大格櫃、中控櫃自由堆疊組合，可直立彈性配置，適應各種場地需求。",
    icon: "🧩",
  },
  {
    title: "雙面獨立工業螢幕",
    desc: "前後雙螢幕獨立運作，前面消費者點餐取餐，後面店員放餐管理，穩定高品質工業級電腦。",
    icon: "🖥️",
  },
  {
    title: "安全可靠設計",
    desc: "通過上市連鎖餐飲近萬次開關門壓力測試。雷射感應防夾手，自動閘門無接觸開啟。",
    icon: "🛡️",
  },
  {
    title: "一體成形板金",
    desc: "100% MIT 一體成形不鏽鋼板金，抗菌無縫設計，不漏液、衛生好清潔。內建紫外線殺菌功能。",
    icon: "🏭",
  },
  {
    title: "多溫層可客製",
    desc: "標準配備常溫格位，可依需求客製冷藏（2-8°C）、冷凍（-18°C以下）溫層，靈活搭配。",
    icon: "❄️",
  },
  {
    title: "智慧功能整合",
    desc: "五色可控燈光、外送員簽名自取功能、會員數位集點。可單機作業，也可聯網升級雲端管理。",
    icon: "🤖",
  },
];

const useCases = [
  { scene: "連鎖早餐店", desc: "外帶餐點自取，提升營運效率（實績：麥味登）", image: "/images/products/grabox/r101-scene.png", featured: true },

  { scene: "飯店 / 民宿", desc: "房客自助取餐，降低人力成本", image: "", featured: false },
  { scene: "企業 / 辦公大樓", desc: "員工訂餐直取，提升午餐效率", image: "", featured: false },
  { scene: "外送平台整合", desc: "外送員持碼自取，減少店員確認訂單的衝突", image: "", featured: false },
];

const advantages = [
  {
    title: "vs 傳統密碼鎖櫃",
    points: [
      "GraBox 內建 AI 系統，不只是「放東西的櫃子」",
      "可客製冷藏/冷凍溫層，傳統櫃只有常溫",
      "自帶雲端平台，傳統櫃無數據能力",
    ],
  },
  {
    title: "vs 進口智取櫃",
    points: [
      "100% 台灣製造，維修不用等進口零件",
      "軟硬體全客製，進口機型固定規格",
      "在地售後服務，全台到府支援",
    ],
  },
  {
    title: "vs 自建系統",
    points: [
      "軟硬體一體交付，不用自己整合",
      "快速上線，自建至少半年",
      "持續更新 AI 功能，自建維護成本高",
    ],
  },
];

const faqItems = [
  {
    q: "GraBox 智取櫃有哪些溫度選擇？",
    a: "GraBox 標準配備常溫（15-25°C）格位，可依需求客製冷藏（2-8°C）、冷凍（-18°C 以下）溫層，同一台機器可混搭不同溫度格位，滿足多樣餐點保存需求。",
  },
  {
    q: "GraBox 智取櫃有哪些規格可選？",
    a: "提供 6 格、12 格、18 格、24 格等多種標準規格，也可依場地需求客製尺寸。單機版與聯網版可選，支援 OEM/ODM 品牌貼牌客製。",
  },
  {
    q: "GraBox 適合哪些場景使用？",
    a: "廣泛適用於餐廳、飯店、企業辦公大樓、學校、醫院、便利商店等場景，實現 24 小時無人化取餐，有效解決排隊等候與人力成本問題。",
  },
  {
    q: "GraBox 支援哪些支付方式？",
    a: "支援 LINE Pay、街口支付、悠遊卡、信用卡、Apple Pay、Google Pay 等多元支付方式，一機搞定所有付款需求。",
  },
  {
    q: "GraBox 跟市面上的智取櫃有什麼不同？",
    a: "GraBox 內建 AI 訂餐系統、語音互動、人臉辨識，並非單純的密碼鎖櫃。標配常溫，可客製冷藏/冷凍溫層，自帶雲端管理平台與數據分析，100% 台灣製造，售後服務快速。",
  },
  {
    q: "GraBox 的保固與售後服務？",
    a: "全產品提供一年免費保固，可加購延長至三年。全台灣服務據點，提供到府安裝、場地評估、系統設定與員工教育訓練。",
  },
];

const specTableData = [
  { item: "小格單元", w: "~295mm", h: "~295mm", d: "390mm", note: "4 層堆疊" },
  { item: "大格單元", w: "~415mm", h: "~295mm", d: "390mm", note: "4 層堆疊" },
  { item: "中控櫃", w: "~665mm", h: "1280mm", d: "390mm", note: "含主控電腦與顯控板" },
  { item: "底座高度", w: "450 - 700mm（可調）", h: "", d: "", note: "" },
  { item: "標準組合", w: "1375mm", h: "1280mm", d: "390mm", note: "2小格+1大格+中控櫃" },
];

/* ───── CinematicHero ───── */
function CinematicHero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, -60]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050a15]"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,117,26,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(232,117,26,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glows - orange accent */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-orange-600/5 rounded-full blur-[80px]" />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20"
        style={{ opacity, scale, y }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              className="flex flex-wrap gap-3 mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              <span className="bg-orange-500/10 text-orange-400 px-4 py-1.5 rounded-full text-sm font-medium border border-orange-500/20 backdrop-blur-sm">
                明星產品
              </span>
              <span className="bg-emerald-500/10 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium border border-emerald-500/20 backdrop-blur-sm">
                AI POWERED
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                GraBox
              </motion.span>
              {/* 這個空白是必要的：兩個 block span 之間若無空白字元，DOM 文字會被
                  抽取成「GraBoxAI 智取櫃」，品牌 token 變成 GraBoxAI，傷害「GraBox」
                  品牌詞的精確匹配。兩者都是 block 顯示，補空白不影響視覺排版。 */}
              {" "}
              <motion.span
                className="block bg-gradient-to-r from-orange-400 via-amber-400 to-orange-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                AI 智取櫃
              </motion.span>
            </h1>

            <motion.p
              className="text-lg sm:text-xl text-white/50 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              不只是取餐櫃 — 結合 AI 訂餐系統、人臉辨識、
              <br className="hidden sm:block" />
              多溫層可客製的新一代智慧設備。100% 台灣設計製造。
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
            >
              <GlowPulse>
                <Link
                  href="/#contact"
                  className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-8 py-3.5 rounded-full font-medium hover:shadow-lg hover:shadow-orange-500/30 transition-all"
                >
                  立即諮詢
                </Link>
              </GlowPulse>
              <Link
                href="#specs"
                className="inline-block border border-white/20 text-white/70 px-8 py-3.5 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all"
              >
                產品規格
              </Link>
            </motion.div>
          </motion.div>

          {/* Machine Image */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <FloatingElement duration={8} distance={12}>
              <div className="relative">
                {/* Glow behind machine */}
                <div className="absolute inset-0 bg-gradient-to-t from-orange-500/20 via-transparent to-transparent blur-3xl scale-110" />
                <div className="relative w-[320px] h-[400px] sm:w-[380px] sm:h-[480px]">
                  <Image
                    src="/images/products/grabox/r101-spec.png"
                    alt="GraBox-R101 智慧取餐櫃產品規格圖 - 100% 台灣製造"
                    fill
                    className="object-contain object-top drop-shadow-[0_0_40px_rgba(232,117,26,0.3)]"
                    priority
                  />
                </div>
                {/* Floating spec badges */}
                <motion.div
                  className="absolute -right-4 top-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <span className="text-orange-400 font-bold">模組化</span>
                  <span className="text-white/50 ml-2">自由組合</span>
                </motion.div>
                <motion.div
                  className="absolute -left-4 top-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                >
                  <span className="text-amber-400 font-bold">多溫層</span>
                  <span className="text-white/50 ml-2">冷藏冷凍</span>
                </motion.div>
                <motion.div
                  className="absolute -right-2 bottom-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                >
                  <span className="text-green-400 font-bold">MIT</span>
                  <span className="text-white/50 ml-2">台灣製造</span>
                </motion.div>
              </div>
            </FloatingElement>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/20 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-white/40 rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ───── SpecCards ───── */
function SpecCards() {
  return (
    <section id="specs" className="py-24 bg-[#080e1c] relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-orange-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-amber-600/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {specs.map((s, i) => (
            <ScrollReveal key={s.label} delay={i * 0.1} className="text-center">
              <div className="group bg-white/[0.03] border border-white/[0.06] rounded-2xl p-6 hover:bg-white/[0.06] hover:border-orange-500/20 transition-all duration-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-2xl" />
                <div className="relative z-10">
                  <div className="text-3xl mb-3">{s.icon}</div>
                  <div className="text-white/40 text-sm mb-1">{s.label}</div>
                  <div className="text-white font-bold text-sm sm:text-base">{s.value}</div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── CoreFeatures ───── */
function CoreFeatures() {
  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Core Features
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            六大核心特色
          </h2>
          <p className="text-white/30 mt-4 max-w-xl mx-auto">
            通過上市連鎖餐飲每日數百次實戰驗證的品質
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-500 rounded-xl flex items-center justify-center text-white font-bold text-sm shrink-0">
                      {i + 1}
                    </div>
                    <span className="text-2xl">{f.icon}</span>
                  </div>
                  <h3 className="text-lg font-bold text-orange-400 mb-3">{f.title}</h3>
                  <p className="text-white/40 text-sm leading-relaxed">{f.desc}</p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── ProductGallery ───── */
function ProductGallery() {
  return (
    <section className="py-32 bg-[#080e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Product Details
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            GraBox-R101 產品細節
          </h2>
          <p className="text-white/30 mt-4">
            100% 台灣製造 · 模組化設計 · 通過上市連鎖餐飲品質驗證
          </p>
        </ScrollReveal>

        {/* Gallery images */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          <ScrollReveal>
            <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
              <LightboxImage
                src="/images/products/grabox/dm-features.png"
                alt="GraBox 智取櫃核心特色 - 智慧設計、安全可靠、靈活配置"
                width={600}
                height={800}
                className="w-full h-auto"
              />
              <div className="bg-white/[0.03] px-4 py-2 text-xs text-white/30 text-center">
                示意情境圖
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <div className="rounded-2xl overflow-hidden border border-white/10 relative group">
              <LightboxImage
                src="/images/products/grabox/r101-scene.png"
                alt="GraBox-R101 實際應用場景 - 麥味登早餐連鎖門市"
                width={600}
                height={800}
                className="w-full h-auto"
              />
              <div className="bg-white/[0.03] px-4 py-2 text-xs text-white/30 text-center">
                示意情境圖
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Spec cards (replacing the HTML table) */}
        <ScrollReveal>
          <div className="mb-6">
            <h3 className="text-2xl font-bold text-white mb-2">GraBox-R101 產品規格</h3>
            <div className="h-px bg-gradient-to-r from-orange-500/50 via-orange-500/20 to-transparent w-48" />
          </div>
        </ScrollReveal>
        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" staggerDelay={0.08}>
          {specTableData.map((row) => (
            <StaggerItem key={row.item}>
              <div
                className={`bg-white/[0.03] border rounded-xl p-5 hover:bg-white/[0.06] transition-all duration-300 ${
                  row.item === "標準組合"
                    ? "border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-transparent sm:col-span-2 lg:col-span-1"
                    : "border-white/[0.06]"
                }`}
              >
                <div className={`font-bold mb-3 text-sm ${row.item === "標準組合" ? "text-orange-400" : "text-white/80"}`}>
                  {row.item}
                </div>
                <div className="space-y-1.5 text-sm">
                  {row.w && (
                    <div className="flex justify-between">
                      <span className="text-white/30">{row.item === "底座高度" ? "高度" : "寬度"}</span>
                      <span className="text-white/70 font-mono">{row.w}</span>
                    </div>
                  )}
                  {row.h && (
                    <div className="flex justify-between">
                      <span className="text-white/30">高度</span>
                      <span className="text-white/70 font-mono">{row.h}</span>
                    </div>
                  )}
                  {row.d && (
                    <div className="flex justify-between">
                      <span className="text-white/30">深度</span>
                      <span className="text-white/70 font-mono">{row.d}</span>
                    </div>
                  )}
                  {row.note && (
                    <div className="pt-1.5 border-t border-white/[0.04] text-white/40 text-xs">
                      {row.note}
                    </div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───── Advantages ───── */
function Advantages() {
  return (
    <section className="py-32 bg-[#050a15] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-600/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Why GraBox
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            為什麼選 GraBox？
          </h2>
          <p className="text-white/30 mt-4">跟市面上的方案比一比</p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {advantages.map((a, i) => (
            <ScrollReveal key={a.title} delay={i * 0.15}>
              <TiltCard className="h-full">
                <div className="h-full bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 hover:bg-white/[0.06] hover:border-orange-500/20 transition-all duration-500">
                  <h3 className="text-lg font-bold text-orange-400 mb-6">{a.title}</h3>
                  <ul className="space-y-4">
                    {a.points.map((p, j) => (
                      <motion.li
                        key={j}
                        className="flex items-start gap-3 text-sm text-white/60"
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + j * 0.1 }}
                      >
                        <svg
                          className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        {p}
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── UseCasesSection ───── */
function UseCasesSection() {
  return (
    <section className="py-32 bg-[#080e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Use Cases
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            應用場景
          </h2>
          <p className="text-white/30 mt-4">
            從早餐店到糕餅名店，GraBox 已在多種場景實戰驗證
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {useCases.map((u) => (
            <StaggerItem key={u.scene}>
              <div
                className={`rounded-2xl overflow-hidden transition-all duration-500 group cursor-default h-full ${
                  u.featured
                    ? "bg-gradient-to-br from-orange-500/10 to-amber-500/5 border border-orange-500/20 hover:border-orange-500/40"
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                {u.image ? (
                  <div className="h-48 overflow-hidden relative">
                    <LightboxImage
                      src={u.image}
                      alt={`${u.scene} - GraBox 智取櫃應用場景`}
                      width={400}
                      height={250}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#080e1c] via-transparent to-transparent opacity-60" />
                  </div>
                ) : (
                  <div className="h-48 bg-gradient-to-br from-orange-500/5 to-transparent flex items-center justify-center">
                    <span className="text-4xl text-white/10 font-black">GraBox</span>
                  </div>
                )}
                <div className="p-6">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-orange-400 transition-colors">
                    {u.scene}
                  </h3>
                  <p className="text-white/40 text-sm leading-relaxed">{u.desc}</p>
                  {u.featured && (
                    <div className="mt-3 text-orange-400 text-xs font-mono tracking-wider">
                      VERIFIED
                    </div>
                  )}
                  {u.image && (
                    <div className="text-[10px] text-white/20 mt-2">示意情境圖</div>
                  )}
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───── Showcase: MWD scenario ───── */
function ShowcaseScene() {
  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            Showcase
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            實際應用案例
          </h2>
          <p className="text-white/30">
            麥味登導入 GraBox 智取櫃，外帶餐點自取、提升營運效率
          </p>
        </ScrollReveal>
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-white/10 relative">
            <LightboxImage
              src="/images/products/grabox/r101-scene.png"
              alt="麥味登導入 GraBox 智取櫃 - 門市實際應用場景"
              width={1200}
              height={600}
              className="w-full h-auto"
            />
            <div className="bg-white/[0.03] px-6 py-3 text-xs text-white/30 text-center">
              麥味登門市實績
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───── VideoSection ───── */
const mwdVideos = [
  { src: "/videos/mwd-kaohsiung-expo.mp4", label: "高雄加盟展 GraBox 展示" },
  { src: "/videos/mwd-store-demo-1.mp4", label: "門市實機 Demo ①" },
  { src: "/videos/mwd-store-demo-2.mp4", label: "門市實機 Demo ②" },
  { src: "/videos/mwd-grabox-operation.mp4", label: "GraBox 實地操作" },
  { src: "/videos/mwd-short-clip.mp4", label: "GraBox 精選片段" },
];

function VideoSection() {
  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            In Action
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-4">
            GraBox 實況影片
          </h2>
          <p className="text-white/30">
            麥味登門市實際導入 GraBox 智取櫃全紀錄
          </p>
        </ScrollReveal>

        {/* 2-column grid for first 4 videos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
          {mwdVideos.slice(0, 4).map((v, i) => (
            <ScrollReveal key={v.src} delay={i * 0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-black/40">
                <video
                  src={v.src}
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full aspect-video object-cover"
                />
                <div className="px-4 py-2 text-xs text-white/30 text-center">
                  {v.label}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Full-width for the highlight clip */}
        <ScrollReveal>
          <div className="rounded-2xl overflow-hidden border border-orange-500/20 bg-black/40 relative">
            <div className="absolute top-3 left-3 z-10 bg-orange-500/80 text-white text-xs px-3 py-1 rounded-full font-medium backdrop-blur-sm">
              精選
            </div>
            <video
              src="/videos/mwd-short-clip.mp4"
              controls
              playsInline
              preload="metadata"
              className="w-full aspect-video object-cover"
            />
            <div className="px-4 py-2 text-xs text-white/30 text-center">
              GraBox 精選片段
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───── FAQSection ───── */
function FAQSection() {
  return (
    <section className="py-32 bg-[#080e1c]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-orange-400 text-sm font-mono tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl font-black text-white">常見問題</h2>
          <p className="text-white/30 mt-4">關於 GraBox AI 智取櫃的常見疑問</p>
        </ScrollReveal>

        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <details className="group bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-orange-500/20 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-white/80 hover:text-orange-400 transition-colors">
                  {item.q}
                  <svg
                    className="w-5 h-5 text-white/20 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </summary>
                <div className="px-6 pb-6 text-white/40 text-sm leading-relaxed border-t border-white/[0.04] pt-4">
                  {item.a}
                </div>
              </details>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── CTASection ───── */
function CTASection() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#050a15]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-600/10 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            準備好升級了嗎？
          </h2>
          <p className="text-white/40 text-lg mb-4">
            從諮詢到安裝，快速上線。全台到府服務，含教育訓練。
          </p>
          <p className="text-white/25 text-sm mb-10">
            單機版 / 聯網版可選 · 多溫層可客製 · OEM/ODM 客製
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowPulse>
              <Link
                href="/#contact"
                className="inline-block bg-gradient-to-r from-orange-500 to-amber-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all"
              >
                聯絡我們
              </Link>
            </GlowPulse>
            <Link
              href="/cases"
              className="inline-block border border-white/20 text-white/60 px-10 py-4 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all"
            >
              看客戶實績
            </Link>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            <Link href="/products/frozen-microwave" className="text-white/30 text-sm hover:text-orange-400 transition-colors">
              也看看 → 冷凍微波販賣機
            </Link>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/blog/grabox-ai-ordering-face-recognition" className="text-orange-400/50 hover:text-orange-400 text-sm transition-colors">
              延伸閱讀：AI 訂餐 × 人臉辨識 →
            </Link>
            <Link href="/blog/smart-pickup-cabinet-brand-comparison" className="text-orange-400/50 hover:text-orange-400 text-sm transition-colors">
              智取櫃品牌比較 →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───── Section Dividers ───── */
function SectionDivider() {
  return (
    <div className="relative py-4 bg-[#050a15]">
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />
      </div>
    </div>
  );
}

function SectionDividerDark() {
  return (
    <div className="relative py-4 bg-[#080e1c]">
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-amber-500/20 to-transparent" />
      </div>
    </div>
  );
}

/* ───── Main Export ───── */
export default function GraBoxShowcase() {
  return (
    <>
      <CinematicHero />
      <SpecCards />
      <SectionDivider />
      <CoreFeatures />
      <SectionDividerDark />
      <ProductGallery />
      <SectionDivider />
      <Advantages />
      <SectionDividerDark />
      <UseCasesSection />
      <SectionDivider />
      <ShowcaseScene />
      <SectionDivider />
      <VideoSection />
      <SectionDividerDark />
      <FAQSection />
      <CTASection />
    </>
  );
}
