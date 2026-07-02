# Yuzu AI 精靈 × 客戶導流系統 — mcstation.ai 設計規格

**日期：** 2026-07-02  
**執行者：** Yuzu-san  
**狀態：** 待實作  
**參考：** 與 transtep.com spec 同架構，品牌改為銓幻元

---

## 1. 目標

用戶從 Google 搜尋「蒸氣拉麵機」「冷凍微波機」「智取櫃」等關鍵字進入 mcstation.ai 後，由 AI 對話視窗接手，收集場域需求，自動送入 Notion CRM 並透過 LINE 即時通知。

**替代現有流程：** 用戶看 ai-advisor 5 題問卷 → 改為真正 AI 自由對話

---

## 2. 範圍

### 2a. 替換現有 /ai-advisor 頁（Week 1）
- 現有 `app/ai-advisor/page.tsx` 是靜態 5 題問卷
- 替換為 `AIChatWindow`（真 AI 對話，Gemini 3.5 Flash）

### 2b. 首頁 + 產品頁加入浮動按鈕（Week 1）
- `app/page.tsx`、`app/products/` 等頁面右下角加浮動 AI 顧問按鈕

### 2c. SEO 著陸頁（Week 2）
| 路徑 | 關鍵字 |
|------|--------|
| `/solutions/steam-ramen` | 蒸氣拉麵機 |
| `/solutions/steam-bento` | 蒸氣便當 |
| `/solutions/frozen-microwave` | 冷凍微波機 |
| `/solutions/smart-locker` | 智慧取物櫃 |
| `/solutions/ai-labor` | AI 勞動力 |
| `/solutions/ghost-kitchen` | 幽靈廚房設備 |

---

## 3. 架構

```
用戶進入頁面
  → <AIChatWindow keyword="蒸氣拉麵機" brand="mcstation" sourceSlug="/solutions/steam-ramen" />
  → useChat({ transport: new DefaultChatTransport({ api: '/api/chat', body: { keyword, brand, sourceUrl } }) })
  → POST /api/chat
      ├─ streamText (gateway('google/gemini-3.5-flash'))
      ├─ system prompt（銓幻元品牌）
      └─ tool: summarize_lead（AI 收集完資訊後呼叫）
  → AI 主動開場（依 keyword 客製）
  → 自由對話最多 6 輪
  → AI 呼叫 summarize_lead → 前端渲染 <LeadConfirmCard>
  → 用戶選擇聯絡方式（LINE / 電話 / Email）
  → 「修改」回退對話 or 「確認送出」
  → POST /api/ai-consult（現有接口）
      ├─ Notion CRM 自動建案（來源：mcstation.ai）
      └─ Yuzu LINE 推播給 Jason
```

---

## 4. 檔案結構

**注意：mcstation 專案無 `src/` 前綴，直接是 `app/`, `components/`, `lib/`**

```
components/
  AIChatWindow.tsx         ← 新建（與 transtep 版相同，brand 預設 mcstation）
  LeadConfirmCard.tsx      ← 新建（與 transtep 版相同）
lib/
  chat-config.ts           ← 新建（與 transtep 版相同，含銓幻元 system prompt）
app/
  api/
    chat/
      route.ts             ← 新建（與 transtep 版相同）
  ai-advisor/
    page.tsx               ← 修改：靜態問卷 → AIChatWindow
  solutions/
    [keyword]/
      page.tsx             ← 新建：6 個 SEO 著陸頁 + generateStaticParams
```

**可直接從 transtep.com 複製的檔案（不需修改）：**
- `components/LeadConfirmCard.tsx`
- `lib/chat-config.ts`（銓幻元 prompt 已包含在內）
- `app/api/chat/route.ts`

**只需改 brand 預設值的檔案：**
- `components/AIChatWindow.tsx`：將 `brand = 'longcloud'` 改為 `brand = 'mcstation'`

---

## 5. API 規格（與 transtep.com 完全相同）

### POST /api/chat

**Request body：**
```ts
{
  messages: UIMessage[]
  keyword: string
  brand: 'longcloud' | 'mcstation'
  sourceUrl: string
}
```

**Model：** `google/gemini-3.5-flash`（Vercel AI Gateway）

**Tool：**
```ts
summarize_lead: tool({
  inputSchema: z.object({
    venue: z.string(),
    need: z.string(),
    headcount: z.string().optional(),
    name: z.string(),
    contact: z.string(),
    contactMethod: z.enum(['LINE', '電話', 'Email']),
    institution: z.string().optional(),
  }),
  execute: async (input) => ({ ...input, confirmed: false }),
})
```

### POST /api/ai-consult（現有，不修改）

新增欄位：
```ts
{
  // 現有欄位保留...
  contactMethod: string,  // 新增
  aiSummary: string,      // 新增：完整對話紀錄
  sourceUrl: string,      // 來源頁面
}
```

Notion `來源網站` 欄位填入 `'mcstation.ai'`（與 transtep 的 `'李奇申.com'` 區分）

---

## 6. 銓幻元品牌 System Prompt

```
你是銓幻元科技的 AI 顧問助理。
專長：智取物流櫃、冷凍微波機、蒸氣加熱設備、AI 無人餐飲、幽靈廚房設備。
用戶從關鍵字「{keyword}」進入 mcstation.ai。

請主動以相關問題開場，依序了解：
1. 場域類型（餐廳/幽靈廚房/工廠/醫療/校園/商辦）
2. 核心需求（取餐/加熱/冷凍儲存/AI 無人化）
3. 每日出餐量或人流
4. 公司/品牌名稱
5. 聯絡人姓名與偏好聯絡方式（LINE/電話/Email）

收集完以上資訊後，呼叫 summarize_lead 工具。

規則：
- 每次只問一個問題，不超過 3 句
- 語氣科技感、簡潔有力，繁體中文
- 不主動報價或承諾交期
- 不討論競爭對手
```

---

## 7. SEO 著陸頁規格（/solutions/[keyword]）

```typescript
const SOLUTIONS = [
  { keyword: 'steam-ramen',      label: '蒸氣拉麵機',  title: '蒸氣拉麵機自助加熱解決方案' },
  { keyword: 'steam-bento',      label: '蒸氣便當',    title: '蒸氣便當無人加熱設備' },
  { keyword: 'frozen-microwave', label: '冷凍微波機',  title: '冷凍微波機 24 小時餐食方案' },
  { keyword: 'smart-locker',     label: '智慧取物櫃',  title: '智慧取物櫃無人取餐系統' },
  { keyword: 'ai-labor',         label: 'AI 勞動力',   title: 'AI 勞動力降低餐飲人力成本' },
  { keyword: 'ghost-kitchen',    label: '幽靈廚房設備', title: '幽靈廚房 AI 設備整合方案' },
];

export function generateStaticParams() {
  return SOLUTIONS.map(s => ({ keyword: s.keyword }));
}
```

**必須加 `generateStaticParams`**，否則 Vercel SSR 影響 SEO 爬取。

---

## 8. 安全與費用控制

| 項目 | 設計 |
|------|------|
| Rate limiting | Next.js middleware，IP 每小時 20 次（與 transtep 共用邏輯） |
| 費用估算 | gemini-3.5-flash 約 $0.005/對話，1 萬次 = $50 |
| Budget alert | Vercel AI Gateway Dashboard 設定上限 |
| 惡意輸入 | system prompt 明確限制範圍 |

---

## 9. 不在本次範圍

- 現有 `/api/ai-advisor` route 保留不動（相容舊 /ai-advisor 頁的 API）
- mcstation.ai 多語系（繁中優先）
- 業務追蹤 Notion Dashboard（後續）
