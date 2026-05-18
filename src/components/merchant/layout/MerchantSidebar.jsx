import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart2,
  ClipboardList,
  Headphones,
  LayoutDashboard,
  LogOut,
  Package,
  Settings,
  X,
} from 'lucide-react'
import { clearMerchantSession } from '../../../services/merchantAuthService'

const navItems = [
  { to: '/merchant', icon: LayoutDashboard, label: 'Dashboard', end: true },
  { to: '/merchant/orders', icon: ClipboardList, label: 'Orders' },
  { to: '/merchant/menu', icon: Package, label: 'Inventory' },
  { to: '/merchant/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/merchant/settings', icon: Settings, label: 'Settings' },
]

export default function MerchantSidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    clearMerchantSession()
    navigate('/merchant/login', { replace: true })
  }

  const sidebarContent = (
    <>
      <div className="flex items-start justify-between gap-3 px-2">
        <div>
          <p className="text-lg font-bold tracking-[-0.02em] text-merchant-ink">Rapid Merchant</p>
          <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-[rgba(69,69,87,0.55)]">
            Merchant Portal
          </p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-merchant-body hover:bg-merchant-input lg:hidden"
          aria-label="Close navigation menu"
        >
          <X size={18} />
        </button>
      </div>

      <nav className="mt-8 flex flex-1 flex-col gap-1" aria-label="Merchant navigation">
        {navItems.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-merchant-nav-active text-merchant-primary'
                  : 'text-merchant-muted hover:bg-merchant-icon-tile hover:text-merchant-ink'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-r-full bg-merchant-primary"
                    aria-hidden
                  />
                )}
                <Icon size={18} strokeWidth={1.75} className="shrink-0" />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="mt-6 flex flex-col gap-2 border-t border-merchant-divider pt-6">
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#3837e6]"
        >
          <Headphones size={16} strokeWidth={1.75} aria-hidden />
          Quick Support
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-sign-out px-4 py-3 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-nav-active"
        >
          <LogOut size={16} strokeWidth={1.75} aria-hidden />
          Sign Out
        </button>
      </div>
    </>
  )

  return (
    <>
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/30 lg:hidden"
          onClick={onClose}
          aria-label="Close menu overlay"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 hidden w-[260px] flex-col border-r border-merchant-divider bg-merchant-surface px-4 py-6 transition-transform duration-200 lg:static lg:z-auto lg:flex lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
