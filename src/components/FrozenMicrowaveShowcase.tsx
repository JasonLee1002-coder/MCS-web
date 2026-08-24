"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
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

/* ───── Cinematic Hero ───── */
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
              "linear-gradient(rgba(59,130,246,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.5) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-cyan-500/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-orange-500/5 rounded-full blur-[80px]" />
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
              <span className="bg-red-500/10 text-red-400 px-4 py-1.5 rounded-full text-sm font-medium border border-red-500/20 backdrop-blur-sm">
                FLAGSHIP
              </span>
              <span className="bg-blue-500/10 text-blue-400 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-500/20 backdrop-blur-sm">
                JAPAN MOU
              </span>
            </motion.div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.95] mb-6">
              <motion.span
                className="block text-white"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                冷凍微波
              </motion.span>
              <motion.span
                className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-blue-600 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                販賣機
              </motion.span>
            </h1>

            <motion.p
              className="text-lg sm:text-xl text-white/50 mb-8 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1.1 }}
            >
              冷食瞬間變熱餐。
              <br className="hidden sm:block" />
              日本首都高速公路指定合作。
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
                  className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-3.5 rounded-full font-medium hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                >
                  立即諮詢
                </Link>
              </GlowPulse>
              <Link
                href="#lineup"
                className="inline-block border border-white/20 text-white/70 px-8 py-3.5 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all"
              >
                瀏覽機型
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
                <div className="absolute inset-0 bg-gradient-to-t from-blue-500/20 via-transparent to-transparent blur-3xl scale-110" />
                <div className="relative w-[320px] h-[400px] sm:w-[380px] sm:h-[480px]">
                  <Image
                    src="/images/products/frozen-microwave/th-21ms-main.png"
                    alt="TH-21MS 冷凍微波加熱販賣機 — 3600W 商用微波即食熱餐解決方案 | 銓幻元科技"
                    fill
                    className="object-contain drop-shadow-[0_0_40px_rgba(59,130,246,0.3)]"
                    priority
                  />
                </div>
                {/* Floating specs */}
                <motion.div
                  className="absolute -right-4 top-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                >
                  <span className="text-cyan-400 font-bold">3600W</span>
                  <span className="text-white/50 ml-2">商用微波</span>
                </motion.div>
                <motion.div
                  className="absolute -left-4 top-1/2 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                >
                  <span className="text-blue-400 font-bold">-18°C</span>
                  <span className="text-white/50 ml-2">精準冷凍</span>
                </motion.div>
                <motion.div
                  className="absolute -right-2 bottom-1/4 bg-white/5 backdrop-blur-md border border-white/10 rounded-xl px-4 py-2 text-sm"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.9, duration: 0.6 }}
                >
                  <span className="text-green-400 font-bold">iVM</span>
                  <span className="text-white/50 ml-2">雲端管理平台</span>
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

/* ───── Frozen → Microwave → Hot Flow ───── */
function ProcessFlow() {
  const steps = [
    {
      icon: "❄️",
      temp: "-18°C",
      title: "冷凍保鮮",
      desc: "精準溫控，食材完美冷凍保存",
      color: "from-blue-600 to-cyan-600",
      glow: "bg-blue-500/20",
    },
    {
      icon: "⚡",
      temp: "3600W",
      title: "商用微波加熱",
      desc: "瞬間加熱，2-4 分鐘即可享用",
      color: "from-orange-500 to-red-500",
      glow: "bg-orange-500/20",
    },
    {
      icon: "🍱",
      temp: "即食",
      title: "熱騰騰出餐",
      desc: "智能貨梯平穩運送，不翻倒",
      color: "from-green-500 to-emerald-500",
      glow: "bg-green-500/20",
    },
  ];

  return (
    <section className="py-32 bg-[#050a15] relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            How It Works
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            冷食，瞬間變熱餐
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8" staggerDelay={0.2}>
          {steps.map((step, i) => (
            <StaggerItem key={i}>
              <div className="relative group">
                {/* Connector line */}
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-white/20 to-transparent z-10" />
                )}
                <div className="bg-white/[0.03] border border-white/[0.06] rounded-3xl p-8 text-center hover:bg-white/[0.06] transition-all duration-500 relative overflow-hidden">
                  {/* Background glow */}
                  <div className={`absolute inset-0 ${step.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-3xl`} />
                  <div className="relative z-10">
                    <div className="text-5xl mb-4">{step.icon}</div>
                    <div className={`inline-block bg-gradient-to-r ${step.color} bg-clip-text text-transparent text-3xl font-black mb-2`}>
                      {step.temp}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                    <p className="text-white/40 text-sm">{step.desc}</p>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───── Big Numbers Section ───── */
function BigNumbers() {
  const stats = [
    { value: 100, suffix: "+", label: "台灣實績台數", unit: "台" },
    { value: 3600, suffix: "W", label: "商用微波功率", unit: "" },
    { value: -18, suffix: "°C", label: "精準冷凍溫控", unit: "" },
    { value: 24, suffix: "H", label: "全天候服務", unit: "" },
  ];

  return (
    <section className="py-24 bg-[#080e1c] relative">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-600/5 rounded-full blur-[120px]" />
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, i) => (
            <ScrollReveal key={i} delay={i * 0.15} className="text-center">
              <div className="text-5xl sm:text-6xl font-black bg-gradient-to-b from-white to-white/40 bg-clip-text text-transparent">
                <AnimatedCounter value={Math.abs(stat.value)} suffix="" />
                <span>{stat.value < 0 ? "°C" : stat.suffix}</span>
              </div>
              <p className="text-white/30 text-sm mt-2 tracking-wide">{stat.label}</p>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Feature Showcase (sticky scroll) ───── */
function FeatureShowcase() {
  const features = [
    {
      title: "商用級微波即時加熱",
      desc: "搭載 3600W 商用微波爐，冷凍食品從 -18°C 瞬間加熱至可口溫度。打破傳統冷凍販賣限制。",
      icon: "🔥",
      accent: "text-orange-400",
    },
    {
      title: "智能貨梯平穩運送",
      desc: "獨家平行運輸技術，湯品便當全程不翻倒、不變形。智能貨梯從貨架到微波區完美送達。",
      icon: "🛗",
      accent: "text-blue-400",
    },
    {
      title: "全溫域精準控制",
      desc: "-18°C 至 4°C 全溫域。同一台機器冷凍與冷藏並存，靈活滿足不同食材需求。",
      icon: "❄️",
      accent: "text-cyan-400",
    },
    {
      title: "食安管控業界領先",
      desc: "服務大型連鎖通路實戰經驗。食品效期自動管理、溫度即時監控、異常 LINE 即時推播。",
      icon: "🛡️",
      accent: "text-green-400",
    },
    {
      title: "iVM 雲端管理平台",
      desc: "雲端管理平台。銷售數據、庫存、溫度、設備健康 — 一個後台全部掌握。",
      icon: "☁️",
      accent: "text-purple-400",
    },
    {
      title: "多機型可選",
      desc: "可依需求選擇不同機型與配置。全部搭配同一套雲端管理平台。",
      icon: "🇹🇼",
      accent: "text-red-400",
    },
  ];

  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            Core Technology
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            六大核心技術
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((f, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="group relative bg-white/[0.02] border border-white/[0.06] rounded-2xl p-8 hover:bg-white/[0.05] transition-all duration-500 h-full">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative z-10">
                  <div className="text-4xl mb-4">{f.icon}</div>
                  <h3 className={`text-xl font-bold mb-3 ${f.accent}`}>{f.title}</h3>
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

/* ───── Machine Lineup ───── */
function MachineLineup() {
  const machines = [
    {
      model: "TH-21MS",
      name: "冷凍微波加熱販賣機",
      badge: "旗艦主力",
      badgeColor: "bg-gradient-to-r from-blue-500 to-cyan-500",
      temp: "-18°C ~ 4°C",
      highlight: "3600W 商用微波",
      size: "1885×1071×1992mm",
      tracks: "6 層 · 履帶貨道",
      image: "/images/products/frozen-microwave/th-21ms-main.png",
      featured: true,
    },
    {
      model: "TH-21FD",
      name: "智能下取冷凍販賣機",
      badge: "大容量冷凍",
      badgeColor: "bg-white/10",
      temp: "-18°C",
      highlight: "45 貨道大容量",
      size: "1375×850×1960mm",
      tracks: "5 層 · 45 貨道",
      image: "/images/products/frozen-microwave/th-21fd-main.png",
      featured: false,
    },
    {
      model: "TH-21FS",
      name: "智能側取冷凍販賣機",
      badge: "人性化設計",
      badgeColor: "bg-white/10",
      temp: "-18°C",
      highlight: "站立輕鬆取貨",
      size: "1420×952×1950mm",
      tracks: "6 層 · 54 貨道",
      image: "/images/products/frozen-microwave/th-21fs-main.png",
      featured: false,
    },
  ];

  return (
    <section id="lineup" className="py-32 bg-[#080e1c] relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[150px]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <ScrollReveal className="text-center mb-20">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            Product Lineup
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            冷凍 · 微波機型陣容
          </h2>
          <p className="text-white/30 mt-4 max-w-xl mx-auto">
            多種機型可選，所有機型搭配 iVM 雲端管理平台
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {machines.map((m, i) => (
            <ScrollReveal key={m.model} delay={i * 0.15}>
              <TiltCard className="h-full">
                <div
                  className={`h-full rounded-3xl overflow-hidden border transition-all duration-500 ${
                    m.featured
                      ? "border-blue-500/30 bg-gradient-to-b from-blue-500/10 to-transparent"
                      : "border-white/[0.06] bg-white/[0.02] hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Image */}
                  <div className="relative h-80 flex items-center justify-center p-6">
                    {m.featured && (
                      <div className="absolute inset-0 bg-gradient-to-t from-blue-500/10 via-transparent to-transparent" />
                    )}
                    <Image
                      src={m.image}
                      alt={`${m.model} ${m.name}`}
                      width={260}
                      height={340}
                      className="h-72 w-auto object-contain relative z-10 drop-shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                    />
                    <div className={`absolute top-4 left-4 ${m.badgeColor} px-3 py-1 rounded-full text-xs font-bold text-white`}>
                      {m.badge}
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-6 pt-0">
                    <div className="font-mono text-sm text-blue-400 font-bold mb-1">{m.model}</div>
                    <h3 className="text-xl font-bold text-white mb-3">{m.name}</h3>

                    <div className="space-y-2 text-sm">
                      {[
                        { label: "溫控", value: m.temp },
                        { label: "特色", value: m.highlight },
                        { label: "尺寸", value: m.size },
                        { label: "貨道", value: m.tracks },
                      ].map((spec) => (
                        <div key={spec.label} className="flex justify-between">
                          <span className="text-white/30">{spec.label}</span>
                          <span className="text-white/70 font-medium">{spec.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───── Japan MOU Cinematic ───── */
function JapanMOU() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-32 overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <Image
          src="/images/products/frozen-microwave/japan-expressway.png"
          alt="日本首都高速公路休息站"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050a15] via-[#050a15]/90 to-[#050a15]/70" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl">🇯🇵</span>
              <span className="text-red-400 text-sm font-mono tracking-widest uppercase">
                International Recognition
              </span>
            </div>
            <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
              日本首都高速公路<br />
              <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
                MOU 指定合作
              </span>
            </h2>
            <p className="text-white/50 text-lg leading-relaxed mb-8">
              我們的冷凍微波販賣機技術與食安管控能力，獲得日本首都高速公路集團高度認可，
              簽訂 MOU 合作備忘錄，計劃在全日本高速公路休息站布點。
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <div className="inline-flex items-center gap-4 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl px-6 py-4">
              <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                <Image
                  src="/images/products/frozen-microwave/japan-mou.jpg"
                  alt="MOU 簽約合影"
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="text-white font-bold">MOU 簽署合影</div>
                <div className="text-white/40 text-sm">與日本首都高速公路集團</div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ───── Food Safety Platform ───── */
function FoodSafetyPlatform() {
  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <ScrollReveal direction="left">
            <div>
              <p className="text-green-400 text-sm font-mono tracking-widest uppercase mb-4">
                Food Safety Control
              </p>
              <h2 className="text-4xl sm:text-5xl font-black text-white mb-6 leading-tight">
                服務大型連鎖通路<br />
                <span className="text-green-400">數百台</span>經驗
              </h2>
              <p className="text-white/40 text-lg leading-relaxed mb-10">
                不只賣機器 — 累積服務大型連鎖通路數百台智慧販賣機的實戰經驗，
                打造業界最完善的食安管控系統。
              </p>

              <div className="space-y-6">
                {[
                  { icon: "🌡️", title: "溫度 24H 即時監控", desc: "異常立即 LINE 推播通知" },
                  { icon: "📅", title: "食品效期自動管理", desc: "過期商品自動下架" },
                  { icon: "📊", title: "銷售庫存即時掌握", desc: "雲端平台隨時可查" },
                  { icon: "🔧", title: "全台服務能量", desc: "從安裝到維護一站式" },
                ].map((item, i) => (
                  <ScrollReveal key={i} delay={i * 0.1}>
                    <div className="flex items-start gap-4 group">
                      <div className="text-2xl flex-shrink-0 mt-0.5">{item.icon}</div>
                      <div>
                        <div className="text-white font-bold group-hover:text-green-400 transition-colors">{item.title}</div>
                        <div className="text-white/30 text-sm">{item.desc}</div>
                      </div>
                    </div>
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/10 rounded-3xl blur-3xl" />
              <div className="relative rounded-2xl overflow-hidden border border-white/10">
                <LightboxImage
                  src="/images/products/frozen-microwave/ivm-platform-full.png"
                  alt="IVM 智能販賣機管理平台"
                  width={800}
                  height={1000}
                  className="w-full h-auto"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

/* ───── Use Cases ───── */
function UseCases() {
  const cases = [
    { icon: "🛣️", title: "高速公路休息站", desc: "日本首都高速指定合作，24H 熱食服務", featured: true },
    { icon: "🦐", title: "冷凍食材業 24H 站", desc: "品牌直營無中間商，拓展 24H 通路", featured: true },
    { icon: "🍳", title: "餐飲連鎖 24H 延伸", desc: "門市不打烊，招牌餐冷凍微波即食", featured: true },
    { icon: "🏪", title: "便利商店 / 超市", desc: "店外擴增冷凍鮮食銷售點位", featured: false },
    { icon: "🏭", title: "工業區 / 科技園區", desc: "深夜加班族的熱食救星", featured: false },
    { icon: "🏢", title: "社區 / 住宅大樓", desc: "下樓即取，智慧社區服務", featured: false },
  ];

  return (
    <section className="py-32 bg-[#080e1c]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-20">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            Use Cases
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            應用場景
          </h2>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6" staggerDelay={0.1}>
          {cases.map((c) => (
            <StaggerItem key={c.title}>
              <div
                className={`rounded-2xl p-8 transition-all duration-500 group cursor-default h-full ${
                  c.featured
                    ? "bg-gradient-to-br from-blue-500/10 to-cyan-500/5 border border-blue-500/20 hover:border-blue-500/40"
                    : "bg-white/[0.02] border border-white/[0.06] hover:bg-white/[0.05]"
                }`}
              >
                <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">{c.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{c.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{c.desc}</p>
                {c.featured && (
                  <div className="mt-4 text-blue-400 text-xs font-mono tracking-wider">PRIORITY TARGET</div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

/* ───── Catalog Gallery ───── */
function CatalogGallery() {
  return (
    <section className="py-32 bg-[#050a15]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            Gallery
          </p>
          <h2 className="text-4xl sm:text-5xl font-black text-white">
            產品細節
          </h2>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <ScrollReveal className="md:col-span-2">
            <div className="rounded-2xl overflow-hidden border border-white/10 h-full">
              <LightboxImage
                src="/images/products/frozen-microwave/th-21ms-catalog.png"
                alt="TH-21MS 完整產品型錄"
                width={800}
                height={600}
                className="w-full h-full object-cover"
              />
            </div>
          </ScrollReveal>
          <div className="space-y-6">
            <ScrollReveal delay={0.1}>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <LightboxImage
                  src="/images/products/frozen-microwave/th-21ms-detail1.jpeg"
                  alt="冷凍微波販賣機餐盒展示"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <div className="rounded-2xl overflow-hidden border border-white/10">
                <LightboxImage
                  src="/images/products/frozen-microwave/japan-mou.jpg"
                  alt="日本首都高速公路 MOU 簽約"
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───── FAQ ───── */
function FAQ() {
  const items = [
    {
      q: "加熱時間需要多久？",
      a: "3600W 商用微波，一般冷凍餐盒約 2-4 分鐘。選購後稍候即取得熱騰騰餐點。",
    },
    {
      q: "食品安全如何管控？",
      a: "服務大型連鎖通路實戰經驗：溫度 24H 即時監控、食品效期自動下架、異常 LINE 即時通知、銷售紀錄完整可追溯。",
    },
    {
      q: "不同機型差在哪？",
      a: "可依場域條件與預算選擇機型，兩者都搭配同一套雲端管理平台與全台服務。",
    },
    {
      q: "適合賣什麼商品？",
      a: "冷凍便當、調理包、水餃、湯品、海鮮、牛排、甜點等。TH-21MS 微波後即食，TH-21FD/FS 適合帶回家料理。",
    },
    {
      q: "日本首都高速公路合作是什麼？",
      a: "我們的技術已獲日本首都高速公路集團認可，簽訂 MOU 計劃在全日本休息站布點。國際級品質肯定。",
    },
    {
      q: "冷凍食材品牌如何合作？",
      a: "自購設備自營、合作設點分潤、場地合作等多種模式。我們負責設備與平台，品牌負責商品。歡迎聯繫討論。",
    },
  ];

  return (
    <section className="py-32 bg-[#080e1c]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <p className="text-blue-400 text-sm font-mono tracking-widest uppercase mb-4">
            FAQ
          </p>
          <h2 className="text-4xl font-black text-white">常見問題</h2>
        </ScrollReveal>

        <div className="space-y-4">
          {items.map((item, i) => (
            <ScrollReveal key={i} delay={i * 0.05}>
              <details className="group bg-white/[0.02] border border-white/[0.06] rounded-xl hover:border-white/10 transition-colors">
                <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-white/80 hover:text-white transition-colors">
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

/* ───── CTA ───── */
function CTA() {
  return (
    <section className="relative py-32 overflow-hidden bg-[#050a15]">
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[150px]" />
      </div>
      <div className="max-w-3xl mx-auto px-4 text-center relative z-10">
        <ScrollReveal>
          <h2 className="text-4xl sm:text-5xl font-black text-white mb-6">
            開啟 24H<br />
            <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              無人熱食新商機
            </span>
          </h2>
          <p className="text-white/40 text-lg mb-10 max-w-xl mx-auto">
            餐飲連鎖、冷凍食材業、通路營運商 — 從場地評估到上線營運，一站式服務。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <GlowPulse>
              <Link
                href="/#contact"
                className="inline-block bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all"
              >
                立即諮詢合作
              </Link>
            </GlowPulse>
            <Link
              href="/cases"
              className="inline-block border border-white/20 text-white/60 px-10 py-4 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all"
            >
              查看客戶實績
            </Link>
            {/* 2026-08-20：接到新的全系列規格頁。錨文字帶「8 款型號規格」而不是
                「了解更多」——這頁是站上權重最高的冷凍相關頁，錨文字要把型號意圖帶過去。 */}
            <Link
              href="/products/frozen-vending"
              className="inline-block border px-10 py-4 rounded-full font-medium transition-all"
              style={{ borderColor: 'rgba(255,107,53,0.5)', color: '#FF6B35' }}
            >
              看全系列 8 款型號規格
            </Link>
            <Link
              href="/products/grabox"
              className="inline-block border border-white/20 text-white/60 px-10 py-4 rounded-full font-medium hover:bg-white/5 hover:text-white transition-all"
            >
              看 GraBox 智取櫃
            </Link>
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Link href="/blog/frozen-microwave-vending-machine-japan" className="text-blue-400/60 hover:text-blue-400 text-sm transition-colors">
              延伸閱讀：進軍日本的推進歷程 →
            </Link>
            <Link href="/blog/frozen-vending-machine-food-safety-management" className="text-blue-400/60 hover:text-blue-400 text-sm transition-colors">
              食安管控指南 →
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

/* ───── Section Divider ───── */
function SectionDivider() {
  return (
    <div className="relative py-4 bg-[#050a15]">
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />
      </div>
    </div>
  );
}

function SectionDividerDark() {
  return (
    <div className="relative py-4 bg-[#080e1c]">
      <div className="max-w-3xl mx-auto px-8">
        <div className="h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />
      </div>
    </div>
  );
}

/* ───── Main Export ───── */
export default function FrozenMicrowaveShowcase() {
  return (
    <>
      <CinematicHero />
      <ProcessFlow />
      <BigNumbers />
      <SectionDivider />
      <FeatureShowcase />
      <SectionDividerDark />
      <MachineLineup />
      <JapanMOU />
      <SectionDivider />
      <FoodSafetyPlatform />
      <SectionDividerDark />
      <UseCases />
      <SectionDivider />
      <CatalogGallery />
      <SectionDividerDark />
      <FAQ />
      <CTA />
    </>
  );
}
