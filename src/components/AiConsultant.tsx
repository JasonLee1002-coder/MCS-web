"use client";

import { useState } from "react";

type Step =
  | "welcome"
  | "industry"
  | "scale"
  | "product"
  | "pain"
  | "recommend"
  | "contact"
  | "done";

interface UserData {
  industry: string;
  scale: string;
  product: string;
  pain: string;
  name: string;
  company: string;
  phone: string;
  email: string;
}

const industryOptions = [
  { label: "餐飲業", value: "餐飲業", icon: "🍽️" },
  { label: "零售業", value: "零售業", icon: "🛒" },
  { label: "飯店旅宿", value: "飯店旅宿", icon: "🏨" },
  { label: "企業團膳", value: "企業團膳", icon: "🏢" },
  { label: "智能販賣", value: "智能販賣", icon: "🤖" },
  { label: "其他", value: "其他", icon: "💡" },
];

const scaleOptions: Record<string, { label: string; value: string }[]> = {
  餐飲業: [
    { label: "小型（1-2 間店）", value: "小型" },
    { label: "中型（3-10 間店）", value: "中型" },
    { label: "連鎖（10 間以上）", value: "連鎖" },
  ],
  零售業: [
    { label: "單店", value: "單店" },
    { label: "多店（3-10 間）", value: "多店" },
    { label: "連鎖品牌", value: "連鎖品牌" },
  ],
  飯店旅宿: [
    { label: "民宿/小型旅館", value: "小型" },
    { label: "中型飯店", value: "中型" },
    { label: "大型飯店/連鎖", value: "大型" },
  ],
  企業團膳: [
    { label: "50人以下", value: "50人以下" },
    { label: "50-200人", value: "50-200人" },
    { label: "200人以上", value: "200人以上" },
  ],
  智能販賣: [
    { label: "單點設置", value: "單點" },
    { label: "多點佈建", value: "多點" },
    { label: "大量佈建（10台以上）", value: "大量" },
  ],
  其他: [
    { label: "小型", value: "小型" },
    { label: "中型", value: "中型" },
    { label: "大型", value: "大型" },
  ],
};

const productOptions: Record<string, { label: string; value: string }[]> = {
  餐飲業: [
    { label: "便當/定食", value: "便當定食" },
    { label: "飲品/咖啡", value: "飲品咖啡" },
    { label: "麵包/烘焙", value: "麵包烘焙" },
    { label: "複合式餐飲", value: "複合式" },
  ],
  零售業: [
    { label: "食品/生鮮", value: "食品生鮮" },
    { label: "日用品", value: "日用品" },
    { label: "複合式零售", value: "複合式" },
  ],
  飯店旅宿: [
    { label: "客房餐飲", value: "客房餐飲" },
    { label: "自助吧/Buffet", value: "自助吧" },
    { label: "外帶/外送", value: "外帶外送" },
  ],
  企業團膳: [
    { label: "員工餐廳", value: "員工餐廳" },
    { label: "便當/餐盒", value: "便當餐盒" },
    { label: "下午茶/點心", value: "下午茶" },
  ],
  智能販賣: [
    { label: "食品飲料", value: "食品飲料" },
    { label: "生活用品", value: "生活用品" },
    { label: "鮮食/冷藏品", value: "鮮食冷藏" },
  ],
  其他: [
    { label: "食品相關", value: "食品" },
    { label: "非食品", value: "非食品" },
    { label: "混合型", value: "混合" },
  ],
};

const painOptions = [
  { label: "取餐效率太低", value: "取餐效率" },
  { label: "人力不足/成本高", value: "人力成本" },
  { label: "需要 POS/KDS 系統", value: "系統需求" },
  { label: "想導入智慧設備", value: "智慧設備" },
  { label: "會員經營/行銷整合", value: "會員行銷" },
  { label: "想做品牌貼牌(OEM/ODM)", value: "品牌貼牌" },
];

function getRecommendation(data: UserData): {
  title: string;
  solutions: string[];
  message: string;
} {
  const solutions: string[] = [];
  let title = "";

  if (
    data.pain === "取餐效率" ||
    data.pain === "人力成本" ||
    data.pain === "智慧設備"
  ) {
    if (data.scale === "小型" || data.scale === "單店" || data.scale === "單點") {
      solutions.push("GraBox AI智取櫃 — 單機版");
      title = "GraBox 單機版最適合您！";
    } else {
      solutions.push("GraBox AI智取櫃 — 聯網版");
      title = "GraBox 聯網版是您的最佳選擇！";
    }
  }

  if (data.pain === "系統需求") {
    solutions.push("餐飲與零售系統串接（POS / KDS）");
    solutions.push("雲端營運平台 + AI分析模組");
    title = "系統串接 + 雲端平台方案";
  }

  if (data.pain === "會員行銷") {
    solutions.push("企業會員系統整合（ERP）");
    solutions.push("雲端營運平台 + AI分析模組");
    title = "會員經營整合方案";
  }

  if (data.pain === "品牌貼牌") {
    solutions.push("OEM / ODM 貼牌客製（100% 台灣製造）");
    title = "OEM/ODM 品牌客製方案";
  }

  if (solutions.length === 0) {
    solutions.push("GraBox AI智取櫃");
    solutions.push("雲端營運平台 + AI分析模組");
    title = "為您量身打造的整合方案";
  }

  const message = `根據您的需求（${data.industry}・${data.scale}・${data.product}），我們推薦以下方案。所有設備皆為台灣製造，品質有保障！`;

  return { title, solutions, message };
}

export default function AiConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<Step>("welcome");
  const [userData, setUserData] = useState<UserData>({
    industry: "",
    scale: "",
    product: "",
    pain: "",
    name: "",
    company: "",
    phone: "",
    email: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSelect = (field: keyof UserData, value: string, nextStep: Step) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
    setStep(nextStep);
  };

  const handleContactSubmit = async () => {
    if (!userData.name || !userData.phone) return;
    setSubmitting(true);

    try {
      await fetch("https://formspree.io/f/mqeyadkg", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          _subject: `[AI顧問] ${userData.industry} - ${userData.company || "未填公司"}`,
          company: userData.company,
          name: userData.name,
          phone: userData.phone,
          email: userData.email,
          industry: userData.industry,
          scale: userData.scale,
          product: userData.product,
          pain: userData.pain,
          source: "AI智慧顧問",
        }),
      });
      setStep("done");
    } catch {
      setStep("done");
    } finally {
      setSubmitting(false);
    }
  };

  const reset = () => {
    setStep("welcome");
    setUserData({
      industry: "",
      scale: "",
      product: "",
      pain: "",
      name: "",
      company: "",
      phone: "",
      email: "",
    });
  };

  const recommendation = step === "recommend" || step === "contact" || step === "done"
    ? getRecommendation(userData)
    : null;

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 bg-mcs-orange text-white w-16 h-16 rounded-full shadow-lg hover:bg-mcs-orange-light transition-all flex items-center justify-center animate-bounce"
          aria-label="AI 智慧顧問"
        >
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12c0 4.556-4.03 8.25-9 8.25a9.764 9.764 0 01-2.555-.337A5.972 5.972 0 015.41 20.97a5.969 5.969 0 01-.474-.065 4.48 4.48 0 00.978-2.025c.09-.457-.133-.901-.467-1.226C3.93 16.178 3 14.189 3 12c0-4.556 4.03-8.25 9-8.25s9 3.694 9 8.25z" />
          </svg>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-mcs-blue-dark to-mcs-blue px-5 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-mcs-orange rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
                </svg>
              </div>
              <div>
                <div className="text-white font-bold text-sm">MCS AI 智慧顧問</div>
                <div className="text-white/60 text-xs">線上為您服務</div>
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
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {/* Welcome */}
            {step === "welcome" && (
              <>
                <BotMessage text="您好！我是 MCS AI 智慧顧問 👋" />
                <BotMessage text="我可以根據您的需求，推薦最適合的智慧設備方案。台灣製造，品質保證！" />
                <div className="bg-mcs-blue-dark/5 border border-mcs-blue/10 rounded-xl px-4 py-3 text-xs text-gray-500 flex items-center gap-2">
                  <svg className="w-4 h-4 text-mcs-orange flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" />
                  </svg>
                  <span>按下 <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">Win</kbd> + <kbd className="bg-gray-200 px-1.5 py-0.5 rounded text-[10px] font-mono font-bold">H</kbd> 可啟動語音輸入，用說的更方便！</span>
                </div>
                <BotMessage text="請問您的產業類型是？" />
                <div className="grid grid-cols-2 gap-2 mt-2">
                  {industryOptions.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={`${opt.icon} ${opt.label}`}
                      onClick={() => handleSelect("industry", opt.value, "scale")}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Scale */}
            {step === "scale" && (
              <>
                <UserMessage text={userData.industry} />
                <BotMessage text={`了解！您是${userData.industry}。請問營業規模大約是？`} />
                <div className="space-y-2 mt-2">
                  {(scaleOptions[userData.industry] || scaleOptions["其他"]).map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      onClick={() => handleSelect("scale", opt.value, "product")}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Product */}
            {step === "product" && (
              <>
                <UserMessage text={userData.scale} />
                <BotMessage text="請問您主要經營的品項是？" />
                <div className="space-y-2 mt-2">
                  {(productOptions[userData.industry] || productOptions["其他"]).map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      onClick={() => handleSelect("product", opt.value, "pain")}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Pain Point */}
            {step === "pain" && (
              <>
                <UserMessage text={userData.product} />
                <BotMessage text="最後一個問題，您目前最想解決的問題是？" />
                <div className="space-y-2 mt-2">
                  {painOptions.map((opt) => (
                    <OptionButton
                      key={opt.value}
                      label={opt.label}
                      onClick={() => handleSelect("pain", opt.value, "recommend")}
                    />
                  ))}
                </div>
              </>
            )}

            {/* Recommendation */}
            {step === "recommend" && recommendation && (
              <>
                <UserMessage text={userData.pain} />
                <BotMessage text="分析完成！以下是為您量身推薦的方案：" />
                <div className="bg-gradient-to-br from-mcs-blue-dark to-mcs-blue rounded-xl p-4 text-white">
                  <div className="font-bold text-mcs-orange mb-2">
                    {recommendation.title}
                  </div>
                  <p className="text-sm text-gray-300 mb-3">
                    {recommendation.message}
                  </p>
                  <ul className="space-y-1.5">
                    {recommendation.solutions.map((s) => (
                      <li key={s} className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 bg-mcs-orange rounded-full flex-shrink-0" />
                        {s}
                      </li>
                    ))}
                  </ul>
                </div>
                <BotMessage text="想進一步了解嗎？留下聯絡方式，我們的專員會盡快與您聯繫！" />
                <OptionButton
                  label="留下聯絡資訊"
                  onClick={() => setStep("contact")}
                />
                <button
                  onClick={reset}
                  className="text-sm text-gray-400 hover:text-gray-600 mt-1"
                >
                  重新開始
                </button>
              </>
            )}

            {/* Contact Form */}
            {step === "contact" && (
              <>
                <BotMessage text="請填寫以下資訊，我們會盡快聯繫您：" />
                <div className="space-y-3 mt-2">
                  <input
                    type="text"
                    placeholder="姓名 *"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                  />
                  <input
                    type="text"
                    placeholder="公司名稱"
                    value={userData.company}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, company: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                  />
                  <input
                    type="tel"
                    placeholder="電話 *"
                    value={userData.phone}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, phone: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={userData.email}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-mcs-orange/50"
                  />
                  <button
                    onClick={handleContactSubmit}
                    disabled={submitting || !userData.name || !userData.phone}
                    className="w-full bg-mcs-orange text-white py-2.5 rounded-lg text-sm font-medium hover:bg-mcs-orange-light transition-colors disabled:opacity-50"
                  >
                    {submitting ? "送出中..." : "送出諮詢"}
                  </button>
                </div>
              </>
            )}

            {/* Done */}
            {step === "done" && (
              <>
                <BotMessage text="感謝您的諮詢！我們的專員會盡快與您聯繫。" />
                <BotMessage text="您也可以加入 MCS 會員，推薦朋友還能獲得積分獎勵喔！" />
                <div className="space-y-2 mt-2">
                  <a
                    href="#services"
                    onClick={() => setIsOpen(false)}
                    className="block text-center bg-mcs-blue text-white py-2 rounded-lg text-sm font-medium hover:bg-mcs-blue-dark transition-colors"
                  >
                    瀏覽更多方案
                  </a>
                  <button
                    onClick={reset}
                    className="w-full text-sm text-gray-400 hover:text-gray-600"
                  >
                    重新諮詢
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-gray-100 text-center">
            <span className="text-xs text-gray-400">
              MCS AI 智慧顧問 — 台灣製造，品質保證
            </span>
          </div>
        </div>
      )}
    </>
  );
}

function BotMessage({ text }: { text: string }) {
  return (
    <div className="flex gap-2">
      <div className="w-7 h-7 bg-mcs-orange/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
        <svg className="w-4 h-4 text-mcs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z" />
        </svg>
      </div>
      <div className="bg-gray-100 rounded-xl rounded-tl-sm px-4 py-2.5 text-sm text-gray-700 max-w-[280px]">
        {text}
      </div>
    </div>
  );
}

function UserMessage({ text }: { text: string }) {
  return (
    <div className="flex justify-end">
      <div className="bg-mcs-orange text-white rounded-xl rounded-tr-sm px-4 py-2.5 text-sm max-w-[280px]">
        {text}
      </div>
    </div>
  );
}

function OptionButton({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="w-full text-left px-4 py-2.5 bg-white border border-gray-200 rounded-xl text-sm text-gray-700 hover:border-mcs-orange hover:bg-mcs-orange/5 transition-colors"
    >
      {label}
    </button>
  );
}
