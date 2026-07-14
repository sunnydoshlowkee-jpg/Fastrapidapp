import { useState } from 'react'

export default function AdminFinanceRevenueChart({ revenueTrend }) {
  const [mode, setMode] = useState(revenueTrend.defaultMode)
  const max = mode === 'rev' ? revenueTrend.maxRev : revenueTrend.maxVol

  return (
    <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-sm font-bold uppercase tracking-wide text-gray-900">
          {revenueTrend.title}
        </h2>
        <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-0.5">
          {revenueTrend.modes.map((m) => {
            const isActive = mode === m.id
            return (
              <button
                key={m.id}
                type="button"
                onClick={() => setMode(m.id)}
                className={`rounded-md px-3 py-1 text-xs font-bold uppercase tracking-wide transition-colors ${
                  isActive
                    ? 'bg-white text-violet-700 shadow-sm'
                    : 'text-gray-500 hover:text-gray-800'
                }`}
              >
                {m.label}
              </button>
            )
          })}
        </div>
      </div>

      <div className="flex gap-4">
        <div className="flex h-52 flex-col justify-between py-1 text-[10px] font-medium text-gray-400">
          {revenueTrend.yAxis.map((tick) => (
            <span key={tick}>{tick}</span>
          ))}
        </div>

        <div className="flex min-w-0 flex-1 items-end justify-between gap-2">
          {revenueTrend.days.map((day) => {
            const value = mode === 'rev' ? day.rev : day.vol
            const heightPct = (value / max) * 100

            return (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="flex h-52 w-full items-end justify-center">
                  <div
                    className={`w-full max-w-10 rounded-t-md transition-colors ${
                      day.active ? 'bg-violet-600' : 'bg-violet-200'
                    }`}
                    style={{ height: `${heightPct}%`, minHeight: '8px' }}
                  />
                </div>
                <span
                  className={`text-xs font-medium ${
                    day.active ? 'font-bold text-violet-700' : 'text-gray-500'
                  }`}
                >
                  {day.label}
                </span>
              </div>
            )
          })}
        </div>
      </div>
    </article>
  )
}
