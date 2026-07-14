import { NavLink, useLocation } from 'react-router-dom'
import {
  Bell,
  BriefcaseBusiness,
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
import { ADMIN_SETTINGS } from '../../../services/data/adminSettings.mock'

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
  briefcase: BriefcaseBusiness,
}

const ICON_TONE = {
  default: 'text-[#9D4300]',
  violet: 'text-[#842BD2]',
}

const ACCENT_DOT = {
  violet: 'bg-[#842BD2]',
}

function isSettingsItemActive(item, pathname) {
  return pathname === item.path || pathname.startsWith(`${item.path}/`)
}

export default function AdminSettingsPage() {
  const data = ADMIN_SETTINGS
  const { pathname } = useLocation()

  return (
    <div className="space-y-8 px-5 py-6 lg:p-6">
      {data.sections.map((section) => (
        <section key={section.id} className="space-y-3">
          <h2 className="px-2 text-sm font-bold uppercase tracking-[0.05em] text-[#9D4300]">
            {section.label}
          </h2>
          <div className="overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
            <ul className="divide-y divide-gray-100">
              {section.items.map((item) => {
                const Icon = icons[item.icon] ?? SlidersHorizontal
                const isActive = isSettingsItemActive(item, pathname)
                const iconTone = ICON_TONE[item.iconTone] ?? ICON_TONE.default
                return (
                  <li key={item.id}>
                    <NavLink
                      to={item.path}
                      className={`flex items-center gap-4 p-4 transition-colors ${
                        isActive
                          ? 'bg-gray-50/80'
                          : 'hover:bg-gray-50/80'
                      }`}
                    >
                      <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9F9FA]">
                        <Icon
                          size={18}
                          strokeWidth={2}
                          className={iconTone}
                          aria-hidden
                        />
                        {item.accentDot ? (
                          <span
                            className={`absolute right-1 top-1 h-2 w-2 rounded-full ring-2 ring-[#F9F9FA] ${
                              ACCENT_DOT[item.accentDot] ?? ACCENT_DOT.violet
                            }`}
                            aria-hidden
                          />
                        ) : null}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-base font-bold text-gray-900">
                          {item.label}
                        </p>
                        {item.description ? (
                          <p className="mt-0.5 text-sm leading-snug text-[#584237]">
                            {item.description}
                          </p>
                        ) : null}
                      </div>
                      <ChevronRight
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-[#E0C0B1]"
                        aria-hidden
                      />
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>
      ))}
    </div>
  )
}
