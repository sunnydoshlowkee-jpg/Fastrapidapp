import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Download, Filter, MoreVertical, Plus } from 'lucide-react'
import { ADMIN_ORDERS } from '../../../services/data/adminOrders.mock'
import AdminOrdersStatusBadge from './AdminOrdersStatusBadge'

export default function AdminOrdersPage() {
  const data = ADMIN_ORDERS
  const [activeTab, setActiveTab] = useState('all')
  const [selected, setSelected] = useState(new Set())
  const [page, setPage] = useState(1)

  const filtered = useMemo(() => {
    if (activeTab === 'all') return data.orders
    return data.orders.filter((order) => order.status === activeTab)
  }, [activeTab, data.orders])

  const allSelected = filtered.length > 0 && selected.size === filtered.length

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
    <div className="p-6">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{data.subtitle}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            <Filter size={16} strokeWidth={2} aria-hidden />
            {data.filtersLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-rapid-orange transition-colors hover:bg-orange-100"
          >
            <Download size={16} strokeWidth={2} aria-hidden />
            {data.exportLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Plus size={16} strokeWidth={2.5} aria-hidden />
            {data.newOrderLabel}
          </button>
        </div>
      </header>

      <nav
        className="mb-6 flex flex-wrap gap-2"
        aria-label="Order status filters"
      >
        {data.tabs.map((tab) => {
          const isActive = activeTab === tab.id
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id)
                setSelected(new Set())
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
                  {data.columns.orderId}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.customer}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.merchant}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.items}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.total}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.status}
                </th>
                <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  {data.columns.elapsed}
                </th>
                <th className="w-12 px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                  <span className="sr-only">{data.columns.actions}</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
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
                        to={`/admin/orders/${order.id}`}
                        className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange"
                      >
                        #{order.id}
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
                    <td className="px-4 py-4 text-sm font-bold text-violet-600">
                      ₦ {order.total}
                    </td>
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
            {data.pagination.showingPrefix}{' '}
            <span className="font-semibold text-gray-800">{data.pagination.range}</span> of{' '}
            {data.pagination.total.toLocaleString()} {data.pagination.totalLabel}
          </p>
          <nav className="flex items-center gap-1" aria-label="Pagination">
            <button
              type="button"
              disabled={page <= 1}
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            >
              ‹
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setPage(n)}
                className={`min-w-[2rem] rounded-lg px-3 py-1.5 text-sm font-semibold ${
                  page === n
                    ? 'bg-rapid-orange text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                {n}
              </button>
            ))}
            <span className="px-1 text-gray-400">…</span>
            <button
              type="button"
              onClick={() => setPage(data.pagination.totalPages)}
              className={`min-w-[2rem] rounded-lg px-3 py-1.5 text-sm font-semibold ${
                page === data.pagination.totalPages
                  ? 'bg-rapid-orange text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {data.pagination.totalPages}
            </button>
            <button
              type="button"
              disabled={page >= data.pagination.totalPages}
              onClick={() => setPage((p) => Math.min(data.pagination.totalPages, p + 1))}
              className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
            >
              ›
            </button>
          </nav>
        </footer>
      </div>
    </div>
  )
}
