import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, ChevronLeft, ChevronRight, Download, MoreVertical } from 'lucide-react'
import { ADMIN_TRANSACTIONS, ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'
import AdminTransactionStatusBadge from './AdminTransactionStatusBadge'
import AdminTransactionTypeBadge from './AdminTransactionTypeBadge'
import AdminTransactionsMobilePage from './AdminTransactionsMobilePage'
import AdminTransactionsReconciliationCard from './AdminTransactionsReconciliationCard'
import AdminTransactionsVolumeChart from './AdminTransactionsVolumeChart'

const amountToneClass = {
  success: 'text-emerald-600',
  payout: 'text-red-600',
  refund: 'text-amber-700',
}

const tabTypeMap = {
  payments: 'payment',
  refunds: 'refund',
  payouts: 'payout',
  failed: 'failed',
}

export default function AdminTransactionsPage() {
  const data = ADMIN_TRANSACTIONS
  const [activeTab, setActiveTab] = useState('all')
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeTab === 'all') return data.transactions
    if (activeTab === 'failed') {
      return data.transactions.filter((tx) => tx.status === 'failed')
    }
    const type = tabTypeMap[activeTab]
    return data.transactions.filter((tx) => tx.type === type)
  }, [activeTab, data.transactions])

  const totalPages = Math.max(1, Math.ceil(data.pagination.total / filtered.length))

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminTransactionsMobilePage data={data} />
      </div>

      <div className="hidden p-6 lg:block">
        <header className="mb-6">
        <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
          {data.breadcrumbs.parent}
          <span className="mx-1.5 text-gray-300" aria-hidden>
            ›
          </span>
          <span className="text-rapid-orange">{data.breadcrumbs.current}</span>
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 pt-4">
          <nav className="flex flex-wrap gap-6" aria-label="Transaction filters">
            {data.tabs.map((tab) => {
              const isActive = activeTab === tab.id
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
                </button>
              )
            })}
          </nav>

          <div className="flex flex-wrap items-center gap-2 pb-4">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Calendar size={16} strokeWidth={2} aria-hidden />
              {data.dateRangeLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download size={16} strokeWidth={2} aria-hidden />
              {data.exportLabel}
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.refId}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.party}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.type}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.amount}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.method}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.status}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.timestamp}
                </th>
                <th className="w-12 px-4 py-3">
                  <span className="sr-only">{data.columns.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-sm text-gray-500">
                    No transactions match this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((tx) => (
                  <tr
                    key={tx.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`${ADMIN_TRANSACTIONS_PATH}/${tx.id}`}
                        className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange"
                      >
                        {tx.id}
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-gray-900">{tx.party.name}</p>
                      <p className="text-xs text-gray-500">{tx.party.email}</p>
                    </td>
                    <td className="px-4 py-4">
                      <AdminTransactionTypeBadge label={tx.typeLabel} />
                    </td>
                    <td className="px-4 py-4">
                      <span
                        className={`text-sm font-bold ${
                          amountToneClass[tx.amountTone] ?? 'text-gray-800'
                        }`}
                      >
                        ₦{tx.amount}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-700">{tx.method}</td>
                    <td className="px-4 py-4">
                      <AdminTransactionStatusBadge status={tx.status} label={tx.statusLabel} />
                    </td>
                    <td className="px-4 py-4 text-xs font-medium uppercase tracking-wide text-gray-500">
                      {tx.timestamp}
                    </td>
                    <td className="px-4 py-4">
                      <button
                        type="button"
                        className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                        aria-label={`Actions for ${tx.id}`}
                      >
                        <MoreVertical size={18} strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
            {data.pagination.showingPrefix}{' '}
            <span className="text-gray-800">{data.pagination.range}</span> of{' '}
            {data.pagination.total.toLocaleString()}
          </p>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
              aria-label="Previous page"
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              type="button"
              disabled={page >= totalPages}
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </nav>
        </footer>
      </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <AdminTransactionsVolumeChart volumeTrend={data.volumeTrend} />
          <AdminTransactionsReconciliationCard reconciliation={data.reconciliation} />
        </div>
      </div>
    </>
  )
}
