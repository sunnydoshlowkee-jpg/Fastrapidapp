import { CheckCircle2 } from 'lucide-react'

export default function MerchantOperatingHoursToast({ message, visible }) {
  if (!visible) return null

  return (
    <div
      role="status"
      className="pointer-events-none fixed bottom-24 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full bg-[#191C1D] px-4 py-2.5 text-sm font-medium text-white shadow-lg lg:bottom-8"
    >
      <CheckCircle2 size={16} className="shrink-0 text-emerald-400" strokeWidth={2} aria-hidden />
      {message}
    </div>
  )
}


