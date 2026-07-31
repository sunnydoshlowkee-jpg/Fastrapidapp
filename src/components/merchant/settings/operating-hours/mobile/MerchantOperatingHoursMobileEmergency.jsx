import { AlertTriangle, Power } from 'lucide-react'

export default function MerchantOperatingHoursMobileEmergency({
  emergency,
  onClose,
  loading = false,
  storePaused = false,
}) {
  return (
    <section>
      <h2 className="text-base font-bold text-merchant-ink">{emergency.sectionTitle}</h2>

      <div className="mt-3 rounded-lg border border-red-200 bg-red-50/60 p-4">
        <div className="flex items-center gap-2">
          <AlertTriangle size={18} className="shrink-0 text-red-600" strokeWidth={2} aria-hidden />
          <h3 className="text-sm font-bold text-red-600">{emergency.title}</h3>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-merchant-body">{emergency.description}</p>

        <button
          type="button"
          onClick={onClose}
          disabled={loading || storePaused}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg bg-[#991B1B] px-4 py-3 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-60"
        >
          <Power size={18} strokeWidth={2} aria-hidden />
          {storePaused ? 'Store already paused' : loading ? 'Closing…' : emergency.buttonLabel}
        </button>
      </div>
    </section>
  )
}
