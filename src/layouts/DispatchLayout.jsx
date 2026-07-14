import { useEffect, useState } from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { Home, Truck, BarChart2, User } from 'lucide-react'
import { NavBadge } from '../components/notifications/NotificationBellButton'
import { useUnreadNotifications } from '../hooks/useUnreadNotifications'
import { isRiderApproved, refreshRiderSession } from '../services/riderAuthService'

const navItems = [
  { to: '/dispatch', icon: Home, label: 'Home', end: true },
  { to: '/dispatch/deliveries', icon: Truck, label: 'Deliveries', end: false },
  { to: '/dispatch/earnings', icon: BarChart2, label: 'Earnings', end: false },
  { to: '/dispatch/profile', icon: User, label: 'Profile', end: false, badgeKey: 'unread' },
]

const PENDING_ALLOWED_PREFIXES = [
  '/dispatch/profile',
  '/dispatch/pending',
]

export default function DispatchLayout() {
  const location = useLocation()
  const [syncing, setSyncing] = useState(true)
  const [approved, setApproved] = useState(isRiderApproved())

  const isAuthed = Boolean(localStorage.getItem('rider_token') || localStorage.getItem('rapid_token'))
  const pendingAllowed = PENDING_ALLOWED_PREFIXES.some((prefix) => location.pathname.startsWith(prefix))
  const { unread, refresh: refreshUnread } = useUnreadNotifications({
    role: 'rider',
    enabled: isAuthed && approved,
  })

  useEffect(() => {
    if (isAuthed && approved) refreshUnread()
  }, [location.pathname, isAuthed, approved, refreshUnread])

  useEffect(() => {
    let active = true

    const syncProfile = async () => {
      try {
        const profile = await refreshRiderSession()
        if (!active) return
        setApproved(profile?.rider?.status === 'approved')
      } catch {
        if (active) {
          setApproved(isRiderApproved())
        }
      } finally {
        if (active) {
          setSyncing(false)
        }
      }
    }

    syncProfile()

    return () => {
      active = false
    }
  }, [location.pathname])

  if (!isAuthed) {
    return <Navigate to="/dispatch/login" replace state={{ from: location.pathname }} />
  }

  if (!syncing && !approved && !pendingAllowed) {
    return <Navigate to="/dispatch/pending" replace />
  }

  const homePath = approved ? '/dispatch' : '/dispatch/pending'

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        {syncing ? (
          <div className="flex min-h-[50vh] items-center justify-center text-sm text-gray-500">
            Loading…
          </div>
        ) : (
          <Outlet />
        )}
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center h-[68px] z-50 shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
        {navItems.map(({ to, icon: Icon, label, end }) => {
          const target = to === '/dispatch' ? homePath : to
          const disabled = !approved && !to.startsWith('/dispatch/profile') && to !== '/dispatch'
          const resolvedTo = disabled ? '/dispatch/pending' : target
          const isHome = to === '/dispatch'

          return (
            <NavLink
              key={to}
              to={resolvedTo}
              end={end && approved}
              className={() => {
                const homeActive = isHome && !approved && location.pathname === '/dispatch/pending'
                const routeActive = isHome
                  ? (approved ? location.pathname === '/dispatch' : homeActive)
                  : location.pathname.startsWith(to)
                return `flex flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors w-16 ${
                  routeActive ? 'text-[#5B5BFF]' : 'text-gray-400'
                }`
              }}
            >
              {() => (
                <>
                  <span className="relative">
                    <Icon size={22} strokeWidth={2} />
                    {to === '/dispatch/profile' ? <NavBadge count={unread} /> : null}
                  </span>
                  {label}
                </>
              )}
            </NavLink>
          )
        })}
      </nav>
    </div>
  )
}
