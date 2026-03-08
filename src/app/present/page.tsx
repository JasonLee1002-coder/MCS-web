"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";

const slides = [
  {
    id: "cover",
    title: "銓幻元科技",
    subtitle: "AI 智慧設備 x 商業系統整合",
    description: "Meta Clearing Station Pte. Ltd.",
    bg: "from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark",
  },
  {
    id: "grabox",
    title: "GraBox AI 智取櫃",
    subtitle: "AI 訂餐 | 接線服務員",
    bullets: [
      "單機版 / 聯網版可選",
      "AI 智慧訂餐系統",
      "多溫層控制（常溫/冷藏/冷凍）",
      "24小時無人化取餐",
      "適用餐廳、飯店、企業、學校",
    ],
    bg: "from-mcs-blue-dark to-[#1a2a4a]",
  },
  {
    id: "vending",
    title: "智能販賣機",
    subtitle: "各類自助服務設備 x AI系統整合",
    bullets: [
      "AI 人臉辨識 / 會員辨識",
      "多元支付：LINE Pay、街口、信用卡",
      "即時庫存監控與補貨通知",
      "遠端雲端管理平台",
      "100% 台灣設計製造",
    ],
    bg: "from-[#1a2a4a] to-mcs-blue-dark",
  },
  {
    id: "oem",
    title: "OEM / ODM 貼牌客製",
    subtitle: "可 100% 台灣製造",
    bullets: [
      "外觀設計到軟體介面全客製",
      "品牌 Logo / UI 貼牌服務",
      "台灣工廠品質把關",
      "少量多樣，彈性生產",
      "軟硬體整合一站搞定",
    ],
    bg: "from-mcs-blue-dark to-[#1a2a4a]",
  },
  {
    id: "member",
    title: "企業會員系統整合",
    subtitle: "ERP | 商務流程與資料平台",
    bullets: [
      "會員資料管理與分群",
      "ERP 系統整合",
      "商務流程自動化",
      "數據分析與報表",
      "跨平台會員同步",
    ],
    bg: "from-[#1a2a4a] to-mcs-blue-dark",
  },
  {
    id: "pos",
    title: "餐飲與零售系統串接",
    subtitle: "POS | KDS",
    bullets: [
      "POS 點餐結帳系統",
      "KDS 廚房顯示系統",
      "外送平台串接（UberEats/Foodpanda）",
      "多店管理統一後台",
      "即時銷售數據分析",
    ],
    bg: "from-mcs-blue-dark to-[#1a2a4a]",
  },
  {
    id: "cloud",
    title: "雲端營運平台 + AI分析模組",
    subtitle: "數據驅動的營運管理",
    bullets: [
      "即時營運 Dashboard",
      "AI 銷售預測與建議",
      "庫存智慧管理",
      "顧客行為分析",
      "自動化報表匯出",
    ],
    bg: "from-[#1a2a4a] to-mcs-blue-dark",
  },
  {
    id: "partner",
    title: "成為 MCS 經銷夥伴",
    subtitle: "推薦獎勵計畫",
    bullets: [
      "推薦積分 → 折抵商品",
      "推薦積分 → 電商點數換好物",
      "推薦積分 → LINE 點數（星益欣/12cm 整合）",
      "專屬經銷商後台",
      "技術支援與行銷資源",
    ],
    bg: "from-mcs-blue-dark to-[#1a2a4a]",
  },
  {
    id: "contact",
    title: "聯絡我們",
    subtitle: "銓幻元科技股份有限公司",
    bullets: [
      "電話：(02) 2558-8848",
      "Email：service@transtep.com",
      "地址：103 台北市大同區長安西路78巷4弄10號1樓",
      "網站：www.MCStation.ai",
    ],
    bg: "from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark",
  },
];

// AI Q&A knowledge base
const qaKnowledge: Record<string, string> = {
  "價格": "GraBox 智取櫃依規格不同，單機版建議售價約 NT$15-25 萬，聯網版約 NT$25-40 萬。量大可議價，歡迎洽詢詳細報價。",
  "交期": "標準規格約 4-6 週交貨。OEM/ODM 客製化訂單約 8-12 週，視數量與客製程度而定。",
  "保固": "全產品提供一年免費保固，可加購延長保固至三年。全台灣服務據點，24小時線上客服支援。",
  "付款": "支持多元支付：LINE Pay、街口支付、悠遊卡、信用卡、Apple Pay、Google Pay，也可搭配企業月結方案。",
  "尺寸": "GraBox 智取櫃提供多種規格：6格、12格、18格、24格，也可依場地需求客製尺寸。標準寬度 60-120cm。",
  "溫控": "支援三溫層控制：常溫（15-25°C）、冷藏（2-8°C）、冷凍（-18°C 以下），可混搭配置。",
  "安裝": "我們提供全台到府安裝服務，含場地評估、設備安裝、系統設定、員工教育訓練，一站式完成。",
  "經銷": "歡迎加入 MCS 經銷夥伴計畫！推薦成功可獲得積分獎勵，兌換商品、電商點數或 LINE 點數。詳情請洽 service@transtep.com。",
};

function findAnswer(question: string): string {
  for (const [keyword, answer] of Object.entries(qaKnowledge)) {
    if (question.includes(keyword)) {
      return answer;
    }
  }
  return `感謝您的提問！關於「${question}」的問題，我們的專員會為您詳細說明。歡迎來電 (02) 2558-8848 或 Email 至 service@transtep.com 取得更多資訊。`;
}

export default function PresentPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [roomCode, setRoomCode] = useState("");
  const [qaVisible, setQaVisible] = useState(false);
  const [qaQuestion, setQaQuestion] = useState("");
  const [qaAnswer, setQaAnswer] = useState("");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Generate room code on mount
  useEffect(() => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setRoomCode(code);

    // Store in localStorage for same-device control
    localStorage.setItem("mcs-present-room", code);
    localStorage.setItem("mcs-present-slide", "0");
  }, []);

  // Listen for control commands via localStorage (cross-tab sync)
  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === "mcs-present-slide" && e.newValue !== null) {
        const slideIndex = parseInt(e.newValue);
        if (!isNaN(slideIndex) && slideIndex >= 0 && slideIndex < slides.length) {
          setIsTransitioning(true);
          setTimeout(() => {
            setCurrentSlide(slideIndex);
            setIsTransitioning(false);
            setQaVisible(false);
          }, 300);
        }
      }
      if (e.key === "mcs-present-qa" && e.newValue) {
        const question = e.newValue;
        setQaQuestion(question);
        setQaAnswer(findAnswer(question));
        setQaVisible(true);
      }
      if (e.key === "mcs-present-qa-hide") {
        setQaVisible(false);
      }
    };

    window.addEventListener("storage", handleStorage);
    return () => window.removeEventListener("storage", handleStorage);
  }, []);

  // Keyboard controls for presentation
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === " ") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        setCurrentSlide((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape") {
        setQaVisible(false);
      }
    },
    []
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const slide = slides[currentSlide];

  return (
    <div className={`min-h-screen bg-gradient-to-br ${slide.bg} text-white relative overflow-hidden`}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, #E8751A 1px, transparent 1px), radial-gradient(circle at 80% 80%, #E8751A 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-mcs-orange to-transparent" />

      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 py-4 z-20">
        <Image
          src="/images/mcs-logo.png"
          alt="MCS"
          width={140}
          height={45}
          className="h-10 w-auto brightness-0 invert"
        />
        <div className="flex items-center gap-4">
          <span className="text-white/40 text-sm">
            {currentSlide + 1} / {slides.length}
          </span>
          <span className="bg-white/10 px-3 py-1 rounded-full text-xs text-white/60">
            Room: {roomCode}
          </span>
        </div>
      </div>

      {/* Slide Content */}
      <div
        className={`relative z-10 min-h-screen flex items-center justify-center px-16 transition-opacity duration-300 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        <div className="max-w-5xl w-full">
          {/* Cover slide */}
          {slide.id === "cover" ? (
            <div className="text-center">
              <div className="text-7xl font-bold mb-4 text-mcs-orange">
                {slide.title}
              </div>
              <div className="text-3xl font-light mb-6 text-white/90">
                {slide.subtitle}
              </div>
              <div className="text-xl text-white/50">
                {slide.description}
              </div>
              <div className="mt-12 text-white/30 text-sm">
                手機掃描 QR Code 或開啟控制頁面互動
              </div>
            </div>
          ) : slide.id === "contact" ? (
            /* Contact slide */
            <div className="text-center">
              <div className="text-5xl font-bold mb-2 text-mcs-orange">
                {slide.title}
              </div>
              <div className="text-2xl text-white/70 mb-12">
                {slide.subtitle}
              </div>
              <div className="space-y-4 text-xl">
                {slide.bullets?.map((item, i) => (
                  <div key={i} className="text-white/80">{item}</div>
                ))}
              </div>
            </div>
          ) : (
            /* Standard slide */
            <div className="grid grid-cols-2 gap-16 items-center">
              <div>
                <h1 className="text-5xl font-bold mb-3 leading-tight">
                  {slide.title}
                </h1>
                <div className="text-xl text-mcs-orange font-medium mb-8">
                  {slide.subtitle}
                </div>
                <ul className="space-y-4">
                  {slide.bullets?.map((bullet, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-lg text-white/85"
                      style={{ animationDelay: `${i * 100}ms` }}
                    >
                      <span className="w-2 h-2 bg-mcs-orange rounded-full mt-2.5 flex-shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex items-center justify-center">
                <div className="w-80 h-80 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center">
                  <div className="text-center text-white/30">
                    <svg className="w-16 h-16 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
                    </svg>
                    <span className="text-sm">產品圖片</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Q&A Overlay */}
      {qaVisible && (
        <div className="absolute inset-0 z-30 bg-black/70 flex items-center justify-center px-16">
          <div className="bg-white rounded-3xl p-12 max-w-3xl w-full text-gray-800 shadow-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-mcs-orange rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
                </svg>
              </div>
              <div className="text-sm text-mcs-orange font-medium">客戶提問</div>
            </div>
            <div className="text-2xl font-bold mb-6 text-mcs-blue-dark">
              {qaQuestion}
            </div>
            <div className="h-px bg-gray-200 mb-6" />
            <div className="text-lg leading-relaxed text-gray-600">
              {qaAnswer}
            </div>
          </div>
        </div>
      )}

      {/* Navigation dots */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentSlide(i)}
            className={`w-2.5 h-2.5 rounded-full transition-all ${
              i === currentSlide
                ? "bg-mcs-orange w-8"
                : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
