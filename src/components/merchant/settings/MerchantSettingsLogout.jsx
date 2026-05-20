import { LogOut } from 'lucide-react'

export default function MerchantSettingsLogout({ label, onLogout }) {
  return (
    <button
      type="button"
      onClick={onLogout}
      className="inline-flex items-center gap-2 rounded-lg bg-merchant-icon-tile px-4 py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-input"
    >
      <LogOut size={18} strokeWidth={1.75} aria-hidden />
      {label}
    </button>
  )
}
