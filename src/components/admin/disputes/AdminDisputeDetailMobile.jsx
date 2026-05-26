import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Gavel,
  History,
  MoreVertical,
  Paperclip,
  Store,
  User,
} from 'lucide-react'
import { ADMIN_DISPUTES_PATH } from '../../../services/data/adminDisputes.mock'

const statusBadgeStyles = {
  gray: 'bg-[#E8E8E9] text-[#1A1C1D]',
  red: 'bg-[#FFDAD7] text-[#930013]',
  green: 'bg-emerald-100 text-emerald-800',
}

const actionVariantStyles = {
  refund: {
    button:
      'bg-[#4342FF] text-[#DDDCFF] shadow-[0px_10px_15px_-3px_rgba(67,66,255,0.2),0px_4px_6px_-4px_rgba(67,66,255,0.2)] hover:bg-[#3a39e6]',
    iconColor: 'text-[#DDDCFF]',
  },
  merchant: {
    button:
      'bg-[#16A34A] text-white shadow-[0px_10px_15px_-3px_rgba(34,197,94,0.2),0px_4px_6px_-4px_rgba(34,197,94,0.2)] hover:bg-[#138a3f]',
    iconColor: 'text-white',
  },
  text: {
    button: 'bg-transparent text-[#767588] hover:text-gray-900',
    iconColor: 'text-[#767588]',
  },
}

const actionIcons = {
  bank: Building2,
  gavel: Gavel,
}

export default function AdminDisputeDetailMobile({ dispute }) {
  const detail = dispute.detail ?? {}
  const userClaim = detail.userClaim ?? {}
  const merchantResponse = detail.merchantResponse ?? {}
  const statusBadge = dispute.mobileStatusBadge ?? {
    label: dispute.statusLabel ?? 'OPEN',
    tone: 'gray',
  }
  const detailId = dispute.mobileDetailId ?? dispute.id
  const orderReference = dispute.orderReference
  const amountLabel = dispute.detailMobileAmount ?? dispute.mobileAmount ?? dispute.amount

  return (
    <div className="relative flex h-full flex-1 flex-col overflow-y-auto bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 bg-[#F9F9FA]/80 px-5 py-4 shadow-[0px_12px_32px_rgba(26,28,29,0.06)] backdrop-blur-md">
        <Link
          to={ADMIN_DISPUTES_PATH}
          aria-label="Back to disputes"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1C1D] transition-colors hover:bg-white"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
        </Link>
        <h1 className="flex-1 text-center text-xl font-bold tracking-[-0.05em] text-[#1A1C1D]">
          Rapid Admin
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
        <section className="space-y-3">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs font-semibold uppercase tracking-[0.025em] text-[#9D4300]">
              Dispute ID
            </span>
            <span
              className={`inline-flex items-center rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${
                statusBadgeStyles[statusBadge.tone] ?? statusBadgeStyles.gray
              }`}
            >
              {statusBadge.label}
            </span>
          </div>

          <h2 className="text-[36px] font-extrabold leading-[1] tracking-[-0.05em] text-[#1A1C1D]">
            #{detailId}
          </h2>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {orderReference ? (
              <div className="rounded-xl bg-white p-4 shadow-[0px_4px_16px_rgba(26,28,29,0.02)]">
                <p className="text-xs font-medium text-[#584237]">
                  Order Reference
                </p>
                <Link
                  to={orderReference.href ?? '#'}
                  className="mt-1 inline-flex items-center gap-1 text-sm font-bold text-[#9D4300] transition-colors hover:text-[#7e3600]"
                >
                  {orderReference.label}
                  <ArrowUpRight size={12} strokeWidth={2.25} aria-hidden />
                </Link>
              </div>
            ) : null}

            <div className="rounded-xl border border-[#E0C0B1]/15 bg-white p-4 shadow-[0px_4px_16px_rgba(26,28,29,0.02)]">
              <p className="text-xs font-medium text-[#584237]">
                Disputed Amount
              </p>
              <p className="mt-1 text-lg font-bold text-[#842BD2]">
                {amountLabel}
              </p>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-xl bg-white shadow-[0px_8px_24px_rgba(26,28,29,0.04)]">
          <span
            className="absolute inset-x-0 top-0 h-1 bg-[#BA1A1A]/80"
            aria-hidden
          />
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FFDAD6] text-[#93000A]">
                <User size={12} strokeWidth={2.25} aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-[#1A1C1D]">
                {userClaim.mobileTitle ?? "User's Claim"}
              </h3>
            </div>

            <div className="space-y-3 rounded-lg bg-[#F3F3F4] p-4">
              <p className="text-sm leading-[1.65] text-[#1A1C1D]">
                "{userClaim.statement}"
              </p>
              <div className="flex items-center justify-between gap-4 text-xs text-[#584237]">
                <span>{userClaim.submittedBy}</span>
                <span>{userClaim.submittedAt}</span>
              </div>
            </div>
          </div>
        </section>

        <section className="relative overflow-hidden rounded-xl bg-white shadow-[0px_8px_24px_rgba(26,28,29,0.04)]">
          <span
            className="absolute inset-x-0 top-0 h-1 bg-[#FDA77A]/80"
            aria-hidden
          />
          <div className="space-y-4 p-5">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#FDA77A] text-[#773A16]">
                <Store size={12} strokeWidth={2.25} aria-hidden />
              </span>
              <h3 className="text-lg font-bold text-[#1A1C1D]">
                {merchantResponse.mobileTitle ?? "Merchant's Response"}
              </h3>
            </div>

            <div className="space-y-3 rounded-lg border border-[#E0C0B1]/15 bg-[#F3F3F4] p-4">
              <p className="text-sm leading-[1.65] text-[#1A1C1D]">
                "{merchantResponse.statement}"
              </p>
              {merchantResponse.attachment ? (
                <div>
                  <span className="inline-flex items-center gap-1 rounded bg-[#E2E2E3] px-2 py-1 text-[10px] font-medium text-[#1A1C1D]">
                    <Paperclip
                      size={10}
                      strokeWidth={2}
                      className="text-[#1A1C1D]"
                      aria-hidden
                    />
                    {merchantResponse.attachment.label}
                  </span>
                </div>
              ) : null}
            </div>

            {merchantResponse.trackRecord ? (
              <div className="flex items-start gap-3">
                <History
                  size={18}
                  strokeWidth={1.75}
                  className="mt-0.5 shrink-0 text-[#767588]"
                  aria-hidden
                />
                <div className="min-w-0">
                  <p className="text-sm font-medium text-[#191C1D]">
                    {merchantResponse.trackRecord.title}
                  </p>
                  <p className="text-sm text-[#767588]">
                    {merchantResponse.trackRecord.subtitle}
                  </p>
                </div>
              </div>
            ) : null}
          </div>
        </section>

        <section className="space-y-2">
          <label
            htmlFor="dispute-internal-note"
            className="ml-1 block text-xs font-semibold uppercase tracking-[0.025em] text-[#584237]"
          >
            {detail.internalNoteLabel ?? 'Admin Internal Note'}
          </label>
          <textarea
            id="dispute-internal-note"
            rows={3}
            placeholder={
              detail.internalNotePlaceholder ??
              'Add private notes regarding investigation...'
            }
            className="w-full resize-none rounded-xl bg-white p-4 text-sm text-[#1A1C1D] shadow-[0px_4px_12px_rgba(26,28,29,0.03)] outline-none placeholder:text-[#584237]/50 focus:ring-2 focus:ring-rapid-orange/20"
          />
        </section>

        <section className="space-y-3 pt-2">
          {(detail.mobileActions ?? []).map((action) => {
            const variantStyle =
              actionVariantStyles[action.variant] ?? actionVariantStyles.text
            const Icon = action.icon ? actionIcons[action.icon] : null
            if (action.variant === 'text') {
              return (
                <button
                  key={action.id}
                  type="button"
                  className={`flex w-full items-center justify-center gap-2 rounded-lg py-3 text-sm font-semibold transition-colors ${variantStyle.button}`}
                >
                  {action.label}
                </button>
              )
            }
            return (
              <button
                key={action.id}
                type="button"
                className={`flex w-full items-center justify-center gap-2 rounded-lg py-4 text-sm font-bold tracking-[-0.025em] transition-colors ${variantStyle.button}`}
              >
                {Icon ? (
                  <Icon
                    size={15}
                    strokeWidth={2.25}
                    className={variantStyle.iconColor}
                    aria-hidden
                  />
                ) : null}
                {action.label}
              </button>
            )
          })}
        </section>
      </div>
    </div>
  )
}
