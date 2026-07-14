import { Timer } from 'lucide-react'
import useRespondCountdown from './useRespondCountdown'

export default function MerchantOrderDetailMobileUrgencyBanner({ respondWithinSeconds }) {
  const { label, expired } = useRespondCountdown(respondWithinSeconds)

  return (
    <div
      className={`border-l-4 bg-[#FEF2F2] px-4 py-3 ${
        expired ? 'border-merchant-muted' : 'border-red-600'
      }`}
    >
      <p
        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide ${
          expired ? 'text-merchant-muted' : 'text-red-600'
        }`}
      >
        <Timer size={16} strokeWidth={2} aria-hidden />
        Urgent fulfillment
      </p>
      <p className={`mt-1 text-sm ${expired ? 'text-merchant-muted' : 'text-red-600'}`}>{label}</p>
    </div>
  )
}
