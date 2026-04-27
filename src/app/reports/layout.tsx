import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

/** Reports pages — standalone, no global nav/footer */
export default function ReportsLayout({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
