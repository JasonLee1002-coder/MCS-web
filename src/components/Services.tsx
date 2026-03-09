import Image from "next/image";

const services = [
  {
    title: "GraBox 智取櫃",
    subtitle: "AI 訂餐 | 接線服務員",
    description:
      "結合 AI 技術的智慧取餐櫃，多種規格可選，適用於企業、餐廳、飯店等多元場景，實現無人化智慧取餐體驗。",
    image: "/images/illustrations/grabox.png",
    tags: ["三溫層", "人臉辨識", "AI 訂餐"],
  },
  {
    title: "智慧販賣機 · 自助服務機 · 冷凍微波機",
    subtitle: "智慧自助服務解決方案",
    description:
      "智能販賣機、自助點餐機、自助結帳機、冷凍微波販賣機等全系列設備，結合 AI 系統整合。冷凍微波機已外銷日本首都高速公路服務區。",
    image: "/images/illustrations/vending.png",
    tags: ["智能販賣機", "冷凍微波機", "自助服務機", "外銷日本"],
  },
  {
    title: "OEM / ODM 貼牌客製",
    subtitle: "可 100% 台灣製造",
    description:
      "提供完整的硬體客製化服務，從外觀設計到軟體介面，全程台灣製造，品質有保障。支援企業品牌貼牌需求。",
    image: "/images/illustrations/factory.png",
    tags: ["品牌客製", "台灣製造", "硬體設計"],
  },
  {
    title: "企業會員系統整合",
    subtitle: "ERP | 商務流程與資料平台",
    description:
      "整合企業會員管理、ERP 系統、商務流程自動化與資料分析平台，協助企業建立完整的數位化會員經營體系。",
    image: "/images/illustrations/partner.png",
    tags: ["會員管理", "ERP", "流程自動化"],
  },
  {
    title: "餐飲與零售系統串接",
    subtitle: "POS | KDS",
    description:
      "提供 POS 點餐系統、KDS 廚房顯示系統的完整串接，讓餐飲與零售業者輕鬆實現數位轉型。",
    image: "/images/illustrations/pos-kds.png",
    tags: ["POS", "KDS", "餐飲零售"],
  },
  {
    title: "雲端營運平台 + AI分析模組",
    subtitle: "數據驅動的營運管理",
    description:
      "提供雲端營運管理平台搭配 AI 分析模組，即時掌握營運數據、銷售趨勢與客戶行為，助力企業精準決策。",
    image: "/images/illustrations/hero.png",
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
              className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow border border-gray-100 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="p-6">
                <h3 className="text-lg font-bold text-mcs-blue-dark mb-1">
                  {service.title}
                </h3>
                <p className="text-sm text-mcs-orange font-medium mb-3">
                  {service.subtitle}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
