# Session Notes（跨 session 同步用）
> 此檔案由 Claude 自動維護，用於在不同 session 之間傳遞上下文。

## 最後更新
- 日期：2026-04-11
- 來源：web

## 重要決定
- 建立了 session 同步機制：每個 session（CLI 或 Web）開始時讀取此檔案，結束時更新此檔案
- CLAUDE.md 已加入同步規則，所有 session 都會遵守

## 未完成事項
- （目前無）

## 備註
- Jason 確認：不同 session 之間需要自動同步上下文，不能靠手動傳達
