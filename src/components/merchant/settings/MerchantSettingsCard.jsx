import { useNavigate } from 'react-router-dom'
import { Banknote, Clock, CreditCard, Shield, Store, User, UserCog } from 'lucide-react'

const iconMap = {
  store: Store,
  clock: Clock,
  banknote: Banknote,
  'credit-card': CreditCard,
  user: User,
  'user-cog': UserCog,
  shield: Shield,
}

export default function MerchantSettingsCard({ card, onSelect, variant = 'desktop' }) {
  const navigate = useNavigate()
  const Icon = iconMap[card.icon] ?? Store
  const isMobile = variant === 'mobile'

  const handleClick = () => {
    if (card.to) {
      navigate(card.to)
      return
    }
    onSelect?.(card.id)
  }

  if (isMobile) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="flex w-full items-start gap-4 rounded-merchant-stat bg-merchant-surface p-4 text-left shadow-merchant-stat transition-colors active:bg-merchant-canvas/50"
      >
        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-merchant-icon-tile text-merchant-primary">
          <Icon size={20} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold leading-snug text-merchant-ink">{card.title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-merchant-muted">{card.description}</p>
        </div>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="relative flex w-full items-start gap-4 overflow-hidden rounded-merchant-stat border border-merchant-divider bg-merchant-surface p-5 text-left shadow-merchant-stat transition-colors hover:border-merchant-primary/30 hover:bg-merchant-canvas/30 lg:gap-5 lg:p-6"
    >
      {card.highlighted && (
        <span
          className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-merchant-nav-active"
          aria-hidden
        />
      )}

      <span
        className={`relative flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${
          card.highlighted
            ? 'bg-merchant-primary text-white'
            : 'bg-merchant-nav-active text-merchant-primary'
        }`}
      >
        <Icon size={22} strokeWidth={1.75} aria-hidden />
      </span>

      <div className="relative min-w-0 flex-1 pt-0.5">
        <h3 className="text-base font-bold leading-snug text-merchant-ink lg:text-lg">{card.title}</h3>
        <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{card.description}</p>
      </div>
    </button>
  )
}
