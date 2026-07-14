import { CreditCard, FileText, Shield } from 'lucide-react'

const iconMap = {
  id: CreditCard,
  document: FileText,
  insurance: Shield,
}

const statusStyles = {
  verified: 'text-[10px] font-bold uppercase tracking-wide text-emerald-600',
  pending_review: 'text-[10px] font-bold uppercase tracking-wide text-amber-600',
  missing: 'text-[10px] font-bold uppercase tracking-wide text-gray-500',
  expired: 'rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white',
}

export default function AdminRiderDocumentsList({ documents, onReview }) {
  if (documents.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-sm text-gray-500">No documents on file.</p>
    )
  }

  return (
    <ul>
      {documents.map((doc) => {
        const Icon = iconMap[doc.icon] ?? FileText
        return (
          <li
            key={doc.id}
            className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-5 last:border-0"
          >
            <div className="flex min-w-0 flex-1 items-center gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-gray-100 text-gray-500">
                <Icon size={20} strokeWidth={1.75} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-gray-900">{doc.name}</p>
                <p className="text-xs text-gray-500">{doc.meta}</p>
                {doc.documentUrl ? (
                  <a
                    href={doc.documentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs font-semibold text-rapid-orange hover:underline"
                  >
                    View file
                  </a>
                ) : null}
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <span className={statusStyles[doc.status] ?? statusStyles.pending_review}>
                {doc.statusLabel}
              </span>
              {doc.verificationStatus !== 'approved' && doc.verificationStatus !== 'missing' ? (
                <button
                  type="button"
                  onClick={() => onReview?.(doc.documentType, 'approved')}
                  className="text-sm font-bold text-emerald-600 hover:underline"
                >
                  Approve
                </button>
              ) : null}
              {doc.verificationStatus !== 'rejected' && doc.verificationStatus !== 'missing' ? (
                <button
                  type="button"
                  onClick={() => onReview?.(doc.documentType, 'rejected')}
                  className="text-sm font-bold text-red-600 hover:underline"
                >
                  Reject
                </button>
              ) : null}
            </div>
          </li>
        )
      })}
    </ul>
  )
}
