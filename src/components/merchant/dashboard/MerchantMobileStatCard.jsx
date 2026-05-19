import {
  Banknote,
  CheckCircle2,
  ChefHat,
  Eye,
  Receipt,
  ShoppingBag,
  Star,
  Wallet,
} from 'lucide-react'

const icons = {
  wallet: Wallet,
  bag: ShoppingBag,
  receipt: Receipt,
  eye: Eye,
  banknote: Banknote,
  refresh: ChefHat,
  chefhat: ChefHat,
  check: CheckCircle2,
  star: Star,
}

const subtextStyles = {
  warning: 'text-merchant-warning',
  positive: 'text-[#E67E22]',
  positiveGreen: 'text-emerald-600',
  muted: 'text-merchant-muted',
}

export default function MerchantMobileStatCard({
  label,
  value,
  subtext,
  subtextTone = 'muted',
  icon,
  iconAccent = 'muted',
}) {
  const Icon = icons[icon] || Wallet
  const iconColor =
    iconAccent === 'primary' ? 'text-merchant-primary' : 'text-merchant-muted'

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start justify-between gap-2">
        <p className="text-xs font-medium leading-tight text-merchant-body sm:text-sm">{label}</p>
        <Icon size={18} strokeWidth={1.75} className={`shrink-0 ${iconColor}`} aria-hidden />
      </div>
      <p className="mt-2 text-xl font-semibold leading-7 tracking-[-0.02em] text-merchant-ink sm:text-2xl sm:leading-8">
        {value}
      </p>
      <p className={`mt-1 text-[11px] font-medium leading-snug sm:text-xs ${subtextStyles[subtextTone] || subtextStyles.muted}`}>
        {subtextTone === 'positive' || subtextTone === 'positiveGreen' ? `↗ ${subtext}` : subtext}
      </p>
    </article>
  )
}
