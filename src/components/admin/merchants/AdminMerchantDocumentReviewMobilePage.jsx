import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  AlertCircle,
  Check,
  Clock,
  Eye,
  Search as SearchIcon,
  Store,
  X,
} from 'lucide-react'

const statusStyles = {
  reviewing: {
    pillBg: 'bg-[#BE7BFF]/30',
    pillText: 'text-[#4C0084]',
    dot: 'bg-[#842BD2]',
    accent: '#9D4300',
    Icon: null,
    showDot: true,
    cardBorder: 'border border-[#9D4300]/20',
  },
  approved: {
    pillBg: 'bg-transparent',
    pillText: 'text-[#1A1C1D]',
    dot: null,
    accent: null,
    Icon: Check,
    showDot: false,
    cardBorder: '',
  },
  pending: {
    pillBg: 'bg-[#E2E2E3]',
    pillText: 'text-[#584237]',
    dot: null,
    accent: null,
    Icon: Clock,
    showDot: false,
    cardBorder: '',
  },
  rejected: {
    pillBg: 'bg-[#FFDAD6]',
    pillText: 'text-[#93000A]',
    dot: null,
    accent: null,
    Icon: X,
    showDot: false,
    cardBorder: '',
  },
}

function StatusPill({ status, label }) {
  const s = statusStyles[status] ?? statusStyles.pending
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-bold uppercase tracking-[0.05em] ${s.pillBg} ${s.pillText}`}
    >
      {s.showDot ? (
        <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} aria-hidden />
      ) : null}
      {s.Icon ? <s.Icon size={10} strokeWidth={2.5} aria-hidden /> : null}
      {label}
    </span>
  )
}

function DocumentCard({ doc, onView }) {
  const s = statusStyles[doc.status] ?? statusStyles.pending
  const isReviewing = doc.status === 'reviewing'

  return (
    <article
      className={`relative overflow-hidden rounded-xl bg-white shadow-[0px_4px_16px_rgba(26,28,29,0.03)] ${
        isReviewing
          ? 'border border-[#9D4300]/20'
          : 'shadow-[0px_2px_8px_rgba(26,28,29,0.02)]'
      }`}
    >
      {s.accent ? (
        <span
          className="absolute inset-y-1 left-1 w-1 rounded-l-full"
          style={{ backgroundColor: s.accent }}
          aria-hidden
        />
      ) : null}

      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-start justify-between gap-3 pl-2">
          <h4 className="text-base font-semibold text-[#1A1C1D]">
            {doc.title}
          </h4>
          <StatusPill status={doc.status} label={doc.statusLabel} />
        </div>

        <p
          className={`pl-2 ${
            isReviewing ? 'text-base' : 'text-sm'
          } text-[#584237]`}
        >
          {doc.description}
        </p>

        {isReviewing ? (
          <button
            type="button"
            onClick={() => onView(doc)}
            className="mt-1 flex w-full items-center justify-center gap-2 self-end rounded-lg bg-[#E8E8E9] py-3 text-base font-bold text-[#1A1C1D] transition-colors hover:bg-[#D9D9DA]"
          >
            <Eye size={15} strokeWidth={2} aria-hidden />
            {doc.viewLabel ?? 'View Document'}
          </button>
        ) : null}

        {doc.status === 'rejected' && doc.issue ? (
          <div className="mt-1 flex items-start gap-1.5 rounded-md bg-[#FFDAD6]/30 p-2">
            <AlertCircle
              size={12}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-[#BA1A1A]"
              aria-hidden
            />
            <p className="text-sm leading-6 text-[#BA1A1A]">{doc.issue}</p>
          </div>
        ) : null}
      </div>
    </article>
  )
}

function MerchantHeader({ merchant }) {
  return (
    <div className="flex items-center gap-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full text-sm font-bold uppercase text-white"
        style={{
          backgroundImage: merchant.avatarBg,
          backgroundColor: '#E8E8E9',
        }}
      >
        <span aria-hidden>{merchant.avatarInitials}</span>
        <span className="sr-only">{merchant.name}</span>
      </div>
      <div className="min-w-0 flex-1">
        <h2 className="truncate text-base font-bold leading-5 text-[#1A1C1D]">
          {merchant.name}
        </h2>
        <p className="mt-0.5 flex items-center gap-1 text-base text-[#584237]">
          <Store size={12} strokeWidth={1.75} aria-hidden />
          <span className="truncate">{merchant.category}</span>
        </p>
      </div>
    </div>
  )
}

function DocumentViewerModal({ doc, onClose, rejectLabel, verifyLabel }) {
  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const original = window.document.body.style.overflow
    window.document.body.style.overflow = 'hidden'
    const handleKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.document.body.style.overflow = original
      window.removeEventListener('keydown', handleKey)
    }
  }, [doc, onClose])

  if (typeof window === 'undefined') return null

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.title} viewer`}
      className="fixed inset-0 z-[60] flex flex-col"
      style={{ backgroundColor: 'rgba(47, 49, 50, 0.95)' }}
    >
      <header
        className="flex items-center justify-between gap-3 p-4"
        style={{
          backgroundImage:
            'linear-gradient(180deg, rgba(0,0,0,0.5) 0%, rgba(0,0,0,0) 100%)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            aria-label="Close document viewer"
            className="flex h-8 w-8 items-center justify-center rounded-full text-white backdrop-blur-md transition-colors hover:bg-white/20"
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
          >
            <X size={14} strokeWidth={2.25} />
          </button>
          <div className="flex flex-col">
            <h3 className="text-lg font-bold leading-7 text-white">
              {doc.title}
            </h3>
            <p className="text-sm text-white/70">
              {doc.pageLabel ?? 'Page 1 of 1'}
            </p>
          </div>
        </div>
        <button
          type="button"
          aria-label="Zoom document"
          className="flex h-9 w-9 items-center justify-center text-white"
        >
          <SearchIcon size={18} strokeWidth={2} />
        </button>
      </header>

      <div className="flex flex-1 items-center justify-center px-4 pb-4 pt-0">
        <div className="relative overflow-hidden rounded-xl bg-white shadow-[0px_25px_50px_-12px_rgba(0,0,0,0.25)]">
          <div
            className="relative flex h-[480px] w-[280px] items-center justify-center"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #2E5A78 0%, #1F4060 100%)',
              opacity: 0.9,
            }}
            aria-hidden
          >
            <div className="space-y-4 text-center text-white/90">
              <p className="text-2xl font-bold tracking-[0.2em] text-white/80 [text-shadow:0_1px_1px_rgba(0,0,0,0.3)]">
                CAF/CAC
              </p>
              <p className="text-[10px] font-medium text-white/60">
                FEDERAL REPUBLIC OF NIGERIA
              </p>
              <p className="text-5xl font-bold tracking-[0.1em] text-white/95 [text-shadow:0_2px_4px_rgba(0,0,0,0.4)]">
                CAC
              </p>
              <p className="mx-auto max-w-[180px] text-[10px] leading-relaxed text-white/60">
                CERTIFICATE OF INCORPORATION
                <br />
                COMPANIES AND ALLIED MATTERS
              </p>
            </div>
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-20"
              style={{
                backgroundImage:
                  'linear-gradient(180deg, rgba(157,67,0,0) 0%, rgba(157,67,0,0.2) 50%, rgba(157,67,0,0) 100%)',
              }}
            />
          </div>
        </div>
      </div>

      <div
        className="bg-white p-6"
        style={{
          borderTopLeftRadius: 32,
          borderTopRightRadius: 32,
          boxShadow: '0px -12px 32px rgba(0,0,0,0.15)',
        }}
      >
        <div className="flex items-center gap-4">
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-[#FFDAD6] py-4 text-[#93000A] transition-colors hover:bg-[#FFC7C2]"
          >
            <X size={18} strokeWidth={2.25} aria-hidden />
            <span className="text-base font-bold uppercase tracking-[0.025em]">
              {rejectLabel}
            </span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="flex flex-1 flex-col items-center justify-center gap-2 rounded-xl py-4 text-white shadow-[0px_8px_16px_rgba(157,67,0,0.2)] transition-opacity hover:opacity-95"
            style={{
              backgroundImage:
                'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
            }}
          >
            <Check size={20} strokeWidth={2.5} aria-hidden />
            <span className="text-base font-bold uppercase tracking-[0.025em]">
              {verifyLabel}
            </span>
          </button>
        </div>
      </div>
    </div>,
    window.document.body,
  )
}

export default function AdminMerchantDocumentReviewMobilePage({ review }) {
  const navigate = useNavigate()
  const [viewerDoc, setViewerDoc] = useState(null)

  if (!review) return null

  const handleBack = () => {
    if (window.history.length > 1) navigate(-1)
    else navigate('/admin/merchants')
  }

  return (
    <div className="relative flex h-full min-h-0 flex-1 flex-col bg-[#F9F9FA]">
      <header className="sticky top-0 z-20 flex items-center gap-3 bg-white/80 px-5 py-4 shadow-[0px_1px_2px_rgba(26,28,29,0.05)] backdrop-blur-md">
        <button
          type="button"
          onClick={handleBack}
          aria-label="Back"
          className="flex h-8 w-8 items-center justify-center rounded-full text-[#1A1C1D]/60 transition-colors hover:bg-gray-100"
        >
          <ArrowLeft size={16} strokeWidth={2.25} />
        </button>
        <h1 className="text-xl font-bold tracking-[-0.025em] text-[#1A1C1D]">
          {review.pageTitle}
        </h1>
      </header>

      <div className="flex-1 overflow-y-auto px-5 pb-44 pt-6">
        <div className="space-y-6">
          <MerchantHeader merchant={review.merchant} />

          <section className="space-y-4">
            <h3 className="px-1 text-base font-semibold uppercase tracking-[0.05em] text-[#584237]">
              {review.sectionTitle}
            </h3>

            <div className="space-y-4">
              {review.documents.map((doc) => (
                <DocumentCard
                  key={doc.id}
                  doc={doc}
                  onView={(d) => setViewerDoc(d)}
                />
              ))}
            </div>
          </section>
        </div>
      </div>

      {viewerDoc ? (
        <DocumentViewerModal
          document={viewerDoc}
          onClose={() => setViewerDoc(null)}
          rejectLabel={review.rejectLabel}
          verifyLabel={review.verifyLabel}
        />
      ) : null}
    </div>
  )
}
