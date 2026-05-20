import { useNavigate } from 'react-router-dom'
import { MERCHANT_ONBOARDING_BANK_DETAILS } from '../../../services/data/merchantOnboardingBankDetails.mock'
import { MERCHANT_PENDING_APPROVAL_PATH } from '../../../services/data/merchantPendingApproval.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantOnboardingBankDetailsForm from './MerchantOnboardingBankDetailsForm'
import MerchantOnboardingBankDetailsPanel from './MerchantOnboardingBankDetailsPanel'

export default function MerchantOnboardingBankDetailsDesktop() {
  const navigate = useNavigate()
  const data = MERCHANT_ONBOARDING_BANK_DETAILS

  const goNext = () => navigate(MERCHANT_PENDING_APPROVAL_PATH)

  return (
    <div
      className={`hidden min-h-screen flex-col bg-merchant-canvas lg:flex lg:flex-row ${merchantOnboardingShellClass}`}
    >
      <MerchantRegistrationSidebar
        brandSubtitle={data.brandSubtitle}
        steps={data.steps}
        help={data.help}
      />

      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">
        <MerchantOnboardingBankDetailsForm
          page={data.page}
          fields={data.fields}
          onSaveNext={goNext}
          onSkip={goNext}
        />
      </main>

      <MerchantOnboardingBankDetailsPanel panel={data.panel} />
    </div>
  )
}
