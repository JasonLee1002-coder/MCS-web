import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-mcs-blue-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-white font-bold text-lg mb-2">MCS 銓幻元科技</div>
            <div className="text-sm leading-relaxed">
              <p>銓幻元科技股份有限公司</p>
              <p className="text-gray-500 text-xs mt-0.5">Meta Clearing Station Pte. Ltd. 台灣分公司</p>
              <p className="mt-2">103 台北市大同區長安西路78巷4弄10號1樓</p>
              <p className="mt-1">
                <a
                  href="mailto:service@transtep.com"
                  className="hover:text-white transition-colors"
                >
                  service@transtep.com
                </a>
              </p>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="text-white font-semibold mb-2">快速導覽</div>
            <ul className="text-sm space-y-1.5">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">首頁</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">服務方案</a>
              </li>
              <li>
                <Link href="/cases" className="hover:text-white transition-colors">客戶實績</Link>
              </li>
              <li>
                <Link href="/products/grabox" className="hover:text-white transition-colors">GraBox AI 智取櫃</Link>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">關於我們</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">常見問題</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">聯絡我們</a>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <div className="text-white font-semibold mb-2">產品與服務</div>
            <ul className="text-sm space-y-1.5">
              <li>
                <Link href="/products/grabox" className="hover:text-white transition-colors">GraBox AI 智取櫃</Link>
              </li>
              <li>智慧販賣機</li>
              <li>冷凍微波販賣機</li>
              <li>自助服務機 Kiosk</li>
              <li>OEM/ODM 貼牌客製</li>
              <li>POS/KDS 系統串接</li>
              <li>雲端營運管理平台</li>
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-700 pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()} 銓幻元科技股份有限公司 Meta Clearing
          Station Pte. Ltd. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
