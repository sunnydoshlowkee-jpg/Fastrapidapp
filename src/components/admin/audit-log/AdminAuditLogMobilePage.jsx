import { useMemo, useState } from 'react'
import {
  Ban,
  Bell,
  Calendar,
  CheckCircle2,
  ClipboardList,
  ClipboardX,
  Menu,
  Pencil,
  Search,
  Store,
  Wallet,
} from 'lucide-react'

const avatarToneStyles = {
  rose: 'bg-rose-100 text-rose-700',
  blue: 'bg-blue-100 text-blue-700',
  amber: 'bg-amber-100 text-amber-700',
  emerald: 'bg-emerald-100 text-emerald-700',
}

const badgeIcons = {
  ban: Ban,
  clipboardX: ClipboardX,
  clipboard: ClipboardList,
  pencil: Pencil,
  check: CheckCircle2,
  store: Store,
  wallet: Wallet,
}

const systemIcons = {
  clipboard: ClipboardList,
  store: Store,
  wallet: Wallet,
}

const entityToneStyles = {
  red: 'text-[#B61722]',
  orange: 'text-[#9D4300]',
  indigo: 'text-[#2419E9]',
  default: 'text-[#191C1D]',
}

function ActorAvatar({ actor }) {
  if (actor.isSystem) {
    const Icon = systemIcons[actor.systemIcon] ?? ClipboardList
    return (
      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#E7E8E9] text-[#767588]">
        <Icon size={20} strokeWidth={1.75} aria-hidden />
      </span>
    )
  }
  const tone = avatarToneStyles[actor.avatarTone] ?? avatarToneStyles.blue
  return (
    <span
      className={`flex h-10 w-10 items-center justify-center rounded-xl text-sm font-bold ${tone}`}
    >
      {actor.initials}
    </span>
  )
}

function ActorBadge({ icon, color }) {
  const Icon = badgeIcons[icon] ?? CheckCircle2
  return (
    <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-white p-0.5 shadow-sm">
      <Icon size={11} strokeWidth={2.25} style={{ color }} aria-hidden />
    </span>
  )
}

function AuditLogCard({ entry }) {
  const { actor, message, description, time } = entry
  const accentOpacity = entry.accentOpacity ?? 1
  const parts = (message.template ?? '').split('{entity}')
  const beforeEntity = parts[0]?.replace('{actor}', actor.name) ?? ''
  const afterEntity = parts[1] ?? ''

  return (
    <article
      className="relative flex items-start gap-4 overflow-hidden rounded-lg bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
    >
      <span
        className="absolute inset-y-0 left-0 w-1 rounded-l-lg"
        style={{
          backgroundColor: entry.accentColor,
          opacity: accentOpacity,
        }}
        aria-hidden
      />

      <div className="relative ml-1 shrink-0">
        <ActorAvatar actor={actor} />
        <ActorBadge icon={entry.badgeIcon} color={entry.badgeColor} />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <p className="min-w-0 flex-1 text-sm font-semibold leading-5 text-[#191C1D]">
            {beforeEntity}
            <span
              className={`font-semibold ${
                entityToneStyles[message.entityTone] ?? entityToneStyles.default
              }`}
            >
              {message.entity}
            </span>
            {afterEntity}
          </p>
          <span className="shrink-0 text-xs text-[#454557]">{time}</span>
        </div>
        <p className="mt-1 text-xs leading-4 text-[#454557]">{description}</p>
      </div>
    </article>
  )
}

function DateInput({ value, onChange, placeholder }) {
  return (
    <label className="relative flex flex-1 items-center">
      <Calendar
        size={15}
        strokeWidth={2}
        className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#584237]"
        aria-hidden
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-lg bg-white py-2.5 pl-10 pr-3 text-sm text-[#1A1C1D] shadow-[0px_2px_8px_rgba(26,28,29,0.02)] outline-none placeholder:text-[#1A1C1D]/80 focus:ring-2 focus:ring-rapid-orange/20"
      />
    </label>
  )
}

export default function AdminAuditLogMobilePage({ data, onOpenDrawer }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [query, setQuery] = useState('')
  const [dateFrom, setDateFrom] = useState('')
  const [dateTo, setDateTo] = useState('')
  const [visibleCount, setVisibleCount] = useState(0)

  const groups = data.mobileGroups ?? []

  const filteredGroups = useMemo(() => {
    const trimmed = query.trim().toLowerCase()
    return groups
      .map((group) => ({
        ...group,
        entries: group.entries.filter((entry) => {
          if (activeFilter !== 'all' && entry.category !== activeFilter) {
            return false
          }
          if (trimmed) {
            const haystack = [
              entry.actor?.name,
              entry.message?.entity,
              entry.description,
            ]
              .filter(Boolean)
              .join(' ')
              .toLowerCase()
            return haystack.includes(trimmed)
          }
          return true
        }),
      }))
      .filter((group) => group.entries.length > 0)
  }, [activeFilter, groups, query])

  const totalEntries = filteredGroups.reduce(
    (sum, group) => sum + group.entries.length,
    0,
  )
  const canLoadMore = visibleCount > 0 && visibleCount < totalEntries

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-[#F8F9FA] pb-12">
      <header className="flex items-center gap-4 bg-[#F8FAFC] px-4 py-3">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[#E2E8F0]"
        >
          <Menu size={18} strokeWidth={2.25} className="text-[#64748B]" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold tracking-[-0.025em] text-[#4F46E5]">
          {data.mobileTitle ?? 'Admin Audit Log'}
        </h1>
        <button
          type="button"
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[#E2E8F0]"
        >
          <Bell size={18} strokeWidth={1.75} className="text-[#454557]" />
        </button>
      </header>

      <div className="sticky top-0 z-10 border-b border-[#E7E8E9]/50 bg-[#F8F9FA]/80 px-4 py-3 backdrop-blur-md">
        <nav
          className="-mx-4 flex gap-3 overflow-x-auto px-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Audit log filters"
        >
          {(data.mobileFilters ?? []).map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-xl px-4 py-1.5 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#2419E9] text-white'
                    : 'bg-[#F3F4F5] text-[#454557] hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </nav>
      </div>

      <section className="mx-4 mt-4 space-y-4 rounded-xl bg-[#F3F3F4] p-4">
        <label className="relative block">
          <Search
            size={16}
            strokeWidth={2}
            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#584237]"
            aria-hidden
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              data.mobileSearchPlaceholder ??
              'Search by admin, action, or entity...'
            }
            className="w-full rounded-lg bg-white py-2.5 pl-10 pr-3 text-sm text-[#1A1C1D] shadow-[0px_2px_8px_rgba(26,28,29,0.02)] outline-none placeholder:text-[#6B7280] focus:ring-2 focus:ring-rapid-orange/20"
          />
        </label>

        <div className="flex items-center gap-3">
          <DateInput
            value={dateFrom}
            onChange={setDateFrom}
            placeholder={data.mobileDateFromPlaceholder ?? 'mm/dd/yyyy'}
          />
          <span className="text-sm font-medium text-[#584237]">to</span>
          <DateInput
            value={dateTo}
            onChange={setDateTo}
            placeholder={data.mobileDateToPlaceholder ?? 'mm/dd/yyyy'}
          />
        </div>
      </section>

      <div className="space-y-4 px-4 pt-4">
        {filteredGroups.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557] shadow-sm">
            No audit records match these filters.
          </p>
        ) : (
          filteredGroups.map((group) => (
            <section key={group.id} className="space-y-3">
              <h2 className="px-1 pt-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#767588]">
                {group.label}
              </h2>
              {group.entries.map((entry) => (
                <AuditLogCard key={entry.id} entry={entry} />
              ))}
            </section>
          ))
        )}
      </div>

      <div className="mt-6 flex justify-center" aria-hidden>
        <span className="block h-1 w-12 rounded-xl bg-[#E1E3E4]" />
      </div>

      <div className="mt-8 flex justify-center pb-4">
        <button
          type="button"
          onClick={() => setVisibleCount((c) => c + 5)}
          disabled={!canLoadMore && visibleCount > 0}
          className="rounded-md bg-[#E8E8E9] px-6 py-2 text-xs font-semibold uppercase tracking-[0.05em] text-[#1A1C1D] transition-colors hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {data.mobileLoadMoreLabel ?? 'Load More Logs'}
        </button>
      </div>
    </div>
  )
}
