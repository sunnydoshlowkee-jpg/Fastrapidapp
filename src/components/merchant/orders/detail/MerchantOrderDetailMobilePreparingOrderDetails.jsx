export default function MerchantOrderDetailMobilePreparingOrderDetails({ lineItems, pricing }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Order Details</h2>

      <ul className="mt-4 flex flex-col gap-4">
        {lineItems.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-xs font-bold text-merchant-primary">
              {item.quantity}
            </span>
            <p className="min-w-0 flex-1 text-sm font-semibold text-merchant-ink">{item.name}</p>
            <p className="shrink-0 text-sm font-bold tabular-nums text-merchant-ink">{item.price}</p>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 rounded-xl bg-merchant-input p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-merchant-muted">Subtotal</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-merchant-muted">Tax &amp; Fees</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.taxAndFees}</span>
        </div>
        <div className="flex items-center justify-between border-t border-merchant-divider pt-3">
          <span className="font-bold text-merchant-ink">Total</span>
          <span className="text-lg font-bold tabular-nums text-merchant-primary">{pricing.total}</span>
        </div>
      </div>
    </article>
  )
}
