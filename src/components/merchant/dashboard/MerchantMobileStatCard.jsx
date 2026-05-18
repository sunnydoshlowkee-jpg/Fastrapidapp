import { Eye, Receipt, ShoppingBag, Wallet } from 'lucide-react'

const icons = {
  wallet: Wallet,
  bag: ShoppingBag,
  receipt: Receipt,
  eye: Eye,
}

const subtextStyles = {
  warning: 'text-merchant-warning',
  muted: 'text-merchant-muted',
}

export default function MerchantMobileStatCard({
  label,
  value,
  subtext,
  subtextTone = 'muted',
  icon,
}) {
  const Icon = icons[icon] || Wallet

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-merchant-body">{label}</p>
        <Icon size={18} strokeWidth={1.75} className="shrink-0 text-merchant-muted" aria-hidden />
      </div>
      <p className="mt-3 text-2xl font-semibold leading-8 tracking-[-0.02em] text-merchant-ink">
        {value}
      </p>
      <p className={`mt-1 text-xs font-medium ${subtextStyles[subtextTone] || subtextStyles.muted}`}>
        {subtext}
      </p>
    </article>
  )
}
