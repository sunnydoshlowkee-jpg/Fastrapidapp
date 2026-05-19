import MerchantAnalyticsSimpleBarChart from './MerchantAnalyticsSimpleBarChart'

export default function MerchantAnalyticsPeakHours({ peakHours }) {
  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <h2 className="text-base font-semibold text-merchant-ink">Peak Hours Analysis</h2>
      <div className="mt-4">
        <MerchantAnalyticsSimpleBarChart
          data={peakHours.chart}
          peakKey="peak"
          barClassName="bg-merchant-nav-active"
          peakBarClassName="bg-merchant-primary"
        />
      </div>
      <p className="mt-4 text-sm leading-relaxed text-merchant-muted">{peakHours.insight}</p>
    </article>
  )
}
