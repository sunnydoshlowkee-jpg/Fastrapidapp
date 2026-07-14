import { TrendingUp } from 'lucide-react'

export default function MerchantOrdersMobileSummaryCards({ summary }) {
  const { pending, revenue, completion } = summary

  return (
    <section className="flex flex-col gap-3" aria-label="Orders summary">
      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        <p className="text-xs font-medium text-merchant-muted">{pending.label}</p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-merchant-ink">{pending.value}</p>
        <p className="mt-1.5 flex items-center gap-1 text-xs font-semibold text-[#E67E22]">
          <TrendingUp size={14} strokeWidth={2} aria-hidden />
          {pending.subtext}
        </p>
      </article>

      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        <p className="text-xs font-medium text-merchant-muted">{revenue.label}</p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-merchant-ink">{revenue.value}</p>
        <p className="mt-1.5 text-xs font-medium text-merchant-primary">{revenue.subtext}</p>
      </article>

      <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
        <p className="text-xs font-medium text-merchant-muted">{completion.label}</p>
        <p className="mt-1 text-2xl font-bold tracking-[-0.02em] text-merchant-ink">{completion.value}</p>
        <div className="mt-3 h-2.5 overflow-hidden rounded-full bg-merchant-divider">
          <div
            className="h-full rounded-full bg-merchant-primary"
            style={{ width: `${completion.percent}%` }}
            role="progressbar"
            aria-valuenow={completion.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </article>
    </section>
  )
}
