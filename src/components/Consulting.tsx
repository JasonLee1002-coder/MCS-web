"use client";

import { motion } from "framer-motion";
import { ScrollReveal, StaggerContainer } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Consulting() {
  const { lang } = useLanguage();
  const tr = translations[lang].consulting;

  return (
    <section id="consulting" className="py-24 bg-mcs-blue-dark relative overflow-hidden">
      {/* Background atmosphere */}
      <div className="absolute inset-0 hero-grid opacity-30" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-mcs-orange/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-mcs-purple/5 rounded-full blur-3xl pointer-events-none" />

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
            <motion.div
              key={i}
              className="group relative bg-white/5 border border-white/10 rounded-2xl p-8 hover:border-mcs-orange/30 transition-all duration-300 cursor-default overflow-hidden"
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              {/* Hover glow overlay */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-mcs-orange/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-24 h-24 bg-mcs-orange/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="relative z-10">
                <div className="text-5xl mb-5">{item.icon}</div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            </motion.div>
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
