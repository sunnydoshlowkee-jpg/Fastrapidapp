import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

export default function AdminTopHeader({ searchPlaceholder, centerTitle }) {
  return (
    <header className="sticky top-0 z-10 flex items-center gap-4 border-b border-gray-200 bg-[#F5F6F8]/95 px-6 py-4 backdrop-blur-sm">
      <div
        className={`relative w-full max-w-xl ${centerTitle ? 'flex-1' : 'mx-auto flex-1'}`}
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
        className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
        aria-label="Notifications"
      >
        <Bell size={18} strokeWidth={1.75} />
        <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
      </Link>
    </header>
  )
}
