import { Bell } from 'lucide-react'

export default function MerchantMenuUploadHeader({
  title,
  onMenuClick,
  showMenuButton,
  variant = 'inline',
}) {
  const isBar = variant === 'bar'

  return (
    <header
      className={
        isBar
          ? 'flex h-16 shrink-0 items-center justify-between gap-4 border-b border-merchant-divider bg-merchant-surface px-8'
          : 'flex items-center justify-between gap-4'
      }
    >
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
        <h1
          className={
            isBar
              ? 'truncate text-lg font-semibold leading-7 text-merchant-ink-slate'
              : 'truncate text-xl font-semibold tracking-[-0.02em] text-merchant-ink md:text-2xl'
          }
        >
          {title}
        </h1>
      </div>

      <button
        type="button"
        className="relative flex h-10 w-10 shrink-0 items-center justify-center text-[#64748B] transition-colors hover:text-merchant-ink-slate"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.75} />
      </button>
    </header>
  )
}
