import { useEffect, useState } from 'react'
import { ArrowRight, ChevronDown } from 'lucide-react'
import MerchantMenuItemCreateCardIntro from './MerchantMenuItemCreateCardIntro'
import MerchantMenuItemCreateField from './MerchantMenuItemCreateField'
import MerchantMenuItemCreateMediaUpload, { inputClassName } from './MerchantMenuItemCreateMediaUpload'
import MerchantMenuItemCreateProTip from './MerchantMenuItemCreateProTip'

const emptyForm = {
  productName: '',
  category: '',
  stockQuantity: '',
  price: '',
  description: '',
}

function resolveFormCopy(copy, variant) {
  if (variant !== 'mobile' || !copy.mobile) {
    return { fields: copy.fields, proTip: copy.proTip }
  }

  const { mobile } = copy
  return {
    fields: {
      ...copy.fields,
      media: { ...copy.fields.media, ...mobile.fields.media },
      price: { ...copy.fields.price, ...mobile.fields.price },
      description: { ...copy.fields.description, ...mobile.fields.description },
    },
    proTip: mobile.proTip,
  }
}

export default function MerchantMenuItemCreateForm({
  copy,
  categories,
  onCancel,
  onSubmit,
  submitting = false,
  variant = 'desktop',
}) {
  const isMobile = variant === 'mobile'
  const { fields, proTip } = resolveFormCopy(copy, variant)
  const [form, setForm] = useState(emptyForm)
  const [mediaFile, setMediaFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)

  useEffect(() => {
    if (!mediaFile) {
      setPreviewUrl(null)
      return undefined
    }
    const url = URL.createObjectURL(mediaFile)
    setPreviewUrl(url)
    return () => URL.revokeObjectURL(url)
  }, [mediaFile])

  const updateField = (key) => (e) => {
    setForm((prev) => ({ ...prev, [key]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return
    onSubmit?.({ ...form, mediaFile })
  }

  const { actions } = copy

  const actionsBlock = (
    <div
      className={
        isMobile
          ? 'grid grid-cols-2 gap-3'
          : 'flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'
      }
    >
      <button
        type="button"
        onClick={onCancel}
        disabled={submitting}
        className={`rounded-lg bg-merchant-icon-tile py-3.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input disabled:opacity-60 ${
          isMobile ? 'px-4' : 'px-6 sm:min-w-[120px]'
        }`}
      >
        {actions.cancel}
      </button>
      <button
        type="submit"
        disabled={submitting}
        className={`flex items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6] disabled:opacity-60 ${
          isMobile ? 'px-4' : 'px-6 sm:min-w-[200px]'
        }`}
      >
        <span className={isMobile ? 'truncate' : ''}>
          {submitting ? 'Saving…' : actions.submit}
        </span>
        <ArrowRight size={18} strokeWidth={2} className="shrink-0" aria-hidden />
      </button>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} className={`flex flex-col ${isMobile ? 'gap-5' : 'gap-6'}`}>
      {isMobile && (
        <MerchantMenuItemCreateCardIntro title={copy.pageTitle} subtitle={copy.mobile.subtitle} />
      )}

      <MerchantMenuItemCreateMediaUpload
        media={fields.media}
        previewUrl={previewUrl}
        onSelectFile={setMediaFile}
        showLabel={fields.media.showLabel ?? true}
        compact={isMobile}
      />

      <MerchantMenuItemCreateField id="productName" label={fields.productName.label}>
        <input
          id="productName"
          type="text"
          value={form.productName}
          onChange={updateField('productName')}
          placeholder={fields.productName.placeholder}
          required
          className={inputClassName}
        />
      </MerchantMenuItemCreateField>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-2' : 'grid-cols-1 gap-6 sm:grid-cols-2'}`}>
        <MerchantMenuItemCreateField id="category" label={fields.category.label}>
          <div className="relative">
            <select
              id="category"
              value={form.category}
              onChange={updateField('category')}
              required
              className={`${inputClassName} appearance-none pr-10`}
            >
              {categories.map((option) => (
                <option key={option.value || 'placeholder'} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <ChevronDown
              size={18}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-merchant-muted"
              aria-hidden
            />
          </div>
        </MerchantMenuItemCreateField>

        <MerchantMenuItemCreateField id="stockQuantity" label={fields.stockQuantity.label}>
          <input
            id="stockQuantity"
            type="number"
            min="0"
            inputMode="numeric"
            value={form.stockQuantity}
            onChange={updateField('stockQuantity')}
            placeholder={fields.stockQuantity.placeholder}
            className={inputClassName}
          />
        </MerchantMenuItemCreateField>
      </div>

      <MerchantMenuItemCreateField id="price" label={fields.price.label}>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-merchant-muted">
            ₦
          </span>
          <input
            id="price"
            type="text"
            inputMode="decimal"
            value={form.price}
            onChange={updateField('price')}
            placeholder={fields.price.placeholder}
            required
            className={`${inputClassName} pl-9`}
          />
        </div>
      </MerchantMenuItemCreateField>

      <MerchantMenuItemCreateField id="description" label={fields.description.label}>
        <textarea
          id="description"
          rows={isMobile ? 4 : 5}
          value={form.description}
          onChange={updateField('description')}
          placeholder={fields.description.placeholder}
          className={`${inputClassName} ${isMobile ? 'min-h-[100px]' : 'min-h-[140px]'} resize-y`}
        />
      </MerchantMenuItemCreateField>

      {isMobile && <MerchantMenuItemCreateProTip proTip={proTip} compact />}

      {actionsBlock}

      {!isMobile && <MerchantMenuItemCreateProTip proTip={proTip} />}
    </form>
  )
}
