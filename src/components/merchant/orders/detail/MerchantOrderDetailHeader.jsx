import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, User } from 'lucide-react'

export default function MerchantOrderDetailHeader({
  displayId,
  statusBadge,
  onMenuClick,
  showMenuButton,
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
        <button
          type="button"
          onClick={() => navigate('/merchant/orders')}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
          aria-label="Back to orders"
        >
          <ArrowLeft size={20} strokeWidth={2} />
        </button>
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h1 className="truncate text-lg font-bold tracking-[-0.02em] text-merchant-ink sm:text-xl">
            {displayId}
          </h1>
          {statusBadge && (
            <span className="rounded-full bg-[rgba(230,126,34,0.14)] px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#E67E22]">
              {statusBadge}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" aria-hidden />
        </button>
        <div
          className="flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-merchant-primary text-white sm:h-10 sm:w-10"
          aria-hidden
        >
          <User size={18} strokeWidth={1.75} />
        </div>
      </div>
    </header>
  )
}
