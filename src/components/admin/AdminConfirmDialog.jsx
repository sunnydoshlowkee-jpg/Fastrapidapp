import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { X } from 'lucide-react'

const TONE_STYLES = {
  primary: {
    iconWrap: 'bg-rapid-orange text-white',
    confirm:
      'bg-rapid-orange text-white shadow-sm hover:bg-rapid-orange/90',
  },
  danger: {
    iconWrap: 'bg-red-100 text-red-600',
    confirm:
      'border border-red-200 bg-white text-red-600 hover:bg-red-50',
  },
}

/**
 * Lightweight confirmation dialog for admin flows (replaces window.confirm).
 */
export default function AdminConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  subtitle,
  cancelLabel = 'Cancel',
  confirmLabel = 'Confirm',
  tone = 'primary',
  loading = false,
  icon: Icon,
}) {
  useEffect(() => {
    if (!isOpen) return undefined
    const onKey = (e) => {
      if (e.key === 'Escape' && !loading) onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, loading, onClose])

  if (!isOpen) return null

  const styles = TONE_STYLES[tone] ?? TONE_STYLES.primary

  return createPortal(
    <div
      className="fixed inset-0 z-[1100] flex items-center justify-center bg-gray-900/60 px-4 py-6"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-confirm-dialog-title"
      onClick={loading ? undefined : onClose}
    >
      <div
        className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 px-6 pt-6">
          <div className="flex items-start gap-3">
            {Icon ? (
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${styles.iconWrap}`}
              >
                <Icon size={20} strokeWidth={2.25} aria-hidden />
              </span>
            ) : null}
            <div>
              <h2
                id="admin-confirm-dialog-title"
                className="text-base font-bold text-gray-900"
              >
                {title}
              </h2>
              {subtitle ? (
                <p className="mt-0.5 text-sm text-gray-500">{subtitle}</p>
              ) : null}
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            aria-label="Close"
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-700 disabled:opacity-50"
          >
            <X size={20} strokeWidth={2} />
          </button>
        </div>

        {description ? (
          <p className="px-6 pb-2 text-sm leading-relaxed text-gray-600">
            {description}
          </p>
        ) : null}

        <footer className="flex justify-end gap-3 border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="rounded-lg bg-gray-100 px-5 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200 disabled:opacity-60"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={onConfirm}
            disabled={loading}
            className={`inline-flex items-center justify-center rounded-lg px-5 py-2 text-sm font-bold transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${styles.confirm}`}
          >
            {loading ? 'Please wait…' : confirmLabel}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
