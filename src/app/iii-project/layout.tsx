import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '科專計畫戰情室 | MCS Internal',
  robots: {
    index: false,
    follow: false,
  },
}

export default function IIIProjectLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
