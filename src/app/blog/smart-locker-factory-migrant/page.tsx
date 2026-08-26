import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/smart-locker-factory-migrant' },
  title: '工廠移工宿舍智慧取物冰箱：薪資扣款模式完整說明 | 銓幻元',
  description: '工廠移工使用智慧取物冰箱，薪資扣款如何設定？移工不需要手機 App，只要工作證感應即可消費，月底自動從薪資扣除。完整操作說明與法規說明。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '移工宿舍', '薪資扣款'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          工廠移工宿舍<KeywordTrigger keyword="智慧取物櫃" />：薪資扣款模式完整說明
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            移工宿舍導入智慧取物設備有一個特殊挑戰：很多移工沒有台灣本地的行動支付帳號，
            也不方便每次消費都掏現金。銓幻元為移工場域開發了「工作證感應 + 月底薪資扣款」模式，
            讓移工用工廠識別證刷卡取餐，月底統一從薪資單扣除，方便雙方管理。
          </p>
          <p>
            本文說明薪資扣款模式的完整設定流程、法規合規說明，以及 HR 如何操作後台。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">薪資扣款模式的運作流程</h2>
          <div className="space-y-3">
            {[
              { step: '1', title: '登記工作證', desc: 'HR 在銓幻元後台上傳移工名冊（Excel 格式），系統批量登記工作證卡號。移工不需要下載 App 或設定帳號。' },
              { step: '2', title: '移工刷卡取餐', desc: '移工到<KeywordTrigger keyword="智慧取物櫃" />前刷工作證，系統識別身份後開啟對應食品格口。支援中文、越語、印尼語、泰語、菲律賓語介面選擇。' },
              { step: '3', title: '消費記錄累積', desc: '每筆消費自動記錄到移工的個人帳戶：品項、金額、時間。移工可在機台查詢本月累積消費金額。' },
              { step: '4', title: '月底對帳匯出', desc: 'HR 在月底從後台匯出薪資扣款報表（Excel/CSV），每位移工的消費明細清楚列示，對應薪資單直接扣除。' },
              { step: '5', title: '月度消費上限', desc: '可依需求設定每位移工的每月消費上限，超過後自動鎖定，等下個月重置，防止過度消費或帳款過大。' },
            ].map(({ step, title, desc }) => (
              <div key={step} className="flex gap-4 p-4 rounded-xl" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 font-black text-sm" style={{ background: '#FF6B35', color: 'white' }}>{step}</div>
                <div>
                  <p className="font-bold text-slate-200 mb-1 text-sm">{title}</p>
                  <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">法規合規說明</h2>
          <div className="rounded-xl p-5 border" style={{ background: '#0f2744', borderColor: 'rgba(59,130,246,0.3)' }}>
            <p className="font-bold text-blue-300 mb-3 text-sm">薪資扣款涉及《勞動基準法》第 22 條</p>
            <div className="text-sm space-y-2 text-slate-300">
              <p>法條：「工資應全額直接給付勞工。但法令另有規定或勞雇雙方另有約定者，不在此限。」</p>
              <p><span className="text-[#FF6B35] font-semibold">合規做法：</span>薪資扣款需有移工本人的書面同意（或工作合約中明訂）。銓幻元提供標準版移工同意書（含中/越/印/泰/菲語），HR 可直接使用。</p>
              <p><span className="text-slate-400">注意事項：</span>扣款後薪資不得低於法定基本工資，實際數額以勞動部當年度公告為準。消費上限設定建議依此計算。</p>
            </div>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">3 種支付模式比較</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-3 py-3 text-slate-300">支付模式</th>
                  <th className="text-left px-3 py-3 text-slate-300">操作方式</th>
                  <th className="text-left px-3 py-3 text-slate-300">適用情境</th>
                  <th className="text-left px-3 py-3 text-[#FF6B35]">優點</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['現金投幣', '投幣 / 現金掃碼', '不想綁定薪資的移工', '即時結算，不留帳'],
                  ['行動支付', 'LINE Pay / 街口', '已有台灣帳戶的移工', '方便，紀錄清楚'],
                  ['薪資扣款', '工作證感應', '大多數移工（無帳戶）', '最方便，月底統一結算'],
                ].map(([mode, method, scenario, advantage], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-3 py-3 text-slate-300 font-medium text-xs">{mode}</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">{method}</td>
                    <td className="px-3 py-3 text-slate-400 text-xs">{scenario}</td>
                    <td className="px-3 py-3 text-[#FF6B35] font-semibold text-xs">{advantage}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-500">* 銓幻元系統三種模式可並存，移工自由選擇</p>

          <h2 className="text-xl font-bold text-slate-100 mt-8">薪資扣款模式導入後的常見成效</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>移工宿舍導入後，<strong className="text-[#FF6B35]">薪資扣款通常會成為多數移工的主要付款方式</strong>（相較現金投幣更省事）</li>
            <li>月底扣款對帳流程自動化後，<strong className="text-[#FF6B35]">HR 對帳工作量可大幅減少</strong>（系統自動生成報表，取代人工逐筆核對）</li>
            <li>搭配月度消費上限設定，可有效控管移工消費金額，降低帳款糾紛風險</li>
            <li>配合完整的書面同意書流程，有助於符合勞動部查廠的合規要求</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">常見問題（FAQ）</h2>
          <div className="space-y-4">
            {[
              { q: 'Q：移工離職了，未扣款怎麼辦？', a: '系統會在移工離職日自動鎖定帳號，停止新消費。離職前的未扣款餘額在最後一個月薪資單一次扣除。若在扣薪前移工已離境，視廠方政策決定（保留記錄，多數廠方選擇沖銷）。' },
              { q: 'Q：移工對薪資扣款有疑問，可以查詢嗎？', a: '移工可在機台查詢本月消費明細（選擇語言後顯示）。HR 後台也可依移工工號匯出完整消費歷程供查閱，解決糾紛。' },
              { q: 'Q：換工作證（重新辦卡）後怎麼更新？', a: '在銓幻元後台 3 步驟更新：刪除舊卡號 → 登記新卡號 → 確認。消費歷史記錄保留，不受影響。' },
              { q: 'Q：可以設定「福利補貼」讓公司幫移工付一部分嗎？', a: '可以。廠方可設定每月移工補貼額度，超過補貼的部分才由薪資扣款。這是常見的「員工福利餐補」方案，可提升移工滿意度。' },
            ].map(({ q, a }) => (
              <div key={q} className="rounded-xl p-4" style={{ background: '#1e293b' }}>
                <p className="font-semibold text-slate-200 mb-2 text-sm">{q}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{a}</p>
              </div>
            ))}
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">移工宿舍場域規劃，AI 顧問幫你設計薪扣方案</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們移工人數、國籍、現有薪資系統，AI 立刻給出合規的薪資扣款設定方案</p>
            <a href="/products/grabox?ai=1"
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
