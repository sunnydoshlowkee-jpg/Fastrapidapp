import { Camera, Store } from 'lucide-react'
import { useMerchantLogoUpload } from '../../../../hooks/useMerchantLogoUpload'

export default function MerchantBusinessProfileLogo({
  initialLogoUrl,
  onLogoUpdated,
  sizeClass = 'h-[72px] w-[72px] lg:h-20 lg:w-20',
}) {
  const {
    logoUrl,
    uploading,
    error,
    fileInputRef,
    handleFileChange,
  } = useMerchantLogoUpload({
    initialLogoUrl,
    onSuccess: onLogoUpdated,
  })

  return (
    <div>
      <input
        id="merchant-business-logo-input"
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/gif,image/webp"
        className="sr-only"
        onChange={handleFileChange}
      />

      <div className="relative shrink-0">
        <label
          htmlFor="merchant-business-logo-input"
          className={`group relative block cursor-pointer overflow-hidden rounded-xl ${sizeClass} ${uploading ? 'pointer-events-none opacity-70' : ''}`}
          aria-label="Upload business logo"
        >
          {logoUrl ? (
            <img src={logoUrl} alt="" className={`${sizeClass} object-cover`} />
          ) : (
            <div className={`flex ${sizeClass} items-center justify-center bg-[#1A1A1A] text-white/80`}>
              <Store size={28} strokeWidth={1.5} aria-hidden />
            </div>
          )}
          <span className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/45 text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
            {uploading ? (
              <span className="text-[11px] font-semibold">Uploading…</span>
            ) : (
              <Camera size={20} strokeWidth={1.75} aria-hidden />
            )}
          </span>
        </label>

        <label
          htmlFor="merchant-business-logo-input"
          className={`absolute -bottom-1 -right-1 flex h-7 w-7 cursor-pointer items-center justify-center rounded-full bg-merchant-primary text-white ring-2 ring-merchant-surface ${uploading ? 'pointer-events-none opacity-70' : ''}`}
          aria-label="Upload business logo"
        >
          <Camera size={14} strokeWidth={2} aria-hidden />
        </label>
      </div>

      {error ? (
        <p className="mt-2 max-w-[12rem] text-xs text-merchant-error">{error}</p>
      ) : null}
    </div>
  )
}
