import { LineChart, Megaphone, UtensilsCrossed } from 'lucide-react'

const icons = {
  utensils: UtensilsCrossed,
  megaphone: Megaphone,
  chart: LineChart,
}

const iconToneStyles = {
  purple: 'bg-merchant-tip-purple text-merchant-link',
  orange: 'bg-merchant-tip-orange text-merchant-tip-orange-icon',
  gray: 'bg-merchant-mobile-secondary text-merchant-body',
}

export default function MerchantGettingStartedCard({
  title,
  description,
  icon,
  iconTone = 'gray',
}) {
  const Icon = icons[icon] || LineChart

  return (
    <article className="flex gap-4 rounded-xl bg-merchant-surface p-5">
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
          iconToneStyles[iconTone] || iconToneStyles.gray
        }`}
        aria-hidden
      >
        <Icon size={16} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        <h3 className="text-base font-bold leading-6 text-merchant-ink">{title}</h3>
        <p className="mt-1 text-base leading-6 text-merchant-mobile-muted">{description}</p>
      </div>
    </article>
  )
}
