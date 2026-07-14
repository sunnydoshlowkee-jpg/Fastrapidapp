import { ClipboardList } from 'lucide-react'

export default function MerchantMenuUploadManualCard({ manualEntry, onStartEntry }) {
  return (
    <article className="flex min-h-[509px] flex-col items-center justify-between rounded-xl bg-merchant-surface px-10 pb-[68px] pt-10 shadow-merchant-choice-card">
      <div className="flex flex-col items-center text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[rgba(36,25,233,0.05)] text-merchant-link">
          <ClipboardList size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <h3 className="mt-6 text-xl font-semibold leading-7 text-merchant-ink">
          {manualEntry.title}
        </h3>
        <p className="mt-3 max-w-[376px] text-sm leading-[23px] text-merchant-body">
          {manualEntry.description}
        </p>
      </div>
      <button
        type="button"
        onClick={onStartEntry}
        className="mt-8 w-full max-w-[376px] rounded-xl bg-merchant-link py-4 text-base font-semibold text-white shadow-merchant-btn transition-colors hover:bg-merchant-primary-dark"
      >
        {manualEntry.actionLabel}
      </button>
    </article>
  )
}
