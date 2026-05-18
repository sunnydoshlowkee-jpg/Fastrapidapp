export default function MerchantEmptyState({
  storeStatus,
  title,
  description,
  primaryAction,
  secondaryAction,
  onPrimaryClick,
  onSecondaryClick,
}) {
  return (
    <section className="overflow-hidden rounded-merchant-panel bg-merchant-empty-panel px-6 py-12 shadow-merchant-panel md:px-12 md:py-16">
      <div className="mx-auto flex max-w-lg flex-col items-center text-center">
        <div className="relative mb-6">
          <img
            src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=face"
            alt=""
            className="h-28 w-28 rounded-2xl object-cover shadow-[0px_4px_16px_0px_rgba(25,28,29,0.08)] md:h-32 md:w-32"
          />
          <span className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-1.5 whitespace-nowrap rounded-full bg-merchant-primary px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-white shadow-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden />
            {storeStatus}
          </span>
        </div>

        <h2 className="text-xl font-semibold tracking-[-0.02em] text-merchant-ink md:text-2xl">
          {title}
        </h2>
        <p className="mt-3 text-sm leading-6 text-merchant-muted md:text-base">
          {description}
        </p>

        <div className="mt-8 flex w-full flex-col gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="rounded-lg bg-merchant-primary px-6 py-3.5 text-sm font-semibold text-white shadow-merchant-cta transition-colors hover:bg-[#3837e6]"
          >
            {primaryAction}
          </button>
          <button
            type="button"
            onClick={onSecondaryClick}
            className="rounded-lg bg-merchant-icon-tile px-6 py-3.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
          >
            {secondaryAction}
          </button>
        </div>
      </div>
    </section>
  )
}
