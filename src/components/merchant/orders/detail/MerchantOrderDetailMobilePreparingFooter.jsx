import { Soup } from 'lucide-react'

export default function MerchantOrderDetailMobilePreparingFooter({
  title,
  targetCompletion,
  onMarkReady,
}) {
  return (
    <div className="fixed bottom-[5.75rem] left-0 right-0 z-30 border-t border-merchant-divider bg-merchant-surface px-4 py-4 shadow-[0_-4px_24px_rgba(25,28,29,0.08)] lg:hidden">
      <div className="flex gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[rgba(230,126,34,0.14)] text-[#C47A3A]">
          <Soup size={22} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-bold text-merchant-ink">{title}</p>
          <p className="mt-0.5 text-xs text-merchant-muted">
            Target completion:{' '}
            <span className="font-semibold text-[#E67E22]">{targetCompletion}</span>
          </p>
        </div>
      </div>
      <button
        type="button"
        onClick={onMarkReady}
        className="mt-3 w-full rounded-xl bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
      >
        Mark Ready for Pickup
      </button>
    </div>
  )
}
