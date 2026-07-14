export default function MerchantAnalyticsMobileCustomerInsights({ insights }) {
  const { totalUsers, segments, avgSpend } = insights

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-bold text-merchant-ink">Customer Insights</h2>

      <p className="mt-6 text-center">
        <span className="text-3xl font-bold text-merchant-ink">{totalUsers}</span>
        <span className="ml-1 text-sm font-bold uppercase tracking-wide text-merchant-muted">
          Total
        </span>
      </p>

      <ul className="mt-6 space-y-3">
        {segments.map((seg) => (
          <li key={seg.id} className="flex items-center gap-2 text-sm">
            <span
              className="h-2.5 w-2.5 shrink-0 rounded-full"
              style={{ backgroundColor: seg.color }}
              aria-hidden
            />
            <span className="font-semibold text-merchant-ink">
              {seg.label} ({seg.percent}%)
            </span>
            <span className="text-merchant-muted">{seg.count} Users</span>
          </li>
        ))}
      </ul>

      <div className="mt-5 flex items-center justify-between rounded-lg bg-merchant-input px-3 py-2.5 text-sm">
        <span className="text-merchant-muted">Avg Spend/Customer</span>
        <span className="font-bold text-merchant-ink">{avgSpend}</span>
      </div>
    </article>
  )
}
