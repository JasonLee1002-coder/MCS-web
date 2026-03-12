"use client";

import { LightboxImage } from "@/components/Lightbox";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

const features = [
  { title: "台灣研發", sub: "軟硬體設計製造" },
  { title: "AI 驅動", sub: "智慧化營運方案" },
  { title: "一站整合", sub: "從設備到系統" },
  { title: "客製化", sub: "OEM/ODM 貼牌服務" },
];

export default function About() {
  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      {/* Subtle decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-mcs-orange/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mcs-blue/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-6">
                關於 MCS
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                <strong className="text-mcs-blue-dark">
                  Meta Clearing Station Pte. Ltd.
                </strong>{" "}
                專注於 AI 智慧設備與商業系統的深度整合，為企業提供從硬體到軟體的完整數位化解決方案。
              </p>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                我們相信，透過智慧科技與商業流程的結合，能為餐飲、零售、企業等多元產業帶來更高效率的營運體驗。
                從 GraBox 智取櫃到雲端 POS 系統，MCS 是您數位轉型的最佳夥伴。
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.1}>
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="border-l-4 border-mcs-orange pl-4 hover:bg-mcs-orange/5 py-2 rounded-r-lg transition-colors duration-300">
                    <div className="text-2xl font-bold text-mcs-blue-dark">{f.title}</div>
                    <div className="text-sm text-gray-500">{f.sub}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right - Visual */}
          <ScrollReveal direction="right" distance={60}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <LightboxImage
                  src="/images/illustrations/factory.png"
                  alt="MCS 銓幻元科技台灣在地工廠 100% 台灣製造品質檢測"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-mcs-orange/10 rounded-full -z-10 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-mcs-blue/10 rounded-full -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
