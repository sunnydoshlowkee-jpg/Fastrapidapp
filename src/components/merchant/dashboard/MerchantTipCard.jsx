import { LineChart, Megaphone, Sparkles } from 'lucide-react'

const icons = {
  sparkles: Sparkles,
  megaphone: Megaphone,
  chart: LineChart,
}

export default function MerchantTipCard({ title, description, icon }) {
  const Icon = icons[icon] || Sparkles

  return (
    <article className="flex gap-4">
      <div
        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-merchant-field-border bg-merchant-surface shadow-[0px_1px_2px_rgba(0,0,0,0.05)]"
        aria-hidden
      >
        <Icon size={20} strokeWidth={1.75} className="text-merchant-link" />
      </div>
      <div className="min-w-0">
        <h3 className="text-sm font-bold leading-5 text-merchant-ink">{title}</h3>
        <p className="mt-1 text-xs leading-[18px] text-merchant-muted">{description}</p>
      </div>
    </article>
  )
}
