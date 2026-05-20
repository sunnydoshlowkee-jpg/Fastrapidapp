import { Crosshair, MapPin } from 'lucide-react'

export default function MerchantOnboardingLocationHoursMap({ map }) {
  return (
    <div className="relative mt-4 overflow-hidden rounded-lg border border-merchant-divider bg-[#e8eaef]">
      <div
        className="h-40 w-full sm:h-44"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      >
        <div className="flex h-full items-center justify-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-merchant-primary text-white shadow-lg">
            <MapPin size={20} strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>

      <button
        type="button"
        className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-merchant-surface px-4 py-2.5 text-sm font-semibold text-merchant-ink shadow-merchant-stat transition-colors hover:bg-merchant-input"
      >
        <Crosshair size={16} className="text-merchant-primary" strokeWidth={2} aria-hidden />
        {map.confirmLabel}
      </button>
    </div>
  )
}
