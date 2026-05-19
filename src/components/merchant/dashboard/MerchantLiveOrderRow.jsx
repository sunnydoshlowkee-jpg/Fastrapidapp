import { Check, ShoppingBag, UtensilsCrossed } from 'lucide-react'

const icons = {
  utensils: UtensilsCrossed,
  cart: ShoppingBag,
  burger: UtensilsCrossed,
}

const iconToneStyles = {
  blue: 'bg-merchant-nav-active text-merchant-primary',
  purple: 'bg-[rgba(67,66,255,0.14)] text-merchant-primary',
}

export default function MerchantLiveOrderRow({ order, onAccept, onReject, onReady }) {
  const Icon = icons[order.icon] || UtensilsCrossed
  const isPreparing = order.status === 'preparing'

  return (
    <article className="rounded-lg bg-merchant-canvas p-4">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex min-w-0 flex-1 gap-3">
          <div
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconToneStyles[order.iconTone] || iconToneStyles.blue}`}
            aria-hidden
          >
            <Icon size={18} strokeWidth={1.75} />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-merchant-ink">
              {order.id}
              <span className="font-normal text-merchant-muted"> · {order.customer}</span>
            </p>
            <p className="mt-1 text-xs leading-[18px] text-merchant-muted">{order.items}</p>
          </div>
        </div>

        {isPreparing ? (
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:min-w-[200px]">
            <p className="text-center text-[10px] font-bold uppercase tracking-[0.08em] text-[#E67E22] sm:text-left">
              Preparing · {order.timeRemaining}
            </p>
            <button
              type="button"
              onClick={() => onReady?.(order.id)}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3837e6]"
            >
              <Check size={16} strokeWidth={2} aria-hidden />
              Ready for Pickup
            </button>
          </div>
        ) : (
          <div className="flex gap-2 sm:shrink-0">
            <button
              type="button"
              onClick={() => onReject?.(order.id)}
              className="flex-1 rounded-lg bg-merchant-icon-tile px-4 py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input sm:flex-none"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => onAccept?.(order.id)}
              className="flex-1 rounded-lg bg-merchant-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#3837e6] sm:flex-none"
            >
              Accept
            </button>
          </div>
        )}
      </div>
    </article>
  )
}
