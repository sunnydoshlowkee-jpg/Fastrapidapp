import { MERCHANT_ONBOARDING_LOCATION_HOURS_PATH } from '../../../services/data/merchantOnboardingLocationHours.mock'
import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantOnboardingBankDetailsForm from './MerchantOnboardingBankDetailsForm'
import MerchantOnboardingBankDetailsMobileFooter from './mobile/MerchantOnboardingBankDetailsMobileFooter'
import MerchantOnboardingBankDetailsMobileHeader from './mobile/MerchantOnboardingBankDetailsMobileHeader'

export default function MerchantOnboardingBankDetailsMobile({
  data,
  initialPayout,
  loadError,
  formError,
  submitting,
  onSaveNext,
  onSkip,
}) {
  return (
    <div
      className={`flex min-h-screen flex-col bg-merchant-canvas pb-32 lg:hidden ${merchantOnboardingShellClass}`}
    >
      <MerchantOnboardingBankDetailsMobileHeader
        title={data.page.mobileHeaderTitle ?? data.page.title}
        skipLabel={data.page.mobileSkipLabel}
        backTo={MERCHANT_ONBOARDING_LOCATION_HOURS_PATH}
        onSkip={onSkip}
      />

      <main className="flex-1 px-4 pb-4 pt-2">
        <MerchantOnboardingBankDetailsForm
          variant="mobile"
          page={data.page}
          fields={data.fields}
          panel={data.panel}
          initialPayout={initialPayout}
          loadError={loadError}
          formError={formError}
          submitting={submitting}
          onSaveNext={onSaveNext}
          onSkip={onSkip}
        />
      </main>

      <MerchantOnboardingBankDetailsMobileFooter
        formId="merchant-onboarding-bank-mobile-form"
        finishLabel={data.page.mobileFinishLabel}
      />
    </div>
  )
}
