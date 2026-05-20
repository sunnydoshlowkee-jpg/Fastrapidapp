import { CircleHelp } from 'lucide-react'

export default function MerchantSettingsMobileFooter({
  signOutLabel,
  quickSupportLabel,
  onSignOut,
  onQuickSupport,
}) {
  return (
    <div className="flex flex-col gap-6 pt-2">
      <button
        type="button"
        onClick={onSignOut}
        className="w-full rounded-xl bg-merchant-icon-tile py-3.5 text-sm font-bold text-merchant-ink transition-colors active:bg-merchant-input"
      >
        {signOutLabel}
      </button>

      <button
        type="button"
        onClick={onQuickSupport}
        className="flex items-center justify-center gap-2 text-sm font-semibold text-merchant-primary"
      >
        <span className="flex h-6 w-6 items-center justify-center rounded-full border-2 border-merchant-primary">
          <CircleHelp size={14} strokeWidth={2} aria-hidden />
        </span>
        {quickSupportLabel}
      </button>
    </div>
  )
}
