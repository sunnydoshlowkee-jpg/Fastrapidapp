import { Bike, Store, User } from 'lucide-react'

const iconMap = {
  user: User,
  store: Store,
  bike: Bike,
}

const toneMap = {
  purple: 'bg-violet-100 text-violet-600',
  orange: 'bg-orange-100 text-rapid-orange',
}

export default function AdminOrderDetailStakeholders({ stakeholders }) {
  const cards = [stakeholders.customer, stakeholders.merchant, stakeholders.rider]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {cards.map((card) => {
        const Icon = iconMap[card.icon] ?? User
        return (
          <article
            key={card.title}
            className="flex items-center justify-between gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
          >
            <div className="flex min-w-0 items-center gap-3">
              <span
                className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${toneMap[card.iconTone]}`}
              >
                <Icon size={20} strokeWidth={2} aria-hidden />
              </span>
              <div className="min-w-0">
                <p className="text-xs font-medium uppercase tracking-wide text-gray-500">
                  {card.title}
                </p>
                <p className="truncate text-sm font-bold text-gray-900">{card.name}</p>
              </div>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-50"
            >
              {card.actionLabel}
            </button>
          </article>
        )
      })}
    </div>
  )
}
