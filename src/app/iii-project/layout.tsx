import type { Metadata } from "next";

/**
 * 2026-08-19：這頁不該被搜尋引擎收錄。
 *
 * 兩頁都是 'use client'，沒辦法在 page.tsx 匯出 metadata，所以用 layout 補。
 * 稽核時發現：兩頁線上都回 200、不在 sitemap、但也**沒有任何 noindex**，
 * robots.txt 當時只擋 /present 與 /api——等於只要有一條連結指過來就會被收錄。
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
