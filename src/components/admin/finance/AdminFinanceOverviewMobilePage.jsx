import { Link } from 'react-router-dom'
import {
  Bell,
  ChevronRight,
  FileText,
  Gavel,
  Hourglass,
  Megaphone,
  TrendingUp,
  User,
  Wallet,
} from 'lucide-react'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'

const quickActionIcons = {
  wallet: Wallet,
  gavel: Gavel,
  fileText: FileText,
}

export default function AdminFinanceOverviewMobilePage({ mobile, onOpenDrawer }) {
  if (!mobile) return null

  const {
    topTitle,
    subtitle,
    pendingAlert,
    grossRevenue,
    netRevenue,
    commission,
    pendingPayouts,
    chart,
    quickActions,
  } = mobile

  const PrimaryIcon = quickActionIcons[quickActions.primary.icon] ?? Wallet

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-y-auto bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-[#F9F9FA]/80 px-5 py-3 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] backdrop-blur-md">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onOpenDrawer}
            aria-label="Open navigation"
            className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-[#E8E8E9] text-[#584237] transition-colors hover:bg-gray-300"
          >
            <User size={16} strokeWidth={1.75} aria-hidden />
          </button>
          <h1 className="text-xl font-bold tracking-[-0.05em] text-[#1A1C1D]">
            {topTitle}
          </h1>
        </div>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          aria-label="Notifications"
          className="flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-gray-100"
        >
          <Bell size={18} strokeWidth={1.75} className="text-[#9D4300]" />
        </Link>
      </header>

      <div className="space-y-6 px-5 pb-12 pt-2">
        <p className="text-sm text-[#584237]">{subtitle}</p>

        {/* Pending alert */}
        <Link
          to={pendingAlert.ctaPath ?? '#'}
          className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] transition-colors hover:bg-gray-50"
        >
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#BE7BFF]">
            <Megaphone
              size={18}
              strokeWidth={2}
              className="text-[#842BD2]"
              aria-hidden
            />
            <span className="absolute right-0 top-0 h-3 w-3 rounded-full bg-[#842BD2] ring-2 ring-white" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold leading-5 text-[#1A1C1D]">
              {pendingAlert.title}
            </p>
            <p className="text-xs text-[#584237]">{pendingAlert.subtitle}</p>
          </div>
          <span className="text-sm font-bold text-[#842BD2]">
            {pendingAlert.ctaLabel}
          </span>
        </Link>

        {/* KPI grid */}
        <section className="space-y-3">
          <article className="relative overflow-hidden rounded-xl bg-white p-5 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
            <p className="text-xs font-bold uppercase tracking-[0.025em] text-[#842BD2]">
              {grossRevenue.eyebrow}
            </p>
            <p className="mt-1 text-[28px] font-extrabold leading-[1.5] tracking-[-0.025em] text-[#1A1C1D]">
              {grossRevenue.amount}
            </p>
            <span className="mt-1 inline-flex items-center gap-1 rounded-full pr-2 text-xs font-medium text-[#1A1C1D]">
              <TrendingUp
                size={12}
                strokeWidth={2}
                className="text-[#1A1C1D]"
                aria-hidden
              />
              {grossRevenue.trendLabel}
            </span>
            <span
              className="pointer-events-none absolute right-4 top-4 text-[#842BD2] opacity-10"
              aria-hidden
            >
              <Wallet size={48} strokeWidth={1.5} />
            </span>
          </article>

          <div className="grid grid-cols-2 gap-3">
            <article className="flex flex-col justify-between rounded-xl bg-[#F3F3F4] p-4">
              <p className="text-xs font-medium tracking-[0.025em] text-[#584237]">
                {netRevenue.label}
              </p>
              <p className="mt-2 text-xl font-bold text-[#1A1C1D]">
                {netRevenue.amount}
              </p>
            </article>
            <article className="flex flex-col justify-between rounded-xl bg-[#F3F3F4] p-4">
              <p className="text-xs font-medium tracking-[0.025em] text-[#584237]">
                {commission.label}
              </p>
              <p className="mt-2 text-xl font-bold text-[#1A1C1D]">
                {commission.amount}
              </p>
            </article>
          </div>

          <article className="flex items-center justify-between gap-3 rounded-xl border border-[#E0C0B1]/30 bg-white p-4">
            <div>
              <p className="text-xs font-medium tracking-[0.025em] text-[#584237]">
                {pendingPayouts.label}
              </p>
              <p className="mt-1 text-xl font-bold text-[#F59E0B]">
                {pendingPayouts.amount}
              </p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#F59E0B]/10 text-[#F59E0B]">
              <Hourglass size={16} strokeWidth={2} aria-hidden />
            </span>
          </article>
        </section>

        {/* Chart */}
        <section className="rounded-xl bg-white p-5 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-lg font-bold text-[#1A1C1D]">{chart.title}</h2>
            <span className="rounded-md bg-[#F3F3F4] px-2 py-1 text-xs text-[#584237]">
              {chart.modeLabel}
            </span>
          </div>

          <div className="mt-4 flex h-32 items-end justify-between gap-2">
            {chart.bars.map((bar) => (
              <div
                key={bar.label}
                className="flex flex-1 flex-col items-center justify-end gap-2"
              >
                <div className="relative flex h-32 w-full flex-col justify-end">
                  {bar.active ? (
                    <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[10px] font-bold tracking-[0.05em] text-[#842BD2]">
                      {chart.activeLabel}
                    </span>
                  ) : null}
                  <span
                    className={`block w-full rounded-t-sm ${
                      bar.active
                        ? 'bg-[#842BD2]/80 shadow-[0px_0px_12px_rgba(132,43,210,0.4)]'
                        : 'bg-[#F3F3F4]'
                    }`}
                    style={{ height: `${bar.heightPct}%` }}
                    aria-hidden
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-3 flex items-center justify-between text-[10px] font-medium uppercase tracking-[0.05em] text-[#584237]">
            {chart.bars.map((bar) => (
              <span
                key={`label-${bar.label}`}
                className={`flex-1 text-center ${
                  bar.active ? 'font-bold text-[#842BD2]' : ''
                }`}
              >
                {bar.label}
              </span>
            ))}
          </div>
        </section>

        {/* Quick actions */}
        <section className="space-y-4 pb-2">
          <h2 className="text-lg font-bold text-[#1A1C1D]">
            {quickActions.title}
          </h2>

          <Link
            to={quickActions.primary.path ?? '#'}
            className="flex items-center justify-between gap-4 rounded-xl px-4 py-3 text-white shadow-[0px_12px_32px_rgba(26,28,29,0.06)] transition-opacity hover:opacity-95"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
            }}
          >
            <span className="flex items-center gap-2">
              <PrimaryIcon size={18} strokeWidth={2} aria-hidden />
              <span className="text-sm font-bold uppercase tracking-[0.025em]">
                {quickActions.primary.label}
              </span>
            </span>
            <ChevronRight size={14} strokeWidth={2.5} aria-hidden />
          </Link>

          <div className="grid grid-cols-2 gap-3">
            {quickActions.secondary.map((action) => {
              const Icon = quickActionIcons[action.icon] ?? FileText
              return (
                <Link
                  key={action.id}
                  to={action.path ?? '#'}
                  className="flex items-center justify-center gap-2 rounded-xl border border-[#E0C0B1]/20 bg-white px-3 py-3 text-sm font-medium text-[#1A1C1D] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-gray-50"
                >
                  <Icon
                    size={14}
                    strokeWidth={2}
                    className="text-[#584237]"
                    aria-hidden
                  />
                  {action.label}
                </Link>
              )
            })}
          </div>
        </section>
      </div>
    </div>
  )
}
