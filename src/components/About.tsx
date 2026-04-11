"use client";

import Link from "next/link";
import { LightboxImage } from "@/components/Lightbox";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

export default function About() {
  const { lang } = useLanguage();
  const tr = translations[lang].about;

  const features = [
    { title: tr.feat1t, sub: tr.feat1d },
    { title: tr.feat2t, sub: tr.feat2d },
    { title: tr.feat3t, sub: tr.feat3d },
    { title: tr.feat4t, sub: tr.feat4d },
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-mcs-orange/3 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-mcs-blue/3 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left — Text */}
          <div>
            <ScrollReveal>
              <div className="inline-flex items-center gap-2 sg-badge mb-4">
                🇸🇬 {tr.subtitle}
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-6">
                {tr.title}
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <p className="text-lg text-gray-600 leading-relaxed mb-6">
                {tr.desc}
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-base text-gray-500 leading-relaxed mb-8">
                {lang === "zh"
                  ? <>從 <Link href="/products/grabox" className="text-mcs-orange hover:underline font-medium">GraBox AI 智取櫃</Link>到<Link href="/products/frozen-microwave" className="text-mcs-orange hover:underline font-medium">冷凍微波販賣機</Link>，再到雲端 POS/KDS 系統，MCS 是您數位轉型的最佳夥伴。</>
                  : lang === "ja"
                  ? <>GraBox AIスマートキャビネットから冷凍電子レンジ自販機、クラウドPOS/KDSシステムまで、MCSはデジタルトランスフォーメーションの最良のパートナーです。</>
                  : lang === "id"
                  ? <>Dari GraBox AI Smart Cabinet hingga mesin vending microwave beku dan sistem cloud POS/KDS, MCS adalah mitra terbaik transformasi digital Anda.</>
                  : <>From GraBox AI Smart Cabinets to frozen microwave vending machines and cloud POS/KDS systems, MCS is your ideal digital transformation partner.</>
                }
              </p>
            </ScrollReveal>

            <StaggerContainer className="grid grid-cols-2 gap-6" staggerDelay={0.1}>
              {features.map((f) => (
                <StaggerItem key={f.title}>
                  <div className="border-l-4 border-mcs-orange pl-4 hover:bg-mcs-orange/5 py-2 rounded-r-lg transition-colors duration-300">
                    <div className="text-xl font-bold text-mcs-blue-dark">{f.title}</div>
                    <div className="text-sm text-gray-500">{f.sub}</div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Right — Visual */}
          <ScrollReveal direction="right" distance={60}>
            <div className="relative">
              <div className="rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-500">
                <LightboxImage
                  src="/images/illustrations/factory.png"
                  alt="MCS Taiwan R&D factory — 100% Taiwan-Made hardware manufacturing"
                  width={600}
                  height={400}
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-mcs-orange/10 rounded-full -z-10 animate-pulse" />
              <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-mcs-blue/10 rounded-full -z-10 animate-pulse" style={{ animationDelay: "1s" }} />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
