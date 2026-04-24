"use client";

import React, { useState, useEffect, useRef, createContext, useContext } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

// ─── Animation Helpers ────────────────────────────────────────────────────────

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0 },
};

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Section card header — used at top of every major case/section card
function CaseHeader({
  color, title, badge, extra, accentLine = "#E8751A",
}: {
  color: string; title: string; badge?: string; extra?: React.ReactNode; accentLine?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -24 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className={`${color} text-white px-6 py-5 flex items-center justify-between flex-wrap gap-3 relative overflow-hidden`}
    >
      {/* Accent stripe on left */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5" style={{ background: accentLine }} />
      {/* Subtle diagonal shimmer */}
      <div className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 40%, #fff 50%, transparent 60%)" }} />
      <div className="pl-1">
        {badge && (
          <span className="text-xs font-bold bg-white/25 px-2.5 py-0.5 rounded-full mr-3 tracking-wide">{badge}</span>
        )}
        <span className="font-black text-2xl tracking-tight">{title}</span>
      </div>
      {extra && <div className="flex gap-2">{extra}</div>}
    </motion.div>
  );
}

// Sub-section divider — used inside cards for sub-segments (e.g. MPS Japan payment)
function SubBanner({
  bg = "bg-[#1B3A5C]", title, badge, badgeBg = "bg-green-500", accentLine = "#E8751A",
}: {
  bg?: string; title: string; badge?: string; badgeBg?: string; accentLine?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className={`${bg} px-5 py-4 flex items-center gap-3 relative overflow-hidden`}
    >
      {/* Left accent bar */}
      <div className="absolute left-0 top-0 bottom-0 w-1" style={{ background: accentLine }} />
      {/* Shimmer */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ background: "linear-gradient(105deg, transparent 35%, #fff 50%, transparent 65%)" }} />
      <div className="pl-1 flex-1 flex items-center gap-3">
        <span className="font-black text-lg text-white tracking-tight leading-none">{title}</span>
        {badge && (
          <motion.span
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
            className={`${badgeBg} text-white text-xs font-black px-3 py-1 rounded-full shadow-lg flex-shrink-0`}
          >
            {badge}
          </motion.span>
        )}
      </div>
    </motion.div>
  );
}

// ─── Lightbox (click-to-zoom) ─────────────────────────────────────────────────

const LightboxCtx = createContext<(src: string) => void>(() => {});

function ZoomImg({
  src, alt, fill, width, height, className,
}: {
  src: string; alt: string; fill?: boolean;
  width?: number; height?: number; className?: string;
}) {
  const zoom = useContext(LightboxCtx);
  if (fill) {
    return (
      <>
        <Image src={src} alt={alt} fill className={className ?? "object-cover"} />
        <div
          className="absolute inset-0 cursor-zoom-in group/zoom flex items-center justify-center"
          onClick={() => zoom(src)}
        >
          <div className="absolute inset-0 bg-black/0 group-hover/zoom:bg-black/20 transition-colors duration-200" />
          <span className="relative z-10 opacity-0 group-hover/zoom:opacity-100 text-white text-3xl drop-shadow-xl transition-opacity duration-200 select-none pointer-events-none">⊕</span>
        </div>
      </>
    );
  }
  return (
    <div className="cursor-zoom-in relative group/zoom" onClick={() => zoom(src)}>
      <Image src={src} alt={alt} width={width ?? 800} height={height ?? 600} className={className} />
      <div className="absolute inset-0 bg-black/0 group-hover/zoom:bg-black/20 transition-colors duration-200 flex items-center justify-center">
        <span className="opacity-0 group-hover/zoom:opacity-100 text-white text-3xl drop-shadow-xl transition-opacity duration-200 select-none">⊕</span>
      </div>
    </div>
  );
}

function CountUp({ target, duration = 1.6 }: { target: string; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!inView) return;
    const numeric = parseFloat(target.replace(/[^0-9.]/g, ""));
    const suffix = target.replace(/[0-9.]/g, "");
    if (isNaN(numeric)) { setDisplay(target); return; }
    let start = 0;
    const steps = 40;
    const stepTime = (duration * 1000) / steps;
    const inc = numeric / steps;
    const timer = setInterval(() => {
      start += inc;
      if (start >= numeric) { setDisplay(target); clearInterval(timer); }
      else setDisplay(Math.floor(start) + suffix);
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  return <span ref={ref}>{display}</span>;
}

// ─── Translations ─────────────────────────────────────────────────────────────
const T = {
  zh: {
    nav: { home: "首頁", back: "← 返回官網" },
    hero: {
      badge: "AI × 硬體 × 平台 — 全自主掌控",
      title: "從硬體設計到 AI 雲端平台",
      titleAccent: "全自主掌控",
      sub: "MCS 銓幻元科技 — 不是賣設備，是以 AI + IoT 取代人工服務流程的智慧設備平台。從機構設計、韌體控制到 OmniCore 雲端 AI，每一層都自主設計、整合、維運。",
      cta: "預約產品展示",
      stats: [
        { num: "20+", label: "年業界經驗" },
        { num: "200+", label: "全家超商智販機（2026起）" },
        { num: "10+", label: "智慧設備機型" },
        { num: "100%", label: "MIT 台灣研發製造" },
      ],
    },
    stack: {
      label: "核心競爭力",
      title: "五層全棧整合能力",
      sub: "MCS 不是設備經銷商，而是從最底層硬體到最上層 AI 決策，全部自主設計與整合的技術公司。",
      layers: [
        {
          num: "L1", name: "硬體設備", en: "Hardware Devices",
          color: "bg-[#1B3A5C] text-white",
          chipColor: "bg-blue-100 text-blue-900",
          items: ["雙面智取櫃 GraBox", "常溫智販機", "冷藏智販機", "冷凍＋微波智販機", "常溫雙面智取櫃", "自助 Kiosk", "卡機支付終端", "客製 OEM 機型"],
        },
        {
          num: "L2", name: "機電整合 · 韌體控制", en: "Electromechanics & Firmware",
          color: "bg-[#E8751A] text-white",
          chipColor: "bg-orange-100 text-orange-900",
          items: ["板金機構設計", "製冷 / 保溫 / 加熱模組", "格子鎖控制板", "TOF 感測器 / 門磁", "UV 消毒燈控制", "條碼 / QR Reader", "EMV SAM 卡模組", "自動門機電控制"],
        },
        {
          num: "L3", name: "前端銷售系統", en: "On-Device Frontend",
          color: "bg-[#1a7a4a] text-white",
          chipColor: "bg-green-100 text-green-900",
          items: ["觸控購物介面設計", "多元支付整合", "電子發票開立", "購物車 / 促銷活動", "會員點數 / 禮券", "廣告媒體版位管理", "O2O 線上訂 / 線下取", "離線備援機制"],
        },
        {
          num: "L4", name: "雲端管理平台", en: "Cloud Management Platform",
          color: "bg-[#5B2D8E] text-white",
          chipColor: "bg-purple-100 text-purple-900",
          items: ["設備即時狀態監控", "交易紀錄與報表分析", "庫存 / 補貨管理", "食安溫控稽核紀錄", "Line Notify 主動告警", "多租戶後台隔離", "AI 補貨預測模組", "SLA 維保排程管理"],
        },
        {
          num: "L5", name: "對外系統介接", en: "External System Integration",
          color: "bg-[#0A9396] text-white",
          chipColor: "bg-teal-100 text-teal-900",
          items: ["超商 POS 系統", "ERP（富士通 / 鼎新）", "會員平台（Ocard / 91APP）", "電商平台（SHOPLINE）", "金流（精誠 / 悠遊卡 / LINE Pay）", "員工卡（台積電 / Garmin）", "MPS Japan 無人機台支付", "Lalamove 即時派送"],
        },
      ],
    },
    platform: {
      label: "後台平台",
      title: "OmniCore 智慧設備管理系統",
      sub: "專為智慧設備設計的多租戶雲端作業系統。一個後台管理全部設備、全部客戶、全部數據。",
      features: [
        { icon: "📡", name: "設備即時監控", desc: "網路狀態、機台溫度、格子狀態、庫存水位，即時掌握。" },
        { icon: "📊", name: "交易 & 營業報表", desc: "按機台、場域、商品、日期多維度切片，快速洞察銷售趨勢。" },
        { icon: "🔔", name: "主動異常通報", desc: "整合 Line Notify，溫度異常、低庫存、交易失敗即時推播。" },
        { icon: "🛡️", name: "食安溫控稽核", desc: "設定溫度上下限，超標自動鎖貨，完整稽核紀錄備查。" },
        { icon: "🚚", name: "補貨 & 倉儲管理", desc: "撿貨單、補貨單、庫存盤點表一鍵匯出，AI 補貨預測模組。" },
        { icon: "🎯", name: "促銷活動模組", desc: "折扣碼、組合促銷、時間限定活動，無需工程師即可上架。" },
        { icon: "👤", name: "會員 & 點數整合", desc: "OMO 線上線下融合，消費累點、禮券兌換、推播行銷。" },
        { icon: "🏢", name: "多租戶隔離架構", desc: "每個客戶獨立後台，數據完全隔離，支援品牌客製化。" },
      ],
      integLabel: "已整合第三方系統",
      integGroups: [
        {
          title: "金流支付",
          items: ["精誠資訊", "英特拉", "悠遊卡 EasyCard", "LINE Pay", "街口支付", "Apple Pay", "信用卡 EMV"],
        },
        {
          title: "ERP & 後台",
          items: ["富士通 Fujitsu ERP", "鼎新 Digiwin ERP", "超商內部管理平台"],
        },
        {
          title: "會員 & 電商",
          items: ["Ocard 會員平台", "SHOPLINE", "91APP", "Pointsoft"],
        },
        {
          title: "場域 & 物流",
          items: ["Lalamove", "各企業員工卡系統", "台積電 / Garmin / 聯詠"],
        },
      ],
    },
    ebplus: {
      label: "台灣指標客戶",
      title: "東方美集團 × OmniCore 全通路自助化",
      badge: "970+ 門市・台灣指標早午餐連鎖",
      roleChip: "MCS 角色：軟體整合商 ＋ 平台提供商",
      sub: "MCS 不是東方美的硬體供應商——我們是協助 970+ 連鎖早午餐門市完成全通路「自助化」的技術夥伴。從 GraBox 取餐、LINE 點餐到 192 台配送車調度，全部透過 OmniCore 統一串接。",
      roleNote: "✦ 自助化 ≠ 無人化。MCS 協助讓我們的合作夥伴從重複人工動作中解放，專注於真正有價值的服務品質。",
      stats: [
        { num: "970+", label: "連鎖門市" },
        { num: "50台", label: "2026 H2 首批 GraBox 出貨" },
        { num: "192台", label: "配送車 GPS 調度（OmniCore 內建）" },
        { num: "1%", label: "月 GMV 平台費" },
      ],
      features: [
        "LINE LIFF 點餐 → GraBox 自取，免等叫號",
        "192 台配送車 GPS 即時追蹤 ＋ 路線優化",
        "970 門市庫存水位即時掌握",
        "導入 OmniCore 後，企業僅需自建 IT 成本的 5–12%",
      ],
    },
    xiangyao: {
      label: "封閉場域客戶",
      title: "翔耀實業 × 封閉場域智販機",
      badge: "軍事基地・移工宿舍・工廠",
      sub: "翔耀實業（母公司嵩達光電，上櫃申請中）在封閉場域擁有無可複製的進場能力。MCS 提供設備與 OmniCore 平台，翔耀出場域，合作公式：場域換技術，收入按比例分潤。",
      stats: [
        { num: "封閉場域", label: "軍方・移工宿舍・工廠・診所" },
        { num: "悠遊卡", label: "移工最熟悉的支付，無需手機" },
        { num: "24hr", label: "封閉場域全天候無人服務" },
      ],
      features: [
        "常溫 / 冷藏販賣機：零食、飲料、泡麵、日用品",
        "悠遊卡 / 一卡通（移工友善，不需手機）",
        "電信儲值服務整合（每筆代辦費 NT$7）",
        "OmniCore 遠端監控：補貨預測 ＋ 設備異常通報",
      ],
    },
    weche: {
      label: "戰略製造夥伴",
      title: "微勤電機 — MIT 機電製造核心",
      sub: "MCS 與微勤電機深度整合軟硬體，林口整備廠支援大量出貨，100% 台灣研發製造。",
      badge: "獨家 OEM 合作夥伴",
      points: [
        { icon: "🏭", title: "林口整備廠", desc: "大型組裝產線，支援量產出貨需求，快速回應客製規格。" },
        { icon: "⚙️", title: "機電整合專業", desc: "機構設計、製冷系統、機電控制，超過 20 年硬體製造經驗。" },
        { icon: "📋", title: "多元設備認證", desc: "展示間備有各項設備認證文件，支援出口合規需求。" },
        { icon: "🤝", title: "OEM 啟動合作", desc: "2023 年正式啟動 OEM 合作計畫，軟體 + 硬體客製一站完成。" },
      ],
    },
    mit: {
      label: "100% 台灣製造",
      title: "自有研發製造能力",
      sub: "MCS 擁有台灣本地工程團隊與製造夥伴，從機構設計、控制板研發到整機出廠測試，全程在台灣完成。",
      points: [
        { icon: "🏭", title: "機構量產能力", desc: "台灣工廠支援快速打樣與量產出貨，設備機構規格可客製。" },
        { icon: "🔬", title: "PCB 控制板研發", desc: "自有工程師開發格子控制板、支付模組、感測器整合板。" },
        { icon: "🧪", title: "整機出廠測試", desc: "每台設備出貨前進行完整功能驗收，確保品質穩定。" },
      ],
    },
    cases: {
      label: "成功案例",
      title: "已驗證的落地實績",
      sub: "從台灣最大超商到日本高速公路，MCS 在不同場域持續驗證整合能力。",
      fm: {
        title: "全家超商 FamilyMart",
        badge: "台灣最大連鎖超商",
        tabs: ["智慧販賣機", "智取櫃 FamiNow"],
        vendingTitle: "全家超商智慧販賣機",
        vendingDesc: "與全家超商合作，將販賣機部署至科學園區、大學、觀光飯店等場域，整合全家 POS 系統、時控條碼、友善食光折扣、員工卡支付（台積電、Garmin 等）。",
        vendingStats: ["200+ 台部署（2026 起，每年 +100 台）", "整合全家 POS 系統", "多元場域：科學園區 / 大學 / 觀光飯店"],
        pickupTitle: "FamiNow 智取櫃整合",
        pickupDesc: "全家 FamiNow 平台與 MCS 智取櫃整合，實現 APP 下單 → 格子取貨 O2O 流程，部署於捷運十四張站，整合全家 POS、APP 商品追蹤、自取點選擇介面。",
        pickupStats: ["App 下單 → 格子取貨 O2O", "整合 FamiNow APP & 全家 POS", "捷運站場域試營運"],
      },
      mwd: {
        title: "麥味登 知名早餐連鎖",
        badge: "台灣最大早餐連鎖品牌之一",
        desc: "MCS 以 90 天完成麥味登智取櫃軟硬體整合，從機構設計、韌體控制到雲端後台一手包辦，贏得指標性合約。UV 殺菌、雷射感應、雙面存取，完整食安機制。",
        stats: ["90 天完成整合（含硬體開發）", "贏過外國知名大廠競標", "UV 殺菌 + 雷射感應旗艦版"],
      },
      frozen: {
        label: "冷凍・冷藏設備",
        title: "冷凍・冷藏・微波智販機",
        badge: "通路客戶 · 全台穩定部署",
        sub: "MCS 在冷凍、冷藏、微波加熱智販機控制上累積多年實戰技術。通路客戶於全台各場域穩定運行超過 300 台。",
        stats: ["300+ 台通路客戶部署中", "多年冷凍 / 冷藏 / 微波控制技術", "多場域穩定運行驗證"],
      },
      shutoko: {
        title: "日本首都高速道路",
        badge: "日本 PA 冷凍微波智販機",
        desc: "與日本首都高速道路合作，開發 PA（休息站）專用冷凍 + 微波一體智販機。已簽訂 NDA 及 MOU，PSE 認證進行中。整合 MP-Solution Japan 無人機台支付系統。",
        stats: ["NDA + MOU 已簽訂", "PSE 認證進行中", "MPS Japan 支付整合", "SA/PA 877 據點展開計畫（日方文件）"],
      },
      more: {
        title: "更多合作客戶",
        items: [
          { name: "必勝客", desc: "2in1 Food Locker：常溫雙面智取櫃 + 線下取訂單整合" },
          { name: "麗嬰國際", desc: "玩具智販機，整合鼎新 ERP 系統" },
          { name: "N&W Group", desc: "健身食品智販機，整合 Ocard 會員系統" },
          { name: "昇恆昌機場", desc: "商品販售 + 活動兌換 + 廣告宣傳" },
          { name: "滙聚食品", desc: "多機型智販機加盟營運商，抽獎互動遊戲模組" },
          { name: "台灣高鐵", desc: "紀念品販售智販機" },
          { name: "霹靂布袋戲", desc: "IP 文創周邊、盲盒智販機" },
          { name: "全省 15 個郵局", desc: "郵局電商商品展示兌換機" },
        ],
      },
    },
    contact: {
      label: "聯絡我們",
      title: "歡迎洽談合作",
      sub: "無論是整機採購、OEM/ODM 客製、軟體授權或系統整合，歡迎與我們討論需求。",
      cta: "前往官網了解更多",
      email: "聯絡信箱",
      web: "官方網站",
    },
  },

  en: {
    nav: { home: "Home", back: "← Back to Website" },
    hero: {
      badge: "AI · Hardware · Platform — Fully In-House",
      title: "We Don't Sell Hardware.",
      titleAccent: "We Replace Manual Workflows with AI.",
      sub: "MCS builds smart device platforms — from cabinet mechanism to cloud AI — entirely in-house. One partner for hardware, firmware, on-device software, OmniCore cloud, and third-party integrations.",
      cta: "Request a Demo",
      stats: [
        { num: "20+", label: "Years of Industry Experience" },
        { num: "200+", label: "FamilyMart Units (from 2026)" },
        { num: "10+", label: "Device Types" },
        { num: "100%", label: "Made in Taiwan" },
      ],
    },
    stack: {
      label: "Core Capabilities",
      title: "5-Layer Full-Stack Integration",
      sub: "MCS is not a device reseller. From raw hardware to AI decision-making, every layer is designed and integrated in-house.",
      layers: [
        {
          num: "L1", name: "Hardware Devices", en: "Hardware Devices",
          color: "bg-[#1B3A5C] text-white",
          chipColor: "bg-blue-100 text-blue-900",
          items: ["GraBox Smart Pickup Cabinet", "Ambient Vending Machine", "Chilled Vending Machine", "Frozen + Microwave Vending", "Ambient Dual-Side Smart Pickup Cabinet", "Self-Order Kiosk", "Cashless Payment Terminal", "Custom OEM Devices"],
        },
        {
          num: "L2", name: "Electromechanics & Firmware", en: "Electromechanics & Firmware",
          color: "bg-[#E8751A] text-white",
          chipColor: "bg-orange-100 text-orange-900",
          items: ["Sheet Metal & Mechanical Design", "Refrigeration / Heating Modules", "Locker Control PCB", "TOF Sensor / Door Sensor", "UV Sterilization Control", "Barcode / QR Reader", "EMV SAM Card Module", "Auto-Door Electromechanics"],
        },
        {
          num: "L3", name: "On-Device Frontend", en: "On-Device Frontend",
          color: "bg-[#1a7a4a] text-white",
          chipColor: "bg-green-100 text-green-900",
          items: ["Touchscreen UI Design", "Multi-Payment Integration", "E-Invoice Generation", "Cart & Promotions", "Member Points / Vouchers", "Ad Media Management", "O2O Online-to-Offline", "Offline Failover Mode"],
        },
        {
          num: "L4", name: "Cloud Management Platform", en: "Cloud Management Platform",
          color: "bg-[#5B2D8E] text-white",
          chipColor: "bg-purple-100 text-purple-900",
          items: ["Real-time Device Monitoring", "Transaction & Sales Reports", "Inventory & Restocking", "Food Safety Temperature Audit", "LINE Notify Proactive Alerts", "Multi-tenant Architecture", "AI Restocking Prediction", "SLA Maintenance Scheduling"],
        },
        {
          num: "L5", name: "External System Integration", en: "External System Integration",
          color: "bg-[#0A9396] text-white",
          chipColor: "bg-teal-100 text-teal-900",
          items: ["Convenience Store POS", "ERP (Fujitsu / Digiwin)", "Loyalty (Ocard / 91APP)", "E-Commerce (SHOPLINE)", "Payment (EasyCard / LINE Pay)", "Employee Card Systems", "MPS Japan Cashless", "Lalamove Express Delivery"],
        },
      ],
    },
    platform: {
      label: "Platform",
      title: "OmniCore Smart Device OS",
      sub: "A multi-tenant cloud operating system purpose-built for smart devices. One dashboard for all devices, all clients, all data.",
      features: [
        { icon: "📡", name: "Real-time Device Monitoring", desc: "Network status, temperature, locker state, inventory levels — always in view." },
        { icon: "📊", name: "Transaction & Sales Reports", desc: "Slice by device, location, product, or date. Spot trends instantly." },
        { icon: "🔔", name: "Proactive Anomaly Alerts", desc: "LINE Notify integration: temperature spikes, low stock, failed transactions — notified immediately." },
        { icon: "🛡️", name: "Food Safety Temperature Audit", desc: "Set upper/lower limits. Auto-lock on breach. Complete audit trail." },
        { icon: "🚚", name: "Restocking & Inventory Mgmt", desc: "One-click pick lists, restock sheets, and inventory counts. AI prediction module included." },
        { icon: "🎯", name: "Promotion Engine", desc: "Discount codes, bundle deals, time-limited campaigns — no engineer needed to deploy." },
        { icon: "👤", name: "Member & Loyalty Integration", desc: "OMO loyalty: earn points in-store, redeem online. Push marketing campaigns." },
        { icon: "🏢", name: "Multi-tenant Architecture", desc: "Fully isolated per client. Each tenant has their own dashboard and branding." },
      ],
      integLabel: "Integrated Third-Party Systems",
      integGroups: [
        {
          title: "Payment",
          items: ["Systex / Intella", "EasyCard", "LINE Pay", "JKO Pay", "Apple Pay", "Credit Card EMV"],
        },
        {
          title: "ERP & Backend",
          items: ["Fujitsu ERP", "Digiwin ERP", "FamilyMart Internal Platform"],
        },
        {
          title: "Loyalty & E-Commerce",
          items: ["Ocard", "SHOPLINE", "91APP", "Pointsoft"],
        },
        {
          title: "Venue & Logistics",
          items: ["Lalamove", "Corporate Employee Cards", "TSMC / Garmin / Novatek"],
        },
      ],
    },
    ebplus: {
      label: "Taiwan Anchor Case",
      title: "How EB+ Automated 970+ Stores with OmniCore",
      badge: "970+ Locations · Taiwan's #1 Breakfast Chain",
      roleChip: "MCS Role: Software Integrator + Platform Provider",
      sub: "MCS is not EB+'s hardware vendor — we are the technology partner enabling 970+ breakfast chain locations to step away from manual workflows. GraBox pickup, LINE ordering, and 192-vehicle GPS dispatch — all unified through OmniCore, at 5–12% of self-build IT cost.",
      roleNote: "✦ Assisted Automation ≠ Fully Unmanned. MCS frees our partners from repetitive tasks so they can focus on delivering real service quality.",
      stats: [
        { num: "970+", label: "Chain Locations" },
        { num: "50 Units", label: "First GraBox Batch (H2 2026)" },
        { num: "192 Trucks", label: "GPS Fleet Dispatch (OmniCore built-in)" },
        { num: "1%", label: "Platform Fee (% Monthly GMV)" },
      ],
      features: [
        "LINE LIFF ordering → GraBox self-pickup, no queue",
        "192-truck GPS tracking + route optimization",
        "970 stores inventory levels at a glance",
        "With OmniCore, enterprises pay only 5–12% of self-build IT costs",
      ],
    },
    xiangyao: {
      label: "Closed-Venue Client",
      title: "Xiangyao × Closed-Venue Smart Vending",
      badge: "Military Base · Migrant Worker Dorms · Factories",
      sub: "Xiangyao (parent company Sonda Optoelectronics — OTC listing application in progress) holds unmatched access to closed venues. MCS supplies equipment and OmniCore. Formula: venue access meets technology — revenue shared proportionally.",
      stats: [
        { num: "Closed Venues", label: "Military · Dorms · Factories · Clinics" },
        { num: "EasyCard", label: "Migrant worker-friendly, no smartphone needed" },
        { num: "24hr", label: "Unmanned service in closed venues" },
      ],
      features: [
        "Ambient / chilled vending: snacks, drinks, daily essentials",
        "EasyCard / iPASS (migrant worker friendly, no smartphone)",
        "Telecom top-up integration (NT$7 fee per transaction)",
        "OmniCore: restocking prediction + anomaly alerts",
      ],
    },
    weche: {
      label: "Manufacturing Partner",
      title: "WECHE — MIT Hardware Manufacturing Core",
      sub: "Deep hardware-software integration with WECHE. LinKou assembly facility supports high-volume production. 100% Taiwan R&D and manufacturing.",
      badge: "Exclusive OEM Partner",
      points: [
        { icon: "🏭", title: "LinKou Assembly Facility", desc: "Full-scale assembly line for mass production. Rapid turnaround on custom specifications." },
        { icon: "⚙️", title: "Electromechanics Expertise", desc: "Mechanical design, refrigeration systems, electromechanical control — 20+ years of hardware manufacturing." },
        { icon: "📋", title: "Multi-Device Certifications", desc: "Showroom with full certification documentation. Export-ready compliance support." },
        { icon: "🤝", title: "OEM Partnership Since 2023", desc: "Formal OEM collaboration launched in 2023. Software + hardware customization under one roof." },
      ],
    },
    mit: {
      label: "100% Made in Taiwan",
      title: "In-House R&D & Manufacturing",
      sub: "MCS operates Taiwan-based engineering teams and partner factories — from mechanical design and PCB development to full-system factory acceptance testing.",
      points: [
        { icon: "🏭", title: "Mass Production Capability", desc: "Taiwan factory supports rapid prototyping and volume production with controlled lead times." },
        { icon: "🔬", title: "PCB Development", desc: "In-house engineers develop locker control boards, payment modules, and sensor integrations." },
        { icon: "🧪", title: "Factory Acceptance Testing", desc: "Every unit undergoes full functional testing before shipment — quality guaranteed." },
      ],
    },
    cases: {
      label: "Case Studies",
      title: "Proven Deployments",
      sub: "From Taiwan's largest convenience chain to Japan's expressways, MCS validates integration capabilities across diverse venues.",
      fm: {
        title: "FamilyMart Taiwan",
        badge: "Taiwan's Largest Convenience Chain",
        tabs: ["Smart Vending Machines", "FamiNow Smart Lockers"],
        vendingTitle: "FamilyMart Smart Vending Machines",
        vendingDesc: "Deployed across science parks, universities, and tourist hotels. Integrates FamilyMart POS, time-controlled barcodes, discounted food programs, and employee card payment (TSMC, Garmin, etc.).",
        vendingStats: ["200+ units (from 2026, +100/yr)", "Full FamilyMart POS integration", "Science parks / Universities / Hotels"],
        pickupTitle: "FamiNow Smart Locker Integration",
        pickupDesc: "MCS smart lockers integrated with FamilyMart's FamiNow platform for O2O pickup: app order → locker collection. Piloted at Shihjhang MRT Station with FamilyMart POS, app item tracking, and pickup point selection.",
        pickupStats: ["App-order → locker O2O flow", "FamiNow APP & POS integrated", "MRT station pilot deployment"],
      },
      mwd: {
        title: "MWD Breakfast Chain",
        badge: "One of Taiwan's Top Breakfast Chains",
        desc: "MCS completed the full software + hardware integration for MWD smart pickup cabinets in 90 days — from mechanical design to cloud backend — winning a landmark contract against a major Japanese competitor. Flagship features: UV sterilization, laser sensing, dual-side access.",
        stats: ["90-day delivery (incl. hardware dev)", "Won over a major Japanese competitor", "UV sterilization + laser sensor flagship"],
      },
      frozen: {
        label: "Frozen & Chilled Vending",
        title: "Frozen / Chilled / Microwave Vending Machines",
        badge: "Channel Customers · 300+ Units Deployed",
        sub: "MCS has years of hands-on expertise in frozen, chilled, and microwave-combo vending machine control. Our channel customers operate 300+ units stably across various venues.",
        stats: ["300+ units deployed (channel customers)", "Multi-year frozen / chilled / microwave control expertise", "Proven across multiple venue types"],
      },
      shutoko: {
        title: "Shuto Expressway Japan",
        badge: "Japan PA Frozen + Microwave Vending",
        desc: "Co-developed frozen + microwave-combo vending machines for Shuto Expressway parking areas. NDA and MOU signed. PSE certification in progress. Integrated with MP-Solution Japan cashless payment infrastructure.",
        stats: ["NDA + MOU signed", "PSE certification in progress", "MPS Japan payment integration", "SA/PA 877-location expansion roadmap (JP document)"],
      },
      more: {
        title: "More Clients",
        items: [
          { name: "Pizza Hut", desc: "2in1 Food Locker: heated cabinet + offline order pickup" },
          { name: "Lihpao International", desc: "Toy vending machines with Digiwin ERP integration" },
          { name: "N&W Group", desc: "Fitness food vending with Ocard loyalty integration" },
          { name: "Everrich Duty Free", desc: "Airport retail + activity redemption + advertising" },
          { name: "Huiju Food", desc: "Multi-model vending franchise operator, gamification module" },
          { name: "Taiwan HSR", desc: "Souvenir vending machine" },
          { name: "PiliAnimation", desc: "IP merchandise & blind box vending" },
          { name: "15 Post Offices", desc: "Post Office e-commerce product display & redemption" },
        ],
      },
    },
    contact: {
      label: "Talk to Us",
      title: "Ready to See It in Action?",
      sub: "Tell us your venue, your challenge, and your goal. We'll walk you through real deployments and show you exactly how MCS fits.",
      cta: "Request a Demo",
      email: "Email Us",
      web: "Website",
    },
  },

  ja: {
    nav: { home: "ホーム", back: "← ウェブサイトへ戻る" },
    hero: {
      badge: "AI × ハードウェア × プラットフォーム — すべて自社開発",
      title: "ハードウェア設計から AI クラウドプラットフォームまで",
      titleAccent: "すべて自社で設計・統合",
      sub: "MCS 銓幻元科技 — 単なる機器販売ではありません。AI + IoT により手作業のサービスフローをスマートデバイスプラットフォームに置き換えます。機構設計からOmniCore クラウド AI まで、全レイヤーを自社で設計・統合・運用します。",
      cta: "デモを予約する",
      stats: [
        { num: "20+", label: "年の業界経験" },
        { num: "200+", label: "台ファミリーマート設置（2026年〜）" },
        { num: "10+", label: "スマートデバイス機種" },
        { num: "100%", label: "台湾製（MIT）" },
      ],
    },
    stack: {
      label: "コアコンピタンス",
      title: "5層フルスタック統合力",
      sub: "MCSはデバイスの販売代理店ではありません。最下層のハードウェアから最上層のAI意思決定まで、すべてを自社で設計・統合・運用する技術企業です。",
      layers: [
        {
          num: "L1", name: "ハードウェア設備", en: "Hardware Devices",
          color: "bg-[#1B3A5C] text-white",
          chipColor: "bg-blue-100 text-blue-900",
          items: ["GraBox スマートピックアップキャビネット", "常温自動販売機", "冷蔵自動販売機", "冷凍＋電子レンジ自動販売機", "常温両面スマートピックアップキャビネット", "セルフオーダーキオスク", "キャッシュレス決済端末", "カスタム OEM デバイス"],
        },
        {
          num: "L2", name: "機電統合・ファームウェア", en: "Electromechanics & Firmware",
          color: "bg-[#E8751A] text-white",
          chipColor: "bg-orange-100 text-orange-900",
          items: ["板金・機構設計", "冷蔵 / 保温 / 加熱モジュール", "ロッカー制御基板", "TOF センサー / ドアセンサー", "UV 除菌制御", "バーコード / QR リーダー", "EMV SAM カードモジュール", "自動ドア機電制御"],
        },
        {
          num: "L3", name: "フロントエンド販売システム", en: "On-Device Frontend",
          color: "bg-[#1a7a4a] text-white",
          chipColor: "bg-green-100 text-green-900",
          items: ["タッチスクリーン UI 設計", "マルチ決済統合", "電子領収書発行", "カート・プロモーション管理", "会員ポイント / クーポン", "広告メディア管理", "O2O オンライン注文・店頭受取", "オフラインバックアップ"],
        },
        {
          num: "L4", name: "クラウド管理プラットフォーム", en: "Cloud Management Platform",
          color: "bg-[#5B2D8E] text-white",
          chipColor: "bg-purple-100 text-purple-900",
          items: ["デバイスリアルタイム監視", "取引・売上レポート分析", "在庫・補充管理", "食品安全温度監査記録", "LINE Notify 自動通知", "マルチテナントアーキテクチャ", "AI 補充予測モジュール", "SLA メンテナンス管理"],
        },
        {
          num: "L5", name: "外部システム連携", en: "External System Integration",
          color: "bg-[#0A9396] text-white",
          chipColor: "bg-teal-100 text-teal-900",
          items: ["コンビニ POS システム", "ERP（富士通 / Digiwin）", "会員（Ocard / 91APP）", "EC（SHOPLINE）", "決済（悠遊卡 / LINE Pay）", "社員カードシステム", "MP-Solution Japan キャッシュレス", "Lalamove 即時配送"],
        },
      ],
    },
    platform: {
      label: "バックエンドプラットフォーム",
      title: "OmniCore スマートデバイス OS",
      sub: "スマートデバイス専用に設計されたマルチテナントクラウドOSです。すべてのデバイス・顧客・データを1つのダッシュボードで管理します。",
      features: [
        { icon: "📡", name: "リアルタイム機器監視", desc: "ネットワーク状態・温度・格子状態・在庫水準をリアルタイムで把握。" },
        { icon: "📊", name: "取引・売上レポート", desc: "機器別・場所別・商品別・日付別で多次元分析。売上トレンドを瞬時に把握。" },
        { icon: "🔔", name: "自動異常アラート", desc: "LINE Notify 連携：温度異常・在庫切れ・取引失敗を即時プッシュ通知。" },
        { icon: "🛡️", name: "食品安全温度監査", desc: "上下限設定、超過時自動ロック、完全な監査証跡を保持。" },
        { icon: "🚚", name: "補充・在庫管理", desc: "ピッキングリスト・補充票・棚卸表をワンクリックで出力。AI 予測モジュール内蔵。" },
        { icon: "🎯", name: "プロモーションエンジン", desc: "割引コード・セット割引・期間限定キャンペーンをエンジニア不要で設定可能。" },
        { icon: "👤", name: "会員・ポイント統合", desc: "OMO 会員：実店舗でポイント獲得・オンライン交換。プッシュマーケティング対応。" },
        { icon: "🏢", name: "マルチテナントアーキテクチャ", desc: "顧客ごとに完全隔離。各テナント専用ダッシュボードとブランドカスタマイズ対応。" },
      ],
      integLabel: "統合済みサードパーティシステム",
      integGroups: [
        {
          title: "決済",
          items: ["精誠 Systex / 英特拉", "悠遊卡 EasyCard", "LINE Pay", "街口支付", "Apple Pay", "クレジットカード EMV"],
        },
        {
          title: "ERP & バックエンド",
          items: ["富士通 ERP", "Digiwin ERP", "コンビニ内部管理プラットフォーム"],
        },
        {
          title: "会員 & EC",
          items: ["Ocard", "SHOPLINE", "91APP", "Pointsoft"],
        },
        {
          title: "施設 & 物流",
          items: ["Lalamove", "企業社員カードシステム", "TSMC / Garmin / Novatek"],
        },
      ],
    },
    ebplus: {
      label: "台湾主要顧客",
      title: "EB+グループ × OmniCore 全チャネル省人化",
      badge: "970店舗以上・台湾トップ朝食チェーン",
      roleChip: "MCSの役割：ソフトウェアインテグレーター＋プラットフォーム提供",
      sub: "MCSはEB+のハードウェア販売会社ではありません。970店舗以上の朝食チェーンが全チャネルで「省人化」を実現するための技術パートナーです。GraBoxでの受取・LINEでの注文・192台配送車管理まで、OmniCoreで一元管理します。",
      roleNote: "✦ 省人化 ≠ 無人化。MCSはパートナーが単純な反復作業から解放され、真のサービス品質に集中できる環境を支援します。",
      stats: [
        { num: "970店舗以上", label: "チェーン店舗数" },
        { num: "50台", label: "2026年下半期 初回GraBox出荷" },
        { num: "192台", label: "配送車GPS管理（OmniCore標準）" },
        { num: "1%", label: "月次GMVプラットフォーム利用料" },
      ],
      features: [
        "LINE LIFF注文 → GraBox自取、行列不要",
        "192台の配送車GPS追跡＋ルート最適化",
        "970店舗の在庫水準をリアルタイム把握",
        "OmniCore導入で自社構築費用のわずか5〜12%のコストで運用可能",
      ],
    },
    xiangyao: {
      label: "特定施設向け顧客",
      title: "翔耀実業 × 特定施設向けスマート自販機",
      badge: "軍施設・外国人労働者寮・工場",
      sub: "翔耀実業（親会社の嵩達光電は上場申請中）は特定施設への参入能力において他の追随を許しません。MCSが機器とOmniCoreプラットフォームを提供し、翔耀が施設を提供する協業モデルです。収益は成果比例で配分します。",
      stats: [
        { num: "特定施設", label: "軍 / 寮 / 工場 / 診療所" },
        { num: "悠遊卡", label: "スマホ不要・外国人労働者向け決済" },
        { num: "24時間", label: "無人サービス稼働" },
      ],
      features: [
        "常温・冷蔵自販機：スナック・飲料・日用品",
        "悠遊卡 / iPASS決済（外国人労働者向け）",
        "通話料チャージサービス統合（1件NT$7手数料）",
        "OmniCoreリモート監視：補充予測＋異常通報",
      ],
    },
    weche: {
      label: "製造戦略パートナー",
      title: "微勤電機 — MIT ハードウェア製造の中核",
      sub: "MCS は微勤電機とソフトウェア・ハードウェアを深く統合。林口組立工場が量産出荷をサポート。100% 台湾研究開発・製造。",
      badge: "独占 OEM パートナー",
      points: [
        { icon: "🏭", title: "林口組立工場", desc: "大規模組立ラインで量産出荷に対応。カスタム仕様にも迅速に対応可能。" },
        { icon: "⚙️", title: "機電統合の専門性", desc: "機構設計・冷却システム・機電制御。20年以上のハードウェア製造実績。" },
        { icon: "📋", title: "多様な設備認証", desc: "ショールームに各種認証文書完備。輸出コンプライアンス対応可能。" },
        { icon: "🤝", title: "2023年 OEM 協業開始", desc: "2023年に正式 OEM 協業を開始。ソフトウェア + ハードウェアのカスタマイズをワンストップで提供。" },
      ],
    },
    mit: {
      label: "100% 台湾製（MIT）",
      title: "自社研究開発・製造能力",
      sub: "MCS は台湾の自社エンジニアリングチームと提携工場を保有。機構設計・PCB開発から出荷前全数検査まで、すべて台湾で完結します。",
      points: [
        { icon: "🏭", title: "量産対応工場", desc: "台湾工場が迅速なプロトタイプ製作と量産に対応。リードタイムを管理可能。" },
        { icon: "🔬", title: "PCB 研究開発", desc: "自社エンジニアがロッカー制御基板・決済モジュール・各種センサー統合を開発。" },
        { icon: "🧪", title: "出荷前全数検査", desc: "すべての機器は出荷前に完全機能試験を実施。品質を保証。" },
      ],
    },
    cases: {
      label: "導入実績",
      title: "実証済みの展開事例",
      sub: "台湾最大のコンビニチェーンから日本の首都高速道路まで、MCS はさまざまな施設・業態で統合能力を実証しています。",
      fm: {
        title: "ファミリーマート 台湾",
        badge: "台湾最大コンビニチェーン",
        tabs: ["スマート自動販売機", "FamiNow スマートロッカー"],
        vendingTitle: "ファミリーマート スマート自動販売機",
        vendingDesc: "サイエンスパーク・大学・観光ホテルなどに展開。ファミリーマートPOS・時限バーコード・割引プログラム・社員カード決済（TSMC、Garmin等）を統合。",
        vendingStats: ["200台以上設置（2026年〜、毎年+100台）", "ファミリーマートPOSフル統合", "サイエンスパーク / 大学 / ホテル"],
        pickupTitle: "FamiNow スマートロッカー統合",
        pickupDesc: "ファミリーマートのFamiNowプラットフォームとMCSスマートロッカーを統合したO2Oピックアップフロー。十四張駅でパイロット展開。アプリ注文 → ロッカー受取を実現。",
        pickupStats: ["アプリ注文 → ロッカー受取 O2O", "FamiNow APP & POS 統合", "MRT 駅でのパイロット展開"],
      },
      mwd: {
        title: "麦味登 朝食チェーン",
        badge: "台湾トップ朝食チェーンブランド",
        desc: "MCS は麦味登スマートピックアップキャビネットのソフトウェア・ハードウェア統合を90日で完了。機構設計からクラウドバックエンドまで一括対応し、日本大手メーカーとの競合入札に勝利した実績案件。UV除菌・レーザーセンサー・両面アクセスの旗艦モデル。",
        stats: ["90日で統合完了（ハード開発含む）", "日本大手メーカーとの競合入札に勝利", "UV除菌＋レーザーセンサー旗艦版"],
      },
      frozen: {
        label: "冷凍・冷蔵自動販売機",
        title: "冷凍・冷蔵・電子レンジ一体型自動販売機",
        badge: "通路顧客 · 300台以上稼働中",
        sub: "MCS は冷凍・冷蔵・電子レンジ一体型自販機の制御技術において、多年の実績と商業的検証を積み重ねています。通路顧客の稼働台数は300台以上。",
        stats: ["300台以上稼働中（通路顧客）", "多年の冷凍 / 冷蔵 / 電子レンジ制御技術", "多様な施設・環境での安定稼働実証済み"],
      },
      shutoko: {
        title: "首都高速道路 日本",
        badge: "日本 PA 冷凍・電子レンジ自動販売機",
        desc: "首都高速道路PA（パーキングエリア）向けに冷凍＋電子レンジ一体型自動販売機を共同開発。NDA・MOU署名済み、PSE認証取得中。MP-Solution Japanキャッシュレス決済インフラと統合済み。",
        stats: ["NDA + MOU 署名済み", "PSE 認証取得中", "MP-Solution Japan 決済統合", "SA/PA 877拠点展開ロードマップ（日本語文書）"],
      },
      more: {
        title: "その他の導入実績",
        items: [
          { name: "ピザハット", desc: "2in1 Food Locker：保温キャビネット＋オフライン注文受取統合" },
          { name: "麗嬰国際", desc: "玩具自動販売機、Digiwin ERP統合" },
          { name: "N&W Group", desc: "フィットネス食品自販機、Ocardロイヤルティ統合" },
          { name: "エバーリッチ免税店", desc: "空港小売＋特典交換＋広告宣伝" },
          { name: "滙聚フード", desc: "多機種自販機フランチャイズ、ゲーミフィケーション対応" },
          { name: "台湾新幹線", desc: "記念品自動販売機" },
          { name: "霹靂布袋戲", desc: "IPグッズ・ブラインドボックス自販機" },
          { name: "全国郵便局 15拠点", desc: "郵便局EC商品展示・交換機" },
        ],
      },
    },
    contact: {
      label: "お問い合わせ",
      title: "デモをご覧になりませんか？",
      sub: "導入ご予定の施設・課題・目標をお聞かせください。実際の数値をもとに、MCSがどのようにご支援できるかをご説明いたします。",
      cta: "デモをリクエスト",
      email: "メール",
      web: "ウェブサイト",
    },
  },
};

// ─── More Client Detail Content ───────────────────────────────────────────────
const MORE_CLIENT_DETAILS = [
  {
    color: "bg-red-600", img: null,
    tag: { zh: "餐飲", en: "F&B", ja: "飲食" },
    detail: {
      zh: "必勝客（Pizza Hut）導入 MCS 2in1 Food Locker，整合線下門市取餐訂單流程。保溫格子確保取餐品質，同時減少人工交餐等待時間，已於台灣多家門市部署驗證。",
      en: "Pizza Hut deployed MCS 2in1 Food Locker to manage offline order pickup. Heated locker slots maintain food quality while reducing staff handover wait times. Validated across multiple Taiwan locations.",
      ja: "ピザハットが MCS の 2in1 Food Locker を導入。オフライン注文の受取フローを統合し、保温キャビネットで料理品質を維持。台湾複数店舗で実証済み。",
    },
  },
  {
    color: "bg-purple-600", img: "/images/cards/client-funbox.png",
    tag: { zh: "玩具零售", en: "Toy Retail", ja: "玩具" },
    detail: {
      zh: "麗嬰國際旗下玩具品牌，導入 MCS 智慧販賣機，並整合鼎新電腦 ERP 系統（Digiwin），實現進銷存自動對帳與多點庫存同步。",
      en: "Lihpao International's toy brand deployed MCS smart vending machines with full Digiwin ERP integration — enabling automated inventory reconciliation and multi-location stock sync.",
      ja: "麗嬰国際の玩具ブランドが MCS スマート自販機を導入。鼎新電腦 ERP（Digiwin）との統合により、在庫の自動照合と多拠点在庫同期を実現。",
    },
  },
  {
    color: "bg-green-700", img: null,
    tag: { zh: "健身食品", en: "Fitness F&B", ja: "フィットネス" },
    detail: {
      zh: "N&W Group 健身食品智慧販賣機，整合 Ocard 會員系統，實現點數累積與消費折扣。消費者掃描 LINE 綁定帳號即可啟動個人化優惠，提升回購率。",
      en: "N&W Group fitness food vending machines integrated with Ocard loyalty — enabling point accumulation and personalized discounts via LINE account binding.",
      ja: "N&W Group フィットネス食品自販機と Ocard ロイヤルティを統合。LINE アカウント連携でポイント付与・割引の個人化を実現し、リピート率を向上。",
    },
  },
  {
    color: "bg-yellow-600", img: null,
    tag: { zh: "機場免稅", en: "Airport Duty-Free", ja: "空港免税" },
    detail: {
      zh: "昇恆昌機場免稅店，MCS 提供智慧販賣機應用於商品販售、活動兌換券核銷與廣告宣傳三合一場景，適合機場高人流、長時間等候的自助消費需求。",
      en: "Everrich Duty Free Airport — MCS machines handle retail sales, voucher redemption, and in-store advertising in one unit, meeting high-traffic airport self-service demand.",
      ja: "エバーリッチ空港免税店にて、MCS 機が物品販売・クーポン交換・広告配信の3機能を1台で提供。空港の高回転環境に対応。",
    },
  },
  {
    color: "bg-teal-600", img: null,
    tag: { zh: "連鎖餐飲", en: "F&B Franchise", ja: "飲食FC" },
    detail: {
      zh: "滙聚食品為 MCS 冷藏與冷凍智販機的加盟營運商，在台灣多個場域負責機台選點、補貨排班與日常維保，同時搭載 MCS 抽獎互動遊戲模組提升客戶黏性。",
      en: "Huiju Food operates MCS chilled + frozen vending machines as a franchise partner — handling site selection, replenishment scheduling, and maintenance, with gamification modules for engagement.",
      ja: "滙聚食品は MCS 冷蔵・冷凍自販機のフランチャイズ運営パートナー。機台選定・補充スケジュール・日常保守を担当し、ゲーミフィケーションモジュールで顧客定着を促進。",
    },
  },
  {
    color: "bg-[#1B3A5C]", img: null,
    tag: { zh: "大眾交通", en: "Mass Transit", ja: "公共交通" },
    detail: {
      zh: "台灣高鐵站體內，MCS 智販機提供旅客紀念品與周邊商品的自助購買服務，無需排隊等候人工服務台，適合匆忙旅次場景。",
      en: "MCS smart vending machines at Taiwan High Speed Rail stations provide self-service souvenir retail — no queuing at service counters for time-pressured travelers.",
      ja: "台湾高速鉄道駅構内に MCS 自販機を設置。旅客が記念品をセルフで購入可能。忙しい乗客に対応した無人販売形態。",
    },
  },
  {
    color: "bg-orange-700", img: null,
    tag: { zh: "IP 文創", en: "IP Merchandise", ja: "IP グッズ" },
    detail: {
      zh: "霹靂布袋戲 IP 周邊商品與限量盲盒，透過 MCS 智販機在台灣各地授權店及展覽場館進行限定販售，強化品牌粉絲互動體驗。",
      en: "Pili Puppet Shows' IP merchandise and limited blind boxes sold through MCS machines at licensed stores and exhibition venues across Taiwan, boosting fan engagement.",
      ja: "霹靂布袋戲の IP グッズ・限定ブラインドボックスを MCS 機で展開。台湾各地のライセンスショップや展示会場でのファン体験を強化。",
    },
  },
  {
    color: "bg-gray-700", img: null,
    tag: { zh: "政府機關", en: "Government", ja: "政府機関" },
    detail: {
      zh: "全台 15 個郵局據點設置 MCS 電商商品展示兌換機，讓民眾可在郵局現場瀏覽線上商品、完成兌換核銷，打通線上線下最後一哩路。",
      en: "MCS e-commerce redemption machines deployed at 15 post office branches nationwide — enabling customers to browse online products and redeem orders in-person, bridging online-to-offline.",
      ja: "全国 15 か所の郵便局に MCS EC 商品展示・交換機を設置。来客がオンライン商品を閲覧・現地で引き換え可能にし、O2O の最後の1マイルを接続。",
    },
  },
];

// ─── OmniCore Module Illustrations (Animated SVG + Framer Motion) ──────────────

function IllustrationDeviceMonitor() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#EFF6FF" rx="12"/>
      {[0,1,2,3,4,5].map(i => {
        const x = 24 + (i % 3) * 100, y = 20 + Math.floor(i/3) * 80;
        const ok = [0,1,3,5].includes(i);
        return (
          <g key={i}>
            <rect x={x} y={y} width="80" height="60" rx="8" fill="white" stroke={ok?"#2563EB":"#F59E0B"} strokeWidth="1.5"/>
            <rect x={x+6} y={y+8} width="48" height="28" rx="4" fill={ok?"#DBEAFE":"#FEF3C7"}/>
            <motion.circle cx={x+66} cy={y+14} r="6" fill={ok?"#22C55E":"#EF4444"}
              animate={{ scale: ok ? [1,1.35,1] : [1,0.8,1] }}
              transition={{ duration: 2+i*0.3, repeat: Infinity, ease:"easeInOut", delay: i*0.25 }}
              style={{ transformBox:"fill-box", transformOrigin:"center" }}
            />
            <motion.circle cx={x+66} cy={y+14} r="14" fill={ok?"#22C55E":"#EF4444"}
              animate={{ scale:[1,1.8], opacity:[0.35,0] }}
              transition={{ duration:1.8, repeat:Infinity, delay: i*0.3 }}
              style={{ transformBox:"fill-box", transformOrigin:"center" }}
            />
            <rect x={x+6} y={y+42} width="28" height="4" rx="2" fill="#93C5FD"/>
          </g>
        );
      })}
      <motion.circle cx="310" cy="100" r="38" fill="#2563EB"
        animate={{ scale:[1,1.15,1], opacity:[0.1,0.22,0.1] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="310" cy="100" r="14" fill="#2563EB"/>
      <path d="M303 100 L317 100 M310 93 L310 107" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      {[[164,50],[164,150],[204,100]].map(([ex,ey],i) => (
        <motion.line key={i} x1="310" y1="100" x2={ex} y2={ey}
          stroke="#2563EB" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.8, delay:0.2+i*0.2 }}
        />
      ))}
      <motion.circle cx="310" cy="100" r="52" fill="none" stroke="#2563EB" strokeWidth="1.5"
        animate={{ scale:[0.85,1.3], opacity:[0.3,0] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
    </svg>
  );
}

function IllustrationReports() {
  const bars = [90,60,110,75,130,85,140];
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F5F3FF" rx="12"/>
      {bars.map((h,i) => (
        <motion.rect key={i} x={30+i*40} y={160-h} width="24" height={h} rx="4"
          fill={i===6?"#7C3AED":i===4?"#A78BFA":"#C4B5FD"}
          initial={{ scaleY:0 }} animate={{ scaleY:1 }}
          transition={{ duration:0.6, delay:0.1+i*0.08, ease:[0.22,1,0.36,1] }}
          style={{ transformBox:"fill-box", transformOrigin:"bottom" }}
        />
      ))}
      <motion.polyline points="42,70 82,100 122,50 162,85 202,20 242,55 282,10"
        fill="none" stroke="#7C3AED" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength:0, opacity:0 }} animate={{ pathLength:1, opacity:1 }}
        transition={{ duration:1.2, delay:0.75, ease:"easeOut" }}
      />
      <motion.polygon points="282,10 295,6 289,18" fill="#7C3AED"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:1.95 }}
      />
      {[0,1,2].map(i => (
        <motion.rect key={i} x="308" y={20+i*50} width="76" height="40" rx="8"
          fill="white" stroke="#DDD6FE" strokeWidth="1.5"
          initial={{ opacity:0, x:20 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.45, delay:0.25+i*0.15 }}
        />
      ))}
      <rect x="316" y="28" width="30" height="6" rx="3" fill="#7C3AED"/>
      <rect x="316" y="38" width="50" height="4" rx="2" fill="#C4B5FD"/>
      <rect x="316" y="78" width="22" height="6" rx="3" fill="#A78BFA"/>
      <rect x="316" y="88" width="42" height="4" rx="2" fill="#C4B5FD"/>
      <rect x="316" y="128" width="38" height="6" rx="3" fill="#7C3AED"/>
      <rect x="316" y="138" width="52" height="4" rx="2" fill="#DDD6FE"/>
      <line x1="22" y1="162" x2="298" y2="162" stroke="#C4B5FD" strokeWidth="1.5"/>
    </svg>
  );
}

function IllustrationAlerts() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#FFF7ED" rx="12"/>
      {[60,74,88].map((r,i) => (
        <motion.circle key={i} cx="140" cy="100" r={r} fill="none" stroke="#F97316" strokeWidth="1.5"
          animate={{ scale:[1,1.18], opacity:[0.3,0] }}
          transition={{ duration:2, repeat:Infinity, delay:i*0.55 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.g
        animate={{ rotate:[-14,14,-14,14,-7,7,0] }}
        transition={{ duration:1.8, repeat:Infinity, repeatDelay:2.5 }}
        style={{ transformBox:"fill-box", transformOrigin:"140px 80px" }}
      >
        <path d="M120 105 Q120 80 140 78 Q160 80 160 105 L165 115 H115 Z" fill="#F97316"/>
        <rect x="130" y="115" width="20" height="6" rx="3" fill="#EA580C"/>
        <circle cx="140" cy="120" r="5" fill="#EA580C"/>
        <polygon points="140,58 148,72 132,72" fill="#EF4444"/>
        <line x1="140" y1="62" x2="140" y2="68" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        <circle cx="140" cy="71" r="1.2" fill="white"/>
      </motion.g>
      {[0,1,2].map(i => (
        <motion.rect key={i} x="220" y={25+i*57} width="150" height="48" rx="10"
          fill="white" stroke="#FDBA74" strokeWidth="1.5"
          initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.5, delay:0.15+i*0.18, ease:[0.22,1,0.36,1] }}
        />
      ))}
      <rect x="232" y="35" width="16" height="16" rx="4" fill="#06B6D4"/>
      <rect x="254" y="37" width="72" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="46" width="50" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="232" y="92" width="16" height="16" rx="4" fill="#EF4444"/>
      <rect x="254" y="94" width="88" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="103" width="62" height="4" rx="2" fill="#9CA3AF"/>
      <rect x="232" y="148" width="16" height="16" rx="4" fill="#22C55E"/>
      <rect x="254" y="150" width="60" height="5" rx="2.5" fill="#374151"/>
      <rect x="254" y="159" width="78" height="4" rx="2" fill="#9CA3AF"/>
    </svg>
  );
}

function IllustrationFoodSafety() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F0FDF4" rx="12"/>
      <rect x="40" y="30" width="28" height="110" rx="14" fill="#D1FAE5" stroke="#059669" strokeWidth="2"/>
      <rect x="50" y="55" width="8" height="70" rx="4" fill="#A7F3D0"/>
      <motion.rect x="50" y="55" width="8" height="70" rx="4" fill="#10B981"
        initial={{ scaleY:0 }} animate={{ scaleY:1 }}
        transition={{ duration:1.2, delay:0.3, ease:[0.22,1,0.36,1] }}
        style={{ transformBox:"fill-box", transformOrigin:"bottom" }}
      />
      <circle cx="54" cy="135" r="14" fill="#10B981"/>
      <circle cx="54" cy="135" r="8" fill="#059669"/>
      <motion.circle cx="54" cy="135" r="22" fill="none" stroke="#10B981" strokeWidth="2"
        animate={{ scale:[1,1.5], opacity:[0.5,0] }}
        transition={{ duration:1.8, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <rect x="86" y="110" width="130" height="60" rx="8" fill="#DCFCE7" stroke="#86EFAC" strokeWidth="1.5" strokeDasharray="5 3"/>
      <motion.polyline points="86,100 108,95 130,98 152,92 174,96 186,94 216,97"
        fill="none" stroke="#059669" strokeWidth="2.5" strokeLinecap="round"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:1.4, delay:0.6 }}
      />
      <motion.circle cx="250" cy="80" r="32" fill="#059669"
        animate={{ scale:[1,1.05,1] }}
        transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <motion.path d="M236 80 L246 90 L264 68"
        stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.55, delay:1.2 }}
      />
      {[[320,40],[360,100],[310,155],[370,155]].map(([cx,cy],i) => (
        <motion.g key={i}
          animate={{ rotate:[0,360] }}
          transition={{ duration:9+i*2.5, repeat:Infinity, ease:"linear" }}
          style={{ transformBox:"fill-box", transformOrigin:cx+"px "+cy+"px" }}
        >
          <line x1={cx-12} y1={cy} x2={cx+12} y2={cy} stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
          <line x1={cx} y1={cy-12} x2={cx} y2={cy+12} stroke="#93C5FD" strokeWidth="2" strokeLinecap="round"/>
          <line x1={cx-8} y1={cy-8} x2={cx+8} y2={cy+8} stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
          <line x1={cx+8} y1={cy-8} x2={cx-8} y2={cy+8} stroke="#93C5FD" strokeWidth="1.5" strokeLinecap="round"/>
        </motion.g>
      ))}
    </svg>
  );
}

function IllustrationReplenishment() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F0FDFA" rx="12"/>
      {[0,1,2].map(row => (
        <g key={row}>
          <rect x="20" y={20+row*52} width="180" height="42" rx="4" fill="white" stroke="#5EEAD4" strokeWidth="1.5"/>
          {[0,1,2].map(col => {
            const fills = [[0.9,0.7,0.2],[0.6,0.9,0.4],[0.3,0.6,0.85]];
            const f = fills[row][col];
            const color = f>0.6?"#0D9488":f>0.35?"#F59E0B":"#EF4444";
            return (
              <g key={col}>
                <rect x={28+col*55} y={28+row*52} width="40" height="6" rx="3" fill="#E2E8F0"/>
                <motion.rect x={28+col*55} y={28+row*52} width={40*f} height="6" rx="3" fill={color}
                  initial={{ scaleX:0 }} animate={{ scaleX:1 }}
                  transition={{ duration:0.7, delay:0.1+row*0.15+col*0.1, ease:[0.22,1,0.36,1] }}
                  style={{ transformBox:"fill-box", transformOrigin:"left" }}
                />
              </g>
            );
          })}
        </g>
      ))}
      <motion.circle cx="256" cy="80" r="36" fill="#CCFBF1"
        animate={{ scale:[1,1.07,1] }} transition={{ duration:2.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="256" cy="80" r="24" fill="#0D9488" opacity="0.15"/>
      <ellipse cx="256" cy="78" rx="16" ry="18" fill="none" stroke="#0D9488" strokeWidth="2.5"/>
      <path d="M248 66 Q256 58 264 66" fill="none" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"/>
      <line x1="240" y1="76" x2="272" y2="76" stroke="#0D9488" strokeWidth="1.5" strokeDasharray="3 2"/>
      {[{cx:248,cy:82},{cx:264,cy:82},{cx:256,cy:90}].map(({cx,cy},i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="3" fill="#0D9488"
          animate={{ scale:[1,1.6,1], opacity:[1,0.4,1] }}
          transition={{ duration:1.4, repeat:Infinity, delay:i*0.3 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.path d="M294 80 L320 80" stroke="#0D9488" strokeWidth="2" strokeLinecap="round"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.5, delay:0.9 }}
      />
      <motion.polygon points="320,74 332,80 320,86" fill="#0D9488"
        initial={{ opacity:0 }} animate={{ opacity:1 }}
        transition={{ delay:1.4 }}
      />
      <rect x="336" y="30" width="52" height="100" rx="8" fill="white" stroke="#5EEAD4" strokeWidth="1.5"/>
      {[0,1,2,3].map(i => (
        <motion.g key={i}
          initial={{ opacity:0, x:-10 }} animate={{ opacity:1, x:0 }}
          transition={{ duration:0.35, delay:1.1+i*0.13 }}
        >
          <circle cx="347" cy={50+i*22} r="5" fill={i<3?"#0D9488":"#E2E8F0"}/>
          {i<3 && <path d={"M344 "+(50+i*22)+" L346 "+(52+i*22)+" L350 "+(48+i*22)} stroke="white" strokeWidth="1.5" strokeLinecap="round" fill="none"/>}
          <rect x="356" y={46+i*22} width="24" height="4" rx="2" fill={i<3?"#5EEAD4":"#E2E8F0"}/>
        </motion.g>
      ))}
      <motion.g initial={{ x:-30, opacity:0 }} animate={{ x:0, opacity:1 }}
        transition={{ duration:0.7, delay:0.3, ease:[0.22,1,0.36,1] }}
      >
        <rect x="20" y="168" width="60" height="24" rx="4" fill="#0D9488"/>
        <rect x="54" y="162" width="26" height="30" rx="4" fill="#0D9488"/>
        <circle cx="30" cy="194" r="6" fill="#1E293B"/>
        <circle cx="70" cy="194" r="6" fill="#1E293B"/>
        <circle cx="30" cy="194" r="3" fill="#5EEAD4"/>
        <circle cx="70" cy="194" r="3" fill="#5EEAD4"/>
      </motion.g>
      <motion.polyline points="50,180 110,175 145,168 175,178"
        fill="none" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="5 3"
        initial={{ pathLength:0 }} animate={{ pathLength:1 }}
        transition={{ duration:0.8, delay:1.0 }}
      />
      {[[110,175],[145,168],[175,178]].map(([x,y],i) => (
        <motion.circle key={i} cx={x} cy={y} r="4" fill="#F59E0B"
          initial={{ scale:0 }} animate={{ scale:1 }}
          transition={{ delay:1.1+i*0.2, type:"spring", stiffness:400 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
    </svg>
  );
}

function IllustrationPromotions() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#FFF1F2" rx="12"/>
      <motion.g animate={{ y:[0,-5,0] }} transition={{ duration:2.8, repeat:Infinity, ease:"easeInOut" }}>
        <path d="M60 40 L160 40 L200 100 L160 160 L60 160 L20 100 Z" fill="#FEE2E2" stroke="#EF4444" strokeWidth="2"/>
        <circle cx="78" cy="58" r="8" fill="#EF4444"/>
        <text x="65" y="115" fontSize="40" fontWeight="bold" fill="#EF4444" fontFamily="sans-serif">%</text>
      </motion.g>
      <motion.g
        animate={{ rotate:[0,360] }}
        transition={{ duration:14, repeat:Infinity, ease:"linear" }}
        style={{ transformBox:"fill-box", transformOrigin:"240px 70px" }}
      >
        {[0,45,90,135,180,225,270,315].map((deg,i) => {
          const rad = deg*Math.PI/180;
          return <line key={i}
            x1={240+36*Math.cos(rad)} y1={70+36*Math.sin(rad)}
            x2={240+52*Math.cos(rad)} y2={70+52*Math.sin(rad)}
            stroke="#FCA5A5" strokeWidth="2.5" strokeLinecap="round"/>;
        })}
      </motion.g>
      <motion.circle cx="240" cy="70" r="44" fill="#DC2626"
        animate={{ scale:[1,1.07,1] }} transition={{ duration:1.8, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <circle cx="240" cy="70" r="36" fill="#EF4444"/>
      <text x="220" y="62" fontSize="20" fontWeight="bold" fill="white" fontFamily="sans-serif">10%</text>
      <text x="222" y="82" fontSize="12" fill="#FCA5A5" fontFamily="sans-serif">OFF</text>
      <motion.rect x="300" y="30" width="80" height="56" rx="10" fill="white" stroke="#FECACA" strokeWidth="1.5"
        initial={{ opacity:0, y:-12 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.2 }}
      />
      <circle cx="340" cy="58" r="18" fill="#FEE2E2"/>
      <circle cx="340" cy="58" r="14" fill="white" stroke="#EF4444" strokeWidth="2"/>
      <motion.line x1="340" y1="50" x2="340" y2="58" stroke="#EF4444" strokeWidth="2" strokeLinecap="round"
        animate={{ rotate:[0,360] }} transition={{ duration:60, repeat:Infinity, ease:"linear" }}
        style={{ transformBox:"fill-box", transformOrigin:"340px 58px" }}
      />
      <line x1="340" y1="58" x2="347" y2="63" stroke="#DC2626" strokeWidth="1.5" strokeLinecap="round"/>
      <motion.rect x="212" y="128" width="168" height="58" rx="10" fill="white" stroke="#FECACA" strokeWidth="1.5"
        initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.4 }}
      />
      <rect x="222" y="140" width="40" height="8" rx="4" fill="#EF4444"/>
      <rect x="222" y="152" width="60" height="5" rx="2.5" fill="#FCA5A5"/>
      <rect x="222" y="162" width="44" height="5" rx="2.5" fill="#FECACA"/>
      <rect x="290" y="138" width="80" height="6" rx="3" fill="#E5E7EB"/>
      <motion.rect x="290" y="148" width="80" height="5" rx="2.5" fill="#EF4444" opacity="0.7"
        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
        transition={{ duration:0.8, delay:0.9 }}
        style={{ transformBox:"fill-box", transformOrigin:"left" }}
      />
      <rect x="290" y="157" width="60" height="4" rx="2" fill="#E5E7EB"/>
      <motion.rect x="20" y="170" width="80" height="24" rx="12" fill="#DC2626"
        initial={{ scale:0 }} animate={{ scale:1 }}
        transition={{ type:"spring", stiffness:300, delay:0.6 }}
        style={{ transformBox:"fill-box", transformOrigin:"left center" }}
      />
      <text x="32" y="186" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">BUY 1 GET 1</text>
    </svg>
  );
}

function IllustrationLoyalty() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#EEF2FF" rx="12"/>
      {[
        {x:30, color:"#B45309", light:"#FEF3C7"},
        {x:110, color:"#9CA3AF", light:"#F1F5F9"},
        {x:190, color:"#D97706", light:"#FEF9C3"},
      ].map(({x,color,light},i) => (
        <motion.g key={i}
          initial={{ opacity:0, y:24, scale:0.6 }} animate={{ opacity:1, y:0, scale:1 }}
          transition={{ duration:0.6, delay:0.08+i*0.18, type:"spring", stiffness:240 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        >
          <circle cx={x+30} cy={80} r={20+i*6} fill={light} stroke={color} strokeWidth="2.5"/>
          <circle cx={x+30} cy={80} r={12+i*4} fill={color} opacity="0.7"/>
          <polygon points={(x+30)+","+(64-i*2)+" "+(x+33+i)+","+(72+i)+" "+(x+41+i)+","+(72+i)+" "+(x+35+i*1.5)+","+(78+i)+" "+(x+37+i)+","+(86+i)+" "+(x+30)+",82 "+(x+23-i)+","+(86+i)+" "+(x+25-i*1.5)+","+(78+i)+" "+(x+19-i)+","+(72+i)+" "+(x+27-i)+","+(72+i)}
            fill="white" opacity="0.85"/>
          <rect x={x+14} y={104} width="32" height="18" rx="9" fill={color}/>
        </motion.g>
      ))}
      {[260,285,310,335,360].map((cx,i) => (
        <motion.polygon key={i}
          points={cx+",55 "+(cx+5)+",67 "+(cx+17)+",67 "+(cx+8)+",75 "+(cx+11)+",87 "+cx+",80 "+(cx-11)+",87 "+(cx-8)+",75 "+(cx-17)+",67 "+(cx-5)+",67"}
          fill={i<3?"#6366F1":"#E0E7FF"}
          initial={{ scale:0, opacity:0 }} animate={{ scale:1, opacity:1 }}
          transition={{ duration:0.4, delay:0.5+i*0.12, type:"spring", stiffness:350 }}
          style={{ transformBox:"fill-box", transformOrigin:"center" }}
        />
      ))}
      <motion.g initial={{ opacity:0, y:18 }} animate={{ opacity:1, y:0 }}
        transition={{ duration:0.5, delay:0.85 }}
      >
        <rect x="240" y="100" width="140" height="64" rx="12" fill="#06C755"/>
        <path d="M252 164 L246 178 L264 164 Z" fill="#06C755"/>
        <circle cx="262" cy="132" r="6" fill="white"/>
        <circle cx="282" cy="132" r="6" fill="white"/>
        <circle cx="302" cy="132" r="6" fill="white"/>
        <rect x="252" y="110" width="112" height="14" rx="4" fill="white" opacity="0.3"/>
      </motion.g>
      <rect x="18" y="148" width="200" height="12" rx="6" fill="#C7D2FE"/>
      <motion.rect x="18" y="148" width="130" height="12" rx="6" fill="#6366F1"
        initial={{ scaleX:0 }} animate={{ scaleX:1 }}
        transition={{ duration:1.0, delay:0.95, ease:[0.22,1,0.36,1] }}
        style={{ transformBox:"fill-box", transformOrigin:"left" }}
      />
      <circle cx="148" cy="154" r="8" fill="white" stroke="#6366F1" strokeWidth="2.5"/>
      <motion.g initial={{ opacity:0, scale:0.8 }} animate={{ opacity:1, scale:1 }}
        transition={{ delay:1.5, type:"spring" }}
        style={{ transformBox:"fill-box", transformOrigin:"left center" }}
      >
        <rect x="18" y="168" width="100" height="24" rx="12" fill="#6366F1"/>
        <text x="28" y="184" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">+18 pts earned</text>
      </motion.g>
    </svg>
  );
}

function IllustrationMultiTenant() {
  return (
    <svg viewBox="0 0 400 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="200" fill="#F8FAFC" rx="12"/>
      <motion.g animate={{ scale:[1,1.03,1] }} transition={{ duration:3.5, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"200px 44px" }}
      >
        <ellipse cx="200" cy="40" rx="60" ry="28" fill="#E2E8F0"/>
        <ellipse cx="175" cy="46" rx="44" ry="22" fill="#CBD5E1"/>
        <ellipse cx="225" cy="46" rx="44" ry="22" fill="#CBD5E1"/>
        <ellipse cx="200" cy="50" rx="70" ry="25" fill="#94A3B8"/>
        <text x="180" y="54" fontSize="11" fontWeight="bold" fill="white" fontFamily="sans-serif">OmniCore</text>
      </motion.g>
      {[[115,72,80,110],[200,75,200,110],[285,72,320,110]].map(([x1,y1,x2,y2],i) => (
        <motion.line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 3"
          initial={{ pathLength:0 }} animate={{ pathLength:1 }}
          transition={{ duration:0.6, delay:0.25+i*0.15 }}
        />
      ))}
      {[
        {x:30, color:"#E8751A", bg:"#FFF7ED", label:"EB+"},
        {x:150, color:"#7C3AED", bg:"#F5F3FF", label:"翔耀"},
        {x:270, color:"#0891B2", bg:"#ECFEFF", label:"Client C"},
      ].map(({x,color,bg,label},i) => (
        <motion.g key={i}
          initial={{ opacity:0, y:22 }} animate={{ opacity:1, y:0 }}
          transition={{ duration:0.5, delay:0.55+i*0.15, ease:[0.22,1,0.36,1] }}
        >
          <rect x={x} y={110} width="100" height="70" rx="10" fill={bg} stroke={color} strokeWidth="2"/>
          <rect x={x} y={110} width="100" height="22" rx="10" fill={color}/>
          <rect x={x} y={120} width="100" height="12" fill={color}/>
          <text x={x+50} y={125} fontSize="10" fontWeight="bold" fill="white" fontFamily="sans-serif" textAnchor="middle">{label}</text>
          <rect x={x+10} y={140} width="50" height="4" rx="2" fill={color} opacity="0.4"/>
          <rect x={x+10} y={148} width="36" height="4" rx="2" fill={color} opacity="0.3"/>
          <rect x={x+10} y={156} width="44" height="4" rx="2" fill={color} opacity="0.4"/>
          <motion.g
            animate={{ rotate:[-5,5,-5] }}
            transition={{ duration:3+i*0.6, repeat:Infinity, ease:"easeInOut", delay:i*0.5 }}
            style={{ transformBox:"fill-box", transformOrigin:(x+80)+"px 147px" }}
          >
            <rect x={x+70} y={138} width="20" height="16" rx="3" fill="white" stroke={color} strokeWidth="1.5"/>
            <path d={"M"+(x+76)+" 138 Q"+(x+80)+" 130 "+(x+84)+" 138"} fill="none" stroke={color} strokeWidth="1.5"/>
            <circle cx={x+80} cy={147} r="3" fill={color}/>
          </motion.g>
        </motion.g>
      ))}
      <motion.path d="M192 58 L200 56 L208 58 L208 68 Q208 74 200 76 Q192 74 192 68 Z"
        fill="#1E293B" opacity="0.7"
        animate={{ scale:[1,1.12,1] }} transition={{ duration:2.2, repeat:Infinity }}
        style={{ transformBox:"fill-box", transformOrigin:"center" }}
      />
      <text x="197" y="69" fontSize="7" fontWeight="bold" fill="#64748B" fontFamily="sans-serif">JWT</text>
    </svg>
  );
}

const MODULE_ILLUSTRATIONS = [
  IllustrationDeviceMonitor,
  IllustrationReports,
  IllustrationAlerts,
  IllustrationFoodSafety,
  IllustrationReplenishment,
  IllustrationPromotions,
  IllustrationLoyalty,
  IllustrationMultiTenant,
];

// ─── OmniCore Module Detail Content ──────────────────────────────────────────
const MODULE_DETAILS = [
  {
    color: "bg-blue-600", light: "bg-blue-50 border-blue-200",
    scenario: { zh: "東方美區域經理在手機看到：第 32 號門市 GraBox 格子 3 號「放入後超時未取」，一鍵發 LINE 通知店員。", en: "EB+ area manager sees on mobile: Store #32, GraBox slot 3 — 'Placed but not picked up'. One tap notifies staff via LINE.", ja: "東方美エリアマネージャーがスマホで確認：32号店のGraBoxスロット3が「長時間未取り出し」。ワンタップでLINE通知。" },
    bullets: { zh: ["每台設備心跳 ping（30秒一次）", "GraBox 每格狀態：空 / 有餐 / 已取 / 異常", "冷凍機溫度即時監控，超限自動鎖貨", "設備離線 → 5 分鐘內 LINE 告警"], en: ["Per-device heartbeat ping (30s)", "GraBox per-slot status: Empty / Stocked / Taken / Error", "Chiller temp monitoring — auto-lock on breach", "Offline device → LINE alert within 5min"], ja: ["デバイスごとのハートビートping（30秒）", "GraBox格子別ステータス：空/補充済/取出済/異常", "冷凍機温度リアルタイム監視・超過時自動ロック", "オフライン→5分以内にLINE通報"] },
  },
  {
    color: "bg-purple-600", light: "bg-purple-50 border-purple-200",
    scenario: { zh: "翔耀封閉場域管理者查看本週 3 個宿舍各機台銷售排行，發現週五晚 9 點飲料銷量特別高，決定提前補貨。", en: "Xiangyao manager reviews 3 dormitory vending machines weekly. Spots Friday 9pm drink spike — schedules early restocking.", ja: "翔耀の管理者が3つの寮の週間売上を確認。金曜21時の飲料急増を発見し、早めに補充手配。" },
    bullets: { zh: ["機台 / 場域 / 商品 / 日期多維切片", "熱銷商品排行 ＋ 庫存消耗速率", "月 GMV 趨勢圖，支援 CSV / Excel 匯出", "自訂報表週期（日 / 週 / 月）"], en: ["Slice by device, venue, product, date", "Best-sellers + inventory depletion rate", "Monthly GMV trend, CSV / Excel export", "Custom report periods (daily/weekly/monthly)"], ja: ["機器・場所・商品・日付でスライス", "ベストセラー＋在庫消費速度", "月次GMVトレンド、CSV/Excelエクスポート", "レポート周期カスタム（日/週/月）"] },
  },
  {
    color: "bg-orange-500", light: "bg-orange-50 border-orange-200",
    scenario: { zh: "GraBox 某格子溫度異常，LINE Notify 秒送店長通知 → 店長遠端確認 → 系統自動開報修工單，15 分鐘內派工。", en: "GraBox slot temp anomaly → LINE Notify fires to store owner → remote confirm → maintenance ticket auto-opens, dispatched within 15min.", ja: "GraBoxスロットの温度異常→LINE Notifyが即座に店長通知→遠隔確認→メンテナンスチケット自動発行、15分以内に派遣。" },
    bullets: { zh: ["LINE Notify 整合，秒級推播", "溫控門限自訂（±0.5°C 精度）", "交易失敗 / 掃碼失敗 / 斷電預警", "告警靜默時段可設定（避免深夜騷擾）"], en: ["LINE Notify push, second-level latency", "Custom temp thresholds (±0.5°C precision)", "Failed transactions / scan failures / power loss", "Alert quiet hours configurable"], ja: ["LINE Notify秒単位プッシュ", "温度閾値カスタム（±0.5°C精度）", "取引失敗/スキャン失敗/停電予警", "通知サイレント時間帯設定可能"] },
  },
  {
    color: "bg-green-700", light: "bg-green-50 border-green-200",
    scenario: { zh: "日本首都高速 PSE 認證稽核：匯出所有設備過去 90 天溫控紀錄，全程低於 -18°C，一鍵生成 PDF 稽核報告。", en: "Shuto Expressway PSE audit: export 90-day temp logs for all units — all below -18°C. One-click PDF audit report.", ja: "首都高速PSE審査：全機器の過去90日温度ログをエクスポート、全期間-18°C以下を確認。ワンクリックPDF監査レポート生成。" },
    bullets: { zh: ["TimescaleDB 時序資料庫，每 15 分鐘記錄", "溫度超限 → 自動鎖貨 ＋ 紀錄", "稽核報告 PDF 一鍵匯出（含圖表）", "食安法規合規紀錄保存 2 年"], en: ["TimescaleDB time-series, 15min intervals", "Temp breach → auto lock + log", "PDF audit report one-click export (with graphs)", "2-year regulatory record retention"], ja: ["TimescaleDB時系列DB、15分間隔記録", "温度超過→自動ロック＋記録", "PDF监査レポートワンクリック出力（グラフ付き）", "食品安全法令準拠2年間記録保持"] },
  },
  {
    color: "bg-teal-600", light: "bg-teal-50 border-teal-200",
    scenario: { zh: "AI 分析東方美某門市週一早 7–9 點消耗模式，提前在週日晚生成補貨清單，補貨員隔天一早按清單完成補貨。", en: "AI analyzes EB+ store Monday 7–9am sales. Sunday night auto-generates pick list. Staff restocks first thing Monday morning.", ja: "AIが東方美の特定店舗の月曜朝7〜9時の消費パターンを分析。日曜夜に自動でピッキングリストを生成、スタッフが月曜朝に補充完了。" },
    bullets: { zh: ["AI 補貨預測（歷史銷量 + 節假日加成）", "撿貨單 / 補貨單一鍵匯出", "補貨員任務派派指派 ＋ 完成確認", "庫存異動完整稽核紀錄"], en: ["AI restocking prediction (sales history + holiday boost)", "Pick list / restock sheet one-click export", "Staff task dispatch + completion confirmation", "Full inventory change audit trail"], ja: ["AI補充予測（過去売上＋祝日補正）", "ピッキング/補充リストワンクリック出力", "スタッフタスク割当＋完了確認", "在庫変動完全監査記録"] },
  },
  {
    color: "bg-red-600", light: "bg-red-50 border-red-200",
    scenario: { zh: "麥味登週五活動：消費滿 NT$150 打九折。店長自己 3 分鐘在後台設好、即時生效，不需工程師介入。", en: "MWD Friday promo: NT$150+ gets 10% off. Store owner sets it up in 3 minutes in the dashboard, live instantly. No engineer needed.", ja: "麦味登の金曜プロモ：NT$150以上で10%割引。店長がダッシュボードで3分で設定→即時有効、エンジニア不要。" },
    bullets: { zh: ["折扣碼 / 買一送一 / 組合促銷", "時間限定活動（開始/結束自動切換）", "商品層級 / 訂單層級折扣", "促銷成效報告（折扣後 GMV 對比）"], en: ["Discount codes / BOGO / bundle deals", "Time-gated campaigns (auto start/end)", "Product-level / order-level discounts", "Promo ROI report (pre/post GMV comparison)"], ja: ["割引コード/BOGO/セット割引", "期間限定キャンペーン（自動開始/終了）", "商品レベル/注文レベル割引", "プロモROIレポート（割引前後GMV比較）"] },
  },
  {
    color: "bg-indigo-600", light: "bg-indigo-50 border-indigo-200",
    scenario: { zh: "客人掃碼取餐後，自動收到 LINE 訊息：「本次消費累積 18 點，再 42 點可換一份早餐！」促進回購。", en: "After QR pickup, customer auto-receives LINE message: 'You earned 18 points. 42 more = a free breakfast!' Drives repeat visits.", ja: "QRコードでピックアップ後、LINEメッセージが自動送信：「18ポイント獲得。あと42ポイントで無料朝食と交換！」リピート購入促進。" },
    bullets: { zh: ["LINE LIFF 綁定，無需額外 App", "OMO 線上線下通用點數", "消費累點 / 兌換券 / 推播行銷", "會員分級（銅 / 銀 / 金）可客製"], en: ["LINE LIFF binding, no extra app needed", "OMO unified points (online + offline)", "Earn points / redeem vouchers / push campaigns", "Member tiers (Bronze / Silver / Gold) customizable"], ja: ["LINE LIFF連携、別途アプリ不要", "OMOポイント（オンライン＋オフライン共通）", "ポイント獲得/クーポン交換/プッシュキャンペーン", "会員ランク（ブロンズ/シルバー/ゴールド）カスタマイズ可"] },
  },
  {
    color: "bg-gray-700", light: "bg-gray-50 border-gray-200",
    scenario: { zh: "東方美的店長看到橙色品牌後台；翔耀的管理者看到藍色品牌後台；兩者數據完全隔離，互看不到對方任何資料。", en: "EB+ manager sees orange-branded dashboard; Xiangyao manager sees blue-branded dashboard. Zero data cross-visibility between tenants.", ja: "東方美の店長はオレンジブランドのダッシュボード、翔耀の管理者はブルーブランドのダッシュボードを使用。テナント間でデータは完全隔離。" },
    bullets: { zh: ["tenant_id 隔離，底層 DB 層實作", "各租戶獨立品牌色 / Logo / 語系", "API 層 JWT 含 tenant scope", "個別計費 ＋ 月報表獨立隔離"], en: ["tenant_id isolation at DB level", "Per-tenant brand color / logo / locale", "JWT with tenant scope at API layer", "Separate billing + isolated monthly reports"], ja: ["DB層でのtenant_id隔離", "テナント別ブランドカラー/ロゴ/言語設定", "API層でJWTにtenantスコープ付与", "個別請求＋月次レポート完全隔離"] },
  },
];

// ─── OmniCore Backend Screens ─────────────────────────────────────────────────
const BACKEND_SCREENS: {
  src: string;
  label: { zh: string; en: string; ja: string };
  desc: { zh: string; en: string; ja: string };
}[] = [
  {
    src: "/images/intro/backend-device-monitor.jpg",
    label: { zh: "設備即時監控", en: "Device Monitoring", ja: "デバイス監視" },
    desc: { zh: "所有機台的網路狀態、溫度、格子狀態、庫存水位，一畫面全掌握", en: "Network, temperature, slot status, inventory level — all devices at a glance", ja: "ネット状態・温度・スロット・在庫水位 — 全機器を一画面で管理" },
  },
  {
    src: "/images/intro/backend-sales-report.jpg",
    label: { zh: "銷售報表分析", en: "Sales Analytics", ja: "売上分析" },
    desc: { zh: "日／週／月報表，依門市、品項、時段拆分銷售趨勢與排行", en: "Daily / weekly / monthly reports segmented by store, item, and time slot", ja: "店舗・商品・時間帯別の日次/週次/月次レポートと売上ランキング" },
  },
  {
    src: "/images/intro/backend-inventory.jpg",
    label: { zh: "庫存 / 補貨管理", en: "Inventory & Restocking", ja: "在庫・補充管理" },
    desc: { zh: "低庫存自動警報、AI 補貨建議清單，掃碼確認補貨完成，閉環管理", en: "Auto low-stock alerts, AI restock pick lists, barcode-confirm completion", ja: "在庫低下アラート・AI補充リスト・バーコード確認でクローズドループ管理" },
  },
  {
    src: "/images/intro/backend-member.jpg",
    label: { zh: "會員 & 點數", en: "Members & Points", ja: "会員・ポイント" },
    desc: { zh: "消費紀錄、點數累積兌換、LINE 推播行銷，OMO 線上線下完整串接", en: "Purchase history, points, LINE push marketing, full OMO integration", ja: "購入履歴・ポイント・LINE通知マーケティング、OMO完全統合" },
  },
  {
    src: "/images/intro/backend-promo.jpg",
    label: { zh: "促銷活動模組", en: "Promotions", ja: "プロモーション" },
    desc: { zh: "折扣碼、組合促銷、限時活動，店長自行 3 分鐘上架，無需工程師", en: "Discount codes, bundles, timed promos — store owner sets up in 3 min, no engineers", ja: "割引コード・セット・期間限定 — 店長が3分で設定、エンジニア不要" },
  },
  {
    src: "/images/intro/backend-maintenance.jpg",
    label: { zh: "報修 & 維保工單", en: "Maintenance Tickets", ja: "メンテナンス管理" },
    desc: { zh: "L0–L4 五級維保架構、自動派工、進度追蹤、SLA 時效紅燈警示", en: "5-tier maintenance (L0–L4), auto dispatch, progress tracking, SLA red alerts", ja: "L0〜L4五段階メンテナンス・自動派遣・進捗追跡・SLAアラート" },
  },
  {
    src: "/images/intro/backend-tenant.jpg",
    label: { zh: "多租戶管理", en: "Multi-Tenant Admin", ja: "マルチテナント" },
    desc: { zh: "每租戶獨立後台 + 品牌配色，底層 DB 層 tenant_id 隔離，數據零外洩", en: "Per-tenant isolated dashboard + brand colors, DB-level tenant_id isolation", ja: "テナント毎に独立バックエンド＋ブランドカラー、DB層でのtenant_id隔離" },
  },
];

// ─── Backend Dashboard SVGs ───────────────────────────────────────────────────

function DashboardDevice({ lang = "zh" }: { lang?: string }) {
  const statuses = ["#22C55E","#22C55E","#F59E0B","#22C55E","#22C55E","#EF4444","#22C55E","#22C55E"];
  const temps = ["24°C","23°C","31°C","25°C","22°C","—","24°C","26°C"];
  const ids = ["GBX-001","GBX-002","GBX-003","GBX-004","TH-101","TH-102","GBX-007","GBX-008"];
  const netW = [28,28,18,28,28,2,28,28];
  const ysday = lang==="ja" ? "昨日比 +12台" : lang==="en" ? "↑ +12 vs yesterday" : "↑ 較昨日 +12台";
  return (
    <svg viewBox="0 0 480 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="280" fill="#0d1117" rx="12"/>
      <rect width="480" height="36" fill="#161b22" rx="12"/>
      <rect x="0" y="12" width="480" height="24" fill="#161b22"/>
      <circle cx="16" cy="18" r="4" fill="#ff5f57"/><circle cx="28" cy="18" r="4" fill="#ffbd2e"/><circle cx="40" cy="18" r="4" fill="#28c840"/>
      <text x="56" y="22" fontSize="10" fill="#8b949e" fontFamily="monospace">OmniCore / Devices</text>
      <motion.circle cx="420" cy="18" r="4" fill="#22C55E" animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
      <text x="430" y="22" fontSize="9" fill="#22C55E" fontFamily="monospace">LIVE</text>
      <rect x="10" y="44" width="460" height="24" fill="#161b22" rx="6"/>
      <circle cx="28" cy="56" r="4" fill="#22C55E"/><text x="38" y="60" fontSize="8" fill="#8b949e" fontFamily="monospace">Online: 847</text>
      <circle cx="128" cy="56" r="4" fill="#F59E0B"/><text x="138" y="60" fontSize="8" fill="#8b949e" fontFamily="monospace">Warning: 12</text>
      <circle cx="228" cy="56" r="4" fill="#EF4444"/><text x="238" y="60" fontSize="8" fill="#8b949e" fontFamily="monospace">Offline: 3</text>
      <text x="340" y="60" fontSize="8" fill="#22C55E" fontFamily="monospace">{ysday}</text>
      {[...Array(8)].map((_, i) => {
        const col = i % 4, row = Math.floor(i/4);
        const x = 10 + col * 117, y = 76 + row * 96;
        const st = statuses[i];
        return (
          <g key={i}>
            <rect x={x} y={y} width="112" height="88" fill="#161b22" stroke={`${st}30`} strokeWidth="1" rx="8"/>
            <rect x={x} y={y} width="112" height="22" fill={`${st}18`} rx="8"/>
            <rect x={x} y={y+12} width="112" height="10" fill={`${st}18`}/>
            <motion.circle cx={x+12} cy={y+11} r="4" fill={st} animate={{opacity:[1,0.4,1]}} transition={{duration:1.5,repeat:Infinity,delay:i*0.2}}/>
            <text x={x+22} y={y+15} fontSize="8" fill="#c9d1d9" fontFamily="monospace" fontWeight="bold">{ids[i]}</text>
            <text x={x+8} y={y+34} fontSize="7" fill="#6e7681" fontFamily="monospace">TEMP</text>
            <text x={x+46} y={y+34} fontSize="9" fill="#c9d1d9" fontFamily="monospace" fontWeight="bold">{temps[i]}</text>
            <text x={x+8} y={y+48} fontSize="7" fill="#6e7681" fontFamily="monospace">NET</text>
            <rect x={x+46} y={y+40} width="36" height="7" rx="2" fill="#21262d"/>
            <motion.rect x={x+46} y={y+40} width={netW[i]} height="7" rx="2" fill={st}
              animate={{opacity:[1,0.65,1]}} transition={{duration:2,repeat:Infinity,delay:i*0.25}}/>
            <text x={x+8} y={y+62} fontSize="7" fill="#6e7681" fontFamily="monospace">SLOTS</text>
            {[0,1,2,3,4].map(s => (
              <rect key={s} x={x+46+s*13} y={y+54} width="10" height="10" rx="2"
                fill={st==="#EF4444"?"#21262d":s<4?"#1f6feb":"#21262d"} stroke="#30363d" strokeWidth="0.5"/>
            ))}
            <text x={x+8} y={y+82} fontSize="7" fill={st} fontFamily="monospace" fontWeight="bold">
              {st==="#22C55E"?"● ONLINE":st==="#F59E0B"?"⚠ WARNING":"✕ OFFLINE"}
            </text>
          </g>
        );
      })}
      <motion.rect x="10" y="76" width="460" height="2" fill="#E8751A" opacity="0.5"
        animate={{y:[76,258,76]}} transition={{duration:5,repeat:Infinity,ease:"linear"}}/>
    </svg>
  );
}

function DashboardSales({ lang = "zh" }: { lang?: string }) {
  const bars = [62,78,45,90,110,85,95];
  const days = lang==="ja"
    ? ["月","火","水","木","金","土","日"]
    : lang==="zh"
    ? ["一","二","三","四","五","六","日"]
    : ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
  const labels = {
    revenue: lang==="ja"?"月次売上":lang==="en"?"Monthly Revenue":"月營收",
    txn: lang==="ja"?"月次取引":lang==="en"?"Transactions":"月交易筆數",
    basket: lang==="ja"?"平均客単価":lang==="en"?"Avg Basket":"平均客單價",
    top: lang==="ja"?"売れ筋":lang==="en"?"Top Sellers":"熱銷品項",
    trend: lang==="ja"?"週次売上トレンド":lang==="en"?"Weekly Sales Trend":"每週銷售趨勢",
  };
  const maxH = 72;
  return (
    <svg viewBox="0 0 480 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="280" fill="#0d1117" rx="12"/>
      <rect width="480" height="36" fill="#161b22" rx="12"/>
      <rect x="0" y="12" width="480" height="24" fill="#161b22"/>
      <circle cx="16" cy="18" r="4" fill="#ff5f57"/><circle cx="28" cy="18" r="4" fill="#ffbd2e"/><circle cx="40" cy="18" r="4" fill="#28c840"/>
      <text x="56" y="22" fontSize="10" fill="#8b949e" fontFamily="monospace">OmniCore / Sales Analytics</text>
      <rect x="10" y="44" width="152" height="66" fill="#161b22" rx="8"/>
      <text x="20" y="60" fontSize="8" fill="#6e7681" fontFamily="monospace">{labels.revenue}</text>
      <text x="20" y="82" fontSize="19" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">NT$2,847K</text>
      <rect x="20" y="88" width="48" height="14" rx="5" fill="#22C55E20"/>
      <text x="44" y="98" textAnchor="middle" fontSize="8" fill="#22C55E" fontFamily="monospace" fontWeight="bold">↑ +18%</text>
      <rect x="170" y="44" width="96" height="66" fill="#161b22" rx="8"/>
      <text x="180" y="60" fontSize="8" fill="#6e7681" fontFamily="monospace">{labels.txn}</text>
      <text x="180" y="82" fontSize="16" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">14,293</text>
      <text x="180" y="100" fontSize="8" fill="#22C55E" fontFamily="monospace">↑ +9% MoM</text>
      <rect x="274" y="44" width="96" height="66" fill="#161b22" rx="8"/>
      <text x="284" y="60" fontSize="8" fill="#6e7681" fontFamily="monospace">{labels.basket}</text>
      <text x="284" y="82" fontSize="16" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">NT$199</text>
      <text x="284" y="100" fontSize="8" fill="#3B82F6" fontFamily="monospace">→ Stable</text>
      <rect x="378" y="44" width="100" height="66" fill="#161b22" rx="8"/>
      <text x="388" y="60" fontSize="8" fill="#6e7681" fontFamily="monospace">{labels.top}</text>
      {["御便當","飯糰","咖啡","茶葉蛋"].map((item,i) => (
        <g key={i}>
          <text x="388" y={74+i*14} fontSize="7" fill="#8b949e" fontFamily="sans-serif">{item}</text>
          <rect x="430" y={66+i*14} width={[40,32,24,16][i]} height="7" rx="2" fill="#1f6feb" opacity="0.7"/>
        </g>
      ))}
      <rect x="10" y="120" width="460" height="150" fill="#161b22" rx="8"/>
      <text x="20" y="136" fontSize="9" fill="#6e7681" fontFamily="monospace">{labels.trend}</text>
      {[0,1,2,3].map(i => (
        <line key={i} x1="30" y1={148+i*26} x2="460" y2={148+i*26} stroke="#21262d" strokeWidth="0.8"/>
      ))}
      {bars.map((v,i) => {
        const bh = (v/110)*maxH;
        const bx = 32 + i*58, by = 226 - bh;
        return (
          <g key={i}>
            <rect x={bx} y={226-maxH} width="40" height={maxH} fill="#21262d" rx="4" opacity="0.4"/>
            <motion.rect x={bx} y={by} width="40" height={bh} rx="4"
              fill={i===3||i===4?"#E8751A":"#1f6feb"}
              initial={{height:0,y:226}} animate={{height:bh,y:by}}
              transition={{duration:0.7,delay:i*0.09,ease:"easeOut"}}/>
            <text x={bx+20} y={246} textAnchor="middle" fontSize="8" fill="#8b949e" fontFamily="monospace">{days[i]}</text>
          </g>
        );
      })}
      <motion.path
        d={bars.map((v,i) => `${i===0?"M":"L"}${32+i*58+20},${226-(v/110)*maxH}`).join(" ")}
        fill="none" stroke="#E8751A" strokeWidth="1.5" strokeDasharray="4,3" opacity="0.7"
        initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.8,delay:0.8,ease:"easeOut"}}/>
      {bars.map((v,i) => (
        <motion.circle key={i} cx={32+i*58+20} cy={226-(v/110)*maxH} r="3" fill="#E8751A"
          initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.8+i*0.09}}/>
      ))}
    </svg>
  );
}

function DashboardInventory({ lang = "zh" }: { lang?: string }) {
  // Stock depletion chart: day 0-4 historical, day 4-6.8 AI forecast
  const cX = 18, cW = 248, cY = 66, cH = 108;
  const toP = (d: number, s: number) => ({ px: cX + (d / 7) * cW, py: cY + cH - (s / 100) * cH });
  const hist: [number,number][] = [[0,96],[1,83],[2,71],[3,48],[4,22]];
  const fore: [number,number][] = [[4,22],[5,12],[6,4],[6.6,0]];
  const hPath = hist.map(([d,s],i) => `${i===0?"M":"L"}${toP(d,s).px.toFixed(1)},${toP(d,s).py.toFixed(1)}`).join(" ");
  const fPath = fore.map(([d,s],i) => `${i===0?"M":"L"}${toP(d,s).px.toFixed(1)},${toP(d,s).py.toFixed(1)}`).join(" ");
  const thY = toP(0,20).py;
  const items = [
    {name:"御便當", stock:22, days:"2.3", c:"#EF4444"},
    {name:"三角飯糰", stock:8, days:"0.8", c:"#DC2626"},
    {name:"麵包", stock:31, days:"3.5", c:"#F59E0B"},
  ];
  const L = {
    header: lang==="ja"?"OmniCore / AI在庫予測":lang==="en"?"OmniCore / AI Inventory Forecast":"OmniCore / AI 庫存預測",
    stockout: lang==="ja"?"⚠ 残り約2.3日で在庫切れ":lang==="en"?"⚠ Stockout in ~2.3 days":"⚠ 約2.3天後將缺貨",
    chartTitle: lang==="ja"?"在庫トレンド — 御便當":lang==="en"?"Stock Trend — 御便當":"庫存趨勢 — 御便當",
    xDays: lang==="ja"?["月","火","水","木","金","土","日"]:lang==="en"?["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]:["一","二","三","四","五","六","日"],
    actual: lang==="ja"?"実績":lang==="en"?"Actual":"實際",
    forecast: lang==="ja"?"AI予測":lang==="en"?"AI Forecast":"AI預測",
    pickList: lang==="ja"?"🤖 AI補充リスト — 自動生成":lang==="en"?"🤖 AI Pick List — Auto-generated":"🤖 AI 補貨清單 — 已自動生成",
    pickItems: lang==="ja"?"御便當×24　三角飯糰×36　麵包×18":lang==="en"?"御便當 ×24  三角飯糰 ×36  麵包 ×18":"御便當×24　三角飯糰×36　麵包×18",
    delivery: lang==="ja"?"配送確定: 明日07:00 · 承認不要":lang==="en"?"Delivery: Tomorrow 07:00 · Auto-confirmed":"配送確定: 明日07:00 · 無需確認",
    alerts: lang==="ja"?"Critical Stock Alerts":lang==="en"?"Critical Stock Alerts":"庫存緊急警示",
    daysLeft: (d: string) => lang==="ja"?`⏱ 残り${d}日`:lang==="en"?`⏱ ${d}d left`:`⏱ 剩餘${d}天`,
    accuracy: lang==="ja"?"在庫精度 98.1%  ·  SKU 312品目":lang==="en"?"Accuracy 98.1%  ·  SKU 312 items":"庫存精準度 98.1%  ·  SKU 312 品項",
  };
  const r = 17, circ = 2 * Math.PI * r;
  return (
    <svg viewBox="0 0 480 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="280" fill="#0d1117" rx="12"/>
      <rect width="480" height="36" fill="#161b22" rx="12"/>
      <rect x="0" y="12" width="480" height="24" fill="#161b22"/>
      <circle cx="16" cy="18" r="4" fill="#ff5f57"/><circle cx="28" cy="18" r="4" fill="#ffbd2e"/><circle cx="40" cy="18" r="4" fill="#28c840"/>
      <text x="56" y="22" fontSize="10" fill="#8b949e" fontFamily="monospace">{L.header}</text>
      <motion.circle cx="432" cy="18" r="4" fill="#E8751A" animate={{opacity:[1,0.3,1]}} transition={{duration:1.2,repeat:Infinity}}/>
      <text x="442" y="22" fontSize="8" fill="#E8751A" fontFamily="monospace" fontWeight="bold">AI</text>

      {/* Left panel — Stock forecast chart */}
      <rect x="10" y="42" width="272" height="232" fill="#161b22" rx="8"/>
      <text x="20" y="57" fontSize="8.5" fill="#6e7681" fontFamily="monospace">{L.chartTitle}</text>
      <rect x="150" y="45" width="124" height="16" rx="4" fill="#EF444418" stroke="#EF444438" strokeWidth="0.8"/>
      <text x="212" y="56" textAnchor="middle" fontSize="7.5" fill="#EF4444" fontFamily="monospace" fontWeight="bold">{L.stockout}</text>

      {/* Y-axis grid */}
      {[0,25,50,75,100].map(pct => {
        const y = toP(0,pct).py;
        return (
          <g key={pct}>
            <line x1={cX} y1={y} x2={cX+cW} y2={y} stroke="#21262d" strokeWidth="0.7"/>
            <text x={cX-3} y={y+3} textAnchor="end" fontSize="7" fill="#484f58" fontFamily="monospace">{pct}</text>
          </g>
        );
      })}
      {/* X-axis labels */}
      {L.xDays.map((d,i) => (
        <text key={i} x={cX+(i/7)*cW+cW/14} y={cY+cH+12} textAnchor="middle" fontSize="7.5"
          fill={i<5?"#484f58":"#E8751A"} fontFamily="monospace">{d}</text>
      ))}
      {/* Reorder threshold line */}
      <line x1={cX} y1={thY} x2={cX+cW} y2={thY} stroke="#EF4444" strokeWidth="1" strokeDasharray="3,2" opacity="0.55"/>
      <text x={cX+cW+3} y={thY+3} fontSize="7" fill="#EF4444" fontFamily="monospace">20%</text>
      {/* Forecast zone fill */}
      <motion.path d={`${fPath} L${toP(6.6,0).px},${cY+cH} L${toP(4,0).px},${cY+cH} Z`}
        fill="#EF4444" opacity="0.07" initial={{opacity:0}} animate={{opacity:0.07}} transition={{delay:1.3}}/>
      {/* Historical area fill */}
      <motion.path d={`${hPath} L${toP(4,0).px},${cY+cH} L${toP(0,0).px},${cY+cH} Z`}
        fill="#3B82F6" opacity="0.1" initial={{opacity:0}} animate={{opacity:0.1}} transition={{duration:0.8}}/>
      {/* Historical line */}
      <motion.path d={hPath} fill="none" stroke="#3B82F6" strokeWidth="2.2"
        initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:1.2,ease:"easeOut"}}/>
      {/* AI forecast line (dashed) */}
      <motion.path d={fPath} fill="none" stroke="#EF4444" strokeWidth="2" strokeDasharray="5,3"
        initial={{pathLength:0}} animate={{pathLength:1}} transition={{duration:0.9,delay:1.2,ease:"easeOut"}}/>
      {/* Historical data dots */}
      {hist.map(([d,s],i) => (
        <motion.circle key={i} cx={toP(d,s).px} cy={toP(d,s).py} r="3.5" fill="#3B82F6"
          initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}} transition={{delay:0.1+i*0.18}}/>
      ))}
      {/* Forecast endpoint pulse */}
      <motion.circle cx={toP(6.6,0).px} cy={cY+cH} r="5" fill="#EF4444"
        animate={{opacity:[1,0.3,1],scale:[1,1.4,1]}} transition={{duration:1.2,repeat:Infinity,delay:2}}/>
      {/* Legend */}
      <line x1="20" y1="204" x2="38" y2="204" stroke="#3B82F6" strokeWidth="2"/>
      <text x="42" y="207" fontSize="7" fill="#484f58" fontFamily="monospace">{L.actual}</text>
      <line x1={42+L.actual.length*5} y1="204" x2={56+L.actual.length*5} y2="204" stroke="#EF4444" strokeWidth="2" strokeDasharray="4,2"/>
      <text x={60+L.actual.length*5} y="207" fontSize="7" fill="#484f58" fontFamily="monospace">{L.forecast}</text>
      {/* AI prediction label */}
      <rect x="10" y="216" width="272" height="52" fill="#E8751A0a" stroke="#E8751A28" strokeWidth="0.8" rx="6"/>
      <text x="22" y="230" fontSize="8.5" fill="#E8751A" fontFamily="monospace" fontWeight="bold">{L.pickList}</text>
      <text x="22" y="244" fontSize="7.5" fill="#8b949e" fontFamily="monospace">{L.pickItems}</text>
      <text x="22" y="258" fontSize="7.5" fill="#8b949e" fontFamily="monospace">{L.delivery}</text>

      {/* Right panel — Critical stock rings */}
      <rect x="288" y="42" width="182" height="232" fill="#161b22" rx="8"/>
      <text x="298" y="57" fontSize="8.5" fill="#6e7681" fontFamily="monospace">{L.alerts}</text>
      {items.map(({name,stock,days,c},i) => {
        const cx = 330, cy = 92 + i * 68;
        const dash = (stock / 100) * circ;
        const gap = circ - dash;
        return (
          <g key={i}>
            {/* BG ring */}
            <circle cx={cx} cy={cy} r={r} fill="none" stroke="#21262d" strokeWidth="5"/>
            {/* Progress ring */}
            <motion.circle cx={cx} cy={cy} r={r} fill="none" stroke={c} strokeWidth="5"
              strokeLinecap="round"
              transform={`rotate(-90 ${cx} ${cy})`}
              initial={{strokeDasharray:`0 ${circ}`}}
              animate={{strokeDasharray:`${dash} ${gap}`}}
              transition={{duration:1,delay:i*0.18,ease:"easeOut"}}/>
            {/* Percentage label */}
            <text x={cx} y={cy+4} textAnchor="middle" fontSize="10" fill={c} fontFamily="monospace" fontWeight="bold">{stock}%</text>
            {/* Item details */}
            <text x={cx+24} y={cy-10} fontSize="9.5" fill="#c9d1d9" fontFamily="sans-serif" fontWeight="bold">{name}</text>
            <text x={cx+24} y={cy+4} fontSize="8" fill={c} fontFamily="monospace">{L.daysLeft(days)}</text>
            {/* Mini stock bar */}
            <rect x={cx+24} y={cy+10} width="110" height="6" rx="2" fill="#21262d"/>
            <motion.rect x={cx+24} y={cy+10} width={stock*1.1} height="6" rx="2" fill={c} opacity="0.8"
              initial={{width:0}} animate={{width:stock*1.1}} transition={{duration:0.9,delay:i*0.18+0.3,ease:"easeOut"}}/>
            <rect x="298" y={cy+28} width="162" height="0.5" fill="#21262d"/>
          </g>
        );
      })}
      {/* Accuracy KPI */}
      <rect x="298" y="248" width="162" height="22" fill="#22C55E12" stroke="#22C55E30" strokeWidth="0.8" rx="5"/>
      <text x="379" y="262" textAnchor="middle" fontSize="8.5" fill="#22C55E" fontFamily="monospace" fontWeight="bold">{L.accuracy}</text>
    </svg>
  );
}

function DashboardPromo({ lang = "zh" }: { lang?: string }) {
  const P = {
    header: lang==="ja"?"OmniCore / プロモーション管理":lang==="en"?"OmniCore / Promotion Engine":"OmniCore / 促銷活動引擎",
    funnelTitle: lang==="ja"?"転換ファネル — 買一送一キャンペーン":lang==="en"?"Conversion Funnel — BOGO Campaign":"轉換漏斗 — 買一送一活動",
    funnelStages: lang==="ja"
      ? ["機台表示","商品閲覧","カート追加","購入完了"]
      : lang==="en"
      ? ["Impressions","Product View","Add to Cart","Purchase"]
      : ["設備展示","商品瀏覽","加入購物車","完成購買"],
    bottomNote: lang==="ja"?"最終購入転換率 12.0%  ·  業界平均比 +8.8pp":lang==="en"?"Final conversion 12.0%  ·  +8.8pp vs industry avg":"最終轉換率 12.0%  ·  高於業界平均 +8.8pp",
    chartTitle: lang==="ja"?"日次売上: 導入前 vs 導入後":lang==="en"?"Daily Sales: Before vs After":"每日銷售: 導入前 vs 導入後",
    activeCampaigns: lang==="ja"?"有効キャンペーン":lang==="en"?"Active Campaigns":"進行中活動",
    totalRedemptions: lang==="ja"?"クーポン利用数":lang==="en"?"Total Redemptions":"兌換次數",
    avgConversion: lang==="ja"?"平均転換率":lang==="en"?"Avg Conversion":"平均轉換率",
    setupTime: lang==="ja"?"設定時間":lang==="en"?"Setup Time":"上架時間",
    noEngineers: lang==="ja"?"エンジニア不要":lang==="en"?"No engineers needed":"無需工程師",
  };
  // Conversion funnel stages
  const funnel = [
    {label:P.funnelStages[0], val:24800, pct:100, c:"#3B82F6"},
    {label:P.funnelStages[1], val:9920, pct:40, c:"#8B5CF6"},
    {label:P.funnelStages[2], val:4464, pct:18, c:"#E8751A"},
    {label:P.funnelStages[3], val:2976, pct:12, c:"#22C55E"},
  ];
  const maxW = 200;
  // Before/after bar chart
  const bars = [
    {label:"Mon", before:82, after:108},
    {label:"Tue", before:95, after:130},
    {label:"Wed", before:74, after:99},
    {label:"Thu", before:110, after:148},
    {label:"Fri", before:128, after:172},
    {label:"Sat", before:155, after:205},
    {label:"Sun", before:140, after:188},
  ];
  const maxB = 205;
  return (
    <svg viewBox="0 0 480 280" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="480" height="280" fill="#0d1117" rx="12"/>
      <rect width="480" height="36" fill="#161b22" rx="12"/>
      <rect x="0" y="12" width="480" height="24" fill="#161b22"/>
      <circle cx="16" cy="18" r="4" fill="#ff5f57"/><circle cx="28" cy="18" r="4" fill="#ffbd2e"/><circle cx="40" cy="18" r="4" fill="#28c840"/>
      <text x="56" y="22" fontSize="10" fill="#8b949e" fontFamily="monospace">{P.header}</text>
      <rect x="386" y="8" width="86" height="20" rx="6" fill="#E8751A"/>
      <text x="429" y="21" textAnchor="middle" fontSize="8" fill="white" fontFamily="monospace" fontWeight="bold">+ New Promo</text>

      {/* KPI row */}
      <rect x="10" y="44" width="106" height="52" fill="#161b22" rx="7"/>
      <text x="18" y="59" fontSize="7.5" fill="#6e7681" fontFamily="monospace">{P.activeCampaigns}</text>
      <text x="18" y="79" fontSize="22" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">3</text>
      <text x="18" y="90" fontSize="7" fill="#22C55E" fontFamily="monospace">/ 4 configured</text>
      <rect x="122" y="44" width="114" height="52" fill="#161b22" rx="7"/>
      <text x="130" y="59" fontSize="7.5" fill="#6e7681" fontFamily="monospace">{P.totalRedemptions}</text>
      <text x="130" y="79" fontSize="18" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">2,770</text>
      <text x="130" y="90" fontSize="7" fill="#22C55E" fontFamily="monospace">↑ +31% this week</text>
      <rect x="242" y="44" width="114" height="52" fill="#161b22" rx="7"/>
      <text x="250" y="59" fontSize="7.5" fill="#6e7681" fontFamily="monospace">{P.avgConversion}</text>
      <text x="250" y="79" fontSize="18" fontWeight="bold" fill="#E8751A" fontFamily="monospace">24.0%</text>
      <text x="250" y="90" fontSize="7" fill="#6e7681" fontFamily="monospace">vs 13.2% baseline</text>
      <rect x="362" y="44" width="110" height="52" fill="#161b22" rx="7"/>
      <text x="370" y="59" fontSize="7.5" fill="#6e7681" fontFamily="monospace">{P.setupTime}</text>
      <text x="370" y="79" fontSize="18" fontWeight="bold" fill="#c9d1d9" fontFamily="monospace">3 min</text>
      <text x="370" y="90" fontSize="7" fill="#22C55E" fontFamily="monospace">{P.noEngineers}</text>

      {/* Left: Conversion Funnel */}
      <rect x="10" y="104" width="228" height="170" fill="#161b22" rx="8"/>
      <text x="20" y="119" fontSize="8.5" fill="#6e7681" fontFamily="monospace">{P.funnelTitle}</text>
      {funnel.map(({label,val,pct,c},i) => {
        const fw = (pct / 100) * maxW;
        const fy = 128 + i * 34;
        const fx = 20 + (maxW - fw) / 2; // centered
        return (
          <g key={i}>
            {/* bg bar full */}
            <rect x="20" y={fy} width={maxW} height="20" fill="#21262d" rx="4" opacity="0.5"/>
            {/* colored bar */}
            <motion.rect x={fx} y={fy} width={fw} height="20" rx="4" fill={c} opacity="0.85"
              initial={{width:0,x:20+maxW/2}} animate={{width:fw,x:fx}}
              transition={{duration:0.8,delay:i*0.15,ease:"easeOut"}}/>
            {/* Labels */}
            <text x="228" y={fy+13} textAnchor="end" fontSize="7.5" fill="#c9d1d9" fontFamily="monospace">{val.toLocaleString()}</text>
            <text x="20" y={fy+13} fontSize="7" fill="white" fontFamily="monospace" fontWeight="bold" opacity="0.9">{label}</text>
            <text x={fx+fw+3} y={fy+13} fontSize="7" fill={c} fontFamily="monospace">{pct}%</text>
            {/* Drop-off arrow between steps */}
            {i < funnel.length - 1 && (
              <text x="114" y={fy+28} textAnchor="middle" fontSize="8" fill="#484f58">↓</text>
            )}
          </g>
        );
      })}
      {/* Funnel bottom note */}
      <rect x="10" y="266" width="228" height="8" fill="#161b22" rx="3"/>
      <text x="124" y="273" textAnchor="middle" fontSize="6.5" fill="#484f58" fontFamily="monospace">{P.bottomNote}</text>

      {/* Right: Before/After bar chart */}
      <rect x="246" y="104" width="226" height="170" fill="#161b22" rx="8"/>
      <text x="256" y="119" fontSize="8.5" fill="#6e7681" fontFamily="monospace">{P.chartTitle}</text>
      {/* Legend */}
      <rect x="350" y="113" width="8" height="6" rx="1" fill="#484f58"/>
      <text x="362" y="119" fontSize="6.5" fill="#484f58" fontFamily="monospace">Before</text>
      <rect x="398" y="113" width="8" height="6" rx="1" fill="#E8751A"/>
      <text x="410" y="119" fontSize="6.5" fill="#E8751A" fontFamily="monospace">After</text>
      {/* Grid lines */}
      {[0,50,100,150,200].map(v => {
        const gy = 262 - (v / maxB) * 128;
        return <line key={v} x1="256" y1={gy} x2="464" y2={gy} stroke="#21262d" strokeWidth="0.6"/>;
      })}
      {bars.map(({label, before, after}, i) => {
        const bx = 260 + i * 29;
        const bh = (before / maxB) * 128;
        const ah = (after / maxB) * 128;
        return (
          <g key={i}>
            {/* Before bar */}
            <motion.rect x={bx} y={262-bh} width="11" height={bh} rx="2" fill="#484f58" opacity="0.6"
              initial={{height:0,y:262}} animate={{height:bh,y:262-bh}} transition={{duration:0.6,delay:i*0.07,ease:"easeOut"}}/>
            {/* After bar */}
            <motion.rect x={bx+13} y={262-ah} width="11" height={ah} rx="2" fill="#E8751A" opacity="0.85"
              initial={{height:0,y:262}} animate={{height:ah,y:262-ah}} transition={{duration:0.6,delay:i*0.07+0.15,ease:"easeOut"}}/>
            <text x={bx+12} y="274" textAnchor="middle" fontSize="7" fill="#484f58" fontFamily="monospace">{label}</text>
          </g>
        );
      })}
      {/* +32% uplift badge */}
      <rect x="330" y="130" width="80" height="20" rx="6" fill="#22C55E18" stroke="#22C55E38" strokeWidth="0.8"/>
      <text x="370" y="143" textAnchor="middle" fontSize="9" fill="#22C55E" fontFamily="monospace" fontWeight="bold">↑ +32% uplift</text>
    </svg>
  );
}

const BACKEND_TABS: {
  icon: string;
  label: { zh: string; en: string; ja: string };
  desc: { zh: string; en: string; ja: string };
  stats: { value: string; label: { zh: string; en: string; ja: string } }[];
  Dashboard: (lang: string) => React.ReactElement;
}[] = [
  {
    icon: "📡",
    label: { zh: "設備即時監控", en: "Device Monitoring", ja: "デバイス監視" },
    desc: { zh: "全台所有機台狀態一畫面掌握——網路、溫度、格子庫存、支付模組健康度，異常秒級推播。", en: "All devices on one screen — network, temperature, slot inventory, and payment health. Instant anomaly alerts.", ja: "全機器の状態を一画面で把握。ネット・温度・スロット在庫・決済モジュールを秒単位で監視。" },
    stats: [
      { value: "847", label: { zh: "在線機台", en: "Devices Online", ja: "オンライン機器" } },
      { value: "99.6%", label: { zh: "稼動率", en: "Uptime", ja: "稼働率" } },
      { value: "<3s", label: { zh: "告警響應", en: "Alert Response", ja: "アラート応答" } },
    ],
    Dashboard: (lang) => DashboardDevice({ lang }),
  },
  {
    icon: "📊",
    label: { zh: "銷售報表分析", en: "Sales Analytics", ja: "売上分析" },
    desc: { zh: "日、週、月多維度報表，依門市 / 品項 / 時段自動切片。AI 自動找出異常時段與爆品機會。", en: "Daily/weekly/monthly reports auto-sliced by store, item, and time slot. AI flags anomalies and top-seller opportunities.", ja: "日次・週次・月次レポートを店舗/商品/時間帯で自動集計。AI が異常と売れ筋機会を検出。" },
    stats: [
      { value: "NT$2.8M", label: { zh: "月營收", en: "Monthly Revenue", ja: "月次売上" } },
      { value: "+18%", label: { zh: "環比增長", en: "MoM Growth", ja: "前月比" } },
      { value: "14,293", label: { zh: "月交易筆數", en: "Transactions", ja: "月次取引" } },
    ],
    Dashboard: (lang) => DashboardSales({ lang }),
  },
  {
    icon: "🤖",
    label: { zh: "AI 庫存補貨", en: "AI Inventory", ja: "AI在庫補充" },
    desc: { zh: "低庫存自動警報，AI 預測補貨時機與數量，掃碼確認補貨完成，達到閉環庫存管理。", en: "Auto low-stock alerts, AI predicts when and how much to restock. Barcode-confirm closes the loop.", ja: "在庫低下を自動アラート。AI が補充タイミングと数量を予測。バーコード確認でクローズドループ管理。" },
    stats: [
      { value: "98.1%", label: { zh: "庫存準確率", en: "Inventory Accuracy", ja: "在庫精度" } },
      { value: "-34%", label: { zh: "補貨人工成本", en: "Labor Saved", ja: "人件費削減" } },
      { value: "3 min", label: { zh: "平均補貨時間", en: "Avg Restock Time", ja: "平均補充時間" } },
    ],
    Dashboard: (lang) => DashboardInventory({ lang }),
  },
  {
    icon: "🎯",
    label: { zh: "促銷活動引擎", en: "Promo Engine", ja: "プロモーション" },
    desc: { zh: "折扣碼、組合促銷、限時活動——店長 3 分鐘自行上架，無需工程師，轉換率即時追蹤。", en: "Discount codes, bundles, timed promos — store owners set up in 3 min, no engineers needed. Real-time conversion tracking.", ja: "割引・セット・期間限定プロモ。店長が3分で設定、エンジニア不要。転換率をリアルタイムで追跡。" },
    stats: [
      { value: "3 min", label: { zh: "上架時間", en: "Setup Time", ja: "設定時間" } },
      { value: "+24%", label: { zh: "平均轉換率", en: "Avg Conversion", ja: "平均転換率" } },
      { value: "0", label: { zh: "需要工程師", en: "Engineers Needed", ja: "エンジニア不要" } },
    ],
    Dashboard: (lang) => DashboardPromo({ lang }),
  },
];

// ─── Layer Illustrations ──────────────────────────────────────────────────────

function IllustrationL1() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" fill="#0a1628" rx="14"/>
      {/* Grid bg */}
      <defs>
        <pattern id="g1" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0L0 0 0 28" fill="none" stroke="#3B82F6" strokeWidth="0.3" opacity="0.25"/>
        </pattern>
      </defs>
      <rect width="400" height="220" fill="url(#g1)" rx="14"/>
      {/* Smart Locker (GraBox) */}
      <motion.g initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.1 }}>
        <rect x="30" y="50" width="90" height="140" rx="10" fill="#0F2440" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="30" y="50" width="90" height="22" rx="10" fill="#3B82F6"/>
        <rect x="30" y="62" width="90" height="10" fill="#3B82F6"/>
        <rect x="38" y="58" width="60" height="8" rx="4" fill="white" opacity="0.3"/>
        {[0,1,2,3,4].map(r => [0,1].map(c => (
          <motion.rect key={r*2+c} x={38+c*38} y={82+r*20} width="34" height="16" rx="5" fill="#1B3A5C" stroke="#3B82F6" strokeWidth="0.8"
            animate={{ borderColor: ["#3B82F6","#60A5FA","#3B82F6"] }} transition={{ duration:2+r*0.3, repeat:Infinity, delay:r*0.2+c*0.1 }}/>
        )))}
        {/* scan line */}
        <motion.line x1="30" y1="100" x2="120" y2="100" stroke="#3B82F6" strokeWidth="1.5" opacity="0.6"
          animate={{ y1:[80,190,80], y2:[80,190,80] }} transition={{ duration:3, repeat:Infinity, ease:"linear" }}/>
      </motion.g>
      {/* Vending Machine */}
      <motion.g initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.25 }}>
        <rect x="155" y="40" width="90" height="150" rx="10" fill="#0F2440" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="163" y="48" width="74" height="48" rx="6" fill="#1B3A5C"/>
        <motion.rect x="163" y="48" width="74" height="48" rx="6" fill="#3B82F6" opacity="0.08"
          animate={{ opacity:[0.08,0.18,0.08] }} transition={{ duration:2.5, repeat:Infinity }}/>
        {/* screen content */}
        <rect x="170" y="56" width="50" height="6" rx="3" fill="#60A5FA" opacity="0.8"/>
        <rect x="170" y="66" width="36" height="5" rx="2.5" fill="#93C5FD" opacity="0.5"/>
        <rect x="170" y="75" width="44" height="5" rx="2.5" fill="#93C5FD" opacity="0.5"/>
        {[0,1,2].map(r => [0,1,2].map(c => (
          <rect key={r*3+c} x={165+c*22} y={106+r*22} width="18" height="18" rx="4" fill="#1B3A5C" stroke="#3B82F6" strokeWidth="0.7"/>
        )))}
        <rect x="163" y="174" width="74" height="8" rx="4" fill="#3B82F6" opacity="0.4"/>
      </motion.g>
      {/* Kiosk */}
      <motion.g initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ duration:0.6, delay:0.4 }}>
        <rect x="280" y="60" width="90" height="130" rx="10" fill="#0F2440" stroke="#3B82F6" strokeWidth="1.5"/>
        <rect x="288" y="68" width="74" height="80" rx="6" fill="#1B3A5C"/>
        <motion.circle cx="325" cy="90" r="20" fill="#3B82F6" opacity="0.15"
          animate={{ scale:[1,1.2,1], opacity:[0.15,0.3,0.15] }} transition={{ duration:2, repeat:Infinity }}/>
        <circle cx="325" cy="90" r="14" fill="#3B82F6" opacity="0.4"/>
        <path d="M315 90 l6 6 12-12" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <rect x="296" y="116" width="58" height="5" rx="2.5" fill="#60A5FA" opacity="0.6"/>
        <rect x="296" y="125" width="40" height="5" rx="2.5" fill="#93C5FD" opacity="0.4"/>
        <rect x="288" y="162" width="74" height="20" rx="5" fill="#3B82F6" opacity="0.3"/>
        <rect x="298" y="167" width="54" height="10" rx="5" fill="#3B82F6" opacity="0.5"/>
      </motion.g>
      {/* floating labels */}
      {[{x:75,y:200,t:"GraBox"},{x:200,y:200,t:"Vending"},{x:325,y:200,t:"Kiosk"}].map(({x,y,t:label},i) => (
        <motion.text key={i} x={x} y={y} textAnchor="middle" fontSize="10" fontWeight="bold" fill="#3B82F6" fontFamily="monospace" opacity="0.8"
          animate={{ opacity:[0.6,1,0.6] }} transition={{ duration:2, repeat:Infinity, delay:i*0.4 }}>{label}</motion.text>
      ))}
      {/* glow */}
      <ellipse cx="200" cy="215" rx="160" ry="8" fill="#3B82F6" opacity="0.07"/>
    </svg>
  );
}

function IllustrationL2() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" fill="#0a1628" rx="14"/>
      {/* PCB board */}
      <motion.rect x="60" y="30" width="280" height="160" rx="10" fill="#0d2010" stroke="#E8751A" strokeWidth="1.5" strokeDasharray="6 3"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ duration:0.5 }}/>
      {/* traces */}
      {[
        "M90,60 L180,60 L180,100", "M180,100 L280,100 L280,60 L320,60",
        "M90,130 L150,130 L150,160 L280,160", "M200,60 L200,140 L240,140",
        "M120,160 L120,100 L160,100", "M300,130 L300,80 L320,80",
      ].map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke="#E8751A" strokeWidth="1.5" opacity="0.25"/>
          <motion.path d={d} fill="none" stroke="#FDBA74" strokeWidth="2" strokeLinecap="round"
            initial={{ pathLength:0, opacity:0 }} animate={{ pathLength:[0,1,0] }}
            transition={{ duration:2.5, repeat:Infinity, delay:i*0.4, ease:"easeInOut" }}/>
        </g>
      ))}
      {/* chips */}
      {[{x:155,y:45,w:50,h:30,label:"MCU"},{x:255,y:45,w:50,h:30,label:"PWR"},{x:100,y:110,w:40,h:40,label:"SAM"},{x:220,y:115,w:60,h:35,label:"EMV"}].map(({x,y,w,h,label},i) => (
        <motion.g key={i} initial={{ opacity:0, scale:0.7 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.4, delay:0.3+i*0.15 }}>
          <rect x={x} y={y} width={w} height={h} rx="5" fill="#1a2e10" stroke="#E8751A" strokeWidth="1.5"/>
          {[...Array(Math.floor(h/8))].map((_,p) => (
            <g key={p}>
              <rect x={x-4} y={y+6+p*8} width="4" height="3" rx="1" fill="#E8751A" opacity="0.6"/>
              <rect x={x+w} y={y+6+p*8} width="4" height="3" rx="1" fill="#E8751A" opacity="0.6"/>
            </g>
          ))}
          <text x={x+w/2} y={y+h/2+4} textAnchor="middle" fontSize="9" fontWeight="bold" fill="#FDBA74" fontFamily="monospace">{label}</text>
          <motion.rect x={x+2} y={y+2} width={w-4} height={h-4} rx="3" fill="#E8751A" opacity="0"
            animate={{ opacity:[0,0.12,0] }} transition={{ duration:1.5, repeat:Infinity, delay:i*0.5 }}/>
        </motion.g>
      ))}
      {/* TOF sensor */}
      <motion.circle cx="320" cy="130" r="18" fill="#1a2e10" stroke="#E8751A" strokeWidth="1.5"
        initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.7 }}/>
      <motion.circle cx="320" cy="130" r="8" fill="#E8751A" opacity="0.5"
        animate={{ scale:[1,1.4,1], opacity:[0.5,0.2,0.5] }} transition={{ duration:1.8, repeat:Infinity }}/>
      <text x="320" y="158" textAnchor="middle" fontSize="8" fill="#FDBA74" fontFamily="monospace" opacity="0.8">TOF</text>
      {/* status dots */}
      {[{cx:90,cy:60},{cx:280,cy:60},{cx:150,cy:160},{cx:280,cy:160}].map(({cx,cy},i) => (
        <motion.circle key={i} cx={cx} cy={cy} r="4" fill="#22C55E"
          animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.2, repeat:Infinity, delay:i*0.3 }}/>
      ))}
    </svg>
  );
}

function IllustrationL3() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" fill="#0a1628" rx="14"/>
      {/* device screen */}
      <motion.rect x="80" y="20" width="240" height="180" rx="20" fill="#071a10" stroke="#22C55E" strokeWidth="2"
        initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} transition={{ duration:0.5 }}/>
      <rect x="80" y="20" width="240" height="40" rx="20" fill="#22C55E" opacity="0.25"/>
      <rect x="80" y="44" width="240" height="16" fill="#22C55E" opacity="0.15"/>
      {/* top bar content */}
      <circle cx="106" cy="40" r="10" fill="#22C55E" opacity="0.5"/>
      <rect x="124" y="34" width="80" height="6" rx="3" fill="#4ADE80" opacity="0.7"/>
      <rect x="124" y="44" width="50" height="5" rx="2.5" fill="#86EFAC" opacity="0.5"/>
      {/* product grid */}
      {[0,1,2,3,4,5].map(i => {
        const row = Math.floor(i/3), col = i%3;
        return (
          <motion.g key={i} initial={{ opacity:0, y:10 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.08 }}>
            <rect x={96+col*70} y={72+row*56} width="58" height="48" rx="10" fill="#0d2a18" stroke="#22C55E" strokeWidth="1"/>
            <rect x={103+col*70} y={79+row*56} width="44" height="26" rx="6" fill="#1a3d22" opacity="0.8"/>
            <motion.rect x={103+col*70} y={79+row*56} width="44" height="26" rx="6" fill="#22C55E" opacity="0"
              animate={{ opacity:[0,0.15,0] }} transition={{ duration:2, repeat:Infinity, delay:i*0.3 }}/>
            <rect x={99+col*70} y={109+row*56} width="54" height="7" rx="3.5" fill="#22C55E" opacity="0.25"/>
          </motion.g>
        );
      })}
      {/* tap ripple */}
      <motion.g>
        {[1,2,3].map(r => (
          <motion.circle key={r} cx="200" cy="110" r={r*16} fill="none" stroke="#22C55E" strokeWidth="1.5"
            animate={{ scale:[0.5,1.5], opacity:[0.8,0] }} transition={{ duration:1.6, repeat:Infinity, delay:r*0.28, ease:"easeOut" }}
            style={{ transformOrigin:"200px 110px" }}/>
        ))}
        <motion.circle cx="200" cy="110" r="8" fill="#22C55E"
          animate={{ scale:[1,0.8,1] }} transition={{ duration:0.8, repeat:Infinity }}/>
      </motion.g>
      {/* payment strip */}
      <rect x="88" y="178" width="224" height="16" rx="8" fill="#22C55E" opacity="0.2"/>
      {["💳","📱","QR","💰"].map((icon,i) => (
        <text key={i} x={110+i*52} y="190" textAnchor="middle" fontSize="9" fill="#4ADE80" fontFamily="sans-serif" opacity="0.9">{icon}</text>
      ))}
    </svg>
  );
}

function IllustrationL4() {
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" fill="#0a1628" rx="14"/>
      {/* cloud shape */}
      <motion.g animate={{ y:[0,-5,0] }} transition={{ duration:4, repeat:Infinity, ease:"easeInOut" }}
        style={{ transformOrigin:"200px 70px" }}>
        <ellipse cx="200" cy="72" rx="68" ry="36" fill="#1a0f2e" stroke="#A855F7" strokeWidth="2"/>
        <ellipse cx="165" cy="82" rx="48" ry="28" fill="#1a0f2e" stroke="#A855F7" strokeWidth="1.5"/>
        <ellipse cx="235" cy="82" rx="48" ry="28" fill="#1a0f2e" stroke="#A855F7" strokeWidth="1.5"/>
        <ellipse cx="200" cy="90" rx="80" ry="26" fill="#1a0f2e" stroke="#A855F7" strokeWidth="1.5"/>
        {/* OmniCore label */}
        <text x="200" y="78" textAnchor="middle" fontSize="11" fontWeight="bold" fill="#C084FC" fontFamily="monospace">OmniCore</text>
        <motion.text x="200" y="90" textAnchor="middle" fontSize="8" fill="#A855F7" fontFamily="monospace" opacity="0.7"
          animate={{ opacity:[0.5,1,0.5] }} transition={{ duration:2, repeat:Infinity }}>● LIVE</motion.text>
      </motion.g>
      {/* data lines from devices to cloud */}
      {[{x:60,y:170},{x:150,y:180},{x:250,y:180},{x:340,y:170}].map(({x,y},i) => (
        <g key={i}>
          <line x1={x} y1={y-20} x2={200} y2={112} stroke="#A855F7" strokeWidth="1" strokeDasharray="4 3" opacity="0.3"/>
          <motion.circle cx={x+(200-x)*0.5} cy={(y-20+(112))*0.5} r="3" fill="#A855F7"
            animate={{ cx:[x,200], cy:[y-20,112], opacity:[1,0] }} transition={{ duration:1.5, repeat:Infinity, delay:i*0.4 }}/>
        </g>
      ))}
      {/* devices at bottom */}
      {[{x:30,label:"機台A"},{x:118,label:"機台B"},{x:218,label:"機台C"},{x:308,label:"機台D"}].map(({x,label},i) => (
        <motion.g key={i} initial={{ opacity:0, y:16 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.2+i*0.12 }}>
          <rect x={x} y={148} width="60" height="42" rx="8" fill="#160a2e" stroke="#A855F7" strokeWidth="1.2"/>
          <rect x={x} y={148} width="60" height="14" rx="8" fill="#A855F7" opacity="0.3"/>
          <rect x={x} y={155} width="60" height="7" fill="#A855F7" opacity="0.2"/>
          <motion.circle cx={x+50} cy={153} r="4" fill="#22C55E"
            animate={{ opacity:[1,0.3,1] }} transition={{ duration:1.2, repeat:Infinity, delay:i*0.25 }}/>
          <text x={x+30} y={183} textAnchor="middle" fontSize="8" fill="#C084FC" fontFamily="monospace" opacity="0.8">{label}</text>
        </motion.g>
      ))}
      {/* dashboard cards floating near cloud */}
      {[{x:22,y:40,c:"#A855F7"},{x:316,y:40,c:"#7C3AED"}].map(({x,y,c},i) => (
        <motion.g key={i} initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.5+i*0.2 }}>
          <rect x={x} y={y} width="56" height="36" rx="7" fill="#160a2e" stroke={c} strokeWidth="1.2"/>
          <rect x={x+4} y={y+6} width="30" height="5" rx="2.5" fill={c} opacity="0.6"/>
          <rect x={x+4} y={y+15} width="48" height="4" rx="2" fill={c} opacity="0.35"/>
          <rect x={x+4} y={y+23} width="36" height="4" rx="2" fill={c} opacity="0.25"/>
        </motion.g>
      ))}
    </svg>
  );
}

function IllustrationL5() {
  const nodes = [
    {x:200,y:110,label:"OmniCore",r:28,c:"#14B8A6",main:true},
    {x:80,y:50,label:"ERP",r:20,c:"#14B8A6"},
    {x:200,y:30,label:"POS",r:20,c:"#14B8A6"},
    {x:320,y:50,label:"LINE Pay",r:20,c:"#14B8A6"},
    {x:340,y:150,label:"91APP",r:20,c:"#14B8A6"},
    {x:240,y:195,label:"Lalamove",r:20,c:"#14B8A6"},
    {x:100,y:185,label:"EasyCard",r:20,c:"#14B8A6"},
    {x:50,y:130,label:"Ocard",r:20,c:"#14B8A6"},
  ];
  return (
    <svg viewBox="0 0 400 220" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <rect width="400" height="220" fill="#0a1628" rx="14"/>
      {/* connection lines */}
      {nodes.slice(1).map((n,i) => (
        <g key={i}>
          <line x1="200" y1="110" x2={n.x} y2={n.y} stroke="#14B8A6" strokeWidth="1" strokeDasharray="5 3" opacity="0.25"/>
          <motion.circle cx="200" cy="110" r="3" fill="#14B8A6"
            animate={{ cx:[200,n.x], cy:[110,n.y], opacity:[0.9,0] }}
            transition={{ duration:1.6, repeat:Infinity, delay:i*0.3, ease:"easeIn" }}/>
        </g>
      ))}
      {/* node circles */}
      {nodes.map((n,i) => (
        <motion.g key={i} initial={{ opacity:0, scale:0.6 }} animate={{ opacity:1, scale:1 }}
          transition={{ duration:0.4, delay:i*0.1, type:"spring", stiffness:300 }}
          style={{ transformOrigin:`${n.x}px ${n.y}px` }}>
          <motion.circle cx={n.x} cy={n.y} r={n.r+6} fill="none" stroke={n.c} strokeWidth="1"
            animate={{ scale:[1,1.25,1], opacity:[0.3,0,0.3] }} transition={{ duration:2.5, repeat:Infinity, delay:i*0.35 }}
            style={{ transformOrigin:`${n.x}px ${n.y}px` }}/>
          <circle cx={n.x} cy={n.y} r={n.r} fill={n.main?"#0d2e2c":"#0d2020"} stroke={n.c} strokeWidth={n.main?2.5:1.5}/>
          <text x={n.x} y={n.y+(n.main?4:3)} textAnchor="middle" fontSize={n.main?10:8} fontWeight="bold" fill={n.main?"#2DD4BF":"#5EEAD4"} fontFamily="monospace">{n.label}</text>
        </motion.g>
      ))}
    </svg>
  );
}

const LAYER_ILLUSTRATIONS = [IllustrationL1, IllustrationL2, IllustrationL3, IllustrationL4, IllustrationL5];

// ─── Component ────────────────────────────────────────────────────────────────
export default function IntroPage() {
  const { lang } = useLanguage();
  const t = T[lang as keyof typeof T] ?? T.zh;
  const [fmTab, setFmTab] = useState(0);
  const [activeLayer, setActiveLayer] = useState<number>(0);
  const [openModule, setOpenModule] = useState<number>(0);
  const [openClient, setOpenClient] = useState<number | null>(null);
  const [lightboxImg, setLightboxImg] = useState<string | null>(null);
  const [backendSlide, setBackendSlide] = useState(0);

  return (
    <LightboxCtx.Provider value={setLightboxImg}>
    <>
    {/* ── Lightbox Overlay ── */}
    <AnimatePresence>
      {lightboxImg && (
        <motion.div
          key="lightbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightboxImg(null)}
        >
          <motion.div
            initial={{ scale: 0.88, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.88, opacity: 0 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={lightboxImg}
              alt="zoom"
              className="max-w-full max-h-[88vh] object-contain rounded-xl shadow-2xl"
            />
          </motion.div>
          <button
            className="absolute top-4 right-5 text-white/80 hover:text-white text-3xl font-light leading-none"
            onClick={() => setLightboxImg(null)}
          >
            ×
          </button>
        </motion.div>
      )}
    </AnimatePresence>
    <div className="min-h-screen bg-white text-[#1a1a2e] font-sans">

      {/* ── Sticky Header ── */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur border-b border-gray-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#1B3A5C] flex items-center justify-center">
              <span className="text-white text-xs font-black">M</span>
            </div>
            <span className="font-bold text-[#1B3A5C] text-sm">MCS 銓幻元科技</span>
          </a>
          <div className="flex items-center gap-3">
            <a href="/" className="text-xs text-gray-500 hover:text-[#1B3A5C] transition-colors hidden sm:block">
              {t.nav.back}
            </a>
            <LanguageSwitcher segmented />
          </div>
        </div>
      </header>

      {/* ── Hero ── */}
      <section className="relative bg-[#060D1A] text-white pt-24 pb-28 px-6 overflow-hidden">
        {/* ── Background layers ── */}
        {/* Central orange radial glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 90% 70% at 48% 45%, rgba(232,117,26,0.22) 0%, rgba(27,58,92,0.18) 38%, transparent 68%)" }} />
        {/* Top-right blue glow */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 55% 45% at 88% 8%, rgba(59,130,246,0.14) 0%, transparent 60%)" }} />
        {/* Bottom-left teal hint */}
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse 40% 35% at 5% 90%, rgba(20,184,166,0.10) 0%, transparent 55%)" }} />
        {/* Grid */}
        <div className="absolute inset-0 opacity-[0.045]"
          style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)", backgroundSize: "44px 44px" }} />
        {/* Floating particles */}
        {[...Array(18)].map((_, i) => {
          const colors = ["#E8751A","#3B82F6","#F59E0B","#14B8A6","#A855F7"];
          const sz = 2 + (i % 3);
          return (
            <motion.div key={i}
              className="absolute rounded-full pointer-events-none"
              style={{
                width: sz, height: sz,
                left: `${(i * 5.6) % 96 + 2}%`,
                top: `${12 + (i * 4.7) % 76}%`,
                background: colors[i % colors.length],
                opacity: 0.5,
              }}
              animate={{ y: [0, -14, 0], opacity: [0.25, 0.7, 0.25], scale: [1, 1.4, 1] }}
              transition={{ duration: 2.8 + i * 0.38, repeat: Infinity, ease: "easeInOut", delay: i * 0.22 }}
            />
          );
        })}
        {/* Horizontal divider glow line at top */}
        <div className="absolute top-0 left-0 right-0 h-px"
          style={{ background: "linear-gradient(90deg, transparent 5%, rgba(232,117,26,0.6) 30%, rgba(59,130,246,0.6) 70%, transparent 95%)" }} />

        <div className="max-w-5xl mx-auto relative">
          {/* Animated gradient border badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: [0.22,1,0.36,1] }}
            className="relative inline-flex mb-7"
          >
            <motion.div className="absolute inset-0 rounded-full"
              style={{ background: "linear-gradient(90deg, #E8751A, #F59E0B, #A855F7, #3B82F6, #E8751A)", backgroundSize: "300% 100%", padding: "1.5px" }}
              animate={{ backgroundPosition: ["0% 0%", "100% 0%", "0% 0%"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />
            <div className="relative bg-[#060D1A]/95 rounded-full px-5 py-2 m-[1.5px]">
              <span className="text-[11px] font-black tracking-[0.22em] uppercase text-[#f5a87a]">{t.hero.badge}</span>
            </div>
          </motion.div>

          {/* H1 — massive */}
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22,1,0.36,1] }}
            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.06] tracking-tight mb-5"
          >
            {t.hero.title}<br />
            {/* Shimmer gradient accent */}
            <motion.span
              style={{
                background: "linear-gradient(105deg, #E8751A 0%, #FBBF24 38%, #F97316 55%, #E8751A 100%)",
                backgroundSize: "200% 100%",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              } as React.CSSProperties}
              animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 0.5 }}
            >
              {t.hero.titleAccent}
            </motion.span>
          </motion.h1>

          {/* Sub */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.22 }}
            className="text-white/65 text-base md:text-lg max-w-2xl mb-12 leading-relaxed"
          >
            {t.hero.sub}
          </motion.p>

          {/* Stats — glowing cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {t.hero.stats.map((s, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.3 + i * 0.09, ease: [0.22,1,0.36,1] }}
                className="group relative"
              >
                <div className="relative bg-white/[0.04] border border-white/[0.08] rounded-2xl p-4 md:p-5 overflow-hidden hover:border-[#E8751A]/40 transition-all duration-300">
                  {/* Top shimmer line */}
                  <div className="absolute inset-x-0 top-0 h-[1px]"
                    style={{ background: "linear-gradient(90deg, transparent, rgba(232,117,26,0.6), transparent)" }} />
                  {/* Inner glow */}
                  <div className="absolute inset-0 rounded-2xl"
                    style={{ background: "radial-gradient(ellipse 80% 50% at 50% -10%, rgba(232,117,26,0.14), transparent 70%)" }} />
                  {/* Number */}
                  <div className="text-4xl md:text-5xl font-black text-[#E8751A] leading-none mb-2 relative">
                    <CountUp target={s.num} duration={2.2} />
                  </div>
                  <div className="text-white/50 text-xs leading-snug relative">{s.label}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* CTA — glowing button */}
          {t.hero.cta && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.65 }}
              className="flex items-center gap-4 flex-wrap"
            >
              <a
                href="mailto:service@mcstation.ai?subject=Demo Request"
                className="relative inline-flex items-center gap-2 text-white font-bold px-8 py-3.5 rounded-full text-sm overflow-hidden group/cta"
              >
                {/* Button bg */}
                <span className="absolute inset-0 rounded-full bg-[#E8751A] group-hover/cta:bg-[#d4651a] transition-colors duration-200" />
                {/* Glow halo */}
                <motion.span className="absolute inset-0 rounded-full"
                  style={{ background: "#E8751A", filter: "blur(14px)", opacity: 0 }}
                  whileHover={{ opacity: 0.55 }}
                  transition={{ duration: 0.3 }}
                />
                {/* Pulse ring */}
                <motion.span className="absolute inset-0 rounded-full border-2 border-[#E8751A]"
                  animate={{ scale: [1, 1.25, 1.5], opacity: [0.6, 0.2, 0] }}
                  transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }}
                />
                <span className="relative">{t.hero.cta} →</span>
              </a>
              <motion.p
                className="text-white/30 text-xs"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              >
                {lang === "ja" ? "返信は通常 24 時間以内" : lang === "en" ? "Reply within 24 hours" : "24 小時內回覆"}
              </motion.p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── 5-Layer Stack ── */}
      <section className="py-20 px-6 bg-[#0F1B2D] overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <FadeIn><p className="text-xs font-bold uppercase tracking-widest text-[#E8751A] mb-2">{t.stack.label}</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="text-3xl md:text-5xl font-black text-white mb-3">{t.stack.title}</h2></FadeIn>
          <FadeIn delay={0.1}><p className="text-white/50 mb-12 max-w-2xl">{t.stack.sub}</p></FadeIn>

          {/* Master-Detail: Left L1~L5 list + Right illustration panel */}
          <div className="flex flex-col md:flex-row gap-5 items-start">

            {/* Left: layer buttons */}
            <div className="w-full md:w-[38%] flex flex-col gap-2 md:sticky md:top-20 md:self-start">
              {t.stack.layers.map((layer, i) => {
                const accents: Record<number, string> = { 0:"#3B82F6", 1:"#E8751A", 2:"#22C55E", 3:"#A855F7", 4:"#14B8A6" };
                const accent = accents[i] ?? "#E8751A";
                const isActive = activeLayer === i;
                const Illus = LAYER_ILLUSTRATIONS[i];
                return (
                  <motion.button
                    key={i}
                    onClick={() => setActiveLayer(i)}
                    initial={{ opacity:0, x:-16 }}
                    whileInView={{ opacity:1, x:0 }}
                    viewport={{ once:true }}
                    transition={{ duration:0.35, delay:i*0.07 }}
                    className="w-full text-left rounded-2xl overflow-hidden transition-all duration-200 select-none"
                    style={{
                      border: `2px solid ${isActive ? accent : accent+"30"}`,
                      background: isActive ? `${accent}15` : "rgba(255,255,255,0.03)",
                      boxShadow: isActive ? `0 4px 24px ${accent}25` : "none",
                    }}
                  >
                    <div className="flex items-center gap-3 px-4 py-3">
                      {/* L-badge */}
                      <span className="text-xs font-black w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0"
                        style={{ background: isActive ? accent : `${accent}30`, color: "#fff" }}>
                        {layer.num}
                      </span>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-sm text-white leading-tight">{layer.name}</div>
                        <div className="text-xs mt-0.5 truncate" style={{ color: accent, opacity:0.7 }}>{layer.en}</div>
                      </div>
                      <motion.div animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 6 }} transition={{ duration:0.2 }}
                        style={{ color: accent }}>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                          <path d="M9 18l6-6-6-6"/>
                        </svg>
                      </motion.div>
                    </div>
                    {/* mini SVG thumbnail only when active on mobile */}
                    {isActive && (
                      <div className="md:hidden px-3 pb-3 h-32 rounded-xl overflow-hidden">
                        <Illus />
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Right: detail panel */}
            <div className="w-full md:w-[62%] md:sticky md:top-20 md:self-start">
              <AnimatePresence mode="wait">
                {(() => {
                  const accents: Record<number, string> = { 0:"#3B82F6", 1:"#E8751A", 2:"#22C55E", 3:"#A855F7", 4:"#14B8A6" };
                  const layer = t.stack.layers[activeLayer];
                  const accent = accents[activeLayer] ?? "#E8751A";
                  const Illus = LAYER_ILLUSTRATIONS[activeLayer];
                  return (
                    <motion.div
                      key={activeLayer}
                      initial={{ opacity:0, x:20 }}
                      animate={{ opacity:1, x:0 }}
                      exit={{ opacity:0, x:-10 }}
                      transition={{ duration:0.28, ease:[0.22,1,0.36,1] }}
                      className="rounded-2xl overflow-hidden"
                      style={{ border:`2px solid ${accent}40`, background:"rgba(255,255,255,0.03)" }}
                    >
                      {/* Header */}
                      <div className="px-5 py-4 flex items-center gap-3"
                        style={{ background:`${accent}20`, borderBottom:`1px solid ${accent}30` }}>
                        <span className="text-xs font-black px-3 py-1 rounded-full"
                          style={{ background:accent, color:"#fff" }}>{layer.num}</span>
                        <div>
                          <div className="font-black text-white text-lg leading-tight">{layer.name}</div>
                          <div className="text-xs mt-0.5" style={{ color:accent }}>{layer.en}</div>
                        </div>
                      </div>

                      {/* SVG Illustration */}
                      <div className="p-4 pb-0" style={{ aspectRatio:"16/7" }}>
                        <div className="rounded-xl overflow-hidden h-full">
                          <Illus />
                        </div>
                      </div>

                      {/* Capability Cards */}
                      <div className="p-5">
                        <div className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color:accent, opacity:0.8 }}>
                          {lang==="ja" ? "主な機能・対応" : lang==="en" ? "Capabilities" : "技術能力"}
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {layer.items.map((item, j) => (
                            <motion.div key={j}
                              initial={{ opacity:0, x:-10 }}
                              animate={{ opacity:1, x:0 }}
                              transition={{ duration:0.22, delay:j*0.05 }}
                              className="flex items-center gap-3 rounded-xl px-3.5 py-2.5 select-none"
                              style={{
                                background:`linear-gradient(110deg, ${accent}14 0%, ${accent}06 100%)`,
                                border:`1px solid ${accent}28`,
                                borderLeft:`3px solid ${accent}`,
                              }}
                            >
                              <span className="text-[10px] font-black tabular-nums min-w-[18px]" style={{color:accent}}>
                                {String(j + 1).padStart(2, "0")}
                              </span>
                              <span className="text-xs font-semibold text-white/90 leading-snug flex-1">{item}</span>
                              <motion.div
                                className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                                style={{ background: accent }}
                                animate={{ opacity:[1,0.25,1] }}
                                transition={{ duration:2, repeat:Infinity, delay:j*0.28 }}
                              />
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>

      {/* ── OmniCore Platform ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn><p className="text-xs font-bold uppercase tracking-widest text-[#E8751A] mb-2">{t.platform.label}</p></FadeIn>
          <FadeIn delay={0.05}><h2 className="text-3xl md:text-4xl font-black text-[#1B3A5C] mb-3">{t.platform.title}</h2></FadeIn>
          <FadeIn delay={0.1}><p className="text-gray-500 mb-10 max-w-2xl">{t.platform.sub}</p></FadeIn>

          {/* Master-Detail: Left list + Right sticky panel */}
          <div className="flex flex-col md:flex-row gap-4 mb-4 items-start">

            {/* ── Left: feature list ── */}
            <div className="w-full md:w-[42%] flex flex-col gap-1.5 md:sticky md:top-20 md:self-start">
              {t.platform.features.map((f, i) => {
                const isActive = openModule === i;
                const detail = MODULE_DETAILS[i];
                return (
                  <motion.button
                    key={i}
                    onClick={() => setOpenModule(i)}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl border-2 transition-all duration-200 text-left group select-none ${
                      isActive
                        ? `${detail.light} border-[#E8751A] shadow-md`
                        : "bg-gray-50 border-transparent hover:border-[#E8751A]/40 hover:bg-orange-50/30"
                    }`}
                  >
                    {/* Left accent bar */}
                    <div className={`w-1 h-8 rounded-full flex-shrink-0 transition-colors duration-200 ${isActive ? "bg-[#E8751A]" : "bg-gray-200 group-hover:bg-[#E8751A]/40"}`} />
                    {/* Icon */}
                    <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-lg flex-shrink-0 transition-all duration-200 ${isActive ? detail.color + " shadow-md" : "bg-gray-200"}`}>
                      {f.icon}
                    </div>
                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className={`font-bold text-sm leading-tight transition-colors ${isActive ? "text-[#1B3A5C]" : "text-gray-700"}`}>{f.name}</div>
                      <div className={`text-xs leading-relaxed mt-0.5 transition-colors line-clamp-1 ${isActive ? "text-gray-500" : "text-gray-400"}`}>{f.desc}</div>
                    </div>
                    {/* Active indicator */}
                    <motion.div
                      animate={{ opacity: isActive ? 1 : 0, x: isActive ? 0 : 4 }}
                      transition={{ duration: 0.2 }}
                      className="text-[#E8751A] flex-shrink-0"
                    >
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 18l6-6-6-6" />
                      </svg>
                    </motion.div>
                  </motion.button>
                );
              })}
            </div>

            {/* ── Right: detail panel ── */}
            <div className="w-full md:w-[58%] md:sticky md:top-20 md:self-start">
              <AnimatePresence mode="wait">
                {(() => {
                  const i = openModule;
                  const f = t.platform.features[i];
                  const detail = MODULE_DETAILS[i];
                  const Illus = MODULE_ILLUSTRATIONS[i];
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -8 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      className={`rounded-2xl border-2 border-[#E8751A]/30 overflow-hidden ${detail.light}`}
                    >
                      {/* Panel header */}
                      <div className={`${detail.color} px-5 py-4 flex items-center gap-3`}>
                        <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center text-xl flex-shrink-0">
                          {f.icon}
                        </div>
                        <div>
                          <div className="font-black text-white text-lg leading-tight">{f.name}</div>
                          <div className="text-white/70 text-xs mt-0.5">{f.desc}</div>
                        </div>
                      </div>

                      <div className="p-5 space-y-4">
                        {/* Illustration */}
                        {Illus && (
                          <div className="rounded-xl overflow-hidden shadow-sm" style={{ aspectRatio: "2/1" }}>
                            <Illus />
                          </div>
                        )}

                        {/* Scenario */}
                        <div>
                          <div className="text-xs font-bold text-[#E8751A] uppercase tracking-wider mb-2">
                            {lang === "ja" ? "実際の使用シナリオ" : lang === "en" ? "Real Usage Scenario" : "真實使用情境"}
                          </div>
                          <div className="bg-white rounded-xl px-4 py-3 text-sm text-gray-700 leading-relaxed border border-gray-100 italic shadow-sm">
                            「{detail.scenario[lang as "zh" | "en" | "ja"] ?? detail.scenario.zh}」
                          </div>
                        </div>

                        {/* Key capabilities */}
                        <div>
                          <div className="text-xs font-bold text-[#1B3A5C] uppercase tracking-wider mb-2">
                            {lang === "ja" ? "主要機能" : lang === "en" ? "Key Capabilities" : "核心能力"}
                          </div>
                          <ul className="space-y-1.5">
                            {(detail.bullets[lang as "zh" | "en" | "ja"] ?? detail.bullets.zh).map((b, j) => (
                              <li key={j} className="flex items-start gap-2 text-xs text-gray-700">
                                <span className={`mt-0.5 w-5 h-5 rounded-full flex items-center justify-center text-white text-[10px] font-black flex-shrink-0 shadow-sm ${detail.color}`}>{j + 1}</span>
                                {b}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>{/* end p-5 */}
                    </motion.div>
                  );
                })()}
              </AnimatePresence>
            </div>{/* end right panel */}
          </div>{/* end master-detail */}

          {/* Integration grid */}
          <div className="border border-gray-200 rounded-2xl overflow-hidden">
            <SubBanner bg="bg-[#1B3A5C]" title={t.platform.integLabel} accentLine="#E8751A" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-gray-100">
              {t.platform.integGroups.map((group, i) => (
                <div key={i} className="p-5">
                  <div className="text-xs font-bold text-[#E8751A] uppercase tracking-wider mb-3">{group.title}</div>
                  <ul className="space-y-1.5">
                    {group.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-xs text-gray-600">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1B3A5C] flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

          {/* ── Backend Showcase (Master-Detail) ── */}
          <div className="mt-14">
            <FadeIn>
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8751A] mb-1">
                {lang === "ja" ? "実際の管理画面" : lang === "en" ? "Live Dashboard" : "後台實際畫面"}
              </p>
              <h3 className="text-2xl font-black text-[#1B3A5C] mb-6">
                {lang === "ja" ? "OmniCore — 実際の操作UI" : lang === "en" ? "OmniCore in Action" : "OmniCore 後台操作介面"}
              </h3>
            </FadeIn>

            <div className="flex flex-col md:flex-row gap-5 items-start">
              {/* Left: tab cards (sticky) */}
              <div className="w-full md:w-[36%] flex flex-col gap-2.5 md:sticky md:top-20 md:self-start">
                {BACKEND_TABS.map((tab, i) => {
                  const isActive = backendSlide === i;
                  const l = lang as "zh" | "en" | "ja";
                  return (
                    <motion.button
                      key={i}
                      onClick={() => setBackendSlide(i)}
                      initial={{ opacity: 0, x: -12 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.3, delay: i * 0.06 }}
                      className={`w-full text-left rounded-2xl border-2 transition-all duration-200 overflow-hidden ${
                        isActive
                          ? "border-[#E8751A] shadow-xl bg-[#FFF8F4]"
                          : "border-gray-100 bg-gray-50 hover:border-[#E8751A]/30 hover:bg-orange-50/20"
                      }`}
                    >
                      {/* Card header */}
                      <div className={`px-4 py-3 flex items-center gap-3 ${isActive ? "bg-[#E8751A]" : "bg-transparent"}`}>
                        <span className="text-xl">{tab.icon}</span>
                        <span className={`font-black text-sm leading-tight ${isActive ? "text-white" : "text-[#1B3A5C]"}`}>
                          {tab.label[l] ?? tab.label.zh}
                        </span>
                        {isActive && (
                          <motion.div className="ml-auto w-2 h-2 rounded-full bg-white"
                            animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.2, repeat: Infinity }} />
                        )}
                      </div>
                      {/* Expanded content */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            key="content"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.22 }}
                            className="overflow-hidden"
                          >
                            <div className="px-4 py-3">
                              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                                {tab.desc[l] ?? tab.desc.zh}
                              </p>
                              <div className="flex gap-2">
                                {tab.stats.map((s, j) => (
                                  <div key={j} className="flex-1 bg-white rounded-xl p-2 border border-orange-100 text-center shadow-sm">
                                    <div className="font-black text-sm text-[#E8751A] leading-tight">{s.value}</div>
                                    <div className="text-[9px] text-gray-400 mt-0.5 leading-tight">{s.label[l] ?? s.label.zh}</div>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  );
                })}
              </div>

              {/* Right: animated dashboard SVG */}
              <div className="flex-1 md:sticky md:top-20 md:self-start">
                <AnimatePresence mode="wait">
                  {(() => {
                    const tab = BACKEND_TABS[backendSlide];
                    const Dash = tab.Dashboard;
                    const routes = ["devices", "analytics", "inventory", "promotions"];
                    return (
                      <motion.div
                        key={backendSlide}
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -18 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="rounded-2xl overflow-hidden border border-gray-200 shadow-2xl bg-[#0d1117]"
                      >
                        {/* Browser chrome */}
                        <div className="bg-[#161b22] px-4 py-2.5 flex items-center gap-2 border-b border-white/10">
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
                          <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                          <div className="flex-1 mx-3 bg-white/8 rounded px-2 py-0.5 text-[9px] text-white/30 font-mono select-none">
                            omnicore.mcstation.ai / {routes[backendSlide]}
                          </div>
                          <motion.span
                            className="text-[9px] text-[#22C55E] font-mono select-none"
                            animate={{ opacity: [1, 0.3, 1] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                          >● LIVE</motion.span>
                        </div>
                        {/* Dashboard */}
                        <div style={{ aspectRatio: "480 / 280" }}>
                          {Dash(lang)}
                        </div>
                      </motion.div>
                    );
                  })()}
                </AnimatePresence>
              </div>
            </div>
          </div>
      </section>

      {/* ── EB+ 東方美 × OmniCore ── */}
      <section className="py-20 px-6 bg-[#0F2440]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            {/* Section label */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-black uppercase tracking-[0.2em] text-[#E8751A] mb-3"
            >
              {t.ebplus.label}
            </motion.p>
            {/* Main title — oversized with shimmer */}
            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 relative"
            >
              {t.ebplus.title}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(232,117,26,0.18) 50%, transparent 65%)", backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
            </motion.h2>
            {/* Badge row */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="flex flex-wrap items-center gap-3 mb-4"
            >
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#E8751A] text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg shadow-[#E8751A]/30"
              >
                {t.ebplus.badge}
              </motion.span>
              <span className="bg-white/10 border border-white/20 text-white text-sm font-bold px-4 py-1.5 rounded-full">{t.ebplus.roleChip}</span>
            </motion.div>
            <p className="text-white/70 mb-3 max-w-3xl">{t.ebplus.sub}</p>
            <div className="bg-[#E8751A]/15 border border-[#E8751A]/30 rounded-xl px-4 py-2.5 mb-8 max-w-3xl">
              <p className="text-[#f5a87a] text-sm font-semibold">{t.ebplus.roleNote}</p>
            </div>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Stats */}
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-2 gap-4 mb-6">
                {t.ebplus.stats.map((s, i) => (
                  <div key={i} className="bg-white/8 border border-white/15 rounded-xl p-4 text-center">
                    <div className="text-xl md:text-2xl font-black text-[#E8751A] leading-tight mb-1">{s.num}</div>
                    <div className="text-white/50 text-xs leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {t.ebplus.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-[#E8751A] font-bold text-sm flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-white/80 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>

            {/* OmniCore platform visual */}
            <FadeIn delay={0.15}>
              <div className="rounded-2xl overflow-hidden border border-white/15 bg-white/5">
                <div className="bg-[#1B3A5C] px-5 py-3 flex items-center gap-2">
                  <span className="text-white font-bold text-sm">OmniCore</span>
                  <span className="text-white/40 text-xs">—</span>
                  <span className="text-white/60 text-xs">
                    {lang === "ja" ? "東方美グループ 専用テナント" : lang === "en" ? "EB+ Group Tenant" : "東方美集團 專屬租戶"}
                  </span>
                </div>
                {/* Architecture flow */}
                <div className="p-5 space-y-3">
                  {[
                    {
                      icon: "📱",
                      label: lang === "ja" ? "LINE LIFF 注文" : lang === "en" ? "LINE LIFF Order" : "LINE LIFF 點餐",
                      detail: lang === "ja" ? "顧客がLINEでメニュー注文→受取時間選択→決済" : lang === "en" ? "Customer orders via LINE → picks up time → payment" : "客人用 LINE 點餐 → 選取餐時間 → 付款"
                    },
                    {
                      icon: "📦",
                      label: lang === "ja" ? "GraBox 自動取出" : lang === "en" ? "GraBox Self-Pickup" : "GraBox 自助取餐",
                      detail: lang === "ja" ? "QRコードでロッカー自動開錠→行列不要→UV除菌済み" : lang === "en" ? "QR → locker auto-opens → no queue → UV sterilized" : "QR 碼 → 格子自動開啟 → 免等叫號 → UV 殺菌"
                    },
                    {
                      icon: "🚚",
                      label: lang === "ja" ? "192台 配送車 GPS 管理" : lang === "en" ? "192-Vehicle GPS Fleet" : "192 台配送車 GPS 調度",
                      detail: lang === "ja" ? "全配送車をリアルタイムGPS追跡・ルート最適化・到着予測" : lang === "en" ? "Real-time GPS tracking, route optimization, ETA prediction" : "即時 GPS 追蹤、路線優化、到達時間預測"
                    },
                    {
                      icon: "🏪",
                      label: lang === "ja" ? "970店舗 在庫監視" : lang === "en" ? "970-Store Inventory Monitor" : "970 門市庫存監控",
                      detail: lang === "ja" ? "全店の在庫水準・補充タイミング・食安温度を一元管理" : lang === "en" ? "All-store inventory, restocking timing, food-safety temperature in one view" : "全門市庫存、補貨時機、食安溫控一鍵掌握"
                    },
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-3 bg-white/5 rounded-xl px-4 py-3">
                      <span className="text-xl flex-shrink-0">{item.icon}</span>
                      <div>
                        <div className="text-white font-bold text-sm">{item.label}</div>
                        <div className="text-white/45 text-xs leading-relaxed mt-0.5">{item.detail}</div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="px-5 pb-5">
                  <div className="bg-[#E8751A]/20 border border-[#E8751A]/40 rounded-xl px-4 py-3">
                    <div className="text-[#f5a87a] text-xs font-bold mb-1">
                      {lang === "ja" ? "コスト比較" : lang === "en" ? "Cost Comparison" : "成本比較"}
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <div className="text-center flex-1">
                        <div className="text-red-400 font-black text-base">{lang === "ja" ? "自社構築 IT" : lang === "en" ? "Self-build IT" : "自建 IT"}</div>
                        <div className="text-white/50 text-[11px] font-semibold mt-0.5">{lang === "ja" ? "基準コスト 100%" : lang === "en" ? "Baseline: 100%" : "基準成本 100%"}</div>
                      </div>
                      <div className="flex flex-col items-center gap-0.5 flex-shrink-0">
                        <div className="text-white/30 text-xl font-bold">→</div>
                        <div className="text-[9px] text-white/25 font-mono">{lang === "ja" ? "導入後" : lang === "en" ? "with OmniCore" : "導入後"}</div>
                      </div>
                      <div className="text-center flex-1">
                        <div className="text-green-400 font-black text-2xl leading-tight">5–12%</div>
                        <div className="text-white/50 text-[11px] font-semibold mt-0.5">
                          {lang === "ja" ? "原価の5〜12%で運用" : lang === "en" ? "of original IT cost" : "原有成本的 5～12%"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 翔耀 封閉場域 ── */}
      <section className="py-16 px-6 bg-[#1a1a2e]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="text-sm font-black uppercase tracking-[0.2em] text-[#E8751A] mb-3"
            >
              {t.xiangyao.label}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl md:text-6xl font-black text-white leading-tight mb-4 relative"
            >
              {t.xiangyao.title}
              <motion.span
                className="absolute inset-0 pointer-events-none"
                style={{ background: "linear-gradient(105deg, transparent 35%, rgba(91,45,142,0.22) 50%, transparent 65%)", backgroundSize: "200% 100%" }}
                animate={{ backgroundPosition: ["200% 0", "-100% 0"] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: "linear", repeatDelay: 1.5 }}
              />
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-4"
            >
              <motion.span
                animate={{ scale: [1, 1.04, 1] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="bg-[#5B2D8E] text-white text-sm font-black px-4 py-1.5 rounded-full shadow-lg shadow-purple-900/40 inline-block"
              >
                {t.xiangyao.badge}
              </motion.span>
            </motion.div>
            <p className="text-white/65 mb-8 max-w-2xl">{t.xiangyao.sub}</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="grid grid-cols-3 gap-4 mb-6">
                {t.xiangyao.stats.map((s, i) => (
                  <div key={i} className="bg-[#5B2D8E]/20 border border-[#5B2D8E]/40 rounded-xl p-4 text-center">
                    <div className="text-white font-black text-sm leading-tight mb-1">{s.num}</div>
                    <div className="text-white/45 text-[10px] leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="space-y-2.5">
                {t.xiangyao.features.map((f, i) => (
                  <div key={i} className="flex items-start gap-3 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                    <span className="text-[#5B2D8E] font-bold text-sm flex-shrink-0 mt-0.5 bg-[#5B2D8E]/30 rounded-full w-5 h-5 flex items-center justify-center text-[10px]">{i + 1}</span>
                    <span className="text-white/75 text-sm">{f}</span>
                  </div>
                ))}
              </div>
            </FadeIn>
            <FadeIn delay={0.15}>
              <div className="rounded-2xl border border-white/15 bg-white/5 p-5 h-full flex flex-col justify-center">
                <div className="text-white/40 text-xs font-bold uppercase tracking-wider mb-4">
                  {lang === "ja" ? "協業モデル" : lang === "en" ? "Partnership Model" : "合作模式"}
                </div>
                {[
                  { from: lang === "ja" ? "翔耀が提供" : lang === "en" ? "Xiangyao provides" : "翔耀提供", item: lang === "ja" ? "特定施設へのアクセス権" : lang === "en" ? "Closed venue access" : "封閉場域進場能力", color: "bg-[#5B2D8E]/30 text-[#c084fc]" },
                  { from: lang === "ja" ? "MCSが提供" : lang === "en" ? "MCS provides" : "MCS 提供", item: lang === "ja" ? "機器 + OmniCoreプラットフォーム" : lang === "en" ? "Equipment + OmniCore platform" : "設備 ＋ OmniCore 平台", color: "bg-[#E8751A]/20 text-[#f5a87a]" },
                  { from: lang === "ja" ? "収益配分" : lang === "en" ? "Revenue split" : "收益分潤", item: lang === "ja" ? "GMVベースの成果比例分配" : lang === "en" ? "Proportional (GMV-based)" : "按 GMV 比例分潤", color: "bg-green-500/20 text-green-400" },
                ].map((row, i) => (
                  <div key={i} className="mb-3">
                    <div className="text-white/35 text-[10px] font-bold uppercase mb-1">{row.from}</div>
                    <div className={`${row.color} rounded-xl px-4 py-2.5 font-semibold text-sm`}>{row.item}</div>
                  </div>
                ))}
                <div className="mt-2 bg-white/5 border border-white/10 rounded-xl px-4 py-3">
                  <div className="text-white/50 text-xs">
                    {lang === "ja" ? "🏢 嵩達光電（翔耀の親会社）— 上場申請中。MCSとの技術提携がESG・AI導入ストーリーを強化" : lang === "en" ? "🏢 Sonda Optoelectronics (Xiangyao parent) — OTC listing application in progress. MCS partnership strengthens ESG + AI story" : "🏢 嵩達光電（翔耀母公司）上櫃申請中 — MCS 技術合作強化 ESG ＋ AI 賦能故事"}
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── 微勤 ── */}
      <section className="py-20 px-6 bg-[#1B3A5C]">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <div className="flex items-center gap-3 mb-2">
              <p className="text-xs font-bold uppercase tracking-widest text-[#E8751A]">{t.weche.label}</p>
              <span className="bg-[#E8751A] text-white text-[10px] font-bold px-3 py-1 rounded-full">
                {t.weche.badge}
              </span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t.weche.title}</h2>
            <p className="text-white/60 mb-10 max-w-2xl">{t.weche.sub}</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              {/* Official WECHE HQ group photo */}
              <div className="col-span-2 rounded-xl overflow-hidden bg-gray-800 relative" style={{ aspectRatio: "16/7" }}>
                <ZoomImg src="/images/intro/weche-official-group.jpg" alt="MCS × 微勤電機 官方合影" fill className="object-cover object-center" />
              </div>
              {/* Japanese Shutoko delegation visiting WECHE factory */}
              <div className="rounded-xl overflow-hidden aspect-video bg-gray-800 relative">
                <ZoomImg src="/images/intro/weche-japan-visit-1.jpg" alt="日本首都高速代表團參訪微勤工廠" fill className="object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-video bg-gray-800 relative">
                <ZoomImg src="/images/intro/weche-japan-visit-2.jpg" alt="MIT 設備現場驗證" fill className="object-cover" />
              </div>
              {/* Japan visit caption */}
              <div className="col-span-2 bg-[#E8751A]/20 border border-[#E8751A]/40 rounded-xl px-4 py-3">
                <div className="text-[#f5a87a] text-xs font-bold">📸 2024.10.18</div>
                <div className="text-white text-sm font-semibold mt-0.5">
                  {lang === "ja"
                    ? "首都高速道路㈱の視察団が微勤工場を訪問 — MIT設備を直接確認"
                    : lang === "en"
                    ? "Shuto Expressway delegation visited WECHE factory — MIT equipment verified on-site"
                    : "日本首都高速代表團親訪微勤工廠 — MIT 設備現場驗證"}
                </div>
              </div>
              {/* Factory visit video — 20241018 日本代表團 */}
              <div className="col-span-2 rounded-xl overflow-hidden bg-black">
                <video
                  src="/videos/mit-japan-visit.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-xl"
                  poster="/images/intro/thumb-mit-japan-visit.jpg"
                />
                <div className="px-3 py-2 bg-black/80 rounded-b-xl">
                  <div className="text-white/50 text-xs">
                    {lang === "ja"
                      ? "▶ 首都高速道路視察動画（2024.10.18）─ 全品目 MIT 台湾製造"
                      : lang === "en"
                      ? "▶ Shuto Expressway factory visit (2024.10.18) — All MIT, Made in Taiwan"
                      : "▶ 日本首都高速代表團參訪影片（2024.10.18）─ 全部 MIT 台灣製造"}
                  </div>
                </div>
              </div>
              {/* Safety test video */}
              <div className="col-span-2 rounded-xl overflow-hidden bg-black mt-1">
                <video
                  src="/videos/weche-safety-test.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-xl"
                  poster="/images/intro/thumb-weche-safety-test.jpg"
                />
                <div className="px-3 py-2 bg-black/80 rounded-b-xl">
                  <div className="text-white/50 text-xs">
                    {lang === "ja"
                      ? "▶ MCS × 微勤 安全性能テスト ─ 出荷前の全機器品質検証プロセス"
                      : lang === "en"
                      ? "▶ MCS × WECHE Safety Performance Test — Pre-shipment full-unit QC process"
                      : "▶ MCS × 微勤 安全性能測試 ─ 出貨前整機品質驗收流程"}
                  </div>
                </div>
              </div>
              {/* OEM factory launch video — Dec 2024 */}
              <div className="col-span-2 rounded-xl overflow-hidden bg-black mt-1">
                <video
                  src="/videos/weche-oem-factory.mp4"
                  controls
                  playsInline
                  preload="metadata"
                  className="w-full rounded-xl"
                  poster="/images/intro/thumb-weche-oem-factory.jpg"
                />
                <div className="px-3 py-2 bg-black/80 rounded-b-xl">
                  <div className="text-white/50 text-xs">
                    {lang === "ja"
                      ? "▶ MCS × 微勤 OEM工場起動 ─ 製造ライン立上げ・量産準備（2024.12）"
                      : lang === "en"
                      ? "▶ MCS × WECHE OEM Factory Launch — Production line setup & mass production prep (Dec 2024)"
                      : "▶ MCS × 微勤 OEM 工廠啟動 ─ 生產線建立 × 量產準備（2024.12）"}
                  </div>
                </div>
              </div>
            </div>

            {/* Points */}
            <div className="space-y-4">
              {t.weche.points.map((p, i) => (
                <div key={i} className="bg-white/10 border border-white/15 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <div className="font-bold text-white mb-1">{p.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 100% MIT Section ── */}
      <section className="py-20 px-6 bg-gray-900">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8751A] mb-2">{t.mit.label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-3">{t.mit.title}</h2>
            <p className="text-white/60 mb-10 max-w-2xl">{t.mit.sub}</p>
          </FadeIn>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            {/* Photo grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2 rounded-xl overflow-hidden aspect-video bg-gray-800 relative">
                <ZoomImg src="/images/intro/mit-lab.jpg" alt="MCS 整機測試實驗室" fill className="object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square bg-gray-800 relative">
                <ZoomImg src="/images/intro/mit-engineering.jpg" alt="MCS 工程師 PCB 研發" fill className="object-cover" />
              </div>
              <div className="rounded-xl overflow-hidden aspect-square bg-gray-800 relative">
                <ZoomImg src="/images/intro/mit-production.jpg" alt="台灣工廠量產" fill className="object-cover" />
              </div>
            </div>

            {/* Points */}
            <div className="space-y-4">
              {t.mit.points.map((p, i) => (
                <div key={i} className="bg-white/5 border border-white/10 rounded-xl p-5">
                  <div className="flex items-start gap-3">
                    <span className="text-2xl flex-shrink-0">{p.icon}</span>
                    <div>
                      <div className="font-bold text-white mb-1">{p.title}</div>
                      <div className="text-white/60 text-sm leading-relaxed">{p.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="mt-4 p-4 bg-[#E8751A]/15 border border-[#E8751A]/30 rounded-xl">
                <div className="text-[#f5a87a] font-bold text-sm mb-1">MIT · Made in Taiwan</div>
                <div className="text-white/60 text-xs leading-relaxed">
                  {lang === "ja"
                    ? "設計・製造・検査まで一気通貫。台湾のエンジニアリング能力を世界へ。"
                    : lang === "en"
                    ? "End-to-end ownership: design → build → test. Taiwan engineering delivered globally."
                    : "從設計、製造到測試，全程掌控，台灣品質輸出全球。"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 成功案例 ── */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-[#E8751A] mb-2">{t.cases.label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-[#1B3A5C] mb-3">{t.cases.title}</h2>
            <p className="text-gray-500 mb-12 max-w-2xl">{t.cases.sub}</p>
          </FadeIn>

          {/* FamilyMart */}
          <FadeIn delay={0.1}>
          <div className="mb-12 border border-gray-200 rounded-2xl overflow-hidden">
            <CaseHeader
              color="bg-[#007B40]"
              badge={t.cases.fm.badge}
              title={t.cases.fm.title}
              accentLine="#FFD700"
              extra={t.cases.fm.tabs.map((tab, i) => (
                <button
                  key={i}
                  onClick={() => setFmTab(i)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                    fmTab === i ? "bg-white text-[#007B40]" : "bg-white/20 text-white hover:bg-white/30"
                  }`}
                >
                  {tab}
                </button>
              ))}
            />

            {fmTab === 0 ? (
              <div className="p-6 grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="font-black text-lg text-[#1B3A5C] mb-3">{t.cases.fm.vendingTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.cases.fm.vendingDesc}</p>
                  <ul className="space-y-2">
                    {t.cases.fm.vendingStats.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#1B3A5C] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#007B40] flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/intro/fm-vending-itri.jpg" alt="全家超商工研院" fill className="object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                    <ZoomImg src="/images/intro/fm-vending-hotel.jpg" alt="全家超商煙波飯店" fill className="object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                    <ZoomImg src="/images/intro/fm-vending-univ.jpg" alt="全家超商東華大學" fill className="object-cover" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 grid md:grid-cols-2 gap-6 items-start">
                <div>
                  <h3 className="font-black text-lg text-[#1B3A5C] mb-3">{t.cases.fm.pickupTitle}</h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.cases.fm.pickupDesc}</p>
                  <ul className="space-y-2">
                    {t.cases.fm.pickupStats.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#1B3A5C] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#007B40] flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/intro/fm-pickup-faminow.png" alt="FamiNow整合" fill className="object-cover" />
                  </div>
                  <div className="col-span-2 rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/intro/fm-pickup-pos.jpg" alt="全家POS整合" fill className="object-cover" />
                  </div>
                </div>
              </div>
            )}
          </div>
          </FadeIn>

          {/* Cold/Frozen Vending — 滙聚 deep expertise */}
          <FadeIn delay={0.1}>
          <div className="mb-12 border border-gray-200 rounded-2xl overflow-hidden">
            <CaseHeader color="bg-[#0A9396]" badge={t.cases.frozen.badge} title={t.cases.frozen.title} accentLine="#7FFFD4" />
            <div className="p-6">
              {/* Top: text + key stats */}
              <div className="grid md:grid-cols-2 gap-6 items-start mb-6">
                <div>
                  <p className="text-[#E8751A] text-xs font-bold uppercase tracking-widest mb-2">{t.cases.frozen.label}</p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.cases.frozen.sub}</p>
                  <ul className="space-y-2 mb-4">
                    {t.cases.frozen.stats.map((s, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-[#1B3A5C] font-semibold">
                        <span className="w-2 h-2 rounded-full bg-[#0A9396] flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                  {/* TV news badge */}
                  <div className="inline-flex items-center gap-2 bg-[#0A9396]/10 border border-[#0A9396]/30 rounded-full px-3 py-1.5">
                    <span className="text-[#0A9396] text-xs font-bold">📺</span>
                    <span className="text-[#0A9396] text-xs font-semibold">
                      {lang === "ja" ? "民放TV（八大民生新聞）で特集報道" : lang === "en" ? "Featured on Taiwan TV News (Eight Network)" : "台灣八大民生新聞專題報道"}
                    </span>
                  </div>
                </div>
                {/* TV news video */}
                <div className="rounded-xl overflow-hidden bg-black" style={{ aspectRatio: "16/9" }}>
                  <video
                    src="/videos/huiju-tv-news.mp4"
                    controls
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                    poster="/images/intro/huiju-cu-ice-jp.jpg"
                  />
                </div>
              </div>

              {/* Photo grid: 7 deployment photos */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
                {/* Feature: food court concept render — full width top */}
                <div className="col-span-2 md:col-span-3 rounded-xl overflow-hidden bg-gray-100 relative" style={{ aspectRatio: "3/1" }}>
                  <ZoomImg src="/images/intro/huiju-foodcourt-render.jpg" alt="滙聚美食街 4 品牌智販機概念" fill className="object-cover object-center" />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-4 py-3">
                    <span className="text-white text-xs font-semibold">
                      {lang === "ja" ? "フードコート向け4ブランド展開コンセプト" : lang === "en" ? "4-brand food court deployment concept" : "美食街 4 品牌智販機場域概念"}
                    </span>
                  </div>
                </div>
                {/* Machine photos */}
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-longyan-neon.jpg" alt="龍涎居冷凍機 neon燈場域" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-cu-ice-jp.jpg" alt="CU冰棒冷凍販賣機（日文版）" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-gaibang-expo.jpg" alt="巧幫滷味智販機展覽現場" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-longyan-side.jpg" alt="龍涎居冷凍機側面" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-two-machines.jpg" alt="冰棒機＋滷味機 商業空間" fill className="object-cover" />
                </div>
                <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                  <ZoomImg src="/images/intro/huiju-temple-deploy.jpg" alt="龍涎居 廟宇通道實地部署" fill className="object-cover" />
                </div>
              </div>

              {/* Caption */}
              <div className="bg-[#0A9396]/10 border border-[#0A9396]/25 rounded-xl px-4 py-3">
                <p className="text-[#0A9396] text-xs font-bold mb-1">
                  {lang === "ja" ? "滙聚食品 — MCSの冷凍・冷蔵自販機フランチャイズ加盟運営パートナー" : lang === "en" ? "Huiju Food — MCS franchise vending operator: chilled + frozen deployments across Taiwan" : "滙聚食品 — MCS 冷藏 / 冷凍智販機加盟營運夥伴"}
                </p>
                <p className="text-gray-500 text-xs">
                  {lang === "ja" ? "複数のF&Bブランド（龍涎居・CU冰棒・巧幫滷味など）向けに冷凍自販機ソリューションを提供。くじ引き機能など独自のエンゲージメントモジュールも開発。" : lang === "en" ? "Multiple F&B brands (Longyan, CU Ice, GaiBang etc.) deployed with MCS frozen vending solutions. Custom gamification modules developed for customer engagement." : "龍涎居、CU冰棒、巧幫滷味等多個餐飲品牌部署冷凍智販機。MCS 另為滙聚開發抽獎互動遊戲模組，提升客單率。"}
                </p>
              </div>
            </div>
          </div>
          </FadeIn>

          {/* MWD & Shutoko stacked full-width */}
          <FadeIn delay={0.1}>
          <div className="space-y-8 mb-12">
            {/* 麥味登 — full width */}
            <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }} className="border border-gray-200 rounded-2xl overflow-hidden">
              <CaseHeader color="bg-[#1B3A5C]" badge={t.cases.mwd.badge} title={t.cases.mwd.title} accentLine="#E8751A" />
              <div className="p-5">
                {/* Row 1: demo video + expo booth */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <video src="/images/cases/mwd/grabox-operation-demo.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/cases/mwd/franchise-expo-2026.jpg" alt="麥味登加盟展 GraBox 展示" fill className="object-cover" />
                  </div>
                </div>
                {/* Row 2: storefront live (full width) */}
                <div className="rounded-xl overflow-hidden bg-gray-100 relative mb-3" style={{ aspectRatio: "21/9" }}>
                  <ZoomImg src="/images/intro/mwd-store-live.jpg" alt="麥味登門市 My Express 實際部署" fill className="object-cover object-center" />
                </div>
                {/* Row 3: DM overview + DM features side by side */}
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                    <ZoomImg src="/images/products/grabox/dm-overview.jpg" alt="GraBox-R101 產品規格 DM" width={600} height={900} className="w-full h-auto" />
                  </div>
                  <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 relative">
                    <ZoomImg src="/images/products/grabox/dm-features.png" alt="GraBox 核心特色 DM" width={600} height={900} className="w-full h-auto" />
                  </div>
                </div>
                {/* Row 4: lockers close-up + prototype demo */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/intro/mwd-lockers-lit.jpg" alt="GraBox 五色可控燈光格子" fill className="object-cover" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100">
                    <ZoomImg src="/images/intro/mwd-prototype-demo.jpg" alt="90天開發：原型機簡報現場" fill className="object-cover" />
                  </div>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.cases.mwd.desc}</p>
                <ul className="space-y-1.5 mb-6">
                  {t.cases.mwd.stats.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#1B3A5C] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#E8751A] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>

                {/* ── MWD Videos ── */}
                <SubBanner bg="bg-[#1B3A5C]" title={lang === "ja" ? "現場・展示映像" : lang === "en" ? "On-Site & Exhibition Footage" : "現場 × 展覽影片"} accentLine="#E8751A" />
                <div className="space-y-3 mt-3">
                  {/* 高雄加盟展 Aug 2025 */}
                  <div className="rounded-xl overflow-hidden bg-black">
                    <video src="/videos/mwd-kaohsiung-expo.mp4" controls playsInline preload="metadata" className="w-full" poster="/images/intro/thumb-mwd-kaohsiung-expo.jpg" />
                    <div className="px-3 py-2 bg-black/80">
                      <span className="text-white/60 text-xs">
                        {lang === "ja" ? "▶ 高雄加盟博覧会 GraBox 展示（2025.08）" : lang === "en" ? "▶ Kaohsiung Franchise Expo — GraBox Demo (Aug 2025)" : "▶ 高雄加盟展 GraBox 展示（2025.08）"}
                      </span>
                    </div>
                  </div>
                  {/* 門市 demo Oct 2025 — clip 1 */}
                  <div className="rounded-xl overflow-hidden bg-black">
                    <video src="/videos/mwd-store-demo-1.mp4" controls playsInline preload="metadata" className="w-full" poster="/images/intro/thumb-mwd-store-demo-1.jpg" />
                    <div className="px-3 py-2 bg-black/80">
                      <span className="text-white/60 text-xs">
                        {lang === "ja" ? "▶ 麦味登 My Express 店舗実機デモ①（2025.10）" : lang === "en" ? "▶ MWD My Express Store Live Demo ① (Oct 2025)" : "▶ 麥味登 My Express 門市實機 Demo①（2025.10）"}
                      </span>
                    </div>
                  </div>
                  {/* 門市 demo Oct 2025 — clip 2 */}
                  <div className="rounded-xl overflow-hidden bg-black">
                    <video src="/videos/mwd-store-demo-2.mp4" controls playsInline preload="metadata" className="w-full" poster="/images/intro/thumb-mwd-store-demo-2.jpg" />
                    <div className="px-3 py-2 bg-black/80">
                      <span className="text-white/60 text-xs">
                        {lang === "ja" ? "▶ 麦味登 My Express 店舗実機デモ②（2025.10）" : lang === "en" ? "▶ MWD My Express Store Live Demo ② (Oct 2025)" : "▶ 麥味登 My Express 門市實機 Demo②（2025.10）"}
                      </span>
                    </div>
                  </div>
                  {/* GraBox 實地操作 Oct 2025 */}
                  <div className="rounded-xl overflow-hidden bg-black">
                    <video src="/videos/mwd-grabox-operation.mp4" controls playsInline preload="metadata" className="w-full" poster="/images/intro/thumb-mwd-grabox-operation.jpg" />
                    <div className="px-3 py-2 bg-black/80">
                      <span className="text-white/60 text-xs">
                        {lang === "ja" ? "▶ GraBox 実地操作・取り出しフロー（2025.10）" : lang === "en" ? "▶ GraBox On-Site Operation & Pickup Flow (Oct 2025)" : "▶ GraBox 實地操作 × 取餐流程（2025.10）"}
                      </span>
                    </div>
                  </div>
                  {/* Short highlight clip */}
                  <div className="rounded-xl overflow-hidden bg-black">
                    <video src="/videos/mwd-short-clip.mp4" controls playsInline preload="metadata" className="w-full" poster="/images/intro/thumb-mwd-short-clip.jpg" />
                    <div className="px-3 py-2 bg-black/80">
                      <span className="text-white/60 text-xs">
                        {lang === "ja" ? "▶ GraBox ハイライトクリップ" : lang === "en" ? "▶ GraBox Highlight Clip" : "▶ GraBox 精選片段"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* 首都高速 */}
            <motion.div whileHover={{ y: -4 }} transition={{ duration: 0.2 }} className="border border-gray-200 rounded-2xl overflow-hidden">
              <CaseHeader color="bg-[#c0392b]" badge={t.cases.shutoko.badge} title={t.cases.shutoko.title} accentLine="#FFD700" />
              <div className="p-5">
                {/* Hero: Official group photo at Shutoko HQ */}
                <div className="rounded-xl overflow-hidden bg-gray-100 mb-2 relative" style={{ aspectRatio: "4/3" }}>
                  <ZoomImg src="/images/intro/shutoko-group-official.jpg" alt="MCS × 首都高速 官方合影" fill className="object-cover object-top" />
                </div>
                {/* 3-photo row: MOU signing + meeting with map + machine demo */}
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                    <ZoomImg src="/images/intro/shutoko-mou-signing.jpg" alt="MOU締結" fill className="object-cover object-top" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                    <ZoomImg src="/images/intro/shutoko-meeting-map.jpg" alt="首都高本社にて" fill className="object-cover object-top" />
                  </div>
                  <div className="rounded-xl overflow-hidden aspect-square relative bg-gray-100">
                    <ZoomImg src="/images/intro/shutoko-ui-screen.jpg" alt="冷凍微波機 UI" fill className="object-cover" />
                  </div>
                </div>
                {/* Machine warehouse delivery */}
                <div className="rounded-xl overflow-hidden aspect-video relative bg-gray-100 mb-2">
                  <ZoomImg src="/images/intro/shutoko-warehouse.jpg" alt="日本倉庫 機台入庫" fill className="object-cover" />
                </div>
                {/* MOU Roadmap Document */}
                <div className="rounded-xl overflow-hidden relative bg-gray-100 mb-4" style={{ aspectRatio: "16/9" }}>
                  <ZoomImg src="/images/intro/shutoko-mou-plan.png" alt="レンジ自販機導入計画イメージ" fill className="object-cover object-top" />
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">{t.cases.shutoko.desc}</p>
                <ul className="space-y-1.5 mb-5">
                  {t.cases.shutoko.stats.map((s, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-[#1B3A5C] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#c0392b] flex-shrink-0" />
                      {s}
                    </li>
                  ))}
                </ul>
                {/* MPS Japan Payment Integration Evidence */}
                <div className="rounded-xl overflow-hidden border border-gray-200 bg-gray-50">
                  <SubBanner
                    bg="bg-[#1B3A5C]"
                    title={lang === "ja" ? "MP-Solution Japan 決済統合" : lang === "en" ? "MP-Solution Japan Payment Integration" : "MP-Solution Japan 支付整合"}
                    badge={lang === "ja" ? "✓ 検収完了" : lang === "en" ? "✓ Acceptance Passed" : "✓ 驗收通過"}
                    badgeBg="bg-green-500"
                    accentLine="#22c55e"
                  />
                  <div className="p-3 space-y-3">
                    {/* Acceptance Video 1 — Aug 2023 */}
                    <div>
                      <p className="text-xs font-bold text-[#1B3A5C] mb-1.5">
                        {lang === "ja" ? "▶ 検収映像①（2023.08 台湾）" : lang === "en" ? "▶ Acceptance Test Video ① (Aug 2023, Taiwan)" : "▶ 驗收影片①（2023.08 台灣）"}
                      </p>
                      <div className="rounded-lg overflow-hidden bg-black">
                        <video
                          src="/videos/mp-solution-demo.mp4"
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full"
                          poster="/images/intro/thumb-mp-solution-demo.jpg"
                        />
                      </div>
                    </div>
                    {/* Acceptance Video 2 — Sep 2023 */}
                    <div>
                      <p className="text-xs font-bold text-[#1B3A5C] mb-1.5">
                        {lang === "ja" ? "▶ 検収映像②（2023.09 台湾）" : lang === "en" ? "▶ Acceptance Test Video ② (Sep 2023, Taiwan)" : "▶ 驗收影片②（2023.09 台灣）"}
                      </p>
                      <div className="rounded-lg overflow-hidden bg-black">
                        <video
                          src="/videos/mp-solution-acceptance.mp4"
                          controls
                          playsInline
                          preload="metadata"
                          className="w-full"
                          poster="/images/intro/thumb-mp-solution-acceptance.jpg"
                        />
                      </div>
                    </div>
                    {/* Photo grid — acceptance scene + hardware + NDA + meeting */}
                    <div className="grid grid-cols-2 gap-2">
                      <div className="rounded-lg overflow-hidden aspect-video relative bg-gray-200">
                        <ZoomImg src="/images/intro/mps-acceptance-photo.jpg" alt="MPS 台湾検収現場" fill className="object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                          <span className="text-white text-[10px] font-semibold">
                            {lang === "ja" ? "検収現場（台湾）" : lang === "en" ? "Acceptance Scene (Taiwan)" : "驗收現場（台灣）"}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden aspect-video relative bg-gray-200">
                        <ZoomImg src="/images/intro/mps-im10-screen.jpg" alt="IM10 決済画面" fill className="object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                          <span className="text-white text-[10px] font-semibold">IM10 決済画面</span>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden aspect-video relative bg-gray-200">
                        <ZoomImg src="/images/intro/mps-nda-signed.jpg" alt="MPS NDA 締結" fill className="object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                          <span className="text-white text-[10px] font-semibold">
                            {lang === "ja" ? "NDA 締結（Jason Lee × Eiji Sato）" : lang === "en" ? "NDA Signed — Jason Lee × Eiji Sato" : "NDA 簽署（Jason Lee × Eiji Sato）"}
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg overflow-hidden aspect-video relative bg-gray-200">
                        <ZoomImg src="/images/intro/mps-online-meeting.png" alt="MPS オンライン打ち合わせ" fill className="object-cover" />
                        <div className="absolute bottom-0 left-0 right-0 bg-black/50 px-2 py-1">
                          <span className="text-white text-[10px] font-semibold">
                            {lang === "ja" ? "オンライン調整会議" : lang === "en" ? "Online Coordination Meeting" : "線上協調會議"}
                          </span>
                        </div>
                      </div>
                    </div>
                    <p className="text-gray-500 text-xs leading-relaxed">
                      {lang === "ja"
                        ? "MP-Solution Japan の IM10 キャッシュレス端末と MCS OmniCore の統合が完了。日本側代表 Eiji Sato 氏と NDA を締結し、台湾にて検収試験を実施・合格済み。日本全国の無人機台への水平展開を共同推進中。"
                        : lang === "en"
                        ? "MCS OmniCore is fully integrated with MP-Solution Japan's IM10 cashless terminal. NDA signed between Jason Lee (MCS) and Eiji Sato (MPS). Acceptance tests conducted in Taiwan — passed. Joint rollout to vending machines across Japan now in progress."
                        : "MCS OmniCore 與 MP-Solution Japan IM10 無現金支付端末完成技術整合。Jason Lee（MCS）與 Eiji Sato（MPS）正式簽署 NDA，並在台灣現場完成驗收測試。目前雙方協力推進日本全國無人機台部署。"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
          </FadeIn>

          {/* More Cases */}
          <FadeIn delay={0.05}>
          <div>
            <h3 className="font-black text-xl text-[#1B3A5C] mb-5">{t.cases.more.title}</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {t.cases.more.items.map((item, i) => {
                const detail = MORE_CLIENT_DETAILS[i];
                const isOpen = openClient === i;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: i * 0.05 }}
                    className={`rounded-xl overflow-hidden border transition-all duration-200 cursor-pointer ${
                      isOpen
                        ? "border-[#E8751A]/60 shadow-md col-span-2 md:col-span-2"
                        : "border-gray-100 hover:border-[#E8751A]/40 hover:shadow-sm"
                    }`}
                    onClick={() => setOpenClient(isOpen ? null : i)}
                    layout
                  >
                    {/* Card header */}
                    <div className={`${detail?.color ?? "bg-[#1B3A5C]"} px-4 py-3 flex items-center justify-between`}>
                      <div>
                        <span className="text-white/70 text-[10px] font-bold uppercase tracking-wide">
                          {detail ? detail.tag[lang as keyof typeof detail.tag] ?? detail.tag.zh : ""}
                        </span>
                        <div className="font-black text-white text-sm leading-tight">{item.name}</div>
                      </div>
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="text-white/70 text-base flex-shrink-0"
                      >
                        ▾
                      </motion.span>
                    </div>
                    {/* Always-visible desc */}
                    <div className="bg-gray-50 px-4 py-2">
                      <p className="text-gray-500 text-xs leading-relaxed">{item.desc}</p>
                    </div>
                    {/* Expandable detail */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          key="detail"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="px-4 pb-4 bg-white space-y-3">
                            {detail?.img && (
                              <div className="rounded-lg overflow-hidden aspect-video relative bg-gray-100">
                                <ZoomImg src={detail.img} alt={item.name} fill className="object-cover" />
                              </div>
                            )}
                            <p className="text-gray-600 text-xs leading-relaxed pt-2">
                              {detail ? (detail.detail[lang as keyof typeof detail.detail] ?? detail.detail.zh) : item.desc}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Contact ── */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#E8751A] to-[#c05e0f]">
        <div className="max-w-5xl mx-auto text-center">
          <FadeIn>
            <p className="text-xs font-bold uppercase tracking-widest text-white/70 mb-3">{t.contact.label}</p>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">{t.contact.title}</h2>
            <p className="text-white/80 max-w-2xl mx-auto mb-10">{t.contact.sub}</p>
            <div className="flex flex-wrap gap-4 justify-center items-center">
              <motion.a
                href="mailto:service@mcstation.ai?subject=Demo Request — MCS"
                animate={{ scale: [1, 1.03, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.06 }}
                className="bg-white text-[#E8751A] font-bold px-8 py-3 rounded-full shadow-lg inline-block"
              >
                {t.contact.cta} →
              </motion.a>
              <a
                href="https://www.mcstation.ai"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/80 text-sm hover:text-white transition-colors underline underline-offset-2"
              >
                {t.contact.web}: www.mcstation.ai
              </a>
              <div className="text-white/80 text-sm">
                <span className="font-semibold">{t.contact.email}：</span>
                service@mcstation.ai
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#0F2440] text-white/50 text-xs text-center py-6 px-6">
        © 2026 MCS 銓幻元科技 Meta Clearing Station Pte. Ltd. · Taiwan · Singapore
      </footer>
    </div>
    </>
    </LightboxCtx.Provider>
  );
}
