export default function MerchantOrderDetailMobilePricingCard({ pricing }) {
  return (
    <article className="overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
      <div className="space-y-2.5 p-4 text-sm">
        <div className="flex justify-between">
          <span className="text-merchant-muted">Subtotal</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.subtotal}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-merchant-muted">Delivery Fee</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.deliveryFee}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-merchant-muted">Service Charge</span>
          <span className="font-medium tabular-nums text-merchant-ink">{pricing.serviceCharge}</span>
        </div>
      </div>
      <div className="flex items-center justify-between bg-merchant-input px-4 py-3">
        <span className="text-xs font-bold uppercase tracking-wide text-merchant-ink">Grand total</span>
        <span className="text-base font-bold tabular-nums text-merchant-ink">{pricing.grandTotal}</span>
      </div>
    </article>
  )
}
