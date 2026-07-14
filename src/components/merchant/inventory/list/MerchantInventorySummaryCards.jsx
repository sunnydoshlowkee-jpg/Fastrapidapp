export default function MerchantInventorySummaryCards({ summary }) {
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-4" aria-label="Inventory summary">
      {summary.map((stat) => (
        <article
          key={stat.id}
          className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat"
        >
          <p className="text-sm font-medium text-merchant-body">{stat.label}</p>
          <p
            className={`mt-2 text-[28px] font-semibold leading-8 tracking-[-0.02em] ${
              stat.highlight === 'warning' ? 'text-[#E67E22]' : 'text-merchant-ink'
            }`}
          >
            {stat.value}
          </p>
        </article>
      ))}
    </section>
  )
}
