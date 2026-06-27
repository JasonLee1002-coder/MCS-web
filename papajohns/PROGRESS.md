# 棒約翰 × GraBox 推廣網頁 — 進度紀錄

**公網 URL：** https://papajohns-gamma.vercel.app  
**Vercel 專案：** `papajohns`（scope: `jasonlee1002-coders-projects`）  
**部署指令：** `npx vercel --prod --scope jasonlee1002-coders-projects --yes`

---

## 品牌規則（Jason 指定，必須遵守）

| 語言 | 稱呼 |
|------|------|
| 中文（.zh） | **棒約翰**（禁止出現 Papa John's） |
| 英文（.en） | **Papa John's**（越多越好，全頁 ~31 次） |
| 日文（.ja） | パパジョーンズ 或 Papa John's |
| 合作方 | GraBox（不是 WiXtar / 星益欣，已完全移除） |

---

## 已移除的敏感財務內容

- 加盟費用數字（fr-inv div 全移除）
- B2B 收益表格（b2b-table）
- 回本預估 bullet
- 補貼百分比（80% → 「總部統一吸收」）
- 「投資超過 300 萬」句子

---

## 完成紀錄

### 2026-06-26
- [x] 建立 Papa John's × GraBox 三語 Landing Page（純 HTML 單檔）
- [x] 套用 CBTL 風格（cream 暖白底）+ Papa John's 企業色（紅 #DA291C / 綠 #006341）
- [x] 移除所有 emoji，改用 inline SVG icons
- [x] 用 Gemini imagen-4.0 生成 14 張 AI 情境圖（gen_images.py / gen_images2.py）
- [x] 加入 5 大行銷情境（盲盒/加盟展/金格/B2B/日本觀光）含加盟主 Q&A 挑戰式對話
- [x] 執行 patch.py 批次：中文全站換「棒約翰」，移除財務數字
- [x] Compare 區標籤改為「棒約翰 × GraBox 智取 / Papa John's × GraBox Pickup」
- [x] 重生成 pj_smart_clean.png（白色 GraBox 儲物柜，移除黑柜與亂生成中文字）
- [x] 部署到 https://papajohns-gamma.vercel.app
- [x] 所有腳本 API key 改環境變數（GitHub push protection 規避）
- [x] 全部 commit + push → `JasonLee1002-coder/MCS-web` main

---

## 圖片清單

| 檔名 | 用途 |
|------|------|
| pj_hero_wide.png | Hero 背景（台北棒約翰店面） |
| pj_pizza_artisan.png | 披薩特寫（暫未使用） |
| pj_store_bright.png | 店內環境（暫未使用） |
| pj_delivery_problem.png | Compare 壞的那側（傳統外送） |
| pj_smart_clean.png | Compare 好的那側（GraBox 智取） |
| pj_origin_1984.png | 品牌起源 1984 |
| pj_taiwan_map.png | 台灣門市地圖 |
| grabox_bright_row.png | GraBox 產品排列 |
| pj_kiosk_scene.png | 自助點餐機情境 |
| pj_blindbox_night.png | 情境1：披薩盲盒夜間 |
| pj_franchise_show.png | 情境2：加盟展 |
| pj_gold_box.png | 情境3：金格幸運抽 |
| pj_office_b2b.png | 情境4：B2B 辦公室 |
| pj_japan_tourist.png | 情境5：日本觀光客 |
| grabox_uv.png | UV-C 殺菌功能說明 |
| grabox_main.png / grabox_pickup.png / grabox_shopinshop.png / grabox_kiosk_combo.png | GraBox 設備情境（備用） |

---

## 工具腳本

| 腳本 | 用途 |
|------|------|
| `gen_images.py` | 初版 Gemini 圖片生成（無 retry） |
| `gen_images2.py` | v2 版（自動 skip 已存在、2次 retry） |
| `patch.py` | 批次替換：棒約翰、移除財務數字 |

**執行圖片生成前需設環境變數：**
```bash
export GEMINI_API_KEY="AQ.Ab8RN6..."  # 從 ~/.credentials/global.env 取
python gen_images2.py
```

---

## 待辦 / 未來可擴充

- [ ] 加入真實門市地圖 Embed
- [ ] 聯絡表單串接後端
- [ ] 加盟洽詢 CTA 連結
- [ ] 加入更多日文在地化內容
