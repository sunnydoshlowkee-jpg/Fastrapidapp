import { createPortal } from 'react-dom'
import { useEffect } from 'react'
import { BadgeCheck, Check, MapPin, Phone, User, X } from 'lucide-react'

function lineItemMobileLabel(item) {
  const m = item.units.match(/x(\d+)/i)
  const qty = m ? m[1] : '1'
  return `${qty}x ${item.name}`
}

export default function MerchantIncomingOrderDrawer({
  isOpen,
  order,
  onClose,
  onAccept,
  onReject,
}) {
  useEffect(() => {
    if (!isOpen) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [isOpen])

  if (!isOpen || !order) return null

  const phoneHref = order.customer.phone ? `tel:${order.customer.phone.replace(/\s/g, '')}` : undefined

  const content = (
    <div className="fixed inset-0 z-[100] flex flex-col justify-end lg:flex-row lg:justify-end">
      <button
        type="button"
        className="absolute inset-0 bg-black/50 transition-opacity"
        aria-label="Close incoming order"
        onClick={onClose}
      />

      <aside
        className="relative flex max-h-[min(92vh,calc(100dvh-1rem))] w-full flex-col overflow-hidden rounded-t-2xl bg-merchant-surface shadow-2xl lg:h-full lg:max-h-none lg:max-w-md lg:rounded-l-2xl lg:rounded-tr-none"
        role="dialog"
        aria-modal="true"
        aria-label="New incoming order"
      >
        {/* —— Mobile bottom sheet [Figma 622:2] —— */}
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden lg:hidden">
          <div className="flex shrink-0 flex-col items-center pt-2">
            <div className="h-1 w-10 shrink-0 rounded-full bg-merchant-divider" aria-hidden />
          </div>

          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-4 pb-2 pt-3">
            <div className="flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-red-500 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white">
                New
              </span>
              <p className="text-[15px] font-semibold text-merchant-ink">{order.eyebrow}</p>
            </div>

            <div className="mt-3 flex items-start justify-between gap-3">
              <h2 className="text-lg font-bold leading-tight text-merchant-ink">{order.orderNumber}</h2>
              <p className="max-w-[55%] shrink-0 text-right text-xs font-medium leading-snug text-red-600">
                {order.statusLine}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3 rounded-xl bg-merchant-input p-3.5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-merchant-primary text-white">
                {order.customer.avatarUrl ? (
                  <img src={order.customer.avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <User size={22} strokeWidth={1.75} aria-hidden />
                )}
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-bold text-merchant-ink">{order.customer.name}</p>
                <p className="mt-0.5 flex items-start gap-1 text-xs text-merchant-muted">
                  <MapPin size={14} className="mt-0.5 shrink-0" aria-hidden />
                  {order.customer.location}
                </p>
              </div>
              {phoneHref ? (
                <a
                  href={phoneHref}
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white text-merchant-primary shadow-sm ring-1 ring-black/5 transition-colors hover:bg-merchant-nav-active"
                  aria-label={`Call ${order.customer.name}`}
                >
                  <Phone size={18} strokeWidth={2} aria-hidden />
                </a>
              ) : null}
            </div>

            <h3 className="mt-5 text-sm font-bold text-merchant-ink">Order Summary</h3>
            <ul className="mt-2 flex flex-col gap-2">
              {order.lineItems.map((item) => (
                <li key={item.id} className="flex items-start justify-between gap-3 text-sm">
                  <span className="font-medium text-merchant-ink">{lineItemMobileLabel(item)}</span>
                  <span className="shrink-0 font-semibold tabular-nums text-merchant-ink">{item.price}</span>
                </li>
              ))}
            </ul>

            <div className="my-4 h-px bg-merchant-divider" />

            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-merchant-muted">Subtotal</span>
                <span className="font-medium tabular-nums text-merchant-muted">{order.subtotal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-merchant-muted">Delivery Fee</span>
                <span className="font-medium tabular-nums text-merchant-muted">{order.deliveryFee}</span>
              </div>
              <div className="flex justify-between font-medium">
                <span className="text-red-600">Commission</span>
                <span className="tabular-nums text-red-600">{order.commission}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between rounded-xl bg-merchant-input px-4 py-3.5">
              <span className="text-sm font-bold text-merchant-ink">Merchant Payout</span>
              <span className="text-lg font-bold tabular-nums text-merchant-ink">{order.merchantPayout}</span>
            </div>
          </div>

          <div className="shrink-0 space-y-2.5 border-t border-merchant-divider bg-merchant-surface px-4 pb-[max(1rem,env(safe-area-inset-bottom))] pt-3">
            <button
              type="button"
              onClick={onAccept}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
            >
              <Check size={18} strokeWidth={2.5} aria-hidden />
              Accept Order
            </button>
            <button
              type="button"
              onClick={onReject}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-merchant-input py-3.5 text-sm font-semibold text-red-600 transition-colors hover:bg-merchant-icon-tile"
            >
              <X size={18} strokeWidth={2.5} aria-hidden />
              Reject Order
            </button>
          </div>
        </div>

        {/* —— Desktop right drawer [Figma 272:8940] —— */}
        <div className="hidden min-h-0 flex-1 flex-col overflow-hidden lg:flex">
          <div className="flex shrink-0 items-start justify-between border-b border-merchant-divider px-5 py-4">
            <button
              type="button"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-merchant-muted transition-colors hover:bg-merchant-input hover:text-merchant-ink"
              aria-label="Close"
            >
              <X size={20} strokeWidth={2} />
            </button>
            <span className="rounded-full bg-red-500 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white">
              New
            </span>
          </div>

          <div className="flex flex-1 flex-col overflow-y-auto px-5 pb-6 pt-2">
            <div className="rounded-xl bg-merchant-input p-4">
              <p className="text-xs font-medium text-merchant-muted">{order.eyebrow}</p>
              <h2 id="incoming-order-title" className="mt-1 text-xl font-bold text-merchant-ink">
                {order.orderNumber}
              </h2>
              <p className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-red-600">
                <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-red-600" aria-hidden />
                {order.statusLine}
              </p>
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
              Customer details
            </p>
            <div className="mt-2 flex gap-3 rounded-xl bg-merchant-input p-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-full bg-merchant-primary text-white">
                {order.customer.avatarUrl ? (
                  <img src={order.customer.avatarUrl} alt="" className="h-full w-full object-cover" />
                ) : (
                  <User size={22} strokeWidth={1.75} aria-hidden />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-merchant-ink">{order.customer.name}</p>
                <p className="mt-1 flex items-start gap-1.5 text-xs text-merchant-muted">
                  <MapPin size={14} className="mt-0.5 shrink-0 text-merchant-muted" aria-hidden />
                  {order.customer.location}
                </p>
              </div>
            </div>

            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
              Order summary
            </p>
            <ul className="mt-2 flex flex-col gap-4">
              {order.lineItems.map((item) => (
                <li key={item.id} className="flex gap-3">
                  <img
                    src={item.image}
                    alt=""
                    className="h-14 w-14 shrink-0 rounded-lg object-cover"
                  />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-merchant-ink">{item.name}</p>
                    <p className="text-xs text-merchant-muted">{item.units}</p>
                  </div>
                  <p className="shrink-0 text-sm font-semibold text-merchant-ink">{item.price}</p>
                </li>
              ))}
            </ul>

            <div className="mt-6 rounded-xl bg-merchant-input p-4">
              <div className="flex justify-between text-sm">
                <span className="text-merchant-body">Subtotal</span>
                <span className="font-semibold text-merchant-ink">{order.subtotal}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-merchant-body">Delivery Fee</span>
                <span className="font-semibold text-merchant-ink">{order.deliveryFee}</span>
              </div>
              <div className="mt-2 flex justify-between text-sm">
                <span className="text-merchant-body">Commission</span>
                <span className="font-semibold text-red-600">{order.commission}</span>
              </div>
              <div className="mt-4 border-t border-merchant-divider pt-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
                  Merchant payout
                </p>
                <div className="mt-1 flex items-center justify-between gap-2">
                  <p className="text-2xl font-bold text-merchant-primary">{order.merchantPayout}</p>
                  <BadgeCheck
                    size={28}
                    className="shrink-0 text-merchant-primary"
                    strokeWidth={1.75}
                    aria-label="Verified payout"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="shrink-0 space-y-3 border-t border-merchant-divider bg-merchant-surface px-5 py-4">
            <button
              type="button"
              onClick={onAccept}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
            >
              <Check size={18} strokeWidth={2.5} aria-hidden />
              Accept Order
            </button>
            <button
              type="button"
              onClick={onReject}
              className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-red-500 bg-white py-3.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
            >
              <X size={18} strokeWidth={2.5} aria-hidden />
              Reject Order
            </button>
          </div>
        </div>
      </aside>
    </div>
  )

  return createPortal(content, document.body)
}
