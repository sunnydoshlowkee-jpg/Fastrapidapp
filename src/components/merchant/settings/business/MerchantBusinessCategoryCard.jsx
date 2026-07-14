import { useEffect, useState } from 'react'
import { Tags } from 'lucide-react'
import MerchantButton from '../../auth/MerchantButton'
import MerchantRegistrationField from '../../registration/MerchantRegistrationField'
import { allowsStoreFormat } from '../../../../utils/merchantBusinessType'
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

export default function MerchantBusinessCategoryCard({
  businessInfo,
  onSave,
  saving = false,
  className = merchantBusinessProfileCardClass,
}) {
  const [businessType, setBusinessType] = useState(businessInfo.businessType || '')
  const [storeFormat, setStoreFormat] = useState(businessInfo.storeFormat || '')
  const [errors, setErrors] = useState({})
  const [formError, setFormError] = useState('')
  const [success, setSuccess] = useState('')

  useEffect(() => {
    setBusinessType(businessInfo.businessType || '')
    setStoreFormat(businessInfo.storeFormat || '')
  }, [businessInfo.businessType, businessInfo.storeFormat])

  const showStoreFormat = allowsStoreFormat(businessType)
  const dirty =
    businessType !== (businessInfo.businessType || '') ||
    (showStoreFormat ? storeFormat : '') !== (businessInfo.storeFormat || '')

  const handleBusinessTypeChange = (e) => {
    const value = e.target.value
    setBusinessType(value)
    if (!allowsStoreFormat(value)) {
      setStoreFormat('')
    }
    setErrors((prev) => {
      const next = { ...prev }
      delete next.businessType
      if (!allowsStoreFormat(value)) delete next.storeFormat
      return next
    })
    setFormError('')
    setSuccess('')
  }

  const handleStoreFormatChange = (e) => {
    setStoreFormat(e.target.value)
    setErrors((prev) => {
      const next = { ...prev }
      delete next.storeFormat
      return next
    })
    setFormError('')
    setSuccess('')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setFormError('')
    setSuccess('')
    setErrors({})

    if (!businessType) {
      setErrors({ businessType: 'Please select a business type.' })
      return
    }

    if (showStoreFormat && !storeFormat) {
      setErrors({ storeFormat: 'Please select a store format.' })
      return
    }

    try {
      await onSave?.({
        businessType,
        storeFormat: showStoreFormat ? storeFormat : '',
      })
      setSuccess('Business category updated.')
    } catch (err) {
      if (err.fieldErrors) {
        setErrors(err.fieldErrors)
      }
      setFormError(err.message || 'Unable to update business category.')
    }
  }

  return (
    <section className={className}>
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-merchant-input text-merchant-primary">
          <Tags size={18} strokeWidth={1.75} aria-hidden />
        </div>
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-merchant-ink">Business category</h2>
          <p className="mt-1 text-sm text-merchant-muted">
            Choose how customers discover your store. Current:{' '}
            <span className="font-medium text-merchant-body">
              {businessInfo.categoryLabel || 'Not set'}
            </span>
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-5 space-y-4 border-t border-merchant-divider pt-5">
        <MerchantRegistrationField
          id="business-category-type"
          label="Business type"
          as="select"
          placeholderOption="Select business type"
          options={businessInfo.businessTypeOptions || []}
          value={businessType}
          onChange={handleBusinessTypeChange}
          error={errors.businessType}
        />

        {showStoreFormat ? (
          <MerchantRegistrationField
            id="business-category-store-format"
            label="Store format"
            as="select"
            placeholderOption="Select store format"
            options={businessInfo.storeFormatOptions || []}
            value={storeFormat}
            onChange={handleStoreFormatChange}
            error={errors.storeFormat}
          />
        ) : null}

        {formError ? <p className="text-sm text-merchant-error">{formError}</p> : null}
        {success && !formError ? <p className="text-sm text-emerald-700">{success}</p> : null}

        <MerchantButton type="submit" disabled={saving || !dirty} className="!py-3">
          {saving ? 'Saving…' : 'Save category'}
        </MerchantButton>
      </form>
    </section>
  )
}
