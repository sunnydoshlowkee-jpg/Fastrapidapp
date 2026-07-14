import { useEffect, useMemo, useState } from 'react'
import { ArrowRight } from 'lucide-react'
import { resolveStorageUrl } from '../../../../utils/mediaUrl'
import MerchantMenuItemCategoryField from './MerchantMenuItemCategoryField'
import MerchantMenuItemCreateCardIntro from './MerchantMenuItemCreateCardIntro'
import MerchantMenuItemCreateField from './MerchantMenuItemCreateField'
import MerchantMenuItemCreateMediaUpload, { inputClassName } from './MerchantMenuItemCreateMediaUpload'
import MerchantMenuItemCreateMultiMediaUpload from './MerchantMenuItemCreateMultiMediaUpload'
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
  categories = [],
  allowsMultipleImages = false,
  onCreateCategory,
  creatingCategory = false,
  onCancel,
  onSubmit,
  submitting = false,
  variant = 'desktop',
  initialForm = null,
  initialImageUrls = [],
}) {
  const isMobile = variant === 'mobile'
  const { fields, proTip } = resolveFormCopy(copy, variant)
  const [form, setForm] = useState(initialForm ?? emptyForm)
  const [mediaFile, setMediaFile] = useState(null)
  const [mediaFiles, setMediaFiles] = useState([])
  const [existingPreviewUrls, setExistingPreviewUrls] = useState([])

  useEffect(() => {
    if (initialForm) {
      setForm(initialForm)
    }
  }, [initialForm])

  useEffect(() => {
    setExistingPreviewUrls(
      (initialImageUrls ?? [])
        .map((url) => resolveStorageUrl(url) || url)
        .filter(Boolean),
    )
  }, [initialImageUrls])

  const singlePreviewUrl = useMemo(() => {
    if (mediaFile) {
      return URL.createObjectURL(mediaFile)
    }

    return existingPreviewUrls[0] ?? null
  }, [mediaFile, existingPreviewUrls])

  useEffect(() => {
    if (!mediaFile) return undefined
    const url = URL.createObjectURL(mediaFile)
    return () => URL.revokeObjectURL(url)
  }, [mediaFile])

  const multiPreviewUrls = useMemo(() => {
    const uploaded = mediaFiles.map((file) => URL.createObjectURL(file))
    return [...existingPreviewUrls, ...uploaded]
  }, [mediaFiles, existingPreviewUrls])

  useEffect(() => {
    return () => {
      multiPreviewUrls
        .filter((url) => url.startsWith('blob:'))
        .forEach((url) => URL.revokeObjectURL(url))
    }
  }, [multiPreviewUrls])

  const handleMultiFileChange = (selectedFiles, removeIndex = null) => {
    if (removeIndex !== null) {
      if (removeIndex < existingPreviewUrls.length) {
        setExistingPreviewUrls((current) => current.filter((_, index) => index !== removeIndex))
        return
      }

      const fileIndex = removeIndex - existingPreviewUrls.length
      setMediaFiles((current) => current.filter((_, index) => index !== fileIndex))
      return
    }

    if (!selectedFiles?.length) return
    setMediaFiles((current) => [...current, ...selectedFiles].slice(0, 6))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (submitting) return

    onSubmit?.({
      ...form,
      mediaFile,
      mediaFiles,
      allowsMultipleImages,
    })
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

      {allowsMultipleImages ? (
        <MerchantMenuItemCreateMultiMediaUpload
          media={fields.media}
          previewUrls={multiPreviewUrls}
          maxImages={6}
          onChangeFiles={handleMultiFileChange}
          showLabel={fields.media.showLabel ?? true}
          compact={isMobile}
        />
      ) : (
        <MerchantMenuItemCreateMediaUpload
          media={fields.media}
          previewUrl={singlePreviewUrl}
          onSelectFile={setMediaFile}
          showLabel={fields.media.showLabel ?? true}
          compact={isMobile}
        />
      )}

      <MerchantMenuItemCreateField id="productName" label={fields.productName.label}>
        <input
          id="productName"
          type="text"
          value={form.productName}
          onChange={(e) => setForm((prev) => ({ ...prev, productName: e.target.value }))}
          placeholder={fields.productName.placeholder}
          required
          className={inputClassName}
        />
      </MerchantMenuItemCreateField>

      <div className={`grid gap-4 ${isMobile ? 'grid-cols-1' : 'grid-cols-1 gap-6 sm:grid-cols-2'}`}>
        <MerchantMenuItemCategoryField
          label={fields.category.label}
          categories={categories}
          value={form.category}
          onChange={(value) => setForm((prev) => ({ ...prev, category: value }))}
          onCreateCategory={onCreateCategory}
          creating={creatingCategory}
        />

        <MerchantMenuItemCreateField id="stockQuantity" label={fields.stockQuantity.label}>
          <input
            id="stockQuantity"
            type="number"
            min="0"
            inputMode="numeric"
            value={form.stockQuantity}
            onChange={(e) => setForm((prev) => ({ ...prev, stockQuantity: e.target.value }))}
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
            onChange={(e) => setForm((prev) => ({ ...prev, price: e.target.value }))}
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
          onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
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
