import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import MerchantButton from '../auth/MerchantButton'
import { MERCHANT_VERIFICATION_DOCUMENTS_PATH } from '../../../services/data/merchantVerificationDocuments.mock'

export default function MerchantOnboardingLocationHoursFooter({
  page,
  onSaveNext,
}) {
  const { currentStep, totalSteps, previousLabel, saveNextLabel } = page

  return (
    <footer className="mt-10 flex flex-col items-center gap-6 border-t border-merchant-divider pt-8 sm:flex-row sm:justify-between">
      <Link
        to={MERCHANT_VERIFICATION_DOCUMENTS_PATH}
        className="inline-flex items-center gap-2 text-sm font-semibold text-merchant-body transition-colors hover:text-merchant-ink"
      >
        <ArrowLeft size={18} strokeWidth={2} aria-hidden />
        {previousLabel}
      </Link>

      <div className="flex items-center gap-2" aria-label={`Step ${currentStep} of ${totalSteps}`}>
        {Array.from({ length: totalSteps }).map((_, index) => {
          const step = index + 1
          const isActive = step === currentStep
          return (
            <span
              key={step}
              className={`h-2 rounded-full transition-all ${
                isActive ? 'w-6 bg-merchant-primary' : 'w-2 bg-merchant-divider'
              }`}
            />
          )
        })}
      </div>

      <MerchantButton
        type="button"
        onClick={onSaveNext}
        className="w-full shadow-[0px_8px_24px_0px_rgba(67,66,255,0.25)] sm:w-auto sm:min-w-[160px]"
      >
        {saveNextLabel}
      </MerchantButton>
    </footer>
  )
}
