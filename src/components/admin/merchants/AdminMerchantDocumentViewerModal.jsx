import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import {
  Building2,
  Flag,
  Minus,
  Plus,
  Printer,
  CheckCircle2,
  PenTool,
  X,
} from 'lucide-react'
import AdminConfirmDialog from '../AdminConfirmDialog'
import { ADMIN_MERCHANT_DETAIL_UI } from '../../../services/data/adminMerchantDetail.ui'
import {
  openAdminDocumentFile,
  updateAdminMerchantDocument,
} from '../../../services/adminMerchantsService'

const STATUS_CONFIRM_COPY = ADMIN_MERCHANT_DETAIL_UI.documents.statusConfirm

const STATUS_BADGE = {
  verified: 'bg-emerald-50 text-emerald-600',
  in_review: 'bg-violet-50 text-violet-600',
  rejected: 'bg-red-50 text-red-600',
  pending: 'bg-gray-100 text-gray-600',
}

function renderInlineBold(text) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return (
        <strong key={i} className="font-bold text-gray-900">
          {part.slice(2, -2)}
        </strong>
      )
    }
    return <span key={i}>{part}</span>
  })
}

export default function AdminMerchantDocumentViewerModal({
  document: doc,
  merchantId,
  onClose,
  onDocumentUpdated,
}) {
  const [zoom, setZoom] = useState(100)
  const [openingFile, setOpeningFile] = useState(false)
  const [fileError, setFileError] = useState('')
  const [actionError, setActionError] = useState('')
  const [updatingStatus, setUpdatingStatus] = useState(null)
  const [pendingStatus, setPendingStatus] = useState(null)

  const handleOpenFile = async () => {
    const fileUrl = doc.preview?.fileUrl || doc.fileUrl
    if (!fileUrl) return

    setOpeningFile(true)
    setFileError('')
    try {
      await openAdminDocumentFile(fileUrl)
    } catch (err) {
      setFileError(err.message || 'Unable to open file.')
    } finally {
      setOpeningFile(false)
    }
  }

  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = original
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const decZoom = () => setZoom((z) => Math.max(50, z - 10))
  const incZoom = () => setZoom((z) => Math.min(200, z + 10))

  const documentType =
    doc.documentType ?? String(doc.id ?? '').replace(/^doc-/, '')

  const handleConfirmStatusUpdate = async () => {
    if (!merchantId || !documentType || !pendingStatus) return

    setUpdatingStatus(pendingStatus)
    setActionError('')
    try {
      const updated = await updateAdminMerchantDocument(
        merchantId,
        documentType,
        pendingStatus,
      )
      onDocumentUpdated?.(updated)
      setPendingStatus(null)
    } catch (err) {
      setActionError(
        err.response?.data?.message ||
          err.message ||
          'Unable to update document status.',
      )
    } finally {
      setUpdatingStatus(null)
    }
  }

  const isBusy = updatingStatus !== null
  const confirmCopy =
    pendingStatus === 'approved'
      ? STATUS_CONFIRM_COPY.verify
      : pendingStatus === 'rejected'
        ? STATUS_CONFIRM_COPY.flag
        : null

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-900/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={`${doc.title} preview`}
      onClick={onClose}
    >
      <div
        className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 border-b border-gray-100 px-6 py-4">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="truncate text-sm font-bold text-gray-900">
                {doc.title}
              </h2>
              <span
                className={`inline-flex rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                  STATUS_BADGE[doc.status] ?? STATUS_BADGE.pending
                }`}
              >
                {doc.statusLabel}
              </span>
            </div>
            <p className="mt-1 text-xs font-medium text-gray-500">
              Uploaded by {doc.uploadedBy} • {doc.size} {doc.fileType}
            </p>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-1.5">
              <button
                type="button"
                onClick={decZoom}
                aria-label="Zoom out"
                className="rounded-md p-1 text-gray-500 transition-colors hover:bg-white hover:text-gray-900"
              >
                <Minus size={14} strokeWidth={2.5} />
              </button>
              <span className="min-w-[2.5rem] text-center text-xs font-semibold text-gray-700">
                {zoom}%
              </span>
              <button
                type="button"
                onClick={incZoom}
                aria-label="Zoom in"
                className="rounded-md p-1 text-gray-500 transition-colors hover:bg-white hover:text-gray-900"
              >
                <Plus size={14} strokeWidth={2.5} />
              </button>
            </div>

            <button
              type="button"
              aria-label="Print document"
              className="rounded-md p-2 text-gray-500 transition-colors hover:bg-gray-100 hover:text-gray-900"
            >
              <Printer size={16} strokeWidth={2} />
            </button>

            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            >
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-auto bg-gray-50 px-6 py-6">
          <div
            className="mx-auto origin-top bg-white px-10 py-12 shadow-sm"
            style={{
              width: 'min(100%, 480px)',
              transform: `scale(${zoom / 100})`,
              transformOrigin: 'top center',
            }}
          >
            <div className="flex items-start gap-3">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-700">
                <Building2 size={22} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="text-base font-bold tracking-tight text-gray-900">
                  {doc.preview.issuer}
                </p>
                {doc.preview.issuerSub.map((line) => (
                  <p
                    key={line}
                    className="text-sm font-medium text-gray-600"
                  >
                    {line}
                  </p>
                ))}
              </div>
            </div>

            <h3 className="mt-8 whitespace-pre-line text-center text-xl font-bold tracking-tight text-gray-900">
              {doc.preview.heading}
            </h3>

            <div className="mt-6 space-y-4 text-sm leading-relaxed text-gray-700">
              {doc.preview.paragraphs.map((p, i) => (
                <p key={i}>{renderInlineBold(p)}</p>
              ))}
            </div>

            <div className="mt-12 flex flex-col items-end">
              <PenTool size={20} className="text-gray-400" aria-hidden />
              <div className="mt-2 w-32 border-t border-gray-300" />
              <p className="mt-1 text-xs font-semibold text-gray-500">
                {doc.preview.signature}
              </p>
            </div>
          </div>
        </div>

        {fileError || actionError ? (
          <p
            role="alert"
            className="border-t border-red-100 bg-red-50 px-6 py-2 text-center text-sm text-red-700"
          >
            {fileError || actionError}
          </p>
        ) : null}

        <footer className="flex flex-wrap items-center justify-center gap-3 border-t border-gray-100 px-6 py-4">
          {doc.preview?.fileUrl || doc.fileUrl ? (
            <button
              type="button"
              onClick={handleOpenFile}
              disabled={openingFile}
              className="inline-flex items-center rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-50 disabled:opacity-60"
            >
              {openingFile ? 'Opening…' : 'Open original file'}
            </button>
          ) : null}
          <button
            type="button"
            disabled={isBusy || doc.status === 'rejected'}
            onClick={() => setPendingStatus('rejected')}
            className="inline-flex items-center gap-2 rounded-lg border border-red-200 bg-white px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Flag size={16} strokeWidth={2} aria-hidden />
            {updatingStatus === 'rejected' ? 'Saving…' : 'Flag Issue'}
          </button>
          <button
            type="button"
            disabled={isBusy || doc.status === 'verified'}
            onClick={() => setPendingStatus('approved')}
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-rapid-orange/90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCircle2 size={16} strokeWidth={2} aria-hidden />
            {updatingStatus === 'approved' ? 'Saving…' : 'Mark Verified'}
          </button>
        </footer>
      </div>

      <AdminConfirmDialog
        isOpen={pendingStatus !== null}
        onClose={() => {
          if (!isBusy) setPendingStatus(null)
        }}
        onConfirm={handleConfirmStatusUpdate}
        title={confirmCopy?.title ?? ''}
        description={confirmCopy?.description}
        subtitle={doc.title}
        cancelLabel={confirmCopy?.cancelLabel}
        confirmLabel={confirmCopy?.confirmLabel}
        tone={pendingStatus === 'rejected' ? 'danger' : 'primary'}
        loading={isBusy}
        icon={pendingStatus === 'rejected' ? Flag : CheckCircle2}
      />
    </div>,
    document.body,
  )
}
