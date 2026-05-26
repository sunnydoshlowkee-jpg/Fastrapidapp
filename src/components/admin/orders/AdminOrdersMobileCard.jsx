import { Link } from 'react-router-dom'
import { Bike, Clock, Map, Phone } from 'lucide-react'

const statusPillStyles = {
  preparing: 'bg-[#BE7BFF]/30 text-[#842BD2]',
  live: 'bg-[#BE7BFF]/30 text-[#842BD2]',
  dispatched: 'bg-[#FDA77A]/30 text-[#9D4300]',
  delivered: 'bg-[#F3F3F4] text-[#584237]',
  cancelled: 'bg-[#F3F3F4] text-[#584237]',
  failed: 'bg-red-100 text-red-700',
  refunded: 'bg-amber-100 text-amber-800',
}

const sideBarStyles = {
  preparing: 'bg-[#842BD2]',
  live: 'bg-[#842BD2]',
}

export default function AdminOrdersMobileCard({ order, trackRiderLabel }) {
  const isDelivered = order.status === 'delivered'
  const showLeftBar = order.status === 'preparing' || order.status === 'live'
  const action = order.mobileAction ?? 'none'

  return (
    <article
      className={`relative overflow-hidden rounded-xl bg-white p-4 shadow-[0px_4px_12px_rgba(26,28,29,0.02)] ${
        isDelivered ? 'opacity-75' : ''
      }`}
    >
      {showLeftBar ? (
        <span
          className={`absolute inset-y-0 left-0 w-1 ${sideBarStyles[order.status] ?? ''}`}
          aria-hidden
        />
      ) : null}

      <div className="flex items-start justify-between gap-4 pl-2">
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-center gap-2">
            <Link
              to={`/admin/orders/${order.id}`}
              className="text-xs font-bold text-[#584237] transition-colors hover:text-rapid-orange"
            >
              #{order.id}
            </Link>
            <span
              className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] ${
                statusPillStyles[order.status] ?? statusPillStyles.dispatched
              }`}
            >
              {order.statusLabel}
            </span>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">
            {order.merchant.label ?? order.merchant.name}
          </h3>
        </div>

        <div className="text-right">
          <p
            className={`text-sm font-bold ${
              isDelivered ? 'text-[#842BD2]/90 line-through decoration-[#842BD2]/40' : 'text-[#842BD2]'
            }`}
          >
            ₦{order.total}
          </p>
          <p
            className={`mt-0.5 flex items-center justify-end gap-1 text-[10px] ${
              isDelivered ? 'font-normal text-[#584237]' : 'font-medium text-gray-900'
            }`}
          >
            {!isDelivered ? (
              <Clock
                size={10}
                strokeWidth={2}
                className={order.status === 'dispatched' ? 'text-gray-900' : 'text-[#584237]'}
                aria-hidden
              />
            ) : null}
            <span className={isDelivered ? '' : ''}>
              {order.elapsed} {order.elapsedSuffix ?? ''}
            </span>
          </p>
        </div>
      </div>

      {action !== 'none' ? (
        <div className="mt-3 flex items-end justify-between gap-4 border-t border-[#F3F3F4]/50 pt-3 pl-2">
          <div>
            <p className="text-xs text-[#584237]">Customer</p>
            <p className="mt-0.5 text-sm font-medium text-gray-900">
              {order.customer.shortName ?? order.customer.name}
            </p>
          </div>

          {action === 'contact' ? (
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label={`Call ${order.customer.shortName ?? order.customer.name}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F3F4] text-gray-900 transition-colors hover:bg-gray-200"
              >
                <Phone size={12} strokeWidth={2} />
              </button>
              <button
                type="button"
                aria-label={`Track rider for ${order.id}`}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-[#F3F3F4] text-gray-900 transition-colors hover:bg-gray-200"
              >
                <Bike size={14} strokeWidth={2} />
              </button>
            </div>
          ) : null}

          {action === 'trackRider' ? (
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg bg-[#F97316]/10 px-3 py-1.5 text-xs font-medium text-[#9D4300] transition-colors hover:bg-[#F97316]/15"
            >
              <Map size={12} strokeWidth={2} aria-hidden />
              {trackRiderLabel}
            </button>
          ) : null}
        </div>
      ) : null}
    </article>
  )
}
