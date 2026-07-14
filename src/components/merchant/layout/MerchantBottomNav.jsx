import { NavLink } from 'react-router-dom'
import { BarChart2, LayoutGrid, Package, Wallet, ClipboardList } from 'lucide-react'

const items = [
  { to: '/merchant', icon: LayoutGrid, label: 'Home', end: true },
  { to: '/merchant/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/merchant/menu', icon: Package, label: 'Inventory', matchPrefix: true },
  { to: '/merchant/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/merchant/analytics', icon: BarChart2, label: 'Analytics' },
]

export default function MerchantBottomNav({ newOrdersCount = 0 }) {
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-[rgba(198,196,218,0.15)] bg-merchant-canvas px-5 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2 lg:hidden"
      aria-label="Merchant primary navigation"
    >
      <ul className="flex items-center justify-between gap-2">
        {items.map(({ to, icon: Icon, label, end, matchPrefix }) => {
          const showOrdersBadge = to === '/merchant/orders' && newOrdersCount > 0

          return (
            <li key={to} className="min-w-0">
              <NavLink
                to={to}
                end={end}
                {...(matchPrefix
                  ? { isActive: (_, location) => location.pathname.startsWith(to) }
                  : {})}
                className={({ isActive }) =>
                  `relative flex min-h-[56px] w-16 flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[11px] font-medium leading-4 transition-colors ${
                    isActive ? 'bg-merchant-primary text-[#DDDCFF]' : 'text-merchant-body'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="relative">
                      <Icon
                        size={18}
                        strokeWidth={isActive ? 2.25 : 1.75}
                        className={isActive ? 'text-[#DDDCFF]' : 'text-merchant-body'}
                      />
                      {showOrdersBadge ? (
                        <span className="absolute -right-2 -top-2 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#FF4D4F] px-1 text-[9px] font-bold text-white shadow-[0_0_10px_rgba(255,77,79,0.65)] animate-pulse">
                          {newOrdersCount > 9 ? '9+' : newOrdersCount}
                        </span>
                      ) : null}
                    </span>
                    <span className="truncate">{label}</span>
                  </>
                )}
              </NavLink>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
