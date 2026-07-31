import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, Settings, User } from 'lucide-react'
import NotificationBellButton from '../../notifications/NotificationBellButton'
import { useUnreadNotifications } from '../../../hooks/useUnreadNotifications'
import {
  getMerchantAccountLabel,
  getStoredMerchantSession,
  merchantLogout,
} from '../../../services/merchantAuthService'
import MerchantAccountSwitcher from '../accounts/MerchantAccountSwitcher'

/**
 * Notification bell + profile menu (Settings, Profile, Switch/Add merchant, Sign out).
 * Used on merchant mobile headers where Settings is not in the bottom nav.
 */
export default function MerchantHeaderActions({
  tone = 'indigo',
  iconSize = 18,
  iconClassName = 'text-merchant-link',
  bellClassName = 'h-10 w-10 rounded-full',
  profileClassName = 'h-10 w-10 rounded-full border border-merchant-field-border bg-white text-merchant-ink',
}) {
  const navigate = useNavigate()
  const { unread } = useUnreadNotifications({ role: 'merchant' })
  const [open, setOpen] = useState(false)
  const [signingOut, setSigningOut] = useState(false)
  const rootRef = useRef(null)

  const activeLabel = useMemo(() => {
    const session = getStoredMerchantSession()
    return getMerchantAccountLabel(session?.user)
  }, [open])

  useEffect(() => {
    if (!open) return undefined

    const onPointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        setOpen(false)
      }
    }

    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('touchstart', onPointerDown)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('touchstart', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  const handleSignOut = async () => {
    if (signingOut) return
    setSigningOut(true)
    setOpen(false)
    try {
      const { switchedTo } = await merchantLogout({ switchToRemaining: true })
      if (switchedTo) {
        window.location.assign('/merchant')
      } else {
        navigate('/merchant/login', { replace: true })
      }
    } catch {
      navigate('/merchant/login', { replace: true })
    } finally {
      setSigningOut(false)
    }
  }

  const go = (path) => {
    setOpen(false)
    navigate(path)
  }

  return (
    <div ref={rootRef} className="relative flex shrink-0 items-center gap-1.5">
      <NotificationBellButton
        onClick={() => navigate('/merchant/notifications')}
        count={unread}
        tone={tone}
        iconSize={iconSize}
        iconClassName={iconClassName}
        className={bellClassName}
        ariaLabel={unread > 0 ? `${unread} unread notifications` : 'Notifications'}
      />

      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className={`relative flex items-center justify-center ${profileClassName}`}
        aria-label="Profile menu"
        aria-expanded={open}
        aria-haspopup="menu"
      >
        <User size={iconSize} strokeWidth={1.75} />
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 w-64 overflow-hidden rounded-2xl border border-gray-100 bg-white py-1.5 shadow-xl shadow-gray-200/80"
        >
          <div className="px-4 pb-2 pt-2">
            <p className="truncate text-sm font-semibold text-gray-900">{activeLabel}</p>
            <p className="text-[11px] text-gray-400">Active merchant</p>
          </div>

          <button
            type="button"
            role="menuitem"
            onClick={() => go('/merchant/settings')}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            <Settings size={16} className="text-merchant-primary" strokeWidth={1.75} />
            Settings
          </button>
          <button
            type="button"
            role="menuitem"
            onClick={() => go('/merchant/settings/account')}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-gray-800 hover:bg-gray-50"
          >
            <User size={16} className="text-merchant-primary" strokeWidth={1.75} />
            Profile
          </button>

          <MerchantAccountSwitcher compact onClose={() => setOpen(false)} />

          <div className="my-1 border-t border-gray-100" />
          <button
            type="button"
            role="menuitem"
            onClick={handleSignOut}
            disabled={signingOut}
            className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm font-medium text-red-600 hover:bg-red-50 disabled:opacity-60"
          >
            <LogOut size={16} strokeWidth={1.75} />
            Sign out
          </button>
        </div>
      ) : null}
    </div>
  )
}
