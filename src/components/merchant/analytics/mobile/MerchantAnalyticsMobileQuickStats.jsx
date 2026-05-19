export default function MerchantAnalyticsMobileQuickStats({ stats }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="rounded-merchant-stat bg-merchant-surface p-3 shadow-merchant-stat"
        >
          <p className="text-[10px] font-medium leading-tight text-merchant-muted">{stat.label}</p>
          <p className="mt-1 text-base font-bold text-merchant-ink">{stat.value}</p>
          <p
            className={`mt-0.5 text-[10px] font-semibold ${
              stat.positive ? 'text-[#16A34A]' : 'text-red-600'
            }`}
          >
            {stat.change}
          </p>
        </article>
      ))}
    </div>
  )
}
