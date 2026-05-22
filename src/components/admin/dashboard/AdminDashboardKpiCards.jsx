import { AlertTriangle, Banknote, Bike, TrendingUp, Truck } from 'lucide-react'

const variantConfig = {
  orders: {
    card: 'border-gray-100 bg-white',
    title: 'text-gray-700',
    value: 'text-gray-900',
    trend: 'text-rapid-orange',
    iconWrap: 'bg-orange-100 text-rapid-orange',
    Icon: Truck,
    decor: (
      <span
        className="pointer-events-none absolute -right-6 -top-6 h-24 w-24 rounded-full bg-orange-100/70"
        aria-hidden
      />
    ),
  },
  riders: {
    card: 'border-gray-100 bg-white',
    title: 'text-gray-700',
    value: 'text-gray-900',
    trend: 'text-emerald-600',
    iconWrap: 'bg-emerald-100 text-emerald-600',
    Icon: Bike,
    decor: null,
  },
  sla: {
    card: 'border-red-100 bg-red-50',
    title: 'text-red-800',
    value: 'text-red-900',
    trend: 'text-red-600',
    iconWrap: 'bg-red-100 text-red-600',
    Icon: AlertTriangle,
    decor: null,
  },
  revenue: {
    card: 'border-violet-100 bg-violet-50',
    title: 'text-violet-900',
    value: 'text-violet-950',
    trend: 'text-violet-600',
    iconWrap: 'bg-violet-200 text-violet-700',
    Icon: Banknote,
    decor: (
      <span
        className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-violet-200/80"
        aria-hidden
      />
    ),
  },
}

export default function AdminDashboardKpiCards({ kpis }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {kpis.map((kpi) => {
        const config = variantConfig[kpi.variant] ?? variantConfig.orders
        const { Icon } = config

        return (
          <article
            key={kpi.id}
            className={`relative overflow-hidden rounded-xl border p-5 shadow-sm ${config.card}`}
          >
            {config.decor}

            <div className="relative flex items-start justify-between gap-3">
              <p className={`text-sm font-medium ${config.title}`}>{kpi.label}</p>
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.iconWrap}`}
              >
                <Icon size={18} strokeWidth={2} aria-hidden />
              </span>
            </div>

            <p className={`relative mt-3 text-3xl font-bold tracking-tight ${config.value}`}>
              {kpi.value}
            </p>

            <p className={`relative mt-2 flex items-center gap-1 text-xs font-medium ${config.trend}`}>
              {kpi.showTrendIcon ? (
                <TrendingUp size={14} strokeWidth={2.5} className="shrink-0" aria-hidden />
              ) : null}
              {kpi.trend}
            </p>
          </article>
        )
      })}
    </div>
  )
}
