import { useMemo, useState } from 'react'
import { Check, ChevronLeft, ChevronRight, MoreVertical } from 'lucide-react'
import {
  ADMIN_PAYOUTS,
  formatPayoutTotal,
} from '../../../services/data/adminPayouts.mock'
import AdminPayoutsMobilePage from './AdminPayoutsMobilePage'
import AdminPayoutStatusBadge from './AdminPayoutStatusBadge'

export default function AdminPayoutsPage() {
  const data = ADMIN_PAYOUTS
  const [activeTab, setActiveTab] = useState('merchants')
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(
    () => new Set(data.defaultSelectedMerchantIds),
  )

  const payouts = activeTab === 'merchants' ? data.merchants : data.riders
  const entityColumn =
    activeTab === 'merchants' ? data.columns.entity : data.columns.entityRider
  const entityLabel = activeTab === 'merchants' ? 'Merchants' : 'Riders'

  const selectedPayouts = useMemo(
    () => payouts.filter((p) => selected.has(p.id)),
    [payouts, selected],
  )

  const selectedTotal = useMemo(
    () => selectedPayouts.reduce((sum, p) => sum + p.amount, 0),
    [selectedPayouts],
  )

  const allSelected = payouts.length > 0 && selected.size === payouts.length

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(payouts.map((p) => p.id)))
  }

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const handleTabChange = (tabId) => {
    setActiveTab(tabId)
    setSelected(new Set())
    setPage(1)
  }

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminPayoutsMobilePage data={data} />
      </div>

      <div className="hidden p-6 lg:block">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            {data.eyebrow}
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
          <p className="mt-1 max-w-xl text-sm text-gray-500">{data.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {data.exportBatchLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Check size={16} strokeWidth={2.5} aria-hidden />
            {data.approveAllLabel} ({data.pendingTotal})
          </button>
        </div>
      </header>

      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <nav
          className="flex gap-8 border-b border-gray-100 px-6"
          aria-label="Payout recipient type"
        >
          {data.tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => handleTabChange(tab.id)}
                className={`border-b-2 py-4 text-sm font-semibold transition-colors ${
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

        {selected.size > 0 ? (
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-violet-100 bg-violet-50 px-6 py-3">
            <p className="text-sm font-semibold text-violet-900">
              {selected.size} {entityLabel} Selected{' '}
              <span className="font-normal text-violet-700">|</span>{' '}
              {data.bulk.totalPrefix}{' '}
              <span className="font-bold">{formatPayoutTotal(selectedTotal)}</span>
            </p>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="px-3 py-1.5 text-sm font-bold uppercase tracking-wide text-violet-700 transition-colors hover:text-violet-900"
              >
                {data.bulk.rejectLabel}
              </button>
              <button
                type="button"
                className="rounded-lg bg-violet-600 px-4 py-2 text-sm font-bold uppercase tracking-wide text-white transition-colors hover:bg-violet-700"
              >
                {data.bulk.approveLabel}
              </button>
            </div>
          </div>
        ) : null}

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                <th className="w-12 px-4 py-3">
                  <input
                    type="checkbox"
                    checked={allSelected}
                    onChange={toggleAll}
                    aria-label={`Select all ${entityLabel.toLowerCase()}`}
                    className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500/30"
                  />
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {entityColumn}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.period}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.destination}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.amount}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.status}
                </th>
                <th className="w-12 px-4 py-3">
                  <span className="sr-only">{data.columns.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {payouts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    No pending payouts.
                  </td>
                </tr>
              ) : (
                payouts.map((payout) => {
                  const isSelected = selected.has(payout.id)
                  return (
                    <tr
                      key={payout.id}
                      className={`border-b border-gray-50 transition-colors last:border-0 ${
                        isSelected ? 'bg-violet-50/60' : 'hover:bg-gray-50/50'
                      }`}
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleOne(payout.id)}
                          aria-label={`Select ${payout.name}`}
                          className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500/30"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-3">
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-xs font-bold ${payout.avatarTone}`}
                          >
                            {payout.initials}
                          </span>
                          <div className="min-w-0">
                            <p className="text-sm font-bold text-gray-900">{payout.name}</p>
                            <p className="text-xs text-gray-500">ID: {payout.id}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-gray-900">{payout.period}</p>
                        <p className="text-xs text-gray-500">{payout.week}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-medium text-gray-900">{payout.bank}</p>
                        <p className="text-xs text-gray-500">{payout.accountMask}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`text-sm font-bold ${
                            isSelected ? 'text-violet-600' : 'text-gray-700'
                          }`}
                        >
                          ₦ {payout.amountDisplay}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <AdminPayoutStatusBadge
                          status={payout.status}
                          label={payout.statusLabel}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          aria-label={`Actions for ${payout.name}`}
                        >
                          <MoreVertical size={18} strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  )
                })
              )}
            </tbody>
          </table>
        </div>

        <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
          <p className="text-sm text-gray-500">
            {data.pagination.showingPrefix}{' '}
            <span className="font-semibold text-gray-800">{data.pagination.range}</span> of{' '}
            {data.pagination.total} {data.pagination.suffix}
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
              className="flex h-9 w-9 items-center justify-center rounded-lg bg-rapid-orange text-sm font-bold text-white"
            >
              {page}
            </button>
            <button
              type="button"
              disabled={page >= 2}
              onClick={() => setPage((p) => p + 1)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-600 transition-colors hover:bg-gray-50 disabled:opacity-40"
              aria-label="Next page"
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </nav>
        </footer>
      </div>
      </div>
    </>
  )
}
