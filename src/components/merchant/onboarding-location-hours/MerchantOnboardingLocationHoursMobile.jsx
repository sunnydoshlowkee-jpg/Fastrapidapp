import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { merchantRedirectPath } from '../../../services/merchantOnboardingService'
import { MERCHANT_VERIFICATION_DOCUMENTS_PATH } from '../../../services/data/merchantVerificationDocuments.mock'
import MerchantOnboardingLocationHoursContent from './MerchantOnboardingLocationHoursContent'
import MerchantOnboardingLocationHoursMobileFooter from './mobile/MerchantOnboardingLocationHoursMobileFooter'
import MerchantOnboardingLocationHoursMobileHeader from './mobile/MerchantOnboardingLocationHoursMobileHeader'
import MerchantOnboardingLocationHoursMobileHoursHeader from './mobile/MerchantOnboardingLocationHoursMobileHoursHeader'

export default function MerchantOnboardingLocationHoursMobile({
  data,
  locationValues,
  onLocationChange,
  hourDays,
  onHourDaysChange,
  mapConfirmed,
  onMapConfirm,
  loadError,
  formError,
  fieldErrors,
  onSaveNext,
}) {
  const navigate = useNavigate()
  const [panel, setPanel] = useState('location')
  const [submitting, setSubmitting] = useState(false)

  const finish = async () => {
    setSubmitting(true)
    try {
      const result = await onSaveNext()
      navigate(merchantRedirectPath(result.onboarding), { replace: true })
    } catch {
      // formError on page
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col bg-merchant-canvas pb-32 lg:hidden">
      {panel === 'location' ? (
        <>
          <MerchantOnboardingLocationHoursMobileHeader
            title={data.page.mobileHeaderTitle}
            backTo={MERCHANT_VERIFICATION_DOCUMENTS_PATH}
          />
          <p className="px-4 pb-3 pt-2 text-sm leading-relaxed text-merchant-muted">{data.page.subtitle}</p>
          {loadError ? (
            <p className="mx-4 mb-2 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</p>
          ) : null}
          <main className="flex-1 px-4 pb-2">
            <MerchantOnboardingLocationHoursContent
              variant="mobile"
              mobileSection="location"
              page={data.page}
              location={data.location}
              hours={data.hours}
              locationValues={locationValues}
              onLocationChange={onLocationChange}
              hourDays={hourDays}
              onHourDaysChange={onHourDaysChange}
              mapConfirmed={mapConfirmed}
              onMapConfirm={onMapConfirm}
              fieldErrors={fieldErrors}
              formError={formError}
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
            onSkip={finish}
          />
          <main className="flex-1 px-4 pb-2 pt-2">
            <MerchantOnboardingLocationHoursContent
              variant="mobile"
              mobileSection="hours"
              page={data.page}
              location={data.location}
              hours={data.hours}
              locationValues={locationValues}
              onLocationChange={onLocationChange}
              hourDays={hourDays}
              onHourDaysChange={onHourDaysChange}
              mapConfirmed={mapConfirmed}
              onMapConfirm={onMapConfirm}
              fieldErrors={fieldErrors}
              formError={formError}
              onSaveNext={finish}
              submitting={submitting}
            />
          </main>
          <MerchantOnboardingLocationHoursMobileFooter
            page={data.page}
            mode="hours"
            progressPercent={data.page.mobileProgressHoursPct}
            onPrevious={() => setPanel('location')}
            onSaveNext={finish}
            submitting={submitting}
          />
        </>
      )}
    </div>
  )
}
