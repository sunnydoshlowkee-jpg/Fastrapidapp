import { Sparkles } from 'lucide-react'

export default function MerchantOperatingHoursInstantClose({ instantClose }) {
  return (
    <section className="rounded-merchant-stat bg-[#FEF2F2] p-5 shadow-merchant-stat lg:p-6">
      <div className="flex items-center gap-2">
        <Sparkles size={18} className="shrink-0 text-red-600" strokeWidth={2} aria-hidden />
        <h2 className="text-base font-bold text-red-600">{instantClose.title}</h2>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-red-900/70">{instantClose.description}</p>

      <button
        type="button"
        className="mt-5 w-full rounded-lg bg-[#DC2626] px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#B91C1C]"
      >
        {instantClose.buttonLabel}
      </button>
    </section>
  )
}
