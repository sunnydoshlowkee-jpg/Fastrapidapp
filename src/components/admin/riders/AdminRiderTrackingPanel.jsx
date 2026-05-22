import { MessageCircle, Phone, Star, Store, User, ArrowLeftRight } from 'lucide-react'

const timelineIcon = {
  pickup: { Icon: Store, tone: 'bg-amber-100 text-amber-800' },
  dropoff: { Icon: User, tone: 'bg-violet-100 text-violet-700' },
}

export default function AdminRiderTrackingPanel({
  rider,
  stats,
  order,
  liveLabel,
  estArrivalLabel,
  distanceLeftLabel,
  orderTimelineTitle,
  callRiderLabel,
  messageLabel,
  reassignLabel,
}) {
  return (
    <aside className="flex w-full max-w-md shrink-0 flex-col border-l border-gray-200 bg-white lg:w-[380px] xl:w-[400px]">
      <div className="border-b border-gray-100 p-5">
        <div className="flex items-start justify-between gap-3">
          <div className="relative">
            <span
              className={`flex h-16 w-16 items-center justify-center rounded-xl text-lg font-bold ${rider.avatarTone}`}
            >
              {rider.initials}
            </span>
            <span className="absolute -bottom-1 -right-1 inline-flex items-center gap-0.5 rounded-md bg-rapid-orange px-1.5 py-0.5 text-[10px] font-bold text-white shadow-sm">
              {rider.rating}
              <Star size={10} className="fill-white" strokeWidth={0} aria-hidden />
            </span>
          </div>
          <span className="inline-flex items-center gap-1 rounded-full bg-violet-100 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-violet-700">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-600" aria-hidden />
            {liveLabel}
          </span>
        </div>
        <h2 className="mt-3 text-xl font-bold text-gray-900">{rider.name}</h2>
        <p className="text-sm text-gray-500">Plate: {rider.plate}</p>
      </div>

      <div className="grid grid-cols-2 gap-3 border-b border-gray-100 p-5">
        <article className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {estArrivalLabel}
          </p>
          <p className="mt-1 text-2xl font-bold text-violet-600">{stats.eta}</p>
          <p className="mt-1 text-xs text-gray-500">{stats.traffic}</p>
        </article>
        <article className="rounded-xl border border-gray-100 bg-gray-50/80 p-4">
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {distanceLeftLabel}
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900">{stats.distance}</p>
          <p className="mt-1 text-xs text-gray-500">{stats.speed}</p>
        </article>
      </div>

      <div className="flex-1 overflow-y-auto p-5">
        <div className="mb-4 flex items-center justify-between gap-2">
          <h3 className="text-sm font-bold text-gray-900">{orderTimelineTitle}</h3>
          <span className="rounded-md bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-rapid-orange">
            {order.id}
          </span>
        </div>

        <ul className="space-y-5">
          {order.timeline.map((step) => {
            const { Icon, tone } = timelineIcon[step.type] ?? timelineIcon.pickup
            return (
              <li key={step.id} className="flex gap-3">
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${tone}`}
                >
                  <Icon size={16} strokeWidth={2} aria-hidden />
                </span>
                <div className="min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">
                    {step.title}
                  </p>
                  <p className="text-sm font-bold text-gray-900">{step.name}</p>
                  <p className="text-xs text-gray-500">{step.address}</p>
                  {step.items ? (
                    <p className="mt-1 text-xs text-gray-600">{step.items}</p>
                  ) : null}
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <footer className="space-y-2 border-t border-gray-100 p-5">
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100"
          >
            <Phone size={16} strokeWidth={2} aria-hidden />
            {callRiderLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-200 bg-gray-50 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100"
          >
            <MessageCircle size={16} strokeWidth={2} aria-hidden />
            {messageLabel}
          </button>
        </div>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-rapid-orange py-3 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
        >
          <ArrowLeftRight size={18} strokeWidth={2} aria-hidden />
          {reassignLabel}
        </button>
      </footer>
    </aside>
  )
}
