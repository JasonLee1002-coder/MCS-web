# CMO — Claude Code 設定

> OWNER: CMO（v3.0 組織，2026-07-03）
> 觸發詞規則寫入：CTO 2026-07-10

---

## 🔀 觸發詞：「切到普健生醫」

Jason 說「切到普健生醫」時，代表要處理**普健生醫（progen）旗下兩個 SEO 網站**：

| 專案 | 本地路徑 | Vercel 團隊 |
|------|---------|------------|
| huangweide-seo（黃維德藥師個人品牌 SEO） | `C:\Users\JasonLee\claude_code_projects\huangweide-seo` | progen（客戶自己的 Pro 帳號） |
| pharmacy-blogs（森林藥局聯盟平台） | `C:\Users\JasonLee\claude_code_projects\pharmacy-blogs` | progen（客戶自己的 Pro 帳號） |

**做法：** 在這個 CMO 終端機內，用 Agent tool 平行派兩個 subagent，各自 cd 進對應目錄處理該站的 SEO 內容/優化/文章產出，不需要 Jason 另外開多個終端機。兩站各自獨立 git repo，互不影響，可以真正同時做。

**⚠️ 長青藥局（changqing-survey）已明確排除**（Jason 2026-07-10 指示：不用出現、不用我們處理）——**不要**主動提及、處理、或詢問是否要 clone 這個專案。若之後 Jason 主動要求才處理。

**PROGRESS_LOG 標記：** 每個 subagent 完成後，`[專案]` 欄位精確填 `huangweide-seo` 或 `pharmacy-blogs`（不要只寫 `[CMO]`），格式：
```
[日期] [CMO] [huangweide-seo] #tag 完成：{摘要}。產出：{位置}
```

**背景：** 兩站基礎設施（DB/Vercel 部署/團隊歸屬）已由 CTO 於 2026-07-10 處理完畢並驗證正常，接下來的 SEO 內容工作由 CMO 主責（既有 OWNER 標記）。
