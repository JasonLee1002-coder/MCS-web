import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-mcs-blue-dark to-mcs-blue flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-mcs-orange mb-4">404</div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white mb-4">
          找不到這個頁面
        </h1>
        <p className="text-gray-300 mb-8 max-w-md mx-auto">
          您要找的頁面可能已移動或不存在。歡迎回到首頁了解銓幻元科技的 AI 智慧設備整合方案。
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="bg-mcs-orange text-white px-8 py-3 rounded-full font-medium hover:bg-mcs-orange-light transition-colors"
          >
            回首頁
          </Link>
          <Link
            href="/cases"
            className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            看客戶實績
          </Link>
          <Link
            href="/products/grabox"
            className="border border-white/30 text-white px-8 py-3 rounded-full font-medium hover:bg-white/10 transition-colors"
          >
            GraBox 智取櫃
          </Link>
        </div>
      </div>
    </div>
  );
}
