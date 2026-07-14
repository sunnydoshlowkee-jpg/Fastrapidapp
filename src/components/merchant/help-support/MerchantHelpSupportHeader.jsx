import { Bell } from 'lucide-react'

export default function MerchantHelpSupportHeader({ title, user, onMenuClick, showMenuButton }) {
  return (
    <header className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 items-center gap-3">
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
        <h1 className="truncate text-xl font-semibold tracking-[-0.02em] text-merchant-ink lg:text-2xl">
          {title}
        </h1>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:gap-4">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" aria-hidden />
        </button>

        <div className="hidden text-right sm:block">
          <p className="text-sm font-semibold text-merchant-ink">{user.businessName}</p>
          <p className="text-xs text-merchant-muted">{user.role}</p>
        </div>
      </div>
    </header>
  )
}
