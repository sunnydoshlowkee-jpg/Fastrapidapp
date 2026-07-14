import { Info, MapPin, MessageCircle, Phone } from 'lucide-react'

export default function MerchantOrderDetailPreparingSidebar({ customer, delivery }) {
  const phoneHref = customer.phone ? `tel:${customer.phone.replace(/\s/g, '')}` : undefined

  return (
    <aside className="flex flex-col gap-4">
      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
        <div className="flex items-center gap-3">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-merchant-nav-active text-sm font-bold text-merchant-primary">
            {customer.initials}
          </span>
          <div className="min-w-0">
            <p className="text-base font-bold text-merchant-ink">{customer.name}</p>
            <p className="text-sm text-merchant-muted">{customer.subtext}</p>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          {phoneHref && (
            <a
              href={phoneHref}
              className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-merchant-divider bg-merchant-surface py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
            >
              <Phone size={16} strokeWidth={1.75} aria-hidden />
              Call
            </a>
          )}
          <button
            type="button"
            className="flex flex-1 items-center justify-center gap-2 rounded-lg border border-merchant-divider bg-merchant-surface py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
          >
            <MessageCircle size={16} strokeWidth={1.75} aria-hidden />
            Message
          </button>
        </div>
      </article>

      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
        <h3 className="text-sm font-semibold text-merchant-ink">Delivery details</h3>
        <p className="mt-3 flex items-start gap-2 text-sm text-merchant-body">
          <MapPin size={16} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
          {delivery.address}
        </p>

        <div
          className="relative mt-4 h-28 overflow-hidden rounded-lg bg-merchant-icon-tile"
          aria-hidden
        >
          <div className="absolute inset-0 bg-[linear-gradient(135deg,#e5e7eb_0%,#d1d5db_50%,#9ca3af_100%)]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
            <MapPin size={24} className="text-merchant-primary" strokeWidth={2} />
          </div>
        </div>

        <div className="mt-4 flex gap-2 rounded-lg bg-[rgba(230,126,34,0.1)] p-3">
          <Info size={18} className="mt-0.5 shrink-0 text-[#E67E22]" aria-hidden />
          <p className="text-sm text-merchant-body">{delivery.instructions}</p>
        </div>
      </article>
    </aside>
  )
}
