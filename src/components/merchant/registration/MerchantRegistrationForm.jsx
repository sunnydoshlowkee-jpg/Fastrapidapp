import { useState } from 'react'
import MerchantButton from '../auth/MerchantButton'
import MerchantRegistrationField from './MerchantRegistrationField'
import MerchantRegistrationLogoUpload from './MerchantRegistrationLogoUpload'
import MerchantRegistrationSection from './MerchantRegistrationSection'

function buildDefaultValues(fields, initialValues) {
  return {
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
    ...initialValues,
  }
}

export default function MerchantRegistrationForm({
  form,
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
      } else {
        setErrors({})
      }
      setFormError(err.message || 'Unable to complete registration.')
    }
  }

  const title = [form.title, form.titleHighlight].filter(Boolean).join(' ')

  return (
    <div className="mx-auto w-full max-w-[545px]">
      <h1 className="text-[40px] font-normal leading-[48px] tracking-[-0.03em] text-merchant-ink">
        {title}
      </h1>

      <form className="mt-7 flex flex-col gap-7" onSubmit={handleSubmit}>
        <MerchantRegistrationSection section={sections.business}>
          <MerchantRegistrationLogoUpload
            logo={logo}
            previewUrl={logoPreview}
            onFileSelect={handleLogoSelect}
            error={errors.logo}
          />

          <MerchantRegistrationField
            id="legalName"
            label={fields.legalName.label}
            placeholder={fields.legalName.placeholder}
            value={values.legalName}
            onChange={update('legalName')}
            error={errors.legalName}
          />

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="businessType"
              label={fields.businessType.label}
              as="select"
              options={fields.businessType.options}
              value={values.businessType}
              onChange={update('businessType')}
              error={errors.businessType}
            />
            <MerchantRegistrationField
              id="businessEmail"
              label={fields.businessEmail.label}
              placeholder={fields.businessEmail.placeholder}
              type="email"
              value={values.businessEmail}
              onChange={update('businessEmail')}
              error={errors.businessEmail}
            />
          </div>

          <div className="sm:max-w-[calc(50%-10px)]">
            <MerchantRegistrationField
              id="phone"
              label={fields.phone.label}
              placeholder={fields.phone.placeholder}
              value={values.phone}
              onChange={update('phone')}
              error={errors.phone}
            />
          </div>

          <MerchantRegistrationField
            id="address"
            label={fields.address.label}
            placeholder={fields.address.placeholder}
            value={values.address}
            onChange={update('address')}
            error={errors.address}
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

        <MerchantRegistrationSection section={sections.representative} variant="representative">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="repName"
              label={fields.repName.label}
              placeholder={fields.repName.placeholder}
              value={values.repName}
              onChange={update('repName')}
              error={errors.repName}
            />
            <MerchantRegistrationField
              id="repRole"
              label={fields.repRole.label}
              placeholder={fields.repRole.placeholder}
              value={values.repRole}
              onChange={update('repRole')}
              error={errors.repRole}
            />
          </div>

          <div className="sm:max-w-[calc(50%-10px)]">
            <MerchantRegistrationField
              id="repPhone"
              label={fields.repPhone.label}
              placeholder={fields.repPhone.placeholder}
              value={values.repPhone}
              onChange={update('repPhone')}
              error={errors.repPhone}
            />
          </div>
        </MerchantRegistrationSection>

        <MerchantRegistrationSection section={sections.security} variant="security">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <MerchantRegistrationField
              id="password"
              label={fields.password.label}
              placeholder={fields.password.placeholder}
              type="password"
              variant="security"
              value={values.password}
              onChange={update('password')}
              error={errors.password}
            />
            <MerchantRegistrationField
              id="confirmPassword"
              label={fields.confirmPassword.label}
              placeholder={fields.confirmPassword.placeholder}
              type="password"
              variant="security"
              value={values.confirmPassword}
              onChange={update('confirmPassword')}
              error={errors.confirmPassword}
            />
          </div>
        </MerchantRegistrationSection>

        {formError ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-merchant-error">{formError}</p>
        ) : null}

        <div className="flex flex-col items-center gap-4 border-t border-merchant-divider pt-8 sm:flex-row sm:justify-center">
          <button
            type="button"
            className="px-8 py-3.5 text-sm font-bold text-merchant-body transition-colors hover:text-merchant-ink"
          >
            {form.saveDraftLabel}
          </button>
          <MerchantButton
            type="submit"
            disabled={submitting}
            className="w-auto shrink-0 px-12 py-3.5 shadow-merchant-cta"
          >
            {submitting ? 'Saving…' : form.continueLabel}
          </MerchantButton>
        </div>
      </form>
    </div>
  )
}
