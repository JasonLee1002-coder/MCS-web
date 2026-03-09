"use client";

import { useState } from "react";

const slides = [
  { id: "cover", title: "封面", icon: "🏠" },
  { id: "grabox", title: "GraBox 智取櫃", icon: "📦" },
  { id: "vending", title: "智能販賣機", icon: "🤖" },
  { id: "oem", title: "OEM/ODM", icon: "🏭" },
  { id: "member", title: "會員系統", icon: "👥" },
  { id: "pos", title: "POS/KDS", icon: "🛒" },
  { id: "cloud", title: "雲端平台", icon: "☁️" },
  { id: "cases", title: "客戶實績", icon: "🏆" },
  { id: "partner", title: "經銷夥伴", icon: "🤝" },
  { id: "contact", title: "聯絡我們", icon: "📞" },
];

const quickQA = [
  { label: "價格多少？", question: "價格" },
  { label: "交期多久？", question: "交期" },
  { label: "保固服務？", question: "保固" },
  { label: "支援哪些付款？", question: "付款" },
  { label: "櫃子尺寸？", question: "尺寸" },
  { label: "溫控功能？", question: "溫控" },
  { label: "安裝服務？", question: "安裝" },
  { label: "如何成為經銷？", question: "經銷" },
];

export default function ControlPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [customQuestion, setCustomQuestion] = useState("");
  const [connected, setConnected] = useState(false);

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    localStorage.setItem("mcs-present-slide", index.toString());
    // Trigger storage event for other tabs
    window.dispatchEvent(
      new StorageEvent("storage", {
        key: "mcs-present-slide",
        newValue: index.toString(),
      })
    );
  };

  const sendQuestion = (question: string) => {
    localStorage.setItem("mcs-present-qa", question);
    localStorage.setItem("mcs-present-qa-ts", Date.now().toString());
  };

  const hideQA = () => {
    localStorage.setItem("mcs-present-qa-hide", Date.now().toString());
  };

  const handleCustomQuestion = () => {
    if (customQuestion.trim()) {
      sendQuestion(customQuestion.trim());
      setCustomQuestion("");
    }
  };

  const handleConnect = () => {
    setConnected(true);
  };

  if (!connected) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl p-8 shadow-lg max-w-sm w-full text-center">
          <div className="w-16 h-16 bg-mcs-orange/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-mcs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-mcs-blue-dark mb-2">
            MCS 簡報遙控器
          </h1>
          <p className="text-gray-500 text-sm mb-6">
            請先在電腦端開啟簡報模式<br />
            <span className="text-mcs-orange font-mono">/present</span>
          </p>
          <button
            onClick={handleConnect}
            className="w-full bg-mcs-orange text-white py-3 rounded-xl font-medium hover:bg-mcs-orange-light transition-colors"
          >
            連線開始
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-mcs-blue-dark text-white px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="font-bold text-sm">MCS 簡報控制</div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          <span className="text-xs text-white/60">已連線</span>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* Current Slide */}
        <div className="bg-white rounded-xl p-4 shadow-sm">
          <div className="text-xs text-gray-400 mb-1">目前投影</div>
          <div className="font-bold text-mcs-blue-dark">
            {slides[currentSlide].icon} {slides[currentSlide].title}
          </div>
          <div className="text-xs text-gray-400 mt-1">
            {currentSlide + 1} / {slides.length}
          </div>
        </div>

        {/* Slide Navigation */}
        <div>
          <div className="text-sm font-bold text-gray-700 mb-3">切換投影片</div>
          <div className="grid grid-cols-3 gap-2">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`p-3 rounded-xl text-center transition-all ${
                  index === currentSlide
                    ? "bg-mcs-orange text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-100 hover:border-mcs-orange"
                }`}
              >
                <div className="text-lg mb-0.5">{slide.icon}</div>
                <div className="text-xs leading-tight">{slide.title}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Prev / Next */}
        <div className="flex gap-3">
          <button
            onClick={() => goToSlide(Math.max(0, currentSlide - 1))}
            disabled={currentSlide === 0}
            className="flex-1 bg-white border border-gray-200 py-3 rounded-xl font-medium text-gray-700 disabled:opacity-30"
          >
            ← 上一頁
          </button>
          <button
            onClick={() => goToSlide(Math.min(slides.length - 1, currentSlide + 1))}
            disabled={currentSlide === slides.length - 1}
            className="flex-1 bg-mcs-blue text-white py-3 rounded-xl font-medium disabled:opacity-30"
          >
            下一頁 →
          </button>
        </div>

        {/* Quick Q&A */}
        <div>
          <div className="text-sm font-bold text-gray-700 mb-3">
            快速回答客戶提問
          </div>
          <div className="grid grid-cols-2 gap-2">
            {quickQA.map((qa) => (
              <button
                key={qa.question}
                onClick={() => sendQuestion(qa.question)}
                className="bg-white border border-gray-100 p-3 rounded-xl text-sm text-gray-700 hover:border-mcs-orange hover:bg-mcs-orange/5 transition-colors text-left"
              >
                {qa.label}
              </button>
            ))}
          </div>
        </div>

        {/* Custom Question */}
        <div>
          <div className="text-sm font-bold text-gray-700 mb-3">
            自訂回答
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={customQuestion}
              onChange={(e) => setCustomQuestion(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCustomQuestion()}
              placeholder="輸入客戶的問題..."
              className="flex-1 px-4 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
            />
            <button
              onClick={handleCustomQuestion}
              className="bg-mcs-orange text-white px-4 py-2.5 rounded-xl text-sm font-medium"
            >
              送出
            </button>
          </div>
        </div>

        {/* Hide Q&A */}
        <button
          onClick={hideQA}
          className="w-full bg-gray-100 text-gray-500 py-3 rounded-xl text-sm"
        >
          隱藏問答視窗
        </button>
      </div>
    </div>
  );
}
