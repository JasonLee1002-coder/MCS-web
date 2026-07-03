"use client";

import { useState, useRef, useEffect } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
  options?: { label: string; value: string }[];
}

const qaKnowledge = [
  { keywords: ["價格", "多少錢", "費用", "報價", "成本", "價位"], answer: "GraBox 智取櫃依規格不同，單機版約 NT$15-25 萬，聯網版約 NT$25-40 萬。量大可議價，歡迎留下聯繫方式取得詳細報價！" },
  { keywords: ["交期", "多久", "什麼時候", "等多久", "幾週"], answer: "標準規格約 4-6 週交貨。OEM/ODM 客製化訂單約 8-12 週，視數量與客製程度而定。" },
  { keywords: ["保固", "維修", "售後", "壞了", "故障"], answer: "全產品提供一年免費保固，可加購延長保固至三年。全台灣服務據點，線上客服支援。" },
  { keywords: ["付款", "支付", "怎麼付", "刷卡", "LINE Pay", "支付方式"], answer: "支持多元支付：LINE Pay、街口支付、悠遊卡、信用卡、Apple Pay、Google Pay，也可搭配企業月結方案。" },
  { keywords: ["尺寸", "大小", "幾格", "規格", "多大", "格數"], answer: "GraBox 提供多種規格：6格、12格、18格、24格，也可依場地需求客製尺寸。標準寬度 60-120cm。" },
  { keywords: ["溫控", "溫度", "冷藏", "冷凍", "保溫", "三溫"], answer: "支援三溫層控制：常溫（15-25°C）、冷藏（2-8°C）、冷凍（-18°C以下），可混搭配置。" },
  { keywords: ["安裝", "裝機", "到府", "設定", "裝設"], answer: "我們提供全台到府安裝服務，含場地評估、設備安裝、系統設定、員工教育訓練，一站式完成。" },
  { keywords: ["經銷", "代理", "合作", "推薦", "加盟", "夥伴"], answer: "歡迎加入 MCS 經銷夥伴計畫！推薦成功可獲得積分獎勵，兌換商品、電商點數或 LINE 點數。請留下聯繫方式，我們會盡快聯繫您！" },
  { keywords: ["販賣機", "自動販賣", "無人", "自動"], answer: "MCS 智能販賣機搭載 AI 系統，支援人臉辨識、多元支付、遠端庫存管理，100% 台灣設計製造，適用商場、辦公大樓、學校等場景。" },
  { keywords: ["POS", "點餐", "KDS", "廚房"], answer: "我們提供 POS 點餐系統與 KDS 廚房顯示系統串接，支援外送平台整合（UberEats/Foodpanda），多店統一管理。" },
  { keywords: ["會員", "積分", "點數", "LINE點數", "獎勵"], answer: "MCS 會員系統支援積分累積與兌換：折抵商品、換電商點數、或兌換 LINE 點數（星益欣/12cm 整合），幫助您經營忠實客戶。" },
  { keywords: ["OEM", "ODM", "貼牌", "客製", "自有品牌", "品牌"], answer: "OEM/ODM 全客製服務，從外觀設計到軟體介面，100% 台灣製造。少量多樣、彈性生產，支援品牌貼牌需求。" },
  { keywords: ["台灣", "製造", "品質", "MIT", "哪裡做"], answer: "MCS 所有智慧設備皆為台灣設計、台灣製造，通過嚴格品質檢測，提供完整售後服務與保固。" },
  { keywords: ["雲端", "數據", "分析", "報表", "dashboard"], answer: "MCS 雲端營運平台提供即時 Dashboard、AI 銷售預測、庫存管理、顧客行為分析、自動化報表。" },
  { keywords: ["GraBox", "grabox", "智取櫃", "取餐櫃", "取餐"], answer: "GraBox AI 智取櫃是我們的明星產品！結合 AI 訂餐系統，提供單機版與聯網版，支援三溫層控制，適用餐飲、飯店、企業等場景。想了解更多嗎？可以問我價格、規格、溫控等問題！" },
  { keywords: ["你好", "哈囉", "嗨", "Hi", "hello", "您好"], answer: "您好！我是 Yuzu 🍊 很高興為您服務！您可以直接問我任何關於智取櫃、智能販賣機、POS系統、會員系統的問題，或者告訴我您的需求，我來為您推薦方案！" },
  { keywords: ["謝謝", "感謝", "thanks", "Thank"], answer: "不客氣！如果還有其他問題隨時問我 🍊 想要進一步了解的話，也可以留下聯絡方式，我們的專員會為您服務！" },
  { keywords: ["餐廳", "餐飲", "小吃", "便當", "飲料", "咖啡"], answer: "餐飲業是我們最擅長的領域！GraBox 智取櫃可以解決取餐效率問題，搭配 POS/KDS 系統串接，讓您的餐廳全面數位化。想知道適合您規模的方案嗎？" },
  { keywords: ["零售", "商店", "超商", "店面"], answer: "零售業我們提供智能販賣機、POS 系統串接、會員管理系統等完整解決方案，幫助您實現無人化或半自助營運模式。" },
  { keywords: ["聯絡", "聯繫", "找人", "業務", "電話"], answer: "請留下您的姓名、公司和 Email，我會請專員盡快與您聯繫！或者直接 Email 至 service@transtep.com。" },
];

function findAnswer(question: string): string {
  const q = question.toLowerCase();
  const matched = qaKnowledge.find((qa) =>
    qa.keywords.some((kw) => q.includes(kw.toLowerCase()))
  );
  if (matched) return matched.answer;
  return `謝謝您的提問！關於「${question}」，建議您留下聯繫方式，或 Email 至 service@transtep.com，我們的專員會為您詳細說明。您也可以試著問我：價格、規格、交期、溫控、安裝、經銷合作 等問題！`;
}

const quickTopics = [
  "GraBox 智取櫃是什麼？",
  "價格大概多少？",
  "有哪些規格？",
  "可以客製嗎？",
  "如何成為經銷夥伴？",
  "我想聯絡業務",
];

export default function AiConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

  // Show welcome when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "bot", text: "您好！我是 Yuzu（柚子）🍊 MCS 銓幻元科技的 AI 顧問" },
        { role: "bot", text: "您可以直接輸入問題，或點選下方常見主題開始！" },
      ]);
    }
  }, [isOpen, messages.length]);

  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const question = text.trim();
    setInput("");

    setMessages((prev) => [...prev, { role: "user", text: question }]);

    setTimeout(() => {
      const answer = findAnswer(question);
      setMessages((prev) => [...prev, { role: "bot", text: answer }]);
    }, 400);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") sendMessage(input);
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          id="yuzu-ai-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-mcs-orange text-white rounded-full shadow-lg hover:bg-mcs-orange-light transition-all flex items-center gap-2 pl-4 pr-5 py-3 animate-bounce"
          aria-label="Yuzu AI 顧問"
        >
          <span className="text-2xl">🍊</span>
          <span className="text-sm font-bold">Yuzu AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] h-[560px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-mcs-blue-dark to-mcs-blue px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mcs-orange rounded-full flex items-center justify-center text-xl">
                🍊
              </div>
              <div>
                <div className="text-white font-bold text-sm">Yuzu AI 顧問</div>
                <div className="text-white/60 text-xs">銓幻元科技 MCS</div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white/70 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Chat Body */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg, i) =>
              msg.role === "bot" ? (
                <div key={i} className="flex gap-2">
                  <div className="w-7 h-7 bg-mcs-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">
                    🍊
                  </div>
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[280px]">
                    {msg.text}
                  </div>
                </div>
              ) : (
                <div key={i} className="flex justify-end">
                  <div className="bg-mcs-orange text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[280px]">
                    {msg.text}
                  </div>
                </div>
              )
            )}

            {/* Quick Topics - only show at start */}
            {messages.length <= 2 && (
              <>
                <VoiceTip />
                <div className="space-y-1.5 mt-1">
                  {quickTopics.map((topic) => (
                    <button
                      key={topic}
                      onClick={() => sendMessage(topic)}
                      className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-mcs-orange hover:bg-mcs-orange/5 transition-colors"
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="直接輸入問題，或用語音..."
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                autoFocus
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim()}
                className="bg-mcs-orange text-white px-3.5 py-2.5 rounded-xl hover:bg-mcs-orange-light transition-colors disabled:opacity-30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-gray-400 mt-1.5 flex items-center gap-1">
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
              </svg>
              Win+H 啟動語音輸入
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function VoiceTip() {
  return (
    <div className="bg-gradient-to-r from-mcs-orange/10 to-mcs-blue/10 border border-mcs-orange/20 rounded-xl p-3">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-mcs-orange rounded-xl flex items-center justify-center flex-shrink-0">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
          </svg>
        </div>
        <div>
          <div className="text-xs font-bold text-mcs-blue-dark">語音輸入</div>
          <div className="text-[11px] text-gray-500 mt-0.5">
            按 <kbd className="bg-white px-1.5 py-0.5 rounded shadow-sm text-[10px] font-mono font-bold border">Win</kbd> + <kbd className="bg-white px-1.5 py-0.5 rounded shadow-sm text-[10px] font-mono font-bold border">H</kbd> 用說的更方便！
          </div>
        </div>
      </div>
    </div>
  );
}
