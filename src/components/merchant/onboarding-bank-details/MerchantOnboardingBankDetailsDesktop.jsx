import { merchantOnboardingShellClass } from '../registration/merchantRegistrationStyles'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantOnboardingBankDetailsForm from './MerchantOnboardingBankDetailsForm'
import MerchantOnboardingBankDetailsPanel from './MerchantOnboardingBankDetailsPanel'

export default function MerchantOnboardingBankDetailsDesktop({
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
          initialPayout={initialPayout}
          loadError={loadError}
          formError={formError}
          submitting={submitting}
          onSaveNext={onSaveNext}
          onSkip={onSkip}
        />
      </main>

      <MerchantOnboardingBankDetailsPanel panel={data.panel} />
    </div>
  )
}
