"use client";

import { AnimatedCounter, StaggerContainer, StaggerItem } from "@/components/motion";

const stats = [
  { number: 20, suffix: "+", label: "品牌販賣機部署", sub: "麗嬰國際 Funbox" },
  { number: 7, suffix: "+", label: "跨產業成功案例", sub: "餐飲·玩具·旅宿·宮廟" },
  { number: 100, suffix: "%", label: "台灣設計製造", sub: "品質嚴格把關" },
  { number: null, text: "JP", label: "外銷日本實績", sub: "首都高速公路服務區" },
];

export default function Numbers() {
  return (
    <section className="py-20 bg-gradient-to-r from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark relative overflow-hidden">
      {/* Subtle grid overlay */}
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
              <div className="text-center glass-card rounded-2xl p-6 hover:bg-white/5 transition-colors duration-500" role="group" aria-label={`${s.number !== null ? s.number + (s.suffix || "") : s.text} ${s.label}`}>
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
