import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "MCS 銓幻元 — 暫存預覽 v2 [STAGING]",
  robots: { index: false, follow: false },
};

export default function IntroV2Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
