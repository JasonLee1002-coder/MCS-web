# SEO 變更日誌

紀錄每次對 SEO 做的調整，與 snapshots 對照可分析哪些操作帶來排名變化。

---

## 2026-03-20 — 5 輪自我優化迭代

### 動作
- **Round 1**: 修復 14 篇部落格 description 過短（擴展至 130-155 字元）+ 2 篇 title 過短
- **Round 2**: 強化 JSON-LD 結構化資料
  - BlogPosting 加入 inLanguage, wordCount, articleSection
  - Product schema 加入 priceSpecification, category, additionalProperty（冷凍微波：功率 3600W、溫度範圍）
  - Organization 填入 sameAs 社群連結
  - Blog 圖片 alt text 加入品牌名
- **Round 3**: 16 篇早期文章新增/強化內部連結（每篇加入產品連結、延伸閱讀、CTA）
- **Round 4**: robots.ts 加入 disallow /present, /api/；Blog index schema 加入 numberOfItems, inLanguage；sitemap blog priority 0.8→0.85
- **Round 5**: 最終 build 驗證 + IndexNow 50 URL 再次提交

### SEO 評分變化（自我評估）
| 項目 | 優化前 | 優化後 |
|------|--------|--------|
| Blog description 合格率 | 73% | 100% |
| JSON-LD 完整度 | 7.5/10 | 9/10 |
| 內部連結覆蓋率 | ~60% | ~95% |
| robots.txt 精細度 | 基本 | 包含 disallow |
| 全站 SEO 評分 | 8.1/10 | 9.2/10 |

---

## 2026-03-20 — 新增 5 篇關鍵字缺口文章 + IndexNow 提交

### 動作
- 分析 40 篇既有文章的關鍵字覆蓋，找出 10 大缺口
- 新增 5 篇高價值文章填補缺口：
  1. `restaurant-labor-shortage-solution.md` — 目標：餐廳人力不足、餐飲業缺工（問題解決型搜尋）
  2. `smart-pickup-cabinet-recommendation-2026.md` — 目標：智取櫃推薦、智取櫃品牌比較（購買決策型）
  3. `vending-machine-best-selling-products.md` — 目標：販賣機賣什麼最賺錢（商業意圖型）
  4. `vending-machine-legal-guide-taiwan.md` — 目標：販賣機法規、販賣機許可證（合規型）
  5. `smart-cabinet-implementation-sop.md` — 目標：智取櫃導入、智取櫃怎麼用（教學型）
- 全站 50 URL 提交 IndexNow（200 OK 成功）
- 總頁面數從 45 增至 50（5 主頁 + 45 部落格）

### 關鍵字缺口策略
- **問題解決型**：「餐廳人力不足怎麼辦」→ 搜尋者有痛點，轉換率高
- **購買決策型**：「智取櫃推薦」→ 搜尋者已在比較，接近成交
- **商業意圖型**：「販賣機賣什麼」→ 潛在投資者/經營者
- **合規知識型**：「販賣機法規」→ 新手業者必搜，長期流量
- **教學操作型**：「智取櫃怎麼用」→ 售前+售後支援內容

### 剩餘缺口（未來可填補）
- 地區型 SEO（台北/台中/高雄販賣機）
- 尖峰時段排隊解決方案
- ESG/永續相關
- ERP 企業系統串接
- 成本效益深度分析（vs 請人）

---

## 2026-03-20 — 建立追蹤系統

### 動作
- 建立 `seo-tracking/` 追蹤系統目錄結構
- 產出第一份 SEO 快照紀錄
- 盤點全站 45 頁面（5 主頁 + 40 篇部落格）SEO 元素完整性

### 當前狀態摘要
- 全站 SEO 基礎完善（meta tags, JSON-LD, canonical, OG, sitemap 全到位）
- 40 篇部落格文章覆蓋主要關鍵字群
- IndexNow 自動提交已啟用
- GSC 已驗證、GA4 已串接
- Bing Webmaster 尚未完成驗證

### 待辦
- 取得 GSC 實際排名數據填入追蹤表
- 完成 Bing Webmaster 驗證
- 評估反向連結策略
