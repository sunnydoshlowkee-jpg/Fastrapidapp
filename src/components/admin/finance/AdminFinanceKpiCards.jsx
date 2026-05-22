import { Hourglass, TrendingUp } from 'lucide-react'
import AdminFinanceSparkline from './AdminFinanceSparkline'

export default function AdminFinanceKpiCards({ kpis }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        if (kpi.variant === 'alert') {
          return (
            <article
              key={kpi.id}
              className="relative overflow-hidden rounded-xl border border-orange-200 border-t-4 border-t-rapid-orange bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-600">{kpi.label}</p>
                <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-100 text-rapid-orange">
                  <Hourglass size={18} strokeWidth={2} aria-hidden />
                </span>
              </div>
              <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">{kpi.value}</p>
              <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-amber-700">
                {kpi.trend}
              </p>
            </article>
          )
        }

        return (
          <article
            key={kpi.id}
            className="relative overflow-hidden rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
          >
            {kpi.sparkline ? <AdminFinanceSparkline points={kpi.sparkline} /> : null}
            <p className="relative text-sm font-medium text-gray-600">{kpi.label}</p>
            <p className="relative mt-3 text-3xl font-bold tracking-tight text-violet-700">
              {kpi.value}
            </p>
            <p
              className={`relative mt-2 flex items-center gap-1 text-xs font-medium ${
                kpi.trendUp ? 'text-emerald-600' : 'text-gray-500'
              }`}
            >
              {kpi.trendUp ? <TrendingUp size={14} strokeWidth={2.5} aria-hidden /> : null}
              {kpi.trend}
            </p>
          </article>
        )
      })}
    </div>
  )
}
