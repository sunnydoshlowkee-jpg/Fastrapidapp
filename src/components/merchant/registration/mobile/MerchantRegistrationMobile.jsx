import { useNavigate } from 'react-router-dom'
import { MERCHANT_EMAIL_VERIFICATION } from '../../../../services/data/merchantEmailVerification.mock'
import {
  MERCHANT_EMAIL_VERIFY_PATH,
  MERCHANT_REGISTRATION,
} from '../../../../services/data/merchantRegistration.mock'
import { setMerchantSignupEmail } from '../../../../services/merchantRegistrationService'
import { merchantOnboardingShellClass } from '../merchantRegistrationStyles'
import MerchantRegistrationMobileFooter from './MerchantRegistrationMobileFooter'
import MerchantRegistrationMobileForm from './MerchantRegistrationMobileForm'
import MerchantRegistrationMobileHeader from './MerchantRegistrationMobileHeader'

export default function MerchantRegistrationMobile() {
  const navigate = useNavigate()
  const { mobile } = MERCHANT_REGISTRATION
  const { form, promo, stepLabel } = mobile

  const handleContinue = (email) => {
    const resolved = email?.trim() || MERCHANT_EMAIL_VERIFICATION.defaultEmail
    setMerchantSignupEmail(resolved)
    navigate(`${MERCHANT_EMAIL_VERIFY_PATH}?email=${encodeURIComponent(resolved)}`)
  }

  return (
    <div
      className={`flex min-h-screen flex-col bg-merchant-canvas pb-28 lg:hidden ${merchantOnboardingShellClass}`}
    >
      <MerchantRegistrationMobileHeader />

      <main className="flex-1 px-4 py-4">
        <MerchantRegistrationMobileForm
          form={form}
          stepLabel={stepLabel}
          promo={promo}
          onContinue={handleContinue}
        />
      </main>

      <MerchantRegistrationMobileFooter
        saveDraftLabel={form.saveDraftLabel}
        continueLabel={form.continueLabel}
      />
    </div>
  )
}
