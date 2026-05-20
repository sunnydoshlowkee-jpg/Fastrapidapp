import { useState } from 'react'
import MerchantButton from '../auth/MerchantButton'
import MerchantRegistrationField from './MerchantRegistrationField'
import MerchantRegistrationLogoUpload from './MerchantRegistrationLogoUpload'
import MerchantRegistrationSection from './MerchantRegistrationSection'

export default function MerchantRegistrationForm({ form, onContinue }) {
  const { fields, sections, logo } = form
  const [values, setValues] = useState({
    legalName: '',
    businessType: fields.businessType.defaultValue,
    businessEmail: '',
    phone: '',
    address: '',
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
    <div className="mx-auto w-full max-w-2xl">
      <h1 className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink lg:text-[1.75rem]">
        {form.title}{' '}
        <span className="text-merchant-primary">{form.titleHighlight}</span>
      </h1>

      <form
        className="mt-8 space-y-10"
        onSubmit={(e) => {
          e.preventDefault()
          onContinue?.(values.businessEmail)
        }}
      >
        <MerchantRegistrationSection section={sections.business}>
          <MerchantRegistrationLogoUpload logo={logo} />

          <MerchantRegistrationField
            id="legalName"
            label={fields.legalName.label}
            placeholder={fields.legalName.placeholder}
            value={values.legalName}
            onChange={update('legalName')}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="businessType"
              label={fields.businessType.label}
              as="select"
              options={fields.businessType.options}
              value={values.businessType}
              onChange={update('businessType')}
            />
            <MerchantRegistrationField
              id="businessEmail"
              label={fields.businessEmail.label}
              placeholder={fields.businessEmail.placeholder}
              type="email"
              value={values.businessEmail}
              onChange={update('businessEmail')}
            />
          </div>

          <MerchantRegistrationField
            id="phone"
            label={fields.phone.label}
            placeholder={fields.phone.placeholder}
            value={values.phone}
            onChange={update('phone')}
          />

          <MerchantRegistrationField
            id="address"
            label={fields.address.label}
            placeholder={fields.address.placeholder}
            value={values.address}
            onChange={update('address')}
          />

          <MerchantRegistrationField
            id="description"
            label={fields.description.label}
            placeholder={fields.description.placeholder}
            as="textarea"
            value={values.description}
            onChange={update('description')}
          />
        </MerchantRegistrationSection>

        <MerchantRegistrationSection section={sections.representative}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="repName"
              label={fields.repName.label}
              placeholder={fields.repName.placeholder}
              value={values.repName}
              onChange={update('repName')}
            />
            <MerchantRegistrationField
              id="repRole"
              label={fields.repRole.label}
              placeholder={fields.repRole.placeholder}
              value={values.repRole}
              onChange={update('repRole')}
            />
          </div>

          <MerchantRegistrationField
            id="repPhone"
            label={fields.repPhone.label}
            placeholder={fields.repPhone.placeholder}
            value={values.repPhone}
            onChange={update('repPhone')}
          />
        </MerchantRegistrationSection>

        <MerchantRegistrationSection section={sections.security}>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="password"
              label={fields.password.label}
              placeholder={fields.password.placeholder}
              type="password"
              value={values.password}
              onChange={update('password')}
            />
            <MerchantRegistrationField
              id="confirmPassword"
              label={fields.confirmPassword.label}
              placeholder={fields.confirmPassword.placeholder}
              type="password"
              value={values.confirmPassword}
              onChange={update('confirmPassword')}
            />
          </div>
        </MerchantRegistrationSection>

        <div className="space-y-4 pt-2">
          <button
            type="button"
            className="w-full text-center text-sm font-semibold text-merchant-muted transition-colors hover:text-merchant-ink"
          >
            {form.saveDraftLabel}
          </button>
          <MerchantButton type="submit">{form.continueLabel}</MerchantButton>
        </div>
      </form>
    </div>
  )
}
