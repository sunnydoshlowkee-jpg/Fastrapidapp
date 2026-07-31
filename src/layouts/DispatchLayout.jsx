import { useCallback, useEffect, useRef, useState } from 'react'
import { NavLink, Outlet, Navigate, useLocation } from 'react-router-dom'
import { Home, Truck, BarChart2, User } from 'lucide-react'
import { NavBadge } from '../components/notifications/NotificationBellButton'
import BrandedLoader from '../components/ui/BrandedLoader'
import PullToRefresh from '../components/ui/PullToRefresh'
import { useUnreadNotifications } from '../hooks/useUnreadNotifications'
import { isRiderApproved, refreshRiderSession } from '../services/riderAuthService'
import { createPullRefreshHandler } from '../utils/pullRefresh'

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
  const mainRef = useRef(null)
  const [syncing, setSyncing] = useState(true)
  const [approved, setApproved] = useState(isRiderApproved())
  const [refreshKey, setRefreshKey] = useState(0)
  const handlePullRefresh = useCallback(createPullRefreshHandler(setRefreshKey), [])

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
    <div className="relative mx-auto flex min-h-screen max-w-md flex-col bg-gray-50">
      <main ref={mainRef} className="min-h-0 flex-1 overflow-y-auto pb-dispatch-nav">
        {syncing ? (
          <BrandedLoader size="md" />
        ) : (
          <PullToRefresh scrollRef={mainRef} onRefresh={handlePullRefresh}>
            <Outlet key={refreshKey} />
          </PullToRefresh>
        )}
      </main>

      <nav className="fixed bottom-0 left-1/2 z-50 flex h-auto min-h-[68px] w-full max-w-md -translate-x-1/2 items-center justify-around border-t border-gray-100 bg-white pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom,0px))] shadow-[0_-4px_20px_rgba(0,0,0,0.06)]">
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
                return `flex w-16 flex-col items-center gap-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
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
