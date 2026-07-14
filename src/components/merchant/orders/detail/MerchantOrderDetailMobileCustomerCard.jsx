import { BadgeCheck, MapPin, User } from 'lucide-react'

export default function MerchantOrderDetailMobileCustomerCard({ customer }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
        Customer details
      </p>

      <div className="mt-3 flex gap-3">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-merchant-icon-tile">
          {customer.avatarUrl ? (
            <img src={customer.avatarUrl} alt="" className="h-full w-full object-cover" />
          ) : (
            <User size={24} className="text-merchant-muted" strokeWidth={1.5} aria-hidden />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="flex flex-wrap items-center gap-1.5 text-base font-bold text-merchant-ink">
            {customer.name}
            <BadgeCheck size={16} className="text-merchant-primary" aria-label="Verified" />
          </p>
          <p className="mt-0.5 text-xs text-merchant-muted">{customer.memberSince}</p>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-sm text-merchant-body">
        <MapPin size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
        {customer.address}
      </p>

      <div className="mt-3 rounded-lg bg-merchant-input p-3">
        <p className="text-sm text-merchant-body">&ldquo;{customer.instructions}&rdquo;</p>
      </div>

      <div
        className="relative mt-4 h-36 overflow-hidden rounded-xl"
        aria-label="Delivery location map"
      >
        <div
          className="absolute inset-0 bg-[linear-gradient(160deg,#0f172a_0%,#1e293b_40%,#0f766e_100%)]"
          aria-hidden
        />
        <div className="absolute inset-0 opacity-20" aria-hidden>
          <svg className="h-full w-full" viewBox="0 0 320 144" preserveAspectRatio="none">
            <path d="M0 80 L80 60 L160 70 L240 50 L320 65 L320 144 L0 144 Z" fill="rgba(255,255,255,0.15)" />
          </svg>
        </div>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute h-10 w-10 animate-pulse rounded-full bg-blue-400/30" aria-hidden />
            <span className="relative flex h-8 w-8 items-center justify-center rounded-full bg-merchant-primary text-white shadow-lg ring-4 ring-blue-400/40">
              <MapPin size={16} strokeWidth={2.5} aria-hidden />
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
