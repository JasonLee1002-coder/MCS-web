export interface Product {
  id: string
  name: string
  tagline: string
  description: string
  image: string
  specs: { label: string; value: string }[]
  targetRoles: ('venue' | 'brand' | 'franchise' | 'custom')[]
  highlight: string
}

export const products: Product[] = [
  {
    id: 'grabox',
    name: 'GraBox 自助取餐櫃',
    tagline: '讓取餐等待，成為過去式',
    description: '智能保溫格層，LINE / APP 掃碼取餐，與 POS 系統無縫整合。適合餐飲連鎖、美食外送、辦公室供餐。',
    image: '/images/products/grabox.jpg',
    specs: [
      { label: '格層', value: '12 / 24 / 36 格（可選）' },
      { label: '保溫', value: '40°C–75°C 精準控溫' },
      { label: '取餐', value: 'QR Code / NFC / APP' },
      { label: '尺寸', value: 'W900 × D600 × H1800 mm' },
    ],
    targetRoles: ['venue', 'brand', 'franchise'],
    highlight: '尖峰出餐效率 +40%',
  },
  {
    id: 'frozen-vending',
    name: '冷凍微波販賣機',
    tagline: '24 小時，熱食隨時有',
    description: '內建微波爐，冷凍食品即買即熱。適合交通樞紐、醫院、校園、24 小時場域。',
    image: '/images/products/frozen-vending.jpg',
    specs: [
      { label: '容量', value: '60–120 個品項' },
      { label: '溫度', value: '-18°C 冷凍保鮮' },
      { label: '加熱', value: '內建微波 90 秒' },
      { label: '支付', value: '信用卡 / LINE Pay / 悠遊卡' },
    ],
    targetRoles: ['venue', 'franchise'],
    highlight: '無人化 24hr 熱食供應',
  },
  {
    id: 'smart-vending',
    name: '智慧販賣機（標準款）',
    tagline: '你的品牌，智能上架',
    description: '模組化設計，支援飲料、零食、保健品、生活用品上架。品牌商專屬貼牌，OmniCore 後台即時監控。',
    image: '/images/products/smart-vending.jpg',
    specs: [
      { label: '格層', value: '可客製 5–10 排' },
      { label: '溫控', value: '常溫 / 冷藏 / 冷凍（可選）' },
      { label: '螢幕', value: '21.5 吋廣告觸控螢幕' },
      { label: '後台', value: 'OmniCore 即時庫存 + 銷售報表' },
    ],
    targetRoles: ['brand', 'franchise', 'custom'],
    highlight: '品牌廣告 + 銷售一體',
  },
]
