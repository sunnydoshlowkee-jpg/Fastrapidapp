import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Download, Filter, MoreVertical, Plus, Search } from 'lucide-react'
import { ADMIN_ORDERS } from '../../../services/data/adminOrders.mock'
import {
  buildAdminOrderTabs,
  buildAdminOrdersPaginationPages,
  fetchAdminOrders,
  formatAdminOrdersPaginationSummary,
  mapAdminOrderFromApi,
} from '../../../services/adminOrdersService'
import { exportAdminOrdersCsv } from '../../../services/adminExportService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import AdminOrdersMobileCard from './AdminOrdersMobileCard'
import AdminOrdersStatusBadge from './AdminOrdersStatusBadge'

const pageConfig = ADMIN_ORDERS

export default function AdminOrdersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [selected, setSelected] = useState(new Set())
  const [page, setPage] = useState(1)
  const [mobileSearch, setMobileSearch] = useState('')
  const [search, setSearch] = useState('')
  const [orders, setOrders] = useState([])
  const [pagination, setPagination] = useState(null)
  const [tabs, setTabs] = useState(pageConfig.tabs)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [exporting, setExporting] = useState(false)

  const loadOrders = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view orders.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await fetchAdminOrders({
        search: mobileSearch || search,
        status: activeTab,
        page,
        perPage: 15,
      })

      setOrders(result.orders.map(mapAdminOrderFromApi))
      setPagination(result.pagination)
      setTabs(buildAdminOrderTabs(result.tabCounts))
    } catch (err) {
      setOrders([])
      setPagination(null)
      setError(err.message || 'Could not load orders.')
    } finally {
      setLoading(false)
    }
  }, [activeTab, mobileSearch, page, search])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  const filtered = orders
  const mobileFiltered = filtered

  const allSelected = filtered.length > 0 && selected.size === filtered.length
  const paginationPages = buildAdminOrdersPaginationPages(pagination)
  const subtitle = pagination?.total
    ? `Manage and track ${pagination.total.toLocaleString()} orders in the system.`
    : pageConfig.subtitle

  const toggleAll = () => {
    if (allSelected) setSelected(new Set())
    else setSelected(new Set(filtered.map((o) => o.id)))
  }

  const toggleOne = (id) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  return (
    <div>
      <div className="lg:hidden">
        <div className="sticky top-[57px] z-[5] bg-[#F9F9FA]/90 px-5 py-2 backdrop-blur-md">
          <div className="relative">
            <Search
              size={18}
              strokeWidth={2}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#584237]/50"
              aria-hidden
            />
            <input
              type="search"
              value={mobileSearch}
              onChange={(e) => {
                setMobileSearch(e.target.value)
                setPage(1)
              }}
              placeholder={pageConfig.mobileSearchPlaceholder ?? pageConfig.searchPlaceholder}
              className="w-full rounded-lg bg-[#F3F3F4] py-3 pl-10 pr-4 text-sm text-gray-900 outline-none placeholder:text-[#584237]/50 focus:ring-2 focus:ring-rapid-orange/30"
            />
          </div>

          <nav
            className="mt-4 flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Order status filters"
          >
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    setActiveTab(tab.id)
                    setSelected(new Set())
                    setPage(1)
                  }}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-4 py-2 text-xs font-semibold tracking-[0.025em] transition-colors ${
                    isActive
                      ? 'bg-[#F97316] text-[#582200]'
                      : 'bg-[#F3F3F4] text-[#584237] hover:bg-gray-200'
                  }`}
                >
                  {tab.dot ? (
                    <span className="h-1.5 w-1.5 rounded-full bg-[#842BD2]" aria-hidden />
                  ) : null}
                  {tab.mobileLabel ?? tab.label}
                </button>
              )
            })}
          </nav>
        </div>

        <div className="space-y-4 px-5 py-6">
          {loading ? (
            <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
              Loading orders...
            </p>
          ) : error ? (
            <p className="rounded-xl bg-white p-6 text-center text-sm text-red-600 shadow-sm">{error}</p>
          ) : mobileFiltered.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
              No orders match this filter.
            </p>
          ) : (
            mobileFiltered.map((order) => (
              <AdminOrdersMobileCard
                key={order.id}
                order={order}
                trackRiderLabel={pageConfig.trackRiderLabel}
              />
            ))
          )}
        </div>
      </div>

      <div className="hidden p-6 lg:block">
        <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">{pageConfig.title}</h1>
            <p className="mt-1 text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              <Filter size={16} strokeWidth={2} aria-hidden />
              {pageConfig.filtersLabel}
            </button>
            <button
              type="button"
              disabled={exporting}
              onClick={async () => {
                setExporting(true)
                setError('')
                try {
                  await exportAdminOrdersCsv({ search, status: activeTab })
                } catch (err) {
                  setError(err.message || 'Export failed.')
                } finally {
                  setExporting(false)
                }
              }}
              className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-rapid-orange transition-colors hover:bg-orange-100 disabled:opacity-50"
            >
              <Download size={16} strokeWidth={2} aria-hidden />
              {exporting ? 'Exporting…' : pageConfig.exportLabel}
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
            >
              <Plus size={16} strokeWidth={2.5} aria-hidden />
              {pageConfig.newOrderLabel}
            </button>
          </div>
        </header>

        <div className="mb-6 max-w-md">
          <div className="relative">
            <Search
              size={18}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value)
                setPage(1)
              }}
              placeholder={pageConfig.searchPlaceholder}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
            />
          </div>
        </div>

        <nav className="mb-6 flex flex-wrap gap-2" aria-label="Order status filters">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveTab(tab.id)
                  setSelected(new Set())
                  setPage(1)
                }}
                className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-rapid-orange text-white shadow-sm'
                    : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
                }`}
              >
                {tab.dot ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-violet-400" aria-hidden />
                ) : null}
                {tab.label}
              </button>
            )
          })}
        </nav>

        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="w-12 px-4 py-3">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      aria-label="Select all orders"
                      className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange/30"
                    />
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.orderId}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.customer}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.merchant}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.items}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.total}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.status}
                  </th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {pageConfig.columns.elapsed}
                  </th>
                  <th className="w-12 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    <span className="sr-only">{pageConfig.columns.actions}</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-500">
                      Loading orders...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-sm text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : filtered.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-12 text-center text-sm text-gray-500">
                      No orders match this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          checked={selected.has(order.id)}
                          onChange={() => toggleOne(order.id)}
                          aria-label={`Select ${order.id}`}
                          className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange/30"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <Link
                          to={`/admin/orders/${order.numericId}`}
                          className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange"
                        >
                          {order.id}
                        </Link>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900">{order.customer.name}</p>
                        <p className="text-xs text-gray-500">{order.customer.phone}</p>
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900">{order.merchant.name}</p>
                        <p className="text-xs text-gray-500">{order.merchant.location}</p>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-700">
                        {order.items} {order.items === 1 ? 'Item' : 'Items'}
                      </td>
                      <td className="px-4 py-4 text-sm font-bold text-violet-600">₦ {order.total}</td>
                      <td className="px-4 py-4">
                        <AdminOrdersStatusBadge status={order.status} label={order.statusLabel} />
                      </td>
                      <td className="px-4 py-4">
                        <span
                          className={`inline-flex items-center gap-1 text-sm font-semibold ${
                            order.elapsedWarning ? 'text-red-600' : 'text-gray-700'
                          }`}
                        >
                          {order.elapsedWarning ? (
                            <AlertTriangle size={14} strokeWidth={2} aria-hidden />
                          ) : null}
                          {order.elapsed}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          aria-label={`Actions for ${order.id}`}
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

          <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-4 py-4">
            <p className="text-sm text-gray-500">
              {formatAdminOrdersPaginationSummary(pagination)}
            </p>
            <nav className="flex items-center gap-1" aria-label="Pagination">
              <button
                type="button"
                disabled={!pagination || page <= 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                ‹
              </button>
              {paginationPages.map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  className={`min-w-[2rem] rounded-lg px-3 py-1.5 text-sm font-semibold ${
                    page === n ? 'bg-rapid-orange text-white' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={!pagination || page >= pagination.last_page}
                onClick={() => setPage((p) => Math.min(pagination.last_page, p + 1))}
                className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
              >
                ›
              </button>
            </nav>
          </footer>
        </div>
      </div>
    </div>
  )
}
