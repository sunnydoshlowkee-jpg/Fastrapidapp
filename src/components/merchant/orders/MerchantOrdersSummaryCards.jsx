import { CreditCard, TrendingUp } from 'lucide-react'

export default function MerchantOrdersSummaryCards({ summary }) {
  const { pending, revenue, completion } = summary

  return (
    <section
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
      aria-label="Orders summary"
    >
      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
        <p className="text-sm font-medium text-merchant-body">{pending.label}</p>
        <p className="mt-2 text-[28px] font-semibold leading-8 tracking-[-0.02em] text-merchant-ink">
          {pending.value}
        </p>
        <p className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          pending.subtextTone === 'positive' ? 'text-[#16A34A]' : 'text-merchant-muted'
        }`}>
          <TrendingUp size={14} strokeWidth={2} aria-hidden />
          {pending.subtext}
        </p>
      </article>

      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
        <p className="text-sm font-medium text-merchant-body">{revenue.label}</p>
        <p className="mt-2 text-[28px] font-semibold leading-8 tracking-[-0.02em] text-merchant-ink">
          {revenue.value}
        </p>
        <p className={`mt-2 flex items-center gap-1.5 text-xs font-medium ${
          revenue.subtextTone === 'info' ? 'text-merchant-primary' : 'text-merchant-muted'
        }`}>
          <CreditCard size={14} strokeWidth={2} aria-hidden />
          {revenue.subtext}
        </p>
      </article>

      <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat sm:col-span-2 xl:col-span-1">
        <p className="text-sm font-medium text-merchant-body">{completion.label}</p>
        <p className="mt-2 text-[28px] font-semibold leading-8 tracking-[-0.02em] text-merchant-ink">
          {completion.value}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-merchant-divider">
          <div
            className="h-full rounded-full bg-merchant-primary transition-all"
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
