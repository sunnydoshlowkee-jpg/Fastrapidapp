import { NavLink, Outlet } from 'react-router-dom'
import { Home, Search, ShoppingBag, User } from 'lucide-react'

const navItems = [
  { to: '/app', icon: Home, label: 'Home' },
  { to: '/app/search', icon: Search, label: 'Search' },
  { to: '/app/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/app/profile', icon: User, label: 'Profile' },
]

export default function UserLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50 max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-20">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-100 flex justify-around items-center h-16 z-50">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/app'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-xs transition-colors ${
                isActive ? 'text-rapid-orange' : 'text-gray-400'
              }`
            }
          >
            <Icon size={20} strokeWidth={isActive => (isActive ? 2.5 : 1.8)} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
