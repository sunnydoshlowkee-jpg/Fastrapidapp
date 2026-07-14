import { Link, useLocation } from 'react-router-dom'
import {
  BarChart3,
  Bell,
  ChevronRight,
  Coffee,
  History,
  MapPin,
  Menu,
  Monitor,
  Search,
  ShoppingBag,
  ShoppingCart,
  Store,
  UsersRound,
  Utensils,
  Zap,
} from 'lucide-react'
import { ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

const statusStyles = {
  active: { pillBg: 'bg-[#E1E0FF]', pillText: 'text-[#1E0CE6]' },
  pending: { pillBg: 'bg-[#FFDDB8]', pillText: 'text-[#653E00]' },
  suspended: { pillBg: 'bg-[#E7E8E9]', pillText: 'text-[#454557]' },
  rejected: { pillBg: 'bg-[#FFDAD7]', pillText: 'text-[#930013]' },
}

const categoryIcons = {
  utensils: Utensils,
  monitor: Monitor,
  'shopping-cart': ShoppingCart,
  coffee: Coffee,
}

const logoIcons = {
  'shopping-bag': ShoppingBag,
  store: Store,
}

const navIcons = {
  'bar-chart': BarChart3,
  'users-search': UsersRound,
  store: Store,
}

const actionStyles = {
  view: 'text-[#2419E9] hover:text-[#1709C1]',
  review: 'text-[#2419E9] hover:text-[#1709C1]',
  log: 'text-[#767588] hover:text-[#454557]',
}

function MerchantLogo({ merchant }) {
  if (merchant.logoKind === 'icon') {
    const Icon = logoIcons[merchant.logoIcon] ?? ShoppingBag
    return (
      <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded bg-[#E7E8E9] text-[#767588]">
        <Icon size={26} strokeWidth={1.5} aria-hidden />
      </div>
    )
  }
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded text-[11px] font-bold uppercase tracking-[0.15em]"
      style={{
        backgroundImage: merchant.logoBg,
        color: merchant.logoTextColor ?? '#FFFFFF',
      }}
    >
      {merchant.logoText}
    </div>
  )
}

function MerchantCard({ merchant, totalOrdersLabel }) {
  const styles = statusStyles[merchant.status] ?? statusStyles.active
  const CategoryIcon = categoryIcons[merchant.categoryIcon] ?? Utensils
  const isDimmed = Boolean(merchant.dimmed)
  const isStrike = Boolean(merchant.strikethrough)
  const actionToneClass = actionStyles[merchant.actionType] ?? actionStyles.view

  return (
    <article
      className={`flex gap-4 bg-white p-4 shadow-[0px_4px_24px_rgba(0,0,0,0.02)] ${
        isDimmed ? 'opacity-75' : ''
      }`}
    >
      <MerchantLogo merchant={merchant} />

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-start justify-between gap-3">
          <h2
            className={`min-w-0 truncate pr-2 text-base font-bold leading-6 ${
              isStrike
                ? 'text-[#454557] line-through'
                : 'text-[#191C1D]'
            }`}
          >
            {merchant.name}
          </h2>
          <span
            className={`inline-flex shrink-0 items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.05em] ${styles.pillBg} ${styles.pillText}`}
          >
            {merchant.statusLabel}
            {merchant.statusIcon === 'zap' ? (
              <Zap size={10} strokeWidth={2.5} className="fill-current" aria-hidden />
            ) : null}
          </span>
        </div>

        <div className="flex items-center gap-1 pb-2 text-xs text-[#454557]">
          <CategoryIcon size={12} strokeWidth={1.75} aria-hidden className="text-[#454557]" />
          <span>{merchant.category}</span>
          <span className="px-1" aria-hidden>
            •
          </span>
          <MapPin size={11} strokeWidth={1.75} aria-hidden className="text-[#454557]" />
          <span>{merchant.location}</span>
        </div>

        <div className="flex items-end justify-between gap-3 border-t border-[#C6C4DA]/15 pt-2">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.05em] text-[#767588]">
              {totalOrdersLabel}
            </p>
            <p
              className={`text-sm font-bold ${
                isStrike ? 'text-[#454557]' : 'text-[#191C1D]'
              }`}
            >
              {merchant.orders}
            </p>
          </div>

          <Link
            to={`${ADMIN_MERCHANTS_PATH}/${merchant.id}`}
            className={`inline-flex items-center gap-1 text-sm font-semibold ${actionToneClass}`}
          >
            {merchant.actionType === 'log' ? (
              <>
                <span>{merchant.actionLabel}</span>
                <History size={12} strokeWidth={2} aria-hidden />
              </>
            ) : (
              <>
                <span>{merchant.actionLabel}</span>
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden />
              </>
            )}
          </Link>
        </div>
      </div>
    </article>
  )
}

function BottomNav({ items }) {
  const { pathname } = useLocation()
  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-around gap-3 rounded-t-lg border-t-2 border-[#F1F5F9] bg-white/90 px-6 py-2.5 shadow-[0px_-4px_12px_rgba(0,0,0,0.05)] backdrop-blur-sm lg:hidden"
      aria-label="Primary"
    >
      {items.map((item) => {
        const Icon = navIcons[item.icon] ?? BarChart3
        const isActive =
          item.active === true ||
          pathname === item.path ||
          pathname.startsWith(`${item.path}/`)
        return (
          <Link
            key={item.id}
            to={item.path}
            className={`flex flex-1 items-center justify-center gap-1 rounded-lg py-1.5 ${
              isActive
                ? 'bg-[#FFF7ED] text-[#EA580C]'
                : 'text-[#94A3B8] hover:text-[#64748B]'
            }`}
          >
            <span className="flex flex-col items-center gap-0.5">
              <Icon
                size={18}
                strokeWidth={1.75}
                aria-hidden
                className={isActive ? 'text-[#EA580C]' : 'text-[#94A3B8]'}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.1em]">
                {item.label}
              </span>
            </span>
          </Link>
        )
      })}
    </nav>
  )
}

export default function AdminMerchantsMobilePage({
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
  const merchants = mobile?.merchants ?? []

  if (!mobile) return null

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#F8F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b-2 border-[#E2E8F0] bg-[#F8FAFC] px-4 py-4">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation"
          className="flex h-9 w-9 items-center justify-center rounded-xl text-[#0F172A] transition-colors hover:bg-white"
        >
          <Menu size={18} strokeWidth={2} />
        </button>
        <h1 className="text-xl font-extrabold tracking-[-0.05em] text-[#0F172A]">
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

      <div className="sticky top-[64px] z-10 border-b border-[#C6C4DA]/15 bg-[#F3F4F5] px-4 py-4">
        <div className="flex items-center gap-2 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {mobile.filters.map((filter) => {
            const isActive = activeFilter === filter.id
            const isAllChip = filter.id === 'all'

            let chipClass
            if (isActive) {
              chipClass = isAllChip
                ? 'bg-[#F97316] font-semibold text-white'
                : 'border border-[#C6C4DA]/30 bg-[#F97316] font-medium text-[#454557]'
            } else {
              chipClass = isAllChip
                ? 'bg-white font-semibold text-[#1A1C1D] hover:bg-gray-50'
                : 'border border-[#C6C4DA]/30 bg-white font-medium text-[#454557] hover:bg-gray-50'
            }

            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => onFilterChange?.(filter.id)}
                className={`inline-flex shrink-0 items-center gap-1.5 rounded-xl px-4 py-1.5 text-sm transition-colors ${chipClass}`}
              >
                {filter.label}
                {filter.badge ? (
                  <span className="inline-flex h-[18px] min-w-[20px] items-center justify-center rounded-full bg-[#9D4300] px-1.5 text-[10px] font-bold text-white">
                    {filter.badge}
                  </span>
                ) : null}
              </button>
            )
          })}
        </div>
      </div>

      <div className="bg-[#F8F9FA] px-3 pb-1 pt-2">
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
      </div>

      <div className="flex-1 overflow-y-auto px-4 pb-[120px] pt-4">
        {error ? (
          <p
            role="alert"
            className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        {loading ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
            Loading merchants…
          </p>
        ) : merchants.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
            No merchants match this filter.
          </p>
        ) : (
          <div className="space-y-4">
            {merchants.map((merchant) => (
              <MerchantCard
                key={merchant.id}
                merchant={merchant}
                totalOrdersLabel={mobile.totalOrdersLabel}
              />
            ))}
          </div>
        )}
      </div>

      <BottomNav items={mobile.bottomNav} />
    </div>
  )
}
