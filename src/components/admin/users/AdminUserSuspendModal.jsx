import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { ChevronDown, PauseCircle, X } from 'lucide-react'

export default function AdminUserSuspendModal({ isOpen, onClose, config }) {
  const [infractionId, setInfractionId] = useState(
    config?.defaultInfractionId ?? config?.infractions?.[0]?.id ?? null,
  )
  const [durationId, setDurationId] = useState(
    config?.defaultDurationId ?? config?.durations?.[0]?.id ?? null,
  )
  const [notify, setNotify] = useState(true)

  useEffect(() => {
    if (!isOpen) return undefined
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
        <header className="flex items-start justify-between gap-4 bg-gray-100 px-6 py-4">
          <div>
            <h2 className="text-base font-bold text-gray-900">{config.title}</h2>
            <p className="mt-1 text-xs font-medium text-gray-500">
              {config.targetLabel}
            </p>
          </div>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="rounded-md p-1 text-gray-400 transition-colors hover:bg-gray-200 hover:text-gray-700"
          >
            <X size={16} strokeWidth={2} />
          </button>
        </header>

        <div className="space-y-5 px-6 py-5">
          <fieldset>
            <legend className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {config.infractionLabel}
            </legend>
            <div className="mt-2 flex flex-wrap gap-2">
              {config.infractions.map((opt) => {
                const isActive = infractionId === opt.id
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => setInfractionId(opt.id)}
                    className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors ${
                      isActive
                        ? 'bg-violet-200 text-violet-800 ring-1 ring-violet-300'
                        : 'bg-gray-100 text-gray-700 ring-1 ring-gray-200 hover:bg-gray-200'
                    }`}
                  >
                    {opt.label}
                  </button>
                )
              })}
            </div>
          </fieldset>

          <div>
            <label className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {config.durationLabel}
            </label>
            <div className="relative mt-2">
              <select
                value={durationId}
                onChange={(e) => setDurationId(e.target.value)}
                className="w-full appearance-none rounded-lg bg-gray-100 px-3 py-2.5 pr-9 text-sm font-medium text-gray-800 outline-none ring-1 ring-gray-200 focus:bg-white focus:ring-2 focus:ring-rapid-orange/30"
              >
                {config.durations.map((d) => (
                  <option key={d.id} value={d.id}>
                    {d.label}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                aria-hidden
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-sm font-bold text-gray-900">{config.notifyLabel}</p>
              <p className="text-xs text-gray-500">{config.notifyDescription}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={notify}
              onClick={() => setNotify((v) => !v)}
              className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
                notify ? 'bg-rapid-orange' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform ${
                  notify ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
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
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <PauseCircle size={16} strokeWidth={2} aria-hidden />
            {config.submitLabel}
          </button>
        </footer>
      </div>
    </div>,
    document.body,
  )
}
