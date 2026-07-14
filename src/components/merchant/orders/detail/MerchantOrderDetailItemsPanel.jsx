export default function MerchantOrderDetailItemsPanel({ itemsHeader, lineItems, pricing }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
      <div className="border-b border-merchant-divider p-5 lg:p-6">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          Order items
        </p>
        <div className="mt-3 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <p className="text-base font-bold text-merchant-ink">{itemsHeader.countLabel}</p>
          <p className="text-sm text-merchant-muted">
            Total value{' '}
            <span className="text-base font-bold text-merchant-primary">{itemsHeader.totalValue}</span>
          </p>
        </div>
      </div>

      <ul className="divide-y divide-merchant-divider">
        {lineItems.map((item) => (
          <li key={item.id} className="flex gap-4 p-5 lg:p-6">
            <img
              src={item.image}
              alt=""
              className="h-16 w-16 shrink-0 rounded-lg object-cover sm:h-20 sm:w-20"
            />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-bold text-merchant-ink sm:text-base">{item.name}</p>
              <p className="mt-0.5 text-sm text-merchant-muted">{item.description}</p>
              <p className="mt-2 text-sm font-semibold text-merchant-ink">{item.quantityLabel}</p>
              <p className="mt-1 text-xs text-merchant-muted">SKU: {item.sku}</p>
            </div>
          </li>
        ))}
      </ul>

      <div className="m-5 rounded-xl bg-merchant-input p-4 lg:m-6 lg:p-5">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-merchant-body">Subtotal</span>
            <span className="font-medium tabular-nums text-merchant-ink">{pricing.subtotal}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-merchant-body">Delivery Fee</span>
            <span className="font-medium tabular-nums text-merchant-ink">{pricing.deliveryFee}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-merchant-body">Service Charge</span>
            <span className="font-medium tabular-nums text-merchant-ink">{pricing.serviceCharge}</span>
          </div>
        </div>
        <div className="mt-4 flex justify-between border-t border-merchant-divider pt-4">
          <span className="text-sm font-bold text-merchant-ink">Grand Total</span>
          <span className="text-lg font-bold tabular-nums text-merchant-primary">{pricing.grandTotal}</span>
        </div>
      </div>
    </article>
  )
}
