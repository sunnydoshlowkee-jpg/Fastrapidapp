import { Bell } from 'lucide-react'

export default function MerchantSettingsMobileHeader({ heading, merchantId }) {
  return (
    <header className="flex items-center justify-between gap-3">
      <div className="flex min-w-0 flex-wrap items-baseline gap-2">
        <h1 className="text-lg font-bold tracking-[-0.02em] text-merchant-ink">{heading}</h1>
        <span className="text-sm font-bold text-merchant-primary">ID: {merchantId}</span>
      </div>
      <button
        type="button"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center text-merchant-ink"
        aria-label="Notifications"
      >
        <Bell size={22} strokeWidth={1.75} />
      </button>
    </header>
  )
}
