import { useNavigate } from 'react-router-dom'
import { MERCHANT_EMAIL_VERIFICATION } from '../../../services/data/merchantEmailVerification.mock'
import { MERCHANT_EMAIL_VERIFY_PATH, MERCHANT_REGISTRATION } from '../../../services/data/merchantRegistration.mock'
import { setMerchantSignupEmail } from '../../../services/merchantRegistrationService'
import { merchantOnboardingShellClass } from './merchantRegistrationStyles'
import MerchantRegistrationForm from './MerchantRegistrationForm'
import MerchantRegistrationPanel from './MerchantRegistrationPanel'
import MerchantRegistrationSidebar from './MerchantRegistrationSidebar'

export default function MerchantRegistrationDesktop() {
  const navigate = useNavigate()
  const data = MERCHANT_REGISTRATION

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
        <MerchantRegistrationForm
          form={data.form}
          onContinue={(email) => {
            const resolved = email?.trim() || MERCHANT_EMAIL_VERIFICATION.defaultEmail
            setMerchantSignupEmail(resolved)
            navigate(`${MERCHANT_EMAIL_VERIFY_PATH}?email=${encodeURIComponent(resolved)}`)
          }}
        />
      </main>

      <MerchantRegistrationPanel panel={data.panel} />
    </div>
  )
}
