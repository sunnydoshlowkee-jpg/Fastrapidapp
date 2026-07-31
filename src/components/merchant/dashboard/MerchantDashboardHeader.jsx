import { useNavigate } from 'react-router-dom'
import NotificationBellButton from '../../notifications/NotificationBellButton'
import MerchantHeaderActions from '../layout/MerchantHeaderActions'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'

export default function MerchantDashboardHeader({
  title,
  merchantId,
  onMenuClick,
  showMenuButton = false,
  variant = 'inline',
}) {
  const navigate = useNavigate()
  const { unread } = useUnreadNotifications({ role: 'merchant' })
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
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-merchant-field-border bg-merchant-surface text-merchant-ink-slate lg:hidden"
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

      <div className="flex shrink-0 items-center gap-3 lg:gap-4">
        <div className="lg:hidden">
          <MerchantHeaderActions
            iconClassName="text-[#64748B]"
            bellClassName="h-9 w-9 rounded-full"
            profileClassName="h-9 w-9 rounded-full border border-merchant-field-border bg-white text-merchant-ink"
          />
        </div>
        <div className="hidden items-center gap-4 lg:flex">
          <NotificationBellButton
            onClick={() => navigate('/merchant/notifications')}
            count={unread}
            tone="indigo"
            iconSize={18}
            iconClassName="text-[#64748B]"
            className="h-9 w-8"
            ariaLabel={unread > 0 ? `${unread} unread notifications` : 'Notifications'}
          />
          {isBar ? <span className="h-8 w-px bg-merchant-divider" aria-hidden /> : null}
          <p className="text-xs font-medium leading-4 text-merchant-header-muted">
            Merchant ID: <span className="text-merchant-header-muted">#{merchantId}</span>
          </p>
        </div>
      </div>
    </header>
  )
}
