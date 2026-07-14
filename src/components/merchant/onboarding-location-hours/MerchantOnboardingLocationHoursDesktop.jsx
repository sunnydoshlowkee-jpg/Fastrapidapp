import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { merchantRedirectPath } from '../../../services/merchantOnboardingService'
import MerchantRegistrationSidebar from '../registration/MerchantRegistrationSidebar'
import MerchantOnboardingLocationHoursContent from './MerchantOnboardingLocationHoursContent'

export default function MerchantOnboardingLocationHoursDesktop({
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
  const [submitting, setSubmitting] = useState(false)

  const handleSaveNext = async () => {
    setSubmitting(true)
    try {
      const result = await onSaveNext()
      navigate(merchantRedirectPath(result.onboarding), { replace: true })
    } catch {
      // Page sets formError
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="hidden min-h-screen flex-col bg-merchant-canvas lg:flex lg:flex-row">
      <MerchantRegistrationSidebar
        brandSubtitle={data.brandSubtitle}
        steps={data.steps}
        help={data.help}
      />

      <main className="flex-1 overflow-y-auto px-6 py-8 lg:px-10 lg:py-10">
        {loadError ? (
          <p className="mb-4 rounded-lg bg-amber-50 px-4 py-3 text-sm text-amber-800">{loadError}</p>
        ) : null}
        <MerchantOnboardingLocationHoursContent
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
          onSaveNext={handleSaveNext}
          submitting={submitting}
        />
      </main>
    </div>
  )
}
