import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download } from 'lucide-react'
import { fetchAdminTransactions } from '../../../services/adminFinanceService'
import { exportAdminTransactionsCsv } from '../../../services/adminExportService'
import AdminTransactionStatusBadge from './AdminTransactionStatusBadge'

const TABS = [
  { id: 'all', label: 'All', type: 'all' },
  { id: 'payments', label: 'Payments', type: 'payment' },
  { id: 'refunds', label: 'Refunds', type: 'refund' },
  { id: 'payouts', label: 'Payouts', type: 'payout' },
  { id: 'failed', label: 'Failed', type: 'failed' },
]

export default function AdminTransactionsPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState([])
  const [pagination, setPagination] = useState(null)
  const [tabCounts, setTabCounts] = useState({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const tab = TABS.find((t) => t.id === activeTab) || TABS[0]
        const result = await fetchAdminTransactions({
          search,
          type: tab.type,
          page,
          perPage: 20,
        })
        if (!cancelled) {
          setRows(result.transactions)
          setPagination(result.pagination)
          setTabCounts(result.tabCounts)
        }
      } catch (err) {
        if (!cancelled) {
          setRows([])
          setError(err.message || 'Failed to load transactions.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [activeTab, page, search])

  const handleExport = async () => {
    setExporting(true)
    setError('')
    try {
      const tab = TABS.find((t) => t.id === activeTab) || TABS[0]
      await exportAdminTransactionsCsv({ search, type: tab.type })
    } catch (err) {
      setError(err.message || 'Export failed.')
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Finance › <span className="text-rapid-orange">Transactions</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Platform ledger</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live wallet moves across customers, merchants, and riders. Demo data has been removed.
          </p>
        </div>
        <button
          type="button"
          disabled={exporting}
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-rapid-orange transition-colors hover:bg-orange-100 disabled:opacity-50"
        >
          <Download size={16} />
          {exporting ? 'Exporting…' : 'Export CSV'}
        </button>
      </header>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <input
          type="search"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
          placeholder="Search reference, actor, description…"
          className="w-full max-w-md rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <nav className="flex flex-wrap gap-4 border-b border-gray-100 px-4 pt-3" aria-label="Transaction filters">
          {TABS.map((tab) => {
            const isActive = activeTab === tab.id
            const count = tabCounts[tab.id]
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setPage(1)
                }}
                className={`border-b-2 pb-3 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'border-rapid-orange text-rapid-orange'
                    : 'border-transparent text-gray-500 hover:text-gray-800'
                }`}
              >
                {tab.label}
                {count != null ? (
                  <span className="ml-1.5 text-xs font-medium text-gray-400">{count}</span>
                ) : null}
              </button>
            )
          })}
        </nav>

        {loading ? (
          <p className="px-6 py-12 text-center text-sm text-gray-500">Loading ledger…</p>
        ) : error ? (
          <p className="px-6 py-12 text-center text-sm text-red-600">{error}</p>
        ) : rows.length === 0 ? (
          <p className="px-6 py-12 text-center text-sm text-gray-500">No transactions match this filter.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead className="bg-gray-50 text-[11px] font-bold uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-4 py-3">ID</th>
                  <th className="px-4 py-3">Actor</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Amount</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Reference</th>
                  <th className="px-4 py-3">When</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((tx) => (
                  <tr key={tx.id} className="border-t border-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-800">{tx.id}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <p className="font-medium">{tx.actor_name}</p>
                      <p className="text-xs capitalize text-gray-400">{tx.audience}</p>
                    </td>
                    <td className="px-4 py-3 capitalize text-gray-600">{tx.type}</td>
                    <td className={`px-4 py-3 font-bold ${tx.direction === 'debit' ? 'text-red-600' : 'text-emerald-600'}`}>
                      {tx.direction === 'debit' ? '−' : '+'}
                      {tx.amount_label}
                    </td>
                    <td className="px-4 py-3">
                      <AdminTransactionStatusBadge status={tx.status} />
                    </td>
                    <td className="px-4 py-3 font-mono text-xs text-gray-500">{tx.reference || '—'}</td>
                    <td className="px-4 py-3 text-xs text-gray-500">
                      {tx.created_at ? new Date(tx.created_at).toLocaleString() : '—'}
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
              Page {pagination.current_page} of {pagination.last_page} · {pagination.total} rows
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

      <p className="mt-4 text-xs text-gray-400">
        Transaction detail / refund / flag tools stay Phase 2.{' '}
        <Link to="/admin/payouts" className="font-semibold text-rapid-orange hover:underline">
          View withdrawals
        </Link>
      </p>
    </div>
  )
}
