import { NavLink, useNavigate } from 'react-router-dom'
import {
  BarChart2,
  ClipboardList,
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
  { to: '/merchant/menu', icon: Package, label: 'Inventory', matchPrefix: true },
  { to: '/merchant/analytics', icon: BarChart2, label: 'Analytics' },
  { to: '/merchant/settings', icon: Settings, label: 'Settings', matchPrefix: true },
]

export default function MerchantSidebar({ mobileOpen, onClose }) {
  const navigate = useNavigate()

  const handleSignOut = () => {
    clearMerchantSession()
    navigate('/merchant/login', { replace: true })
  }

  const sidebarContent = (
    <>
      <div className="flex items-start justify-between gap-3 px-6">
        <div>
          <p className="text-xl font-bold leading-7 tracking-[-0.5px] text-merchant-ink-slate">
            Rapid Merchant
          </p>
          <p className="mt-1 text-[10px] font-bold uppercase tracking-[1px] text-merchant-nav-muted">
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
        {navItems.map(({ to, icon: Icon, label, end, matchPrefix }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `relative flex items-center gap-3 px-6 py-4 text-sm transition-colors ${
                isActive
                  ? 'bg-merchant-nav-active font-medium text-merchant-primary'
                  : 'font-normal text-merchant-nav-muted hover:bg-merchant-nav-active hover:text-merchant-ink-slate'
              }`
            }
            {...(matchPrefix
              ? { isActive: (_, location) => location.pathname.startsWith(to) }
              : {})}
          >
            {({ isActive }) => (
              <>
                {isActive && (
                  <span
                    className="absolute bottom-0 left-0 top-0 w-1 bg-merchant-primary"
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

      <div className="mx-4 mt-6 flex flex-col gap-2 border-t border-merchant-input pt-4">
        <button
          type="button"
          onClick={() => {
            navigate('/merchant/support')
            onClose?.()
          }}
          className="flex w-full items-center justify-center rounded-lg bg-merchant-primary px-4 py-3 text-sm font-bold text-white transition-colors hover:bg-merchant-primary-dark"
        >
          Quick Support
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="flex w-full items-center justify-center gap-3 rounded-lg bg-merchant-sign-out px-4 py-3 text-sm font-semibold text-merchant-ink transition-colors hover:opacity-90"
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
        className={`fixed inset-y-0 left-0 z-50 hidden w-60 flex-col bg-merchant-surface px-0 py-6 transition-transform duration-200 lg:static lg:z-auto lg:flex lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {sidebarContent}
      </aside>
    </>
  )
}
