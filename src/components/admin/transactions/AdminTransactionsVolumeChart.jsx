export default function AdminTransactionsVolumeChart({ volumeTrend }) {
  const maxTotal = Math.max(
    ...volumeTrend.days.map((d) => d.success + d.pending),
    1,
  )

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-base font-bold text-gray-900">{volumeTrend.title}</h2>
        <ul className="flex items-center gap-4">
          {volumeTrend.legend.map((item) => (
            <li key={item.id} className="flex items-center gap-2 text-xs font-medium text-gray-600">
              <span className={`h-2.5 w-2.5 rounded-full ${item.color}`} aria-hidden />
              {item.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex h-44 items-end justify-between gap-2 sm:gap-4">
        {volumeTrend.days.map((day) => {
          const total = day.success + day.pending
          const barHeightPct = (total / maxTotal) * 100

          return (
            <div key={day.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
              <div
                className="flex w-full max-w-12 flex-col overflow-hidden rounded-t-md"
                style={{ height: `${barHeightPct}%`, minHeight: '1.5rem' }}
              >
                <div className="flex-1 bg-gray-200" style={{ flexGrow: day.pending }} />
                <div className="bg-rapid-orange" style={{ flexGrow: day.success }} />
              </div>
              <span className="text-xs font-medium text-gray-500">{day.label}</span>
            </div>
          )
        })}
      </div>
    </article>
  )
}
