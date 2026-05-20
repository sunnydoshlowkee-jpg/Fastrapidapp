import { Camera } from 'lucide-react'
import { merchantRegistrationLabelClass } from '../merchantRegistrationStyles'

export default function MerchantRegistrationMobileLogoUpload({
  logo,
  icon: Icon = Camera,
  onActionClick,
  showLabel = true,
  compact = false,
}) {
  if (compact) {
    return (
      <button
        type="button"
        onClick={onActionClick}
        className="flex w-full items-center justify-center gap-2 rounded-lg border border-dashed border-merchant-divider bg-merchant-input px-4 py-8 font-sans text-sm font-semibold text-merchant-muted transition-colors hover:border-merchant-primary hover:text-merchant-primary"
      >
        <Icon size={18} strokeWidth={1.75} aria-hidden />
        {logo.actionLabel}
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {showLabel && logo.label ? (
        <p className={merchantRegistrationLabelClass}>{logo.label}</p>
      ) : null}
      <div className="flex flex-col items-center rounded-xl border-2 border-dashed border-merchant-divider bg-merchant-input px-4 py-6 text-center">
        <Icon size={28} className="text-merchant-muted" strokeWidth={1.75} aria-hidden />
        <p className="mt-3 text-sm leading-relaxed text-merchant-muted">{logo.description}</p>
        <button
          type="button"
          onClick={onActionClick}
          className="mt-2 font-sans text-sm font-semibold text-merchant-primary"
        >
          {logo.actionLabel}
        </button>
        {logo.hint ? (
          <p className="mt-1 text-xs text-merchant-muted">{logo.hint}</p>
        ) : null}
      </div>
    </div>
  )
}
