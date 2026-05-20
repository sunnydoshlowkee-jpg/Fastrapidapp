import { useNavigate } from 'react-router-dom'
import { MERCHANT_PENDING_APPROVAL_PATH } from '../../../services/data/merchantPendingApproval.mock'
import { MERCHANT_VERIFICATION_DOCUMENTS } from '../../../services/data/merchantVerificationDocuments.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantVerificationDocumentsForm from './MerchantVerificationDocumentsForm'
import MerchantVerificationDocumentsMobileFooter from './mobile/MerchantVerificationDocumentsMobileFooter'
import MerchantVerificationDocumentsMobileHeader from './mobile/MerchantVerificationDocumentsMobileHeader'

export default function MerchantVerificationDocumentsMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_VERIFICATION_DOCUMENTS
  const { page } = data

  return (
    <div
      className={`flex min-h-screen flex-col bg-merchant-canvas pb-28 lg:hidden ${merchantOnboardingShellClass}`}
    >
      <MerchantVerificationDocumentsMobileHeader title={page.title} />

      <main className="flex-1 px-4 py-4">
        <MerchantVerificationDocumentsForm
          page={page}
          documents={data.documents}
          variant="mobile"
          onContinue={() => navigate(MERCHANT_PENDING_APPROVAL_PATH)}
        />
      </main>

      <MerchantVerificationDocumentsMobileFooter
        saveDraftLabel={page.saveDraftLabel}
        continueLabel={page.continueLabel}
      />
    </div>
  )
}
