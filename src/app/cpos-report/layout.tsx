import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "CPOS 測試報告 2026-04-27",
  robots: { index: false, follow: false },
};

export default function CposReportLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
