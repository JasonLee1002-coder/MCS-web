"use client";

import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useState, useRef, useEffect, useMemo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import ReactMarkdown from "react-markdown";
import { LeadConfirmCard, type LeadData } from "./LeadConfirmCard";
import { OPENER } from "@/lib/chat-config";

interface PageContext {
  welcome: string;
  topics: string[];
}

const pageContexts: Record<string, PageContext> = {
  "/": {
    welcome: "您目前遇到最大的問題是什麼？跟我聊聊，我來幫您找方案！",
    topics: [
      "門市/廠區缺人手，想找無人化取餐/販售方案",
      "想導入智取櫃，但不知道怎麼跟現有系統串接",
      "網站流量停滯不成長",
      "SEO排名下滑，想找人健檢",
      "幾乎沒有自然流量，想從頭做SEO",
      "想加做AI搜尋(GEO)曝光",
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
  "/blog/semiconductor-ev-supply-chain-factory-meal": {
    welcome: "正在評估廠區的員工取餐方案嗎？三班制配置、識別證整合、稽核報表，都可以直接問我！",
    topics: [
      "我們廠是三班制、大約 400 人，要放幾台設備？怎麼配置？",
      "取餐櫃可以跟我們的員工識別證和門禁系統整合嗎？",
      "客戶稽核會查食安記錄，溫度和效期報表可以匯出嗎？",
      "可以先安排場勘評估嗎？",
    ],
  },
  "/blog/employee-badge-point-vending-machine": {
    welcome: "想用員工識別證做福利點數嗎？扣點機制、HR 系統整合、點數制度設計，問我就對了！",
    topics: [
      "我們的門禁卡可以直接在販賣機扣點嗎？需要換卡嗎？",
      "員工福利點數每月該發多少？加班宵夜補助怎麼設定？",
      "識別證扣點怎麼跟 HR／門禁系統整合？導入要多久？",
      "後台報表可以按部門統計嗎？",
    ],
  },
  "/blog/property-management-multi-building-unmanned-store": {
    welcome: "物管公司想一次導入多棟大樓嗎？分潤模式、管委會提案、集中管理後台，都可以問我！",
    topics: [
      "我們物管公司管理 20 棟大樓，想一次導入，分潤模式怎麼談？",
      "管委會不同意在大廳放販賣機怎麼辦？有提案資料可以參考嗎？",
      "智取櫃可以同時收包裹和賣商品嗎？空間小的社區怎麼配置？",
      "多棟據點可以用同一個後台管理嗎？",
    ],
  },
  "/blog/vending-machine-lease-buy-profit-sharing-comparison": {
    welcome: "在比較租賃、買斷、分潤哪個划算嗎？告訴我您的場域條件，我可以幫您分析！",
    topics: [
      "我們公司約 300 人想在園區放一台販賣機，租賃和買斷哪個划算？",
      "分潤（寄售）模式企業完全不用出錢嗎？分成大概怎麼算？",
      "可以先租賃試營運，之後再轉買斷嗎？條件是什麼？",
      "幫我依場域條件出三種模式的試算",
    ],
  },
  "/blog/vending-machine-financing-lease-guide": {
    welcome: "考慮用融資租賃導入設備嗎？申請文件、報價單、租期條件，都可以直接問我！",
    topics: [
      "想用融資租賃導入販賣機，需要準備哪些文件？",
      "融資租賃、營業性租賃、直接買斷，哪種最適合我？",
      "請幫我索取設備報價單，我要向租賃公司送件",
      "租期一般是多久？期滿設備歸誰？",
    ],
  },
};

const defaultContext: PageContext = {
  welcome: OPENER,
  topics: [
    "門市/廠區缺人手，想找無人化取餐/販售方案",
    "網站流量停滯不成長",
    "SEO排名下滑，想找人健檢",
    "想加做AI搜尋(GEO)曝光",
    "如何聯繫你們？",
  ],
};

/** 四個核心欄位，用於進度顯示 */
const CORE_FIELDS: { key: keyof LeadData; label: string }[] = [
  { key: "venue", label: "場域" },
  { key: "need", label: "需求" },
  { key: "name", label: "姓名" },
  { key: "contact", label: "聯絡方式" },
];

/** 用「已收集到的欄位」組出一筆可送出的 lead，缺的欄位標記待補 */
function buildLead(p: Partial<LeadData>): LeadData {
  return {
    venue: p.venue?.trim() || "待確認場域",
    need: p.need?.trim() || "待業務進一步了解需求",
    headcount: p.headcount?.trim() || undefined,
    name: p.name?.trim() || "",
    contact: p.contact?.trim() || "待業務致電確認",
    contactMethod: p.contactMethod || "電話",
    institution: p.institution?.trim() || undefined,
    category: p.category,
  };
}

export default function AiConsultant() {
  const pathname = usePathname();
  const ctx = pageContexts[pathname] || defaultContext;
  const [isOpen, setIsOpen] = useState(false);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [dismissed, setDismissed] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const [input, setInput] = useState("");
  const chatRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Presenter mode room code (存在既有 /present/control 同步功能)
  const isPresenterMode = pathname === "/present/control";
  const roomCodeRef = useRef("");
  const syncedIdsRef = useRef<Set<string>>(new Set());

  const initialMessages = useMemo(
    () => [
      {
        id: "init-brand",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: "嗨！我是小龍 🐉 MCS 銓幻元科技的 AI 顧問" }],
      },
      {
        id: "init-welcome",
        role: "assistant" as const,
        parts: [{ type: "text" as const, text: ctx.welcome }],
      },
    ],
    [ctx.welcome]
  );

  const transport = useMemo(
    () =>
      new DefaultChatTransport({
        api: "/api/chat",
        body: { sourceUrl: pathname, pageContext: ctx.welcome },
      }),
    [pathname, ctx.welcome]
  );

  const { messages, sendMessage, regenerate, status } = useChat({
    messages: initialMessages,
    transport,
  });

  const isStreaming = status === "streaming" || status === "submitted";
  const userTurns = messages.filter((m) => (m.role as string) === "user").length;
  const MAX_TURNS = 8;

  // 偵測測試模式：?test=1 → 送出時不寫入真實 CRM
  useEffect(() => {
    if (typeof window === "undefined") return;
    setTestMode(new URLSearchParams(window.location.search).get("test") === "1");
  }, []);

  useEffect(() => {
    if (isPresenterMode) {
      const params = new URLSearchParams(window.location.search);
      roomCodeRef.current = params.get("room") || "";
    }
  }, [isPresenterMode]);

  // Sync Yuzu Q&A to presentation screen（沿用既有 /present 功能）
  const syncToPresentation = useCallback(
    (question: string, answer: string) => {
      if (!isPresenterMode || !roomCodeRef.current) return;
      fetch("/api/present", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ room: roomCodeRef.current, qa: question, qaAnswer: answer }),
      }).catch(() => {});
    },
    [isPresenterMode]
  );

  useEffect(() => {
    if (!isPresenterMode || isStreaming) return;
    const lastUserIdx = messages.map((m) => m.role as string).lastIndexOf("user");
    if (lastUserIdx < 0) return;
    const assistantMsg = messages[lastUserIdx + 1];
    if (!assistantMsg || assistantMsg.id === undefined || syncedIdsRef.current.has(assistantMsg.id)) return;
    const userText = (messages[lastUserIdx].parts ?? []).find((p) => p.type === "text")?.text ?? "";
    const answerText = (assistantMsg.parts ?? []).find((p) => p.type === "text")?.text ?? "";
    if (!answerText) return;
    syncedIdsRef.current.add(assistantMsg.id);
    syncToPresentation(userText, answerText);
  }, [messages, isStreaming, isPresenterMode, syncToPresentation]);

  // 累積解析 summarize_lead 的每輪輸出，得到目前已收集欄位 + AI 是否判定可送出
  const { partialLead, aiReady } = useMemo(() => {
    const acc: Partial<LeadData> = {};
    let ready = false;
    const keys: (keyof LeadData)[] = ["venue", "need", "headcount", "name", "contact", "contactMethod", "institution", "category"];
    for (const msg of messages) {
      for (const part of msg.parts ?? []) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const p = part as any;
        if (p.type === "tool-summarize_lead" && p.state === "output-available" && p.output) {
          const o = p.output as Record<string, unknown>;
          for (const k of keys) {
            const v = o[k];
            if (typeof v === "string" && v.trim()) {
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (acc as any)[k] = v;
            }
          }
          if (o.ready === true) ready = true;
        }
      }
    }
    return { partialLead: acc, aiReady: ready };
  }, [messages]);

  const collectedCount = CORE_FIELDS.filter((f) => partialLead[f.key]).length;
  const hasContact = !!partialLead.contact;
  const started = userTurns > 0;

  // AI 判定可送出 → 自動開啟確認卡
  useEffect(() => {
    if (leadData || dismissed) return;
    if (aiReady) setLeadData(buildLead(partialLead));
  }, [aiReady, partialLead, leadData, dismissed]);

  // 空串流自動重送（極少數情況 AI Gateway/供應商偶爾回空串流）。
  // 該輪 user 訊息後若 assistant 無任何文字/工具輸出，最多自動 regenerate 2 次。
  const emptyRetryRef = useRef<{ userId: string | null; count: number }>({ userId: null, count: 0 });
  useEffect(() => {
    if (status !== "ready" && status !== "error") return;
    if (userTurns === 0) return;
    const lastUserIdx = messages.map((m) => m.role as string).lastIndexOf("user");
    if (lastUserIdx < 0) return;
    const lastUserId = messages[lastUserIdx].id;
    const gotContent = messages.slice(lastUserIdx + 1).some((m) =>
      (m.parts ?? []).some((p) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const x = p as any;
        return (
          (x.type === "text" && typeof x.text === "string" && x.text.trim()) ||
          (x.type === "tool-summarize_lead" && x.state === "output-available")
        );
      })
    );
    if (gotContent) {
      emptyRetryRef.current = { userId: lastUserId, count: 0 };
      return;
    }
    if (emptyRetryRef.current.userId !== lastUserId) {
      emptyRetryRef.current = { userId: lastUserId, count: 0 };
    }
    if (emptyRetryRef.current.count >= 2) return;
    emptyRetryRef.current.count += 1;
    const t = setTimeout(() => {
      regenerate();
    }, 500);
    return () => clearTimeout(t);
  }, [status, messages, userTurns, regenerate]);

  // 兜底：對話達上限仍未產生 lead → 強制用已收集欄位組一筆送出（不再卡死）
  useEffect(() => {
    if (leadData || dismissed || isStreaming) return;
    if (userTurns >= MAX_TURNS) setLeadData(buildLead(partialLead));
  }, [userTurns, isStreaming, leadData, dismissed, partialLead]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isStreaming, leadData]);

  // Hide on /intro and /east-beauty (clean presentation pages)
  if (pathname === "/intro" || pathname === "/east-beauty") return null;

  function handleSend(e: React.FormEvent) {
    e.preventDefault();
    if (!input.trim() || isStreaming) return;
    sendMessage({ text: input });
    setInput("");
    setDismissed(false);
  }

  function forceLead() {
    setDismissed(false);
    setLeadData(buildLead(partialLead));
  }

  async function handleLeadSubmit(data: LeadData) {
    const textLines = messages
      .filter((m) => (m.role as string) !== "system")
      .flatMap((m) =>
        (m.parts ?? [])
          .filter((p): p is { type: "text"; text: string } => p.type === "text")
          // 2026-08-18 紅隊修正：把訊息內容裡出現的 [user]/[assistant]/[system]
          // 換成全形括號，避免內容偽造出一行假的角色前綴——下游 scrubTranscript
          // 是逐行判讀的，若讓內容能自行宣告角色，遮蔽規則就形同虛設。
          .map((p) => `[${m.role}] ${p.text.replace(/\[(user|assistant|system)\]/gi, "［$1］")}`)
      )
      .join("\n");

    const caseId = `MCS-${Date.now()}`;
    await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        caseId,
        venue: data.venue,
        situation: data.need,
        // 2026-08-18 修：description 原本整欄就是 data.headcount，
        // 所以 CRM「現有條件」欄長年只有「1000人以上」「1」這種人流字串，
        // 沒問到人流時就整欄空白（實查 12 筆真單有 5 筆空白）。
        // 現在 headcount 走自己的欄位，description 改成真正的「現有條件」——
        // 場域原話 + 人流 + 單位，業務看得到情境。
        description: [
          data.venue ? `場域：${data.venue}` : "",
          data.headcount ? `人流／出餐量：${data.headcount}` : "",
          data.institution ? `單位：${data.institution}` : "",
        ].filter(Boolean).join("\n"),
        headcount: data.headcount ?? "",
        name: data.name,
        contact: data.contact,
        institution: data.institution ?? "",
        sourceUrl: pathname,
        contactMethod: data.contactMethod,
        // 上限放寬到 6000，實際遮蔽與截斷由伺服器端 scrubTranscript() 處理
        // （它會保留結尾——聯絡方式與更正通常在對話最後，比開頭值錢）
        aiSummary: textLines.slice(0, 6000),
        leadCategory: data.category ?? "IoT無人商店",
        testMode,
      }),
    });
  }

  const accent = "#E8751A"; // mcs-orange

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          id="yuzu-ai-btn"
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-mcs-orange text-white rounded-full shadow-lg hover:bg-mcs-orange-light transition-all flex items-center gap-2 pl-4 pr-5 py-3 animate-bounce"
          aria-label="小龍 AI 顧問"
        >
          <span className="text-2xl">🐉</span>
          <span className="text-sm font-bold">小龍 AI</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <motion.div
          initial={reduceMotion ? undefined : { opacity: 0, y: 12, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-0 right-0 sm:bottom-6 sm:right-6 z-50 w-full sm:w-[380px] h-full sm:h-[600px] bg-white sm:rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-mcs-blue-dark to-mcs-blue px-5 py-4 flex items-center justify-between flex-shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mcs-orange rounded-full flex items-center justify-center text-xl">🐉</div>
              <div>
                <div className="text-white font-bold text-sm flex items-center gap-1.5">
                  小龍 AI 顧問
                  <motion.span
                    className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400"
                    animate={reduceMotion ? undefined : { opacity: [1, 0.35, 1] }}
                    transition={reduceMotion ? undefined : { duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  {testMode && (
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-amber-400/30 text-amber-200 font-mono">TEST</span>
                  )}
                </div>
                <div className="text-white/60 text-xs">AI 驅動 · 銓幻元科技 MCS</div>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-white/70 hover:text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* 需求收集進度 */}
          <div className="px-4 py-2 shrink-0 border-b border-gray-100 bg-mcs-gray">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-[11px] text-gray-500">
                已收集 <span className="font-bold text-mcs-orange">{collectedCount}</span>/4 項需求
              </span>
              <span className="text-[11px] text-gray-400">
                {collectedCount >= 3 && hasContact ? "可送出方案" : `還差 ${4 - collectedCount} 項`}
              </span>
            </div>
            <div className="flex gap-1.5">
              {CORE_FIELDS.map((f) => {
                const done = !!partialLead[f.key];
                return (
                  <motion.div
                    key={f.key}
                    className="flex-1 flex items-center justify-center gap-1 rounded-md py-1 text-[10px] font-medium"
                    style={{
                      background: done ? `${accent}1A` : "#ffffff",
                      color: done ? accent : "#9ca3af",
                      border: `1px solid ${done ? accent + "55" : "#e5e7eb"}`,
                    }}
                    animate={done && !reduceMotion ? { scale: [1, 1.08, 1] } : { scale: 1 }}
                    transition={{ duration: 0.35, ease: "easeOut" }}
                  >
                    <span>{done ? "✓" : "○"}</span>
                    {f.label}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Chat Body */}
          <div ref={chatRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            <AnimatePresence initial={false}>
              {messages
                .filter((m) => (m.role as string) !== "system")
                .map((m) => {
                  const textPart = (m.parts ?? []).find((p): p is { type: "text"; text: string } => p.type === "text");
                  if (!textPart?.text) return null;
                  const isUser = (m.role as string) === "user";
                  return isUser ? (
                    <motion.div
                      key={m.id}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex justify-end"
                    >
                      <div className="bg-mcs-orange text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[280px]">
                        {textPart.text}
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key={m.id}
                      initial={reduceMotion ? undefined : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex gap-2"
                    >
                      <div className="w-7 h-7 bg-mcs-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">
                        🐉
                      </div>
                      <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[280px] prose prose-sm prose-gray prose-p:my-1 prose-ul:my-1 prose-ol:my-1 prose-li:my-0.5 prose-strong:text-mcs-blue-dark prose-headings:text-mcs-blue-dark prose-headings:text-sm prose-headings:mt-2 prose-headings:mb-1">
                        <ReactMarkdown>{textPart.text}</ReactMarkdown>
                      </div>
                    </motion.div>
                  );
                })}
            </AnimatePresence>

            {leadData && (
              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 0.95, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <LeadConfirmCard data={leadData} onSubmit={handleLeadSubmit} onRevise={() => { setLeadData(null); setDismissed(true); }} />
              </motion.div>
            )}

            {isStreaming && (
              <div className="flex gap-2">
                <div className="w-7 h-7 bg-mcs-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 text-sm">
                  🐉
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
            {messages.length <= 2 && !isStreaming && (
              <div className="space-y-1.5 mt-1">
                {ctx.topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      if (isStreaming) return;
                      sendMessage({ text: topic });
                      setDismissed(false);
                    }}
                    className="block w-full text-left px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 hover:border-mcs-orange hover:bg-mcs-orange/5 transition-colors"
                  >
                    {topic}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* 明確送出出口 + 輸入框 */}
          {!leadData && (
            <div className="shrink-0 border-t border-gray-100">
              {(hasContact || started) && (
                <button
                  onClick={forceLead}
                  className="w-full px-4 py-2 text-xs font-bold border-b border-gray-100 transition-colors"
                  style={{
                    background: hasContact ? accent : "transparent",
                    color: hasContact ? "#ffffff" : accent,
                  }}
                >
                  {hasContact ? "產生方案並送出 →" : "✋ 直接留下聯絡方式，專人聯繫"}
                </button>
              )}
              <form onSubmit={handleSend} className="px-4 py-3 flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="輸入您的問題..."
                  className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                  disabled={isStreaming}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isStreaming}
                  className="bg-mcs-orange text-white px-3.5 py-2.5 rounded-xl hover:bg-mcs-orange-light transition-colors disabled:opacity-30"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
              </form>
              <div className="text-[10px] text-gray-400 pb-2 text-center">Powered by 小龍 AI 🐉</div>
            </div>
          )}
        </motion.div>
      )}
    </>
  );
}
