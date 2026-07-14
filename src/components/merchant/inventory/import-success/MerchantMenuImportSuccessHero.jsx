import { Check } from 'lucide-react'

export default function MerchantMenuImportSuccessHero({
  headline,
  description,
  actions,
  onReturnToInventory,
  onViewImportLogs,
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'

  const content = (
    <div className="mx-auto flex max-w-2xl flex-col items-center">
      <div
        className={`flex items-center justify-center rounded-full bg-merchant-primary ${
          isMobile
            ? 'h-16 w-16 shadow-[0_0_0_10px_rgba(67,66,255,0.12)]'
            : 'h-20 w-20 shadow-[0_0_0_12px_rgba(67,66,255,0.12)] md:h-24 md:w-24'
        }`}
        aria-hidden
      >
        <Check size={isMobile ? 32 : 40} className="text-white" strokeWidth={2.5} />
      </div>

      <h2
        className={`mt-6 font-bold tracking-[-0.02em] text-merchant-ink ${
          isMobile ? 'text-center text-xl leading-snug' : 'mt-8 text-2xl md:text-[32px] md:leading-tight'
        }`}
      >
        {headline}
      </h2>
      <p
        className={`max-w-xl text-center leading-relaxed text-merchant-muted ${
          isMobile ? 'mt-3 text-sm' : 'mt-4 text-sm md:text-base'
        }`}
      >
        {description}
      </p>

      <div
        className={
          isMobile
            ? 'mt-6 grid w-full grid-cols-2 gap-3'
            : 'mt-8 flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:justify-center'
        }
      >
        <button
          type="button"
          onClick={onReturnToInventory}
          className={`rounded-lg bg-merchant-primary text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6] ${
            isMobile ? 'px-3 py-3' : 'px-6 py-3.5'
          }`}
        >
          <span className={isMobile ? 'block truncate' : ''}>{actions.returnToInventory}</span>
        </button>
        <button
          type="button"
          onClick={onViewImportLogs}
          className={`rounded-lg bg-merchant-icon-tile text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input ${
            isMobile ? 'px-3 py-3' : 'px-6 py-3.5'
          }`}
        >
          <span className={isMobile ? 'block truncate' : ''}>{actions.viewImportLogs}</span>
        </button>
      </div>
    </div>
  )

  if (isMobile) {
    return <section className="pt-2">{content}</section>
  }

  return (
    <section className="rounded-merchant-stat bg-merchant-surface px-6 py-10 text-center shadow-merchant-stat md:px-12 md:py-14">
      {content}
    </section>
  )
}
