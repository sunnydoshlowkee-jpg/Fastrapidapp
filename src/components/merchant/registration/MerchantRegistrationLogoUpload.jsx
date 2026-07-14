import { useRef } from 'react'
import { Camera } from 'lucide-react'

export default function MerchantRegistrationLogoUpload({ logo, previewUrl, onFileSelect, error }) {
  const inputRef = useRef(null)

  return (
    <div className="flex flex-col gap-8 sm:flex-row sm:items-center">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-2 border-dashed border-merchant-checkbox bg-merchant-input">
        {previewUrl ? (
          <img src={previewUrl} alt="" className="h-full w-full object-cover" />
        ) : (
          <Camera size={28} className="text-[#767588]" strokeWidth={1.75} aria-hidden />
        )}
      </div>
      <div className="min-w-0">
        <p className="text-lg font-bold leading-7 text-[#1A1C1C]">{logo.label}</p>
        <p className="mt-1 max-w-xs text-sm leading-5 text-merchant-body">{logo.description}</p>
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0]
            if (file) onFileSelect?.(file)
          }}
        />
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="mt-1 text-sm font-bold leading-5 text-merchant-link hover:text-merchant-primary"
        >
          {logo.actionLabel}
        </button>
        {error ? <p className="mt-1 text-sm text-merchant-error">{error}</p> : null}
      </div>
    </div>
  )
}
