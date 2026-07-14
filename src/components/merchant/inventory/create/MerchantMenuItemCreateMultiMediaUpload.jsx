import { useRef } from 'react'
import { ImagePlus, X } from 'lucide-react'

const inputClassName =
  'w-full rounded-lg bg-merchant-input px-4 py-3.5 text-sm text-merchant-ink outline-none transition-colors placeholder:text-merchant-muted/70 focus:ring-2 focus:ring-merchant-primary/10 md:border md:border-[rgba(198,196,218,0.3)] md:focus:border-merchant-primary'

export default function MerchantMenuItemCreateMultiMediaUpload({
  media,
  previewUrls = [],
  maxImages = 6,
  onChangeFiles,
  showLabel = true,
  compact = false,
}) {
  const inputRef = useRef(null)
  const canAddMore = previewUrls.length < maxImages

  const handleSelect = (event) => {
    const selected = Array.from(event.target.files ?? [])
    if (selected.length === 0) return

    const remaining = maxImages - previewUrls.length
    onChangeFiles(selected.slice(0, remaining))
    event.target.value = ''
  }

  const handleRemove = (index) => {
    onChangeFiles(null, index)
  }

  return (
    <div className="flex flex-col gap-2">
      {showLabel && media.label && (
        <span className="text-sm font-semibold text-merchant-ink">{media.label}</span>
      )}

      {previewUrls.length > 0 ? (
        <div className={`grid gap-3 ${compact ? 'grid-cols-2' : 'grid-cols-2 sm:grid-cols-3'}`}>
          {previewUrls.map((url, index) => (
            <div key={`${url}-${index}`} className="relative overflow-hidden rounded-xl border border-merchant-divider bg-merchant-input">
              <img src={url} alt={`Product ${index + 1}`} className="aspect-square w-full object-cover" />
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label={`Remove image ${index + 1}`}
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      ) : null}

      {canAddMore ? (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-merchant-divider bg-merchant-input px-4 py-8 transition-colors hover:border-merchant-primary/40 ${
            compact ? 'min-h-[130px]' : 'min-h-[160px]'
          }`}
        >
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            className="sr-only"
            onChange={handleSelect}
          />
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary">
            <ImagePlus size={24} strokeWidth={1.75} aria-hidden />
          </div>
          <p className="mt-4 text-sm font-semibold text-merchant-ink">{media.title}</p>
          <p className="mt-1 max-w-sm text-center text-xs leading-relaxed text-merchant-muted">
            {media.hint}
          </p>
          <p className="mt-2 text-xs font-medium text-merchant-muted">
            {previewUrls.length}/{maxImages} photos added
          </p>
        </button>
      ) : null}
    </div>
  )
}

export { inputClassName }
