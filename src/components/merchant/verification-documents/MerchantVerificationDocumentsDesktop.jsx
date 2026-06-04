import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  completeDocumentsOnboardingStep,
  merchantRedirectPath,
} from '../../../services/merchantOnboardingService'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantVerificationDocumentsForm from './MerchantVerificationDocumentsForm'

export default function MerchantVerificationDocumentsDesktop({
  data,
  documents,
  loadError,
  onUpload,
  onRemove,
}) {
  const navigate = useNavigate()
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  const handleContinue = async () => {
    setSubmitting(true)
    setError('')
    try {
      const result = await completeDocumentsOnboardingStep(documents)
      navigate(merchantRedirectPath(result.onboarding), { replace: true })
    } catch (err) {
      setError(err.message || 'Unable to continue. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`hidden min-h-screen flex-col bg-merchant-canvas lg:flex lg:flex-row ${merchantOnboardingShellClass}`}
    >
      <MerchantRegistrationSidebar
        brandSubtitle={data.brandSubtitle}
        steps={data.steps}
        help={data.help}
      />

      <main className="flex flex-1 justify-center overflow-y-auto bg-merchant-onboarding-sidebar px-16 py-16 pb-20">
        <div className="w-full max-w-[672px]">
          {loadError ? (
            <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</p>
          ) : null}
          {error ? (
            <p className="mb-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-merchant-error">{error}</p>
          ) : null}
          <MerchantVerificationDocumentsForm
            page={data.page}
            documents={documents}
            whyWeNeedThis={data.whyWeNeedThis}
            onUpload={onUpload}
            onRemove={onRemove}
            onContinue={handleContinue}
            submitting={submitting}
          />
        </div>
      </main>
    </div>
  )
}
