'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ============================================================
// Data
// ============================================================

type TimelineEvent = {
  date: string
  title: string
  detail: string
  who: string
  tag: 'milestone' | 'meeting' | 'document' | 'action' | 'alert'
}

const timeline: TimelineEvent[] = [
  { date: '2/15', title: '計畫公告', detail: '李博分享「提升商業服務業營運效能強化韌性計畫」整合型補助申請須知', who: '李博士', tag: 'milestone' },
  { date: '2/25', title: '飛龍提供公告文件', detail: '正式啟動規劃，確認計畫方向為「智慧營運整合」', who: '飛龍', tag: 'document' },
  { date: '2/27', title: '第一次線上會議', detail: 'Jason/飛龍/富哥線上討論計畫方向、預算比重、智慧廚房定位', who: '全員', tag: 'meeting' },
  { date: '3/5', title: '高雄實地考察', detail: '團隊到高雄駁二 TACB、瞭解場域。GraBox 正式機上線（麥味登）', who: 'Jason/飛龍/Kami', tag: 'milestone' },
  { date: '3/6', title: '拜訪星益欣', detail: 'Jason 到星益欣與 Simon/黃董討論 POS 合作，佳世達集團入股星益欣', who: 'Jason/東方美', tag: 'meeting' },
  { date: '3/10', title: 'MOU 範本提供', detail: '飛龍提供 MOU 範本，開始準備東方美↔星益欣、東方美↔銓幻元合作協議', who: '飛龍', tag: 'document' },
  { date: '3/12', title: '星益欣提供資料', detail: '公司簡介 + 餐飲 AI 韌性計畫簡報。飛龍產出系統架構圖 B 版', who: '星益欣/飛龍', tag: 'document' },
  { date: '3/14', title: '三方分工確定', detail: '銓幻元(硬體SI+智取櫃) + 星益欣(POS中後台) + BOXVERSE(AI Agent)', who: 'Jason/李博', tag: 'milestone' },
  { date: '3/15', title: 'AI 方案會議', detail: '線上會議：Jason + 資策會 + Chester(BOXVERSE) 討論 AI Agent 技術方案', who: 'Jason/李博/飛龍/Chester', tag: 'meeting' },
  { date: '3/17', title: '線上申請帳號提醒', detail: '飛龍提醒要先開通計畫申請系統帳號（東方美名義）', who: '飛龍', tag: 'alert' },
  { date: '3/20', title: '台南星益欣實地會議', detail: 'Jason/李博/飛龍到台南星益欣實地開會，討論 POS/KDS/點餐方案', who: '全員', tag: 'meeting' },
  { date: '3/21', title: '架構 F 版', detail: '飛龍更新計畫架構 F 版，分 A(分店)/B(總部)/C(場域) 三大分項', who: '飛龍', tag: 'document' },
  { date: '3/22', title: 'FIFI 提供 0322 版', detail: '東方美公司資料更新。飛龍整合為 0322 版含 200 家門市清單', who: 'FIFI/飛龍', tag: 'document' },
  { date: '3/23', title: '帳號審核通過', detail: '東方美帳號開通（統編 96879266）。可開始上傳申請資料', who: 'FIFI', tag: 'milestone' },
  { date: '3/24', title: '架構 I 版 + 計畫名稱定案', detail: '「連鎖早餐加盟業經營強化A2A代理人服務與協作計畫」。催 MOU 及國際因素佐證', who: '李博/飛龍', tag: 'milestone' },
  { date: '3/25', title: '星益欣報價到位', detail: '直營店版 + 加盟200家版報價單。Monique 加入群組負責用印聯絡', who: '飛龍/Monique', tag: 'document' },
  { date: '3/26', title: '大量資料彙整', detail: 'FIFI 提供場域(4店)+財報(6份)。飛龍要 P56 人事薪資。K 版 PPT（KPI 定案）', who: 'FIFI/飛龍', tag: 'document' },
  { date: '3/27', title: 'MOU 寄出 + 4 項缺件', detail: '銓幻元 MOU 掛號寄出。飛龍列缺件：場域/人事/MOU/原物料。計畫規模確認 4000 萬補助 2000 萬', who: '全員', tag: 'alert' },
  { date: '3/28', title: 'M 版 PPT + 趕工', detail: 'M 版 34 頁（差預算）。供應鏈 V4 完成。GraBox 報價修正。切結聲明書要蓋章。飛龍要倉庫照片', who: '飛龍/Jason', tag: 'document' },
  { date: '3/29', title: '現在：衝刺中', detail: '小麥更新計畫文件 0328 版。所有人動員補齊最後缺件', who: '全員', tag: 'alert' },
]

type Evidence = {
  type: 'chat' | 'file' | 'info'
  icon: string
  text: string
  source?: string
}

type ActionItem = {
  id: number
  item: string
  owner: string
  status: 'done' | 'pending' | 'urgent' | 'blocked'
  note: string
  evidence: Evidence[]
}

const actions: ActionItem[] = [
  { id: 1, item: '三處場域照片 + 介紹 + 特色', owner: 'FIFI', status: 'pending', note: 'FIFI 已提供 4 店資料，飛龍要確認照片是否夠用', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/22：「我們需要示範三處場域導入較為詳細的資料，還要有照片」', source: 'LINE 3/22 22:56' },
    { type: 'chat', icon: '💬', text: '飛龍 3/26：「缺三處場域的資料」', source: 'LINE 3/26 23:29' },
    { type: 'chat', icon: '💬', text: '飛龍 3/28：「場域介紹，特色，照片有嗎？照片很重要」', source: 'LINE 3/28 13:00' },
    { type: 'file', icon: '📄', text: 'FIFI 提供：科專示範場域0326.docx（4店：貴陽/秀朗/TACB/台南應大）', source: 'LINE 3/26 12:17' },
    { type: 'info', icon: '⚠️', text: '飛龍還沒確認照片是否足夠，需追蹤', source: '' },
  ]},
  { id: 2, item: '人事薪資（PPT P56）', owner: 'FIFI/富哥', status: 'pending', note: '富哥建議 40%=1600萬，需填平均薪資', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/26：「P56 人力要有平均薪資」', source: 'LINE 3/26 11:24' },
    { type: 'chat', icon: '💬', text: '飛龍：「人事預算希望編 2000 萬，每人只能編 0.5 人年」', source: 'LINE 3/26 14:06' },
    { type: 'chat', icon: '💬', text: '富哥：「以 40% = 800 萬做編列？」→ 飛龍：「以計畫總經費來看」= 1600 萬', source: 'LINE 3/26 14:28' },
    { type: 'chat', icon: '💬', text: 'Kami：「主管職編列建議不超過 0.5 人年，沒有薪資上限，查核時要有匯款紀錄」', source: 'LINE 3/26 14:20' },
  ]},
  { id: 3, item: 'MOU — 銓幻元', owner: 'Monique', status: 'done', note: '3/27 掛號寄出，Monique 追蹤回報', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/27：「兩間委外公司都用同一版即可，一頁的單純版」', source: 'LINE 3/27 16:23' },
    { type: 'chat', icon: '💬', text: 'Jason：「用這份用印」→ 飛龍：「可以的」', source: 'LINE 3/27 16:38-16:40' },
    { type: 'file', icon: '📄', text: '最終版：MOU_東方美_銓幻元科技_合作備忘錄.docx', source: 'LINE 3/27 16:36' },
    { type: 'chat', icon: '✅', text: 'Monique：「昨掛號寄出」+ 寄件照片', source: 'LINE 3/27 15:29' },
  ]},
  { id: 4, item: 'MOU — 星益欣', owner: '飛龍/黃總', status: 'urgent', note: '飛龍去請黃總加速。需東方美用印後轉寄', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/24：「公司與星益欣需要一份 MOU，他們法務需要時間」', source: 'LINE 3/24 14:20' },
    { type: 'chat', icon: '💬', text: '飛龍 3/27：「我去請黃總加速...」', source: 'LINE 3/27 16:07' },
    { type: 'chat', icon: '💬', text: 'Jason 3/27：「請星益欣用印快遞寄去給東方美」', source: 'LINE 3/27 16:10' },
    { type: 'info', icon: '⚠️', text: '需用簡版一頁 MOU（同銓幻元版），東方美先用印再轉星益欣', source: '' },
  ]},
  { id: 5, item: '原物料上漲佐證', owner: 'Jason', status: 'done', note: '4 張漲價通知 + 說明書已提供', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/24：「主要是佐證資料，往來報價單，往來信件宣告漲價之類」', source: 'LINE 3/24 22:55' },
    { type: 'file', icon: '📄', text: '佐證_東方美_受國際因素影響說明書.docx', source: 'LINE 3/24 22:52' },
    { type: 'file', icon: '🖼️', text: '咖啡豆調漲通知.jpg / 國際農畜漲價通知.jpg / 府城事業價格異動.jpg / 東方美對店家漲價通知.jpg', source: '雲端硬碟 回應文件夾' },
    { type: 'chat', icon: '✅', text: 'Jason 3/28 上傳至共享資料夾', source: 'LINE 3/28 14:58' },
  ]},
  { id: 6, item: '預算編列', owner: '飛龍/富哥', status: 'urgent', note: 'M 版 PPT 最後一塊。計畫 4000 萬，補助 2000 萬', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/28：「主要還差預算，其餘大致完成了」', source: 'LINE 3/28 00:29' },
    { type: 'chat', icon: '💬', text: '飛龍 3/27：「目前預計，計畫規模 4000，補助 2000」', source: 'LINE 3/27 15:21' },
    { type: 'info', icon: '📊', text: '人事 40%=1600萬、設備不超過總經費 40%（補助上限 50%）', source: '申請須知規定' },
    { type: 'info', icon: '⚠️', text: 'PPT P30 經費預算表目前空白，為最後關鍵缺件', source: '' },
  ]},
  { id: 7, item: '倉庫照片（總部或供應商）', owner: 'FIFI', status: 'blocked', note: '假日放假，可能要週一才有', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/28：「再請給我一張總部或供應商的倉庫照片」', source: 'LINE 3/28 17:18' },
    { type: 'chat', icon: '💬', text: 'FIFI：「因為假日放假，可能要週一了」', source: 'LINE 3/28 17:25' },
  ]},
  { id: 8, item: '切結聲明書（蓋大小章）', owner: '東方美', status: 'urgent', note: '附件7，要上傳的資料', evidence: [
    { type: 'file', icon: '📄', text: '飛龍提供：附件7切結聲明書.docx', source: 'LINE 3/28 21:18' },
    { type: 'chat', icon: '💬', text: '飛龍：「這個要請公司蓋大小章，要上傳的資料」', source: 'LINE 3/28 21:19' },
    { type: 'info', icon: '⚠️', text: '需東方美公司章 + 負責人章', source: '' },
  ]},
  { id: 9, item: 'EMAIL 確認', owner: 'FIFI', status: 'done', note: 'fifi0311@yahoo.com.tw 已回覆', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/28：「我需要正確的您的信箱」', source: 'LINE 3/28 23:35' },
    { type: 'chat', icon: '✅', text: 'FIFI：「fifi0311@yahoo.com.tw」', source: 'LINE 3/28 23:48' },
  ]},
  { id: 10, item: '供應鏈廠商清單', owner: 'Jason', status: 'done', note: 'V4 已完成 7 家，已上傳', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/27：「供應商（批發商）加入計畫，不用 MOU，當服務擴散對象」', source: 'LINE 3/27 16:56' },
    { type: 'chat', icon: '💬', text: '飛龍：「把海鮮魚貨這塊帶進來」', source: 'LINE 3/27 17:02' },
    { type: 'file', icon: '📄', text: '科專_供應鏈廠商清單V4.docx — 7家完整（蒂夏/信海/合茂/果大行/品皇/府城/宗柏）', source: 'LINE 3/28 18:55' },
  ]},
  { id: 11, item: 'GraBox 報價單', owner: 'Jason', status: 'done', note: '科專專案版已修正（3副櫃、年費修正）', evidence: [
    { type: 'file', icon: '📄', text: 'GraBox_報價單_科專專案_及_標準範本.xlsx', source: 'LINE 3/28 18:12' },
    { type: 'info', icon: '🔧', text: '修正：副櫃改 3 座、價格重新分配、年費只留 PrimeBox 12,000/年', source: '' },
    { type: 'info', icon: '💰', text: '每套 48 萬 × 10 套 = 480 萬（未稅），含稅 504 萬', source: '' },
  ]},
  { id: 12, item: '駁二 TACB 加入 200 家清單', owner: '小麥', status: 'done', note: '小麥 3/28 晚已更新', evidence: [
    { type: 'chat', icon: '💬', text: '飛龍 3/27：「那幾間餐酒館有放進來嗎？建議放入」', source: 'LINE 3/27 16:00' },
    { type: 'chat', icon: '💬', text: 'FIFI：「駁二沒有放在 200 家裡面」→ 飛龍：「可以放嗎？」', source: 'LINE 3/27 16:03-17:07' },
    { type: 'chat', icon: '✅', text: '小麥：「調整了表格格式以及對齊，並把駁二新增進兩百間店了」', source: 'LINE 3/28 21:07' },
  ]},
]

type TeamMember = {
  name: string
  org: string
  role: string
  color: string
}

const team: TeamMember[] = [
  { name: '李長脩（李博士）', org: '資策會', role: '計畫顧問 / 總指導', color: '#1565C0' },
  { name: 'Joseph（林飛龍）', org: '資策會', role: '計畫書撰寫 / 架構規劃', color: '#1565C0' },
  { name: 'Kami（陳劭寰）', org: '資策會', role: '計畫審核支援', color: '#1565C0' },
  { name: 'Ben（鄭有富）', org: '東方美', role: '財務長 / 計畫主持人', color: '#2E7D32' },
  { name: 'FIFI（蔡濱妃）', org: '東方美/雅安', role: '文件彙整 / 場域聯繫', color: '#2E7D32' },
  { name: '專案整合窗口', org: '銓幻元(MCS)', role: '整合協調 / SI角色 / GraBox', color: '#E65100' },
  { name: 'Monique（陳泱璇）', org: '銓幻元(MCS)', role: '用印 / 行政聯絡', color: '#E65100' },
  { name: '小麥（呂慶緯）', org: '牧森', role: '文件支援 / 場域資料', color: '#E65100' },
  { name: 'Chester', org: 'BOXVERSE', role: 'AI Agent 技術方案', color: '#7B1FA2' },
  { name: '黃正義（黃總）', org: '星益欣', role: 'POS/KDS 方案', color: '#00838F' },
]

const tagColors: Record<string, { bg: string; text: string; label: string }> = {
  milestone: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: '里程碑' },
  meeting: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: '會議' },
  document: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: '文件' },
  action: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: '行動' },
  alert: { bg: 'bg-red-500/20', text: 'text-red-400', label: '緊急' },
}

const statusConfig: Record<string, { bg: string; text: string; label: string }> = {
  done: { bg: 'bg-emerald-500/20', text: 'text-emerald-400', label: '完成' },
  pending: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: '進行中' },
  urgent: { bg: 'bg-red-500/20', text: 'text-red-400', label: '緊急' },
  blocked: { bg: 'bg-gray-500/20', text: 'text-gray-400', label: '卡住' },
}

// ============================================================
// Components
// ============================================================

function Header() {
  return (
    <div className="text-center py-8 border-b border-white/10">
      <div className="text-sm text-gray-500 tracking-widest mb-2">MCS INTERNAL</div>
      <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-400 bg-clip-text text-transparent">
        科專計畫戰情室
      </h1>
      <p className="text-gray-400 mt-2 text-sm">
        提升商業服務業營運效能強化韌性計畫 — 東方美 A2A 代理人服務與協作
      </p>
      <div className="flex justify-center gap-6 mt-4 text-xs text-gray-500">
        <span>計畫規模 <span className="text-cyan-400 font-bold text-base">4,000 萬</span></span>
        <span>補助 <span className="text-emerald-400 font-bold text-base">2,000 萬</span></span>
        <span>狀態 <span className="text-red-400 font-bold text-base">衝刺中</span></span>
      </div>
    </div>
  )
}

function TabBar({ active, onChange }: { active: string; onChange: (t: string) => void }) {
  const tabs = [
    { id: 'timeline', label: '時間軸', icon: '📅' },
    { id: 'actions', label: '待辦追蹤', icon: '🎯' },
    { id: 'team', label: '團隊', icon: '👥' },
    { id: 'docs', label: '文件版本', icon: '📄' },
  ]
  return (
    <div className="flex gap-1 p-1 bg-white/5 rounded-xl mt-6 mx-auto max-w-lg">
      {tabs.map(t => (
        <button
          key={t.id}
          onClick={() => onChange(t.id)}
          className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
            active === t.id
              ? 'bg-white/10 text-white shadow-lg'
              : 'text-gray-500 hover:text-gray-300'
          }`}
        >
          <span className="mr-1">{t.icon}</span>{t.label}
        </button>
      ))}
    </div>
  )
}

function TimelineView() {
  return (
    <div className="relative mt-6">
      <div className="absolute left-4 md:left-6 top-0 bottom-0 w-px bg-gradient-to-b from-emerald-500/50 via-cyan-500/50 to-blue-500/50" />
      <div className="space-y-4">
        {[...timeline].reverse().map((evt, i) => {
          const tc = tagColors[evt.tag]
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.03 }}
              className="relative pl-10 md:pl-14"
            >
              <div className={`absolute left-2.5 md:left-4.5 top-2 w-3 h-3 rounded-full border-2 ${
                evt.tag === 'alert' ? 'border-red-400 bg-red-400/30' :
                evt.tag === 'milestone' ? 'border-emerald-400 bg-emerald-400/30' :
                'border-gray-500 bg-gray-500/30'
              }`} />
              <div className="bg-white/5 rounded-lg p-3 hover:bg-white/8 transition-colors">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono text-gray-500">{evt.date}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${tc.bg} ${tc.text}`}>{tc.label}</span>
                  <span className="text-xs text-gray-600">{evt.who}</span>
                </div>
                <div className="text-sm font-medium text-white">{evt.title}</div>
                <div className="text-xs text-gray-400 mt-1">{evt.detail}</div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

function ActionCard({ a }: { a: ActionItem }) {
  const [open, setOpen] = useState(false)
  const sc = statusConfig[a.status]

  const evidenceTypeColor: Record<string, string> = {
    chat: 'border-l-blue-400/50',
    file: 'border-l-emerald-400/50',
    info: 'border-l-amber-400/50',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`rounded-lg border cursor-pointer transition-all ${
        a.status === 'urgent' ? 'border-red-500/30 bg-red-500/5' :
        a.status === 'blocked' ? 'border-gray-500/30 bg-gray-500/5' :
        a.status === 'done' ? 'border-emerald-500/20 bg-emerald-500/5' :
        'border-amber-500/20 bg-amber-500/5'
      } ${open ? 'ring-1 ring-white/20' : 'hover:ring-1 hover:ring-white/10'}`}
      onClick={() => setOpen(!open)}
    >
      <div className="p-3">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm font-medium text-white">{a.item}</span>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-600">{a.evidence.length} 筆來源</span>
            <span className={`text-xs px-2 py-0.5 rounded-full ${sc.bg} ${sc.text}`}>{sc.label}</span>
            <motion.span
              animate={{ rotate: open ? 180 : 0 }}
              className="text-gray-500 text-xs"
            >▼</motion.span>
          </div>
        </div>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <span>負責：<span className="text-gray-300">{a.owner}</span></span>
        </div>
        <div className="text-xs text-gray-500 mt-1">{a.note}</div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-3 pb-3 pt-1 border-t border-white/5">
              <div className="text-xs font-bold text-gray-500 mb-2">📋 來源與證據</div>
              <div className="space-y-1.5">
                {a.evidence.map((ev, i) => (
                  <div
                    key={i}
                    className={`flex items-start gap-2 p-2 rounded bg-white/3 border-l-2 ${evidenceTypeColor[ev.type] || 'border-l-gray-500/50'}`}
                    onClick={e => e.stopPropagation()}
                  >
                    <span className="text-sm shrink-0">{ev.icon}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-gray-300">{ev.text}</div>
                      {ev.source && (
                        <div className="text-[10px] text-gray-600 mt-0.5 font-mono">{ev.source}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

function ActionsView() {
  const urgent = actions.filter(a => a.status === 'urgent')
  const pending = actions.filter(a => a.status === 'pending')
  const blocked = actions.filter(a => a.status === 'blocked')
  const done = actions.filter(a => a.status === 'done')

  const renderGroup = (title: string, items: ActionItem[], emoji: string) => (
    items.length > 0 && (
      <div className="mb-6">
        <h3 className="text-sm font-bold text-gray-400 mb-3">{emoji} {title} ({items.length})</h3>
        <div className="space-y-2">
          {items.map(a => <ActionCard key={a.id} a={a} />)}
        </div>
      </div>
    )
  )

  return (
    <div className="mt-6">
      {renderGroup('緊急', urgent, '🔴')}
      {renderGroup('卡住', blocked, '⚫')}
      {renderGroup('進行中', pending, '🟡')}
      {renderGroup('已完成', done, '🟢')}
    </div>
  )
}

function TeamView() {
  const orgs = [...new Set(team.map(t => t.org))]
  return (
    <div className="mt-6 space-y-6">
      {orgs.map(org => (
        <div key={org}>
          <h3 className="text-sm font-bold text-gray-400 mb-3">{org}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {team.filter(t => t.org === org).map(m => (
              <div key={m.name} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ backgroundColor: m.color + '40' }}>
                  {m.name[0]}
                </div>
                <div>
                  <div className="text-sm text-white font-medium">{m.name}</div>
                  <div className="text-xs text-gray-500">{m.role}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function DocsView() {
  const versions = [
    { ver: 'M', date: '3/28 00:29', desc: '34頁，差預算，其餘大致完成', type: 'PPT', status: '最新' },
    { ver: 'L', date: '3/26 23:27', desc: 'P23/P27/P28 需確認，缺三處場域', type: 'PPT', status: '' },
    { ver: 'K', date: '3/26 20:24', desc: 'KPI 定案版（P27-28）', type: 'PPT', status: '' },
    { ver: 'I', date: '3/26 10:45', desc: '中途版，架構持續更新', type: 'PPT', status: '' },
    { ver: 'G', date: '3/22 23:14', desc: 'A(分店40%)/B(總部30%)/C(場域30%)', type: 'PPT', status: '' },
    { ver: 'F', date: '3/21 10:40', desc: '更新版主架構，開始加工', type: 'PPT', status: '' },
  ]

  const otherDocs = [
    { name: '計畫書 0328 版', date: '3/28', desc: '535段落/33表格，Word 完整版' },
    { name: '供應鏈廠商清單 V4', date: '3/28', desc: '7 家廠商完整資料' },
    { name: 'GraBox 報價單', date: '3/28', desc: '科專專案版（3副櫃修正）' },
    { name: '星益欣報價單 x2', date: '3/25', desc: '直營店版 + 加盟200家版' },
    { name: 'MOU 銓幻元（簡版）', date: '3/27', desc: '已用印寄出' },
    { name: 'MOU 星益欣（簡版）', date: '3/27', desc: '待星益欣用印' },
    { name: '受國際因素影響說明書', date: '3/24', desc: '含 4 張漲價通知佐證' },
    { name: '切結聲明書', date: '3/28', desc: '附件7，需蓋大小章' },
    { name: '示範場域 0326', date: '3/26', desc: '4 店（貴陽/秀朗/TACB/台南應大）' },
  ]

  return (
    <div className="mt-6 space-y-6">
      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-3">PPT 版本演進（飛龍撰寫）</h3>
        <div className="space-y-2">
          {versions.map(v => (
            <div key={v.ver} className={`flex items-center gap-3 p-3 rounded-lg ${v.status === '最新' ? 'bg-cyan-500/10 border border-cyan-500/30' : 'bg-white/5'}`}>
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center font-bold text-lg ${v.status === '最新' ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/10 text-gray-400'}`}>
                {v.ver}
              </div>
              <div className="flex-1">
                <div className="text-sm text-white">{v.desc}</div>
                <div className="text-xs text-gray-500">{v.date} · {v.type}</div>
              </div>
              {v.status && <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">{v.status}</span>}
            </div>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-sm font-bold text-gray-400 mb-3">其他關鍵文件</h3>
        <div className="space-y-2">
          {otherDocs.map((d, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
              <div className="text-lg">📄</div>
              <div className="flex-1">
                <div className="text-sm text-white">{d.name}</div>
                <div className="text-xs text-gray-500">{d.date} · {d.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ============================================================
// Main Page
// ============================================================

export default function IIIProjectPage() {
  const [tab, setTab] = useState('actions')

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <div className="max-w-3xl mx-auto px-4 pb-20">
        <Header />
        <TabBar active={tab} onChange={setTab} />
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {tab === 'timeline' && <TimelineView />}
            {tab === 'actions' && <ActionsView />}
            {tab === 'team' && <TeamView />}
            {tab === 'docs' && <DocsView />}
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 text-center text-xs text-gray-700">
          MCS Internal · 非公開頁面 · 僅限知道網址者存取
        </div>
      </div>
    </div>
  )
}
