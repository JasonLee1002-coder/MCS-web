"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const CARD_ACCENTS = [
  { glow: "from-blue-500/20 to-mcs-orange/10", border: "border-blue-400/40", bg: "bg-blue-900/20" },
  { glow: "from-mcs-orange/20 to-purple-500/10", border: "border-mcs-orange/40", bg: "bg-mcs-orange/10" },
  { glow: "from-emerald-500/20 to-blue-500/10", border: "border-emerald-400/40", bg: "bg-emerald-900/20" },
  { glow: "from-purple-500/20 to-mcs-orange/10", border: "border-purple-400/40", bg: "bg-purple-900/20" },
];

export default function Consulting() {
  const { lang } = useLanguage();
  const tr = translations[lang].consulting;
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <section id="consulting" className="py-24 bg-mcs-blue-dark relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-mcs-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-mcs-purple/5 rounded-full blur-3xl pointer-events-none" />

      {/* ===== MODAL ===== */}
      <AnimatePresence>
        {selected !== null && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[100]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />

            {/* Modal card */}
            <div className="fixed inset-0 z-[101] flex items-center justify-center p-6">
              <motion.div
                className={`relative w-full max-w-lg bg-gradient-to-br from-mcs-blue-dark to-[#0a1e38] rounded-3xl overflow-hidden border ${CARD_ACCENTS[selected]?.border ?? "border-white/20"}`}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                onClick={(e) => e.stopPropagation()}
              >
                {/* Decorative glow blobs */}
                <div className={`absolute -top-20 -right-20 w-60 h-60 rounded-full blur-3xl bg-gradient-to-br ${CARD_ACCENTS[selected]?.glow ?? "from-mcs-orange/20 to-transparent"}`} />
                <div className="absolute -bottom-16 -left-16 w-48 h-48 rounded-full blur-2xl bg-white/[0.03]" />

                {/* Close button */}
                <button
                  onClick={() => setSelected(null)}
                  className="absolute top-5 right-5 z-10 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all duration-200 group"
                >
                  <svg className="w-4 h-4 group-hover:rotate-90 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {/* Content */}
                <div className="relative z-10 p-10">
                  {/* Giant icon */}
                  <motion.div
                    className="text-8xl mb-8 inline-block"
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
                  >
                    {tr.items[selected].icon}
                  </motion.div>

                  {/* Tag */}
                  <motion.div
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 ${CARD_ACCENTS[selected]?.bg ?? "bg-mcs-orange/10"} border ${CARD_ACCENTS[selected]?.border ?? "border-mcs-orange/30"} text-white/70`}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 }}
                  >
                    🇸🇬 Singapore Advisory
                  </motion.div>

                  <motion.h3
                    className="text-2xl font-bold text-white mb-4 leading-snug"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 }}
                  >
                    {tr.items[selected].title}
                  </motion.h3>

                  <motion.p
                    className="text-gray-300 leading-relaxed text-base mb-8"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.22 }}
                  >
                    {tr.items[selected].desc}
                  </motion.p>

                  <motion.a
                    href="#contact"
                    onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 bg-mcs-orange text-white px-7 py-3.5 rounded-full font-semibold hover:bg-mcs-orange-light transition-all shadow-lg shadow-mcs-orange/30"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.28 }}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    {tr.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </motion.a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 bg-mcs-orange/10 border border-mcs-orange/20 rounded-full px-4 py-1.5 text-sm text-mcs-orange mb-5"
            >
              <span>🇸🇬</span>
              <span className="font-medium">Singapore Advisory Team</span>
            </motion.div>
            <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{tr.title}</h2>
            <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{tr.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Cards */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
          {tr.items.map((item, i) => (
            <StaggerItem key={i}>
              <motion.button
                className="group relative w-full text-left bg-white/5 border border-white/10 rounded-2xl p-8 overflow-hidden cursor-pointer"
                onClick={() => setSelected(i)}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 320, damping: 22 }}
              >
                {/* Animated gradient border glow */}
                <div className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500 bg-gradient-to-br ${CARD_ACCENTS[i]?.glow ?? "from-mcs-orange/15 to-transparent"}`} />

                {/* Shimmer sweep */}
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-[linear-gradient(105deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)] bg-[length:200%_100%] group-hover:bg-[position:200%_0] [background-position:-100%_0]" />

                {/* Top-right corner accent */}
                <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-400 bg-gradient-to-bl ${CARD_ACCENTS[i]?.glow ?? "from-mcs-orange/10 to-transparent"}`} />

                {/* Click hint */}
                <div className="absolute top-5 right-5 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-2 group-hover:translate-x-0">
                  <div className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold bg-white/10 border border-white/20 text-white/60`}>
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607zM10.5 7.5v6m3-3h-6" />
                    </svg>
                    點擊了解
                  </div>
                </div>

                <div className="relative z-10">
                  <motion.div
                    className="text-5xl mb-5 inline-block"
                    whileHover={{ scale: 1.15, rotate: [-2, 2, -2, 0] }}
                    transition={{ duration: 0.4 }}
                  >
                    {item.icon}
                  </motion.div>
                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-mcs-orange transition-colors duration-300">{item.title}</h3>
                  <p className="text-gray-400 leading-relaxed text-sm line-clamp-3">{item.desc}</p>
                </div>
              </motion.button>
            </StaggerItem>
          ))}
        </StaggerContainer>

        {/* CTA */}
        <ScrollReveal>
          <div className="mt-14 text-center">
            <motion.a
              href="#contact"
              className="btn-shine inline-block bg-mcs-orange text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-all shadow-xl shadow-mcs-orange/25 hover:shadow-2xl hover:shadow-mcs-orange/30"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
            >
              {tr.cta}
            </motion.a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
