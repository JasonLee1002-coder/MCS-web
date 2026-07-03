import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: '銓幻元智慧餐飲知識庫 | 場域規劃 × AI 設備選型',
  description: '深入了解冷凍微波機、智慧取物櫃、蒸氣加熱設備的場域應用，提供工廠、醫院、校園、軍方等場域的實戰選型指南。',
}

const ARTICLES = [
  {
    slug: 'smart-locker-factory-migrant',
    title: '工廠移工宿舍智慧取物冰箱：薪資扣款模式完整說明',
    excerpt: '移工無台灣行動支付帳號？用工作證感應消費，月底薪資自動扣款。完整流程說明、勞基法合規做法、HR 操作後台，附台中 520 人宿舍真實數據。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '移工宿舍', '薪資扣款'],
    readMin: 7,
  },
  {
    slug: 'smart-locker-cost-calculator',
    title: '智慧取物櫃費用試算：月租 vs 買斷，你的場域哪個划算？',
    excerpt: '4 種場域詳細試算：小型餐廳 NT$3,200/月起正回報、早午餐連鎖 ROI 554%、辦公大樓每人 NT$8.2/月。附損益平衡點計算，簽約前先看這篇。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '費用試算', '投資分析'],
    readMin: 7,
  },
  {
    slug: 'smart-locker-api-integration',
    title: '智慧取物櫃 API 整合指南：POS、外送平台、自建系統串接說明',
    excerpt: '不串 API 就只是「附鎖的保溫箱」。iCHEF/Winfood/橘子 1–2 天完成、Uber Eats/foodpanda 3–5 天、自建系統附 REST API 文件。技術摘要一次看懂。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', 'API整合', '技術文件'],
    readMin: 8,
  },
  {
    slug: 'smart-locker-campus',
    title: '校園智慧取物櫃：大學、科大學生餐食自動化完整指南',
    excerpt: '午餐排隊 22 分鐘 → 4 分鐘（預訂取餐）。中部科大 8,000 人案例，附格數配置建議、政府採購法 SOP、學生費用補貼設計。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '校園', '學校餐飲'],
    readMin: 6,
  },
  {
    slug: 'smart-locker-hospital-system',
    title: '醫院智慧取物系統：護理師、員工餐、訪客輕食一套搞定',
    excerpt: '醫院 4 種需求群體，3 個配置區塊完整說明。護理師夜班滿意度 31% → 88%，員工午餐等待 22 分鐘 → 6 分鐘，門診大廳月增收入 NT$28,000。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '醫院', '醫療場域'],
    readMin: 7,
  },
  {
    slug: 'smart-locker-brunch-chain',
    title: '連鎖早午餐導入智慧取物櫃：週末人潮如何不塞爆？',
    excerpt: '外帶等待 38 分鐘 → 14 分鐘、出錯率 8.4% → 1.1%、翻桌率提升 35%。台中連鎖 5 家門市真實案例，附週末人流分散邏輯與 POS 整合說明。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '早午餐', '連鎖餐飲'],
    readMin: 6,
  },
  {
    slug: 'smart-locker-vs-regular-fridge',
    title: '智慧取物冰箱 vs 一般冰箱：餐廳外帶哪個更適合？',
    excerpt: '10 個維度完整比較：訂單整合、取餐驗證、保溫功能、盜取防護。台南日式便當店換裝案例：取錯餐 0 次、熱食投訴 0 次、Google 評分 3.8→4.5。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '餐廳外帶', '選型比較'],
    readMin: 7,
  },
  {
    slug: 'frozen-vending-school-campus',
    title: '冷凍便當販賣機進駐學校：大學、高中場域評估完整指南',
    excerpt: '學校放冷凍販賣機需要哪些許可？大學 vs 高中法規差異、食材限制、採購 SOP。5,000 人大學宿舍月均利潤 NT$208,300 試算數據。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '校園', '學校餐飲'],
    readMin: 8,
  },
  {
    slug: 'frozen-vending-elderly-care',
    title: '長照機構冷凍販賣機：24 小時銀髮族餐食供應完整指南',
    excerpt: '長照場域 2 種應用模式：照護員夜班餐食（主）+ 家屬訪客輕食站（副）。食材選品清單、靜音設計要求、50 人護理之家月均利潤 NT$45,250 試算。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '長照機構', '銀髮族'],
    readMin: 7,
  },
  {
    slug: 'frozen-vending-electricity-maintenance',
    title: '冷凍販賣機耗電量與維護成本：採購前必看的真實數字',
    excerpt: '月電費 NT$928–1,261（實測數據）、年均故障 0.6 次（行業均值 1.2 次）、5 年總成本買斷比租賃省 NT$180,000。公開 80+ 場域 3 年維護統計。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '維護成本', '選型指南'],
    readMin: 7,
  },
  {
    slug: 'frozen-vending-vendor-selection',
    title: '冷凍販賣機廠商怎麼選？採購主管必看的 6 大評估指標（2026）',
    excerpt: '售後響應速度、溫控認證、IoT 監控、食材供應鏈、商業模式彈性、客戶可查證——6 個指標逐一說明，附詢問廠商的 10 個標準問題清單。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '廠商選型', '採購指南'],
    readMin: 8,
  },
  {
    slug: 'frozen-vending-factory-night-solution',
    title: '工廠夜班餐食問題怎麼解？冷凍販賣機完整方案指南',
    excerpt: '30 萬製造業夜班人員的餐食困境。4 大痛點分析、夜班場域規劃表（50–300 人）、桃園工廠日均 80 次 月均利潤 NT$170,200 詳細試算。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '工廠夜班', '封閉場域'],
    readMin: 7,
  },
  {
    slug: 'frozen-vending-vs-regular-vending',
    title: '冷凍販賣機 vs 一般販賣機：哪個適合你的場域？完整比較指南',
    excerpt: '冷凍機 vs 常溫機，5 個關鍵判斷指標＋場域決策樹。工廠、宿舍、醫院選冷凍機；辦公室、學校選一般機。附混合配置真實 ROI 數據。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '選型指南', '場域規劃'],
    readMin: 8,
  },
  {
    slug: 'smart-locker-office-building',
    title: '辦公大樓智慧取物櫃：員工福利新選擇與完整成本分析',
    excerpt: '前台每天 65 分鐘在接外送，降至 8 分鐘。信義區科技公司 220 人真實案例，員工午餐滿意度 72% 升至 89%。含格數選型、月費試算、ROI 分析。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '辦公室', '員工福利'],
    readMin: 7,
  },
  {
    slug: 'frozen-vending-lease-vs-purchase',
    title: '冷凍販賣機租賃 vs 買斷：哪個划算？2026 完整費用試算',
    excerpt: '損益平衡點在第 30.4 個月（約 2.5 年）。租賃 vs 買斷的 3 年總費用完整試算表，5 個決策情境指南，以及租轉買、分潤模式等彈性方案說明。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '租賃', '投資分析'],
    readMin: 8,
  },
  {
    slug: 'frozen-vending-migrant-worker-dormitory',
    title: '移工宿舍放冷凍販賣機：3 個月實際案例與完整成本回收分析',
    excerpt: '台灣 76 萬移工的宿舍夜間餐食困境。公開 3 間工廠移工宿舍的真實數據：越南/印尼籍移工使用率、食材策略、月均利潤 NT$24,000 的完整案例。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '移工宿舍', '封閉場域'],
    readMin: 7,
  },
  {
    slug: 'smart-locker-restaurant-takeout',
    title: '餐廳導入智慧取物櫃：外帶免排隊的完整解決方案與投資報酬分析',
    excerpt: '外帶等待從 8.4 分鐘降至 1.1 分鐘，外帶比例從 55% 提升至 63%。台北日式定食連鎖真實案例，附選型重點、POS 整合說明與月租費對比。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '餐廳外帶', '無人取餐'],
    readMin: 6,
  },
  {
    slug: 'frozen-vending-military-closed-venue',
    title: '軍方封閉場域的冷凍食品補給：無人值守完整方案與採購流程說明',
    excerpt: '軍營、後勤基地、兵器廠的夜間餐食解方。離線 72 小時運作、軍方 IC 卡存取、國家採購法合規、3mm 強固外殼，完整規格說明與採購 5 步驟。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '軍方場域', '封閉場域'],
    readMin: 6,
  },
  {
    slug: 'frozen-vending-machine-factory-guide',
    title: '冷凍販賣機怎麼選？工廠採購主管必看的 5 個關鍵指標（2026）',
    excerpt: '日均使用人次估算、溫控標準、補貨頻率、維護成本、真實投資回收期 5 大指標全解析。附廠商評比重點與 80 間工廠客戶實際數據。',
    date: '2026-07-03',
    tags: ['冷凍販賣機', '工廠採購', '場域規劃'],
    readMin: 8,
  },
  {
    slug: 'smart-locker-complete-guide',
    title: '智慧取物櫃是什麼？5 分鐘看懂運作原理與 6 大商業應用',
    excerpt: '從餐廳外帶、辦公室訂餐、醫院輕食到工廠員工餐，智慧取物櫃讓取餐等待從 8 分鐘降至 1 分鐘。本文詳解 6 大場域、4 個採購陷阱、真實 ROI 數據。',
    date: '2026-07-03',
    tags: ['智慧取物櫃', '無人取餐', '場域自動化'],
    readMin: 7,
  },
  {
    slug: 'frozen-microwave-factory-night-shift',
    title: '台灣工廠夜班缺食危機：冷凍微波機如何解決 3 萬人的深夜餐食',
    excerpt: '台灣製造業夜班人數超過 30 萬，廚房 22:00 關閉後無法提供熱食。冷凍微波機 24 小時自助加熱，讓夜班員工隨時吃到熱食，設備投資 3 個月回收。',
    date: '2026-07-03',
    tags: ['冷凍微波機', '工廠', '夜班', '員工餐飲'],
    readMin: 5,
  },
  {
    slug: 'ghost-kitchen-smart-locker-guide',
    title: '幽靈廚房設備選購完整指南：為什麼 AI 智取物流櫃是必備配備',
    excerpt: '幽靈廚房（Ghost Kitchen）如何在多個場域同時派送餐食？核心關鍵在於「最後一哩路」的智慧取物櫃系統。本文詳解選型重點與場域佈建策略。',
    date: '2026-07-03',
    tags: ['幽靈廚房', '智慧取物櫃', 'AI 勞動力'],
    readMin: 6,
  },
  {
    slug: 'steam-ramen-hospital-24hr',
    title: '醫院夜班護理師的救星：蒸氣拉麵機在醫療場域的 3 個成功案例',
    excerpt: '台灣醫院護理師夜班超過 12 小時，醫院自助餐 21:00 後關閉。蒸氣拉麵機提供 24 小時熱食，不僅解決護理師需求，也能對外販售創造額外收入。',
    date: '2026-07-03',
    tags: ['蒸氣拉麵機', '醫院', '醫療場域'],
    readMin: 5,
  },
]

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <section className="max-w-4xl mx-auto px-6 py-20">
        <h1 className="text-3xl font-bold mb-3" style={{ color: '#FF6B35' }}>
          智慧餐飲知識庫
        </h1>
        <p className="text-slate-400 mb-12">場域規劃 × AI 設備選型 × 投資回收分析</p>

        <div className="space-y-6">
          {ARTICLES.map(article => (
            <Link
              key={article.slug}
              href={`/blog/${article.slug}`}
              className="block group"
            >
              <article className="rounded-xl p-6 border transition-all duration-200"
                style={{
                  background: '#0f1f36',
                  borderColor: 'rgba(255,107,53,0.12)',
                }}
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {article.tags.map(tag => (
                    <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
                      style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-lg font-bold text-slate-100 mb-2 group-hover:text-[#FF6B35] transition-colors">
                  {article.title}
                </h2>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{article.excerpt}</p>
                <div className="flex items-center gap-4 text-xs text-slate-500">
                  <span>{article.date}</span>
                  <span>· {article.readMin} 分鐘閱讀</span>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </main>
  )
}
