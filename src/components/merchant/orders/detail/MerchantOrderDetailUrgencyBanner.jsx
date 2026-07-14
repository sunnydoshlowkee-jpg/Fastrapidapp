import { Timer } from 'lucide-react'
import useRespondCountdown from './useRespondCountdown'

export default function MerchantOrderDetailUrgencyBanner({ respondWithinSeconds }) {
  const { label, percent, expired } = useRespondCountdown(respondWithinSeconds)

  return (
    <div className="overflow-hidden rounded-xl border border-red-100 bg-[#FEF2F2]">
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-5">
        <p className={`flex items-center gap-2 text-sm font-bold ${expired ? 'text-merchant-muted' : 'text-red-600'}`}>
          <Timer size={18} strokeWidth={2} aria-hidden />
          {label}
        </p>
        <p className="shrink-0 text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          Urgent fulfillment
        </p>
      </div>
      <div className="h-1 bg-red-100">
        <div
          className={`h-full transition-all duration-1000 ${expired ? 'bg-merchant-muted' : 'bg-red-500'}`}
          style={{ width: `${percent}%` }}
          role="progressbar"
          aria-valuenow={Math.round(percent)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  )
}
