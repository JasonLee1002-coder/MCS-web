"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { usePathname } from "next/navigation";
import ReactMarkdown from "react-markdown";

interface Message {
  role: "user" | "bot";
  text: string;
}

interface PageContext {
  welcome: string;
  topics: string[];
}

const pageContexts: Record<string, PageContext> = {
  "/": {
    welcome: "有什麼我可以幫您的嗎？不管是產品規格、合作方式，還是想聊聊您的需求，我都在！",
    topics: [
      "GraBox 智取櫃跟市面上有什麼差異？",
      "你們有哪些產品？",
      "可以客製自己的品牌嗎？",
      "如何成為經銷夥伴？",
      "我有開店/餐廳需求，怎麼合作？",
      "我想了解更多",
    ],
  },
  "/cases": {
    welcome: "正在看我們的客戶案例嗎？有任何想深入了解的，隨時問我！",
    topics: [
      "麥味登的智取櫃是怎麼運作的？",
      "冷凍微波機怎麼賣到日本的？",
      "麗嬰國際的販賣機有什麼特色？",
      "我也想導入類似方案，怎麼開始？",
      "你們的設備保固多久？",
      "跟你們合作的流程是什麼？",
    ],
  },
  "/products/grabox": {
    welcome: "想了解 GraBox 智取櫃的細節嗎？規格、功能、適用場景，問我就對了！",
    topics: [
      "GraBox 有哪些格數可以選？",
      "可以做冷藏或冷凍嗎？",
      "人臉辨識取餐怎麼運作？",
      "可以跟我的 POS 系統串接嗎？",
      "安裝需要什麼條件？",
      "我想幫我的品牌客製一台",
    ],
  },
};

const defaultContext: PageContext = {
  welcome: "有什麼我可以幫您的嗎？產品、規格、合作方式都可以問我！",
  topics: [
    "你們有哪些產品？",
    "GraBox 智取櫃是什麼？",
    "可以客製化嗎？",
    "如何聯繫你們？",
    "我想了解更多",
  ],
};

export default function AiConsultant() {
  const pathname = usePathname();
  const ctx = pageContexts[pathname] || defaultContext;
  const [isOpen, setIsOpen] = useState(false);

  // Hide on /intro (pitch page — clean presentation)
  if (pathname === "/intro") return null;
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Get room code from URL if on /present/control
  const isPresenterMode = pathname === "/present/control";
  const roomCodeRef = useRef("");

  useEffect(() => {
    if (isPresenterMode) {
      const params = new URLSearchParams(window.location.search);
      roomCodeRef.current = params.get("room") || "";
    }
  }, [isPresenterMode]);

  // Sync Yuzu Q&A to presentation screen
  const syncToPresentation = useCallback((question: string, answer: string) => {
    if (!isPresenterMode || !roomCodeRef.current) return;
    fetch("/api/present", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        room: roomCodeRef.current,
        qa: question,
        qaAnswer: answer,
      }),
    }).catch(() => {});
  }, [isPresenterMode]);


  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Show welcome when first opened — context-aware
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "bot", text: "嗨！我是 Yuzu（柚子）🍊 MCS 銓幻元科技的 AI 顧問" },
        { role: "bot", text: ctx.welcome },
      ]);
    }
  }, [isOpen, messages.length, ctx.welcome]);

  const sendMessage = useCallback(async (text: string) => {
    if (!text.trim() || isLoading) return;
    const question = text.trim();
    setInput("");

    const newMessages: Message[] = [...messages, { role: "user", text: question }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });

      const data = await res.json();
      setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
      syncToPresentation(question, data.answer);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "抱歉，暫時無法回應，請稍後再試或 Email 至 service@mcstation.ai 🍊" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading, syncToPresentation]);

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
        <div className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-full sm:h-[560px] bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-mcs-blue-dark to-mcs-blue px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mcs-orange rounded-full flex items-center justify-center text-xl">
                🍊
              </div>
              <div>
                <div className="text-white font-bold text-sm">Yuzu AI 顧問</div>
                <div className="text-white/60 text-xs">AI 驅動 · 銓幻元科技 MCS</div>
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
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[280px] prose prose-sm prose-gray prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-mcs-blue-dark prose-headings:text-mcs-blue-dark prose-headings:text-sm prose-headings:mt-2 prose-headings:mb-1">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
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

            {/* Typing indicator */}
            {isLoading && (
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-mcs-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">
                  🍊
                </div>
                <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-3 text-sm text-gray-400">
                  <span className="inline-flex gap-1">
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                </div>
              </div>
            )}

            {/* Quick Topics - only show at start */}
            {messages.length <= 2 && !isLoading && (
              <div className="space-y-1.5 mt-1">
                {ctx.topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => sendMessage(topic)}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-mcs-orange hover:bg-mcs-orange/5 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
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
                placeholder="輸入您的問題..."
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                autoFocus
                disabled={isLoading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || isLoading}
                className="bg-mcs-orange text-white px-3.5 py-2.5 rounded-xl hover:bg-mcs-orange-light transition-colors disabled:opacity-30"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                </svg>
              </button>
            </div>
            <div className="text-[10px] text-gray-400 mt-1.5 text-center">
              Powered by Yuzu AI 🍊
            </div>
          </div>
        </div>
      )}
    </>
  );
}
