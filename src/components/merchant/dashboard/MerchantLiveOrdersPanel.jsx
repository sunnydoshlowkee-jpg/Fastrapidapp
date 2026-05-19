import { Link } from 'react-router-dom'
import MerchantLiveOrderRow from './MerchantLiveOrderRow'

export default function MerchantLiveOrdersPanel({ orders, onAccept, onReject, onReady }) {
  return (
    <section className="flex flex-col rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <h2 className="text-base font-semibold text-merchant-ink">Live Orders</h2>

      <div className="mt-4 flex flex-col gap-3">
        {orders.map((order) => (
          <MerchantLiveOrderRow
            key={order.id}
            order={order}
            onAccept={onAccept}
            onReject={onReject}
            onReady={onReady}
          />
        ))}
      </div>

      <Link
        to="/merchant/orders"
        className="mt-4 flex w-full items-center justify-center rounded-lg bg-merchant-nav-active py-3.5 text-sm font-semibold text-merchant-primary transition-colors hover:bg-[rgba(67,66,255,0.12)]"
      >
        View All Orders
      </Link>
    </section>
  )
}
