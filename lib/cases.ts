export type CaseSize = 'hero' | 'medium' | 'small'

export interface Case {
  id: string
  title: string
  client: string
  category: '辦公室' | '餐飲連鎖' | '交通樞紐' | '校園' | '場館' | '零售'
  description: string
  image: string
  videoUrl?: string
  size: CaseSize
  metrics?: { label: string; value: string }[]
}

export const cases: Case[] = [
  {
    id: 'mcdiner',
    title: '麥味登早餐連鎖導入 GraBox',
    client: '麥味登',
    category: '餐飲連鎖',
    description: '全台 200+ 門市，GraBox 自助取餐讓顛峰時段出餐效率提升 40%',
    image: '/mcs-brand.jpg',
    size: 'hero',
    metrics: [
      { label: '導入門市', value: '200+' },
      { label: '出餐效率', value: '+40%' },
      { label: '客訴率', value: '-60%' },
    ],
  },
  {
    id: 'familymart',
    title: '全家便利商店智慧取餐試點',
    client: '全家',
    category: '零售',
    description: '指定門市試行 GraBox，整合 POS 系統，提升自助取餐比例',
    image: '/mcs-partner.jpg',
    size: 'medium',
  },
  {
    id: 'japan-highway',
    title: '日本首都高速服務區',
    client: '首都高速株式會社',
    category: '交通樞紐',
    description: '冷凍微波販賣機進駐高速公路服務區，24 小時無人化服務',
    image: '/mcs-franchise.jpg',
    size: 'medium',
  },
  {
    id: 'office-park',
    title: '科學園區辦公室部署',
    client: '富田電機 / 竹科',
    category: '辦公室',
    description: '企業員工餐飲自助解決方案，節省 30% 餐飲空間成本',
    image: '/mcs-venue.jpg',
    size: 'small',
  },
  {
    id: 'sports-venue',
    title: '展望運動場館',
    client: '展望運動',
    category: '場館',
    description: '運動後補給站，冷飲 + 輕食 24 小時自助供應',
    image: '/mcs-omnicore.jpg',
    size: 'small',
  },
]
