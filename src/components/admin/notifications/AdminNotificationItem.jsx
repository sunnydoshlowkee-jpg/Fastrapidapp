import { AlertTriangle, Banknote, Route, Store } from 'lucide-react'

const iconMap = {
  banknote: { Icon: Banknote, wrap: 'bg-emerald-500 text-white' },
  route: { Icon: Route, wrap: 'bg-gray-100 text-gray-500' },
  store: { Icon: Store, wrap: 'bg-gray-100 text-gray-500' },
  warning: { Icon: AlertTriangle, wrap: 'bg-orange-100 text-rapid-orange' },
}

export default function AdminNotificationItem({ item, onMarkRead }) {
  if (item.variant === 'critical') {
    const { Icon } = iconMap.warning

    return (
      <article className="rounded-xl border border-gray-100 border-l-4 border-l-rapid-orange bg-gray-50 p-5 shadow-sm">
        <div className="flex gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconMap.warning.wrap}`}
          >
            <Icon size={20} strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-start justify-between gap-2">
              <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
              <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-rapid-orange">
                {item.time}
                {item.unread ? (
                  <span className="h-1.5 w-1.5 rounded-full bg-rapid-orange" aria-label="Unread" />
                ) : null}
              </span>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.body}</p>
            {item.actions?.length ? (
              <div className="mt-4 flex flex-wrap gap-2">
                {item.actions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => onMarkRead?.(item.id)}
                    className={
                      action.primary
                        ? 'rounded-lg bg-rapid-orange px-4 py-2 text-xs font-bold text-white transition-colors hover:bg-[#E84A15]'
                        : 'rounded-lg border border-gray-200 bg-white px-4 py-2 text-xs font-bold text-gray-900 transition-colors hover:bg-gray-50'
                    }
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </article>
    )
  }

  const iconConfig = iconMap[item.icon] ?? iconMap.route
  const { Icon } = iconConfig

  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="flex gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconConfig.wrap}`}
        >
          <Icon size={20} strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-sm font-bold text-gray-900">{item.title}</h3>
            <span className="inline-flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wide text-gray-400">
              {item.time}
              {item.unread ? (
                <span className="h-1.5 w-1.5 rounded-full bg-rapid-orange" aria-label="Unread" />
              ) : null}
            </span>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-gray-600">{item.body}</p>
        </div>
      </div>
    </article>
  )
}
