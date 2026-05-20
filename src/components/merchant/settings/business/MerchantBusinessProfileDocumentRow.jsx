import { CheckCircle2, Clock, CreditCard, FileText, XCircle } from 'lucide-react'

const iconToneClass = {
  primary: 'bg-merchant-nav-active text-merchant-primary',
  muted: 'bg-merchant-icon-tile text-merchant-muted',
  error: 'bg-red-50 text-red-600',
}

const documentIcons = {
  file: FileText,
  'id-card': CreditCard,
}

const statusConfig = {
  verified: {
    label: 'Verified',
    icon: CheckCircle2,
    className: 'text-emerald-600',
  },
  pending: {
    label: 'Pending Review',
    icon: Clock,
    className: 'text-amber-600',
  },
  rejected: {
    label: 'Rejected',
    icon: XCircle,
    className: 'text-red-600',
  },
}

export default function MerchantBusinessProfileDocumentRow({ document }) {
  const status = statusConfig[document.status]
  const StatusIcon = status.icon
  const DocIcon = documentIcons[document.icon] ?? FileText

  return (
    <li className="flex flex-col gap-3 rounded-lg bg-merchant-input px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconToneClass[document.iconTone]}`}
        >
          <DocIcon size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-merchant-ink">{document.name}</p>
          <p
            className={`mt-0.5 text-xs ${
              document.status === 'rejected' ? 'font-medium text-red-600' : 'text-merchant-muted'
            }`}
          >
            {document.meta}
          </p>
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3 sm:justify-end">
        <span className={`inline-flex items-center gap-1.5 text-xs font-semibold ${status.className}`}>
          <StatusIcon size={14} strokeWidth={2} aria-hidden />
          {status.label}
        </span>
        {document.reuploadLabel && (
          <button
            type="button"
            className="rounded-lg bg-[#B91C1C] px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-[#991B1B]"
          >
            {document.reuploadLabel}
          </button>
        )}
      </div>
    </li>
  )
}

