import {
  Banknote,
  Calculator,
  Eye,
  ShoppingBag,
  Wallet,
} from 'lucide-react'

const icons = {
  wallet: Wallet,
  bag: ShoppingBag,
  receipt: Calculator,
  eye: Eye,
  banknote: Banknote,
}

const subtextStyles = {
  warning: 'font-medium text-merchant-mobile-warning',
  muted: 'text-merchant-mobile-muted',
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
    <article className="flex flex-col justify-between gap-3.5 rounded-xl bg-merchant-surface p-6">
      <div className="flex items-start justify-between gap-2">
        <p className="text-base leading-6 text-merchant-mobile-muted">{label}</p>
        <Icon
          size={18}
          strokeWidth={1.75}
          className="shrink-0 text-merchant-mobile-muted opacity-50"
          aria-hidden
        />
      </div>
      <div className="flex flex-col gap-1">
        <p className="text-[22px] font-bold leading-[33px] text-merchant-ink">{value}</p>
        <p
          className={`text-[11px] leading-4 ${
            subtextStyles[subtextTone] || subtextStyles.muted
          }`}
        >
          {subtext}
        </p>
      </div>
    </article>
  )
}
