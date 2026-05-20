import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MERCHANT_ONBOARDING_BANK_DETAILS_PATH } from '../../../services/data/merchantOnboardingBankDetails.mock'
import { MERCHANT_ONBOARDING_LOCATION_HOURS } from '../../../services/data/merchantOnboardingLocationHours.mock'
import { MERCHANT_VERIFICATION_DOCUMENTS_PATH } from '../../../services/data/merchantVerificationDocuments.mock'
import MerchantOnboardingLocationHoursContent from './MerchantOnboardingLocationHoursContent'
import MerchantOnboardingLocationHoursMobileFooter from './mobile/MerchantOnboardingLocationHoursMobileFooter'
import MerchantOnboardingLocationHoursMobileHeader from './mobile/MerchantOnboardingLocationHoursMobileHeader'
import MerchantOnboardingLocationHoursMobileHoursHeader from './mobile/MerchantOnboardingLocationHoursMobileHoursHeader'

export default function MerchantOnboardingLocationHoursMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_ONBOARDING_LOCATION_HOURS
  const [panel, setPanel] = useState('location')
  const [hourDays, setHourDays] = useState(() => data.hours.days.map((d) => ({ ...d })))

  const hoursWithDays = { ...data.hours, days: hourDays }

  const goBank = () => navigate(MERCHANT_ONBOARDING_BANK_DETAILS_PATH)

  return (
    <div className="flex min-h-screen flex-col bg-merchant-canvas pb-32 lg:hidden">
      {panel === 'location' ? (
        <>
          <MerchantOnboardingLocationHoursMobileHeader
            title={data.page.mobileHeaderTitle}
            backTo={MERCHANT_VERIFICATION_DOCUMENTS_PATH}
          />
          <p className="px-4 pb-3 pt-2 text-sm leading-relaxed text-merchant-muted">{data.page.subtitle}</p>
          <main className="flex-1 px-4 pb-2">
            <MerchantOnboardingLocationHoursContent
              variant="mobile"
              mobileSection="location"
              page={data.page}
              location={data.location}
              hours={hoursWithDays}
              onSaveNext={() => setPanel('hours')}
            />
          </main>
          <MerchantOnboardingLocationHoursMobileFooter
            page={data.page}
            mode="location"
            progressPercent={data.page.mobileProgressLocationPct}
            onSaveNext={() => setPanel('hours')}
          />
        </>
      ) : (
        <>
          <MerchantOnboardingLocationHoursMobileHoursHeader
            title={data.page.mobileHoursHeaderTitle}
            skipLabel={data.page.skipLabel}
            onBack={() => setPanel('location')}
            onSkip={goBank}
          />
          <main className="flex-1 px-4 pb-2 pt-2">
            <MerchantOnboardingLocationHoursContent
              variant="mobile"
              mobileSection="hours"
              page={data.page}
              location={data.location}
              hours={hoursWithDays}
              onSaveNext={goBank}
              externalHourDays={hourDays}
              onExternalHourDaysChange={setHourDays}
            />
          </main>
          <MerchantOnboardingLocationHoursMobileFooter
            page={data.page}
            mode="hours"
            progressPercent={data.page.mobileProgressHoursPct}
            onPrevious={() => setPanel('location')}
            onSaveNext={goBank}
          />
        </>
      )}
    </div>
  )
}
