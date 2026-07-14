import { useRef } from 'react'
import { ImagePlus } from 'lucide-react'

const inputClassName =
  'w-full rounded-lg bg-merchant-input px-4 py-3.5 text-sm text-merchant-ink outline-none transition-colors placeholder:text-merchant-muted/70 focus:ring-2 focus:ring-merchant-primary/10 md:border md:border-[rgba(198,196,218,0.3)] md:focus:border-merchant-primary'

export default function MerchantMenuItemCreateMediaUpload({
  media,
  previewUrl,
  onSelectFile,
  showLabel = true,
  compact = false,
}) {
  const inputRef = useRef(null)

  return (
    <div className="flex flex-col gap-2">
      {showLabel && media.label && (
        <span className="text-sm font-semibold text-merchant-ink">{media.label}</span>
      )}
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className={`flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-merchant-divider bg-merchant-input px-4 py-8 transition-colors hover:border-merchant-primary/40 ${
          compact ? 'min-h-[150px]' : 'min-h-[180px] md:min-h-[200px]'
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={(e) => onSelectFile(e.target.files?.[0] ?? null)}
        />
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Product preview"
            className="max-h-40 w-full max-w-md rounded-lg object-cover"
          />
        ) : (
          <>
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary">
              <ImagePlus size={24} strokeWidth={1.75} aria-hidden />
            </div>
            <p className="mt-4 text-sm font-semibold text-merchant-ink">{media.title}</p>
            <p className="mt-1 max-w-sm text-center text-xs leading-relaxed text-merchant-muted">
              {media.hint}
            </p>
          </>
        )}
      </button>
    </div>
  )
}

export { inputClassName }
