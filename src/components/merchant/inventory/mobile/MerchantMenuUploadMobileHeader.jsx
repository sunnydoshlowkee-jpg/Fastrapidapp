import { Bell } from 'lucide-react'

export default function MerchantMenuUploadMobileHeader({ title }) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-4 bg-merchant-input px-4 lg:hidden">
      <h1 className="text-lg font-semibold leading-7 text-merchant-ink-slate">{title}</h1>
      <button
        type="button"
        className="relative flex h-7 w-6 items-center justify-center text-merchant-link"
        aria-label="Notifications"
      >
        <Bell size={16} strokeWidth={1.75} />
        <span
          className="absolute right-0 top-1 h-2 w-2 rounded-full bg-[#7E3400]"
          aria-hidden
        />
      </button>
    </header>
  )
}
