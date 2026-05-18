import { LineChart, Megaphone, Sparkles } from 'lucide-react'

const icons = {
  sparkles: Sparkles,
  megaphone: Megaphone,
  chart: LineChart,
}

/** Bottom tips sit on the canvas in Figma — icon tile only, no outer card surface. */
export default function MerchantTipCard({ title, description, icon }) {
  const Icon = icons[icon] || Sparkles

  return (
    <article className="flex gap-4">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-icon-tile text-merchant-primary"
        aria-hidden
      >
        <Icon size={20} strokeWidth={1.75} />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-semibold text-merchant-ink">{title}</h3>
        <p className="mt-1 text-xs leading-[18px] text-merchant-muted">{description}</p>
      </div>
    </article>
  )
}
