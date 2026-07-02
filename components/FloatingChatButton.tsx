'use client'

import { AIChatWindow } from './AIChatWindow'

export function FloatingChatButton() {
  return (
    <AIChatWindow
      keyword="銓幻元智慧餐飲"
      brand="mcstation"
      sourceSlug="/"
      openOnLoad={false}
    />
  )
}
