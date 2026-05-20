import { useNavigate } from 'react-router-dom'
import { MERCHANT_PENDING_APPROVAL_PATH } from '../../../services/data/merchantPendingApproval.mock'
import { MERCHANT_VERIFICATION_DOCUMENTS } from '../../../services/data/merchantVerificationDocuments.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantVerificationDocumentsForm from './MerchantVerificationDocumentsForm'

export default function MerchantVerificationDocumentsDesktop() {
  const navigate = useNavigate()
  const data = MERCHANT_VERIFICATION_DOCUMENTS

  return (
    <div
      className={`hidden min-h-screen flex-col bg-merchant-canvas lg:flex lg:flex-row ${merchantOnboardingShellClass}`}
    >
      <MerchantRegistrationSidebar
        brandSubtitle={data.brandSubtitle}
        steps={data.steps}
        help={data.help}
      />

      <main className="flex-1 overflow-y-auto px-10 py-10">
        <MerchantVerificationDocumentsForm
          page={data.page}
          documents={data.documents}
          onContinue={() => navigate(MERCHANT_PENDING_APPROVAL_PATH)}
        />
      </main>
    </div>
  )
}
