import { NavLink, Outlet } from 'react-router-dom'
import { MapPin, Package, User } from 'lucide-react'

const navItems = [
  { to: '/dispatch', icon: MapPin, label: 'Map' },
  { to: '/dispatch/deliveries', icon: Package, label: 'Deliveries' },
  { to: '/dispatch/profile', icon: User, label: 'Profile' },
]

export default function DispatchLayout() {
  return (
    <div className="flex flex-col min-h-screen bg-rapid-dark text-white max-w-md mx-auto relative">
      <main className="flex-1 overflow-y-auto pb-16">
        <Outlet />
      </main>

      <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-md bg-rapid-surface border-t border-white/10 flex justify-around items-center h-16 z-50">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dispatch'}
            className={({ isActive }) =>
              `flex flex-col items-center gap-0.5 text-xs transition-colors ${
                isActive ? 'text-rapid-orange' : 'text-gray-500'
              }`
            }
          >
            <Icon size={22} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
