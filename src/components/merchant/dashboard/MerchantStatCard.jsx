import {
  Banknote,
  CheckCircle2,
  RefreshCw,
  Star,
} from 'lucide-react'

const icons = {
  banknote: Banknote,
  refresh: RefreshCw,
  check: CheckCircle2,
  star: Star,
}

const subtextStyles = {
  warning: 'text-merchant-warning',
  muted: 'text-merchant-muted',
}

export default function MerchantStatCard({
  label,
  value,
  subtext,
  subtextTone = 'muted',
  icon,
  iconTone = 'primary',
}) {
  const Icon = icons[icon] || Banknote
  const iconClass =
    iconTone === 'warning'
      ? 'bg-[rgba(245,158,11,0.12)] text-merchant-warning-star'
      : 'bg-merchant-nav-active text-merchant-primary'

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-merchant-body">{label}</p>
          <p className="mt-2 text-[28px] font-semibold leading-8 tracking-[-0.02em] text-merchant-ink">
            {value}
          </p>
          <p className={`mt-2 text-xs font-medium ${subtextStyles[subtextTone] || subtextStyles.muted}`}>
            {subtext}
          </p>
        </div>
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}
          aria-hidden
        >
          <Icon size={20} strokeWidth={1.75} />
        </div>
      </div>
    </article>
  )
}
