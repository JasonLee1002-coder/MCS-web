import type { SpecRow } from '@/data/frozen-vending-models'

/**
 * 規格表。三件事是刻意的，改之前先讀：
 *
 * 1. `value === null` 一律顯示「產品文件未載」，不留空白也不補推估值。
 *    空白會讓讀者以為是漏排版；補值就變成我們自己編的規格。
 * 2. `sourceNote` 只以註腳呈現，字級與顏色都比規格值弱。
 *    它保存的是「PDF 有寫但不合格」的原始字串（例如標了數字沒標單位），
 *    那種值不可以被當成規格用。
 * 3. 表格上方一定要有來源與版本，緊鄰數值，不能只放在頁尾免責。
 */
export function SpecTable({ rows, sourceLabel }: { rows: SpecRow[]; sourceLabel: string }) {
  return (
    <div>
      <p className="text-xs text-slate-500 mb-3 leading-relaxed">{sourceLabel}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border-collapse min-w-[320px]">
          <tbody>
            {rows.map((r, i) => (
              <tr key={r.label} style={{ background: i % 2 === 0 ? '#0f1f36' : '#0d1a2d' }}>
                <th
                  scope="row"
                  className="text-left align-top px-4 py-3 font-medium text-slate-400 whitespace-nowrap w-[34%]"
                  style={{ borderTop: '1px solid #1e293b' }}
                >
                  {r.label}
                </th>
                <td className="px-4 py-3 text-slate-200 align-top" style={{ borderTop: '1px solid #1e293b' }}>
                  {r.value ?? <span className="text-slate-500">產品文件未載</span>}
                  {r.sourceNote && (
                    <span className="block text-xs text-slate-500 mt-1 leading-relaxed">{r.sourceNote}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
