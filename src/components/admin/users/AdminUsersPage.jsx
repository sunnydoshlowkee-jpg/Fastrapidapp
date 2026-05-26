import { useMemo, useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import {
  Bell,
  ChevronLeft,
  ChevronRight,
  Download,
  LayoutGrid,
  MoreVertical,
  Search,
  Settings,
} from 'lucide-react'
import { ADMIN_USERS, ADMIN_USERS_PATH } from '../../../services/data/adminUsers.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminUsersMobilePage from './AdminUsersMobilePage'
import AdminUserStatusBadge from './AdminUserStatusBadge'

const TAB_FILTERS = {
  all: () => true,
  active: (u) => u.status === 'active',
  inactive: (u) => u.status === 'inactive',
  suspended: (u) => u.status === 'suspended',
  banned: (u) => u.status === 'banned',
}

export default function AdminUsersPage() {
  const data = ADMIN_USERS
  const outletCtx = useOutletContext() ?? {}
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const tabFilter = TAB_FILTERS[activeTab] ?? TAB_FILTERS.all
    const q = search.trim().toLowerCase()
    return data.users.filter((u) => {
      if (!tabFilter(u)) return false
      if (!q) return true
      return (
        u.name.toLowerCase().includes(q) ||
        u.id.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q) ||
        u.phone.toLowerCase().includes(q)
      )
    })
  }, [activeTab, data.users, search])

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminUsersMobilePage
          data={data}
          onOpenDrawer={outletCtx.openDrawer}
        />
      </div>

      <div className="hidden h-full min-h-0 flex-1 flex-col lg:flex">
      <header className="flex shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <h1 className="text-base font-bold text-gray-900">{data.headerLabel}</h1>

        <div className="relative mx-auto w-full max-w-md">
          <Search
            size={16}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={data.searchPlaceholder}
            className="w-full rounded-lg bg-gray-100 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:bg-white focus:ring-2 focus:ring-rapid-orange/30"
          />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <Link
            to={ADMIN_NOTIFICATIONS_PATH}
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
            aria-label="Notifications"
          >
            <Bell size={18} strokeWidth={1.75} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
          </Link>
          <button
            type="button"
            aria-label="Apps"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-gray-200 text-gray-500 transition-colors hover:bg-gray-50"
          >
            <LayoutGrid size={16} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Settings"
            className="flex h-9 w-9 items-center justify-center rounded-full text-gray-600 transition-colors hover:bg-gray-100"
          >
            <Settings size={18} strokeWidth={1.75} />
          </button>
          <button
            type="button"
            aria-label="Account menu"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-900 text-xs font-bold text-white"
          >
            AU
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-200 pb-3">
          <nav
            className="flex flex-wrap gap-7"
            aria-label="User status filters"
          >
            {data.tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`-mb-3 border-b-2 pb-3 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'border-rapid-orange text-rapid-orange'
                      : 'border-transparent text-gray-500 hover:text-gray-800'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wide text-gray-600 transition-colors hover:bg-gray-200"
          >
            <Download size={14} strokeWidth={2} aria-hidden />
            {data.exportLabel}
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[960px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100">
                  {data.columns.map((col) => (
                    <th
                      key={col.id}
                      className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500"
                    >
                      {col.label}
                    </th>
                  ))}
                  <th className="w-12 px-6 py-3" aria-label="Row actions" />
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td
                      colSpan={data.columns.length + 1}
                      className="px-6 py-12 text-center text-sm text-gray-500"
                    >
                      No users match this filter.
                    </td>
                  </tr>
                ) : (
                  filtered.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/40 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`${ADMIN_USERS_PATH}/${user.id}`}
                          className="flex items-center gap-3 transition-opacity hover:opacity-90"
                        >
                          <span
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${user.avatarTone}`}
                          >
                            {user.avatarGlyph}
                          </span>
                          <div>
                            <p className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange">
                              {user.name}
                            </p>
                            <p className="text-xs text-gray-500">{user.id}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{user.email}</p>
                        <p className="text-xs text-gray-500">{user.phone}</p>
                      </td>
                      <td className="px-6 py-4">
                        <AdminUserStatusBadge
                          status={user.status}
                          label={user.statusLabel}
                        />
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {user.orders}
                      </td>
                      <td className="px-6 py-4 text-sm font-bold text-violet-600">
                        {user.wallet}
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                          Joined: {user.joined}
                        </p>
                        <p className="text-xs text-gray-500">
                          Last: {user.last}
                        </p>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreVertical size={18} strokeWidth={2} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <footer className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            {data.pagination.showingPrefix}{' '}
            <span className="font-semibold text-gray-700">
              {data.pagination.showingRange}
            </span>{' '}
            {data.pagination.showingSuffix}
          </p>
          <nav className="flex items-center gap-1.5" aria-label="Pagination">
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-400 transition-colors hover:bg-gray-100 disabled:opacity-40"
              aria-label="Previous page"
              disabled
            >
              <ChevronLeft size={14} strokeWidth={2} />
            </button>
            {data.pagination.pages.map((page, idx) =>
              page === '…' ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="px-1 text-xs text-gray-400"
                >
                  …
                </span>
              ) : (
                <button
                  key={page}
                  type="button"
                  className={`flex h-7 min-w-[1.75rem] items-center justify-center rounded-md px-2 text-xs font-semibold transition-colors ${
                    page === data.pagination.activePage
                      ? 'bg-rapid-orange text-white'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                  aria-current={
                    page === data.pagination.activePage ? 'page' : undefined
                  }
                >
                  {page}
                </button>
              ),
            )}
            <button
              type="button"
              className="flex h-7 w-7 items-center justify-center rounded-md text-gray-500 transition-colors hover:bg-gray-100"
              aria-label="Next page"
            >
              <ChevronRight size={14} strokeWidth={2} />
            </button>
          </nav>
        </footer>
      </div>
      </div>
    </>
  )
}
