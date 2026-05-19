import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Bell, Share2 } from 'lucide-react'

export default function MerchantOrderDetailMobileHeader({ displayId, statusBadge }) {
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
            <span className="rounded-full bg-[rgba(139,92,246,0.14)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-[#7C3AED]">
              {statusBadge}
            </span>
          )}
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-1">
        <button
          type="button"
          className="relative flex h-10 w-10 items-center justify-center text-merchant-muted"
          aria-label="Notifications"
        >
          <Bell size={20} strokeWidth={1.75} />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500" aria-hidden />
        </button>
        <button
          type="button"
          className="flex h-10 w-10 items-center justify-center text-merchant-muted"
          aria-label="Share order"
        >
          <Share2 size={20} strokeWidth={1.75} />
        </button>
      </div>
    </header>
  )
}
