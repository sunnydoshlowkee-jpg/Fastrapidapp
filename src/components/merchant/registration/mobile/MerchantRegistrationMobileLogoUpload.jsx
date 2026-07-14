import { useRef } from 'react'
import { Camera } from 'lucide-react'
import { merchantRegistrationLabelClass } from '../merchantRegistrationStyles'

export default function MerchantRegistrationMobileLogoUpload({
  logo,
  icon: Icon = Camera,
  previewUrl,
  onFileSelect,
  error,
  showLabel = true,
  compact = false,
}) {
  const inputRef = useRef(null)

  const openPicker = () => inputRef.current?.click()

  if (compact) {
    return (
      <>
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
          onClick={openPicker}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-merchant-divider bg-merchant-input px-4 py-8 font-sans text-sm font-semibold text-merchant-muted transition-colors hover:border-merchant-primary hover:text-merchant-primary"
        >
          <Icon size={18} strokeWidth={1.75} aria-hidden />
          {logo.actionLabel}
        </button>
        {error ? <p className="text-sm text-merchant-error">{error}</p> : null}
      </>
    )
  }

  return (
    <div className="flex flex-col gap-2">
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
      {showLabel && logo.label ? (
        <p className={merchantRegistrationLabelClass}>{logo.label}</p>
      ) : null}
      <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-merchant-divider bg-merchant-input px-4 py-6 text-center">
        {previewUrl ? (
          <img src={previewUrl} alt="" className="h-20 w-20 rounded-lg object-cover" />
        ) : (
          <Icon size={28} className="text-merchant-muted" strokeWidth={1.75} aria-hidden />
        )}
        <p className="mt-3 text-sm leading-relaxed text-merchant-muted">{logo.description}</p>
        <button
          type="button"
          onClick={openPicker}
          className="mt-2 font-sans text-sm font-semibold text-merchant-primary"
        >
          {logo.actionLabel}
        </button>
        {logo.hint ? (
          <p className="mt-1 text-xs text-merchant-muted">{logo.hint}</p>
        ) : null}
      </div>
      {error ? <p className="text-sm text-merchant-error">{error}</p> : null}
    </div>
  )
}
