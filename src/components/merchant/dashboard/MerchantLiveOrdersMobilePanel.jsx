import { Link } from 'react-router-dom'
import MerchantLiveOrderCardMobile from './MerchantLiveOrderCardMobile'

export default function MerchantLiveOrdersMobilePanel({ orders, onAccept, onReject, onDelivered }) {
  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-merchant-ink">Live Orders</h2>
        <Link to="/merchant/orders" className="text-sm font-semibold text-merchant-primary hover:text-[#3837e6]">
          View All
        </Link>
      </div>

      <div className="mt-4 flex flex-col gap-3">
        {orders.map((order) => (
          <MerchantLiveOrderCardMobile
            key={order.id}
            order={order}
            onAccept={onAccept}
            onReject={onReject}
            onDelivered={onDelivered}
          />
        ))}
      </div>
    </section>
  )
}
