import type { Metadata } from 'next'
import { Geist, Geist_Mono, Noto_Sans_TC } from 'next/font/google'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { FloatingChatButton } from '@/components/FloatingChatButton'
import './globals.css'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })
const notoTC = Noto_Sans_TC({
  subsets: ['latin'],
  weight: ['300', '400', '500', '700', '900'],
  variable: '--font-noto',
})

export const metadata: Metadata = {
  title: '銓幻元科技 | 智慧販賣機 · GraBox · 智取設備',
  description: '銓幻元科技 mcstation.ai — 提供智慧販賣機、GraBox 自助取餐、冷凍微波設備，服務場地主、品牌商與加盟夥伴。',
  openGraph: {
    title: '銓幻元科技 | 智慧販賣機',
    description: '對話式 AI 諮詢，找到最適合你的智慧設備方案',
    url: 'https://mcstation.ai',
    siteName: '銓幻元科技',
    locale: 'zh_TW',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-TW" className={`${geistSans.variable} ${geistMono.variable} ${notoTC.variable}`}>
      <body className="antialiased bg-[var(--bg)] text-[var(--text)]">
        <Nav />
        <main>{children}</main>
        <Footer />
        <FloatingChatButton />
      </body>
    </html>
  )
}
