/**
 * 輕量 rate limit：用既有的 Upstash Redis（Yuzu-san 共用執行個體，已登記於
 * shared_intel/CTO_RESOURCES.md）做固定視窗計數，不額外裝套件、不另開新資源。
 *
 * Fail-open：Upstash 未設定或呼叫失敗時一律放行，避免基礎設施小故障擋掉真實客戶留資。
 * Key 前綴 `mcstation:` 避免跟 Yuzu-san 自己的 key 撞名。
 */

interface RateLimitResult {
  ok: boolean
  remaining: number
}

export async function checkRateLimit(key: string, limit: number, windowSeconds: number): Promise<RateLimitResult> {
  const url = process.env.UPSTASH_REDIS_REST_URL
  const token = process.env.UPSTASH_REDIS_REST_TOKEN
  if (!url || !token) return { ok: true, remaining: limit }

  try {
    const res = await fetch(`${url}/pipeline`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([
        ['INCR', key],
        ['EXPIRE', key, String(windowSeconds), 'NX'],
      ]),
      signal: AbortSignal.timeout(3000),
    })
    if (!res.ok) return { ok: true, remaining: limit }
    const data = (await res.json()) as Array<{ result: number }>
    const count = data?.[0]?.result ?? 0
    return { ok: count <= limit, remaining: Math.max(0, limit - count) }
  } catch {
    return { ok: true, remaining: limit }
  }
}

export function getClientIp(req: Request): string {
  const fwd = req.headers.get('x-forwarded-for')
  if (fwd) return fwd.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}
