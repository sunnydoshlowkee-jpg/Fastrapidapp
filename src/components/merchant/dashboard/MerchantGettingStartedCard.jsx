import { LineChart, Megaphone, UtensilsCrossed } from 'lucide-react'

const icons = {
  utensils: UtensilsCrossed,
  megaphone: Megaphone,
  chart: LineChart,
}

const iconToneStyles = {
  purple: 'bg-[rgba(67,66,255,0.12)] text-merchant-primary',
  orange: 'bg-[rgba(245,158,11,0.14)] text-merchant-warning-star',
  gray: 'bg-merchant-icon-tile text-merchant-muted',
}

export default function MerchantGettingStartedCard({ title, description, icon, iconTone = 'gray' }) {
  const Icon = icons[icon] || LineChart

  return (
    <article className="flex gap-4 rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${iconToneStyles[iconTone] || iconToneStyles.gray}`}
        aria-hidden
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold text-merchant-ink">{title}</h3>
        <p className="mt-1 text-xs leading-[18px] text-merchant-muted">{description}</p>
      </div>
    </article>
  )
}
