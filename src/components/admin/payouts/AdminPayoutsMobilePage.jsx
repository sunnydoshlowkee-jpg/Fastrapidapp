import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCheck,
  Coffee,
  Landmark,
  Shirt,
  User,
  Utensils,
} from 'lucide-react'

const avatarToneStyles = {
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700',
  neutral: 'bg-[#F3F3F4] text-[#584237]',
  emerald: 'bg-emerald-100 text-emerald-700',
  sky: 'bg-sky-100 text-sky-700',
}

const avatarIcons = {
  coffee: Coffee,
  shirt: Shirt,
  utensils: Utensils,
  user: User,
}

const statusPillStyles = {
  pending: {
    bg: 'bg-[#FFDAD6]',
    text: 'text-[#93000A]',
    dot: 'bg-[#BA1A1A]',
  },
  processing: {
    bg: 'bg-[#FFEEDC]',
    text: 'text-[#9D4300]',
    dot: 'bg-[#F97316]',
  },
  failed: {
    bg: 'bg-red-100',
    text: 'text-red-700',
    dot: 'bg-red-500',
  },
}

function PayoutCard({ entry }) {
  const Icon = avatarIcons[entry.avatarIcon] ?? User
  const toneClass = avatarToneStyles[entry.avatarTone] ?? avatarToneStyles.neutral
  const pill = statusPillStyles[entry.status] ?? statusPillStyles.pending

  return (
    <article className="relative overflow-hidden rounded-xl bg-white p-4 shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
      <div className="flex items-start justify-between gap-4">
        <div className="flex min-w-0 items-center gap-3">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${toneClass}`}
          >
            <Icon size={18} strokeWidth={1.75} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="truncate text-base font-bold text-[#1A1C1D]">
              {entry.name}
            </p>
            <p className="text-xs text-[#584237]">{entry.periodLabel}</p>
          </div>
        </div>

        <span
          className={`inline-flex shrink-0 items-center gap-1 rounded-md px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${pill.bg} ${pill.text}`}
        >
          <span
            className={`h-1.5 w-1.5 rounded-full ${pill.dot}`}
            aria-hidden
          />
          {entry.statusLabel}
        </span>
      </div>

      <div className="mt-4 flex items-end justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-xs text-[#584237]">{entry.bank}</p>
          <p className="mt-1 flex items-center gap-1 text-sm font-medium text-[#1A1C1D]">
            <Landmark
              size={13}
              strokeWidth={1.75}
              className="text-[#1A1C1D]"
              aria-hidden
            />
            {entry.accountMask}
          </p>
        </div>

        <div className="text-right">
          <p className="text-xs text-[#584237]">Net Amount</p>
          <p className="mt-1 text-xl font-extrabold tracking-[-0.025em] text-[#842BD2]">
            {entry.netAmount}
          </p>
        </div>
      </div>
    </article>
  )
}

export default function AdminPayoutsMobilePage({ data }) {
  const mobile = data.mobile
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState(
    mobile?.tabs?.[0]?.id ?? 'merchants',
  )

  if (!mobile) return null

  const list =
    activeTab === 'merchants' ? mobile.merchants ?? [] : mobile.riders ?? []

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/admin')
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-[#F9F9FA]/80 px-5 py-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] backdrop-blur-md">
        <button
          type="button"
          onClick={handleBack}
          aria-label={mobile.backLabel ?? 'Back'}
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1C1D] transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
        </button>
        <h1 className="flex-1 text-center text-xl font-bold tracking-[-0.025em] text-[#1A1C1D]">
          {mobile.pageTitle}
        </h1>
        <span className="w-8" aria-hidden />
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-32 pt-6">
        <p className="text-sm text-[#584237]">{mobile.subtitle}</p>

        <div
          className="mt-4 flex items-center gap-1 rounded-[4px] bg-[#F3F4F5] p-1"
          role="tablist"
          aria-label="Payout recipient type"
        >
          {(mobile.tabs ?? []).map((tab) => {
            const isActive = activeTab === tab.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 rounded-md py-2 text-sm transition-colors ${
                  isActive
                    ? 'bg-[#F97316] font-bold text-white shadow-[0px_1px_2px_rgba(0,0,0,0.05)]'
                    : 'font-medium text-[#454557] hover:text-[#1A1C1D]'
                }`}
              >
                {tab.label}
              </button>
            )
          })}
        </div>

        <div className="mt-6 space-y-4">
          {list.length === 0 ? (
            <p className="rounded-xl bg-white p-6 text-center text-sm text-[#584237]">
              No pending payouts.
            </p>
          ) : (
            list.map((entry) => <PayoutCard key={entry.id} entry={entry} />)
          )}
        </div>
      </div>

      <div className="pointer-events-none fixed inset-x-0 bottom-0 z-20 flex justify-end px-5 pb-6 lg:hidden">
        <button
          type="button"
          className="pointer-events-auto inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-bold uppercase tracking-[0.025em] text-white shadow-[0px_12px_32px_rgba(26,28,29,0.15)] transition-opacity hover:opacity-95"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
          }}
        >
          <CheckCheck size={16} strokeWidth={2.5} aria-hidden />
          {mobile.approveAllLabel ?? 'Approve All'}
        </button>
      </div>
    </div>
  )
}
