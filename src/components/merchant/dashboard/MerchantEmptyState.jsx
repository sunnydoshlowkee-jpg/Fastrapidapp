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
    <section className="relative isolate overflow-hidden rounded-[32px] border border-merchant-field-border bg-merchant-surface px-8 py-12 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] md:px-12">
      <span
        className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-xl bg-[rgba(225,224,255,0.3)] blur-[32px]"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-xl bg-[rgba(255,219,202,0.2)] blur-[32px]"
        aria-hidden
      />

      <div className="relative z-[1] mx-auto flex max-w-md flex-col items-center text-center">
        <div className="relative mb-3">
          <div className="flex h-48 w-48 items-center justify-center rounded-xl bg-merchant-input">
            <img
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=256&h=256&fit=crop&crop=face"
              alt=""
              className="h-32 w-32 rounded-lg object-cover opacity-80 mix-blend-multiply"
            />
          </div>
          <span className="absolute bottom-4 right-4 inline-flex items-center gap-2 rounded-xl border border-merchant-field-border bg-merchant-surface px-3 py-1.5 shadow-[0px_10px_15px_-3px_rgba(0,0,0,0.1),0px_4px_6px_-4px_rgba(0,0,0,0.1)]">
            <span className="h-2 w-2 rounded-full bg-merchant-primary" aria-hidden />
            <span className="text-[10px] font-bold uppercase tracking-[0.25px] text-merchant-link">
              {storeStatus}
            </span>
          </span>
        </div>

        <h2 className="pt-5 text-[30px] font-bold leading-9 tracking-[-0.75px] text-merchant-ink">
          {title}
        </h2>
        <p className="mt-3 max-w-md text-lg leading-[29px] text-merchant-muted">{description}</p>

        <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onPrimaryClick}
            className="rounded-lg bg-merchant-primary px-8 py-3.5 text-sm font-bold text-white shadow-merchant-cta transition-colors hover:bg-merchant-primary-dark"
          >
            {primaryAction}
          </button>
          <button
            type="button"
            onClick={onSecondaryClick}
            className="rounded-lg bg-merchant-icon-tile px-8 py-3.5 text-sm font-bold text-merchant-ink transition-colors hover:bg-merchant-input"
          >
            {secondaryAction}
          </button>
        </div>
      </div>
    </section>
  )
}
