export default function AdminDashboardExceptionAlerts({ exceptions }) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">{exceptions.title}</h2>
        <button
          type="button"
          className="text-xs font-semibold text-rapid-orange hover:text-[#E84A15]"
        >
          {exceptions.viewAllLabel}
        </button>
      </div>
      <ul className="space-y-3">
        {exceptions.items.map((item) => (
          <li
            key={item.id}
            className={`rounded-lg border p-4 ${
              item.severity === 'critical'
                ? 'border-red-200 bg-red-50/50'
                : 'border-amber-200 bg-amber-50/30'
            }`}
          >
            <p
              className={`text-[10px] font-bold uppercase tracking-wider ${
                item.severity === 'critical' ? 'text-red-600' : 'text-amber-700'
              }`}
            >
              {item.severity}
            </p>
            <p className="mt-1 text-sm font-semibold text-gray-900">{item.title}</p>
            <p className="mt-0.5 text-xs text-gray-500">{item.location}</p>
            <button
              type="button"
              className={`mt-3 rounded-md px-3 py-1.5 text-[10px] font-bold uppercase tracking-wide ${
                item.severity === 'critical'
                  ? 'bg-red-600 text-white hover:bg-red-700'
                  : 'border border-amber-400 bg-white text-amber-800 hover:bg-amber-50'
              }`}
            >
              {item.actionLabel}
            </button>
          </li>
        ))}
      </ul>
    </article>
  )
}
