import { Bell, Calendar, ChevronDown, Download } from 'lucide-react'

export default function MerchantAnalyticsHeader({ title, dateFilterLabel, onMenuClick, showMenuButton }) {
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
        <h1 className="truncate text-xl font-semibold tracking-[-0.02em] text-merchant-ink md:text-2xl">
          {title}
        </h1>
      </div>

      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg border border-merchant-divider bg-merchant-surface px-3 py-2 text-sm font-medium text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
        >
          <Calendar size={16} strokeWidth={1.75} aria-hidden />
          <span className="hidden sm:inline">Date Filter</span>
          <span>{dateFilterLabel}</span>
          <ChevronDown size={16} className="text-merchant-muted" aria-hidden />
        </button>
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-[#E67E22]" aria-hidden />
        </button>
        <button
          type="button"
          className="flex items-center gap-2 rounded-lg bg-merchant-primary px-4 py-2.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
        >
          <Download size={16} strokeWidth={2} aria-hidden />
          Export Data
        </button>
      </div>
    </header>
  )
}
