import { Lightbulb } from 'lucide-react'
import MerchantAnalyticsSimpleBarChart from '../MerchantAnalyticsSimpleBarChart'

export default function MerchantAnalyticsMobilePeakHours({ peakHours }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Peak Hours Analysis</h2>
      <div className="mt-4">
        <MerchantAnalyticsSimpleBarChart
          data={peakHours.chart}
          peakKey="peak"
          barClassName="bg-merchant-nav-active"
          peakBarClassName="bg-merchant-primary"
        />
      </div>
      <div className="mt-4 flex gap-2 rounded-lg bg-merchant-input p-3">
        <Lightbulb size={18} className="mt-0.5 shrink-0 text-merchant-primary" aria-hidden />
        <p className="text-xs leading-relaxed text-merchant-body">{peakHours.insight}</p>
      </div>
    </article>
  )
}
