import { AlertTriangle, Banknote, Bike, TrendingUp, Truck } from 'lucide-react'

const variantConfig = {
  orders: {
    card: 'bg-white ring-gray-100',
    title: 'text-[#584237]',
    value: 'text-gray-900',
    trend: 'text-[#9D4300]',
    iconWrap: 'bg-orange-500/20 text-[#9D4300]',
    Icon: Truck,
    decor: (
      <span
        className="pointer-events-none absolute right-0 top-0 h-16 w-16 bg-orange-500/10"
        style={{ borderBottomLeftRadius: '9999px' }}
        aria-hidden
      />
    ),
  },
  riders: {
    card: 'bg-white ring-gray-100',
    title: 'text-[#584237]',
    value: 'text-gray-900',
    trend: 'text-emerald-500',
    iconWrap: 'bg-emerald-500/10 text-emerald-500',
    Icon: Bike,
    decor: null,
  },
  sla: {
    card: 'bg-red-100/80 ring-red-100',
    title: 'text-red-700',
    value: 'text-red-700',
    trend: 'text-red-700/80',
    iconWrap: 'bg-red-700/20 text-red-700',
    Icon: AlertTriangle,
    decor: null,
  },
  revenue: {
    card: 'bg-violet-200/70 ring-violet-200',
    title: 'text-violet-800',
    value: 'text-[#2C0051]',
    trend: 'text-violet-800/80',
    iconWrap: 'bg-violet-500/10 text-violet-700',
    Icon: Banknote,
    decor: (
      <span
        className="pointer-events-none absolute -bottom-4 -right-4 h-20 w-20 rounded-full bg-violet-500/10"
        aria-hidden
      />
    ),
  },
}

export default function AdminDashboardKpiCards({ kpis }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const config = variantConfig[kpi.variant] ?? variantConfig.orders
        const { Icon } = config

        return (
          <article
            key={kpi.id}
            className={`relative overflow-hidden rounded-xl p-4 shadow-[0px_4px_16px_rgba(26,28,29,0.04)] ring-1 ${config.card}`}
          >
            {config.decor}

            <div className="relative flex items-start justify-between gap-2">
              <p className={`text-xs font-semibold ${config.title}`}>{kpi.label}</p>
              <span
                className={`flex h-6 w-7 shrink-0 items-center justify-center rounded-lg ${config.iconWrap}`}
              >
                <Icon size={14} strokeWidth={2} aria-hidden />
              </span>
            </div>

            <p className={`relative mt-2 text-3xl font-bold tracking-tight ${config.value}`}>
              {kpi.value}
            </p>

            <p
              className={`relative mt-2 flex items-center gap-1 text-xs font-medium ${config.trend}`}
            >
              {kpi.showTrendIcon ? (
                <TrendingUp size={12} strokeWidth={2.5} className="shrink-0" aria-hidden />
              ) : null}
              <span className="truncate">{kpi.trend}</span>
            </p>
          </article>
        )
      })}
    </div>
  )
}
