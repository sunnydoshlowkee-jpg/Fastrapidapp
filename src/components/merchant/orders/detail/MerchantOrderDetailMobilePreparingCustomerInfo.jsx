import { MapPin, MessageCircle, Phone } from 'lucide-react'

export default function MerchantOrderDetailMobilePreparingCustomerInfo({ customer, delivery }) {
  const phoneHref = customer.phone ? `tel:${customer.phone.replace(/\s/g, '')}` : undefined

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Customer Info</h2>

      <div className="mt-4 flex items-start gap-3">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-merchant-icon-tile text-sm font-bold text-merchant-muted">
          {customer.initials}
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-base font-bold text-merchant-ink">{customer.name}</p>
          {customer.badge && (
            <span className="mt-1 inline-block rounded-full bg-[rgba(230,126,34,0.14)] px-2 py-0.5 text-[10px] font-bold text-[#E67E22]">
              {customer.badge}
            </span>
          )}
        </div>
        <div className="flex shrink-0 gap-2">
          {phoneHref && (
            <a
              href={phoneHref}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-merchant-icon-tile text-merchant-muted"
              aria-label={`Call ${customer.name}`}
            >
              <Phone size={18} strokeWidth={1.75} />
            </a>
          )}
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-merchant-icon-tile text-merchant-muted"
            aria-label={`Message ${customer.name}`}
          >
            <MessageCircle size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <p className="mt-4 flex items-start gap-2 text-sm text-merchant-body">
        <MapPin size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
        {delivery.address}
      </p>

      <div
        className="relative mt-3 h-32 overflow-hidden rounded-xl bg-merchant-icon-tile"
        aria-label="Delivery map preview"
      >
        <div className="absolute inset-0 bg-[linear-gradient(180deg,#e5e7eb_0%,#d1d5db_100%)]" aria-hidden />
        <svg className="absolute inset-0 h-full w-full opacity-40" aria-hidden>
          <pattern id="map-grid" width="24" height="24" patternUnits="userSpaceOnUse">
            <path d="M 24 0 L 0 0 0 24" fill="none" stroke="#9ca3af" strokeWidth="0.5" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#map-grid)" />
        </svg>
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
          <span className="flex h-12 w-10 items-center justify-center">
            <span className="flex h-10 w-8 items-center justify-center rounded-t-full rounded-b-sm bg-merchant-muted shadow-md">
              <span className="mb-1 h-2.5 w-2.5 rounded-full bg-merchant-primary" />
            </span>
          </span>
        </div>
      </div>
    </article>
  )
}
