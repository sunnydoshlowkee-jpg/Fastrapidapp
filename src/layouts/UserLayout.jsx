import { useState, useEffect, useRef } from 'react'
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { Home, Search, ShoppingBag, Wallet, User, Car, ShoppingCart } from 'lucide-react'
import Logo from '../components/brand/Logo'
import { getOrders } from '../services/orderService'

const navItems = [
  { to: '/app', icon: Home, label: 'Home', desktopLabel: 'Home' },
  { to: '/app/search', icon: Search, label: 'Search', desktopLabel: 'Search' },
  { to: '/app/orders', icon: ShoppingBag, label: 'Orders', desktopLabel: 'Orders' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet', desktopLabel: 'Wallet' },
  { to: '/app/profile', icon: User, label: 'Profile', desktopLabel: 'Profile' },
]

export default function UserLayout() {
  const location = useLocation()
  const navigate = useNavigate()
  const mainRef = useRef(null)
  const isHome = location.pathname === '/app'
  const [activeOrder, setActiveOrder] = useState(null)

  useEffect(() => {
    mainRef.current?.scrollTo(0, 0)
  }, [location.pathname])

  useEffect(() => {
    const fetchActiveOrder = async () => {
      try {
        const { data } = await getOrders()
        const ongoing = (data.data || []).find(o => o.status !== 'delivered' && o.status !== 'cancelled')
        setActiveOrder(ongoing || null)
      } catch (err) {
        console.error('Failed to fetch active order in layout', err)
      }
    }
    fetchActiveOrder()
  }, [location.pathname])
  
  const topLevelPaths = ['/app', '/app/search', '/app/promotions', '/app/orders', '/app/wallet', '/app/profile']
  const browsePaths = [
    /^\/app\/vendor\/[^/]+$/,
    /^\/app\/item\/[^/]+$/,
    /^\/app\/vendors\/[^/]+$/,
  ]
  const hideMobileNavPaths = [
    /^\/app\/cart$/,
    /^\/app\/checkout$/,
    /^\/app\/order-success\//,
    /^\/app\/track\//,
  ]

  const showMobileNav =
    (topLevelPaths.includes(location.pathname) || browsePaths.some((pattern) => pattern.test(location.pathname)))
    && !hideMobileNavPaths.some((pattern) => pattern.test(location.pathname))

  const getStatusInfo = (status) => {
    switch (status) {
      case 'pending':
        return { label: 'Order Placed', progress: 'w-1/4', time: 'Arriving in 25 mins' }
      case 'preparing':
        return { label: 'Preparing', progress: 'w-2/4', time: 'Arriving in 15 mins' }
      case 'in_transit':
        return { label: 'On the way', progress: 'w-3/4', time: 'Arriving in 8 mins' }
      default:
        return { label: 'On the way', progress: 'w-2/3', time: 'Arriving in 8 mins' }
    }
  }

  const statusInfo = activeOrder ? getStatusInfo(activeOrder.status) : getStatusInfo('in_transit')

  return (
    <div className="flex h-dvh min-h-screen w-full overflow-hidden bg-gray-50 relative">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-[300px] bg-white border-r border-gray-100 flex-shrink-0 z-10 py-8 h-screen sticky top-0">
        <div className="px-9 mb-14">
          <Logo height={34} />
        </div>
        
        <nav className="flex-1 flex flex-col gap-2.5 px-5">
          {navItems.map(({ to, icon: Icon, desktopLabel }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-5 px-5 py-4 rounded-xl transition-all ${
                  isActive 
                    ? 'text-[#1A1AF5] font-semibold border-l-4 border-[#1A1AF5] bg-blue-50/50' 
                    : 'text-gray-500 hover:bg-gray-50 border-l-4 border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={26} className="flex-shrink-0" />
                  <span className="text-[18px]">{desktopLabel}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Active Order Widget (Desktop) */}
        {activeOrder && (
          <div 
            onClick={() => {
              navigate(`/app/track/${activeOrder.id}`)
            }}
            className="px-5 mt-auto cursor-pointer hover:opacity-90 transition-opacity"
          >
            <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-5 relative overflow-hidden">
              <div className="flex justify-between items-center mb-3">
                <span className="text-[11px] font-bold text-[#1A1AF5] tracking-wider uppercase">
                  {statusInfo.label}
                </span>
                <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#1A1AF5]">
                  <Car size={20} />
                </div>
                <div>
                  <p className="text-[15px] font-bold text-gray-900">
                    Order #{activeOrder.id}
                  </p>
                  <p className="text-[13px] text-gray-500">
                    {statusInfo.time}
                  </p>
                </div>
              </div>
              {/* Progress bar */}
              <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                <div className={`bg-[#1A1AF5] h-full rounded-full ${statusInfo.progress}`}></div>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main ref={mainRef} className="flex-1 flex flex-col min-h-0 h-full overflow-y-auto w-full md:w-[calc(100%-300px)]">
        <Outlet />
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
      {showMobileNav && (
        <nav className="md:hidden fixed bottom-0 left-0 w-full bg-white border-t border-gray-100 flex justify-around items-center h-[72px] pb-safe z-50 shadow-[0_-4px_24px_rgba(0,0,0,0.02)]">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-16 h-full gap-1 text-[10px] transition-colors ${
                isActive ? 'text-[#1A1AF5] font-semibold' : 'text-gray-400 font-medium hover:text-gray-600'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} className={isActive ? 'text-[#1A1AF5]' : 'text-gray-400'} />
                {label}
              </>
            )}
          </NavLink>
        ))}
        </nav>
      )}
      
    </div>
  )
}
