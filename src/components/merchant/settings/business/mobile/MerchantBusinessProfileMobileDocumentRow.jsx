import { CheckCircle2, Clock, FileText, XCircle } from 'lucide-react'

const statusBadge = {
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    className: 'bg-merchant-nav-active text-merchant-primary',
  },
  pending: {
    label: 'Pending',
    icon: Clock,
    className: 'bg-amber-50 text-amber-700',
  },
}

export default function MerchantBusinessProfileMobileDocumentRow({ document }) {
  if (!document.status) {
    return (
      <li className="flex items-center justify-between gap-3 rounded-lg bg-merchant-input px-3.5 py-3">
        <div className="flex min-w-0 flex-1 items-center gap-2.5">
          <FileText size={18} className="shrink-0 text-merchant-muted" strokeWidth={1.75} aria-hidden />
          <p className="text-sm font-semibold text-merchant-ink">{document.name}</p>
        </div>
        <span className="shrink-0 text-[10px] font-semibold text-merchant-muted">Not uploaded</span>
      </li>
    )
  }

  if (document.status === 'rejected') {
    return (
      <li className="flex items-center justify-between gap-3 rounded-lg bg-red-50 px-3.5 py-3">
        <div className="min-w-0">
          <p className="text-sm font-semibold text-merchant-ink">{document.name}</p>
          <p className="mt-1 inline-flex items-center gap-1 text-xs font-semibold text-red-600">
            <XCircle size={14} strokeWidth={2} aria-hidden />
            Rejected
          </p>
        </div>
        {document.reuploadLabel && (
          <button
            type="button"
            className="shrink-0 rounded-lg bg-[#B91C1C] px-3.5 py-2 text-xs font-semibold text-white"
          >
            {document.reuploadLabel}
          </button>
        )}
      </li>
    )
  }

  const badge = statusBadge[document.status] ?? statusBadge.pending
  const BadgeIcon = badge.icon

  return (
    <li className="flex items-center justify-between gap-3 rounded-lg bg-merchant-input px-3.5 py-3">
      <div className="flex min-w-0 flex-1 items-center gap-2.5">
        <FileText size={18} className="shrink-0 text-merchant-muted" strokeWidth={1.75} aria-hidden />
        <p className="text-sm font-semibold text-merchant-ink">{document.name}</p>
      </div>
      <span
        className={`inline-flex shrink-0 items-center gap-1 rounded-full px-2.5 py-1 text-[10px] font-semibold ${badge.className}`}
      >
        <BadgeIcon size={12} strokeWidth={2} aria-hidden />
        {badge.label}
      </span>
    </li>
  )
}
