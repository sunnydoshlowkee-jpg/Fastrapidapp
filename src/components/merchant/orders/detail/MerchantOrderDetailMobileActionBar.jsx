import { useState } from 'react'
import { Check } from 'lucide-react'

export default function MerchantOrderDetailMobileActionBar({
  disclaimer,
  onAccept,
  onReject,
  disabled = false,
}) {
  const [confirmed, setConfirmed] = useState(false)

  const handleAccept = () => {
    if (!confirmed) return
    onAccept?.()
  }

  return (
    <div className="fixed bottom-[5.75rem] left-0 right-0 z-30 border-t border-merchant-divider bg-merchant-surface px-4 py-3 shadow-[0_-4px_24px_rgba(25,28,29,0.08)] lg:hidden">
      <label className="flex cursor-pointer items-start gap-2.5">
        <input
          type="checkbox"
          checked={confirmed}
          onChange={(e) => setConfirmed(e.target.checked)}
          className="mt-0.5 h-4 w-4 shrink-0 rounded border-merchant-checkbox text-merchant-primary focus:ring-merchant-primary/30"
        />
        <span className="text-xs leading-relaxed text-merchant-muted">{disclaimer}</span>
      </label>

      <div className="mt-3 flex gap-2">
        <button
          type="button"
          onClick={onReject}
          disabled={disabled}
          className="flex-1 rounded-lg bg-merchant-icon-tile py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input disabled:cursor-not-allowed disabled:opacity-50"
        >
          Reject Order
        </button>
        <button
          type="button"
          onClick={handleAccept}
          disabled={!confirmed || disabled}
          className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6] disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check size={18} strokeWidth={2.5} aria-hidden />
          Accept Order
        </button>
      </div>
    </div>
  )
}
