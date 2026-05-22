const barColor = {
  high: 'bg-emerald-500',
  medium: 'bg-amber-400',
  critical: 'bg-red-500',
}

const labelColor = {
  high: 'text-gray-700',
  medium: 'text-gray-700',
  critical: 'text-red-600',
}

export default function AdminDashboardAvailability({ availability }) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-gray-900">{availability.title}</h2>
      <ul className="space-y-4">
        {availability.zones.map((zone) => (
          <li key={zone.id}>
            <div className="mb-1.5 flex items-center justify-between text-sm">
              <span className={`font-medium capitalize ${labelColor[zone.level]}`}>{zone.name}</span>
              <span className={`text-xs font-semibold capitalize ${labelColor[zone.level]}`}>
                {zone.level}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full transition-all ${barColor[zone.level]}`}
                style={{ width: `${zone.percent}%` }}
              />
            </div>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="mt-5 w-full rounded-lg border border-gray-200 py-2.5 text-xs font-bold uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-50"
      >
        {availability.manageLabel}
      </button>
    </article>
  )
}
