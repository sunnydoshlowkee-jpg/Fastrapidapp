import { AlertTriangle } from 'lucide-react'

export default function MerchantInventoryMobileSummaryCards({ summary }) {
  return (
    <section className="grid grid-cols-2 gap-3" aria-label="Inventory summary">
      {summary.map((stat) => (
        <article
          key={stat.id}
          className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat"
        >
          <p className="text-xs font-medium text-merchant-body">{stat.label}</p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-2xl font-bold tracking-[-0.02em] ${
              stat.id === 'low-stock'
                ? 'text-[#E67E22]'
                : stat.id === 'value'
                  ? 'text-merchant-primary'
                  : 'text-merchant-ink'
            }`}
          >
            {stat.value}
            {stat.id === 'low-stock' && (
              <AlertTriangle size={16} strokeWidth={2} className="shrink-0" aria-hidden />
            )}
          </p>
        </article>
      ))}
    </section>
  )
}
