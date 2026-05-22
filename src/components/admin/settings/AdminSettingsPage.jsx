import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  CreditCard,
  KeyRound,
  Mail,
  Map,
  Percent,
  SlidersHorizontal,
  ToggleLeft,
  UserRound,
} from 'lucide-react'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import { ADMIN_SETTINGS } from '../../../services/data/adminSettings.mock'
import { ADMIN_SETTINGS_PATH } from '../../../services/data/adminPaths'

const icons = {
  sliders: SlidersHorizontal,
  mail: Mail,
  card: CreditCard,
  bell: Bell,
  toggle: ToggleLeft,
  map: Map,
  percent: Percent,
  users: UserRound,
  key: KeyRound,
}

function isSettingsItemActive(item, pathname) {
  return pathname === item.path || pathname.startsWith(`${item.path}/`)
}

export default function AdminSettingsPage() {
  const data = ADMIN_SETTINGS
  const { pathname } = useLocation()

  return (
    <div className="p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{data.subtitle}</p>
        </div>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        {data.sections.map((section, sectionIndex) => (
          <div key={section.id}>
            {sectionIndex > 0 ? <div className="border-t border-gray-100" aria-hidden /> : null}
            <p className="px-5 pb-2 pt-5 text-[10px] font-bold uppercase tracking-widest text-rapid-orange">
              {section.label}
            </p>
            <ul>
              {section.items.map((item) => {
                const Icon = icons[item.icon] ?? SlidersHorizontal
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={() =>
                        `flex items-center gap-3 px-5 py-4 transition-colors ${
                          isSettingsItemActive(item, pathname)
                            ? 'bg-gray-50 text-gray-900'
                            : 'text-gray-700 hover:bg-gray-50/80'
                        }`
                      }
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.75}
                        className="shrink-0 text-gray-500"
                        aria-hidden
                      />
                      <span className="flex-1 text-sm font-semibold">{item.label}</span>
                      <ChevronRight size={18} className="shrink-0 text-gray-300" aria-hidden />
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </article>
    </div>
  )
}
