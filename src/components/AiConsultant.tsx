"use client";

import { useState, useRef, useEffect, useCallback } from "react";

interface Message {
  role: "user" | "bot";
  text: string;
}

const quickTopics = [
  "GraBox 智取櫃跟市面上有什麼差異？",
  "價格大概多少？",
  "有哪些規格可以選？",
  "可以客製自己的品牌嗎？",
  "如何成為經銷夥伴？",
  "我想了解更多",
];

export default function AiConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [voiceSupported, setVoiceSupported] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  // Check if speech recognition is supported
  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      setVoiceSupported(true);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  // Show welcome when first opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        { role: "bot", text: "您好！我是 Yuzu（柚子）🍊 MCS 銓幻元科技的 AI 顧問" },
        { role: "bot", text: "您可以打字或按下麥克風 🎙️ 直接用說的，我來為您解答！" },
      ]);
    }
  }, [isOpen, messages.length]);

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
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "抱歉，暫時無法回應，請稍後再試或 Email 至 service@transtep.com 🍊" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  const toggleVoice = useCallback(() => {
    if (isListening) {
      // Stop listening
      recognitionRef.current?.stop();
      setIsListening(false);
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.lang = "zh-TW";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let transcript = Array.from(event.results)
        .map((result) => result[0].transcript)
        .join("");
      // Fix common misrecognitions for product terms
      transcript = transcript
        .replace(/breaks/gi, "GraBox")
        .replace(/grab box/gi, "GraBox")
        .replace(/gray box/gi, "GraBox")
        .replace(/grape box/gi, "GraBox")
        .replace(/借錢/g, "介紹")
        .replace(/MCS/gi, "MCS")
        .replace(/pos/gi, "POS")
        .replace(/kds/gi, "KDS");
      setInput(transcript);

      // If final result, auto-send
      if (event.results[event.results.length - 1].isFinal) {
        setIsListening(false);
        if (transcript.trim()) {
          // Small delay to show the transcribed text before sending
          setTimeout(() => {
            setInput("");
            // We need to construct messages inline since state may not be updated
            const newMsgs: Message[] = [...messages, { role: "user", text: transcript.trim() }];
            setMessages(newMsgs);
            setIsLoading(true);

            fetch("/api/chat", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ messages: newMsgs }),
            })
              .then((res) => res.json())
              .then((data) => {
                setMessages((prev) => [...prev, { role: "bot", text: data.answer }]);
              })
              .catch(() => {
                setMessages((prev) => [
                  ...prev,
                  { role: "bot", text: "抱歉，暫時無法回應，請稍後再試 🍊" },
                ]);
              })
              .finally(() => setIsLoading(false));
          }, 300);
        }
      }
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    recognition.start();
    setIsListening(true);
  }, [isListening, messages]);

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
                  <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[280px] whitespace-pre-wrap">
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
            )}
          </div>

          {/* Input */}
          <div className="px-4 py-3 border-t border-gray-100 flex-shrink-0">
            {/* Voice listening indicator */}
            {isListening && (
              <div className="mb-2 flex items-center gap-2 text-sm text-red-500 animate-pulse">
                <span className="w-2.5 h-2.5 bg-red-500 rounded-full" />
                正在聆聽，請說話...
              </div>
            )}
            <div className="flex gap-2">
              {/* Mic Button */}
              {voiceSupported && (
                <button
                  onClick={toggleVoice}
                  disabled={isLoading}
                  className={`px-3 py-2.5 rounded-xl transition-all disabled:opacity-30 ${
                    isListening
                      ? "bg-red-500 text-white animate-pulse"
                      : "bg-gray-100 text-gray-500 hover:bg-mcs-orange/10 hover:text-mcs-orange"
                  }`}
                  title="按下開始語音輸入"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                </button>
              )}
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={isListening ? "正在聽您說..." : "打字或按 🎙️ 說話"}
                className="flex-1 px-3 py-2.5 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                autoFocus
                disabled={isLoading || isListening}
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
              Powered by AI · 按 🎙️ 用說的更方便
            </div>
          </div>
        </div>
      )}
    </>
  );
}
