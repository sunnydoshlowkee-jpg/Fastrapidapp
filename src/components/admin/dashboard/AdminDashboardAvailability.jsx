const BAR_COLOR = {
  high: 'bg-emerald-500',
  medium: 'bg-amber-500',
  critical: 'bg-[#BA1A1A]',
}

const LEVEL_COLOR = {
  high: 'text-gray-900',
  medium: 'text-gray-900',
  critical: 'text-[#BA1A1A]',
}

export default function AdminDashboardAvailability({ availability }) {
  return (
    <article className="space-y-4 rounded-xl bg-[#F3F3F4] p-5">
      <h2 className="text-sm font-bold uppercase tracking-[0.05em] text-gray-900">
        {availability.title}
      </h2>
      <ul className="space-y-4">
        {availability.zones.map((zone) => (
          <li key={zone.id} className="space-y-1">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-gray-900">{zone.name}</span>
              <span
                className={`text-xs font-bold ${LEVEL_COLOR[zone.level] ?? LEVEL_COLOR.high}`}
              >
                {zone.levelLabel}
              </span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-gray-200">
              <div
                className={`h-full rounded-full transition-all ${
                  BAR_COLOR[zone.level] ?? BAR_COLOR.high
                }`}
                style={{ width: `${zone.percent}%` }}
              />
            </div>
            <p className="text-[10px] text-[#584237]">{zone.ridersReady}</p>
          </li>
        ))}
      </ul>
      <button
        type="button"
        className="w-full rounded-lg border border-[#E0C0B1] py-2 text-xs font-bold uppercase tracking-[0.05em] text-[#9D4300] transition-colors hover:bg-orange-50"
      >
        {availability.manageLabel}
      </button>
    </article>
  )
}
