import { Check, Info } from 'lucide-react'

export default function MerchantOrderDetailActionBar({ disclaimer, onAccept, onReject, disabled = false }) {
  return (
    <div className="sticky bottom-0 z-10 -mx-4 border-t border-merchant-divider bg-merchant-surface px-4 py-4 shadow-[0_-4px_24px_rgba(25,28,29,0.06)] sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <p className="flex items-start gap-2 text-xs text-merchant-muted sm:text-sm lg:max-w-md">
          <Info size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
          {disclaimer}
        </p>
        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onReject}
            disabled={disabled}
            className="rounded-lg border border-merchant-divider bg-merchant-surface px-6 py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[140px]"
          >
            Reject Order
          </button>
          <button
            type="button"
            onClick={onAccept}
            disabled={disabled}
            className="flex items-center justify-center gap-2 rounded-lg bg-merchant-primary px-6 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6] disabled:cursor-not-allowed disabled:opacity-50 sm:min-w-[160px]"
          >
            <Check size={18} strokeWidth={2.5} aria-hidden />
            Accept Order
          </button>
        </div>
      </div>
    </div>
  )
}
