import { MapPin, MessageSquare, Star, User } from 'lucide-react'

export default function MerchantOrderDetailCustomerPanel({ customer }) {
  return (
    <div className="flex flex-col gap-4">
      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
          Customer details
        </p>

        <div className="mt-4 flex gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-merchant-icon-tile text-merchant-muted">
            <User size={24} strokeWidth={1.5} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-base font-bold text-merchant-ink">{customer.name}</p>
            <p className="mt-0.5 text-xs text-merchant-muted">{customer.memberSince}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-[#E67E22]">
              <Star size={14} className="fill-[#E67E22] text-[#E67E22]" aria-hidden />
              {customer.rating}
            </p>
          </div>
        </div>

        <div className="mt-5 space-y-4 border-t border-merchant-divider pt-5">
          <p className="flex items-start gap-2 text-sm text-merchant-body">
            <MapPin size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
            {customer.address}
          </p>
          <div className="rounded-lg bg-merchant-input p-3">
            <p className="flex items-start gap-2 text-sm italic text-merchant-body">
              <MessageSquare size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
              &ldquo;{customer.instructions}&rdquo;
            </p>
          </div>
        </div>
      </article>

      <article
        className="relative h-48 overflow-hidden rounded-merchant-stat shadow-merchant-stat sm:h-56"
        aria-label="Delivery location map"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(135deg,#0d9488_0%,#5eead4_35%,#a7f3d0_60%,#ecfdf5_100%)]"
          aria-hidden
        />
        <div className="absolute inset-0 opacity-30" aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 400 200" preserveAspectRatio="none">
            <path
              d="M0 120 Q80 80 160 100 T320 90 L400 110 L400 200 L0 200 Z"
              fill="rgba(255,255,255,0.4)"
            />
            <path
              d="M0 150 Q100 130 200 140 T400 130 L400 200 L0 200 Z"
              fill="rgba(13,148,136,0.25)"
            />
          </svg>
        </div>
        <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-merchant-primary text-white shadow-lg">
            <MapPin size={20} strokeWidth={2} aria-hidden />
          </span>
        </div>
      </article>
    </div>
  )
}
