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
  positive: 'text-merchant-warning',
  muted: 'text-merchant-body',
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
  const iconColor =
    iconTone === 'warning' ? 'text-merchant-warning-star' : 'text-merchant-primary'

  return (
    <article className="flex flex-col gap-2 rounded-lg bg-merchant-surface p-6">
      <div className="flex items-start justify-between gap-2">
        <p className="text-sm font-semibold leading-5 text-merchant-body">{label}</p>
        <Icon size={20} strokeWidth={1.75} className={`shrink-0 ${iconColor}`} aria-hidden />
      </div>
      <p className="pt-2 text-2xl font-bold leading-8 tracking-[-0.6px] text-merchant-ink">
        {value}
      </p>
      <p
        className={`text-xs font-medium leading-4 ${
          subtextStyles[subtextTone] || subtextStyles.muted
        }`}
      >
        {subtext}
      </p>
    </article>
  )
}
