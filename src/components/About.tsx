import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left - Text */}
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-mcs-blue-dark mb-6">
              關於 MCS
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed mb-6">
              <strong className="text-mcs-blue-dark">
                Meta Clearing Station Pte. Ltd.
              </strong>{" "}
              專注於 AI 智慧設備與商業系統的深度整合，為企業提供從硬體到軟體的完整數位化解決方案。
            </p>
            <p className="text-lg text-gray-600 leading-relaxed mb-8">
              我們相信，透過智慧科技與商業流程的結合，能為餐飲、零售、企業等多元產業帶來更高效率的營運體驗。
              從 GraBox 智取櫃到雲端 POS 系統，MCS 是您數位轉型的最佳夥伴。
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="border-l-4 border-mcs-orange pl-4">
                <div className="text-2xl font-bold text-mcs-blue-dark">台灣研發</div>
                <div className="text-sm text-gray-500">軟硬體設計製造</div>
              </div>
              <div className="border-l-4 border-mcs-orange pl-4">
                <div className="text-2xl font-bold text-mcs-blue-dark">AI 驅動</div>
                <div className="text-sm text-gray-500">智慧化營運方案</div>
              </div>
              <div className="border-l-4 border-mcs-orange pl-4">
                <div className="text-2xl font-bold text-mcs-blue-dark">一站整合</div>
                <div className="text-sm text-gray-500">從設備到系統</div>
              </div>
              <div className="border-l-4 border-mcs-orange pl-4">
                <div className="text-2xl font-bold text-mcs-blue-dark">客製化</div>
                <div className="text-sm text-gray-500">OEM/ODM 貼牌服務</div>
              </div>
            </div>
          </div>

          {/* Right - Visual */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-lg">
              <Image
                src="/images/illustrations/factory.png"
                alt="MCS 銓幻元科技台灣在地工廠 100% 台灣製造品質檢測"
                width={600}
                height={400}
                className="w-full h-auto"
              />
            </div>

            {/* Decorative */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-mcs-orange/10 rounded-full -z-10" />
            <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-mcs-blue/10 rounded-full -z-10" />
          </div>
        </div>
      </div>
    </section>
  );
}
