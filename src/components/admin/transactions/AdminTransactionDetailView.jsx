import { useState } from 'react'
import { Bell, CreditCard, Search, Settings, Store, User, Wallet } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminFlagTransactionModal from './AdminFlagTransactionModal'
import AdminTransactionStatusBadge from './AdminTransactionStatusBadge'

export default function AdminTransactionDetailView({ detail, searchPlaceholder }) {
  const [flagModalOpen, setFlagModalOpen] = useState(false)

  return (
    <section className="flex min-w-0 flex-1 flex-col bg-[#F5F6F8]">
      <header className="flex items-center gap-3 border-b border-gray-200 bg-white px-6 py-3">
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
        <button
          type="button"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Settings"
        >
          <Settings size={18} strokeWidth={1.75} />
        </button>
        <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-orange-100 text-xs font-bold text-rapid-orange">
          AU
        </span>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">{detail.id}</h1>
              <AdminTransactionStatusBadge status={detail.status} label={detail.statusLabel} />
            </div>
            <p className="mt-1 text-sm text-gray-500">{detail.datetime}</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {detail.totalLabel}
            </p>
            <p className="text-3xl font-bold text-violet-600">₦{detail.amount}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              <User size={16} strokeWidth={2} className="text-gray-400" aria-hidden />
              Customer
            </h2>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-violet-100 text-sm font-bold text-violet-700">
                {detail.customer.initials}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{detail.customer.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{detail.customer.email}</p>
                <p className="mt-0.5 text-sm text-gray-600">{detail.customer.phone}</p>
              </div>
            </div>
          </article>

          <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
              <Store size={16} strokeWidth={2} className="text-gray-400" aria-hidden />
              Merchant
            </h2>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-sm font-bold text-gray-700">
                {detail.merchant.initials}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{detail.merchant.name}</p>
                <p className="mt-0.5 text-sm text-gray-500">{detail.merchant.location}</p>
                <span className="mt-2 inline-flex rounded-md bg-orange-50 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-rapid-orange">
                  {detail.merchant.verifiedLabel}
                </span>
              </div>
            </div>
          </article>
        </div>

        <article className="mt-4 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-gray-500">
            <Wallet size={16} strokeWidth={2} className="text-gray-400" aria-hidden />
            {detail.payment.title}
          </h2>
          <dl className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">Method</dt>
              <dd className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-900">
                <CreditCard size={16} className="text-gray-400" aria-hidden />
                {detail.payment.method}
              </dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Gateway Ref
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{detail.payment.gatewayRef}</dd>
            </div>
            <div>
              <dt className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
                Auth Code
              </dt>
              <dd className="mt-1 text-sm font-semibold text-gray-900">{detail.payment.authCode}</dd>
            </div>
          </dl>
        </article>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <button
            type="button"
            onClick={() => setFlagModalOpen(true)}
            className="rounded-lg border-2 border-amber-700/80 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-amber-800 transition-colors hover:bg-amber-50"
          >
            {detail.actions.flagLabel}
          </button>
          <button
            type="button"
            className="rounded-lg bg-violet-600 px-6 py-2.5 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-violet-700"
          >
            {detail.actions.refundLabel}
          </button>
        </div>
      </div>

      <AdminFlagTransactionModal
        isOpen={flagModalOpen}
        onClose={() => setFlagModalOpen(false)}
        transactionId={detail.id}
      />
    </section>
  )
}
