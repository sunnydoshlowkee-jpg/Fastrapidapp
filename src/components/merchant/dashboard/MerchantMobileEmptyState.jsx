import { Store } from 'lucide-react'

export default function MerchantMobileEmptyState({
  title,
  description,
  action,
  onAction,
}) {
  return (
    <section className="rounded-merchant-stat bg-merchant-surface px-5 py-8 text-center shadow-merchant-stat">
      <div
        className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-merchant-icon-tile text-merchant-ink"
        aria-hidden
      >
        <Store size={26} strokeWidth={1.5} />
      </div>

      <h2 className="text-lg font-semibold tracking-[-0.02em] text-merchant-ink">{title}</h2>
      <p className="mx-auto mt-2 max-w-[280px] text-sm leading-6 text-merchant-muted">
        {description}
      </p>

      <button
        type="button"
        onClick={onAction}
        className="mt-6 w-full rounded-lg bg-merchant-icon-tile py-3.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
      >
        {action}
      </button>
    </section>
  )
}
