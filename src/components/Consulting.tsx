"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

const CARD_META = [
  { image: "/images/cards/consulting-market-entry.png", accent: "from-blue-500/30 to-mcs-orange/10", border: "border-blue-400/50" },
  { image: "/images/cards/consulting-system-integration.png", accent: "from-mcs-orange/25 to-purple-500/10", border: "border-mcs-orange/50" },
  { image: "/images/cards/consulting-digital-transform.png", accent: "from-emerald-500/25 to-blue-500/10", border: "border-emerald-400/50" },
  { image: "/images/cards/consulting-compliance.png", accent: "from-purple-500/25 to-mcs-orange/10", border: "border-purple-400/50" },
];

export default function Consulting() {
  const { lang } = useLanguage();
  const tr = translations[lang].consulting;
  const [selected, setSelected] = useState<number | null>(null);
  const [imgZoom, setImgZoom] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") { setImgZoom(false); setSelected(null); } };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  const modals = (
    <>
      {/* Full-screen image lightbox */}
      <AnimatePresence>
        {selected !== null && imgZoom && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4 cursor-zoom-out"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setImgZoom(false)}
          >
            <motion.div
              className="relative max-w-5xl w-full rounded-2xl overflow-hidden shadow-2xl"
              initial={{ scale: 0.75, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.75, opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={e => e.stopPropagation()}
            >
              <Image src={CARD_META[selected].image} alt={tr.items[selected].title}
                width={1600} height={900} className="w-full h-auto" priority />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-6">
                <p className="text-white font-bold text-xl">{tr.items[selected].title}</p>
              </div>
              <button onClick={() => setImgZoom(false)}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/50 border border-white/30 flex items-center justify-center text-white hover:bg-black/70 transition-all">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Card detail modal */}
      <AnimatePresence>
        {selected !== null && !imgZoom && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/75 backdrop-blur-md z-[9998]"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setSelected(null)}
            />
            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-6 pointer-events-none">
              <motion.div
                className={`relative w-full max-w-lg bg-gradient-to-br from-mcs-blue-dark to-[#0a1e38] rounded-3xl overflow-hidden border pointer-events-auto ${CARD_META[selected]?.border ?? "border-white/20"}`}
                initial={{ opacity: 0, scale: 0.85, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.85, y: 30 }}
                transition={{ type: "spring", stiffness: 280, damping: 24 }}
                onClick={e => e.stopPropagation()}
              >
                {/* Image */}
                <div className="relative w-full h-52 cursor-zoom-in overflow-hidden group"
                  onClick={() => setImgZoom(true)}>
                  <Image src={CARD_META[selected].image} alt={tr.items[selected].title}
                    fill className="object-cover group-hover:scale-105 transition-transform duration-500" priority />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 backdrop-blur-sm border border-white/30 rounded-full px-4 py-2 flex items-center gap-2 text-white text-sm font-semibold">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                      </svg>
                      點擊放大
                    </div>
                  </div>
                </div>

                <button onClick={() => setSelected(null)}
                  className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-black/40 hover:bg-black/60 border border-white/20 flex items-center justify-center text-white/70 hover:text-white transition-all">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                <div className="p-8">
                  <div className="text-5xl mb-4">{tr.items[selected].icon}</div>
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold mb-4 bg-white/10 border ${CARD_META[selected].border} text-white/70`}>
                    🇸🇬 Singapore Advisory
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">{tr.items[selected].title}</h3>
                  <p className="text-gray-300 leading-relaxed text-sm mb-6">{tr.items[selected].desc}</p>
                  <a href="#contact" onClick={() => setSelected(null)}
                    className="inline-flex items-center gap-2 bg-mcs-orange text-white px-7 py-3.5 rounded-full font-semibold hover:bg-mcs-orange-light transition-all shadow-lg shadow-mcs-orange/30">
                    {tr.cta}
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </a>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );

  return (
    <>
      {mounted && createPortal(modals, document.body)}

      <section id="consulting" className="py-24 bg-mcs-blue-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-mcs-orange/5 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <ScrollReveal>
            <div className="text-center mb-16">
              <motion.div initial={{ opacity: 0, y: -10 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} viewport={{ once: true }}
                className="inline-flex items-center gap-2 bg-mcs-orange/10 border border-mcs-orange/20 rounded-full px-4 py-1.5 text-sm text-mcs-orange mb-5">
                <span>🇸🇬</span><span className="font-medium">Singapore Advisory Team</span>
              </motion.div>
              <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">{tr.title}</h2>
              <p className="text-gray-400 max-w-2xl mx-auto leading-relaxed">{tr.subtitle}</p>
            </div>
          </ScrollReveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6" staggerDelay={0.1}>
            {tr.items.map((item, i) => (
              <StaggerItem key={i}>
                <motion.button
                  className="group relative w-full text-left rounded-2xl overflow-hidden cursor-pointer border border-white/10 hover:border-white/30 transition-all duration-300"
                  onClick={() => { setSelected(i); setImgZoom(false); }}
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 320, damping: 22 }}
                >
                  <div className="relative w-full h-40 overflow-hidden">
                    <Image src={CARD_META[i].image} alt={item.title} fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    <div className={`absolute inset-0 bg-gradient-to-br ${CARD_META[i].accent} opacity-0 group-hover:opacity-60 transition-opacity duration-500`} />
                    <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-8 h-8 rounded-full bg-black/50 backdrop-blur-sm border border-white/30 flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="bg-white/5 p-6">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="text-3xl">{item.icon}</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-mcs-orange transition-colors duration-300">{item.title}</h3>
                    </div>
                    <p className="text-gray-400 text-sm leading-relaxed line-clamp-2">{item.desc}</p>
                  </div>
                </motion.button>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <ScrollReveal>
            <div className="mt-14 text-center">
              <motion.a href="#contact"
                className="btn-shine inline-block bg-mcs-orange text-white px-10 py-4 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-all shadow-xl shadow-mcs-orange/25"
                whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                {tr.cta}
              </motion.a>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </>
  );
}
