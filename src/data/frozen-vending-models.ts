/**
 * 冷凍／冷凍微波智能販賣機 全系列規格資料
 *
 * 唯一來源：`JASON_銓幻元_冷凍與冷凍微波智能販賣機_全系列規格簡報_20260819.pdf`
 * （H:\共用雲端硬碟\2026-銓幻元共用雲端硬碟\07_行銷素材\產品DM\，13 頁，V1.0）
 *
 * ⚠️ 三條規則，改這個檔之前先讀：
 *
 * 1. **這裡的數字全部是「設備規格標示值」，不是本公司實測值。** PDF 每一頁都標了這句，
 *    網頁上也必須標。任何一個數字都不可以在文案裡被寫成「實測」「保證」「可達成」。
 * 2. **PDF 寫「資料未載」「單位未載」的欄位，這裡就填 null，網頁顯示「產品文件未載」。**
 *    不要自己補一個看起來合理的數字——那正是站上內容誠信閘門在擋的東西。
 *    若 PDF 有寫數字但不合格（例如標了範圍卻沒標單位），值仍然填 null，
 *    原始字串放進 `sourceNote`。**`sourceNote` 只能當註腳顯示，不可以渲染成規格值、
 *    不可以進 schema。** 這條是 2026-08-20 跨模型稽核抓到的：我原本把
 *    「90–170，單位未載」留在 value 裡，等於規則說 null、資料卻留著數字，
 *    文案照樣可以拿去用。
 * 3. **不放價格。** 業主 2026-08-19 定：WEB 不出現金額。規格頁一律導向洽詢，不給數字。
 * 4. **質性宣稱與比較級也要有出處，不是只管數字。**（2026-08-20 補）
 *    「最大／最窄／唯一／適合半戶外／適合連續出餐」這類話不含數字，前三條都管不到，
 *    但它們一樣是可被檢驗的宣稱。規則：**寫得出 PDF 頁碼才能留，寫不出就刪。**
 *    PDF 原文寫的比較級，敘述時要帶出處語氣（「產品文件標示為三款中容量最大」），
 *    不要改寫成我方的斷言（「容量最大」）。
 *    ⚠️ 特別注意 FM32L 的「容量最大」：PDF 這樣寫，但它的容量數字沒有單位，
 *    所以這個比較級在 PDF 內部就缺乏可比基礎。頁面上只能引述，不可當賣點主打。
 */

export type SeriesKey = 'frozen-microwave' | 'freezer'

export interface SpecRow {
  label: string
  /** null = PDF 標示「資料未載」，網頁顯示「產品文件未載」 */
  value: string | null
  /**
   * 來源註記。**只能顯示為註腳，不可以被渲染成規格值、不可以進 schema 的
   * additionalProperty。** 用來保存「PDF 有寫但不合格」的原始字串，
   * 例如標了數字卻沒標單位——那種值不可以當規格用，但也不該從紀錄裡消失。
   */
  sourceNote?: string
}

export interface Model {
  /** URL slug，同時是型號的小寫形式 */
  slug: string
  /** 型號，例如 MCS-FM55 */
  code: string
  /** 頁面 H1 用的完整品名 */
  name: string
  /** 一句話定位，用在列表卡片與 meta description 開頭 */
  positioning: string
  series: SeriesKey
  /** 這款「跟其他款差在哪」——選型頁的比較依據 */
  differentiator: string
  /** 適合先評估的場域方向（不是承諾，是評估起點） */
  evaluateFor: string
  specs: SpecRow[]
  /** 本款獨有配置（PDF 的「機型差異」段落） */
  uniqueFeatures: string[]
  /**
   * 本款規格在來源 PDF 的頁碼。
   * 2026-08-20 跨模型稽核時，Codex 把五句 `positioning`／`evaluateFor` 判為
   * 「超出 PDF 明載範圍的營運推論」。逐句回查後五句裡有四句其實是 PDF 原文
   * （半戶外 p9、容量最大 p2/p6、單點試點 p12、人流快速通過 p9），
   * 只有一句是我自己加的。加這個欄位就是為了讓下一次爭議能直接翻頁查證，
   * 而不是靠記憶或推測。
   */
  sourcePage: number
}

/** 全系列共同的免責，每一頁都要出現 */
export const DISCLAIMER =
  '本頁數值為設備規格標示值，非本公司實測值。本產品文件未載明溫度數值的量測工況（環境溫度、滿載狀態、開門頻率），' +
  '加熱秒數依商品與初始溫度而異，容量須經貴方商品適配測試後才成為可承諾數字。' +
  '設備持續改版，實際交付規格以雙方簽署之訂單或合約為準。'

export const SERIES = {
  'frozen-microwave': {
    key: 'frozen-microwave' as const,
    name: '冷凍微波系列',
    code: 'FM',
    oneLiner: '冷凍保存、下單才加熱，機台不需長時間保溫待售。',
    chooseWhen: '需要現場加熱出餐',
  },
  freezer: {
    key: 'freezer' as const,
    name: '冷凍系列',
    code: 'FZ',
    oneLiner: '純冷凍販售，適合冰品、肉品與冷凍食品。',
    chooseWhen: '只賣冰品或冷凍食品，不需加熱',
  },
}

export const MODELS: Model[] = [
  // ── 冷凍微波系列 ─────────────────────────────────────────────
  {
    slug: 'mcs-fm55',
    sourcePage: 4,
    code: 'MCS-FM55',
    name: 'MCS-FM55 冷凍微波智能販賣機',
    positioning: '55 吋廣告版位＋履帶貨道，販售與廣告曝光同時經營',
    series: 'frozen-microwave',
    differentiator: '本系列唯一配置 55 吋獨立廣告螢幕，操作介面另有 21.5 吋觸控',
    evaluateFor: '有廣告版位需求的高人流場域',
    specs: [
      { label: '溫控範圍', value: '-18 °C ～ 25 °C' },
      { label: '加熱方式', value: '微波加熱，標示 90 秒' },
      { label: '商品容量', value: '48 ～ 140 盒' },
      { label: '貨道型式', value: '履帶貨道' },
      { label: '商品尺寸', value: '最大 220×175×75 mm／最小 190×115×65 mm' },
      { label: '顯示螢幕', value: '55 吋廣告屏＋21.5 吋電容觸控' },
      { label: '機身尺寸', value: '1,780 × 1,123 × 2,040 mm' },
      { label: '機台重量', value: null },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '加熱 3,750W／製冷 1,800W' },
    ],
    uniqueFeatures: ['55 吋獨立廣告版位', '感應式金融卡／信用卡與行動支付錢包（台灣介接待確認）'],
  },
  {
    slug: 'mcs-fm32',
    sourcePage: 5,
    code: 'MCS-FM32',
    name: 'MCS-FM32 雙微波冷凍微波智能販賣機',
    positioning: '雙微波模組，適合連續出餐的用餐尖峰場域',
    series: 'frozen-microwave',
    differentiator: '本系列唯一配置兩組微波模組，可同時作業',
    evaluateFor: '尖峰時段需要連續出餐的場域',
    specs: [
      { label: '溫控範圍', value: '-18 °C' },
      { label: '加熱方式', value: '雙微波模組 ×2，標示 90 秒' },
      { label: '商品容量', value: '60 ～ 84 盒' },
      { label: '貨道型式', value: null },
      { label: '商品尺寸', value: '最大 225×125×75 mm／最小 80×80×40 mm' },
      { label: '顯示螢幕', value: '32 吋觸控' },
      { label: '機身尺寸', value: '1,485 × 1,095 × 2,060 mm' },
      { label: '機台重量', value: '750 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '整機 8,500 W' },
    ],
    uniqueFeatures: ['雙微波模組並行作業', '整體發泡保溫箱體', '無現金支付（台灣介接待確認）'],
  },
  {
    slug: 'mcs-fm32l',
    sourcePage: 6,
    code: 'MCS-FM32L',
    name: 'MCS-FM32L 深冷大容量冷凍微波智能販賣機',
    positioning: '產品文件標示為三款中機身最窄、容量最大、溫域最低',
    series: 'frozen-microwave',
    differentiator: '溫域可調至 -26 °C，加熱標示秒數最短，機身最窄',
    evaluateFor: '空間受限的場域（容量比較請見下方註記，產品文件未載單位）',
    specs: [
      { label: '溫控範圍', value: '-26 °C ～ 10 °C 可調' },
      { label: '加熱方式', value: '微波加熱，標示 75 秒' },
      { label: '商品容量', value: null, sourceNote: '產品文件標示 90–170，但未載單位，因此不作為容量規格使用；實際數量以商品適配測試為準。' },
      { label: '貨道型式', value: '履帶貨道' },
      { label: '商品尺寸', value: '最大 180×180×70 mm／最小 100×100×40 mm' },
      { label: '顯示螢幕', value: '32 吋觸控' },
      { label: '機身尺寸', value: '1,370 × 1,280 × 1,940 mm' },
      { label: '機台重量', value: '400 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '加熱 3,750 W' },
    ],
    uniqueFeatures: [
      '三款中溫域最低、機身最窄',
      '整體發泡保溫箱體',
      '感應式金融卡／信用卡（VISA／Master／AMEX）與行動支付錢包（台灣介接待確認）',
    ],
  },

  // ── 冷凍系列 ─────────────────────────────────────────────────
  {
    slug: 'mcs-fz21',
    sourcePage: 8,
    code: 'MCS-FZ21',
    name: 'MCS-FZ21 冷凍智能販賣機（標準款）',
    positioning: '45 貨道標準款，冰品、肉品與冷凍食品通用',
    series: 'freezer',
    differentiator: '五款中唯一配置重量感測',
    evaluateFor: '冰品、肉品與冷凍食品通用的標準配置（PDF 未載特定場域建議）',
    specs: [
      { label: '最低溫度', value: '-25 °C' },
      { label: '貨道數', value: '45（履帶／螺旋）' },
      { label: '商品容量', value: '270 ～ 500' },
      { label: '適用商品', value: '冰品／肉品／冷凍食品' },
      { label: '取貨方式', value: '外開門（標示可避免壓損）' },
      { label: '顯示螢幕', value: '21.5 吋電容觸控' },
      { label: '機身尺寸', value: '1,375 × 875 × 1,960 mm' },
      { label: '機台重量', value: '470 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '1,200 W' },
    ],
    uniqueFeatures: ['重量感測', '智能升降取物', '整體發泡保溫箱體', '玻璃除霧'],
  },
  {
    slug: 'mcs-fz21s',
    sourcePage: 9,
    code: 'MCS-FZ21S',
    name: 'MCS-FZ21S 冷凍智能販賣機（保溫取貨箱）',
    positioning: '內推門一次取出＋保溫取貨箱，取貨動線最短',
    series: 'freezer',
    differentiator: '五款中唯一配置保溫取貨箱與全鋼加厚機身',
    evaluateFor: '人流快速通過、或需評估半戶外遮蔽的點位',
    specs: [
      { label: '最低溫度', value: '-25 °C' },
      { label: '貨道數', value: '45（履帶／螺旋）' },
      { label: '商品容量', value: '270 ～ 500' },
      { label: '適用商品', value: '冰品／肉品／冷凍食品' },
      { label: '取貨方式', value: '內推門一次取出＋保溫取貨箱' },
      { label: '顯示螢幕', value: '21.5 吋觸控' },
      { label: '機身尺寸', value: '1,375 × 875 × 1,960 mm' },
      { label: '機台重量', value: '420 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '1,200 W' },
    ],
    uniqueFeatures: ['保溫取貨箱', '全鋼加厚機身', '防盜護板', '整體發泡保溫箱體'],
  },
  {
    slug: 'mcs-fz21x',
    sourcePage: 10,
    code: 'MCS-FZ21X',
    name: 'MCS-FZ21X 冷凍智能販賣機（側面取貨）',
    positioning: '側面取貨口直接取用，貨道數最多的一款',
    series: 'freezer',
    differentiator: '54 貨道，五款中最多；側面取貨口',
    evaluateFor: '品項數需求高、且動線允許較寬機身的點位',
    specs: [
      { label: '最低溫度', value: '-25 °C' },
      { label: '貨道數', value: '54（履帶／螺旋）' },
      { label: '商品容量', value: '270 ～ 500' },
      { label: '適用商品', value: '冰品／肉品／冷凍食品' },
      { label: '取貨方式', value: '側面取貨口直接取用' },
      { label: '顯示螢幕', value: '21.5 吋電容觸控' },
      { label: '機身尺寸', value: '1,420 × 982 × 1,960 mm（五款中最寬）' },
      { label: '機台重量', value: '470 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '1,200 W' },
    ],
    uniqueFeatures: ['54 貨道（系列最多）', '側面取貨口', '防盜護板', '智能升降取物'],
  },
  {
    slug: 'mcs-fz49',
    sourcePage: 11,
    code: 'MCS-FZ49',
    name: 'MCS-FZ49 冷凍智能販賣機（49 吋廣告屏）',
    positioning: '49 吋大螢幕輪播廣告，販售與曝光同時經營',
    series: 'freezer',
    differentiator: '冷凍系列唯一配置 49 吋廣告螢幕與光電落貨偵測',
    evaluateFor: '想把設備同時當成廣告版位的高人流場域',
    specs: [
      { label: '最低溫度', value: '-25 °C' },
      { label: '貨道數', value: '5 層 × 9 道（預設配置）' },
      { label: '商品容量', value: '270 ～ 500' },
      { label: '適用商品', value: '冰品／肉品／冷凍食品' },
      { label: '取貨方式', value: '外開門（標示可避免壓損）' },
      { label: '顯示螢幕', value: '49 吋觸控' },
      { label: '機身尺寸', value: '1,163 × 944 × 1,960 mm' },
      { label: '機台重量', value: '470 kg' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '1,200 W' },
    ],
    uniqueFeatures: ['49 吋輪播廣告螢幕', '光電落貨偵測', '整體發泡保溫箱體'],
  },
  {
    slug: 'mcs-fz10',
    sourcePage: 12,
    code: 'MCS-FZ10',
    name: 'MCS-FZ10 冷凍智能販賣機（窄機身）',
    positioning: '機身寬 850 mm，五款中最窄、最輕，佈點最靈活',
    series: 'freezer',
    differentiator: '寬 850 mm、340 kg，五款中最窄最輕',
    evaluateFor: '空間受限的單點試點',
    specs: [
      { label: '最低溫度', value: '-25 °C' },
      { label: '貨道數', value: '30（履帶／螺旋）' },
      { label: '商品容量', value: '150 ～ 330' },
      { label: '適用商品', value: '冰品（本款規格僅標示冰品，其他冷凍品項須另行確認）' },
      { label: '取貨方式', value: '外開門（標示可避免壓損）' },
      { label: '顯示螢幕', value: '10 吋觸控' },
      { label: '機身尺寸', value: '850 × 930 × 1,960 mm（五款中最窄）' },
      { label: '機台重量', value: '340 kg（五款中最輕）' },
      { label: '電源', value: 'AC110~240V 50/60Hz' },
      { label: '功率', value: '1,200 W' },
    ],
    uniqueFeatures: ['寬 850 mm 最窄機身', '防盜護板', '智能升降取物'],
  },
]

/** 冷凍系列五款共同具備 */
export const FREEZER_COMMON = [
  '智能升降取物',
  '整體發泡保溫箱體',
  '玻璃除霧',
  '遠端監控（Telemetry）',
  '紙鈔、硬幣與無現金支付介面（台灣介接待確認）',
  '多國語系介面',
]

/** 冷凍微波系列三款共同具備 */
export const FM_COMMON = [
  '臭氧殺菌（櫃內儲存環境）',
  '商品到期自動告警並停售',
  '遠端監控（Telemetry）',
  '取餐門',
]

/** 導入程序（PDF p13） */
export const ADOPTION_STEPS = [
  '規格初選',
  '貴方商品適配測試',
  '低溫取貨機構與溫控實測',
  '台灣支付與系統介接確認',
  '雙方確認交付規格與驗收條件',
]

export const getModel = (slug: string) => MODELS.find(m => m.slug === slug)
export const modelsBySeries = (s: SeriesKey) => MODELS.filter(m => m.series === s)
