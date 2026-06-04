import { Link } from 'react-router-dom'
import {
  Bell,
  Loader2,
  Menu,
  Phone,
  Search,
  SlidersHorizontal,
  User,
} from 'lucide-react'
import { ADMIN_USERS_PATH } from '../../../services/data/adminUsers.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

const statusStyles = {
  active: {
    pillBg: 'bg-[#E1E0FF]',
    pillText: 'text-[#1E0CE6]',
    accent: 'bg-[#E1E0FF]',
  },
  inactive: {
    pillBg: 'bg-[#E7E8E9]',
    pillText: 'text-[#454557]',
    accent: 'bg-[#E7E8E9]',
  },
  suspended: {
    pillBg: 'bg-[#FFDDB8]',
    pillText: 'text-[#653E00]',
    accent: 'bg-[#FFDDB8]',
  },
  banned: {
    pillBg: 'bg-[#FFDAD7]',
    pillText: 'text-[#930013]',
    accent: 'bg-[#FFDAD7]',
  },
}

function Avatar({ user }) {
  if (user.avatarKind === 'photo') {
    return (
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-white"
        style={{
          backgroundImage: user.avatarBg,
          backgroundColor: '#E7E8E9',
        }}
      >
        <User size={22} strokeWidth={1.5} aria-hidden />
        <span className="sr-only">{user.initials}</span>
      </div>
    )
  }
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-lg font-bold"
      style={{
        backgroundColor: user.avatarBg ?? '#E7E8E9',
        color: user.avatarText ?? '#454557',
      }}
    >
      {user.initials}
    </div>
  )
}

function UserCard({ user }) {
  const styles = statusStyles[user.status] ?? statusStyles.inactive
  const isDimmed = Boolean(user.dimmed)

  return (
    <Link
      to={`${ADMIN_USERS_PATH}/${user.id}`}
      className="relative block overflow-hidden rounded-lg border border-[#C6C4DA]/10 bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.02)] transition-shadow hover:shadow-md"
    >
      <span
        className={`absolute inset-y-px left-px w-1 ${styles.accent}`}
        aria-hidden
      />

      <div className="flex items-center justify-between gap-3 p-4 pl-6">
        <div className="flex min-w-0 flex-1 items-center gap-4">
          <Avatar user={user} />

          <div className={`min-w-0 ${isDimmed ? 'opacity-75' : ''}`}>
            <p className="truncate text-sm font-bold tracking-[-0.025em] text-[#191C1D]">
              {user.name}
            </p>
            <div className="mt-0.5 flex items-center gap-2 text-xs text-[#454557]">
              <Phone size={11} strokeWidth={1.75} aria-hidden />
              <span className="truncate">{user.phone}</span>
            </div>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center rounded-md px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${styles.pillBg} ${styles.pillText} ${isDimmed ? 'opacity-75' : ''}`}
        >
          {user.statusLabel}
        </span>
      </div>
    </Link>
  )
}

export default function AdminUsersMobilePage({
  data,
  onOpenDrawer,
  loading = false,
  error = '',
  activeFilter = 'all',
  search = '',
  onFilterChange,
  onSearchChange,
}) {
  const mobile = data.mobile
  const users = mobile?.users ?? []

  if (!mobile) return null

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col bg-[#F8F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#64748B] transition-colors hover:bg-white"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <h1 className="text-xl font-extrabold tracking-[-0.01em] text-[#0F172A]">
          {mobile.pageTitle}
        </h1>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-xl text-[#0F172A] transition-colors hover:bg-white"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-[#B61722] ring-2 ring-[#F8FAFC]" />
        </Link>
      </header>

      <div className="sticky top-[64px] z-10 border-b border-[#C6C4DA]/15 bg-[#F8F9FA] px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobile.filters.map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange?.(filter.id)}
                className={`shrink-0 rounded-xl px-4 py-1.5 text-xs transition-colors ${
                  isActive
                    ? 'border border-[#FED7AA] bg-[#F97316] font-bold text-white'
                    : 'bg-[#F3F4F5] font-semibold text-[#454557] hover:bg-gray-200'
                }`}
                style={{ letterSpacing: '-0.025em' }}
              >
                {filter.label}
              </button>
            )
          })}
          <button
            type="button"
            aria-label="More filters"
            className="ml-1 flex shrink-0 items-center justify-center rounded-xl bg-[#F3F4F5] px-3 py-1.5 text-[#454557] hover:bg-gray-200"
          >
            <SlidersHorizontal size={13} strokeWidth={2} aria-hidden />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-24 pt-4">
        <label className="relative block">
          <span className="sr-only">{mobile.searchPlaceholder}</span>
          <Search
            size={18}
            strokeWidth={1.75}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#767588]"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder={mobile.searchPlaceholder}
            className="w-full rounded bg-white py-3 pl-10 pr-4 text-sm text-[#191C1D] shadow-[0px_4px_12px_rgba(0,0,0,0.02)] outline-none placeholder:text-[#767588] focus:ring-2 focus:ring-rapid-orange/15"
          />
        </label>

        {error ? (
          <p
            role="alert"
            className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <div className="mt-6 space-y-4">
          {loading ? (
            <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
              Loading users…
            </p>
          ) : users.length === 0 ? (
            <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
              No users match this filter.
            </p>
          ) : (
            users.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>

        {users.length > 0 && !loading ? (
          <div className="mt-2 flex justify-center pt-4">
            <Loader2
              size={16}
              strokeWidth={2}
              className="animate-spin text-[#767588]"
              aria-hidden
            />
            <span className="sr-only">Loading more users…</span>
          </div>
        ) : null}
      </div>
    </div>
  )
}
