import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, User } from 'lucide-react'

export default function MerchantMenuItemCreateHeader({
  title,
  mobileTitle,
  onMenuClick,
  showMenuButton,
  showBack = true,
}) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        {showMenuButton && (
          <button
            type="button"
            onClick={onMenuClick}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-merchant-divider bg-merchant-surface text-merchant-ink lg:hidden"
            aria-label="Open navigation menu"
          >
            <span className="flex flex-col gap-1">
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
              <span className="block h-0.5 w-4 bg-current" />
            </span>
          </button>
        )}
        {showBack && (
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-merchant-ink transition-colors hover:bg-merchant-icon-tile lg:hidden"
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
        )}
        <h1 className="truncate text-lg font-bold tracking-[-0.02em] text-merchant-ink lg:text-xl lg:font-semibold">
          <span className="lg:hidden">{mobileTitle ?? title}</span>
          <span className="hidden lg:inline">{title}</span>
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E67E22]" aria-hidden />
        </button>
        <div
          className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-full bg-merchant-primary text-white lg:flex"
          aria-hidden
        >
          <User size={18} strokeWidth={1.75} />
        </div>
      </div>
    </header>
  )
}
