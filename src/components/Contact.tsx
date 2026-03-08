export default function Contact() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-mcs-blue-dark to-mcs-blue"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Left - Info */}
          <div className="text-white">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">聯絡我們</h2>
            <p className="text-gray-300 text-lg mb-10 leading-relaxed">
              無論您是需要智取櫃方案、系統整合、還是 OEM/ODM 合作，歡迎與我們聯繫，
              我們將為您提供最適合的解決方案。
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-mcs-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-mcs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">Email</div>
                  <div className="text-gray-300">service@transtep.com</div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-mcs-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-mcs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">地址</div>
                  <div className="text-gray-300">
                    103 台北市大同區長安西路78巷4弄10號1樓
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-mcs-orange/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                  <svg className="w-5 h-5 text-mcs-orange" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 10.5a8.966 8.966 0 01-1.157 4.382" />
                  </svg>
                </div>
                <div>
                  <div className="font-medium">網站</div>
                  <div className="text-gray-300">www.MCStation.ai</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-white rounded-2xl p-8 shadow-xl">
            <h3 className="text-xl font-bold text-mcs-blue-dark mb-6">
              填寫諮詢表單
            </h3>
            <form action="https://formspree.io/f/mqeyadkg" method="POST" className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  公司名稱
                </label>
                <input
                  type="text"
                  name="company"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mcs-orange/50 focus:border-mcs-orange"
                  placeholder="請輸入公司名稱"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  聯絡人
                </label>
                <input
                  type="text"
                  name="name"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mcs-orange/50 focus:border-mcs-orange"
                  placeholder="請輸入姓名"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mcs-orange/50 focus:border-mcs-orange"
                  placeholder="請輸入 Email"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  感興趣的方案
                </label>
                <select name="service" className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mcs-orange/50 focus:border-mcs-orange text-gray-600">
                  <option value="">請選擇</option>
                  <option value="grabox">GraBox 智取櫃</option>
                  <option value="oem">OEM / ODM 貼牌客製</option>
                  <option value="member">企業會員系統整合</option>
                  <option value="pos">餐飲與零售系統串接</option>
                  <option value="other">其他</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  需求說明
                </label>
                <textarea
                  rows={4}
                  name="message"
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-mcs-orange/50 focus:border-mcs-orange resize-none"
                  placeholder="請簡述您的需求..."
                />
              </div>
              <button
                type="submit"
                className="w-full bg-mcs-orange text-white py-3 rounded-lg font-medium hover:bg-mcs-orange-light transition-colors"
              >
                送出諮詢
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
