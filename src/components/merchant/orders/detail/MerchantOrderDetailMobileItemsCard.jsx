export default function MerchantOrderDetailMobileItemsCard({ lineItems, totalValue }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          Order items
        </p>
        <p className="text-right text-sm">
          <span className="text-merchant-muted">Total Value: </span>
          <span className="font-bold text-merchant-ink">{totalValue}</span>
        </p>
      </div>

      <ul className="mt-4 divide-y divide-merchant-divider">
        {lineItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            <img
              src={item.image}
              alt=""
              className="h-12 w-12 shrink-0 rounded-lg object-cover"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-merchant-ink">{item.name}</p>
              <p className="text-xs text-merchant-muted">{item.quantity}</p>
            </div>
            <p className="shrink-0 text-sm font-bold tabular-nums text-merchant-ink">{item.price}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
