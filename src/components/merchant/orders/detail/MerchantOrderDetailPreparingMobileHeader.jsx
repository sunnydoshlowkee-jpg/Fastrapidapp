import { useNavigate } from 'react-router-dom'
import { ArrowLeft, MoreVertical } from 'lucide-react'

export default function MerchantOrderDetailPreparingMobileHeader({ displayId, statusBadge }) {
  const navigate = useNavigate()

  return (
    <header className="flex items-center gap-3 border-b border-merchant-divider bg-merchant-surface px-4 py-3">
      <button
        type="button"
        onClick={() => navigate('/merchant/orders')}
        className="flex h-10 w-10 shrink-0 items-center justify-center text-merchant-ink"
        aria-label="Back to orders"
      >
        <ArrowLeft size={22} strokeWidth={2} />
      </button>

      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <h1 className="truncate text-base font-bold text-merchant-ink">{displayId}</h1>
          {statusBadge && (
            <span className="rounded-full bg-[rgba(230,126,34,0.14)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#E67E22]">
              {statusBadge}
            </span>
          )}
        </div>
      </div>

      <button
        type="button"
        className="flex h-10 w-10 shrink-0 items-center justify-center text-merchant-muted"
        aria-label="More options"
      >
        <MoreVertical size={22} strokeWidth={1.75} />
      </button>
    </header>
  )
}
