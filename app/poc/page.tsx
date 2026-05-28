'use client'
import { useState, useEffect } from 'react'

type Report = {
  id: string
  title: string
  category: string
  author: string
  slug: string
  createdAt: string
}

const CATEGORY_LABEL: Record<string, string> = {
  report: '報告', closure: '結案', analysis: '分析', meeting: '會議記錄',
}
const CATEGORY_COLOR: Record<string, string> = {
  report: '#2563eb', closure: '#16a34a', analysis: '#d97706', meeting: '#7c3aed',
}

export default function PocPage() {
  const [password, setPassword] = useState('')
  const [authed, setAuthed] = useState(false)
  const [error, setError] = useState('')
  const [reports, setReports] = useState<Report[]>([])
  const [deleting, setDeleting] = useState<string | null>(null)

  async function login() {
    const res = await fetch('/api/poc', { headers: { 'x-poc-token': password } })
    if (res.ok) {
      document.cookie = `poc_token=${password}; path=/poc; max-age=86400`
      setAuthed(true)
      setReports(await res.json())
    } else {
      setError('密碼錯誤')
    }
  }

  useEffect(() => {
    const cookie = document.cookie.split(';').find(c => c.trim().startsWith('poc_token='))
    if (cookie) {
      const token = cookie.split('=')[1]?.trim()
      fetch('/api/poc', { headers: { 'x-poc-token': token ?? '' } }).then(async r => {
        if (r.ok) { setAuthed(true); setReports(await r.json()) }
      })
    }
  }, [])

  async function deleteReport(id: string) {
    if (!confirm('確定刪除此報告？')) return
    setDeleting(id)
    const token = document.cookie.split(';').find(c => c.trim().startsWith('poc_token='))?.split('=')[1]?.trim() ?? ''
    await fetch(`/api/poc?id=${id}`, { method: 'DELETE', headers: { 'x-poc-token': token } })
    setReports(r => r.filter(x => x.id !== id))
    setDeleting(null)
  }

  if (!authed) return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc', fontFamily: 'Noto Sans TC, sans-serif' }}>
      <div style={{ background: '#fff', borderRadius: 12, padding: '48px 40px', boxShadow: '0 4px 24px #0001', width: 360, textAlign: 'center' }}>
        <div style={{ width: 48, height: 48, background: '#2563eb', borderRadius: 12, margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 700, color: '#1e293b', marginBottom: 8 }}>龍雲內部報告中心</h1>
        <p style={{ color: '#64748b', fontSize: 14, marginBottom: 28 }}>poc.mcstation.ai — 僅限內部人員</p>
        <input
          type="password" placeholder="請輸入存取密碼" value={password}
          onChange={e => setPassword(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && login()}
          style={{ width: '100%', padding: '10px 14px', border: '1.5px solid #e2e8f0', borderRadius: 8, fontSize: 14, marginBottom: 12, outline: 'none', boxSizing: 'border-box' }}
        />
        {error && <p style={{ color: '#ef4444', fontSize: 13, marginBottom: 12 }}>{error}</p>}
        <button onClick={login} style={{ width: '100%', padding: '11px', background: '#2563eb', color: '#fff', border: 'none', borderRadius: 8, fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
          進入
        </button>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', fontFamily: 'Noto Sans TC, sans-serif' }}>
      <div style={{ maxWidth: 860, margin: '0 auto', padding: '48px 24px' }}>
        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
            <div style={{ width: 8, height: 32, background: '#2563eb', borderRadius: 4 }} />
            <h1 style={{ fontSize: 26, fontWeight: 800, color: '#0f172a', margin: 0 }}>龍雲內部報告中心</h1>
          </div>
          <p style={{ color: '#64748b', fontSize: 14, marginLeft: 20 }}>poc.mcstation.ai — 結案備忘 · 分析報告 · 會議記錄</p>
        </div>

        {/* Report list */}
        {reports.length === 0 ? (
          <div style={{ textAlign: 'center', color: '#94a3b8', padding: '80px 0', fontSize: 15 }}>尚無報告</div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {[...reports].reverse().map(r => (
              <div key={r.id} style={{ background: '#fff', borderRadius: 10, padding: '20px 24px', boxShadow: '0 1px 4px #0001', display: 'flex', alignItems: 'center', gap: 16, borderLeft: `4px solid ${CATEGORY_COLOR[r.category] ?? '#2563eb'}` }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: CATEGORY_COLOR[r.category] ?? '#2563eb', background: `${CATEGORY_COLOR[r.category] ?? '#2563eb'}15`, padding: '2px 8px', borderRadius: 20 }}>
                      {CATEGORY_LABEL[r.category] ?? r.category}
                    </span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{r.author}</span>
                    <span style={{ fontSize: 12, color: '#cbd5e1' }}>·</span>
                    <span style={{ fontSize: 12, color: '#94a3b8' }}>{new Date(r.createdAt).toLocaleDateString('zh-TW')}</span>
                  </div>
                  <a href={`/poc/${r.slug}`} style={{ fontSize: 16, fontWeight: 600, color: '#1e293b', textDecoration: 'none' }}>{r.title}</a>
                </div>
                <button
                  onClick={() => deleteReport(r.id)}
                  disabled={deleting === r.id}
                  style={{ padding: '6px 14px', background: '#fff', border: '1.5px solid #fca5a5', borderRadius: 6, color: '#ef4444', fontSize: 12, fontWeight: 600, cursor: 'pointer' }}
                >
                  {deleting === r.id ? '刪除中…' : '刪除'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
