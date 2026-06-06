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
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(198,196,218,0.15)] bg-merchant-canvas px-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
      aria-label="Merchant primary navigation"
    >
      <ul className="flex items-center justify-between gap-2">
        {items.map(({ to, icon: Icon, label, end, matchPrefix }) => (
          <li key={to} className="min-w-0">
            <NavLink
              to={to}
              end={end}
              {...(matchPrefix
                ? { isActive: (_, location) => location.pathname.startsWith(to) }
                : {})}
              className={({ isActive }) =>
                `flex min-h-[56px] w-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium leading-4 transition-colors ${
                  isActive ? 'bg-merchant-primary text-[#DDDCFF]' : 'text-merchant-body'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon
                    size={18}
                    strokeWidth={isActive ? 2.25 : 1.75}
                    className={isActive ? 'text-[#DDDCFF]' : 'text-merchant-body'}
                  />
                  <span className="truncate">{label}</span>
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
