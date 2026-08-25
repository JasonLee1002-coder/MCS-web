import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  alternates: { canonical: 'https://www.mcstation.ai/blog/smart-locker-hospital-system' },
  title: '醫院智慧取物系統：護理師、員工餐、訪客輕食一套搞定 | 銓幻元',
  description: '醫院場域的餐食供應比一般場所複雜：三班制護理師、探病訪客、門診病患、醫院員工四種需求並存。智慧取物系統如何在醫院達到 24 小時服務？',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['智慧取物櫃', '醫院', '醫療場域'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          醫院<KeywordTrigger keyword="智慧取物櫃" />系統：護理師、員工餐、訪客輕食一套搞定
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 7 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            醫院是台灣最複雜的餐食供應場域之一。24 小時運作、三班制、四種不同用餐需求同時存在：
            深夜值班護理師需要熱食、醫療員工午餐需要快速取餐、探病訪客需要輕食飲料、
            門診患者等待期間需要點心。傳統的院內員工餐廳只能服務部分時段和部分人群。
          </p>
          <p>
            銓幻元已服務多個醫療院所場域，導入<KeywordTrigger keyword="智慧取物櫃" />與冷凍設備，
            本文整理醫院場域的特殊需求和系統配置邏輯。
          </p>

          <ArticleCTA keyword="智慧取物櫃" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">醫院場域的 4 種需求群體</h2>
          <div className="rounded-xl overflow-hidden border border-slate-700">
            <table className="w-full text-sm">
              <thead style={{ background: '#1e293b' }}>
                <tr>
                  <th className="text-left px-3 py-3 text-slate-300">群體</th>
                  <th className="text-left px-3 py-3 text-slate-300">用餐時段</th>
                  <th className="text-left px-3 py-3 text-slate-300">主要需求</th>
                  <th className="text-left px-3 py-3 text-[#FF6B35]">推薦設備</th>
                </tr>
              </thead>
              <tbody>
                {[
                  ['護理師（三班）', '00:00–06:00 深夜', '熱食正餐', '冷凍微波機'],
                  ['醫療員工', '12:00–13:30', '快速取餐（不排隊）', '智慧取物櫃'],
                  ['探病訪客', '隨機', '飲料、輕食、零食', '智取冰箱 + 飲料機'],
                  ['門診患者', '09:00–17:00', '等待時間的點心', '智取冰箱 + 飲料機'],
                ].map(([group, time, need, device], i) => (
                  <tr key={i} style={{ borderTop: '1px solid #1e293b', background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                    <td className="px-3 py-3 text-slate-300 font-medium text-xs">{group}</td>
                    <td className="px-3 py-3 text-slate-500 text-xs">{time}</td>
                    <td className="px-3 py-3 text-slate-400 text-xs">{need}</td>
                    <td className="px-3 py-3 text-[#FF6B35] font-semibold text-xs">{device}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">醫院智取系統的配置方案</h2>
          <div className="space-y-4">
            {[
              {
                zone: 'Zone A：護理站附近（深夜熱食）',
                equipment: '冷凍微波機 × 1（40 格）',
                desc: '專供三班制護理師和值班醫師。深夜 00:00–05:00 使用率最高。冷凍便當、拉麵、熱湯，90 秒微波即取。不需要任何人力值守。',
              },
              {
                zone: 'Zone B：員工餐廳入口（午餐快取）',
                equipment: '智慧取物櫃 × 1（30–40 格）',
                desc: '醫療員工訂餐後放入格口，員工掃碼自取不排隊。院內訂餐平台或外送平台訂單均可整合。護理師換班前一次取完，不影響下一班工作。',
              },
              {
                zone: 'Zone C：門診大廳（訪客輕食）',
                equipment: '智取冰箱 × 1 + 飲料機 × 1',
                desc: '探病訪客和門診患者可購買飲料、三明治、點心。不需要員工協助，自助取餐。可為醫院或外包廠商創造額外收入來源。',
              },
            ].map(({ zone, equipment, desc }) => (
              <div key={zone} className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.12)' }}>
                <p className="font-bold text-[#FF6B35] text-sm mb-1">{zone}</p>
                <p className="text-slate-300 text-xs mb-2 font-medium">{equipment}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">醫院場域的特殊規格要求</h2>
          <ul className="list-disc pl-6 space-y-3">
            <li><strong className="text-slate-100">靜音設計</strong>：護理站附近機台噪音需 ≤ 42dB，銓幻元醫院版採用靜音壓縮機</li>
            <li><strong className="text-slate-100">院內識別整合</strong>：支援醫院員工識別卡刷卡消費，不需另外辦卡</li>
            <li><strong className="text-slate-100">衛生材質</strong>：機台外殼採抗菌塗層，清潔維護符合醫院感控要求</li>
            <li><strong className="text-slate-100">無線網路限制</strong>：部分醫院對無線設備有限制，銓幻元支援有線乙太網路連接</li>
            <li><strong className="text-slate-100">採購合規</strong>：醫院屬公立或法人機構者，可配合政府採購法流程提供完整文件</li>
          </ul>

          <h2 className="text-xl font-bold text-slate-100 mt-8">醫院場域導入後的常見改善方向</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong className="text-slate-100">護理師深夜熱食滿意度提升</strong>：冷凍微波機導入後，夜班護理師不再只能靠泡麵果腹</li>
            <li><strong className="text-slate-100">員工午餐等待時間縮短</strong>：智慧取物櫃自取取代現場排隊，尖峰時段等待明顯改善</li>
            <li><strong className="text-slate-100">門診大廳創造額外收入</strong>：智取冰箱與飲料機自助販售，可為醫院或外包廠商帶來穩定額外收入</li>
            <li><strong className="text-slate-100">有助於護理人員留任</strong>：改善夜班用餐條件是提升護理師工作滿意度的因素之一</li>
          </ul>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">醫院場域規劃，AI 顧問幫你配置</p>
            <p className="text-slate-400 text-sm mb-5">告訴我們護理師人數、班次、門診量，AI 立刻給出三區設備配置方案</p>
            <a href="/products/grabox?ai=1&utm_source=blog&utm_medium=article-bottom&utm_campaign=hospital"
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
