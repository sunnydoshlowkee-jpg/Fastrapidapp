import { ArrowRight } from 'lucide-react'
import MerchantButton from '../../auth/MerchantButton'

export default function MerchantOnboardingBankDetailsMobileFooter({ formId, finishLabel }) {
  return (
    <footer className="fixed bottom-0 left-0 right-0 z-10 border-t border-merchant-divider bg-merchant-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-4">
      <MerchantButton type="submit" form={formId} className="w-full">
        <span className="inline-flex items-center gap-2">
          {finishLabel}
          <ArrowRight size={18} strokeWidth={2} aria-hidden />
        </span>
      </MerchantButton>
    </footer>
  )
}
