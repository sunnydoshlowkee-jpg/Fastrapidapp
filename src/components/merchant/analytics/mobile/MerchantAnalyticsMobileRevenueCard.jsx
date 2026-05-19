import { TrendingUp } from 'lucide-react'
import MerchantAnalyticsSimpleBarChart from '../MerchantAnalyticsSimpleBarChart'

export default function MerchantAnalyticsMobileRevenueCard({ revenue, highlightDay }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-muted">
        Revenue trends
      </p>
      <div className="mt-2 flex flex-wrap items-center gap-2">
        <p className="text-xl font-bold tracking-[-0.02em] text-merchant-ink">{revenue.total}</p>
        <span className="inline-flex items-center gap-1 rounded-full bg-merchant-nav-active px-2 py-0.5 text-xs font-semibold text-merchant-primary">
          <TrendingUp size={12} strokeWidth={2.5} aria-hidden />
          {revenue.change}
        </span>
      </div>
      <div className="mt-4">
        <MerchantAnalyticsSimpleBarChart data={revenue.chart} showLabels={false} />
        <div className="mt-2 flex justify-between gap-1">
          {revenue.chart.map((d) => (
            <span
              key={d.label}
              className={`flex-1 text-center text-[10px] font-medium ${
                d.label === highlightDay
                  ? 'font-bold text-merchant-ink'
                  : 'text-merchant-muted'
              }`}
            >
              {d.label}
            </span>
          ))}
        </div>
      </div>
    </article>
  )
}
