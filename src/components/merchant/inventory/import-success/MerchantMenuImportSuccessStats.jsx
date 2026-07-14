import { CheckCircle2, Plus, RefreshCw } from 'lucide-react'

const iconMap = {
  plus: Plus,
  sync: RefreshCw,
  check: CheckCircle2,
}

export default function MerchantMenuImportSuccessStats({ stats, variant = 'desktop' }) {
  const isMobile = variant === 'mobile'

  if (isMobile) {
    return (
      <section className="grid grid-cols-3 gap-2">
        {stats.map((stat) => {
          const Icon = iconMap[stat.icon] ?? Plus
          const iconClass =
            stat.iconTone === 'muted' ? 'text-merchant-muted' : 'text-merchant-primary'

          return (
            <article
              key={stat.id}
              className="rounded-merchant-stat bg-merchant-surface p-3 shadow-merchant-stat"
            >
              <p className={`flex items-center gap-1 text-[10px] font-bold uppercase tracking-wide text-merchant-muted`}>
                <Icon size={12} className={iconClass} strokeWidth={2} aria-hidden />
                {stat.label}
              </p>
              <p className="mt-1.5 text-2xl font-bold tracking-[-0.02em] text-merchant-ink">{stat.value}</p>
              <p className="mt-1 text-[10px] font-medium leading-tight text-merchant-muted">{stat.subtext}</p>
            </article>
          )
        })}
      </section>
    )
  }

  return (
    <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {stats.map((stat) => {
        const Icon = iconMap[stat.icon] ?? Plus
        const badgeClass =
          stat.badgeTone === 'success' ? 'text-[#16A34A]' : 'text-merchant-primary'

        return (
          <article
            key={stat.id}
            className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat md:p-6"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.08em] text-merchant-muted">
              {stat.label}
            </p>
            <p className="mt-2 text-3xl font-bold tracking-[-0.02em] text-merchant-ink md:text-4xl">
              {stat.value}
            </p>
            <p className={`mt-3 flex items-center gap-1.5 text-sm font-semibold ${badgeClass}`}>
              <Icon size={16} strokeWidth={2} aria-hidden />
              {stat.badge}
            </p>
          </article>
        )
      })}
    </section>
  )
}
