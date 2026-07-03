import type { Metadata } from 'next'
import { KeywordTrigger, ArticleCTA } from '@/components/KeywordTrigger'

export const metadata: Metadata = {
  title: '冷凍販賣機廠商怎麼選？採購主管必看的 6 大評估指標（2026）| 銓幻元',
  description: '台灣冷凍販賣機廠商良莠不齊，哪些指標能篩出真正靠得住的供應商？本文從售後服務、技術規格、財務穩定性等 6 個維度提供完整評估框架。',
}

export default function Article() {
  return (
    <main className="min-h-screen bg-[#0d1a2d] text-slate-100">
      <article className="max-w-2xl mx-auto px-6 py-16">
        <div className="flex flex-wrap gap-2 mb-6">
          {['冷凍販賣機', '廠商選型', '採購指南'].map(tag => (
            <span key={tag} className="text-xs px-2 py-0.5 rounded-full"
              style={{ background: 'rgba(255,107,53,0.12)', color: '#FF6B35' }}>{tag}</span>
          ))}
        </div>
        <h1 className="text-3xl font-bold mb-3 text-slate-100">
          <KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />廠商怎麼選？採購主管必看的 6 大評估指標（2026）
        </h1>
        <p className="text-slate-500 text-sm mb-10">2026-07-03 · 8 分鐘閱讀</p>

        <div className="space-y-7 text-slate-300 leading-relaxed">
          <p>
            台灣<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />市場近三年快速成長，但廠商品質參差不齊。
            有些廠商設備技術紮實但售後服務差；有些報價很低但一年內就出現各種維修問題；
            還有些只有設備，食材和整合方案完全要自己想辦法。
          </p>
          <p>
            本文整理採購<KeywordTrigger keyword="冷凍販賣機" slug="frozen-microwave" />時最容易踩的坑，以及篩選廠商的 6 個關鍵指標，
            幫助採購主管做出更有把握的決策。
          </p>

          <ArticleCTA keyword="冷凍販賣機" slug="frozen-microwave" />

          <h2 className="text-xl font-bold text-slate-100 mt-10">6 大評估指標</h2>
          <div className="space-y-5">
            {[
              {
                num: '01',
                title: '售後維修響應速度',
                weight: '權重最高',
                content: '設備壞了，多快能來修？這是最實際的指標。詢問廠商：台北市內緊急維修幾小時、外縣市幾小時、有沒有 7×24 客服熱線、替代機台備用機制。優質廠商應承諾大台北 4 小時、外縣市 8 小時以內。低於這個標準的廠商，日後管理成本會很高。',
                checkList: ['台北市 ≤ 4 小時維修', '外縣市 ≤ 8 小時', '24h 客服熱線', '備用機台機制'],
              },
              {
                num: '02',
                title: '溫控技術與認證',
                weight: '食安關鍵',
                content: '冷凍販賣機的溫控能力直接影響食品安全。要求廠商提供：溫控精度規格（±1°C vs ±3°C 差很多）、停電後溫度回復時間、溫度異常警報機制、食品衛生相關認證（CNS、HACCP 等）。購買前可要求廠商現場展示斷電後的溫度紀錄。',
                checkList: ['溫控精度 ±1°C', '停電恢復 < 30 分鐘', '溫度異常即時警報', 'CNS/食安認證'],
              },
              {
                num: '03',
                title: 'IoT 遠端監控系統',
                weight: '管理效率關鍵',
                content: '現代冷凍販賣機應具備 IoT 連接能力：庫存量即時顯示（低於多少格自動推播）、每日銷售報表（掌握哪個品項賣得好）、異常事件即時通知（斷電/高溫/機門未關）。沒有 IoT 的廠商，管理成本全部回到人工，效率差很多。',
                checkList: ['庫存即時監控', '低庫存自動通知', '銷售數據後台', '異常事件推播'],
              },
              {
                num: '04',
                title: '食材供應鏈整合能力',
                weight: '差異化關鍵',
                content: '設備只是一部分，食材來源才是長期成功的關鍵。有些廠商只賣設備，食材要自己找；有些廠商有合作食材供應商，可以媒合或代訂。問清楚：廠商有哪些合作食材商？能不能協助導入特定食材（如東南亞料理、素食）？補貨物流是否協助安排？',
                checkList: ['合作食材供應商清單', '東南亞/素食食材可取得', '補貨物流協助', '食材品項定期更新'],
              },
              {
                num: '05',
                title: '商業模式彈性',
                weight: '財務規劃關鍵',
                content: '好的廠商應該提供多種商業模式選擇：月租（低前期）、買斷（長期划算）、租轉買（試用後選擇）、分潤（零前期、按收入分成）。如果廠商只提供一種模式，要問清楚為什麼，這可能反映廠商的財務狀況或對自家產品的信心。',
                checkList: ['月租方案可選', '買斷方案可選', '租轉買機制', '分潤模式（至少試點）'],
              },
              {
                num: '06',
                title: '既有客戶案例可查證',
                weight: '信任度指標',
                content: '要求廠商提供 3–5 個既有客戶的聯絡方式（你可以直接打電話確認）。優質廠商不怕查證。詢問這些客戶：設備穩定性如何？維修響應滿意嗎？如果是使用 1 年以上的客戶，他們的評價最有參考價值。',
                checkList: ['提供 3+ 可查證客戶', '有 1 年以上使用案例', '願意安排場域參訪', '客戶評價書面化'],
              },
            ].map(({ num, title, weight, content, checkList }) => (
              <div key={num} className="rounded-xl p-5" style={{ background: '#0f1f36', border: '1px solid rgba(255,107,53,0.1)' }}>
                <div className="flex items-start gap-3 mb-3">
                  <span className="text-2xl font-black shrink-0" style={{ color: '#FF6B35' }}>{num}</span>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="font-bold text-slate-100">{title}</p>
                      <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'rgba(255,107,53,0.15)', color: '#FF6B35' }}>{weight}</span>
                    </div>
                  </div>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed mb-3">{content}</p>
                <div className="grid grid-cols-2 gap-1.5">
                  {checkList.map(item => (
                    <div key={item} className="flex items-center gap-1.5 text-xs text-slate-300">
                      <span style={{ color: '#FF6B35' }}>✓</span>{item}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-10">3 個常見踩坑情境</h2>
          <div className="space-y-4">
            {[
              { title: '❌ 坑 1：被最低報價吸引，忽略維修成本', desc: '一台低報價設備可能在 1 年內出現 3–4 次故障，每次維修費用 NT$5,000–12,000 加上停機損失，實際總成本遠高於買優質設備。選廠商不能只看設備單價。' },
              { title: '❌ 坑 2：不確認食材供應就簽約', desc: '設備到位了，才發現合適的冷凍食材很難取得，或補貨物流要自己全部搞定。導入前一定要先確認食材供應鏈是否可行，否則設備形同擺設。' },
              { title: '❌ 坑 3：忽略 IoT 功能，用人工管理', desc: '每天派人去查庫存、手動記銷售、現場才能發現故障——這些都是有 IoT 系統就能自動化的工作。沒有 IoT 的設備，管理成本高 50% 以上。' },
            ].map(({ title, desc }) => (
              <div key={title} className="rounded-xl p-4" style={{ background: '#1e0a0a', border: '1px solid rgba(239,68,68,0.2)' }}>
                <p className="font-bold text-red-300 mb-2 text-sm">{title}</p>
                <p className="text-slate-400 text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-bold text-slate-100 mt-8">評估問卷：詢問廠商的 10 個問題</h2>
          <div className="rounded-xl p-4" style={{ background: '#1e293b' }}>
            <ol className="space-y-2 text-sm text-slate-300">
              {[
                '台北市內緊急維修幾小時可到？外縣市呢？',
                '故障期間可以提供備用機台嗎？',
                '溫控精度多少？停電後多久恢復目標溫度？',
                '有什麼食品安全認證？',
                'IoT 系統可以即時看到庫存和銷售數據嗎？',
                '有哪些合作食材供應商？可以引進特定食材嗎？',
                '提供哪些商業模式（月租/買斷/分潤）？',
                '保固期多長？保固外的維修怎麼計費？',
                '可以提供 3 個使用超過 1 年的客戶聯絡方式嗎？',
                '台灣有在地工程師還是委外？工程師幾人？',
              ].map((q, i) => (
                <li key={i} className="flex gap-2">
                  <span style={{ color: '#FF6B35' }} className="shrink-0 font-bold">{i + 1}.</span>
                  <span>{q}</span>
                </li>
              ))}
            </ol>
          </div>

          <div className="rounded-xl p-5 my-6 text-center" style={{ background: '#0f2744', border: '1px solid rgba(255,107,53,0.3)' }}>
            <p className="text-lg font-bold text-slate-200 mb-2">讓 AI 顧問幫你比較方案，省去自己問的時間</p>
            <p className="text-slate-400 text-sm mb-5">告訴 AI 你的場域需求，AI 直接給出銓幻元規格說明，3 分鐘完成第一輪評估</p>
            <a href="/solutions/frozen-microwave?utm_source=blog&utm_medium=article-bottom&utm_campaign=vendor-selection"
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
