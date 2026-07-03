export default function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-mcs-blue-dark via-mcs-blue to-mcs-blue-dark"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, #E8751A 1px, transparent 1px), radial-gradient(circle at 75% 75%, #E8751A 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Glowing accent lines */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-mcs-orange to-transparent" />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
          <span className="text-mcs-orange">AI 智慧設備</span>
          <span className="mx-3 text-white/60">x</span>
          <span className="text-white">商業系統整合</span>
        </h1>

        <p className="text-lg sm:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed">
          Meta Clearing Station 為企業提供從智取櫃硬體到 POS/KDS
          雲端系統的一站式整合方案，打造高效率的數位營運體驗。
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#services"
            className="bg-mcs-orange text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-mcs-orange-light transition-colors shadow-lg shadow-mcs-orange/25"
          >
            瞭解方案
          </a>
          <a
            href="#contact"
            className="border border-white/30 text-white px-8 py-3.5 rounded-full text-lg font-medium hover:bg-white/10 transition-colors"
          >
            聯絡我們
          </a>
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-3 gap-8 max-w-lg mx-auto">
          <div>
            <div className="text-3xl font-bold text-mcs-orange">100%</div>
            <div className="text-sm text-gray-400 mt-1">台灣製造</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-mcs-orange">6</div>
            <div className="text-sm text-gray-400 mt-1">核心方案</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-mcs-orange">AI</div>
            <div className="text-sm text-gray-400 mt-1">智慧驅動</div>
          </div>
        </div>
      </div>
    </section>
  );
}
