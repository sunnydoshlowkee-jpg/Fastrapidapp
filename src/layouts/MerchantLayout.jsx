import { NavLink, Outlet } from 'react-router-dom'
import { LayoutDashboard, Package, ClipboardList, BarChart2, Settings } from 'lucide-react'

const navItems = [
  { to: '/merchant', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/merchant/menu', icon: Package, label: 'Menu' },
  { to: '/merchant/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/merchant/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/merchant/settings', icon: Settings, label: 'Settings' },
]

export default function MerchantLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <aside className="w-60 bg-white border-r border-gray-100 flex flex-col py-6 px-4 shrink-0">
        <span className="text-2xl font-bold text-rapid-orange mb-10 px-2">Rapid Biz</span>
        <nav className="flex flex-col gap-1">
          {navItems.map(({ to, icon: Icon, label }) => (
            <NavLink
              key={to}
              to={to}
              end={to === '/merchant'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-orange-50 text-rapid-orange'
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <Icon size={18} />
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
