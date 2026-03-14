"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollReveal, StaggerContainer, StaggerItem } from "@/components/motion";

const faqItems = [
  {
    q: "銓幻元科技提供哪些產品？",
    a: "我們提供 GraBox AI 智取櫃、智慧販賣機、冷凍微波販賣機、自助服務機（Kiosk）、OEM/ODM 貼牌客製等全系列智慧設備，搭配 POS/KDS 系統串接與雲端營運平台。所有產品 100% 台灣設計製造。",
  },
  {
    q: "GraBox AI 智取櫃跟一般取餐櫃有什麼不同？",
    a: "GraBox 內建 AI 訂餐系統、語音互動、人臉辨識取餐，標配常溫格位，可依需求客製冷藏/冷凍溫層，自帶雲端管理平台與數據分析。不像市面上的密碼鎖櫃，GraBox 是完整的智慧取餐解決方案。",
  },
  {
    q: "冷凍微波販賣機有外銷實績嗎？",
    a: "有的，我們的冷凍微波販賣機已外銷日本，部署於日本首都高速公路（Shuto Expressway）服務區，提供 24 小時無人化熱食供應，是 100% 台灣設計製造的產品。",
  },
  {
    q: "可以客製化品牌貼牌嗎？",
    a: "當然可以。我們提供完整的 OEM/ODM 服務，從外觀設計到軟體介面全客製，支援品牌 Logo、UI 貼牌，少量多樣彈性生產，軟硬體整合一站搞定。",
  },
  {
    q: "你們的售後服務範圍？",
    a: "全產品提供一年免費保固，可加購延長至三年。全台灣服務據點，到府安裝含場地評估、設備安裝、系統設定及員工教育訓練。",
  },
  {
    q: "冷凍販賣機跟冷凍微波販賣機有什麼差別？",
    a: "冷凍販賣機（TH-21FD/FS）適合販售冷凍食材讓消費者帶回家料理；冷凍微波販賣機（TH-21MS）內建 3600W 商用微波爐，消費者選購後機器自動加熱，直接取出即食熱餐。兩種機型皆搭配 MIT 雲端管理平台。",
  },
  {
    q: "販賣機設點有什麼條件？",
    a: "需要穩定電源（110V/220V）、適當室內空間與網路連線。我們提供完整的場地評估服務，包含人流分析、電力規劃、設備配置建議。歡迎聯繫我們免費場勘。",
  },
  {
    q: "有跟全家超商合作的經驗嗎？",
    a: "是的，銓幻元科技累積服務全家超商數百台智慧販賣機的實戰經驗，在食安管控、溫度監控、效期管理方面具備業界領先的技術能力。",
  },
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.q,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.a,
    },
  })),
};

function FAQItem({ item, index }: { item: typeof faqItems[0]; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`bg-mcs-gray rounded-xl border transition-all duration-300 ${
        open ? "border-mcs-orange/20 shadow-md" : "border-gray-100 hover:border-gray-200"
      }`}
    >
      <button
        className="flex items-center justify-between p-6 cursor-pointer font-medium text-gray-900 hover:text-mcs-orange transition-colors w-full text-left"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        <span className="pr-4">{item.q}</span>
        <motion.svg
          className="w-5 h-5 text-gray-400 flex-shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          strokeWidth={2}
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </motion.svg>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="overflow-hidden"
          >
            <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-4">
              {item.a}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-4">
            常見問題
          </h2>
          <p className="text-gray-600">
            關於銓幻元科技產品與服務的常見疑問
          </p>
        </ScrollReveal>
        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
          {faqItems.map((item, i) => (
            <StaggerItem key={i}>
              <FAQItem item={item} index={i} />
            </StaggerItem>
          ))}
        </StaggerContainer>
        <ScrollReveal className="mt-10 text-center">
          <p className="text-sm text-gray-400">
            想了解更多？
            <Link href="/products/grabox" className="text-mcs-orange hover:underline mx-1">GraBox 智取櫃</Link>
            ·
            <Link href="/products/frozen-microwave" className="text-mcs-orange hover:underline mx-1">冷凍微波販賣機</Link>
            ·
            <Link href="/blog" className="text-mcs-orange hover:underline mx-1">部落格知識庫</Link>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
