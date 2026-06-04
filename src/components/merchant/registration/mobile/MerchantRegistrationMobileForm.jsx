import { useState } from 'react'
import MerchantRegistrationField from '../MerchantRegistrationField'
import MerchantRegistrationMobileLogoUpload from './MerchantRegistrationMobileLogoUpload'
import MerchantRegistrationMobilePromo from './MerchantRegistrationMobilePromo'
import MerchantRegistrationMobileSection from './MerchantRegistrationMobileSection'

function buildDefaultValues(fields, initialValues) {
  return {
    legalName: '',
    businessType: fields.businessType.options?.[0] || '',
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
    ...initialValues,
  }
}

export default function MerchantRegistrationMobileForm({
  form,
  stepLabel,
  promo,
  initialValues,
  initialLogoUrl,
  onContinue,
  submitting = false,
}) {
  const { fields, sections, logo } = form
  const [values, setValues] = useState(() => buildDefaultValues(fields, initialValues))
  const [logoFile, setLogoFile] = useState(null)
  const [logoPreview, setLogoPreview] = useState(initialLogoUrl ?? null)
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')

  const update = (key) => (e) => {
    setValues((prev) => ({ ...prev, [key]: e.target.value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
    if (formError) setFormError('')
  }

  const handleLogoSelect = (file) => {
    setLogoFile(file)
    setLogoPreview(URL.createObjectURL(file))
    if (errors.logo) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next.logo
        return next
      })
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setErrors({})

    try {
      await onContinue?.(values, logoFile)
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors)
      }
      setFormError(err.message || 'Unable to complete registration.')
    }
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
        onSubmit={handleSubmit}
      >
        <MerchantRegistrationMobileSection section={sections.business}>
          <MerchantRegistrationMobileLogoUpload
            logo={logo}
            previewUrl={logoPreview}
            onFileSelect={handleLogoSelect}
            error={errors.logo}
          />

          <MerchantRegistrationField
            id="mobile-legalName"
            label={fields.legalName.label}
            placeholder={fields.legalName.placeholder}
            value={values.legalName}
            onChange={update('legalName')}
            error={errors.legalName}
          />

          <MerchantRegistrationField
            id="mobile-businessType"
            label={fields.businessType.label}
            as="select"
            placeholderOption={fields.businessType.placeholder}
            options={fields.businessType.options}
            value={values.businessType}
            onChange={update('businessType')}
            error={errors.businessType}
          />

          <MerchantRegistrationField
            id="mobile-businessEmail"
            label={fields.businessEmail.label}
            placeholder={fields.businessEmail.placeholder}
            type="email"
            value={values.businessEmail}
            onChange={update('businessEmail')}
            error={errors.businessEmail}
          />

          <MerchantRegistrationField
            id="mobile-phone"
            label={fields.phone.label}
            placeholder={fields.phone.placeholder}
            value={values.phone}
            onChange={update('phone')}
            error={errors.phone}
          />

          <MerchantRegistrationField
            id="mobile-addressStreet"
            label={fields.addressStreet.label}
            placeholder={fields.addressStreet.placeholder}
            value={values.addressStreet}
            onChange={update('addressStreet')}
            error={errors.addressStreet || errors.address}
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
            error={errors.repName}
          />
          <MerchantRegistrationField
            id="mobile-repRole"
            label={fields.repRole.label}
            placeholder={fields.repRole.placeholder}
            value={values.repRole}
            onChange={update('repRole')}
            error={errors.repRole}
          />
          <MerchantRegistrationField
            id="mobile-repPhone"
            label={fields.repPhone.label}
            placeholder={fields.repPhone.placeholder}
            value={values.repPhone}
            onChange={update('repPhone')}
            error={errors.repPhone}
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
            error={errors.password}
          />
          <MerchantRegistrationField
            id="mobile-confirmPassword"
            label={fields.confirmPassword.label}
            placeholder={fields.confirmPassword.placeholder}
            type="password"
            value={values.confirmPassword}
            onChange={update('confirmPassword')}
            error={errors.confirmPassword}
          />
        </MerchantRegistrationMobileSection>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-merchant-error">{formError}</p>
        ) : null}

        <MerchantRegistrationMobilePromo promo={promo} />
      </form>
    </div>
  )
}
