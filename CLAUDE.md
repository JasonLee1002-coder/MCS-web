# MCS_web — Claude Code 設定

## 超級UI 定義用戶說「超級UI」時，自動套用以下完整組合，不需要再問：- **shadcn## 啟動報到ui** — 元件庫底座（Button、Skeleton、Card 等）- **Magic UI** — 動畫元件（NumberTicker、AnimatedGradientText、WordFadeIn）- **framer-motion** — 頁面入場動畫、交錯淡入、hover 上浮- **radial-gradient 背景** — 深色主題光暈背景，製造空氣感- **發光邊框** — 重點卡片 glow border- **骨架屏（Skeleton）** — 所有資料載入狀態- **數字動畫（NumberTicker）** — 所有統計數字- 字型：**Geist Sans**（UI）+ **Geist Mono**（數字## 啟動報到金額）
## 啟動報到
每次新對話開始，主動說：
「✅ MCS_web 已就緒，Superpowers 工作流已啟用。」

## 開發工作流（Superpowers，自動執行）
**只要用戶說要做新程式功能，Claude 自動按順序執行：**
1. **Brainstorm** — 先問需求與設計方向（skill: superpowers:brainstorming）
2. **Plan** — 拆解任務（skill: superpowers:writing-plans）
3. **Execute** — 逐步實作（skill: superpowers:executing-plans）

內容更新（文字、圖片、SEO）可直接執行，不需要走完整流程。

> ✅ 計畫文件自動存到 `docs/superpowers/plans/`

## 啟動流程
每次開始工作時，自動執行：
1. `git pull origin main` 同步 GitHub 最新代碼
2. 檢查 `REPORTS.md`（如果存在），優先處理 Jason 透過 LINE 回報的問題
3. 檢查 `docs/session-notes.md`（如果存在），了解其他 session 留下的筆記與待辦

## Session 同步規則（CLI 與 Web 共用，必須遵守）
不同 session（CLI、Web）之間沒有共享記憶，唯一的同步管道是 Git。
因此每個 session 必須做到以下幾點：

### 進場（Session 開始）
- `git pull origin main` 拉最新代碼
- 讀取 `docs/session-notes.md` 了解上一個 session 的重要決定與未完成事項

### 離場（Session 結束或完成一輪工作後）
- 如果對話中有**重要決定、設計方向、待辦事項**，自動寫入 `docs/session-notes.md`
- 將所有變更 commit + push，確保另一個 session 能拿到
- `docs/session-notes.md` 格式如下：

```markdown
# Session Notes（跨 session 同步用）
> 此檔案由 Claude 自動維護，用於在不同 session 之間傳遞上下文。

## 最後更新
- 日期：YYYY-MM-DD
- 來源：web / cli

## 重要決定
- （列出本次 session 做的設計決定）

## 未完成事項
- （列出還沒做完的事）

## 備註
- （其他需要下個 session 知道的事）
```

## 部署方式
- 推上 GitHub 後 Vercel 自動部署

## Git Push 策略
- 合併多個改動再一次 push
- 不要每改一行就推

## 待處理回報
每次開始工作時，請先檢查 `REPORTS.md`（如果存在），裡面是 Jason 透過 LINE Yuzu-san 回報的問題，請優先處理。
