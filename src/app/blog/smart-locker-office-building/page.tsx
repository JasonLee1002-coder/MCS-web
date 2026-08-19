import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '辦公大樓智慧取物櫃：員工福利新選擇與成本分析 | 銓幻元',
  description: '辦公大樓導入智慧取物櫃，午餐訂餐不用下樓等、外送到公司不用衝去接，讓員工滿意度提升的同時降低管理負擔。含租賃費、ROI 試算與真實案例。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '辦公室', '員工福利'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          辦公大樓<KeywordTrigger keyword="智慧取物櫃" />：員工福利新選擇與完整成本分析
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">

          <p>
            台北市辦公大樓的午餐問題從未真正被解決過。外送員衝進大廳、前台廣播找人下樓、
            餐點在騎樓放到冷——這些場景每天重演，耗費行政人力、困擾員工、讓大樓管委會頭疼。
            <KeywordTrigger keyword="智慧取物櫃" />提供了一個優雅的解法：外送員進大廳直接放入格口，
            員工下班前手機取餐，全程不需要人工介入。
          </p>
          <p>
            銓幻元已服務多個辦公大樓場域，部署<KeywordTrigger keyword="智慧取物櫃" />，
            本文整理最常見的辦公場域需求、費用結構與 ROI 試算方式。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">辦公大樓的 4 個午餐痛點</h2>
          <div className="space-y-4">
            {[
              {
                num: '01',
                title: '前台被外送員佔用',
                content: '尖峰時段 12:00–12:30，外送員一波接一波進門，前台需要確認每一位、找到對應員工、等員工下來。3 層樓 200 人的辦公室，前台每天光處理外送就要花 45 分鐘。',
              },
              {
                num: '02',
                title: '員工不在位的漏失問題',
                content: '外送員打電話找不到人，把餐留在前台就走了。餐放到冷、員工找不到、外送評分被扣——所有人都不滿意。',
              },
              {
                num: '03',
                title: '大樓管理員的抱怨',
                content: '大樓安全管理要求外訪人員登記，但外送員每天數十人根本登記不完。管委會要求收緊門禁，辦公室租戶員工的外送又受影響，兩難。',
              },
              {
                num: '04',
                title: '集體訂餐的協調成本',
                content: '10 個人一起訂，要有人負責統計、催繳款、等送達、分餐。這個行政成本每週加起來 2–3 小時，全都是無生產力的勞動。',
              },
            ].map(({ num, title, content }) => (
              <div key={num} className="flex gap-4 p-4 rounded-xl" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <div className="text-2xl font-black shrink-0" style={{ color: '#FF6B35' }}>{num}</div>
                <div>
                  <p className="font-bold text-slate-200 mb-1">{title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{content}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">
            <KeywordTrigger keyword="智慧取物櫃" />怎麼解決這些問題？
          </h2>
          <p>辦公大樓的取物櫃流程設計如下：</p>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">外送員進門無需等待</strong>：前台給外送員專屬 QR Code，掃一下開格放餐，30 秒完成，全程不需要前台介入</li>
            <li><strong className="text-slate-100">員工自動通知</strong>：餐點放入後系統推播 LINE 通知，員工自選時間下來取，不需要催促</li>
            <li><strong className="text-slate-100">保溫時間足夠</strong>：恆溫格維持 65°C，1 小時內取餐食物品質無虞</li>
            <li><strong className="text-slate-100">前台零工作量</strong>：每天可節省 40–60 分鐘的外送接收時間</li>
            <li><strong className="text-slate-100">集體訂餐分格</strong>：公司內部系統（Slack Bot / Teams Bot）可整合，集體訂餐後自動分格通知</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-10">辦公場域選型指南</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-4 py-3 text-slate-300">辦公人數</th>
                  <th className="text-left px-4 py-3 text-slate-300">建議格數</th>
                  <th className="text-left px-4 py-3 text-slate-300">月租費</th>
                  <th className="text-left px-4 py-3 text-[#FF6B35]">預期效益</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['50 人以下', '10–15 格', '依格數與合約', '節省前台 30 分/天'],
                  ['50–150 人', '20–30 格', '依格數與合約', '節省前台 50 分/天'],
                  ['150–300 人', '30–50 格', '依格數與合約', '節省前台 80 分/天'],
                  ['300 人以上', '50–80 格（建議 2 台）', '依格數與合約', '前台完全脫手外送接收'],
                ].map(([size, slots, fee, benefit], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-4 py-3 text-slate-300 font-medium">{size}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{slots}</td>
                    <td className="px-4 py-3 text-slate-400 text-xs">{fee}</td>
                    <td className="px-4 py-3 text-[#FF6B35] font-semibold text-xs">{benefit}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">費用試算與 ROI 分析</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f1f36', borderColor: 'rgba(255,107,53,0.2)' }}>
            <h3 className="font-bold text-[#FF6B35] mb-3">試算情境：台北市辦公大樓，180 名員工</h3>
            <div className="text-sm space-y-2">
              <p className="text-slate-300">這個場域的成本會由以下幾項決定，實際金額差距很大，需要依現場條件試算：</p>
              <ul className="text-slate-400 list-disc pl-5 space-y-1 mt-2">
                <li>設備取得方式（購置或租賃）與機型、格數、溫層</li>
                <li>商品進貨成本與品項結構</li>
                <li>電費，取決於溫層與現場使用強度</li>
                <li>補貨與維護的人力安排</li>
              </ul>
              <p className="text-slate-500 text-xs mt-3">本站不提供費用數字。實際條件請由專人依您的場地評估後說明。</p>
            
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">辦公大樓導入後的常見改善方向</h2>
          <p>
            辦公大樓在大廳安裝智慧取物櫃後，通常會觀察到以下幾種變化：
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>前台每日花在外送接收的時間<strong className="text-[#FF6B35]">明顯減少</strong>，多數情況只需偶爾協助</li>
            <li>員工「找不到外送餐點」的漏失情況<strong className="text-[#FF6B35]">大幅降低</strong></li>
            <li>大樓管委會對外送訪客登記的管理壓力<strong className="text-[#FF6B35]">明顯緩解</strong>（外送員直接掃碼，不進登記流程）</li>
            <li>員工對午餐取餐便利性的滿意度普遍提升</li>
            <li>對 HR 而言，是相對低成本、高感受度的員工福利投入</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              {
                q: 'Q：設備放在 1 樓大廳，安全嗎？有人偷取別人餐點嗎？',
                a: '每個格口需要個人專屬取餐碼（手機 LINE 通知）才能開啟，無法偷取他人餐點。所有開格記錄有時間戳記，異常操作可追溯。在銓幻元現有客戶中，餐點被盜案例幾乎為零。',
              },
              {
                q: 'Q：外送員不會用怎麼辦？',
                a: '前台給每位外送員一張教學小卡（含中英文）。大多數外送員已熟悉取物櫃操作，Uber Eats / foodpanda 平台端也有內建取物櫃放餐流程說明。',
              },
              {
                q: 'Q：公司沒有統一訂餐，每個人自己點，格口夠用嗎？',
                a: '辦公室通常不是同時點餐，格口週轉率高。180 人辦公室配 35 格，使用率通常在 60–70%，格口壅塞機率低。若特殊活動（如公司訂餐日）需求大，可臨時開啟候補通知功能。',
              },
              {
                q: 'Q：合約最短多久？可以試用嗎？',
                a: '最短 6 個月租約，含安裝（半天）、系統設定、外送平台串接。銓幻元提供 2 週免費試裝（台北市辦公大樓優先），試用期後再決定是否正式簽約。',
              },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">有辦公大樓需求？AI 顧問 3 分鐘給你方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們辦公人數、大廳空間、目前外送管理方式，AI 立刻給出最適合的取物櫃配置</p>
            <a href="/products/grabox?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=office-building"
              className="inline-block px-8 py-3 rounded-xl font-bold text-white" style={{ background: '#FF6B35' }}>
              立即諮詢 AI 顧問 →
            </a>
          </div>

        </div>
        <div className="mt-12 pt-8 border-t border-slate-700/40">
          <a href="/blog" className="text-slate-500 hover:text-slate-300 text-sm transition-colors">← 返回知識庫</a>
        </div>
      </article>
    </main>
  )
}
