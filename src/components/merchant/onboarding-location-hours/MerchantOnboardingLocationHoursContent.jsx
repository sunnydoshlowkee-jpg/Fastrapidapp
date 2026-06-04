import MerchantOnboardingLocationHoursBusinessLocation from './MerchantOnboardingLocationHoursBusinessLocation'
import MerchantOnboardingLocationHoursFooter from './MerchantOnboardingLocationHoursFooter'
import MerchantOnboardingLocationHoursSchedule from './MerchantOnboardingLocationHoursSchedule'

export default function MerchantOnboardingLocationHoursContent({
  page,
  location,
  hours,
  locationValues,
  onLocationChange,
  hourDays,
  onHourDaysChange,
  mapConfirmed,
  onMapConfirm,
  fieldErrors,
  formError,
  onSaveNext,
  submitting = false,
  variant = 'desktop',
  mobileSection = 'all',
}) {
  const isMobile = variant === 'mobile'
  const showLocation = !isMobile || mobileSection === 'all' || mobileSection === 'location'
  const showHours = !isMobile || mobileSection === 'all' || mobileSection === 'hours'

  const hoursConfig = { ...hours, days: hourDays }

  const handleSubmit = async (e) => {
    if (e?.preventDefault) {
      e.preventDefault()
    }
    try {
      await onSaveNext?.()
    } catch {
      // Errors surfaced via formError / fieldErrors on page
    }
  }

  return (
    <article
      className={`rounded-merchant-stat bg-merchant-surface shadow-merchant-stat ${isMobile ? 'p-4' : 'p-5 md:p-8'}`}
    >
      {!isMobile ? (
        <header>
          <h1 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[1.75rem]">
            {page.title}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-merchant-body md:text-base">
            {page.subtitle}
          </p>
        </header>
      ) : null}

      {formError ? (
        <p className={`rounded-lg bg-red-50 px-4 py-3 text-sm text-merchant-error ${isMobile ? 'mt-4' : 'mt-6'}`}>
          {formError}
        </p>
      ) : null}

      <form className={isMobile ? 'mt-0 space-y-8' : 'mt-8 space-y-10'} onSubmit={handleSubmit}>
        {showLocation ? (
          <MerchantOnboardingLocationHoursBusinessLocation
            location={location}
            values={locationValues}
            onChange={onLocationChange}
            mapConfirmed={mapConfirmed}
            onMapConfirm={onMapConfirm}
            fieldErrors={fieldErrors}
            bareInputs={isMobile}
            hideSectionNumber={isMobile}
          />
        ) : null}
        {showHours ? (
          <div>
            <MerchantOnboardingLocationHoursSchedule
              hours={hoursConfig}
              hideSectionNumber={isMobile}
              externalDays={hourDays}
              onExternalDaysChange={onHourDaysChange}
              descriptionOverride={isMobile && mobileSection === 'hours' ? hours.mobileCardDescription : undefined}
              dayRowVariant={isMobile && mobileSection === 'hours' ? 'onboardingMobile' : 'default'}
            />
            {fieldErrors.hours ? (
              <p className="mt-2 text-sm text-merchant-error">{fieldErrors.hours}</p>
            ) : null}
          </div>
        ) : null}

        {!isMobile ? (
          <MerchantOnboardingLocationHoursFooter page={page} onSaveNext={handleSubmit} submitting={submitting} />
        ) : null}
      </form>
    </article>
  )
}
