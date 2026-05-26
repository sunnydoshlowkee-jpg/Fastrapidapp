import { AlertTriangle, Banknote, Truck, UserPlus } from 'lucide-react'

const iconMap = {
  banknote: {
    Icon: Banknote,
    wrap: 'bg-violet-500/10 text-[#842BD2]',
  },
  truck: {
    Icon: Truck,
    wrap: 'bg-gray-200 text-[#584237]',
  },
  userPlus: {
    Icon: UserPlus,
    wrap: 'bg-gray-200 text-[#584237]',
  },
  warning: {
    Icon: AlertTriangle,
    wrap: 'bg-[#FFDAD6] text-[#BA1A1A]',
  },
}

export default function AdminNotificationItem({ item, onMarkRead }) {
  if (item.variant === 'critical') {
    const { Icon } = iconMap.warning

    return (
      <article className="relative overflow-hidden rounded-xl bg-white p-4 pl-6 shadow-[0px_12px_32px_rgba(26,28,29,0.06)]">
        <span
          className="absolute inset-y-0 left-0 w-1.5 bg-[#BA1A1A]"
          aria-hidden
        />
        <div className="flex gap-4">
          <span
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconMap.warning.wrap}`}
          >
            <Icon size={20} strokeWidth={2} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-start justify-between gap-3">
              <h3 className="text-base font-bold text-gray-900">{item.title}</h3>
              <div className="flex items-center gap-2 pt-1">
                <span className="text-xs font-semibold text-[#BA1A1A]">
                  {item.time}
                </span>
                {item.unread ? (
                  <span
                    className="h-2.5 w-2.5 rounded-full bg-[#9D4300]"
                    aria-label="Unread"
                  />
                ) : null}
              </div>
            </div>
            <p className="mt-1 text-sm leading-relaxed text-[#584237]">
              {item.body}
            </p>
            {item.actions?.length ? (
              <div className="mt-3 flex flex-wrap gap-2">
                {item.actions.map((action) => (
                  <button
                    key={action.id}
                    type="button"
                    onClick={() => onMarkRead?.(item.id)}
                    className={
                      action.primary
                        ? 'rounded-md bg-[#BA1A1A] px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-[#9D0F0F]'
                        : 'rounded-md bg-[#F3F3F4] px-3 py-1.5 text-xs font-bold text-gray-900 transition-colors hover:bg-gray-200'
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

  const iconConfig = iconMap[item.icon] ?? iconMap.truck
  const { Icon } = iconConfig
  const isUnread = item.unread

  return (
    <article
      className={`rounded-xl border border-[#E0C0B1]/15 bg-white p-4 shadow-[0px_1px_2px_rgba(0,0,0,0.05)] ${
        isUnread ? '' : 'opacity-75'
      }`}
    >
      <div className="flex gap-4">
        <span
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${iconConfig.wrap}`}
        >
          <Icon size={20} strokeWidth={2} aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-3">
            <h3
              className={`text-base text-gray-900 ${
                isUnread ? 'font-bold' : 'font-semibold'
              }`}
            >
              {item.title}
            </h3>
            <div className="flex items-center gap-2 pt-1">
              <span className="text-xs text-[#584237]">{item.time}</span>
              {isUnread ? (
                <span
                  className="h-2.5 w-2.5 rounded-full bg-[#9D4300]"
                  aria-label="Unread"
                />
              ) : null}
            </div>
          </div>
          <p className="mt-1 text-sm leading-relaxed text-[#584237]">
            {item.body}
          </p>
        </div>
      </div>
    </article>
  )
}
