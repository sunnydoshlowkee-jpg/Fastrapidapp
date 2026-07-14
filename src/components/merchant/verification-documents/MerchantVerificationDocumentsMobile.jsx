import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  completeDocumentsOnboardingStep,
  merchantRedirectPath,
} from '../../../services/merchantOnboardingService'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantVerificationDocumentsForm from './MerchantVerificationDocumentsForm'
import MerchantVerificationDocumentsMobileFooter from './mobile/MerchantVerificationDocumentsMobileFooter'
import MerchantVerificationDocumentsMobileHeader from './mobile/MerchantVerificationDocumentsMobileHeader'

export default function MerchantVerificationDocumentsMobile({
  data,
  documents,
  loadError,
  onUpload,
  onRemove,
}) {
  const navigate = useNavigate()
  const { page } = data
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
      throw err
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-merchant-canvas pb-28 lg:hidden ${merchantOnboardingShellClass}`}
    >
      <MerchantVerificationDocumentsMobileHeader title={page.title} />

      <main className="flex-1 px-4 py-4">
        {loadError ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</p>
        ) : null}
        {error ? (
          <p className="mb-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-merchant-error">{error}</p>
        ) : null}
        <MerchantVerificationDocumentsForm
          page={page}
          documents={documents}
          variant="mobile"
          onUpload={onUpload}
          onRemove={onRemove}
          onContinue={handleContinue}
          submitting={submitting}
        />
      </main>

      <MerchantVerificationDocumentsMobileFooter
        saveDraftLabel={page.saveDraftLabel}
        continueLabel={submitting ? 'Saving…' : page.continueLabel}
        submitting={submitting}
      />
    </div>
  )
}
