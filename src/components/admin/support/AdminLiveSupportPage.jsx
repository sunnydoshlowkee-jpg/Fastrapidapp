import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { fetchAdminSupportTickets } from '../../../services/adminSupportService'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'open', label: 'Open' },
  { id: 'in_progress', label: 'In progress' },
  { id: 'resolved', label: 'Resolved' },
  { id: 'closed', label: 'Closed' },
]

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

export default function AdminLiveSupportPage() {
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
        const result = await fetchAdminSupportTickets({ search, status, page, perPage: 20 })
        if (!cancelled) {
          setRows(result.tickets)
          setPagination(result.pagination)
          setTabCounts(result.tabCounts)
        }
      } catch (err) {
        if (!cancelled) {
          setRows([])
          setError(err.message || 'Failed to load tickets.')
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
          Operations › <span className="text-rapid-orange">Support</span>
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Support inbox</h1>
        <p className="mt-1 text-sm text-gray-500">Live tickets from the platform. Demo inbox removed.</p>
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
        placeholder="Search subject, email, category…"
        className="mb-4 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
      />

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
        <ul className="divide-y divide-gray-100">
          {loading ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">Loading tickets…</li>
          ) : rows.length === 0 ? (
            <li className="px-4 py-8 text-center text-sm text-gray-500">No tickets in this queue.</li>
          ) : (
            rows.map((ticket) => (
              <li key={ticket.id}>
                <Link
                  to={`/admin/support/${ticket.id}`}
                  className="flex flex-col gap-1 px-4 py-3 hover:bg-gray-50 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="font-semibold text-gray-900">
                      #{ticket.id} · {ticket.subject}
                    </p>
                    <p className="text-sm text-gray-500">
                      {ticket.user_name}
                      {ticket.user_email ? ` · ${ticket.user_email}` : ''}
                    </p>
                  </div>
                  <div className="flex items-center gap-3 text-xs">
                    <span className="rounded-full bg-gray-100 px-2 py-0.5 font-bold uppercase text-gray-700">
                      {ticket.status}
                    </span>
                    <span className="font-semibold uppercase text-rapid-orange">{ticket.priority}</span>
                    <span className="text-gray-400">{formatWhen(ticket.created_at)}</span>
                  </div>
                </Link>
              </li>
            ))
          )}
        </ul>
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
