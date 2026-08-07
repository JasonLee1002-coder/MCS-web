import { google } from 'googleapis'
import { NextRequest, NextResponse } from 'next/server'

// 2026-08-07 CMO 派工：三站每日 SEO 戰情摘要 cron 基礎建設（mcstation.ai）。
// 架構仿照 pujian-platform/src/app/api/cron/daily-digest/route.ts 的既有寫法
// （GSC service account + 摘要推播），改接本站既有的 Yuzu 內部通知管道
// （YUZU_INTERNAL_URL / YUZU_WEBHOOK_SECRET，src/app/api/lead/route.ts 已在用）。
//
// 目前狀態：骨架完成，尚未接上真實數據——
//   1. GSC：service account claude-seo@huangweide-seo-tools.iam.gserviceaccount.com
//      還沒被 Jason 加為 mcstation.ai 的 GSC Owner，且 Vercel env 還沒設
//      GOOGLE_SERVICE_ACCOUNT_JSON，兩者缺一都會讓 fetchGscTotals() 回傳 null。
//   2. GA4：還沒設定 GA4_PROPERTY_ID，fetchGa4Totals() 會回傳 null。
// 在資料補齊前，這支 route 每天仍會照排程執行，但摘要內容會誠實標註「尚未取得資料」，
// 不會捏造數字。

export const dynamic = 'force-dynamic'
export const maxDuration = 60

const SITE_URL = 'https://www.mcstation.ai/'
const SITE_LABEL = 'mcstation.ai（MCS 銓幻元官網）'

interface GscTotals {
  impressions: number
  clicks: number
  ctr: number
  position: number
}

interface Ga4Totals {
  sessions: number
  activeUsers: number
  conversions: number
}

function getAuth(scopes: string[]) {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON
  if (!raw) return null
  const credentials = JSON.parse(raw)
  return new google.auth.GoogleAuth({ credentials, scopes })
}

// TODO: 待 Jason 在 GSC 後台（https://search.google.com/search-console）
// 把 claude-seo@huangweide-seo-tools.iam.gserviceaccount.com 加為
// mcstation.ai 網域資源的「擁有者」，且 Vercel 專案設定
// GOOGLE_SERVICE_ACCOUNT_JSON env var 之後，這支才拿得到真實數據。
async function fetchGscTotals(): Promise<GscTotals | null> {
  const auth = getAuth(['https://www.googleapis.com/auth/webmasters.readonly'])
  if (!auth) return null
  try {
    const searchconsole = google.searchconsole({ version: 'v1', auth })
    const end = new Date()
    end.setDate(end.getDate() - 2)
    const start = new Date(end)
    start.setDate(start.getDate() - 27)
    const fmt = (d: Date) => d.toISOString().slice(0, 10)
    const resp = await searchconsole.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: { startDate: fmt(start), endDate: fmt(end), dimensions: [] },
    })
    const row = resp.data.rows?.[0]
    if (!row) return { impressions: 0, clicks: 0, ctr: 0, position: 0 }
    return {
      impressions: row.impressions ?? 0,
      clicks: row.clicks ?? 0,
      ctr: row.ctr ?? 0,
      position: row.position ?? 0,
    }
  } catch (e) {
    console.error('[daily-digest] GSC fetch failed:', e)
    return null
  }
}

// TODO: 需要 GA4_PROPERTY_ID env var + service account 已被加進該 GA4 資源的檢視者權限。
async function fetchGa4Totals(): Promise<Ga4Totals | null> {
  const propertyId = process.env.GA4_PROPERTY_ID
  const auth = getAuth(['https://www.googleapis.com/auth/analytics.readonly'])
  if (!propertyId || !auth) return null
  try {
    const analyticsdata = google.analyticsdata({ version: 'v1beta', auth })
    const resp = await analyticsdata.properties.runReport({
      property: `properties/${propertyId}`,
      requestBody: {
        dateRanges: [{ startDate: 'yesterday', endDate: 'yesterday' }],
        metrics: [{ name: 'sessions' }, { name: 'activeUsers' }, { name: 'conversions' }],
      },
    })
    const row = resp.data.rows?.[0]
    if (!row) return { sessions: 0, activeUsers: 0, conversions: 0 }
    const val = (i: number) => Number(row.metricValues?.[i]?.value ?? 0)
    return { sessions: val(0), activeUsers: val(1), conversions: val(2) }
  } catch (e) {
    console.error('[daily-digest] GA4 fetch failed:', e)
    return null
  }
}

/** 摘要送到公司內部 Yuzu 通知樞紐——本站 /api/lead、/api/chat 已在用同一個 YUZU_BASE。
 * 這是 best-effort：Yuzu 端目前還沒有 /api/seo-digest 這個接收端點，等對方補上前
 * 這裡會收到 404/連線失敗也沒關係，不擋主流程、不拋錯到呼叫端。 */
async function sendDigestToYuzu(text: string) {
  const YUZU_BASE = process.env.YUZU_INTERNAL_URL ?? 'https://poc.mcstation.ai/yuzu'
  const YUZU_WEBHOOK_SECRET = process.env.YUZU_WEBHOOK_SECRET
  try {
    await fetch(`${YUZU_BASE}/api/seo-digest`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...(YUZU_WEBHOOK_SECRET ? { 'x-yuzu-secret': YUZU_WEBHOOK_SECRET } : {}),
      },
      body: JSON.stringify({ site: SITE_LABEL, text }),
      signal: AbortSignal.timeout(8000),
    })
  } catch (e) {
    console.error('[daily-digest] Yuzu forward failed (non-fatal):', e)
  }
}

export async function GET(req: NextRequest) {
  const authHeader = req.headers.get('authorization')
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ ok: false, reason: 'unauthorized' }, { status: 401 })
  }

  const [gsc, ga4] = await Promise.all([fetchGscTotals(), fetchGa4Totals()])

  const today = new Date().toISOString().slice(0, 10)
  const lines = [
    `📊 ${SITE_LABEL} 每日 SEO 摘要　${today}`,
    gsc
      ? `GSC 近28天：曝光 ${gsc.impressions}｜點擊 ${gsc.clicks}｜CTR ${(gsc.ctr * 100).toFixed(2)}%｜平均排名 ${gsc.position.toFixed(1)}`
      : 'GSC：尚未取得資料（需 Jason 在 GSC 後台把 claude-seo@huangweide-seo-tools.iam.gserviceaccount.com 加為 mcstation.ai 的 Owner，並在 Vercel 設定 GOOGLE_SERVICE_ACCOUNT_JSON）',
    ga4
      ? `GA4 昨日：Sessions ${ga4.sessions}｜使用者 ${ga4.activeUsers}｜轉換 ${ga4.conversions}`
      : 'GA4：尚未取得資料（需設定 GA4_PROPERTY_ID 並確認 service account 有該 GA4 資源的檢視者權限）',
  ]
  const message = lines.join('\n')

  await sendDigestToYuzu(message)

  return NextResponse.json({
    ok: true,
    gsc,
    ga4,
    note: gsc || ga4 ? undefined : 'TODO: 尚未取得 GSC/GA4 存取權限，此為骨架回應，未捏造數據',
  })
}
