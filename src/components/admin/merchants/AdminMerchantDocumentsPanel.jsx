import { useState } from 'react'
import {
  BadgeCheck,
  FileText,
  XCircle,
  Clock,
  ChevronRight,
} from 'lucide-react'
import AdminMerchantDocumentViewerModal from './AdminMerchantDocumentViewerModal'

const STATUS_META = {
  verified: {
    badge: 'bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100',
    Icon: BadgeCheck,
    iconClass: 'text-emerald-500',
  },
  in_review: {
    badge: 'bg-violet-50 text-violet-600 ring-1 ring-violet-100',
    Icon: Clock,
    iconClass: 'text-violet-500',
  },
  rejected: {
    badge: 'bg-red-50 text-red-600 ring-1 ring-red-100',
    Icon: XCircle,
    iconClass: 'text-red-500',
  },
  pending: {
    badge: 'bg-gray-100 text-gray-600 ring-1 ring-gray-200',
    Icon: Clock,
    iconClass: 'text-gray-400',
  },
}

function DocumentRow({ doc, onOpen }) {
  const meta = STATUS_META[doc.status] ?? STATUS_META.pending
  const { Icon } = meta
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full items-center gap-4 rounded-xl bg-white p-4 text-left shadow-sm ring-1 ring-gray-100 transition-shadow hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-rapid-orange"
    >
      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
        <FileText size={22} strokeWidth={1.75} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <p className="truncate text-sm font-bold text-gray-900">{doc.title}</p>
          <span
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${meta.badge}`}
          >
            <Icon size={12} strokeWidth={2.25} className={meta.iconClass} aria-hidden />
            {doc.statusLabel}
          </span>
        </div>
        <p className="mt-1 text-xs font-medium text-gray-500">
          Uploaded by {doc.uploadedBy} • {doc.size} {doc.fileType} • {doc.uploadedAt}
        </p>
      </div>
      <ChevronRight
        size={18}
        className="shrink-0 text-gray-300 transition-colors group-hover:text-gray-500"
        aria-hidden
      />
    </button>
  )
}

export default function AdminMerchantDocumentsPanel({ documents }) {
  const [openId, setOpenId] = useState(null)

  if (!documents || documents.items.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-sm font-semibold text-gray-600">
          No compliance documents on file.
        </p>
      </div>
    )
  }

  const openDoc = documents.items.find((d) => d.id === openId)

  return (
    <section className="space-y-4">
      <header>
        <h2 className="text-base font-bold text-gray-900">{documents.title}</h2>
        <p className="mt-1 text-xs font-medium text-gray-500">
          {documents.subtitle}
        </p>
      </header>

      <div className="space-y-3">
        {documents.items.map((doc) => (
          <DocumentRow key={doc.id} doc={doc} onOpen={() => setOpenId(doc.id)} />
        ))}
      </div>

      {openDoc ? (
        <AdminMerchantDocumentViewerModal
          document={openDoc}
          onClose={() => setOpenId(null)}
        />
      ) : null}
    </section>
  )
}
