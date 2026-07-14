import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MERCHANT_EMAIL_VERIFY_PATH, MERCHANT_REGISTRATION } from '../../../../services/data/merchantRegistration.mock'
import {
  merchantSaveRegistration,
  resolvePostRegistrationPath,
} from '../../../../services/merchantRegistrationService'
import { merchantOnboardingShellClass } from '../merchantRegistrationStyles'
import MerchantRegistrationMobileFooter from './MerchantRegistrationMobileFooter'
import MerchantRegistrationMobileForm from './MerchantRegistrationMobileForm'
import MerchantRegistrationMobileHeader from './MerchantRegistrationMobileHeader'

export default function MerchantRegistrationMobile({ initialValues, initialLogoUrl }) {
  const navigate = useNavigate()
  const { mobile } = MERCHANT_REGISTRATION
  const { form, promo, stepLabel } = mobile
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
      className={`flex min-h-screen flex-col bg-merchant-canvas pb-28 lg:hidden ${merchantOnboardingShellClass}`}
    >
      <MerchantRegistrationMobileHeader />

      <main className="flex-1 px-4 py-4">
        <MerchantRegistrationMobileForm
          form={form}
          stepLabel={stepLabel}
          promo={promo}
          initialValues={initialValues}
          initialLogoUrl={initialLogoUrl}
          onContinue={handleContinue}
          submitting={submitting}
        />
      </main>

      <MerchantRegistrationMobileFooter
        saveDraftLabel={form.saveDraftLabel}
        continueLabel={submitting ? 'Saving…' : form.continueLabel}
        submitting={submitting}
      />
    </div>
  )
}
