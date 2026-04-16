# SEO 變更日誌

紀錄每次對 SEO 做的調整，與 snapshots 對照可分析哪些操作帶來排名變化。

---

## 2026-04-17 — 第十一波：FAQPage×15 + 3 新文章 + 交叉連結

### Round 1 — FAQPage 批量擴充（15 篇）

為以下文章加入 FAQ frontmatter（各 4 個 Q&A）：
`oriental-beauty`、`convenience-store-smart-pickup-cabinet`、`digital-transformation-restaurant-2026`、`esg-sustainable-vending-machine`、`vending-machine-data-analytics-ai`、`community-unmanned-store-guide`、`taiwan-vending-machine-brands-comparison-2026`、`smart-pickup-cabinet-brand-comparison`、`office-unmanned-store-vending-solution`、`hotel-self-checkin-kiosk`、`smart-restaurant-equipment-guide`、`bento-fresh-food-vending-machine-guide`、`retail-channel-vending-machine-strategy`、`frozen-vending-machine-no-microwave-guide`、`vending-machine-payment-integration`

累計 FAQPage 啟用：52 篇（全站 78 篇的 67%）

### Round 2 — 3 篇填補高意圖缺口的新文章

- `kiosk-self-ordering-complete-guide-2026.md` — 「Kiosk自助點餐機完整指南」（呼應新服務，建立新類別）
- `vending-machine-transportation-hub-strategy.md` — 「高鐵/捷運/機場販賣機設置攻略」（交通樞紐地點型SEO）
- `vending-machine-vs-open-shop-cost-comparison.md` — 「開店vs買販賣機：2026創業成本大比拼」（最高商業意圖）

### Round 3 — 交叉連結 + 收尾

- 4 篇舊文章加入延伸閱讀連結指向新文章
- Build 驗證 ✅（95 頁面全通過）
- IndexNow ✅ 200 OK

### SEO 評分
| 項目 | 04-09c | 04-17 |
|------|--------|-------|
| 總頁面數 | 79 | 82 |
| FAQPage 啟用數 | 37 篇 | 52 篇 |
| FAQPage 覆蓋率 | 50% | 67% |
| 全站評分 | 9.75/10 | 9.8/10 |

---

## 2026-04-09b — 第十波：第二輪三波循環（FAQPage ×11 + 3 新文章 + YAML 修復）

### Round 1 — FAQPage 大規模批量擴展（11 篇）
為以下文章加入 FAQ frontmatter（各 4 個 Q&A）：
`restaurant-labor-shortage-solution`、`vending-machine-location-strategy`、`grabox-vs-traditional-pickup`、`smart-vending-machine-roi-analysis`、`vending-machine-vs-hiring-cost-analysis`、`smart-vending-machine-maintenance-guide`、`vending-machine-legal-guide-taiwan`、`brunch-chain-smart-cabinet-solution`、`smart-cabinet-pos-kds-integration`、`vending-machine-startup-franchise-guide`、`smart-cabinet-implementation-sop`

累計 FAQPage 啟用：22 篇（全站 71 篇的 31%）

### Round 2 — 3 篇填補「評估猶豫期」的新文章
- `smart-cabinet-disadvantages-real-talk.md` — 「AI智取櫃缺點有哪些？」（主動掌握負面搜尋流量）
- `vending-machine-location-finding-guide.md` — 「販賣機怎麼找場地？申請管道與談判技巧」
- `frozen-vending-machine-buying-mistakes.md` — 「冷凍微波販賣機採購5大常見錯誤」

### Round 3 — 技術修復 + 收尾
- YAML 修復：`smart-cabinet-implementation-sop.md` 缺少結尾 `---`，已修復
- Build 驗證 ✅（88 頁面全通過）
- IndexNow ✅ 200 OK

### SEO 評分
| 項目 | 09a | 09b |
|------|-----|-----|
| FAQPage 啟用數 | 8 篇 | 22 篇 |
| 總頁面數 | 73 | 76 |
| 全站評分 | 9.7/10 | 9.7/10 |

---

## 2026-04-09 — 第九波：三輪檢討循環（FAQPage Schema + 3 新文章 + 交叉連結）

### 動作

**Round 1 — FAQPage Schema 基礎建設**
- `src/lib/blog.ts`：新增 `FaqItem` interface + `BlogPost.faq` 欄位支援
- `src/app/blog/[slug]/page.tsx`：自動渲染 FAQPage JSON-LD（當 faq 欄位存在時）
- 5 篇核心文章加入 FAQ frontmatter（各 4～5 Q&A）：
  - `what-is-smart-pickup-cabinet-grabox-complete-guide`（5 FAQ）
  - `frozen-microwave-vending-machine-complete-wiki`（5 FAQ）
  - `vending-machine-setup-cost-breakdown-2026`（5 FAQ）
  - `smart-pickup-cabinet-recommendation-2026`（4 FAQ）
  - `vending-machine-types-complete-list-2026`（4 FAQ）

**Round 2 — 3 篇新策略性文章（均含 FAQPage schema）**
- `grabox-ai-smart-cabinet-complete-wiki-2026.md` — GraBox 專屬 Wiki（填補重大缺口）
- `vending-machine-monthly-revenue-how-much.md` — 「販賣機一個月能賺多少？」月收益試算
- `smart-vending-machine-faq-complete-guide-2026.md` — 販賣機常見問題 Q&A 大全（24 個問題）

**Round 3 — 交叉連結 + 驗證**
- 4 篇舊文章延伸閱讀補連結指向新文章
- Build 驗證 ✅（85 頁面全通過）
- IndexNow ✅ 全站提交成功（200 OK）

### 策略依據
- FAQPage JSON-LD 是本輪最大突破：70 篇文章 0 個 FAQ schema → 5 篇啟用，架構完成後可快速擴展
- GraBox wiki 是填補既有缺口（冷凍微波有 wiki、GraBox 沒有）
- 月收益問題是高商業意圖關鍵字，搜尋者接近決策階段

### SEO 評分變化
| 項目 | 上次（04-07b） | 本次（04-09） |
|------|-------------|-------------|
| 總頁面數 | 70 | 73 |
| FAQPage schema | 0 篇 | 5 篇 |
| GraBox wiki | 0 篇 | 1 篇 |
| 月收益試算文章 | 0 篇 | 1 篇 |
| Q&A 大全文章 | 0 篇 | 1 篇 |
| 全站 SEO 評分 | 9.6/10 | 9.7/10 |

---

## 2026-04-07b — 第八波：問句型 SEO + Wiki 深度頁（5 篇）

### 動作
- **問句型 1**: `vending-machine-types-complete-list-2026.md` — 「台灣販賣機有哪些種類？」
- **問句型 2**: `vending-machine-setup-cost-breakdown-2026.md` — 「開一台要多少錢？費用大公開」
- **問句型 3**: `what-is-smart-pickup-cabinet-grabox-complete-guide.md` — 「智取櫃是什麼？完整說明」
- **Wiki 深度 1**: `frozen-microwave-vending-machine-complete-wiki.md` — 冷凍微波販賣機完整百科
- **問句型 4**: `taiwan-vending-machine-brands-comparison-2026.md` — 「台灣廠商有哪些？」
- **IndexNow** ✅ 全站提交成功
- **Build 驗證** ✅ 70 頁面全通過

### 策略依據
- 借鑑 jason-seo「無人商店有哪些？」排名 #5.1、曝光 255 次的成功案例
- MCS_web 原本 0 篇問句型文章，本波一次補 4 篇問句 + 1 篇 wiki

### SEO 評分變化
| 項目 | 上次（04-07a） | 本次（04-07b） |
|------|-------------|-------------|
| 總頁面數 | 65 | 70 |
| 問句型文章 | 0 篇 | 4 篇 |
| Wiki 深度頁 | 0 篇 | 1 篇 |
| 全站 SEO 評分 | 9.5/10 | 9.6/10 |

---

## 2026-04-07 — 第七波：地區型 SEO 擴充 + 內容缺口填補（5 篇）

### 動作
- **新文章 1**: `vending-machine-kaohsiung-southern-taiwan.md` — 高雄/台南/屏東地區型 SEO（南台灣）
- **新文章 2**: `vending-machine-hsinchu-tech-park.md` — 新竹竹科/中科科技園區型
- **新文章 3**: `vending-machine-taoyuan-airport-industrial.md` — 桃園工業區/機場/物流倉儲
- **新文章 4**: `residential-condo-vending-machine-revenue.md` — 管委會被動收入角度（補強社區★★）
- **新文章 5**: `hotel-guesthouse-smart-vending-solution.md` — 飯店旅宿 B2B（補強旅宿★★★）
- **IndexNow** ✅ 全站提交成功
- **Build 驗證** ✅ 65 頁面全通過

### 策略依據（借鑑 jason-seo 成功案例）
- jason-seo「社區販賣機」排名 #3.8，驗證社區主題有流量 → 補強社區文章
- 地區型文章目前僅台北/台中，南部+竹科+桃園是明顯缺口 → 一次補齊三地

### SEO 評分變化
| 項目 | 上次（04-04） | 本次（04-07） |
|------|-------------|-------------|
| 總頁面數 | 60 | 65 |
| 部落格文章數 | 55 | 60 |
| 地區型 SEO 覆蓋 | 1 篇（台北/台中） | 4 篇（+高雄/新竹/桃園） |
| 旅宿覆蓋 | 3 篇 ★★★ | 4 篇 ★★★★ |
| 社區覆蓋 | 2 篇 ★★ | 3 篇 ★★★ |
| 全站 SEO 評分 | 9.4/10 | 9.5/10 |

---

## 2026-04-04 — 第六波：5 輪檢討優化循環（全站關鍵字+結構+內容+連結）

### 動作
- **循環 1**: 14 篇關鍵字不足文章修復（7→10 個關鍵字/篇），新增 42 個長尾關鍵字
- **循環 2**: 主頁面 SEO 結構修復
  - 冷凍微波販賣機 title 加入品牌名「銓幻元科技」
  - 兩個產品頁 Product Schema Offer 加入 price 值（解決 rich snippet 無法觸發問題）
  - 兩個產品頁 priceSpecification 空殼移除
  - 兩個產品頁 BreadcrumbList 從 3 層修正為 2 層（消除重複 URL）
  - Cases 頁 description 從 171→80 字元（避免 SERP 截斷）
  - Organization sameAs 改為官網 URL（移除 GitHub repo）
  - Organization 移除個人 email 外洩
- **循環 3**: 5 篇新策略性 SEO 文章
  - `vending-machine-location-taipei-taichung.md` — 地區型 SEO（台北/台中）
  - `vending-machine-vs-hiring-cost-analysis.md` — 成本效益比較型
  - `esg-sustainable-vending-machine.md` — ESG 永續趨勢型
  - `queue-solution-smart-pickup-cabinet.md` — 排隊痛點解決型
  - `vending-machine-startup-franchise-guide.md` — 創業加盟商業意圖型
  - 總部落格文章數：50 → 55 篇
- **循環 4**: 內部連結大規模強化
  - 4 篇文章新增延伸閱讀 section（原本完全沒有）
  - 6 篇既有文章追加 2-3 條新連結
  - 新增 30+ 條交叉引用連結
- **循環 5**: Build 驗證（72 頁面全通過）+ SEO 快照 + IndexNow 提交

### 關鍵字缺口填補策略
| 缺口類型 | 嚴重度 | 填補文章 | 搜尋意圖 |
|---------|--------|---------|---------|
| 地區型 SEO | 嚴重（0 篇） | vending-machine-location-taipei-taichung | 在地搜尋 |
| 成本效益比較 | 嚴重（0 篇） | vending-machine-vs-hiring-cost-analysis | 決策比較 |
| ESG/永續 | 嚴重（0 篇） | esg-sustainable-vending-machine | 趨勢搜尋 |
| 排隊解決方案 | 中度（0 篇） | queue-solution-smart-pickup-cabinet | 痛點搜尋 |
| 創業/加盟 | 中度（0 篇） | vending-machine-startup-franchise-guide | 商業意圖 |

### SEO 評分變化
| 項目 | 上次（03-28） | 本次（04-04） |
|------|-------------|-------------|
| 總頁面數 | 55 | 60 |
| 部落格文章數 | 50 | 55 |
| 關鍵字 <8 的文章 | 14 篇 | 0 篇 |
| Product Schema 有效 | ❌ 無價格值 | ✅ 有效 Offer |
| BreadcrumbList 正確 | ❌ 重複 URL | ✅ 2 層結構 |
| 無延伸閱讀的文章 | 4+ 篇 | 0 篇 |
| 地區型 SEO 覆蓋 | 0 篇 | 1 篇 |
| ESG 覆蓋 | 0 篇 | 1 篇 |
| 全站 SEO 評分 | 9.0/10 | 9.4/10 |

---

## 2026-03-28 — 第五波：內容擴充 + 技術改善（Rounds 20-22）

### 動作
- **Round 20**: 5 篇新部落格文章填補關鍵受眾缺口
  - `retail-channel-vending-machine-strategy.md` — 零售通路（百貨/商場/量販店）策略指南
  - `frozen-food-brand-direct-sales-vending.md` — 冷凍食材品牌直營通路轉型
  - `community-unmanned-store-guide.md` — 社區無人商店建置實戰指南
  - `ai-dynamic-pricing-sales-prediction-vending.md` — AI 銷售預測與動態補貨
  - `bento-fresh-food-vending-machine-guide.md` — 便當鮮食販賣機營運全攻略
  - 總部落格文章數：45 → 50 篇
- **Round 21**: 技術改善
  - 新增全站 Error Boundary（src/app/error.tsx）
  - Contact 表單升級為 AJAX 提交 + 成功/錯誤/送出中狀態回饋
  - 驗證 7 篇核心 blog 文章的 /cases 內部連結完整性
- **Round 22**: Build 驗證（66 頁面全部通過）+ SEO 快照 + IndexNow 提交

### 內容策略缺口填補
| 受眾缺口 | 嚴重度 | 填補文章 |
|---------|--------|---------|
| 零售通路（百貨/商場/量販） | 嚴重 | retail-channel-vending-machine-strategy |
| 冷凍食材品牌直銷 | 嚴重 | frozen-food-brand-direct-sales-vending |
| 社區/住宅無人商店 | 中度 | community-unmanned-store-guide |
| AI/數據驅動營運 | 中度 | ai-dynamic-pricing-sales-prediction-vending |
| 便當/鮮食無人販售 | 中度 | bento-fresh-food-vending-machine-guide |

### SEO 評分變化
| 項目 | Round 19 後 | Round 22 後 |
|------|-------------|-------------|
| 總頁面數 | 50 | 55 |
| 部落格文章數 | 45 | 50 |
| Error Boundary | 無 | ✅ |
| Contact 表單回饋 | 無 | ✅ 成功/錯誤/送出中 |
| 零售通路受眾覆蓋 | 1-2 篇 | 3-4 篇 |
| 冷凍食材品牌覆蓋 | 3 篇 | 4 篇 |
| 社區無人商店覆蓋 | 0 篇 | 1 篇 |
| 便當/鮮食覆蓋 | 0 篇 | 1 篇 |
| AI/數據營運覆蓋 | 1 篇 | 2 篇 |
| 全站 SEO 評分（校準後） | 9.0/10 | 9.0/10 |

---

## 2026-03-21 — 第四波 6 輪檢討優化（Rounds 14-19）

### 動作
- **Round 14**: Meta description 修正 + BlogPosting Schema 強化
  - /cases description 從 120 字元擴充至 ~150 字元（加入「展現從餐飲到文創的全方位導入實力」）
  - BlogPosting JSON-LD image 從純字串升級為 ImageObject（含 width/height），提升 Rich Snippet 資格
- **Round 15**: Blog 文章導航系統
  - blog.ts 新增 `getAdjacentPosts()` 和 `getRelatedPosts()` 函式
  - 每篇 blog 底部新增「相關文章」區塊（依關鍵字相似度推薦 3 篇）
  - 新增「上一篇 / 下一篇」導覽列（增加內部連結爬行效率）
- **Round 16**: Lightbox 無障礙修復
  - LightboxImage modal 加入 `role="dialog"`, `aria-modal="true"`, `aria-label`
  - LightboxVideo modal 加入相同 ARIA 屬性
  - 關閉按鈕 aria-label 更具描述性（「關閉放大圖片」/「關閉放大影片」）
  - SVG icon 加入 `aria-hidden="true"`
- **Round 17**: Layout meta + Sitemap 優化
  - layout.tsx 加入 `theme-color: #0F2440`（瀏覽器 UI 品牌化）
  - sitemap.ts blog 文章 priority 分層：30天內 0.8、90天內 0.75、其餘 0.7（獎勵新鮮內容）
- **Round 18**: Blog 關鍵字擴充
  - convenience-store-smart-vending-integration.md 從 7 → 10 關鍵字
  - taiwan-smart-device-export.md 從 7 → 10 關鍵字
  - 全站 45 篇 blog 均達 9+ 關鍵字標準
- **Round 19**: Build 驗證 + IndexNow 50 URL 提交（200 OK 成功）

### SEO 評分變化
| 項目 | Round 13 後 | Round 19 後 |
|------|-------------|-------------|
| /cases description 合格 | ❌ (120字元) | ✅ (~150字元) |
| BlogPosting image schema | 字串 | ImageObject |
| Blog 文章間導航 | 無 | ✅ 上下篇 + 相關3篇 |
| Blog 關鍵字低於8的文章 | 2篇 | 0篇 |
| Lightbox ARIA 完整度 | 基本 | 完整（dialog+modal） |
| theme-color | 無 | ✅ #0F2440 |
| Sitemap 新文章優先 | 統一 0.7 | 分層 0.7-0.8 |
| 全站 SEO 評分 | 9.8/10 | 9.9/10 |

---

## 2026-03-20 — 第三波 3 輪精修（Rounds 11-13）

### 動作
- **Round 11**: 全站無障礙（Accessibility）修復
  - Header 主導覽加入「部落格」連結（桌面＋行動版）
  - Header dropdown 加入 aria-haspopup, aria-expanded
  - Header mobile menu 加入 aria-label="行動裝置選單"
  - Contact 3 個裝飾性 SVG 加入 aria-hidden="true"
  - Numbers 統計卡片加入 role="group" + aria-label
  - Clients 客戶圖示加入 aria-label
- **Round 12**: Cases 頁面加入 VideoObject JSON-LD（6 支影片結構化資料）
  - GraBox 取餐示範 x2
  - 數位功德箱 x4
- **Round 13**: 最終 build 驗證 + IndexNow 50 URL 提交

### SEO 評分變化
| 項目 | Round 10 後 | Round 13 後 |
|------|------------|-------------|
| Header /blog 連結 | 無 | ✅ 桌面＋行動版 |
| ARIA 無障礙 | 基本 | 全元件完整 |
| Video 結構化資料 | 僅 video-sitemap | +VideoObject JSON-LD |
| 全站 SEO 評分 | 9.6/10 | 9.8/10 |

---

## 2026-03-20 — 第二波 5 輪深度優化（Rounds 6-10）

### 動作
- **Round 6**: 12 篇部落格新增內部連結＋延伸閱讀（elderly, factory, ramen, hotel-minibar, night-shift, school, frozen-no-microwave, ivm, data-analytics, maintenance, restaurant-equipment, payment）
- **Round 7**: 元件層級 SEO 修復
  - Footer 5 個死文字 → 連結（指向對應 blog 文章）
  - Footer 加入 `<address>` 語意標籤 + `<nav aria-label>`
  - Footer 快速導覽加入「部落格」連結
  - Services 圖片 alt text 加入 subtitle 脈絡
  - FrozenMicrowaveShowcase 主圖 alt text 強化（加入 3600W 規格）
- **Round 8**: 修復 5 篇佔位圖片（mcs-logo.png → 實際產品/案例圖）+ 3 篇缺 H1 修復
- **Round 9**: Homepage 加入 BreadcrumbList JSON-LD + 7 篇 blog 交叉連結補強
- **Round 10**: Footer JSX 結構修復 + 最終 build 驗證 + IndexNow 50 URL 提交

### SEO 評分變化（自我評估）
| 項目 | Round 5 後 | Round 10 後 |
|------|-----------|-------------|
| Blog 內部連結覆蓋率 | ~60% (28/45) | ~100% (45/45) |
| 佔位圖片數 | 5 篇 | 0 篇 |
| H1 缺失 | 3 篇 | 0 篇 |
| Footer 死連結 | 5 個 | 0 個 |
| Homepage JSON-LD 類型 | 2 (WebSite, LocalBusiness) | 3 (+BreadcrumbList) |
| 元件 alt text 品質 | 基本 | 含脈絡描述 |
| 全站 SEO 評分 | 9.2/10 | 9.6/10 |

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
