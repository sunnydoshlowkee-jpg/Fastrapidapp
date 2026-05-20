import { NavLink } from 'react-router-dom'
import { BarChart2, LayoutGrid, Package, Settings, ClipboardList } from 'lucide-react'

const items = [
  { to: '/merchant', icon: LayoutGrid, label: 'Dashboard', end: true },
  { to: '/merchant/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/merchant/menu', icon: Package, label: 'Inventory', matchPrefix: true },
  { to: '/merchant/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/merchant/settings', icon: Settings, label: 'Settings', matchPrefix: true },
]

export default function MerchantBottomNav() {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-merchant-divider bg-merchant-surface px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
      aria-label="Merchant primary navigation"
    >
      <ul className="flex items-end justify-around gap-1">
        {items.map(({ to, icon: Icon, label, end, matchPrefix }) => (
          <li key={to} className="min-w-0 flex-1">
            <NavLink
              to={to}
              end={end}
              {...(matchPrefix
                ? { isActive: (_, location) => location.pathname.startsWith(to) }
                : {})}
              className={({ isActive }) =>
                `flex flex-col items-center gap-1 rounded-xl py-2 text-[10px] font-semibold transition-colors ${
                  isActive ? '' : 'text-merchant-muted hover:text-merchant-body'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <span
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isActive ? 'bg-merchant-primary shadow-sm' : 'bg-transparent'
                    }`}
                  >
                    <Icon
                      size={20}
                      strokeWidth={isActive ? 2.25 : 1.75}
                      className={isActive ? 'text-white' : 'text-merchant-muted'}
                    />
                  </span>
                  <span className={`truncate px-0.5 ${isActive ? 'text-merchant-ink' : 'text-merchant-muted'}`}>
                    {label}
                  </span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
