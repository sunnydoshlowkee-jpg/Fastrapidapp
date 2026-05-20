import { Heart, Lightbulb, Headphones, MapPin } from 'lucide-react'

const iconMap = {
  mapPin: MapPin,
  heart: Heart,
  lightbulb: Lightbulb,
  headset: Headphones,
}

const iconColorMap = {
  mapPin: 'text-merchant-body',
  heart: 'text-amber-700',
  lightbulb: 'text-violet-600',
  headset: 'text-orange-600',
}

/** Mobile Figma [622:7212](https://www.figma.com/design/w336KCNkLvp8mdckFFaN2B/RAPID-V1-DRAFTS?node-id=622-7212): uppercase title row + pin / heart tones */
export default function MerchantPendingApprovalInfoCard({ card }) {
  const Icon = iconMap[card.icon] ?? Lightbulb
  const iconColor = iconColorMap[card.icon] ?? 'text-merchant-body'

  return (
    <article className="rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat">
      <div className="flex items-center gap-2.5">
        <Icon size={18} strokeWidth={2} className={`shrink-0 ${iconColor}`} aria-hidden />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-merchant-body">
          {card.title}
        </h2>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-merchant-body">{card.body}</p>
    </article>
  )
}
