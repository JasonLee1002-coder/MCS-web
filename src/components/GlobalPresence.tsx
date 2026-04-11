"use client";

import { motion } from "framer-motion";
import { ScrollReveal } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";
import SGHQIllustration from "@/components/illustrations/SGHQIllustration";
import TWRDIllustration from "@/components/illustrations/TWRDIllustration";
import GlobalBridgeIllustration from "@/components/illustrations/GlobalBridgeIllustration";

export default function GlobalPresence() {
  const { lang } = useLanguage();
  const tr = translations[lang].globalPresence;

  return (
    <section id="global" className="py-24 bg-mcs-gray relative overflow-hidden">
      {/* Subtle radial background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(27,58,92,0.06),transparent)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-mcs-blue-dark mb-4">{tr.title}</h2>
            <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">{tr.subtitle}</p>
          </div>
        </ScrollReveal>

        {/* Dual-core layout */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_80px_1fr] gap-0 items-stretch">

          {/* Singapore HQ Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="bg-mcs-blue-dark rounded-3xl p-10 text-white relative overflow-hidden group"
          >
            {/* Decorative orb */}
            <div className="absolute top-0 right-0 w-56 h-56 bg-mcs-orange/10 rounded-full -translate-y-1/3 translate-x-1/3 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-mcs-blue/30 rounded-full translate-y-1/3 -translate-x-1/3" />

            <div className="relative z-10">
              <div className="text-5xl mb-5">🇸🇬</div>
              <h3 className="text-2xl font-bold mb-5">{tr.sgTitle}</h3>
              <p className="text-gray-300 text-sm leading-loose whitespace-pre-line mb-6">{tr.sgDesc}</p>
              <div className="inline-flex items-center gap-2 bg-mcs-orange/20 border border-mcs-orange/30 rounded-full px-4 py-1.5 text-xs text-mcs-orange font-mono font-semibold">
                <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                {tr.sgBadge}
              </div>
              {/* SG Illustration */}
              <div className="mt-6 rounded-xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <SGHQIllustration className="w-full" />
              </div>
            </div>
          </motion.div>

          {/* Center Bridge */}
          <div className="hidden lg:flex flex-col items-center justify-center gap-3 py-8">
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="w-px flex-1 bg-gradient-to-b from-mcs-blue-dark via-mcs-orange to-mcs-blue origin-top"
            />
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-mcs-orange to-mcs-orange-light text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl font-black shadow-xl shadow-mcs-orange/40 shrink-0"
            >
              ×
            </motion.div>
            <motion.div
              initial={{ scaleY: 0, opacity: 0 }}
              whileInView={{ scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="w-px flex-1 bg-gradient-to-b from-mcs-blue to-mcs-blue-dark origin-bottom"
            />
            <div className="text-[10px] text-gray-400 text-center font-semibold tracking-wide uppercase max-w-[60px] leading-tight">
              {tr.bridge}
            </div>
          </div>

          {/* Taiwan R&D Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-mcs-blue to-mcs-blue-dark rounded-3xl p-10 text-white relative overflow-hidden group border border-mcs-orange/20"
          >
            {/* Decorative orb */}
            <div className="absolute bottom-0 left-0 w-56 h-56 bg-mcs-purple/15 rounded-full translate-y-1/3 -translate-x-1/3 group-hover:scale-110 transition-transform duration-700" />
            <div className="absolute top-0 right-0 w-32 h-32 bg-mcs-orange/10 rounded-full -translate-y-1/3 translate-x-1/3" />

            <div className="relative z-10">
              <div className="text-5xl mb-5">🇹🇼</div>
              <h3 className="text-2xl font-bold mb-5">{tr.twTitle}</h3>
              <p className="text-gray-300 text-sm leading-loose whitespace-pre-line mb-6">{tr.twDesc}</p>
              <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-white/70 font-semibold">
                <svg className="w-3 h-3 text-mcs-orange" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                {tr.twBadge}
              </div>
              {/* TW R&D Illustration */}
              <div className="mt-6 rounded-xl overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                <TWRDIllustration className="w-full" />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Mobile bridge (shown on small screens) */}
        <div className="lg:hidden flex items-center justify-center gap-4 my-6">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mcs-orange/40 to-transparent" />
          <div className="bg-mcs-orange text-white rounded-full w-10 h-10 flex items-center justify-center text-lg font-black">×</div>
          <div className="h-px flex-1 bg-gradient-to-r from-transparent via-mcs-orange/40 to-transparent" />
        </div>

        {/* Global Bridge Illustration */}
        <ScrollReveal>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mt-12 rounded-2xl overflow-hidden border border-mcs-blue/20 shadow-xl"
          >
            <GlobalBridgeIllustration className="w-full" />
          </motion.div>
        </ScrollReveal>
      </div>
    </section>
  );
}
