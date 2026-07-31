import { useEffect, useState } from 'react'
import { fetchAdminAuditLog } from '../../../services/adminAuditService'

const TABS = [
  { id: 'all', label: 'All' },
  { id: 'orders', label: 'Orders' },
  { id: 'users', label: 'Users' },
  { id: 'merchants', label: 'Merchants' },
  { id: 'riders', label: 'Riders' },
  { id: 'settings', label: 'Settings' },
  { id: 'dispute', label: 'Disputes' },
]

function formatWhen(iso) {
  if (!iso) return '—'
  try {
    return new Date(iso).toLocaleString()
  } catch {
    return iso
  }
}

function formatState(value) {
  if (value == null) return '—'
  if (typeof value === 'string') return value
  try {
    return JSON.stringify(value)
  } catch {
    return String(value)
  }
}

export default function AdminLiveAuditLogPage() {
  const [category, setCategory] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [entries, setEntries] = useState([])
  const [pagination, setPagination] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await fetchAdminAuditLog({ search, category, page, perPage: 25 })
        if (!cancelled) {
          setEntries(result.entries)
          setPagination(result.pagination)
        }
      } catch (err) {
        if (!cancelled) {
          setEntries([])
          setError(err.message || 'Failed to load audit log.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [search, category, page])

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          Platform › <span className="text-rapid-orange">Audit log</span>
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">System audit log</h1>
        <p className="mt-1 text-sm text-gray-500">
          Immutable record of administrative mutations. Demo rows removed.
        </p>
      </header>

      <div className="mb-4 flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => {
              setCategory(tab.id)
              setPage(1)
            }}
            className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
              category === tab.id
                ? 'bg-rapid-orange text-white'
                : 'border border-gray-200 bg-white text-gray-700'
            }`}
          >
            {tab.label}
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
        placeholder="Search action, description, admin…"
        className="mb-4 w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
      />

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
          <thead className="bg-gray-50 text-xs font-semibold uppercase tracking-wide text-gray-500">
            <tr>
              <th className="px-4 py-3">Admin</th>
              <th className="px-4 py-3">Action</th>
              <th className="px-4 py-3">Entity</th>
              <th className="px-4 py-3">Before → After</th>
              <th className="px-4 py-3">IP / Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  Loading audit records…
                </td>
              </tr>
            ) : entries.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-gray-500">
                  No audit records match these filters.
                </td>
              </tr>
            ) : (
              entries.map((entry) => (
                <tr key={entry.id} className="align-top hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{entry.actor}</p>
                    <p className="text-xs text-gray-400">{entry.actor_email}</p>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-semibold text-gray-900">{entry.action}</p>
                    <p className="text-xs text-gray-500">{entry.description}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase text-gray-400">
                      {entry.category}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-700">
                    {entry.entity_type || '—'}
                    {entry.entity_id != null ? ` #${entry.entity_id}` : ''}
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    <span className="text-gray-400">{formatState(entry.before)}</span>
                    <span className="mx-1 text-gray-300">→</span>
                    <span>{formatState(entry.after)}</span>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-500">
                    <p>{entry.ip_address || '—'}</p>
                    <p>{formatWhen(entry.created_at)}</p>
                  </td>
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
