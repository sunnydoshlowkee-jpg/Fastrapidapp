export default function MerchantOrderDetailPreparingItemsCard({ lineItems, pricing }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <h2 className="text-base font-semibold text-merchant-ink">Order Items</h2>

      <ul className="mt-4 flex flex-col gap-3">
        {lineItems.map((item) => (
          <li key={item.id} className="rounded-lg bg-merchant-input p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="text-sm font-semibold text-merchant-ink">{item.name}</p>
                {item.note && (
                  <p className="mt-1 text-sm text-merchant-muted">{item.note}</p>
                )}
              </div>
              <p className="shrink-0 text-sm font-bold tabular-nums text-merchant-ink">{item.price}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 space-y-2 border-t border-merchant-divider pt-5 text-sm">
        <div className="flex justify-between">
          <span className="text-merchant-muted">Subtotal</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-merchant-muted">Tax &amp; Fees</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.taxAndFees}</span>
        </div>
        <div className="flex justify-between pt-1">
          <span className="font-bold text-merchant-ink">Total</span>
          <span className="text-base font-bold tabular-nums text-merchant-ink">{pricing.total}</span>
        </div>
      </div>
    </article>
  )
}
