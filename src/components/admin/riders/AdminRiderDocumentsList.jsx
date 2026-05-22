import { CreditCard, FileText, Shield } from 'lucide-react'

const iconMap = {
  id: CreditCard,
  document: FileText,
  insurance: Shield,
}

const statusStyles = {
  verified: 'text-[10px] font-bold uppercase tracking-wide text-gray-400',
  pending_review: 'text-[10px] font-bold uppercase tracking-wide text-gray-900',
  expired: 'rounded-md bg-red-600 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white',
}

export default function AdminRiderDocumentsList({ documents }) {
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
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-6">
              <span className={statusStyles[doc.status] ?? statusStyles.verified}>
                {doc.statusLabel}
              </span>
              <button
                type="button"
                className="text-sm font-bold text-rapid-orange transition-colors hover:text-[#E84A15] hover:underline"
              >
                {doc.actionLabel}
              </button>
            </div>
          </li>
        )
      })}
    </ul>
  )
}
