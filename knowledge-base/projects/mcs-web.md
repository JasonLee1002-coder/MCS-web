---
domain: projects
entity: MCS 官網（CMO 負責）
tags: [mcstation.ai, 官網, Next.js, Vercel, east-beauty, 多語言]
lang: zh
last_updated: 2026-06-02
author: CMO
confidence: high
source: 專案對話記錄、CLAUDE.md
---

# MCS 官網專案

## 基本資訊

- **本地路徑**：`C:\Users\JasonLee\claude_code_projects\CMO`
- **GitHub**：`JasonLee1002-coder/MCS-web`
- **正式網址**：`https://www.mcstation.ai`
- **部署**：Vercel（Jason 帳號）
- **技術**：Next.js 15 + TypeScript + Tailwind CSS

## 已完成頁面

| 頁面 | 網址 | 狀態 | 說明 |
|------|------|------|------|
| 首頁 | `/` | ✅ 上線 | — |
| east-beauty | `/east-beauty` | ✅ 上線 | 東方美策略簡報，三語切換 |

## east-beauty 頁面特色（2026-06-02 最新）

- **繁中 / English / 日本語** 三語切換按鈕（導覽列右側）
- 完整翻譯：所有文字、設備名稱、場景說明
- 資料架構：TRANSLATIONS const（zh/en/ja） + lang-independent 圖片陣列
- Yuzu AI 泡泡在此頁**完全隱藏**（AiConsultant return null）

## 重要設計規範

- 主色：`#f5c842`（金黃）
- 背景：`#0d2240`（深海軍藍）
- 字型：Noto Sans TC（繁中）+ Playfair Display（標題）
- 動畫：IntersectionObserver FadeIn

## 已知問題 / 待辦

- east-beauty 頁 SVG 衛星網絡圖文字仍為中文硬碼（不影響功能，僅 SVG 內部）
- 衛星站商業模式卡片（4 個）仍為中文硬碼（次要）

## 部署方式

```bash
# 推上 GitHub → Vercel 自動部署
git push
```

## next.config.ts 狀態

- 目前有未提交修改（git status: M next.config.ts）
- 需確認是否需要 push
