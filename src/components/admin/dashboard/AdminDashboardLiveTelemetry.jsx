export default function AdminDashboardLiveTelemetry({ telemetry }) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-bold text-gray-900">{telemetry.title}</h2>
        <span className="rounded-full bg-violet-600 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
          {telemetry.liveLabel}
        </span>
      </div>
      <ul className="space-y-4">
        {telemetry.events.map((event) => (
          <li key={event.id} className="border-b border-gray-50 pb-4 last:border-0 last:pb-0">
            <p className="text-sm font-semibold text-gray-900">{event.title}</p>
            <p className="mt-1 text-sm leading-relaxed text-gray-500">{event.body}</p>
            <p className="mt-1.5 text-xs text-gray-400">{event.time}</p>
          </li>
        ))}
      </ul>
    </article>
  )
}
