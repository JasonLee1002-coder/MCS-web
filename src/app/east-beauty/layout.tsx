import type { Metadata } from "next";
import { Playfair_Display, Noto_Sans_TC } from "next/font/google";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["700", "900"],
  variable: "--font-playfair",
  display: "swap",
});

const notoSansTC = Noto_Sans_TC({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto-tc",
  display: "swap",
});

export const metadata: Metadata = {
  title: "東方美 × MCS 銓幻元 | 新型態科技自助餐廳發展策略",
  description: "以東方美為基地，導入 MCS AI 平台，打造全台科技自助餐廳標準模組，從一家店到一個系統。",
  robots: { index: false, follow: false },
};

export default function EastBeautyLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`${playfair.variable} ${notoSansTC.variable}`}>
      {children}
    </div>
  );
}
