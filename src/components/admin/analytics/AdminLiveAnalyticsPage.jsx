import { useEffect, useState } from 'react'
import { fetchAdminAnalytics } from '../../../services/adminAnalyticsService'

const PERIODS = [
  { id: 'today', label: 'Today' },
  { id: '7d', label: '7 days' },
  { id: '30d', label: '30 days' },
]

export default function AdminLiveAnalyticsPage() {
  const [period, setPeriod] = useState('7d')
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError('')
      try {
        const result = await fetchAdminAnalytics({ period })
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) {
          setData(null)
          setError(err.message || 'Failed to load analytics.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [period])

  const maxOrders = Math.max(1, ...(data?.series || []).map((d) => d.orders || 0))

  return (
    <div className="p-4 lg:p-6">
      <header className="mb-6 flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400">
            Overview › <span className="text-rapid-orange">Analytics</span>
          </p>
          <h1 className="mt-1 text-2xl font-bold tracking-tight text-gray-900">Platform analytics</h1>
          <p className="mt-1 text-sm text-gray-500">Live GMV, orders, and merchant ranking from production data.</p>
        </div>
        <div className="flex gap-2">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              onClick={() => setPeriod(p.id)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${
                period === p.id
                  ? 'bg-rapid-orange text-white'
                  : 'border border-gray-200 bg-white text-gray-700'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>
      </header>

      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {loading ? (
        <p className="text-sm text-gray-500">Loading analytics…</p>
      ) : data ? (
        <>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {(data.kpis || []).map((kpi) => (
              <article
                key={kpi.id}
                className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
                  {kpi.label}
                </p>
                <p className="mt-2 text-xl font-bold text-gray-900">{kpi.value}</p>
              </article>
            ))}
          </div>

          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-sm font-bold text-gray-900">Orders by day</h2>
            <div className="mt-4 flex h-40 items-end gap-1">
              {(data.series || []).map((day) => (
                <div key={day.date} className="flex flex-1 flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-rapid-orange/80"
                    style={{ height: `${Math.max(4, (day.orders / maxOrders) * 100)}%` }}
                    title={`${day.date}: ${day.orders} orders · ₦${day.gmv}`}
                  />
                  <span className="hidden text-[9px] text-gray-400 sm:block">
                    {day.date.slice(5)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-sm font-bold text-gray-900">Top merchants</h2>
            <ul className="mt-3 divide-y divide-gray-100">
              {(data.top_merchants || []).length === 0 ? (
                <li className="py-4 text-sm text-gray-500">No merchant volume in this period.</li>
              ) : (
                data.top_merchants.map((m) => (
                  <li key={m.merchant_id} className="flex items-center justify-between py-3 text-sm">
                    <span className="font-semibold text-gray-900">{m.name}</span>
                    <span className="text-gray-600">
                      {m.orders} orders · {m.gmv_label}
                    </span>
                  </li>
                ))
              )}
            </ul>
          </section>

          <section className="mt-6 rounded-xl border border-gray-200 bg-white p-4">
            <h2 className="text-sm font-bold text-gray-900">Conversion funnel</h2>
            <p className="mt-1 text-xs text-gray-500">
              Counts from client <code>POST /analytics/track</code> events in this period.
            </p>
            <div className="mt-3 overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-100 text-left text-sm">
                <thead className="bg-gray-50 text-xs font-semibold uppercase text-gray-500">
                  <tr>
                    <th className="px-3 py-2">Step</th>
                    <th className="px-3 py-2">Events</th>
                    <th className="px-3 py-2">From previous</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {(data.funnel || []).length === 0 ? (
                    <tr>
                      <td colSpan={3} className="px-3 py-4 text-gray-500">
                        No tracked funnel events yet.
                      </td>
                    </tr>
                  ) : (
                    data.funnel.map((step) => (
                      <tr key={step.step}>
                        <td className="px-3 py-2 font-semibold text-gray-900">{step.label}</td>
                        <td className="px-3 py-2 text-gray-700">
                          {Number(step.count).toLocaleString()}
                        </td>
                        <td className="px-3 py-2 text-gray-500">
                          {step.conversion_from_previous == null
                            ? '—'
                            : `${step.conversion_from_previous}%`}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </>
      ) : null}
    </div>
  )
}
