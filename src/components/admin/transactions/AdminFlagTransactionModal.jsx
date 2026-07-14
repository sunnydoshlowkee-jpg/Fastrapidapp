import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Flag, Gavel, X } from 'lucide-react'
import { ADMIN_FLAG_TRANSACTION_MODAL } from '../../../services/data/adminFlagTransactionModal.mock'

export default function AdminFlagTransactionModal({
  isOpen,
  onClose,
  transactionId,
  onConfirm,
}) {
  const data = ADMIN_FLAG_TRANSACTION_MODAL
  const [reasonId, setReasonId] = useState(data.defaultReasonId)
  const [note, setNote] = useState('')
  const [escalate, setEscalate] = useState(data.escalate.defaultOn)

  useEffect(() => {
    if (!isOpen) return
    setReasonId(data.defaultReasonId)
    setNote('')
    setEscalate(data.escalate.defaultOn)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen, data.defaultReasonId, data.escalate.defaultOn])

  if (!isOpen) return null

  const handleConfirm = () => {
    onConfirm?.({
      transactionId,
      reasonId,
      note: note.trim(),
      escalate,
    })
    onClose()
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
        aria-labelledby="flag-transaction-title"
        className="relative w-full max-w-lg rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-center gap-2">
            <Flag size={20} className="shrink-0 text-red-500" strokeWidth={2} aria-hidden />
            <h2 id="flag-transaction-title" className="text-lg font-bold text-gray-900">
              {data.title}
            </h2>
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

        <div className="space-y-6 px-6 py-5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {data.reasonLabel}
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {data.reasons.map((reason) => {
                const isSelected = reasonId === reason.id
                return (
                  <button
                    key={reason.id}
                    type="button"
                    onClick={() => setReasonId(reason.id)}
                    className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isSelected
                        ? 'bg-lime-300 text-emerald-900'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {reason.label}
                  </button>
                )
              })}
            </div>
          </div>

          <div>
            <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400">
              {data.noteLabel}
            </p>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={data.notePlaceholder}
              rows={4}
              className="mt-3 w-full resize-none rounded-t-lg border-0 border-b-2 border-amber-900/70 bg-gray-100 px-0 py-3 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-amber-900 focus:ring-0"
            />
          </div>

          <div className="flex items-center justify-between gap-4 rounded-lg bg-gray-100 px-4 py-4">
            <div>
              <p className="text-sm font-bold text-gray-900">{data.escalate.title}</p>
              <p className="mt-0.5 text-xs text-gray-500">{data.escalate.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={escalate}
              onClick={() => setEscalate((v) => !v)}
              className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${
                escalate ? 'bg-rapid-orange' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  escalate ? 'left-[1.35rem]' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200"
          >
            {data.cancelLabel}
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Gavel size={16} strokeWidth={2} aria-hidden />
            {data.confirmLabel}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  )
}
