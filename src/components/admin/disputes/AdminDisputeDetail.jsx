import { useState } from 'react'
import { Bell, Gavel, HelpCircle, Search, Store, User, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminDisputeStatusBadge from './AdminDisputeStatusBadge'

const actionIcons = {
  help: HelpCircle,
  gavel: Gavel,
  wallet: Wallet,
}

const actionStyles = {
  muted: 'border border-gray-200 bg-gray-100 text-gray-800 hover:bg-gray-200',
  merchant: 'bg-emerald-800 text-white hover:bg-emerald-900',
  refund: 'bg-violet-600 text-white hover:bg-violet-700',
}

export default function AdminDisputeDetail({ dispute, searchPlaceholder }) {
  const [logNotes, setLogNotes] = useState('')
  const { detail } = dispute

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#F5F6F8]">
      <header className="flex items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <div className="relative flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder={searchPlaceholder}
            className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
          />
        </div>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-xl font-bold text-gray-900">{detail.title}</h1>
              <AdminDisputeStatusBadge
                label={detail.detailStatusLabel}
                status={detail.detailStatus}
              />
            </div>
            <p className="mt-1 text-xs font-medium uppercase tracking-wide text-gray-400">
              {detail.initiated}
            </p>
          </div>
          <p className="text-2xl font-bold text-red-600">{detail.amount}</p>
        </div>

        <div className="space-y-4">
          <article className="rounded-xl border border-gray-100 bg-gray-50 p-5">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-700">
              <User size={16} strokeWidth={2} className="text-gray-500" />
              {detail.userClaim.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-gray-900">{detail.userClaim.party}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">{detail.userClaim.statement}</p>
          </article>

          <article className="rounded-xl border border-emerald-100 bg-emerald-50/60 p-5">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-emerald-900">
              <Store size={16} strokeWidth={2} className="text-emerald-700" />
              {detail.merchantResponse.title}
            </h2>
            <p className="mt-2 text-sm font-semibold text-gray-900">{detail.merchantResponse.party}</p>
            <p className="mt-2 text-sm leading-relaxed text-gray-700">
              {detail.merchantResponse.statement}
            </p>
          </article>

          <div>
            <label
              htmlFor="admin-dispute-log"
              className="text-xs font-bold uppercase tracking-wide text-gray-500"
            >
              Admin Operations Log (Internal)
            </label>
            <textarea
              id="admin-dispute-log"
              value={logNotes}
              onChange={(e) => setLogNotes(e.target.value)}
              placeholder={detail.logPlaceholder}
              rows={5}
              className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-100 px-4 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
            />
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
          {detail.actions.map((action) => {
            const Icon = actionIcons[action.icon] ?? HelpCircle
            return (
              <button
                key={action.id}
                type="button"
                className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3.5 text-sm font-bold transition-colors ${actionStyles[action.variant]}`}
              >
                <Icon size={18} strokeWidth={2} aria-hidden />
                {action.label}
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
