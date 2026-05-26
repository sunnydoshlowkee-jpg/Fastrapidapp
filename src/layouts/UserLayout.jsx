import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Home, Search, ShoppingBag, Wallet, User, Car, ShoppingCart } from 'lucide-react'
import Logo from '../components/brand/Logo'

const navItems = [
  { to: '/app', icon: Home, label: 'Home', desktopLabel: 'Home' },
  { to: '/app/promotions', icon: Search, label: 'Search', desktopLabel: 'Discovery' },
  { to: '/app/orders', icon: ShoppingBag, label: 'Orders', desktopLabel: 'Orders' },
  { to: '/app/wallet', icon: Wallet, label: 'Wallet', desktopLabel: 'Wallet' },
  { to: '/app/profile', icon: User, label: 'Profile', desktopLabel: 'Profile' },
]

export default function UserLayout() {
  const location = useLocation();
  const isHome = location.pathname === '/app';
  
  return (
    <div className="flex min-h-screen bg-gray-50 w-full relative overflow-hidden">
      
      {/* --- DESKTOP SIDEBAR --- */}
      <aside className="hidden md:flex flex-col w-[240px] bg-white border-r border-gray-100 flex-shrink-0 z-10 py-6 h-screen sticky top-0">
        <div className="px-8 mb-10">
          <Logo height={24} />
          <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mt-1 ml-1">Marketplace</div>
        </div>
        
        <nav className="flex-1 flex flex-col gap-2 px-4">
          {navItems.map(({ to, icon: Icon, desktopLabel }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/app'}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${
                  isActive 
                    ? 'text-[#1A1AF5] font-semibold border-l-4 border-[#1A1AF5] bg-blue-50/50' 
                    : 'text-gray-500 hover:bg-gray-50 border-l-4 border-transparent'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon size={20} className="flex-shrink-0" />
                  <span className="text-sm">{desktopLabel}</span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
        
        {/* Active Order Widget (Desktop) */}
        <div className="px-4 mt-auto">
          <div className="bg-white border border-gray-100 rounded-2xl shadow-[0_2px_12px_rgba(0,0,0,0.03)] p-4 relative overflow-hidden">
            <div className="flex justify-between items-center mb-2">
              <span className="text-[10px] font-bold text-[#1A1AF5] tracking-wider uppercase">On the way</span>
              <div className="w-2 h-2 rounded-full bg-red-500"></div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0 text-[#1A1AF5]">
                <Car size={18} />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Order #8821</p>
                <p className="text-[11px] text-gray-500">Arriving in 8 mins</p>
              </div>
            </div>
            {/* Progress bar */}
            <div className="mt-3 w-full bg-gray-100 h-1 rounded-full overflow-hidden">
              <div className="bg-[#1A1AF5] w-2/3 h-full rounded-full"></div>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN CONTENT --- */}
      <main className="flex-1 flex flex-col min-h-screen h-screen overflow-y-auto w-full md:w-[calc(100%-240px)]">
        <Outlet />
      </main>

      {/* --- MOBILE BOTTOM NAV --- */}
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
      
    </div>
  )
}
