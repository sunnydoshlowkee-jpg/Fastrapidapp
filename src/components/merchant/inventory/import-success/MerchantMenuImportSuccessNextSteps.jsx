import { Barcode, ChevronRight, QrCode, Tag } from 'lucide-react'

const iconMap = {
  tag: Tag,
  barcode: Barcode,
  qrcode: QrCode,
}

export default function MerchantMenuImportSuccessNextSteps({ nextSteps, variant = 'desktop' }) {
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return (
      <section>
        <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-merchant-muted">
          {nextSteps.title}
        </h3>
        <ul className="mt-3 overflow-hidden rounded-merchant-stat bg-merchant-surface shadow-merchant-stat">
          {nextSteps.items.map((item, index) => {
            const Icon = iconMap[item.icon] ?? Tag
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className="flex w-full items-center gap-3 px-4 py-3.5 text-left transition-colors hover:bg-merchant-canvas"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-icon-tile text-merchant-primary">
                    <Icon size={18} strokeWidth={1.75} aria-hidden />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-merchant-ink">{item.title}</p>
                    <p className="mt-0.5 text-xs text-merchant-muted">{item.description}</p>
                  </div>
                  <ChevronRight size={18} className="shrink-0 text-merchant-muted" aria-hidden />
                </button>
                {index < nextSteps.items.length - 1 && (
                  <div className="mx-4 border-b border-merchant-divider" />
                )}
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat md:p-6">
      <h3 className="text-xs font-bold uppercase tracking-[0.1em] text-merchant-muted">
        {nextSteps.title}
      </h3>
      <ul className="mt-4 space-y-4">
        {nextSteps.items.map((item) => {
          const Icon = iconMap[item.icon] ?? Tag
          return (
            <li key={item.id} className="flex gap-4">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-merchant-ink">{item.title}</p>
                <p className="mt-0.5 text-sm text-merchant-muted">{item.description}</p>
              </div>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
