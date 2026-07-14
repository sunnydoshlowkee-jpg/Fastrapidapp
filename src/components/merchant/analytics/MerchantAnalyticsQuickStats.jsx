export default function MerchantAnalyticsQuickStats({ stats }) {
  return (
    <div className="flex flex-col gap-3">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat sm:p-5"
        >
          <p className="text-sm font-medium text-merchant-muted">{stat.label}</p>
          <p className="mt-1 text-xl font-bold text-merchant-ink sm:text-2xl">{stat.value}</p>
          <p
            className={`mt-1 text-xs font-semibold ${
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
