import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ChevronRight,
  Info,
  Menu,
  TimerReset,
} from 'lucide-react'

const urgencyStyles = {
  critical: {
    bg: 'bg-[#FFDAD7]',
    color: 'text-[#930013]',
    iconColor: 'text-[#930013]',
  },
  warning: {
    bg: 'bg-[#FFDDB8]',
    color: 'text-[#653E00]',
    iconColor: 'text-[#653E00]',
  },
  neutral: {
    bg: 'bg-[#E7E8E9]',
    color: 'text-[#454557]',
    iconColor: 'text-[#454557]',
  },
}

const urgencyIcons = {
  clock: TimerReset,
  alertTriangle: AlertTriangle,
}

function UrgencyBadge({ urgency }) {
  if (!urgency) return null
  const tone = urgencyStyles[urgency.tone] ?? urgencyStyles.neutral
  const Icon = urgency.icon ? urgencyIcons[urgency.icon] : null

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2.5 py-1 text-xs font-bold ${tone.bg} ${tone.color}`}
    >
      {Icon ? (
        <Icon
          size={11}
          strokeWidth={2.25}
          className={tone.iconColor}
          aria-hidden
        />
      ) : null}
      {urgency.label}
    </span>
  )
}

function DisputeCard({ dispute, amountLabel }) {
  const isCritical = dispute.urgency?.tone === 'critical'
  const displayId = dispute.mobileId ?? dispute.id
  const displayAmount = dispute.mobileAmount ?? dispute.amount

  return (
    <Link
      to={`/admin/disputes/${dispute.id}`}
      className="relative block overflow-hidden rounded-lg bg-white p-5 transition-colors hover:bg-gray-50"
    >
      {isCritical ? (
        <span
          className="absolute inset-y-0 left-0 w-1 bg-[#B61722]"
          aria-hidden
        />
      ) : null}

      <div className="flex items-center justify-between gap-4">
        <span className="text-xs font-bold uppercase tracking-[0.05em] text-[#454557]">
          ID: {displayId}
        </span>
        <UrgencyBadge urgency={dispute.urgency} />
      </div>

      <div className="mt-3 space-y-1.5">
        <h3 className="text-base font-semibold leading-snug text-[#191C1D]">
          {dispute.parties}
        </h3>
        {dispute.reason ? (
          <p className="flex items-center gap-1.5 text-sm text-[#454557]">
            <Info size={13} strokeWidth={2} className="text-[#454557]" aria-hidden />
            {dispute.reason}
          </p>
        ) : null}
      </div>

      <div className="mt-4 flex items-end justify-between gap-4 border-t border-[#C6C4DA]/15 pt-3">
        <div>
          <p className="text-xs text-[#454557]">{amountLabel}</p>
          <p className="mt-0.5 text-lg font-bold tracking-[-0.025em] text-[#B61722]">
            {displayAmount}
          </p>
        </div>
        <span
          className="flex h-10 w-10 items-center justify-center rounded bg-[#F3F4F5] text-[#2419E9]"
          aria-hidden
        >
          <ChevronRight size={14} strokeWidth={2.5} />
        </span>
      </div>
    </Link>
  )
}

export default function AdminDisputesMobilePage({ data, onOpenDrawer }) {
  const [activeFilter, setActiveFilter] = useState(
    data.defaultMobileFilter ?? 'open',
  )

  const filtered = useMemo(() => {
    if (activeFilter === 'open') {
      return data.disputes.filter(
        (d) => (d.mobileGroup ?? d.status) !== 'resolved',
      )
    }
    if (activeFilter === 'under_review') {
      return data.disputes.filter(
        (d) => (d.mobileGroup ?? d.status) === 'reviewing',
      )
    }
    if (activeFilter === 'escalated') {
      return data.disputes.filter(
        (d) => (d.mobileGroup ?? d.status) === 'escalated',
      )
    }
    if (activeFilter === 'resolved') {
      return data.disputes.filter(
        (d) => (d.mobileGroup ?? d.status) === 'resolved',
      )
    }
    return data.disputes
  }, [activeFilter, data.disputes])

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#F8F9FA]">
      <header className="sticky top-0 z-20 flex items-center gap-4 bg-white/95 px-4 py-4 backdrop-blur-md">
        <button
          type="button"
          onClick={onOpenDrawer}
          aria-label="Open navigation"
          className="flex h-7 w-9 items-center justify-center rounded-xl transition-colors hover:bg-[#E1E0FF]"
        >
          <Menu size={18} strokeWidth={2.25} className="text-[#2419E9]" />
        </button>
        <h1 className="flex-1 text-center text-xl font-extrabold tracking-[-0.05em] text-[#2419E9]">
          {data.mobileTitle ?? 'Rapid Admin'}
        </h1>
        <span className="w-9" aria-hidden />
      </header>

      <section className="space-y-4 px-5 py-6">
        <div className="flex items-end justify-between gap-4">
          <h2 className="text-[30px] font-bold tracking-[-0.025em] text-[#191C1D]">
            {data.mobilePageTitle ?? 'Disputes'}
          </h2>
          <span className="rounded-xl bg-[#E7E8E9] px-3 py-1 text-sm text-[#454557]">
            {data.totalLabel}
          </span>
        </div>

        <nav
          className="-mx-5 flex gap-2 overflow-x-auto px-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          aria-label="Filter disputes"
        >
          {(data.mobileFilters ?? []).map((filter) => {
            const isActive = activeFilter === filter.id
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                className={`shrink-0 rounded-xl px-5 py-2.5 text-sm tracking-[-0.025em] transition-colors ${
                  isActive
                    ? 'bg-[#E1E0FF] font-semibold text-[#1E0CE6]'
                    : 'bg-[#F3F4F5] font-medium text-[#454557] hover:bg-gray-200'
                }`}
              >
                {filter.label}
              </button>
            )
          })}
        </nav>
      </section>

      <div className="space-y-4 px-5 pb-8">
        {filtered.length === 0 ? (
          <p className="rounded-lg bg-white p-6 text-center text-sm text-[#454557]">
            No disputes in this queue.
          </p>
        ) : (
          filtered.map((dispute) => (
            <DisputeCard
              key={dispute.id}
              dispute={dispute}
              amountLabel={data.amountLabel ?? 'Disputed Amount'}
            />
          ))
        )}
      </div>
    </div>
  )
}
