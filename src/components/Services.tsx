"use client";

import { useState, useEffect, useCallback } from "react";
import { createPortal } from "react-dom";
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
import { useLanguage } from "@/contexts/LanguageContext";
import { translations } from "@/lib/translations";

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
      "台灣唯一擁有上百台實績。冷凍販賣機 + 冷凍微波加熱販賣機全系列。服務大型連鎖通路實戰經驗，食安管控業界領先。日本首都高速公路 MOU 指定合作。",
    image: "/images/products/frozen-microwave/th-21ms-catalog.png",
    tags: ["冷凍販賣機", "冷凍微波加熱", "食安管控", "日本MOU"],
    link: "/products/frozen-microwave",
  },
  {
    title: "Kiosk 自助點餐繳費機",
    subtitle: "東方美駁二導入實績 | 月省 1.5 位人力",
    description:
      "觸控自助點餐機整合繳費功能，支援悠遊卡、LINE Pay、街口、台灣 Pay 等 10+ 種支付方式。排隊等待時間縮短 35%、降低 30% 人工填單錯誤率，支援最高 11 種點餐語言，1 台抵 3 種外場服務。已於東方美駁二精緻餐酒館新品牌導入。",
    image: "/images/products/kiosk/kiosk-hero.png",
    tags: ["自助點餐", "多元支付", "多語言", "繳費整合", "東方美實績"],
  },
  {
    title: "WiXGo QR 掃碼點餐系統",
    subtitle: "免下載 · AI推薦 · 全通路整合 | 東方美駁二指定方案",
    description:
      "顧客手機掃桌上 QR Code 即可點餐，免下載 APP，支援內用外帶切換。AI 商品推薦三重演算法（熱銷品 × 顧客偏好 × 天氣時段）有效提升客單價。與 POS / KDS / GraBox 智取櫃全通路串接，訂單即時同步，東方美駁二新品牌指定採用。",
    image: "/images/products/wixgo/wixgo-hero.png",
    tags: ["QR點餐", "AI推薦", "免下載", "多元支付", "POS整合"],
  },
  {
    // 2026-08-19：連鎖早餐門市 AI 的技術能量入口。
    // 刻意不寫客戶名與效益百分比——這張卡導向的是能力說明頁，不是案例頁。
    title: "連鎖早餐門市 AI",
    subtitle: "技術能量 | 門市代理人 × 總部協同",
    description:
      "早餐生意的營收擠在開店後兩小時，系統要同時扛住結帳、出餐與外送派單。我們把門市 AI 拆成六項必須各自成立的能力：店長用通訊軟體自然語言操作、總部與門市雙層自治、加盟體系資料主權切分、廠商中立介接層、斷線續轉，以及智取櫃等設備事件整合。",
    image: "/images/illustrations/pos-kds.png",
    tags: ["門市 AI 代理人", "加盟資料主權", "廠商中立介接", "斷線續轉"],
    link: "/solutions/breakfast-chain-ai",
  },
  {
    // 橫向的技術能力頁：早餐連鎖那張是垂直應用，這張是底下的技術層。
    // 一樣不寫客戶名、不寫效益數字、不寫合作夥伴的產品名。
    title: "AI 技術能量",
    subtitle: "事件匯流 × 語意檢索 × 異常偵測 × 語音互動",
    description:
      "多數「導入 AI」失敗不是模型不夠好，是資料沒串起來——點餐、廚房、庫存、設備各看各的，AI 拿到片面資料，建議比店長的直覺還糟。我們把能力拆成四層，並寫清楚三個設計取捨各自的代價：推論集中雲端、模型只看資料結構不看原始資料、斷線時門市仍要能做生意。",
    image: "/images/illustrations/pos-kds.png",
    tags: ["事件驅動整合", "自然語言查詢", "需求預測", "斷線可降級"],
    link: "/technology/ai",
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

  const cardInner = (
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
        className="absolute inset-0"
        onClick={!hasLink ? () => onImageClick(service.image, service.title) : undefined}
      >
        <Image
          src={service.image}
          alt={`${service.title} — ${service.subtitle} | 銓幻元科技`}
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

          </div>

          {/* ── Hover glow orb ── */}
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-mcs-orange/0 group-hover:bg-mcs-orange/10 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-mcs-blue/0 group-hover:bg-mcs-blue/10 rounded-full blur-3xl transition-all duration-700 pointer-events-none" />
        </motion.div>
  );

  return (
    <StaggerItem>
      <TiltCard className="h-full">
        {hasLink ? (
          <Link href={service.link!} className="block h-full">{cardInner}</Link>
        ) : (
          cardInner
        )}
      </TiltCard>
    </StaggerItem>
  );
}

export default function Services() {
  const [lightboxSrc, setLightboxSrc] = useState<string | null>(null);
  const [lightboxAlt, setLightboxAlt] = useState("");
  const [mounted, setMounted] = useState(false);
  const { lang } = useLanguage();
  const tr = translations[lang].services;

  useEffect(() => { setMounted(true); }, []);

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

  const lightbox = lightboxSrc ? (
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
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 0.3 }}>
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
  ) : null;

  return (
    <>
      {mounted && createPortal(lightbox, document.body)}

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
                {lang === "zh" ? "全方位解決方案" : lang === "ja" ? "総合的なソリューション" : lang === "id" ? "Solusi Menyeluruh" : "Comprehensive Solutions"}
              </span>
            </motion.div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-mcs-blue-dark mb-4">
              {tr.title}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              {tr.subtitle}
            </p>
          </ScrollReveal>

          {/* ── Bento Grid ── */}
          <StaggerContainer
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4 lg:gap-5 auto-rows-auto"
            staggerDelay={0.1}
          >
            {services.map((service, index) => {
              const isFeatured = index < 2;
              const layoutClass =
                index < 2
                  ? "lg:col-span-3"
                  : "lg:col-span-2";

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
      </section>
    </>
  );
}
