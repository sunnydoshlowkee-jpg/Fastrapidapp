import { useState } from 'react'
import MerchantRegistrationField from '../MerchantRegistrationField'
import MerchantRegistrationMobileLogoUpload from './MerchantRegistrationMobileLogoUpload'
import MerchantRegistrationMobilePromo from './MerchantRegistrationMobilePromo'
import MerchantRegistrationMobileSection from './MerchantRegistrationMobileSection'

export default function MerchantRegistrationMobileForm({ form, stepLabel, promo, onContinue }) {
  const { fields, sections, logo } = form
  const [values, setValues] = useState({
    legalName: '',
    businessType: '',
    businessEmail: '',
    phone: '',
    addressStreet: '',
    addressCity: '',
    addressZip: '',
    description: '',
    repName: '',
    repRole: '',
    repPhone: '',
    password: '',
    confirmPassword: '',
  })

  const update = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }))
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-merchant-muted">{stepLabel}</p>
      <h1 className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">
        {form.title}{' '}
        <span className="text-merchant-primary">{form.titleHighlight}</span>
      </h1>

      <form
        id="merchant-registration-mobile-form"
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
          onContinue?.(values.businessEmail)
        }}
      >
        <MerchantRegistrationMobileSection section={sections.business}>
          <MerchantRegistrationMobileLogoUpload logo={logo} />

          <MerchantRegistrationField
            id="mobile-legalName"
            label={fields.legalName.label}
            placeholder={fields.legalName.placeholder}
            value={values.legalName}
            onChange={update('legalName')}
          />

          <MerchantRegistrationField
            id="mobile-businessType"
            label={fields.businessType.label}
            as="select"
            placeholderOption={fields.businessType.placeholder}
            options={fields.businessType.options}
            value={values.businessType}
            onChange={update('businessType')}
          />

          <MerchantRegistrationField
            id="mobile-businessEmail"
            label={fields.businessEmail.label}
            placeholder={fields.businessEmail.placeholder}
            type="email"
            value={values.businessEmail}
            onChange={update('businessEmail')}
          />

          <MerchantRegistrationField
            id="mobile-phone"
            label={fields.phone.label}
            placeholder={fields.phone.placeholder}
            value={values.phone}
            onChange={update('phone')}
          />

          <MerchantRegistrationField
            id="mobile-addressStreet"
            label={fields.addressStreet.label}
            placeholder={fields.addressStreet.placeholder}
            value={values.addressStreet}
            onChange={update('addressStreet')}
          />

          <div className="grid grid-cols-2 gap-3">
            <MerchantRegistrationField
              id="mobile-addressCity"
              label={fields.addressCity.label}
              placeholder={fields.addressCity.placeholder}
              value={values.addressCity}
              onChange={update('addressCity')}
            />
            <MerchantRegistrationField
              id="mobile-addressZip"
              label={fields.addressZip.label}
              placeholder={fields.addressZip.placeholder}
              value={values.addressZip}
              onChange={update('addressZip')}
            />
          </div>

          <MerchantRegistrationField
            id="mobile-description"
            label={fields.description.label}
            placeholder={fields.description.placeholder}
            as="textarea"
            value={values.description}
            onChange={update('description')}
          />
        </MerchantRegistrationMobileSection>

        <MerchantRegistrationMobileSection section={sections.representative}>
          <MerchantRegistrationField
            id="mobile-repName"
            label={fields.repName.label}
            placeholder={fields.repName.placeholder}
            value={values.repName}
            onChange={update('repName')}
          />
          <MerchantRegistrationField
            id="mobile-repRole"
            label={fields.repRole.label}
            placeholder={fields.repRole.placeholder}
            value={values.repRole}
            onChange={update('repRole')}
          />
          <MerchantRegistrationField
            id="mobile-repPhone"
            label={fields.repPhone.label}
            placeholder={fields.repPhone.placeholder}
            value={values.repPhone}
            onChange={update('repPhone')}
          />
        </MerchantRegistrationMobileSection>

        <MerchantRegistrationMobileSection section={sections.security}>
          <MerchantRegistrationField
            id="mobile-password"
            label={fields.password.label}
            placeholder={fields.password.placeholder}
            type="password"
            value={values.password}
            onChange={update('password')}
          />
          <MerchantRegistrationField
            id="mobile-confirmPassword"
            label={fields.confirmPassword.label}
            placeholder={fields.confirmPassword.placeholder}
            type="password"
            value={values.confirmPassword}
            onChange={update('confirmPassword')}
          />
        </MerchantRegistrationMobileSection>

        <MerchantRegistrationMobilePromo promo={promo} />
      </form>
    </div>
  )
}
