const services = [
  {
    title: "GraBox 智取櫃",
    subtitle: "AI 訂餐 | 接線服務員",
    description:
      "結合 AI 技術的智慧取餐櫃，提供單機版與聯網版，適用於企業、餐廳、飯店等多元場景，實現無人化智慧取餐體驗。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    tags: ["單機版", "聯網版", "AI 訂餐"],
  },
  {
    title: "各類自助服務設備 x AI系統整合",
    subtitle: "智慧自助服務解決方案",
    description:
      "整合各類自助服務設備與 AI 系統，包含自助點餐機、自助結帳機、資訊查詢機等，為企業打造智慧化的自助服務體驗。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 3.104v5.714a2.25 2.25 0 01-.659 1.591L5 14.5M9.75 3.104c-.251.023-.501.05-.75.082m.75-.082a24.301 24.301 0 014.5 0m0 0v5.714a2.25 2.25 0 00.659 1.591L19 14.5M14.25 3.104c.251.023.501.05.75.082M19 14.5l-1.341 4.023a2.25 2.25 0 01-2.134 1.527H8.475a2.25 2.25 0 01-2.134-1.527L5 14.5m14 0H5" />
      </svg>
    ),
    tags: ["自助設備", "AI 整合", "智慧服務"],
  },
  {
    title: "OEM / ODM 貼牌客製",
    subtitle: "可 100% 台灣製造",
    description:
      "提供完整的硬體客製化服務，從外觀設計到軟體介面，全程台灣製造，品質有保障。支援企業品牌貼牌需求。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17l-5.384-3.108A1.5 1.5 0 015.25 10.77V6.727a1.5 1.5 0 01.786-1.321l5.384-3.108a1.5 1.5 0 011.56 0l5.384 3.108A1.5 1.5 0 0119.05 6.727v4.044a1.5 1.5 0 01-.786 1.321l-5.384 3.108a1.5 1.5 0 01-1.56 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 12l5.384-3.108M12 12v6.216M12 12L6.616 8.892" />
      </svg>
    ),
    tags: ["品牌客製", "台灣製造", "硬體設計"],
  },
  {
    title: "企業會員系統整合",
    subtitle: "ERP | 商務流程與資料平台",
    description:
      "整合企業會員管理、ERP 系統、商務流程自動化與資料分析平台，協助企業建立完整的數位化會員經營體系。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    tags: ["會員管理", "ERP", "流程自動化"],
  },
  {
    title: "餐飲與零售系統串接",
    subtitle: "POS | KDS",
    description:
      "提供 POS 點餐系統、KDS 廚房顯示系統的完整串接，讓餐飲與零售業者輕鬆實現數位轉型。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
      </svg>
    ),
    tags: ["POS", "KDS", "餐飲零售"],
  },
  {
    title: "雲端營運平台 + AI分析模組",
    subtitle: "數據驅動的營運管理",
    description:
      "提供雲端營運管理平台搭配 AI 分析模組，即時掌握營運數據、銷售趨勢與客戶行為，助力企業精準決策。",
    icon: (
      <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15a4.5 4.5 0 004.5 4.5H18a3.75 3.75 0 001.332-7.257 3 3 0 00-3.758-3.848 5.25 5.25 0 00-10.233 2.33A4.502 4.502 0 002.25 15z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75l2.25 2.25L15 11.25" />
      </svg>
    ),
    tags: ["雲端平台", "AI 分析", "營運管理"],
  },
];

export default function Services() {
  return (
    <section id="services" className="py-24 bg-mcs-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-4">
            智慧設備整合方案
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            從硬體設備到軟體系統，MCS 提供完整的一站式整合服務
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <div className="w-16 h-16 bg-mcs-orange/10 rounded-xl flex items-center justify-center text-mcs-orange mb-6 group-hover:bg-mcs-orange group-hover:text-white transition-colors">
                {service.icon}
              </div>

              <h3 className="text-xl font-bold text-mcs-blue-dark mb-1">
                {service.title}
              </h3>
              <p className="text-sm text-mcs-orange font-medium mb-3">
                {service.subtitle}
              </p>
              <p className="text-gray-600 leading-relaxed mb-4">
                {service.description}
              </p>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs bg-mcs-blue/5 text-mcs-blue px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
