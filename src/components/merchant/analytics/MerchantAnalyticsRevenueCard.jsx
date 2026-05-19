import { TrendingUp } from 'lucide-react'
import MerchantAnalyticsSimpleBarChart from './MerchantAnalyticsSimpleBarChart'

export default function MerchantAnalyticsRevenueCard({ revenue }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <p className="text-sm font-medium text-merchant-muted">Revenue Trends</p>
      <div className="mt-2 flex flex-wrap items-end gap-3">
        <p className="text-2xl font-bold tracking-[-0.02em] text-merchant-ink sm:text-3xl">
          {revenue.total}
        </p>
        <p
          className={`flex items-center gap-1 text-sm font-semibold ${
            revenue.changePositive ? 'text-[#16A34A]' : 'text-red-600'
          }`}
        >
          <TrendingUp size={16} strokeWidth={2} aria-hidden />
          {revenue.change}
        </p>
      </div>
      <div className="mt-6">
        <MerchantAnalyticsSimpleBarChart data={revenue.chart} />
      </div>
    </article>
  )
}
