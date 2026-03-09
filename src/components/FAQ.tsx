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

export default function FAQ() {
  return (
    <section id="faq" className="py-24 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-mcs-blue-dark mb-4">
          常見問題
        </h2>
        <p className="text-center text-gray-600 mb-12">
          關於銓幻元科技產品與服務的常見疑問
        </p>
        <div className="space-y-4">
          {faqItems.map((item, i) => (
            <details
              key={i}
              className="bg-mcs-gray rounded-xl border border-gray-100 group"
            >
              <summary className="flex items-center justify-between p-6 cursor-pointer font-medium text-gray-900 hover:text-mcs-orange transition-colors">
                {item.q}
                <svg
                  className="w-5 h-5 text-gray-400 group-open:rotate-180 transition-transform flex-shrink-0 ml-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed border-t border-gray-50 pt-4">
                {item.a}
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
