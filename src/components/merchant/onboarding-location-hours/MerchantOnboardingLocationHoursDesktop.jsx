import { useNavigate } from 'react-router-dom'
import { MERCHANT_ONBOARDING_BANK_DETAILS_PATH } from '../../../services/data/merchantOnboardingBankDetails.mock'
import { MERCHANT_ONBOARDING_LOCATION_HOURS } from '../../../services/data/merchantOnboardingLocationHours.mock'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantOnboardingLocationHoursContent from './MerchantOnboardingLocationHoursContent'

export default function MerchantOnboardingLocationHoursDesktop() {
  const navigate = useNavigate()
  const data = MERCHANT_ONBOARDING_LOCATION_HOURS

  return (
    <div className="hidden min-h-screen flex-col bg-merchant-canvas lg:flex lg:flex-row">
      <MerchantRegistrationSidebar
        brandSubtitle={data.brandSubtitle}
        steps={data.steps}
        help={data.help}
      />

      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">
        <MerchantOnboardingLocationHoursContent
          page={data.page}
          location={data.location}
          hours={data.hours}
          onSaveNext={() => navigate(MERCHANT_ONBOARDING_BANK_DETAILS_PATH)}
        />
      </main>
    </div>
  )
}
