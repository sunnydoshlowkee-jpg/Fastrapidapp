import { Bell } from 'lucide-react'

export default function MerchantOrdersMobileHeader() {
  return (
    <header className="flex items-center justify-between gap-4">
      <h1 className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">Orders</h1>
      <button
        type="button"
        className="relative flex h-10 w-10 items-center justify-center text-merchant-muted"
        aria-label="Notifications"
      >
        <Bell size={22} strokeWidth={1.75} />
        <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#E67E22]" aria-hidden />
      </button>
    </header>
  )
}
