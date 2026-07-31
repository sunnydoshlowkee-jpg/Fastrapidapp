import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAdminDisputes } from '../../../services/adminDisputesService'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'under_review', label: 'Under review' },
  { id: 'escalated', label: 'Escalated' },
  { id: 'resolved', label: 'Resolved' },
]

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function AdminLiveDisputesPage() {
  const [status, setStatus] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState(null)
  const [tabCounts, setTabCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await fetchAdminDisputes({ search, status, page, perPage: 20 })
        if (!cancelled) {
          setRows(result.disputes)
          setPagination(result.pagination)
          setTabCounts(result.tabCounts)
        }
      } catch (err) {
        if (!cancelled) {
          setRows([])
          setError(err.message || 'Failed to load disputes.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [search, status, page])

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Operations › <span className="text-rapid-orange">Disputes</span>
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Dispute cases</h1>
        <p className="mt-1 text-sm text-gray-500">Live refund / claim queue. Demo disputes removed.</p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setStatus(tab.id)
              setPage(1)
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              status === tab.id
                ? 'bg-rapid-orange text-white'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            {tab.label}
            {tabCounts[tab.id] != null ? (
              <span className="ml-1 opacity-80">({tabCounts[tab.id]})</span>
            ) : null}
          </button>
        ))}
      </div>

      <input
        type="search"
        value={search}
        onChange={(e) => {
          setSearch(e.target.value)
          setPage(1)
        }}
        placeholder="Search reason, dispute id, order id…"
        className="mb-4 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
      />

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Case</th>
              <th className="px-4 py-3">Parties</th>
              <th className="px-4 py-3">Amount</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Opened</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading disputes…
                </td>
              </tr>
            ) : rows.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No disputes in this queue.
                </td>
              </tr>
            ) : (
              rows.map((row) => (
                <tr key={row.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <Link
                      to={`/admin/disputes/${row.id}`}
                      className="font-semibold text-rapid-orange hover:underline"
                    >
                      #{row.id}
                    </Link>
                    <p className="mt-0.5 max-w-xs truncate text-xs text-gray-500">{row.reason}</p>
                    {row.order_id ? (
                      <Link
                        to={`/admin/orders/${row.order_id}`}
                        className="text-xs text-gray-400 hover:text-gray-700"
                      >
                        Order #{row.order_id}
                      </Link>
                    ) : null}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{row.parties}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">{row.amount_label}</td>
                  <td className="px-4 py-3">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-bold uppercase text-gray-700">
                      {row.status_label || row.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500">{formatWhen(row.created_at)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {pagination && pagination.last_page > 1 ? (
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Previous
          </button>
          <span className="text-sm text-gray-500">
            Page {pagination.current_page} of {pagination.last_page}
          </span>
          <button
            type="button"
            disabled={page >= pagination.last_page}
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm disabled:opacity-40"
          >
            Next
          </button>
        </div>
      ) : null}
    </div>
  )
}
