import { Bell } from 'lucide-react'

export default function MerchantMobileHeader({ variant = 'inline' }) {
  const isBar = variant === 'bar'

  return (
    <header
      className={
        isBar
          ? 'sticky top-0 z-30 flex h-16 items-center justify-between gap-4 bg-merchant-input px-4 lg:hidden'
          : 'flex items-center justify-between gap-4'
      }
    >
      <h1
        className={
          isBar
            ? 'text-base font-bold leading-6 tracking-[-0.4px] text-merchant-ink'
            : 'text-base font-bold uppercase tracking-[0.06em] text-merchant-ink'
        }
      >
        {isBar ? 'MERCHANT PORTAL' : 'Merchant Portal'}
      </h1>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full text-merchant-link"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.75} />
      </button>
    </header>
  )
}
