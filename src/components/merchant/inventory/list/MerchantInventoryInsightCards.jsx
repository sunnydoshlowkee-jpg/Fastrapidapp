import { AlertTriangle, LineChart, TrendingUp } from 'lucide-react'

const toneStyles = {
  success: {
    card: 'bg-[rgba(22,163,74,0.06)]',
    icon: 'bg-[rgba(22,163,74,0.12)] text-[#16A34A]',
  },
  warning: {
    card: 'bg-[rgba(230,126,34,0.08)]',
    icon: 'bg-[rgba(230,126,34,0.14)] text-[#E67E22]',
  },
  primary: {
    card: 'bg-merchant-nav-active/50',
    icon: 'bg-merchant-nav-active text-merchant-primary',
  },
}

const iconMap = {
  trending: TrendingUp,
  alert: AlertTriangle,
  chart: LineChart,
}

export default function MerchantInventoryInsightCards({ insights }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-3" aria-label="Inventory insights">
      {insights.map((insight) => {
        const styles = toneStyles[insight.tone] ?? toneStyles.primary
        const Icon = iconMap[insight.icon] ?? TrendingUp

        return (
          <article
            key={insight.id}
            className={`flex items-center gap-4 rounded-merchant-stat p-5 shadow-merchant-stat ${styles.card}`}
          >
            <div
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${styles.icon}`}
            >
              <Icon size={20} strokeWidth={1.75} aria-hidden />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.08em] text-merchant-muted">
                {insight.id === 'top-selling'
                  ? 'Top Selling'
                  : insight.id === 'low-stock'
                    ? 'Low Stock'
                    : 'Menu Insights'}
              </p>
              <p className="mt-1 text-lg font-bold text-merchant-ink">{insight.title}</p>
              <p className="mt-0.5 text-sm text-merchant-muted">{insight.subtext}</p>
            </div>
          </article>
        )
      })}
    </section>
  )
}
