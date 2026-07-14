const SEVERITY_BORDER = {
  critical: 'border-l-[#BA1A1A]',
  warning: 'border-l-[#6A4200]',
}

export default function AdminDashboardExceptionAlerts({ exceptions }) {
  return (
    <section className="space-y-3">
      <h2 className="px-1 text-sm font-bold uppercase tracking-[0.05em] text-gray-900">
        {exceptions.title}
      </h2>
      <ul className="space-y-2">
        {exceptions.items.map((item) => {
          const borderTone = SEVERITY_BORDER[item.severity] ?? SEVERITY_BORDER.critical
          return (
            <li
              key={item.id}
              className={`flex items-center justify-between gap-3 rounded-lg border-l-4 bg-white p-4 shadow-[0px_4px_24px_-8px_rgba(0,0,0,0.04)] ${borderTone}`}
            >
              <div className="min-w-0">
                <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                <p className="mt-0.5 text-xs text-gray-500">{item.meta}</p>
              </div>
              <button
                type="button"
                className="shrink-0 rounded-md bg-[#2419E9]/10 px-3 py-1.5 text-xs font-bold text-[#2419E9] transition-colors hover:bg-[#2419E9]/20"
              >
                {item.actionLabel}
              </button>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
