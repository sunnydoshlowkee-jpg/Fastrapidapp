import { ArrowLeft, ArrowRight } from 'lucide-react'
import MerchantButton from '../../auth/MerchantButton'

export default function MerchantOnboardingLocationHoursMobileFooter({
  page,
  mode = 'location',
  progressPercent,
  onSaveNext,
  onPrevious,
}) {
  const { previousLabel, saveNextLabel } = page
  const pct = Math.min(100, Math.max(0, progressPercent ?? 0))

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-merchant-divider bg-merchant-surface pb-[max(1rem,env(safe-area-inset-bottom))] pt-0">
      <div className="h-0.5 w-full bg-merchant-divider" aria-hidden>
        <div className="h-full bg-merchant-primary" style={{ width: `${pct}%` }} />
      </div>
      <div className="px-4 pt-4">
        {mode === 'hours' ? (
          <div className="flex gap-3">
            <button
              type="button"
              onClick={onPrevious}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-merchant-input py-4 text-sm font-bold text-merchant-ink transition-colors hover:bg-merchant-divider"
            >
              <ArrowLeft size={18} strokeWidth={2} aria-hidden />
              {previousLabel}
            </button>
            <MerchantButton type="button" onClick={onSaveNext} className="w-auto min-w-0 flex-1 basis-0">
              <span className="inline-flex items-center gap-2">
                {saveNextLabel}
                <ArrowRight size={18} strokeWidth={2} aria-hidden />
              </span>
            </MerchantButton>
          </div>
        ) : (
          <MerchantButton type="button" onClick={onSaveNext} className="w-full">
            <span className="inline-flex items-center gap-2">
              {saveNextLabel}
              <ArrowRight size={18} strokeWidth={2} aria-hidden />
            </span>
          </MerchantButton>
        )}
      </div>
    </footer>
  )
}
