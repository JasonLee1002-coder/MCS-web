import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

const STAFF_EMAIL = 'staff@transtep.com'
const FROM_EMAIL = 'MCS AI 顧問 <noreply@mcstation.ai>'
const SHEET_URL = 'https://docs.google.com/spreadsheets/d/18ztvHiFz57aNnsgaBB1DpTzhgk5Ggix86BwooHk4AcU/edit'

const roleLabels: Record<string, string> = {
  venue: '場地主',
  brand: '品牌商',
  franchise: '加盟合作',
  custom: '客製化需求',
}

/** 用 Gemini 生成業務分析 */
async function generateAnalysis(
  conversation: { role: string; content: string }[],
  role: string,
  leadInfo: Record<string, string>
): Promise<string> {
  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY
  if (!apiKey) return '（AI 分析暫不可用）'

  const convoText = conversation
    .map(m => `${m.role === 'user' ? '訪客' : 'AI顧問'}：${m.content.replace(/\|\|\|JSON:.*?\|\|\|/g, '').trim()}`)
    .filter(m => m.length > 5)
    .join('\n')

  const prompt = `你是銓幻元科技的業務主管，閱讀以下 AI 顧問與潛在客戶的對話，用繁體中文撰寫業務分析報告。

訪客身份：${roleLabels[role] ?? role}
${leadInfo.leadName ? `姓名：${leadInfo.leadName}` : ''}
${leadInfo.leadContact ? `聯絡：${leadInfo.leadContact}` : ''}

【對話記錄】
${convoText}

請用以下結構輸出（純文字，不要用 markdown）：

▋ 客戶需求摘要（2-3句）
▋ 推薦方案
▋ 成交機率（高/中/低）+ 理由
▋ 跟進建議（具體下一步行動）
▋ 注意事項（潛在障礙或特殊需求）`

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: { temperature: 0.3 },
        }),
      }
    )
    if (!res.ok) return '（分析生成失敗）'
    const data = await res.json()
    return data.candidates?.[0]?.content?.parts?.[0]?.text ?? '（無法取得分析）'
  } catch {
    return '（分析生成失敗）'
  }
}

/** 發送業務通知 email */
export async function sendLeadEmail(params: {
  sessionId: string
  role: string
  leadName?: string | null
  leadContact?: string | null
  conversation: { role: string; content: string }[]
  extraInfo?: Record<string, string>
}): Promise<void> {
  if (!process.env.RESEND_API_KEY) return

  const { role, leadName, leadContact, conversation, extraInfo = {} } = params
  const roleLabel = roleLabels[role] ?? role
  const now = new Date().toLocaleString('zh-TW', { timeZone: 'Asia/Taipei' })

  // 生成 AI 業務分析
  const analysis = await generateAnalysis(
    conversation,
    role,
    { leadName: leadName ?? '', leadContact: leadContact ?? '', ...extraInfo }
  )

  // 原始對話記錄（過濾 JSON 指令）
  const convoHtml = conversation
    .map(m => {
      const text = m.content.replace(/\|\|\|JSON:[^|]*\|\|\|/g, '').trim()
      if (!text) return ''
      const isUser = m.role === 'user'
      return `<div style="margin:8px 0;padding:10px 14px;border-radius:10px;max-width:80%;${
        isUser
          ? 'background:#00C6AD;color:white;margin-left:auto;'
          : 'background:#f3f4f6;color:#1f2937;'
      }">
        <span style="font-size:11px;opacity:0.7;display:block;margin-bottom:4px;">${isUser ? '訪客' : 'AI 顧問'}</span>
        <span style="white-space:pre-wrap;">${text}</span>
      </div>`
    })
    .filter(Boolean)
    .join('')

  // 額外資訊表格
  const extraRows = Object.entries(extraInfo)
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="color:#6b7280;padding:6px 12px 6px 0;">${k}</td><td style="font-weight:600;padding:6px 0;">${v}</td></tr>`)
    .join('')

  const subject = `🔔 MCS 新詢問 | ${roleLabel} | ${leadName ?? '未取得姓名'} | ${now}`

  const htmlBody = `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family:sans-serif;background:#f9fafb;margin:0;padding:20px;">
<div style="max-width:680px;margin:0 auto;background:white;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

  <!-- Header -->
  <div style="background:linear-gradient(135deg,#00C6AD,#00a896);padding:24px 32px;">
    <div style="color:white;font-size:22px;font-weight:700;">🔔 MCS 新詢問通知</div>
    <div style="color:rgba(255,255,255,0.8);font-size:13px;margin-top:4px;">${now}　|　${roleLabel}</div>
  </div>

  <div style="padding:28px 32px;">

    <!-- 聯絡資訊 -->
    <div style="background:#f0fffe;border:1px solid #00C6AD33;border-radius:8px;padding:16px 20px;margin-bottom:24px;">
      <div style="font-size:13px;color:#00a896;font-weight:600;margin-bottom:10px;">聯絡資訊</div>
      <table style="width:100%;border-collapse:collapse;font-size:14px;">
        <tr><td style="color:#6b7280;padding:6px 12px 6px 0;width:100px;">姓名</td><td style="font-weight:700;font-size:16px;color:#111;">${leadName ?? '未取得'}</td></tr>
        <tr><td style="color:#6b7280;padding:6px 12px 6px 0;">聯絡方式</td><td style="font-weight:700;font-size:16px;color:#00C6AD;">${leadContact ?? '未取得'}</td></tr>
        <tr><td style="color:#6b7280;padding:6px 12px 6px 0;">詢問類型</td><td style="font-weight:600;">${roleLabel}</td></tr>
        ${extraRows}
      </table>
    </div>

    <!-- AI 業務分析 -->
    <div style="margin-bottom:24px;">
      <div style="font-size:15px;font-weight:700;color:#111;margin-bottom:12px;">📊 AI 業務分析</div>
      <div style="background:#fafafa;border-left:4px solid #00C6AD;padding:16px 20px;border-radius:0 8px 8px 0;font-size:14px;line-height:1.8;color:#374151;white-space:pre-wrap;">${analysis}</div>
    </div>

    <!-- CTA 按鈕 -->
    <div style="text-align:center;margin-bottom:28px;">
      <a href="${SHEET_URL}" style="display:inline-block;background:#00C6AD;color:white;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;margin-right:12px;">📋 更新業務追蹤表</a>
      ${leadContact?.includes('@')
        ? `<a href="mailto:${leadContact}" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;">✉️ 回覆訪客</a>`
        : leadContact
          ? `<a href="tel:${leadContact}" style="display:inline-block;background:#f3f4f6;color:#374151;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:14px;">📞 致電訪客</a>`
          : ''
      }
    </div>

    <!-- 原始對話記錄 -->
    <details>
      <summary style="cursor:pointer;font-size:14px;font-weight:600;color:#6b7280;padding:12px 0;border-top:1px solid #f0f0f0;">
        📜 查看完整對話記錄
      </summary>
      <div style="margin-top:12px;padding:12px;background:#f9fafb;border-radius:8px;">
        ${convoHtml}
      </div>
    </details>

  </div>

  <!-- Footer -->
  <div style="background:#f9fafb;padding:16px 32px;border-top:1px solid #f0f0f0;font-size:12px;color:#9ca3af;text-align:center;">
    此信件由 MCS AI 顧問系統自動發送 | <a href="https://mcstation.ai" style="color:#00C6AD;">mcstation.ai</a>
    <br>請在 <strong>24 小時內</strong>與訪客聯繫以確保轉換率
  </div>

</div>
</body>
</html>`

  await resend.emails.send({
    from: FROM_EMAIL,
    to: [STAFF_EMAIL],
    subject,
    html: htmlBody,
  })
}
