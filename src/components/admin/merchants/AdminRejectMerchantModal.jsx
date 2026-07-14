import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Ban, ChevronDown, Gavel, X } from 'lucide-react'
import { ADMIN_REJECT_MERCHANT_MODAL } from '../../../services/data/adminMerchants.mock'

export default function AdminRejectMerchantModal({
  isOpen,
  onClose,
  merchant,
  onConfirm,
}) {
  const data = ADMIN_REJECT_MERCHANT_MODAL
  const [reasonId, setReasonId] = useState('')
  const [message, setMessage] = useState('')
  const [allowReapply, setAllowReapply] = useState(data.reapply.defaultOn)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    setReasonId('')
    setMessage('')
    setAllowReapply(data.reapply.defaultOn)
    setError('')
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen, data.reapply.defaultOn])

  if (!isOpen || !merchant) return null

  const canConfirm = reasonId !== '' && message.trim().length > 0

  const handleConfirm = async () => {
    if (!canConfirm || !merchant.numericId || submitting) return

    setSubmitting(true)
    setError('')
    try {
      await onConfirm?.({
        merchantId: merchant.numericId,
        reasonId,
        message: message.trim(),
        allowReapply,
      })
      onClose()
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          'Unable to reject merchant. Please try again.',
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
        aria-labelledby="reject-merchant-title"
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-red-600">
              <Ban size={20} strokeWidth={2.5} aria-hidden />
            </span>
            <div>
              <h2 id="reject-merchant-title" className="text-base font-bold text-gray-900">
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
          <section>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {data.reasonLabel}
            </p>
            <div className="relative mt-2">
              <select
                value={reasonId}
                onChange={(e) => setReasonId(e.target.value)}
                className="w-full appearance-none rounded-lg bg-gray-100 px-4 py-3 pr-10 text-sm text-gray-800 outline-none focus:bg-white focus:ring-2 focus:ring-red-500/30"
              >
                <option value="" disabled>
                  {data.reasonPlaceholder}
                </option>
                {data.reasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={18}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </section>

          <section>
            <div className="flex items-baseline justify-between">
              <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
                {data.messageLabel}
              </p>
              <p className="text-xs text-gray-500">{data.messageRequiredLabel}</p>
            </div>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={data.messagePlaceholder}
              rows={4}
              className="mt-2 w-full resize-none rounded-t-lg border-0 border-b-2 border-rose-700/70 bg-gray-100 px-3 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rose-700 focus:ring-0"
            />
          </section>

          <section className="flex items-center justify-between gap-4 rounded-xl bg-gray-50 px-4 py-3">
            <div>
              <p className="text-sm font-bold text-gray-900">{data.reapply.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{data.reapply.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={allowReapply}
              onClick={() => setAllowReapply((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                allowReapply ? 'bg-emerald-500' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  allowReapply ? 'left-[1.35rem]' : 'left-0.5'
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
            disabled={!canConfirm || submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-5 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Gavel size={16} strokeWidth={2.5} aria-hidden />
            {submitting ? 'Rejecting…' : data.confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
