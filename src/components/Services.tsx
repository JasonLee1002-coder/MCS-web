"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TiltCard,
  GlowPulse,
} from "@/components/motion";

const services = [
  {
    title: "GraBox 智取櫃",
    subtitle: "主力產品 | AI 訂餐 · 接線服務員",
    description:
      "結合 AI 技術的智慧取餐櫃，多種規格可選，適用於企業、餐廳、飯店等多元場景，實現無人化智慧取餐體驗。100% 台灣設計製造。",
    image: "/images/cases/mwd/grabox-closeup.jpg",
    tags: ["多溫層可客製", "人臉辨識", "AI 訂餐", "台灣製造"],
    link: "/products/grabox",
  },
  {
    title: "冷凍販賣機 · 冷凍微波機",
    subtitle: "日本首都高速指定合作 | 食安管控",
    description:
      "台灣唯一擁有上百台實績。冷凍販賣機 + 冷凍微波加熱販賣機全系列。服務全家超商數百台經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
    image: "/images/products/frozen-microwave/th-21ms-catalog.png",
    tags: ["冷凍販賣機", "冷凍微波加熱", "食安管控", "日本MOU"],
    link: "/products/frozen-microwave",
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

/* ── Bento grid layout config ── */
// First 2 are featured (large), last 4 are standard (small)
const bentoLayout = [
  // Row 1: two featured items side by side
  "md:col-span-3 md:row-span-2", // GraBox - large left
  "md:col-span-3 md:row-span-2", // 冷凍販賣機 - large right
  // Row 2: four smaller items
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2",
  "md:col-span-2 md:col-start-2", // center the last one visually? No — let's do 3 + 3 for 6 cols
];

// Actually, let's use a proper 6-col grid:
// Featured: each spans 3 cols, 2 rows tall
// Small: each spans 1.5 cols = 2 cols in a 6-col grid... let's use a clean approach

function BentoCard({
  service,
  index,
  isFeatured,
  onImageClick,
}: {
  service: (typeof services)[number];
  index: number;
  isFeatured: boolean;
  onImageClick: (src: string, alt: string) => void;
}) {
  const hasLink = "link" in service && service.link;

  return (
    <StaggerItem>
      <TiltCard className="h-full">
        <motion.div
          className={`
            relative group h-full rounded-2xl overflow-hidden
            border border-white/10
            bg-gradient-to-br from-[#0F2440]/95 via-[#1B3A5C]/90 to-[#0F2440]/95
            backdrop-blur-xl
            cursor-pointer
            ${isFeatured ? "min-h-[420px] sm:min-h-[480px]" : "min-h-[320px] sm:min-h-[360px]"}
          `}
          whileHover={{
            boxShadow: "0 0 40px rgba(232,117,26,0.25), 0 20px 60px rgba(0,0,0,0.4)",
          }}
          transition={{ duration: 0.4 }}
        >
          {/* ── Animated gradient border ── */}
          <div className="absolute inset-0 rounded-2xl p-[1px] -z-0 overflow-hidden">
            <motion.div
              className="absolute inset-[-200%] bg-[conic-gradient(from_0deg,transparent_0%,#E8751A_10%,transparent_20%,transparent_100%)]"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0 }}
              whileHover={{ opacity: 0.6 }}
            />
          </div>

          {/* ── Background image with overlay ── */}
          <div
            className="absolute inset-0 cursor-zoom-in"
            onClick={() => onImageClick(service.image, service.title)}
          >
            <Image
              src={service.image}
              alt={service.title}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
            />
            {/* Dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0F2440] via-[#0F2440]/80 to-[#0F2440]/30 group-hover:via-[#0F2440]/70 group-hover:to-[#0F2440]/20 transition-all duration-500" />
          </div>

          {/* ── Number indicator ── */}
          <div className="absolute top-4 left-4 z-10">
            <motion.div
              className="flex items-center justify-center w-10 h-10 rounded-full border border-white/20 bg-white/5 backdrop-blur-sm"
              whileHover={{ scale: 1.1, borderColor: "rgba(232,117,26,0.6)" }}
            >
              <span className="text-sm font-bold text-white/60 group-hover:text-mcs-orange transition-colors duration-300">
                {String(index + 1).padStart(2, "0")}
              </span>
            </motion.div>
          </div>

          {/* ── Featured badge ── */}
          {isFeatured && (
            <div className="absolute top-4 right-4 z-10">
              <GlowPulse>
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-mcs-orange/20 border border-mcs-orange/40 backdrop-blur-sm text-xs font-semibold text-mcs-orange">
                  <span className="w-1.5 h-1.5 rounded-full bg-mcs-orange animate-pulse" />
                  主力產品
                </span>
              </GlowPulse>
            </div>
          )}

          {/* ── Content overlay ── */}
          <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-8 z-10">
            {/* Subtitle */}
            <motion.p
              className="text-mcs-orange text-xs sm:text-sm font-semibold tracking-wide uppercase mb-2"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + index * 0.05 }}
            >
              {service.subtitle}
            </motion.p>

            {/* Title */}
            <h3
              className={`font-bold text-white mb-3 leading-tight group-hover:text-mcs-orange transition-colors duration-300 ${
                isFeatured ? "text-2xl sm:text-3xl" : "text-xl sm:text-2xl"
              }`}
            >
              {service.title}
            </h3>

            {/* Description - slides up on hover */}
            <motion.div
              className="overflow-hidden"
              initial={false}
            >
              <p
                className={`text-white/70 leading-relaxed mb-4 transition-all duration-500 ${
                  isFeatured
                    ? "text-sm sm:text-base line-clamp-3 group-hover:line-clamp-none"
                    : "text-sm line-clamp-2 group-hover:line-clamp-none"
                }`}
              >
                {service.description}
              </p>
            </motion.div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {service.tags.map((tag, tagIndex) => (
                <motion.span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full border border-white/15 bg-white/5 text-white/80 backdrop-blur-sm hover:bg-mcs-orange/20 hover:border-mcs-orange/40 hover:text-mcs-orange transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + tagIndex * 0.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* CTA Link */}
            {hasLink && (
              <Link
                href={service.link!}
                className="inline-flex items-center gap-2 text-sm font-semibold text-mcs-orange hover:text-mcs-orange-light transition-colors group/link"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="relative">
                  了解更多
                  <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-mcs-orange group-hover/link:w-full transition-all duration-300" />
                </span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  whileHover={{ x: 4 }}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13 7l5 5m0 0l-5 5m5-5H6"
                  />
                </motion.svg>
              </Link>
            )}
          </div>

          {/* ── Hover glow orb ── */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-mcs-orange/0 group-hover:bg-mcs-orange/10 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-mcs-blue/0 group-hover:bg-mcs-blue/10 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />
        </motion.div>
      </TiltCard>
    </StaggerItem>
  );
}

export default function Services() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");

  const closeLightbox = useCallback(() => setLightboxSrc(null), []);

  const openLightbox = useCallback((src: string, alt: string) => {
    setLightboxSrc(src);
    setLightboxAlt(alt);
  }, []);

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
    <section id="services" className="py-24 bg-mcs-gray relative overflow-hidden">
      {/* ── Background decoration ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-mcs-orange/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-mcs-blue/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* ── Section Header ── */}
        <ScrollReveal className="text-center mb-16">
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mcs-blue-dark/5 border border-mcs-blue-dark/10 mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <span className="w-2 h-2 rounded-full bg-mcs-orange animate-pulse" />
            <span className="text-sm font-medium text-mcs-blue-dark/70">
              全方位解決方案
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mcs-blue-dark mb-4">
            智慧設備整合方案
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            從硬體設備到軟體系統，MCS 提供完整的一站式整合服務
          </p>
        </ScrollReveal>

        {/* ── Bento Grid ── */}
        <StaggerContainer
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 auto-rows-auto"
          staggerDelay={0.1}
        >
          {services.map((service, index) => {
            const isFeatured = index < 2;
            // Layout classes for the bento grid
            const layoutClass =
              index < 2
                ? "lg:col-span-3" // Featured: half width each
                : "lg:col-span-2"; // Small: one-third width each (2 of 6)

            return (
              <div key={service.title} className={layoutClass}>
                <BentoCard
                  service={service}
                  index={index}
                  isFeatured={isFeatured}
                  onImageClick={openLightbox}
                />
              </div>
            );
          })}
        </StaggerContainer>
      </div>

      {/* ── Lightbox ── */}
      {lightboxSrc && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out backdrop-blur-md"
          onClick={closeLightbox}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <button
            className="absolute top-4 right-4 text-white/70 hover:text-white z-10 transition-colors"
            onClick={closeLightbox}
            aria-label="關閉"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Image
              src={lightboxSrc}
              alt={lightboxAlt}
              width={1920}
              height={1080}
              className="max-w-full max-h-[90vh] object-contain rounded-lg"
              onClick={(e) => e.stopPropagation()}
              quality={90}
            />
          </motion.div>
        </motion.div>
      )}
    </section>
  );
}
