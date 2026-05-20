import MerchantOnboardingLocationHoursBusinessLocation from './MerchantOnboardingLocationHoursBusinessLocation'
import MerchantOnboardingLocationHoursFooter from './MerchantOnboardingLocationHoursFooter'
import MerchantOnboardingLocationHoursSchedule from './MerchantOnboardingLocationHoursSchedule'

export default function MerchantOnboardingLocationHoursContent({
  page,
  location,
  hours,
  onSaveNext,
  variant = 'desktop',
  mobileSection = 'all',
  externalHourDays,
  onExternalHourDaysChange,
}) {
  const isMobile = variant === 'mobile'
  const showLocation = !isMobile || mobileSection === 'all' || mobileSection === 'location'
  const showHours = !isMobile || mobileSection === 'all' || mobileSection === 'hours'

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

      <div className={isMobile ? 'mt-0 space-y-8' : 'mt-8 space-y-10'}>
        {showLocation ? (
          <MerchantOnboardingLocationHoursBusinessLocation
            location={location}
            bareInputs={isMobile}
            hideSectionNumber={isMobile}
          />
        ) : null}
        {showHours ? (
          <MerchantOnboardingLocationHoursSchedule
            hours={hours}
            hideSectionNumber={isMobile}
            externalDays={isMobile && mobileSection === 'hours' ? externalHourDays : undefined}
            onExternalDaysChange={isMobile && mobileSection === 'hours' ? onExternalHourDaysChange : undefined}
            descriptionOverride={isMobile && mobileSection === 'hours' ? hours.mobileCardDescription : undefined}
            dayRowVariant={isMobile && mobileSection === 'hours' ? 'onboardingMobile' : 'default'}
          />
        ) : null}
      </div>

      {!isMobile ? <MerchantOnboardingLocationHoursFooter page={page} onSaveNext={onSaveNext} /> : null}
    </article>
  )
}
