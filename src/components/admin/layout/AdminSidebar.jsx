import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import Logo from '../../brand/Logo'
import { ADMIN_NAV_ITEMS } from '../../../services/data/adminNav.mock'
import { ADMIN_LOGIN_PATH } from '../../../services/data/adminAuth.mock'
import { clearAdminSession } from '../../../services/adminAuthService'

export default function AdminSidebar({ sidebar }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    clearAdminSession()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  return (
    <aside className="flex w-60 shrink-0 flex-col border-r border-gray-200 bg-white xl:w-64">
      <div className="border-b border-gray-100 px-5 py-5">
        <Logo height={26} className="h-[26px] w-auto" />
        <p className="mt-1 text-xs font-semibold text-rapid-orange">{sidebar.brandLabel}</p>
      </div>

      <nav className="flex flex-1 flex-col gap-0.5 overflow-y-auto px-3 py-4">
        {ADMIN_NAV_ITEMS.map(({ to, icon: Icon, label, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-50 text-rapid-orange'
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {isActive ? (
                  <span
                    className="absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-rapid-orange"
                    aria-hidden
                  />
                ) : null}
                <Icon size={18} strokeWidth={1.75} />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-gray-100 p-4">
        <div className="mb-3 flex items-center gap-3 px-1">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-rapid-orange">
            {sidebar.user.initials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-gray-900">{sidebar.user.name}</p>
            <p className="truncate text-xs text-gray-500">{sidebar.user.role}</p>
          </div>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-medium text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={16} strokeWidth={2} />
          {sidebar.logoutLabel}
        </button>
      </div>
    </aside>
  )
}
