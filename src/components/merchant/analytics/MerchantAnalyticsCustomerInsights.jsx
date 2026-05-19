export default function MerchantAnalyticsCustomerInsights({ insights }) {
  const { returnRate, segments, avgSpend } = insights

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <h2 className="text-base font-semibold text-merchant-ink">Customer Insights</h2>

      <div className="mt-6 flex flex-col items-center gap-6 sm:flex-row sm:items-center sm:justify-center">
        <div className="relative flex h-36 w-36 items-center justify-center">
          <div
            className="h-full w-full rounded-full"
            style={{
              background: `conic-gradient(#4342FF 0% ${returnRate}%, #E5E7EB ${returnRate}% 100%)`,
            }}
            role="img"
            aria-label={`${returnRate}% returning customers`}
          />
          <div className="absolute flex h-24 w-24 flex-col items-center justify-center rounded-full bg-merchant-surface">
            <span className="text-2xl font-bold text-merchant-ink">{returnRate}%</span>
            <span className="text-xs font-medium text-merchant-muted">Return</span>
          </div>
        </div>

        <ul className="w-full space-y-3 sm:w-auto">
          {segments.map((seg) => (
            <li key={seg.id} className="flex items-center gap-2 text-sm">
              <span
                className="h-3 w-3 shrink-0 rounded-full"
                style={{ backgroundColor: seg.color }}
                aria-hidden
              />
              <span className="font-medium text-merchant-ink">{seg.label}</span>
              <span className="text-merchant-muted">({seg.count})</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-merchant-divider pt-4 text-sm">
        <span className="text-merchant-muted">Avg Spend / Customer</span>
        <span className="font-bold text-merchant-ink">{avgSpend}</span>
      </div>
    </article>
  )
}
