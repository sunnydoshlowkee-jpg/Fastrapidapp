const DOT_TONE = {
  violet: 'bg-[#2419E9]',
  amber: 'bg-[#6A4200]',
  emerald: 'bg-emerald-500',
}

const STATUS_TONE = {
  violet: 'bg-[#E1E0FF] text-[#1E0CE6]',
  gray: 'bg-gray-200 text-gray-800',
  amber: 'bg-[#FFDDB8] text-[#653E00]',
  red: 'bg-red-100 text-red-700',
}

export default function AdminDashboardLiveTelemetry({ telemetry }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between px-1">
        <h2 className="text-sm font-bold uppercase tracking-[0.05em] text-gray-900">
          {telemetry.title}
        </h2>
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-[#00A2F4]" aria-hidden />
          <span className="text-xs font-medium text-[#00A2F4]">
            {telemetry.liveLabel}
          </span>
        </div>
      </div>
      <div className="overflow-hidden rounded-lg bg-white shadow-[0px_4px_24px_-8px_rgba(0,0,0,0.04)]">
        <ul>
          {telemetry.events.map((event, idx) => (
            <li
              key={event.id}
              className={`flex items-center justify-between gap-3 px-4 py-3 ${
                idx % 2 === 0 ? 'bg-gray-100/50' : 'bg-white'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`h-2 w-2 shrink-0 rounded-full ${DOT_TONE[event.dotTone] ?? DOT_TONE.violet}`}
                  aria-hidden
                />
                <p className="text-sm font-semibold text-gray-900">{event.orderId}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-xs text-gray-500">{event.time}</span>
                <span
                  className={`rounded-[2px] px-2 py-1 text-[10px] font-bold uppercase tracking-wider ${
                    STATUS_TONE[event.statusTone] ?? STATUS_TONE.gray
                  }`}
                >
                  {event.statusLabel}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
