"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { ScrollReveal, StaggerContainer, StaggerItem, TiltCard } from "@/components/motion";

const services = [
  {
    title: "冷凍微波販賣機",
    subtitle: "🔥 主力產品 | 日本首都高速指定合作",
    description:
      "台灣唯一擁有上百台實績，100% 台製研發。搭載 3600W 商用微波，冷食瞬間變熱餐。服務全家超商數百台經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
    image: "/images/products/frozen-microwave/th-21ms-catalog.png",
    tags: ["冷凍微波加熱", "食安管控", "日本MOU", "台灣製造"],
    link: "/products/frozen-microwave",
  },
  {
    title: "GraBox 智取櫃",
    subtitle: "AI 訂餐 | 接線服務員",
    description:
      "結合 AI 技術的智慧取餐櫃，多種規格可選，適用於企業、餐廳、飯店等多元場景，實現無人化智慧取餐體驗。",
    image: "/images/cases/mwd/grabox-closeup.jpg",
    tags: ["多溫層可客製", "人臉辨識", "AI 訂餐"],
    link: "/products/grabox",
  },
  {
    title: "OEM / ODM 貼牌客製",
    subtitle: "可 100% 台灣製造",
    description:
      "提供完整的硬體客製化服務，從外觀設計到軟體介面，全程台灣製造，品質有保障。支援企業品牌貼牌需求。",
    image: "/images/illustrations/factory.png",
    tags: ["品牌客製", "台灣製造", "硬體設計"],
  },
  {
    title: "企業會員系統整合",
    subtitle: "ERP | 商務流程與資料分析平台",
    description:
      "整合企業會員管理、ERP 系統、商務流程自動化與資料分析平台，協助企業建立完整的數位化會員經營體系。",
    image: "/images/illustrations/partner.png",
    tags: ["會員管理", "ERP", "流程自動化"],
  },
  {
    title: "餐飲與零售系統串接",
    subtitle: "POS | KDS",
    description:
      "提供 POS 點餐系統、KDS 廚房顯示系統的完整串接，讓餐飲與零售業者輕鬆實現數位轉型。",
    image: "/images/illustrations/pos-kds.png",
    tags: ["POS", "KDS", "餐飲零售"],
  },
  {
    title: "雲端營運平台 + AI分析模組",
    subtitle: "數據驅動的營運管理",
    description:
      "提供雲端營運管理平台搭配 AI 分析模組，即時掌握營運數據、銷售趨勢與客戶行為，助力企業精準決策。",
    image: "/images/illustrations/hero.png",
    tags: ["雲端平台", "AI 分析", "營運管理"],
  },
];

export default function Services() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  useEffect(() => {
    if (lightboxSrc) {
      const handleKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") closeLightbox();
      };
      document.addEventListener("keydown", handleKey);
      document.body.style.overflow = "hidden";
      return () => {
        document.removeEventListener("keydown", handleKey);
        document.body.style.overflow = "";
      };
    }
  }, [lightboxSrc, closeLightbox]);

  return (
    <section id="services" className="py-24 bg-mcs-gray relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-4">
            智慧設備整合方案
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            從硬體設備到軟體系統，MCS 提供完整的一站式整合服務
          </p>
        </ScrollReveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" staggerDelay={0.12}>
          {services.map((service) => (
            <StaggerItem key={service.title}>
              <TiltCard className="h-full">
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 border border-gray-100/80 group card-glow h-full flex flex-col">
                  <div
                    className="relative h-48 overflow-hidden cursor-zoom-in"
                    onClick={() => {
                      setLightboxSrc(service.image);
                      setLightboxAlt(service.title);
                    }}
                  >
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <h3 className="text-lg font-bold text-mcs-blue-dark mb-1 group-hover:text-mcs-orange transition-colors duration-300">
                      {service.title}
                    </h3>
                    <p className="text-sm text-mcs-orange font-medium mb-3">
                      {service.subtitle}
                    </p>
                    <p className="text-gray-600 text-sm leading-relaxed mb-4 flex-1">
                      {service.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-xs bg-mcs-blue/5 text-mcs-blue px-3 py-1 rounded-full border border-mcs-blue/10 hover:bg-mcs-orange/10 hover:text-mcs-orange hover:border-mcs-orange/20 transition-colors duration-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    {"link" in service && service.link && (
                      <Link
                        href={service.link}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-mcs-orange hover:text-mcs-orange-light transition-colors"
                      >
                        了解更多
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                        </svg>
                      </Link>
                    )}
                  </div>
                </div>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>

      {lightboxSrc && (
        <div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-sm"
          onClick={closeLightbox}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition-colors"
            onClick={closeLightbox}
            aria-label="關閉"
          >
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          <Image
            src={lightboxSrc}
            alt={lightboxAlt}
            width={1920}
            height={1080}
            className="max-w-full max-h-[90vh] object-contain"
            onClick={(e) => e.stopPropagation()}
            quality={90}
          />
        </div>
      )}
    </section>
  );
}
