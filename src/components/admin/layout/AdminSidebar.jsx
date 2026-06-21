import { NavLink, useNavigate } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'
import Logo from '../../brand/Logo'
import { ADMIN_NAV_SECTIONS, buildAdminNavSections } from '../../../services/data/adminNav.mock'
import { ADMIN_LOGIN_PATH } from '../../../services/data/adminAuth.mock'
import { clearAdminSession } from '../../../services/adminAuthService'

function NavBadge({ count, tone }) {
  if (count === undefined || count === null) return null
  const toneClass =
    tone === 'amber' ? 'bg-amber-400 text-white' : 'bg-red-500 text-white'
  return (
    <span
      className={`ml-auto inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${toneClass}`}
    >
      {count}
    </span>
  )
}

export default function AdminSidebar({ sidebar, navCounts, variant = 'static', onClose }) {
  const navigate = useNavigate()
  const isDrawer = variant === 'drawer'
  const navSections = buildAdminNavSections(navCounts)

  const handleLogout = () => {
    clearAdminSession()
    navigate(ADMIN_LOGIN_PATH, { replace: true })
  }

  return (
    <aside
      className={`flex w-60 shrink-0 flex-col xl:w-64 ${
        isDrawer
          ? 'h-full bg-gray-50 shadow-2xl'
          : 'border-r border-gray-200 bg-white'
      }`}
    >
      <div
        className={`flex items-center justify-between gap-3 px-5 py-5 ${
          isDrawer ? 'bg-white' : 'border-b border-gray-100'
        }`}
      >
        {isDrawer ? (
          <div className="flex min-w-0 items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-rapid-orange">
              {sidebar.user.initials}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <p className="truncate text-sm font-bold text-gray-900">
                  {sidebar.user.name}
                </p>
                {sidebar.user.showRolePill ? (
                  <span className="inline-flex shrink-0 rounded-md bg-amber-900 px-2 py-0.5 text-[10px] font-bold text-white">
                    {sidebar.user.role}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ) : (
          <div>
            <Logo height={26} className="h-[26px] w-auto" />
            <p className="mt-1 text-xs font-semibold text-rapid-orange">
              {sidebar.brandLabel}
            </p>
          </div>
        )}
        {isDrawer ? (
          <button
            type="button"
            aria-label={sidebar.closeLabel}
            onClick={onClose}
            className="rounded-md p-1 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
          >
            <X size={18} strokeWidth={2} />
          </button>
        ) : null}
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-4">
        {navSections.map((section) => (
          <div key={section.id} className="mb-2">
            <p className="px-3 pb-1 pt-3 text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {section.label}
            </p>
            <div className="flex flex-col gap-0.5">
              {section.items.map(({ to, icon: Icon, label, end, count, countTone }) => (
                <NavLink
                  key={to}
                  to={to}
                  end={end}
                  onClick={isDrawer ? onClose : undefined}
                  className={({ isActive }) =>
                    `relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                      isActive
                        ? isDrawer
                          ? 'bg-white text-rapid-orange shadow-sm ring-1 ring-gray-100'
                          : 'bg-orange-50 text-rapid-orange'
                        : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {isActive ? (
                        <span
                          className={
                            isDrawer
                              ? 'absolute left-0 top-1/2 h-7 w-1 -translate-y-1/2 rounded-r-full bg-rapid-orange'
                              : 'absolute right-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-l-full bg-rapid-orange'
                          }
                          aria-hidden
                        />
                      ) : null}
                      <Icon size={18} strokeWidth={1.75} />
                      <span className="flex-1 truncate">{label}</span>
                      <NavBadge count={count} tone={countTone} />
                    </>
                  )}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div
        className={`border-t border-gray-100 ${
          isDrawer ? 'bg-white' : ''
        } p-4`}
      >
        {!isDrawer ? (
          <div className="mb-3 flex items-center gap-3 px-1">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-orange-100 text-xs font-bold text-rapid-orange">
              {sidebar.user.initials}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold text-gray-900">
                {sidebar.user.name}
              </p>
              <p className="truncate text-xs text-gray-500">{sidebar.user.role}</p>
            </div>
          </div>
        ) : null}
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-bold text-red-600 transition-colors hover:bg-red-50"
        >
          <LogOut size={16} strokeWidth={2} />
          {sidebar.logoutLabel}
        </button>
        {isDrawer && sidebar.versionLabel ? (
          <p className="mt-3 text-center text-[10px] font-medium text-gray-400">
            {sidebar.versionLabel}
          </p>
        ) : null}
      </div>
    </aside>
  )
}
