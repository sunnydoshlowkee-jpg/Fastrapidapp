import { Camera } from 'lucide-react'

export default function MerchantRegistrationLogoUpload({ logo }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-merchant-divider bg-merchant-input">
        <Camera size={24} className="text-merchant-muted" strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0 pt-1">
        <p className="text-sm font-bold text-merchant-ink">{logo.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-merchant-muted">{logo.description}</p>
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-merchant-primary hover:text-merchant-link"
        >
          {logo.actionLabel}
        </button>
      </div>
    </div>
  )
}
