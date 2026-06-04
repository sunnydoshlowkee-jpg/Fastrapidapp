import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Check, CheckCircle2, X } from 'lucide-react'
import { ADMIN_APPROVE_MERCHANT_MODAL } from '../../../services/data/adminMerchants.mock'

export default function AdminApproveMerchantModal({
  isOpen,
  onClose,
  merchant,
  onConfirm,
}) {
  const data = ADMIN_APPROVE_MERCHANT_MODAL
  const [notify, setNotify] = useState(data.notify.defaultOn)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    setNotify(data.notify.defaultOn)
    setError('')
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen, data.notify.defaultOn])

  if (!isOpen || !merchant) return null

  const handleConfirm = async () => {
    if (!merchant.numericId || submitting) return

    setSubmitting(true)
    setError('')
    try {
      await onConfirm?.({ merchantId: merchant.numericId, notify })
      onClose()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to approve merchant. Please try again.',
      )
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button
        type="button"
        className="absolute inset-0 bg-black/50"
        aria-label="Close modal"
        onClick={onClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="approve-merchant-title"
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <CheckCircle2 size={22} strokeWidth={2.5} aria-hidden />
            </span>
            <div>
              <h2 id="approve-merchant-title" className="text-base font-bold text-gray-900">
                {data.title}
              </h2>
              <p className="text-sm text-gray-500">{merchant.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          <section className="rounded-xl bg-gray-50 px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {data.summaryTitle}
              </h3>
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {data.idLabel}:{' '}
                <span className="text-gray-800">{merchant.id}</span>
              </p>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-xs text-gray-500">{data.entityTypeLabel}</p>
                <p className="font-bold text-gray-900">{merchant.entityType}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">{data.riskScoreLabel}</p>
                <p className={`font-bold ${merchant.riskTone ?? 'text-emerald-600'}`}>
                  {merchant.riskScore}
                </p>
              </div>
            </div>

            <div className="mt-3">
              <p className="text-xs text-gray-500">{data.primaryContactLabel}</p>
              <p className="text-sm font-bold text-gray-900">
                {merchant.contactName}
                <span className="font-normal text-gray-500"> · {merchant.contactEmail}</span>
              </p>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {data.checklistTitle}
            </h3>
            <ul className="mt-3 space-y-2.5">
              {data.checklist.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-gray-800">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded bg-emerald-500 text-white">
                    <Check size={14} strokeWidth={3} aria-hidden />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section className="flex items-center justify-between gap-4 border-t border-gray-100 pt-4">
            <div>
              <p className="text-sm font-bold text-gray-900">{data.notify.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{data.notify.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              onClick={() => setNotify((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                notify ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  notify ? 'left-[1.35rem]' : 'left-0.5'
                }`}
              />
            </button>
          </section>
        </div>

        {error ? (
          <p
            role="alert"
            className="border-t border-red-100 bg-red-50 px-6 py-3 text-sm text-red-700"
          >
            {error}
          </p>
        ) : null}

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={submitting}
            className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200 disabled:opacity-60"
          >
            {data.cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-emerald-500 px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <CheckCircle2 size={16} strokeWidth={2.5} aria-hidden />
            {submitting ? 'Approving…' : data.confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
