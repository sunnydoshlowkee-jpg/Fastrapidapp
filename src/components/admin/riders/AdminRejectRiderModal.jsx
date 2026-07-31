import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Ban, X } from 'lucide-react'

export default function AdminRejectRiderModal({ isOpen, onClose, rider, onConfirm }) {
  const [reason, setReason] = useState('')
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    setReason('')
    setError('')
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen || !rider) return null

  const canConfirm = reason.trim().length >= 8

  const handleConfirm = async () => {
    if (!canConfirm || submitting) return
    setSubmitting(true)
    setError('')
    try {
      await onConfirm?.(reason.trim())
      onClose()
    } catch (err) {
      setError(err.response?.data?.message || err.message || 'Unable to reject rider.')
    } finally {
      setSubmitting(false)
    }
  }

  return createPortal(
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <button type="button" className="absolute inset-0 bg-black/50" aria-label="Close" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="reject-rider-title"
        className="relative w-full max-w-md rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-rose-100 text-red-600">
              <Ban size={20} strokeWidth={2.5} aria-hidden />
            </span>
            <div>
              <h2 id="reject-rider-title" className="text-lg font-bold text-gray-900">
                Reject rider
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                {rider.name || rider.fullName || 'This rider'} will be notified with your reason.
              </p>
            </div>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1 text-gray-400 hover:bg-gray-100">
            <X size={18} />
          </button>
        </div>

        <div className="space-y-3 px-6 py-5">
          <label className="block text-sm font-semibold text-gray-700" htmlFor="rider-reject-reason">
            Rejection reason
          </label>
          <textarea
            id="rider-reject-reason"
            rows={4}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            placeholder="Explain which documents failed or what must be corrected…"
            className="w-full rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
          />
          <p className="text-xs text-gray-400">Minimum 8 characters. This is recorded for compliance.</p>
          {error ? (
            <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
          ) : null}
        </div>

        <div className="flex justify-end gap-2 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-gray-700"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={!canConfirm || submitting}
            onClick={handleConfirm}
            className="rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
          >
            {submitting ? 'Rejecting…' : 'Reject rider'}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
