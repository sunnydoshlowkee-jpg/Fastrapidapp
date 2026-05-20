import { ArrowRight, Save } from 'lucide-react'

export default function MerchantRegistrationMobileFooter({ saveDraftLabel, continueLabel }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-20 border-t border-merchant-divider bg-merchant-surface px-4 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
      <div className="flex gap-3">
        <button
          type="button"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-merchant-input py-3.5 text-sm font-semibold text-merchant-ink"
        >
          <Save size={18} strokeWidth={1.75} aria-hidden />
          {saveDraftLabel}
        </button>
        <button
          type="submit"
          form="merchant-registration-mobile-form"
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn"
        >
          {continueLabel}
          <ArrowRight size={18} strokeWidth={2} aria-hidden />
        </button>
      </div>
    </footer>
  )
}
