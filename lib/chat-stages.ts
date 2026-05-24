export type Role = 'venue' | 'brand' | 'franchise' | 'custom'

export interface PanelState {
  role: Role
  stage: string
  venueType?: string
  recommendedProduct?: string
  brandCategory?: string
  investmentScale?: string
  requirement?: string
}

export function parsePanelState(
  messages: { role: string; content: string }[],
  currentRole: Role
): PanelState {
  const state: PanelState = { role: currentRole, stage: 'initial' }

  for (const msg of [...messages].reverse()) {
    if (msg.role !== 'assistant') continue
    const match = msg.content.match(/\|\|\|JSON:(.*?)\|\|\|/)
    if (match) {
      try {
        const parsed = JSON.parse(match[1])
        return { ...state, ...parsed, role: currentRole }
      } catch { /* ignore */ }
    }
  }

  return state
}
