import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { AlertTriangle, Ban, Octagon, X } from 'lucide-react'

export default function AdminUserBanModal({ isOpen, onClose, config, onSubmit, submitting = false }) {
  const [evidence, setEvidence] = useState('')
  const [confirmation, setConfirmation] = useState('')

  useEffect(() => {
    if (!isOpen) return undefined
    setEvidence('')
    setConfirmation('')
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
  }, [isOpen, onClose])

  if (!isOpen || !config) return null

  const canConfirm =
    confirmation.trim().toUpperCase() === (config.confirmWord ?? 'BAN')

  return createPortal(
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center bg-gray-900/50 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-label={config.title}
      onClick={onClose}
    >
      <div
        className="w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <header className="flex items-start justify-between gap-4 bg-red-50 px-6 py-4">
          <div className="flex items-start gap-2">
            <AlertTriangle
              size={18}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-red-600"
              aria-hidden
            />
            <div>
              <h2 className="text-base font-bold text-red-700">{config.title}</h2>
              <p className="mt-1 text-xs font-medium text-red-500/80">
                {config.targetLabel}
              </p>
            </div>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1 text-red-400 transition-colors hover:bg-red-100 hover:text-red-700"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </header>

        <div className="space-y-5 px-6 py-5">
          <div className="flex items-start gap-3 rounded-lg bg-red-50 px-4 py-3 ring-1 ring-red-100">
            <Octagon
              size={18}
              strokeWidth={2}
              className="mt-0.5 shrink-0 text-red-600"
              aria-hidden
            />
            <p className="text-xs leading-relaxed text-red-700">{config.warning}</p>
          </div>

          <div>
            <label
              htmlFor="ban-evidence"
              className="text-[11px] font-bold uppercase tracking-wider text-gray-500"
            >
              {config.evidenceLabel}
            </label>
            <textarea
              id="ban-evidence"
              value={evidence}
              onChange={(e) => setEvidence(e.target.value)}
              rows={3}
              placeholder={config.evidencePlaceholder}
              className="mt-2 w-full resize-none rounded-lg bg-gray-100 px-3 py-2.5 text-sm text-gray-800 outline-none ring-1 ring-gray-200 placeholder:text-gray-500 focus:bg-white focus:ring-2 focus:ring-red-300"
            />
          </div>

          <div>
            <label
              htmlFor="ban-confirm"
              className="text-[11px] font-bold uppercase tracking-wider text-gray-500"
            >
              {config.confirmLabel}
            </label>
            <input
              id="ban-confirm"
              type="text"
              value={confirmation}
              onChange={(e) => setConfirmation(e.target.value)}
              placeholder={config.confirmPlaceholder}
              className="mt-2 w-full rounded-lg bg-white px-3 py-2.5 text-sm font-bold uppercase tracking-wider text-red-700 outline-none ring-1 ring-red-300 placeholder:font-bold placeholder:text-red-300 focus:ring-2 focus:ring-red-400"
            />
          </div>
        </div>

        <footer className="flex items-center justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            {config.cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => onSubmit?.({ status: 'banned', confirmation })}
            disabled={!canConfirm || submitting}
            className="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Ban size={16} strokeWidth={2.25} aria-hidden />
            {submitting ? 'Saving…' : config.submitLabel}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
