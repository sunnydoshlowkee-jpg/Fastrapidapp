import { useEffect, useState } from 'react'
import { fetchAdminPayouts } from '../../../services/adminFinanceService'
import AdminPayoutStatusBadge from './AdminPayoutStatusBadge'

const AUDIENCE_TABS = [
  { id: 'all', label: 'All' },
  { id: 'merchant', label: 'Merchants' },
  { id: 'rider', label: 'Riders' },
]

export default function AdminPayoutsPage() {
  const [audience, setAudience] = useState('all')
  const [status, setStatus] = useState('all')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [summary, setSummary] = useState({})
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await fetchAdminPayouts({ audience, status, page, perPage: 20 })
        if (!cancelled) {
          setRows(result.payouts)
          setSummary(result.summary || {})
          setPagination(result.pagination)
        }
      } catch (err) {
        if (!cancelled) {
          setRows([])
          setError(err.message || 'Failed to load payouts.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [audience, status, page])

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">Finance</p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Withdrawals</h1>
        <p className="mt-1 max-w-2xl text-sm text-gray-500">
          {summary.note ||
            'Live merchant and rider withdrawal monitoring. Manual Approve has been removed — Paystack settles these automatically.'}
        </p>
      </header>

      <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-amber-700">Pending</p>
          <p className="mt-1 text-2xl font-bold text-amber-900">{summary.pending_count ?? 0}</p>
          <p className="text-xs text-amber-800">
            ₦{Number(summary.pending_amount || 0).toLocaleString('en-NG', { minimumFractionDigits: 2 })}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white px-4 py-3">
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">Total rows</p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{summary.total_count ?? 0}</p>
        </div>
      </div>

      <div className="mb-4 flex flex-wrap gap-2">
        {AUDIENCE_TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setAudience(tab.id)
              setPage(1)
            }}
            className={`rounded-full px-4 py-1.5 text-sm font-bold ${
              audience === tab.id ? 'bg-rapid-orange text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {tab.label}
          </button>
        ))}
        <select
          value={status}
          onChange={(e) => {
            setStatus(e.target.value)
            setPage(1)
          }}
          className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm"
        >
          <option value="all">All statuses</option>
          <option value="pending">Pending</option>
          <option value="success">Success</option>
          <option value="failed">Failed</option>
        </select>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {loading ? (
          <p className="px-6 py-12 text-center text-sm text-gray-500">Loading withdrawals…</p>
        ) : error ? (
          <p className="px-6 py-12 text-center text-sm text-red-600">{error}</p>
        ) : rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-gray-500">No withdrawals found.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[680px] text-left text-sm">
              <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Entity</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.id} className="border-t border-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">{row.id}</td>
                    <td className="px-4 py-3">
                      <p className="font-medium text-gray-800">{row.entity}</p>
                      <p className="text-xs capitalize text-gray-400">{row.audience}</p>
                    </td>
                    <td className="px-4 py-3 font-bold text-gray-900">{row.amount_label}</td>
                    <td className="px-4 py-3">
                      <AdminPayoutStatusBadge status={row.status} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{row.reference || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {row.created_at ? new Date(row.created_at).toLocaleString() : '—'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {pagination && pagination.last_page > 1 ? (
          <div className="flex items-center justify-between border-t border-gray-100 px-4 py-3 text-sm">
            <p className="text-gray-500">
              Page {pagination.current_page} of {pagination.last_page}
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg border border-gray-200 px-3 py-1.5 font-semibold disabled:opacity-40"
              >
                Prev
              </button>
              <button
                type="button"
                disabled={page >= pagination.last_page}
                onClick={() => setPage((p) => p + 1)}
                className="rounded-lg border border-gray-200 px-3 py-1.5 font-semibold disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
