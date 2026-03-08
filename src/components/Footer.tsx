export default function Footer() {
  return (
    <footer className="bg-mcs-blue-dark text-gray-400 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <div className="text-white font-bold text-lg mb-2">MCS 銓幻元科技</div>
            <div className="text-sm leading-relaxed">
              <p>Meta Clearing Station Pte. Ltd.</p>
              <p className="mt-2">台北市大同區長安西路78巷4弄10號1樓</p>
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
            <ul className="text-sm space-y-1">
              <li>
                <a href="#hero" className="hover:text-white transition-colors">
                  首頁
                </a>
              </li>
              <li>
                <a href="#products" className="hover:text-white transition-colors">
                  產品介紹
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-white transition-colors">
                  功能特色
                </a>
              </li>
              <li>
                <a href="#solutions" className="hover:text-white transition-colors">
                  解決方案
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">
                  聯絡我們
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <div className="text-white font-semibold mb-2">產品與服務</div>
            <ul className="text-sm space-y-1">
              <li>GraBox AI智取櫃</li>
              <li>AI訂餐系統</li>
              <li>OEM/ODM 貼牌客製</li>
              <li>POS/KDS 系統串接</li>
              <li>雲端營運管理平台</li>
            </ul>
          </div>
        </div>

        {/* Divider + Copyright */}
        <div className="border-t border-gray-700 pt-6 text-sm text-center">
          &copy; {new Date().getFullYear()} Meta Clearing Station Pte. Ltd. All
          rights reserved.
        </div>
      </div>
    </footer>
  );
}
