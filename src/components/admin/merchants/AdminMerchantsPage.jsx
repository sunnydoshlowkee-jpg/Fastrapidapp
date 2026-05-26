import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Plus,
  Search,
} from 'lucide-react'
import { ADMIN_MERCHANTS, ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminApproveMerchantModal from './AdminApproveMerchantModal'
import AdminMerchantsMobilePage from './AdminMerchantsMobilePage'
import AdminMerchantStatusBadge from './AdminMerchantStatusBadge'
import AdminMerchantVerificationCell from './AdminMerchantVerificationCell'
import AdminRejectMerchantModal from './AdminRejectMerchantModal'

const tabFilterMap = {
  all: () => true,
  pending: (m) => m.status === 'review' || m.status === 'pending',
  active: (m) => m.status === 'active',
  suspended: (m) => m.status === 'suspended',
  rejected: (m) => m.status === 'rejected',
}

export default function AdminMerchantsPage() {
  const data = ADMIN_MERCHANTS
  const outletCtx = useOutletContext() ?? {}
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [approveTarget, setApproveTarget] = useState(null)
  const [rejectTarget, setRejectTarget] = useState(null)

  const filtered = useMemo(() => {
    const tabFilter = tabFilterMap[activeTab] ?? tabFilterMap.all
    const q = search.trim().toLowerCase()
    return data.merchants.filter((m) => {
      if (!tabFilter(m)) return false
      if (!q) return true
      return (
        m.name.toLowerCase().includes(q) ||
        m.id.toLowerCase().includes(q) ||
        m.location.toLowerCase().includes(q)
      )
    })
  }, [activeTab, data.merchants, search])

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminMerchantsMobilePage
          data={data}
          onOpenDrawer={outletCtx.openDrawer}
        />
      </div>

      <div className="hidden h-full min-h-0 flex-1 flex-col lg:flex">
      <header className="flex shrink-0 items-center justify-between gap-4 border-b border-gray-200 bg-white px-6 py-4">
        <h1 className="text-sm font-bold uppercase tracking-[0.2em] text-gray-900">
          {data.headerLabel}
        </h1>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-gray-500">{data.subtitle}</p>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-72">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={data.searchPlaceholder}
                className="w-full rounded-lg bg-gray-100 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-rapid-orange/30"
              />
            </div>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-3.5 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Download size={16} strokeWidth={2} aria-hidden />
              {data.exportLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-3.5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
            >
              <Plus size={16} strokeWidth={2.5} aria-hidden />
              New Merchant
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <nav
            className="flex flex-wrap gap-7 border-b border-gray-100 px-6 pt-4"
            aria-label="Merchant status filters"
          >
            {data.tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-rapid-orange text-rapid-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                  {tab.count !== undefined ? (
                    <span className="inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full bg-rapid-orange px-1.5 text-[10px] font-bold text-white">
                      {tab.count}
                    </span>
                  ) : null}
                </button>
              )
            })}
          </nav>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/60">
                  {Object.values(data.columns).map((label) => (
                    <th
                      key={label}
                      className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 first:pl-6"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={Object.keys(data.columns).length}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No merchants match this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((merchant) => (
                    <tr
                      key={merchant.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/40 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`${ADMIN_MERCHANTS_PATH}/${merchant.id}`}
                          className="flex items-center gap-3 transition-opacity hover:opacity-90"
                        >
                          <span
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold ${merchant.logoTone}`}
                          >
                            {merchant.logoGlyph}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange">
                              {merchant.name}
                            </p>
                            <p className="text-xs text-gray-500">ID: {merchant.id}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex rounded-md px-2 py-0.5 text-[11px] font-semibold ${merchant.typeTone}`}
                        >
                          {merchant.type}
                        </span>
                        <p className="mt-1 text-xs text-gray-500">
                          <span aria-hidden>◎ </span>
                          {merchant.location}
                        </p>
                      </td>
                      <td className="px-4 py-4">
                        <AdminMerchantStatusBadge
                          status={merchant.status}
                          label={merchant.statusLabel}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <AdminMerchantVerificationCell
                          verification={merchant.verification}
                          label={merchant.verificationLabel}
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-bold text-gray-900">{merchant.orders}</p>
                        <p className="text-xs font-semibold text-violet-600">{merchant.gmv}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-600">{merchant.joined}</td>
                      <td className="px-4 py-4 text-right">
                        {merchant.reviewable ? (
                          <div className="inline-flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => setRejectTarget(merchant.rejectContext)}
                              className="rounded-lg border border-red-200 bg-white px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-red-600 transition-colors hover:bg-red-50"
                            >
                              Reject
                            </button>
                            <button
                              type="button"
                              onClick={() => setApproveTarget(merchant.approveContext)}
                              className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-white transition-colors hover:bg-emerald-600"
                            >
                              Review
                            </button>
                          </div>
                        ) : (
                          <button
                            type="button"
                            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                            aria-label={`Actions for ${merchant.name}`}
                          >
                            <MoreVertical size={18} strokeWidth={2} />
                          </button>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-6 py-4">
            <p className="text-xs text-gray-500">
              {data.pagination.showingPrefix}{' '}
              <span className="font-semibold text-gray-700">
                {data.pagination.showingRange}
              </span>{' '}
              {data.pagination.showingSuffix}
            </p>
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50 disabled:opacity-40"
                aria-label="Previous page"
                disabled
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>
              <button
                type="button"
                className="flex h-8 w-8 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
                aria-label="Next page"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </nav>
          </footer>
        </div>
      </div>

      <AdminApproveMerchantModal
        isOpen={approveTarget !== null}
        onClose={() => setApproveTarget(null)}
        merchant={approveTarget}
      />
      <AdminRejectMerchantModal
        isOpen={rejectTarget !== null}
        onClose={() => setRejectTarget(null)}
        merchant={rejectTarget}
      />
      </div>
    </>
  )
}
