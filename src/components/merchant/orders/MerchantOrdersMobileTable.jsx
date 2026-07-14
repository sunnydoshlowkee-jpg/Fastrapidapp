import { Search, SlidersHorizontal } from 'lucide-react'
import MerchantOrderStatusBadge from './MerchantOrderStatusBadge'
import MerchantOrdersPagination from './MerchantOrdersPagination'

export default function MerchantOrdersMobileTable({
  orders,
  searchQuery,
  onSearchChange,
  pagination,
  onPageChange,
  onViewOrder,
}) {
  return (
    <section className="overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
      <div className="border-b border-merchant-divider p-4">
        <h2 className="text-base font-bold text-merchant-ink">Recent Orders</h2>
        <div className="mt-3 flex gap-2">
          <label className="relative min-w-0 flex-1">
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
            className="flex h-[42px] w-[42px] shrink-0 items-center justify-center rounded-lg bg-merchant-icon-tile text-merchant-ink transition-colors hover:bg-merchant-input"
            aria-label="Filter orders"
          >
            <SlidersHorizontal size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[320px] border-collapse text-left">
          <thead>
            <tr className="bg-merchant-canvas/80">
              <th
                scope="col"
                className="px-3 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted"
              >
                Order ID
              </th>
              <th
                scope="col"
                className="px-2 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted"
              >
                Total
              </th>
              <th
                scope="col"
                className="px-2 py-2.5 text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted"
              >
                Status
              </th>
              <th
                scope="col"
                className="px-3 py-2.5 text-right text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-10 text-center text-sm text-merchant-muted">
                  No orders match your filters.
                </td>
              </tr>
            ) : (
              orders.map((order) => (
                <tr key={order.id} className="border-t border-merchant-divider">
                  <td className="px-3 py-3">
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="text-sm font-semibold text-merchant-primary hover:underline"
                    >
                      {order.displayId}
                    </button>
                  </td>
                  <td className="px-2 py-3 text-sm font-semibold tabular-nums text-merchant-ink">
                    {order.total}
                  </td>
                  <td className="px-2 py-3">
                    <MerchantOrderStatusBadge status={order.status} variant="mobile" />
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      type="button"
                      onClick={() => onViewOrder?.(order.id)}
                      className="text-sm font-semibold text-merchant-primary hover:underline"
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
        variant="mobile"
        page={pagination.page}
        pageSize={pagination.pageSize}
        total={pagination.total}
        onPageChange={onPageChange}
      />
    </section>
  )
}
