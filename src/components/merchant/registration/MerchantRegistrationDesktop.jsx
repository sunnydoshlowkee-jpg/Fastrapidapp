import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MERCHANT_EMAIL_VERIFY_PATH, MERCHANT_REGISTRATION } from '../../../services/data/merchantRegistration.mock'
import {
  merchantSaveRegistration,
  resolvePostRegistrationPath,
} from '../../../services/merchantRegistrationService'
import { merchantOnboardingShellClass } from './merchantRegistrationStyles'
import MerchantRegistrationForm from './MerchantRegistrationForm'
import MerchantRegistrationPanel from './MerchantRegistrationPanel'
import MerchantRegistrationSidebar from './MerchantRegistrationSidebar'

export default function MerchantRegistrationDesktop({ initialValues, initialLogoUrl }) {
  const navigate = useNavigate()
  const data = MERCHANT_REGISTRATION
  const [submitting, setSubmitting] = useState(false)

  const handleContinue = async (values, logoFile) => {
    setSubmitting(true)
    try {
      const response = await merchantSaveRegistration(values, logoFile)
      const user = response?.data?.user
      const path =
        resolvePostRegistrationPath(user) ||
        `${MERCHANT_EMAIL_VERIFY_PATH}?email=${encodeURIComponent(
          response?.data?.email || values.businessEmail?.trim().toLowerCase(),
        )}`
      navigate(path)
    } catch (err) {
      throw err
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

      <main className="flex flex-1 justify-center overflow-y-auto px-6 py-12 lg:px-6">
        <MerchantRegistrationForm
          form={data.form}
          initialValues={initialValues}
          initialLogoUrl={initialLogoUrl}
          onContinue={handleContinue}
          submitting={submitting}
        />
      </main>

      <MerchantRegistrationPanel panel={data.panel} />
    </div>
  )
}
