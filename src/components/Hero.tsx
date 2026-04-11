"use client";

import { motion } from "framer-motion";
import { LightboxImage } from "@/components/Lightbox";
import { FloatingElement, MagneticHover } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

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

            {/* Badges */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-2 justify-center lg:justify-start mb-6">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-sm text-white/80 backdrop-blur-sm"
              >
                <span className="text-base">🇸🇬</span>
                <span className="font-medium">{tr.hero.badge}</span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.25 }}
                className="inline-flex items-center gap-2 bg-mcs-orange/15 border border-mcs-orange/40 rounded-full px-4 py-1.5 text-sm text-mcs-orange font-semibold backdrop-blur-sm"
              >
                <span>{tr.hero.subBadge}</span>
              </motion.div>
            </div>

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
                <motion.span
                  className="mx-3 text-white/40 inline-block"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 0.6 }}
                >
                  ×
                </motion.span>
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

            {/* Tagline */}
            <motion.p
              className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto lg:mx-0 mb-10 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
            >
              {tr.hero.tagline}
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <MagneticHover>
                <a
                  href="#services"
                  className="btn-shine bg-mcs-orange text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-all shadow-lg shadow-mcs-orange/25 hover:shadow-xl hover:shadow-mcs-orange/30 inline-block"
                >
                  {tr.hero.cta1}
                </a>
              </MagneticHover>
              <MagneticHover>
                <a
                  href="#contact"
                  className="border border-white/20 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/10 hover:border-white/40 transition-all inline-block backdrop-blur-sm"
                >
                  {tr.hero.cta2}
                </a>
              </MagneticHover>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 grid grid-cols-3 gap-8 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.1 }}
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
                  transition={{ duration: 0.5, delay: 1.2 + i * 0.15 }}
                  whileHover={{ scale: 1.05, borderColor: "rgba(232,117,26,0.3)" }}
                >
                  <div className="text-3xl font-bold text-mcs-orange">{s.val}</div>
                  <div className="text-sm text-gray-400 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right — Hero illustration */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
          >
            <FloatingElement duration={8} distance={12}>
              <LightboxImage
                src="/images/illustrations/hero.png"
                alt="MCS Meta Clearing Station — AI Smart Equipment Ecosystem"
                width={700}
                height={500}
                className="w-full max-w-xl drop-shadow-2xl"
              />
            </FloatingElement>
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
