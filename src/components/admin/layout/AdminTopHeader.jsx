import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

export default function AdminTopHeader({
  searchPlaceholder,
  centerTitle,
  mobileTitle,
  mobileTitleTone = 'default',
  mobileBellOrange = false,
}) {
  const isOrangeTitle = mobileTitleTone === 'orange'
  const isLeftDarkTitle = mobileTitleTone === 'leftDark'
  const isOrangeCenterTitle = mobileTitleTone === 'orangeCenter'
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 bg-white/80 px-4 py-3 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-md lg:bg-[#F5F6F8]/95 lg:px-6 lg:py-4 lg:shadow-none">
      {mobileTitle ? (
        <h1
          className={`ml-12 flex-1 lg:hidden ${
            isOrangeTitle
              ? 'text-left text-lg font-bold tracking-tight text-[#9D4300]'
              : isLeftDarkTitle
                ? 'text-left text-lg font-bold tracking-tight text-gray-900'
                : isOrangeCenterTitle
                  ? 'text-center text-xl font-extrabold tracking-[-0.05em] text-[#EA580C]'
                  : 'text-center text-lg font-bold tracking-tight text-gray-900'
          }`}
        >
          {mobileTitle}
        </h1>
      ) : (
        <span className="ml-12 flex-1 lg:hidden" aria-hidden />
      )}

      <div
        className={`relative hidden w-full max-w-xl lg:block ${
          centerTitle ? 'flex-1' : 'mx-auto flex-1'
        }`}
      >
        <Search
          size={18}
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          aria-hidden
        />
        <input
          type="search"
          placeholder={searchPlaceholder}
          className="w-full rounded-full border border-gray-200 bg-white py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
        />
      </div>

      {centerTitle ? (
        <h1 className="hidden shrink-0 text-xs font-bold uppercase tracking-[0.2em] text-gray-800 lg:block">
          {centerTitle}
        </h1>
      ) : null}

      <Link
        to={ADMIN_NOTIFICATIONS_PATH}
        className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors hover:bg-gray-100 lg:h-10 lg:w-10 lg:border lg:border-gray-200 lg:bg-white lg:text-gray-600 lg:hover:bg-gray-50 ${
          mobileBellOrange ? 'text-[#F97316]' : 'text-gray-600'
        }`}
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.75} />
        <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white lg:right-2 lg:top-2" />
      </Link>
    </header>
  )
}
