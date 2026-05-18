import { Bell } from 'lucide-react'

export default function MerchantMobileHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-base font-bold uppercase tracking-[0.06em] text-merchant-ink">
        Merchant Portal
      </h1>
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center text-merchant-primary"
        aria-label="Notifications"
      >
        <Bell size={22} strokeWidth={1.75} />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E67E22]" aria-hidden />
      </button>
    </header>
  )
}
