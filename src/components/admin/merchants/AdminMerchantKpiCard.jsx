import { Star, TrendingUp } from 'lucide-react'

function RatingStars() {
  return (
    <span className="inline-flex items-center gap-0.5" aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={14}
          strokeWidth={2}
          className="text-rapid-orange"
        />
      ))}
    </span>
  )
}

export default function AdminMerchantKpiCard({ kpi, divider }) {
  return (
    <div className="relative">
      {divider === 'violet' ? (
        <span
          className="pointer-events-none absolute -left-2 -top-2 bottom-[-0.5rem] w-[3px] rounded-full bg-violet-500"
          aria-hidden
        />
      ) : null}

      <article className="relative h-full overflow-hidden rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
        {kpi.cornerAccent === 'gray' ? (
          <span
            className="pointer-events-none absolute right-0 top-0 h-12 w-14 bg-gray-200/70"
            aria-hidden
          />
        ) : null}

        <p className="relative text-sm font-semibold text-gray-800">{kpi.label}</p>

        <div className="relative mt-4 flex items-end justify-between gap-3">
          <p
            className={`text-2xl font-bold tracking-tight ${
              kpi.valueTone ?? 'text-gray-900'
            }`}
          >
            {kpi.value}
          </p>
          <div className="flex items-center gap-1">
            {kpi.showTrend ? (
              <span
                className={`inline-flex items-center gap-1 text-xs font-semibold ${
                  kpi.trendTone ?? 'text-emerald-600'
                }`}
              >
                <TrendingUp size={14} strokeWidth={2.5} aria-hidden />
                {kpi.trend}
              </span>
            ) : null}
            {kpi.meta ? (
              <span className={`text-xs font-semibold ${kpi.metaTone ?? 'text-gray-400'}`}>
                {kpi.meta}
              </span>
            ) : null}
            {kpi.showStars ? <RatingStars /> : null}
          </div>
        </div>
      </article>
    </div>
  )
}
