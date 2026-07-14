import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  CheckCircle2,
  ChevronRight,
  CreditCard,
  MoreVertical,
  Receipt,
  Store,
  User,
} from 'lucide-react'
import { ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'
import AdminFlagTransactionModal from './AdminFlagTransactionModal'

const statusToneStyles = {
  success: {
    bg: 'bg-[#ECFDF5]',
    text: 'text-[#22C55E]',
    icon: 'text-[#22C55E]',
  },
  pending: {
    bg: 'bg-amber-50',
    text: 'text-amber-700',
    icon: 'text-amber-600',
  },
  failed: {
    bg: 'bg-red-50',
    text: 'text-red-600',
    icon: 'text-red-600',
  },
}

function StatusPill({ status, label }) {
  const tone = statusToneStyles[status] ?? statusToneStyles.success
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.1em] ${tone.bg} ${tone.text}`}
    >
      <CheckCircle2
        size={12}
        strokeWidth={2.25}
        className={tone.icon}
        aria-hidden
      />
      {label}
    </span>
  )
}

function DetailRow({ label, children }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-xs font-normal uppercase tracking-[0.05em] text-[#584237]">
        {label}
      </span>
      <div className="flex min-w-0 items-center justify-end gap-2 text-right">
        {children}
      </div>
    </div>
  )
}

function DetailChip({ value, bold = false }) {
  return (
    <span
      className={`inline-flex items-center rounded bg-[#F3F3F4] px-2 py-1 text-sm text-[#1A1C1D] ${
        bold ? 'font-bold' : 'font-normal'
      }`}
    >
      {value}
    </span>
  )
}

export default function AdminTransactionDetailMobile({ detail }) {
  const [flagModalOpen, setFlagModalOpen] = useState(false)

  const customerName = detail.customer.mobileName ?? detail.customer.name
  const customerEmail = detail.customer.mobileEmail ?? detail.customer.email
  const customerPhone = detail.customer.mobilePhone ?? detail.customer.phone
  const customerInitials =
    detail.customer.mobileInitials ?? detail.customer.initials
  const merchantName = detail.merchant.mobileName ?? detail.merchant.name
  const merchantLocation =
    detail.merchant.mobileLocation ?? detail.merchant.location
  const authCode = detail.payment.mobileAuthCode ?? detail.payment.authCode
  const reference = detail.payment.reference ?? detail.payment.gatewayRef
  const flagLabel = detail.actions.mobileFlagLabel ?? detail.actions.flagLabel
  const refundLabel =
    detail.actions.mobileRefundLabel ?? detail.actions.refundLabel
  const amountValue = detail.mobileAmount ?? detail.amount
  const dateValue = detail.mobileDatetime ?? detail.datetime

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-white/80 px-6 py-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] backdrop-blur-md">
        <Link
          to={ADMIN_TRANSACTIONS_PATH}
          aria-label="Back to transactions"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1C1D] transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
        </Link>
        <h1 className="flex-1 text-center text-lg font-bold tracking-[-0.025em] text-[#0F172A]">
          {detail.id}
        </h1>
        <button
          type="button"
          aria-label="More actions"
          className="flex h-8 w-5 items-center justify-center text-[#1A1C1D] transition-colors hover:text-gray-600"
        >
          <MoreVertical size={16} strokeWidth={2.25} />
        </button>
      </header>

      <div className="space-y-6 px-5 pb-32 pt-6">
        <section className="flex flex-col items-center px-0 pb-6 pt-4">
          <StatusPill status={detail.status} label={detail.statusLabel} />
          <h2 className="mt-3 text-[36px] font-extrabold leading-[1.11] tracking-[-0.05em] text-[#1A1C1D]">
            ₦{amountValue}
          </h2>
          <p className="mt-3 text-sm font-medium text-[#584237]">{dateValue}</p>
        </section>

        <section className="space-y-4 rounded-xl bg-white p-5 shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#1A1C1D]">
            <User size={14} strokeWidth={2.25} className="text-[#454557]" aria-hidden />
            Customer
          </h3>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#F3F3F4] text-sm font-bold text-[#584237]">
              {customerInitials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-[#1A1C1D]">{customerName}</p>
              <p className="mt-0.5 text-sm text-[#584237]">{customerEmail}</p>
              <p className="text-sm text-[#584237]">{customerPhone}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl bg-white p-5 shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
          <h3 className="flex items-center gap-2 text-lg font-bold text-[#1A1C1D]">
            <Store
              size={15}
              strokeWidth={2.25}
              className="text-[#454557]"
              aria-hidden
            />
            Merchant
          </h3>
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#F3F3F4] text-[#584237]">
              <Store size={20} strokeWidth={1.75} aria-hidden />
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-bold text-[#1A1C1D]">{merchantName}</p>
              <p className="mt-0.5 text-sm text-[#584237]">{merchantLocation}</p>
            </div>
          </div>
        </section>

        <section className="space-y-4 rounded-xl bg-white p-5 shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
          <h3 className="text-lg font-bold text-[#1A1C1D]">Details</h3>
          <div className="space-y-4">
            <DetailRow label="Method">
              <CreditCard
                size={15}
                strokeWidth={2}
                className="text-[#1A1C1D]"
                aria-hidden
              />
              <span className="text-sm font-semibold text-[#1A1C1D]">
                {detail.payment.method}
              </span>
            </DetailRow>
            <DetailRow label="Reference">
              <DetailChip value={reference} />
            </DetailRow>
            <DetailRow label="Auth Code">
              <DetailChip value={authCode} />
            </DetailRow>
            {detail.payment.rapidFee ? (
              <DetailRow
                label={detail.payment.rapidFeeLabel ?? 'Rapid Fee (1.5%)'}
              >
                <DetailChip value={detail.payment.rapidFee} bold />
              </DetailRow>
            ) : null}
          </div>
        </section>

        {detail.relatedOrder ? (
          <Link
            to={detail.relatedOrder.href ?? '#'}
            className="flex items-center justify-between gap-3 rounded-xl bg-white p-4 shadow-[0px_4px_16px_rgba(26,28,29,0.04)] transition-colors hover:bg-gray-50"
          >
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F3F4]">
                <Receipt
                  size={18}
                  strokeWidth={1.75}
                  className="text-[#9D4300]"
                  aria-hidden
                />
              </span>
              <div>
                <p className="text-xs font-normal uppercase tracking-[0.05em] text-[#584237]">
                  {detail.relatedOrder.eyebrow ?? 'Related Order'}
                </p>
                <p className="text-base font-bold text-[#1A1C1D]">
                  {detail.relatedOrder.label ?? `#${detail.relatedOrder.id}`}
                </p>
              </div>
            </div>
            <ChevronRight
              size={14}
              strokeWidth={2.25}
              className="text-[#584237]"
              aria-hidden
            />
          </Link>
        ) : null}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-[#E8E8E9] bg-white/90 px-5 pb-9 pt-4 backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <button
            type="button"
            onClick={() => setFlagModalOpen(true)}
            className="flex-1 rounded-lg border border-[#8C7164] py-2.5 text-xs font-bold uppercase tracking-[0.025em] text-[#1A1C1D] transition-colors hover:bg-[#8C7164]/5"
          >
            {flagLabel}
          </button>
          <button
            type="button"
            className="flex-1 rounded-lg bg-[#842BD2] py-2.5 text-xs font-bold uppercase tracking-[0.025em] text-white shadow-[0px_12px_32px_rgba(132,43,210,0.2)] transition-colors hover:bg-[#7224B8]"
          >
            {refundLabel}
          </button>
        </div>
      </footer>

      <AdminFlagTransactionModal
        isOpen={flagModalOpen}
        onClose={() => setFlagModalOpen(false)}
        transactionId={detail.id}
      />
    </div>
  )
}
