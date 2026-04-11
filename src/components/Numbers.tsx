"use client";

import { AnimatedCounter, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function Numbers() {
  const { lang } = useLanguage();
  const tr = translations[lang].numbers;

  const stats = [
    { number: null, text: tr.v1, label: tr.l1, sub: "ACRA · Singapore" },
    { number: 6,    suffix: "+",  label: tr.l2, sub: lang === "zh" ? "完整服務項目" : lang === "ja" ? "完全なサービス" : lang === "id" ? "Layanan Lengkap" : "Full-stack services" },
    { number: 100,  suffix: "%",  label: tr.l3, sub: lang === "zh" ? "品質嚴格把關" : lang === "ja" ? "品質管理徹底" : lang === "id" ? "Kontrol Kualitas Ketat" : "Strict quality control" },
    { number: null, text: tr.v4,  label: tr.l4, sub: "TW · JP · SG" },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(232,117,26,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(232,117,26,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <StaggerContainer className="grid grid-cols-2 lg:grid-cols-4 gap-8" staggerDelay={0.15}>
          {stats.map((s) => (
            <StaggerItem key={s.label}>
              <div
                className="text-center glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors duration-500"
                role="group"
                aria-label={`${s.number !== null ? s.number + (s.suffix || "") : s.text} ${s.label}`}
              >
                <div className="text-4xl sm:text-5xl font-bold text-mcs-orange mb-2">
                  {s.number !== null ? (
                    <AnimatedCounter value={s.number} suffix={s.suffix} />
                  ) : (
                    s.text
                  )}
                </div>
                <div className="text-white font-medium mb-1">{s.label}</div>
                <div className="text-gray-400 text-sm">{s.sub}</div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}
