import { ArrowRight, ClipboardList } from 'lucide-react'

export default function MerchantMenuUploadMobileManualCard({ manualEntry, onStartEntry }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <ClipboardList size={20} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-merchant-ink">{manualEntry.title}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{manualEntry.description}</p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStartEntry}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-icon-tile py-3.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
      >
        {manualEntry.actionLabel}
        <ArrowRight size={18} strokeWidth={2} aria-hidden />
      </button>
    </article>
  )
}
