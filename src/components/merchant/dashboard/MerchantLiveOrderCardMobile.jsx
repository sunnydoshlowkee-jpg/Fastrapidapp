export default function MerchantLiveOrderCardMobile({ order, onAccept, onReject, onDelivered }) {
  const isReady = order.status === 'ready'

  return (
    <article className="rounded-lg border border-merchant-divider bg-merchant-canvas p-4">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <p className="text-sm font-bold text-merchant-ink">
              {order.displayId} {order.customer}
            </p>
            {order.badge && (
              <span className="rounded-md bg-merchant-nav-active px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-merchant-primary">
                {order.badge}
              </span>
            )}
          </div>
          <p className="mt-1 text-xs text-merchant-muted">{order.summary}</p>
        </div>
        <p className="shrink-0 text-sm font-bold text-merchant-ink">{order.amount}</p>
      </div>

      {isReady ? (
        <button
          type="button"
          onClick={() => onDelivered?.(order.id)}
          className="mt-4 w-full rounded-lg bg-merchant-icon-tile py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
        >
          Mark as Delivered
        </button>
      ) : (
        <div className="mt-4 flex gap-2">
          <button
            type="button"
            onClick={() => onReject?.(order.id)}
            className="flex-1 rounded-lg bg-merchant-icon-tile py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
          >
            Reject
          </button>
          <button
            type="button"
            onClick={() => onAccept?.(order.id)}
            className="flex-1 rounded-lg bg-merchant-primary py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3837e6]"
          >
            Accept
          </button>
        </div>
      )}
    </article>
  )
}
