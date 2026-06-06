import { Store } from 'lucide-react'

export default function MerchantMobileEmptyState({
  title,
  description,
  primaryAction,
  secondaryAction,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section className="flex min-h-[400px] flex-col items-center justify-center rounded-xl bg-merchant-surface px-6 py-10 text-center">
      <div
        className="mb-6 flex h-32 w-32 items-center justify-center rounded-full bg-merchant-input text-merchant-muted"
        aria-hidden
      >
        <Store size={50} strokeWidth={1.5} />
      </div>

      <h2 className="text-lg font-bold leading-[27px] tracking-[-0.45px] text-merchant-ink">
        {title}
      </h2>
      <p className="mx-auto mt-2 max-w-[255px] text-base leading-6 text-merchant-mobile-muted">
        {description}
      </p>

      <div className="mt-8 flex w-full max-w-[262px] flex-col gap-4">
        {primaryAction ? (
          <button
            type="button"
            onClick={onPrimaryClick}
            className="w-full rounded-xl bg-merchant-primary py-4 text-base font-bold leading-6 text-white shadow-merchant-cta transition-colors hover:bg-merchant-primary-dark"
          >
            {primaryAction}
          </button>
        ) : null}
        {secondaryAction ? (
          <button
            type="button"
            onClick={onSecondaryClick}
            className="w-full rounded-xl bg-merchant-mobile-secondary py-4 text-base font-bold leading-6 text-merchant-ink transition-colors hover:opacity-90"
          >
            {secondaryAction}
          </button>
        ) : null}
      </div>
    </section>
  )
}
