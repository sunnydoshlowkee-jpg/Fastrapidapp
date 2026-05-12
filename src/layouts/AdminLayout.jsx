import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard, Users, Store, Bike,
  ShoppingBag, BarChart2, Settings,
} from 'lucide-react'

const navItems = [
  { to: '/admin', icon: LayoutDashboard, label: 'Overview' },
  { to: '/admin/users', icon: Users, label: 'Users' },
  { to: '/admin/merchants', icon: Store, label: 'Merchants' },
  { to: '/admin/riders', icon: Bike, label: 'Riders' },
  { to: '/admin/orders', icon: ShoppingBag, label: 'Orders' },
  { to: '/admin/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/admin/settings', icon: Settings, label: 'Settings' },
]

export default function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-950 text-gray-100">
      <aside className="w-64 bg-gray-900 border-r border-white/5 flex flex-col py-6 px-4 shrink-0">
        <span className="text-xl font-bold text-rapid-orange mb-10 px-2">Rapid Admin</span>
        <nav className="flex flex-col gap-0.5">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-500/10 text-rapid-orange'
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`
              }
            >
              <Icon size={17} />
              {label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
