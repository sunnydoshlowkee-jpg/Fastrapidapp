import { Search, SlidersHorizontal } from 'lucide-react'
import MerchantOrderStatusBadge from './MerchantOrderStatusBadge'
import MerchantOrdersCustomerCell from './MerchantOrdersCustomerCell'
import MerchantOrdersPagination from './MerchantOrdersPagination'

const columns = [
  { key: 'id', label: 'Order ID', className: 'min-w-[110px]' },
  { key: 'customer', label: 'Customer', className: 'min-w-[160px]' },
  { key: 'items', label: 'Items Summary', className: 'min-w-[200px]' },
  { key: 'total', label: 'Total', className: 'min-w-[90px]' },
  { key: 'status', label: 'Status', className: 'min-w-[100px]' },
  { key: 'actions', label: 'Actions', className: 'min-w-[72px] text-right' },
]

export default function MerchantOrdersTable({
  orders,
  searchQuery,
  onSearchChange,
  pagination,
  onPageChange,
  onViewOrder,
}) {
  return (
    <section className="overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
      <div className="flex flex-col gap-4 border-b border-merchant-divider p-4 sm:flex-row sm:items-center sm:justify-between lg:p-6">
        <h2 className="text-base font-semibold text-merchant-ink">Recent Orders</h2>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="relative block min-w-0 sm:w-56 lg:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-merchant-muted"
              aria-hidden
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search orders..."
              className="w-full rounded-lg border border-merchant-divider bg-merchant-surface py-2.5 pl-9 pr-3 text-sm text-merchant-ink placeholder:text-merchant-muted focus:border-merchant-primary focus:outline-none focus:ring-2 focus:ring-merchant-primary/20"
            />
          </label>
          <button
            type="button"
            className="flex items-center justify-center gap-2 rounded-lg border border-merchant-divider bg-merchant-surface px-4 py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
          >
            <SlidersHorizontal size={16} strokeWidth={1.75} aria-hidden />
            Sort
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-merchant-divider bg-merchant-canvas/60">
              {columns.map((col) => (
                <th
                  key={col.key}
                  scope="col"
                  className={`px-4 py-3 text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-muted lg:px-6 ${col.className}`}
                >
                  {col.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-sm text-merchant-muted">
                  No orders match your filters.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-merchant-divider last:border-b-0 hover:bg-merchant-canvas/40"
                >
                  <td className="px-4 py-4 lg:px-6">
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="text-sm font-semibold text-merchant-primary hover:text-[#3837e6] hover:underline"
                    >
                      {order.displayId}
                    </button>
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <MerchantOrdersCustomerCell customer={order.customer} />
                  </td>
                  <td className="max-w-[240px] px-4 py-4 text-sm text-merchant-body lg:px-6">
                    <span className="line-clamp-2">{order.itemsSummary}</span>
                  </td>
                  <td className="px-4 py-4 text-sm font-semibold tabular-nums text-merchant-ink lg:px-6">
                    {order.total}
                  </td>
                  <td className="px-4 py-4 lg:px-6">
                    <MerchantOrderStatusBadge status={order.status} />
                  </td>
                  <td className="px-4 py-4 text-right lg:px-6">
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="text-sm font-semibold text-merchant-primary hover:text-[#3837e6] hover:underline"
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MerchantOrdersPagination
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={onPageChange}
      />
    </section>
  )
}
