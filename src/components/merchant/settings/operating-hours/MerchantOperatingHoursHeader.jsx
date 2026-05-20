import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Save } from 'lucide-react'

export default function MerchantOperatingHoursHeader({
  breadcrumbs,
  saveLabel,
  onMenuClick,
  showMenuButton,
  onSave,
  variant = 'desktop',
}) {
  const navigate = useNavigate()
  const isMobile = variant === 'mobile'

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
        {isMobile && (
          <button
            type="button"
            onClick={() => navigate('/merchant/settings')}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-merchant-ink transition-colors hover:bg-merchant-icon-tile lg:hidden"
            aria-label="Back to settings"
          >
            <ArrowLeft size={20} strokeWidth={2} />
          </button>
        )}

        <nav aria-label="Breadcrumb" className="min-w-0 text-sm">
          <ol className="flex flex-wrap items-center gap-1.5 text-merchant-muted">
            <li>
              <button
                type="button"
                onClick={() => navigate('/merchant/settings')}
                className="font-medium transition-colors hover:text-merchant-ink"
              >
                {breadcrumbs.parent}
              </button>
            </li>
            <li aria-hidden className="text-merchant-divider">
              |
            </li>
            <li className="font-semibold text-merchant-ink">{breadcrumbs.current}</li>
          </ol>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-2 sm:gap-3">
        {!isMobile && (
          <button
            type="button"
            className="relative flex h-10 w-10 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
            aria-label="Notifications"
          >
            <Bell size={20} strokeWidth={1.75} />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500" aria-hidden />
          </button>
        )}
        <button
          type="button"
          onClick={onSave}
          className="inline-flex items-center gap-2 rounded-lg bg-merchant-primary px-4 py-2.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
        >
          <Save size={16} strokeWidth={2} aria-hidden />
          {saveLabel}
        </button>
      </div>
    </header>
  )
}


