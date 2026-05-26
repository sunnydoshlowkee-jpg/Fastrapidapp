import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ArrowLeft,
  Bike,
  Check,
  Home,
  MapPin,
  MoreHorizontal,
  Phone,
  Star,
  Store,
  User,
} from 'lucide-react'
import { ADMIN_ORDERS_PATH } from '../../../services/data/adminOrders.mock'
import AdminOrderActionsSheet from './AdminOrderActionsSheet'
import AdminOrderReassignRiderSheet from './AdminOrderReassignRiderSheet'
import AdminOrderRefundSheet from './AdminOrderRefundSheet'

const stepIcons = {
  check: Check,
  bike: Bike,
  home: Home,
}

function StepperStep({ step, isLast, isComplete, isActive }) {
  const Icon = stepIcons[step.icon] ?? Check
  const iconColor = isActive
    ? 'text-[#F97316]'
    : isComplete
      ? 'text-[#582200]'
      : 'text-[#584237]'
  const labelColor = isActive
    ? 'font-bold text-[#9D4300]'
    : isComplete
      ? 'font-semibold text-gray-900'
      : 'font-medium text-[#584237]'

  return (
    <li className="relative z-10 flex flex-1 flex-col items-center gap-2 bg-white px-1">
      <span
        className={`flex items-center justify-center rounded-full ${
          isActive
            ? 'h-8 w-8 border-2 border-[#F97316] bg-white shadow-[0px_4px_12px_rgba(249,115,22,0.2)]'
            : isComplete
              ? 'h-6 w-6 bg-[#F97316]'
              : 'h-6 w-6 bg-[#F3F3F4]'
        }`}
      >
        {isComplete ? (
          <Check size={12} strokeWidth={3} className={iconColor} aria-hidden />
        ) : isActive ? (
          <Icon size={14} strokeWidth={2.25} className={iconColor} aria-hidden />
        ) : (
          <Icon size={12} strokeWidth={2} className={iconColor} aria-hidden />
        )}
      </span>
      <span
        className={`text-[10px] uppercase tracking-[0.05em] ${labelColor}`}
      >
        {step.label}
      </span>
    </li>
  )
}

function StatusBadge({ badge }) {
  if (!badge) return null
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-[#BE7BFF] px-2.5 py-1">
      <span className="h-1.5 w-1.5 rounded-full bg-[#842BD2]" aria-hidden />
      <span className="text-xs font-semibold text-[#4C0084]">{badge.label}</span>
    </span>
  )
}

export default function AdminOrderDetailMobilePage({ order }) {
  const { steps, stakeholders, items } = order
  const [actionsOpen, setActionsOpen] = useState(false)
  const [reassignOpen, setReassignOpen] = useState(false)
  const [refundOpen, setRefundOpen] = useState(false)
  const activeIndex = steps.findIndex((s) => s.status === 'active')
  const progressPercent =
    activeIndex > -1
      ? (activeIndex / (steps.length - 1)) * 100
      : 100

  return (
    <div className="relative min-h-full bg-gradient-to-b from-[#F9F9FA] to-[#F9F9FA] pb-28">
      <header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b border-[#E8E8E9] bg-white/80 px-4 py-3 backdrop-blur-md">
        <div className="flex min-w-0 items-center gap-3">
          <Link
            to={ADMIN_ORDERS_PATH}
            aria-label={order.backLabel}
            className="flex h-8 w-8 items-center justify-center rounded-full text-gray-900 transition-colors hover:bg-gray-100"
          >
            <ArrowLeft size={16} strokeWidth={2.25} />
          </Link>
          <h1 className="truncate text-lg font-bold tracking-tight text-gray-900">
            Order #{order.id}
          </h1>
        </div>
        <StatusBadge badge={order.statusBadge} />
      </header>

      <div className="space-y-6 p-4">
        <section className="space-y-1">
          <div className="flex items-end justify-between gap-4">
            <h2 className="text-[36px] font-extrabold leading-[1.25] tracking-[-0.05em] text-gray-900">
              {order.statusLabel}
            </h2>
            <p className="pb-2 text-xs font-medium text-[#584237]">
              {order.estimateLabel}
            </p>
          </div>
          <p className="text-sm text-[#584237]">{order.placedAtMobile}</p>
        </section>

        <section className="rounded-xl bg-white p-5 shadow-[0px_4px_16px_rgba(26,28,29,0.04)]">
          <div className="relative">
            <span
              className="absolute left-3 right-3 top-3 h-1 rounded-full bg-[#F3F3F4]"
              aria-hidden
            />
            <span
              className="absolute left-3 top-3 h-1 rounded-full bg-[#F97316]"
              style={{ width: `calc(${progressPercent}% - 1.5rem)` }}
              aria-hidden
            />
            <ol className="relative z-10 flex items-start justify-between">
              {steps.map((step, index) => (
                <StepperStep
                  key={step.id}
                  step={step}
                  isLast={index === steps.length - 1}
                  isComplete={step.status === 'complete'}
                  isActive={step.status === 'active'}
                />
              ))}
            </ol>
          </div>
        </section>

        <section className="space-y-4">
          <article className="flex items-center justify-between gap-4 rounded-xl bg-white p-4 shadow-[0px_2px_8px_rgba(26,28,29,0.02)]">
            <div className="flex min-w-0 items-center gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-[#EEEEEF] text-xs font-bold text-[#584237]">
                {stakeholders.merchant.initials}
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900">
                  {stakeholders.merchant.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[#584237]">
                  <MapPin size={10} strokeWidth={2} aria-hidden />
                  {stakeholders.merchant.distanceLabel}
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label={stakeholders.merchant.actionLabel}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4] text-gray-900 transition-colors hover:bg-gray-200"
            >
              <Store size={16} strokeWidth={2} />
            </button>
          </article>

          <article className="relative flex items-center justify-between gap-4 overflow-hidden rounded-xl bg-white p-4 shadow-[0px_2px_8px_rgba(26,28,29,0.02)]">
            <span
              className="pointer-events-none absolute inset-y-0 right-0 w-32"
              style={{
                backgroundImage:
                  'linear-gradient(270deg, rgba(249,115,22,0.1) 0%, rgba(249,115,22,0) 100%)',
              }}
              aria-hidden
            />
            <div className="relative flex min-w-0 items-center gap-4">
              <div className="relative">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-white bg-[#EEEEEF] text-xs font-bold text-[#584237]">
                  {stakeholders.rider.initials}
                </div>
                <span
                  className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full border-2 border-white bg-emerald-500"
                  aria-hidden
                />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-base font-semibold text-gray-900">
                  {stakeholders.rider.name}
                </h3>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-[#584237]">
                  <Star
                    size={10}
                    strokeWidth={2}
                    className="fill-[#584237] text-[#584237]"
                    aria-hidden
                  />
                  {stakeholders.rider.rating} ({stakeholders.rider.tripsLabel})
                </p>
              </div>
            </div>
            <button
              type="button"
              aria-label={stakeholders.rider.actionLabel}
              className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F97316] text-[#582200] shadow-[0px_1px_2px_rgba(0,0,0,0.05)] transition-colors hover:bg-[#EA580C]"
            >
              <Phone size={15} strokeWidth={2.25} />
            </button>
          </article>

          <article className="flex items-center gap-4 rounded-xl bg-white p-4 shadow-[0px_2px_8px_rgba(26,28,29,0.02)]">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F3F4] text-[#584237]">
              <User size={16} strokeWidth={2} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-gray-900">
                {stakeholders.customer.name}
              </p>
              <p className="mt-0.5 text-xs text-[#584237]">
                {stakeholders.customer.maskedPhone}
              </p>
            </div>
          </article>
        </section>

        <section className="space-y-4 rounded-xl bg-white p-5 shadow-[0px_2px_8px_rgba(26,28,29,0.02)]">
          <h3 className="text-lg font-bold text-gray-900">{items.title}</h3>

          <div className="space-y-4">
            {items.lines.map((line) => (
              <div
                key={line.id}
                className="flex items-start justify-between gap-4"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#F3F3F4] text-xs font-bold text-gray-900">
                    {line.qty}x
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900">{line.name}</p>
                    {line.note ? (
                      <p className="mt-0.5 text-xs text-[#584237]">{line.note}</p>
                    ) : null}
                  </div>
                </div>
                <p className="shrink-0 text-sm font-semibold text-[#842BD2]">
                  ₦{line.price}
                </p>
              </div>
            ))}
          </div>

          <div className="h-px bg-[#F3F3F4]" aria-hidden />

          <dl className="space-y-2 text-sm text-[#584237]">
            <div className="flex items-center justify-between">
              <dt>{items.subtotalLabel}</dt>
              <dd>₦{items.subtotal}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{items.deliveryLabel}</dt>
              <dd>₦{items.deliveryFee}</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt>{items.serviceLabel}</dt>
              <dd>₦{items.serviceCharge}</dd>
            </div>
          </dl>

          <div className="flex items-end justify-between pt-2">
            <p className="text-base font-bold text-gray-900">{items.totalLabel}</p>
            <p className="text-[22px] font-extrabold leading-none text-[#842BD2]">
              ₦{items.total}
            </p>
          </div>
        </section>
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-20 border-t border-[#F3F3F4] bg-white/90 px-4 pb-6 pt-4 shadow-[0px_-8px_24px_rgba(26,28,29,0.06)] backdrop-blur-md">
        <div className="mx-auto flex max-w-md items-center gap-3">
          <button
            type="button"
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#E8E8E9] text-sm font-bold uppercase tracking-[0.05em] text-gray-900 transition-colors hover:bg-gray-300"
            style={{ flexBasis: '32%' }}
          >
            <Phone size={14} strokeWidth={2.25} aria-hidden />
            {order.supportLabel}
          </button>
          <button
            type="button"
            onClick={() => setActionsOpen(true)}
            className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-xl text-sm font-bold uppercase tracking-[0.05em] text-white shadow-[0px_8px_16px_rgba(157,67,0,0.2)] transition-opacity hover:opacity-95"
            style={{
              flexBasis: '64%',
              backgroundImage:
                'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
            }}
          >
            <MoreHorizontal size={16} strokeWidth={2.5} aria-hidden />
            {order.actionsLabel}
          </button>
        </div>
      </footer>

      <AdminOrderActionsSheet
        open={actionsOpen}
        order={order}
        sheet={order.actionsSheet}
        onClose={() => setActionsOpen(false)}
        onAction={(actionId) => {
          if (actionId === 'reassign') setReassignOpen(true)
          else if (actionId === 'refund') setRefundOpen(true)
        }}
      />

      <AdminOrderReassignRiderSheet
        open={reassignOpen}
        sheet={order.reassignRider}
        onClose={() => setReassignOpen(false)}
      />

      <AdminOrderRefundSheet
        open={refundOpen}
        order={order}
        sheet={order.refundSheet}
        onClose={() => setRefundOpen(false)}
      />
    </div>
  )
}
