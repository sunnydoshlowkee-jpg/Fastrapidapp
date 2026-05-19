import { ClipboardList } from 'lucide-react'

export default function MerchantMenuUploadManualCard({ manualEntry, onStartEntry }) {
  return (
    <article className="flex h-full flex-col rounded-merchant-stat bg-merchant-surface p-6 shadow-merchant-stat md:p-8">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary">
        <ClipboardList size={24} strokeWidth={1.75} aria-hidden />
      </div>
      <h3 className="mt-5 text-lg font-bold text-merchant-ink">{manualEntry.title}</h3>
      <p className="mt-2 flex-1 text-sm leading-relaxed text-merchant-muted">{manualEntry.description}</p>
      <button
        type="button"
        onClick={onStartEntry}
        className="mt-6 w-full rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
      >
        {manualEntry.actionLabel}
      </button>
    </article>
  )
}
