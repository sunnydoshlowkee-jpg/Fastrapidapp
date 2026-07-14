import { useNavigate } from 'react-router-dom'
import NotificationBellButton from '../../notifications/NotificationBellButton'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'

export default function MerchantMobileHeader({ variant = 'inline' }) {
  const navigate = useNavigate()
  const { unread } = useUnreadNotifications({ role: 'merchant' })
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
      <NotificationBellButton
        onClick={() => navigate('/merchant/notifications')}
        count={unread}
        tone="indigo"
        iconSize={18}
        iconClassName="text-merchant-link"
        className="h-10 w-10 rounded-full"
        ariaLabel={unread > 0 ? `${unread} unread notifications` : 'Notifications'}
      />
    </header>
  )
}
