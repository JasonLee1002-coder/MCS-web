"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { MagneticHover } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import OmniCoreViz from "@/components/OmniCoreViz";

// Count-up hook
function useCountUp(target: number, duration = 1.4) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const steps = 36;
    const stepTime = (duration * 1000) / steps;
    const inc = target / steps;
    const t = setInterval(() => {
      start += inc;
      if (start >= target) { setDisplay(target); clearInterval(t); }
      else setDisplay(Math.floor(start));
    }, stepTime);
    return () => clearInterval(t);
  }, [inView, target, duration]);
  return { ref, display };
}

// Word-stagger animation
const wordVariants = {
  hidden: { opacity: 0, y: 14 },
  show: (i: number) => ({
    opacity: 1 as number, y: 0 as number,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay: 0.75 + i * 0.08 },
  }),
} as const;

const TAGLINE = {
  zh: {
    line1: [
      { text: "唯一整合", style: "text-gray-300" },
      { text: "硬體設備", style: "text-white font-semibold" },
      { text: "×", style: "text-mcs-orange font-bold mx-1" },
      { text: "OmniCore AI 雲端平台", style: "text-white font-semibold" },
      { text: "×", style: "text-mcs-orange font-bold mx-1" },
      { text: "ERP/會員/金流/物流串接", style: "text-white font-semibold" },
      { text: "的智慧零售作業系統", style: "text-gray-300" },
    ],
    line2pre: "一個平台讓連鎖品牌省下",
    countTarget: 88,
    countSuffix: "%",
    line2post: " 的 IT 建置成本",
    line3: "真正讓每一個場域的營運效益最大化",
  },
  en: {
    line1: [
      { text: "Integrating", style: "text-gray-300" },
      { text: " Smart Devices", style: "text-white font-semibold" },
      { text: " ×", style: "text-mcs-orange font-bold" },
      { text: " OmniCore AI Cloud", style: "text-white font-semibold" },
      { text: " ×", style: "text-mcs-orange font-bold" },
      { text: " ERP/Loyalty/Payment/Logistics", style: "text-white font-semibold" },
      { text: " — one AI Retail OS.", style: "text-gray-300" },
    ],
    line2pre: "Enterprise partners save",
    countTarget: 88,
    countSuffix: "%",
    line2post: " on IT infrastructure costs",
    line3: "— maximizing revenue at every venue.",
  },
  ja: {
    line1: [
      { text: "統合するのは", style: "text-gray-300" },
      { text: "スマート機器", style: "text-white font-semibold" },
      { text: "×", style: "text-mcs-orange font-bold mx-1" },
      { text: "OmniCore AI クラウド", style: "text-white font-semibold" },
      { text: "×", style: "text-mcs-orange font-bold mx-1" },
      { text: "ERP/会員/決済/物流", style: "text-white font-semibold" },
      { text: "——AI小売OSで一元管理。", style: "text-gray-300" },
    ],
    line2pre: "企業パートナーのITコストを",
    countTarget: 88,
    countSuffix: "%",
    line2post: "削減",
    line3: "——すべての拠点で収益を最大化。",
  },
  id: {
    line1: [
      { text: "Mengintegrasikan", style: "text-gray-300" },
      { text: " Perangkat Cerdas", style: "text-white font-semibold" },
      { text: " ×", style: "text-mcs-orange font-bold" },
      { text: " OmniCore AI Cloud", style: "text-white font-semibold" },
      { text: " ×", style: "text-mcs-orange font-bold" },
      { text: " ERP/Loyalitas/Pembayaran/Logistik", style: "text-white font-semibold" },
      { text: " — satu AI Retail OS.", style: "text-gray-300" },
    ],
    line2pre: "Hemat",
    countTarget: 88,
    countSuffix: "%",
    line2post: " biaya IT infrastruktur",
    line3: "— maksimalkan pendapatan di setiap venue.",
  },
};

function AnimatedTagline({ lang }: { lang: string }) {
  const tl = TAGLINE[lang as keyof typeof TAGLINE] ?? TAGLINE.zh;
  const { ref, display } = useCountUp(tl.countTarget, 1.4);
  const containerRef = useRef<HTMLDivElement>(null);
  const containerInView = useInView(containerRef, { once: true });

  return (
    <div ref={containerRef} className="mb-10 space-y-4 max-w-2xl mx-auto lg:mx-0">
      {/* Line 1 — integrations */}
      <p className="text-lg sm:text-xl leading-relaxed">
        {tl.line1.map((chunk, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={wordVariants}
            initial="hidden"
            animate={containerInView ? "show" : "hidden"}
            className={chunk.style}
          >
            {chunk.text}
          </motion.span>
        ))}
      </p>

      {/* Line 2 — 88% callout */}
      <motion.p
        className="text-xl sm:text-2xl font-medium leading-relaxed"
        initial={{ opacity: 0, y: 14 }}
        animate={containerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.55 }}
      >
        <span className="text-gray-300">{tl.line2pre} </span>
        <span className="inline-flex items-baseline gap-0.5">
          <span
            ref={ref}
            className="text-4xl sm:text-5xl font-black text-mcs-orange drop-shadow-[0_0_16px_rgba(232,117,26,0.5)]"
          >
            {display}
          </span>
          <span className="text-3xl font-black text-mcs-orange">{tl.countSuffix}</span>
        </span>
        <span className="text-gray-300">{tl.line2post}</span>
      </motion.p>

      {/* Line 3 */}
      <motion.p
        className="text-base sm:text-lg text-gray-400 leading-relaxed"
        initial={{ opacity: 0, y: 10 }}
        animate={containerInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 1.75 }}
      >
        {tl.line3}
      </motion.p>
    </div>
  );
}

export default function Hero() {
  const { lang } = useLanguage();
  const tr = translations[lang];

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden hero-gradient"
    >
      {/* Animated grid */}
      <div className="absolute inset-0 hero-grid" />

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mcs-orange/10 rounded-full blur-3xl hero-orb" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-mcs-blue/20 rounded-full blur-3xl hero-orb-2" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-mcs-purple/10 rounded-full blur-3xl hero-orb" />

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-mcs-orange to-transparent glow-line" />
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-mcs-orange/5 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <div className="text-center lg:text-left">

            {/* Positioning slogan pill */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-4 flex justify-center lg:justify-start"
            >
              <div className="inline-block px-5 py-2 rounded-full border border-[#E8751A]/40 bg-[#E8751A]/10 text-[#f5a87a] text-sm font-bold tracking-wide text-center">
                {tr.hero.badge}
              </div>
            </motion.div>

            {/* Credibility badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mb-6 flex justify-center lg:justify-start"
            >
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/70 backdrop-blur-sm">
                <span className="font-medium">{tr.hero.subBadge}</span>
              </div>
            </motion.div>

            {/* Headline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                <motion.span
                  className="text-mcs-orange inline-block"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                >
                  {tr.hero.headline1}
                </motion.span>
                <br />
                <motion.span
                  className="text-white inline-block"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  {tr.hero.headline2}
                </motion.span>
              </h1>
            </motion.div>

            {/* Animated tagline */}
            <AnimatedTagline lang={lang} />

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 2.0 }}
            >
              <MagneticHover>
                <a
                  href="#contact"
                  className="btn-shine bg-mcs-orange text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-all shadow-lg shadow-mcs-orange/25 hover:shadow-xl hover:shadow-mcs-orange/30 inline-block"
                >
                  {tr.hero.cta1}
                </a>
              </MagneticHover>
              <MagneticHover>
                <a
                  href="#services"
                  className="border border-white/20 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all inline-block backdrop-blur-sm"
                >
                  {tr.hero.cta2}
                </a>
              </MagneticHover>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 2.1 }}
            >
              {[
                { val: tr.hero.stat1v, label: tr.hero.stat1l },
                { val: tr.hero.stat2v, label: tr.hero.stat2l },
                { val: tr.hero.stat3v, label: tr.hero.stat3l },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  className="glass-card rounded-xl p-4 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 2.15 + i * 0.12 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(232,117,26,0.3)" }}
                >
                  <div className="text-2xl font-bold text-mcs-orange">{s.val}</div>
                  <div className="text-xs text-gray-400 mt-1 leading-snug">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — OmniCore platform visualization */}
          <motion.div
            className="flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <OmniCoreViz />
          </motion.div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="section-wave">
        <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
          <path
            d="M0,60 L0,30 Q300,0 600,30 Q900,60 1200,30 L1200,60 Z"
            fill="var(--mcs-gray)"
          />
        </svg>
      </div>
    </section>
  );
}
