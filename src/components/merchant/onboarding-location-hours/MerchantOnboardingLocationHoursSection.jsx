export default function MerchantOnboardingLocationHoursSection({
  number,
  title,
  description,
  children,
  hideNumber = false,
}) {
  return (
    <section>
      {hideNumber ? (
        <div>
          <h2 className="text-lg font-bold text-merchant-ink">{title}</h2>
          <p className="mt-0.5 text-sm text-merchant-muted">{description}</p>
        </div>
      ) : (
        <div className="flex items-start gap-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-merchant-primary text-sm font-bold text-white">
            {number}
          </span>
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold text-merchant-ink">{title}</h2>
            <p className="mt-0.5 text-sm text-merchant-muted">{description}</p>
          </div>
        </div>
      )}
      <div className={`mt-5 pl-0 ${hideNumber ? '' : 'md:pl-11'}`}>{children}</div>
    </section>
  )
}
