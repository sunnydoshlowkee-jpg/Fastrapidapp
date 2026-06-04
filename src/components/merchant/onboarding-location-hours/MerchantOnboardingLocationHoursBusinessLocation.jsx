import MerchantRegistrationField from '../registration/MerchantRegistrationField'
import MerchantOnboardingLocationHoursMap from './MerchantOnboardingLocationHoursMap'
import MerchantOnboardingLocationHoursSection from './MerchantOnboardingLocationHoursSection'

export default function MerchantOnboardingLocationHoursBusinessLocation({
  location,
  values,
  onChange,
  mapConfirmed,
  onMapConfirm,
  fieldErrors = {},
  bareInputs = false,
  hideSectionNumber = false,
}) {
  const { fields } = location

  const update = (key) => (e) => {
    onChange((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <MerchantOnboardingLocationHoursSection
      number={location.number}
      title={location.title}
      description={location.description}
      hideNumber={hideSectionNumber}
    >
      <MerchantRegistrationField
        id="onboarding-street"
        label={fields.street.label}
        placeholder={fields.street.placeholder}
        value={values.street}
        onChange={update('street')}
        error={fieldErrors.street}
        bare={bareInputs}
        labelClassName={bareInputs ? 'text-sm font-semibold text-merchant-ink' : undefined}
      />

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <MerchantRegistrationField
          id="onboarding-city"
          label={fields.city.label}
          placeholder={fields.city.placeholder}
          value={values.city}
          onChange={update('city')}
          error={fieldErrors.city}
          bare={bareInputs}
          labelClassName={bareInputs ? 'text-sm font-semibold text-merchant-ink' : undefined}
        />
        <MerchantRegistrationField
          id="onboarding-postal"
          label={fields.postalCode.label}
          placeholder={fields.postalCode.placeholder}
          value={values.postalCode}
          onChange={update('postalCode')}
          error={fieldErrors.postalCode}
          bare={bareInputs}
          labelClassName={bareInputs ? 'text-sm font-semibold text-merchant-ink' : undefined}
        />
      </div>

      <MerchantOnboardingLocationHoursMap
        map={location.map}
        confirmed={mapConfirmed}
        onConfirm={onMapConfirm}
        error={fieldErrors.map}
      />
    </MerchantOnboardingLocationHoursSection>
  )
}
