import { useState } from 'react'
import MerchantRegistrationField from '../registration/MerchantRegistrationField'
import MerchantOnboardingLocationHoursMap from './MerchantOnboardingLocationHoursMap'
import MerchantOnboardingLocationHoursSection from './MerchantOnboardingLocationHoursSection'

export default function MerchantOnboardingLocationHoursBusinessLocation({
  location,
  bareInputs = false,
  hideSectionNumber = false,
}) {
  const { fields } = location
  const [values, setValues] = useState({
    street: fields.street.defaultValue,
    city: fields.city.defaultValue,
    postalCode: fields.postalCode.defaultValue,
  })

  const update = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }))
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
          bare={bareInputs}
          labelClassName={bareInputs ? 'text-sm font-semibold text-merchant-ink' : undefined}
        />
        <MerchantRegistrationField
          id="onboarding-postal"
          label={fields.postalCode.label}
          placeholder={fields.postalCode.placeholder}
          value={values.postalCode}
          onChange={update('postalCode')}
          bare={bareInputs}
          labelClassName={bareInputs ? 'text-sm font-semibold text-merchant-ink' : undefined}
        />
      </div>

      <MerchantOnboardingLocationHoursMap map={location.map} />
    </MerchantOnboardingLocationHoursSection>
  )
}
