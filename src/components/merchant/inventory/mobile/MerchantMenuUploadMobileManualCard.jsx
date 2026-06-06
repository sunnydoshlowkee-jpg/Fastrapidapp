import { ArrowRight, ClipboardList } from 'lucide-react'

export default function MerchantMenuUploadMobileManualCard({ manualEntry, onStartEntry }) {
  return (
    <article className="rounded-xl border border-[rgba(198,196,218,0.15)] bg-merchant-surface p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-input text-merchant-link">
          <ClipboardList size={18} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0">
          <h3 className="text-[15px] font-semibold leading-[22px] text-merchant-ink">
            {manualEntry.title}
          </h3>
          <p className="mt-1 text-[13px] leading-[21px] text-merchant-mobile-muted">
            {manualEntry.description}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onStartEntry}
        className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-input py-3.5 text-sm font-semibold leading-[21px] text-merchant-ink transition-colors hover:opacity-90"
      >
        {manualEntry.actionLabel}
        <ArrowRight size={12} strokeWidth={2.5} aria-hidden />
      </button>
    </article>
  )
}
