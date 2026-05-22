import { TrendingUp } from 'lucide-react'

const dotClass = {
  orange: 'bg-rapid-orange',
  gray: 'bg-gray-400',
}

export default function AdminRidersStatCards({ stats }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <article
          key={stat.id}
          className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
        >
          <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
            {stat.label}
          </p>
          <p
            className={`mt-2 text-3xl font-bold tracking-tight ${
              stat.valueTone === 'purple' ? 'text-violet-600' : 'text-gray-900'
            }`}
          >
            {stat.value}
          </p>
          <p className="mt-2 flex items-center gap-1.5 text-xs font-medium text-gray-500">
            {stat.showTrend ? (
              <TrendingUp size={14} className="shrink-0 text-emerald-600" strokeWidth={2.5} aria-hidden />
            ) : null}
            {stat.statusDot ? (
              <span
                className={`h-1.5 w-1.5 shrink-0 rounded-full ${dotClass[stat.statusDot]}`}
                aria-hidden
              />
            ) : null}
            <span className={stat.showTrend ? 'text-emerald-600' : ''}>{stat.subtext}</span>
          </p>
        </article>
      ))}
    </div>
  )
}
