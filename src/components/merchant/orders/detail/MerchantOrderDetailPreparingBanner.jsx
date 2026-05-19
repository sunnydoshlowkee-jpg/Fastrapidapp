import { Soup } from 'lucide-react'

export default function MerchantOrderDetailPreparingBanner({
  title,
  targetCompletion,
  onMarkReady,
}) {
  return (
    <article className="flex flex-col gap-4 rounded-merchant-stat border-l-4 border-merchant-primary bg-merchant-surface p-4 shadow-merchant-stat sm:flex-row sm:items-center sm:justify-between sm:p-5">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <Soup size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div>
          <p className="text-base font-bold text-merchant-ink">{title}</p>
          <p className="mt-0.5 text-sm text-merchant-muted">
            Target completion: <span className="font-medium text-merchant-ink">{targetCompletion}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onMarkReady}
        className="w-full shrink-0 rounded-lg bg-merchant-primary px-5 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6] sm:w-auto"
      >
        Mark Ready for Pickup
      </button>
    </article>
  )
}
