export default function AdminDashboardTopVendors({ topVendors }) {
  return (
    <article className="rounded-xl border border-gray-100 bg-white p-5 shadow-sm">
      <h2 className="mb-4 text-base font-bold text-gray-900">{topVendors.title}</h2>
      <ul className="space-y-3">
        {topVendors.items.map((vendor) => (
          <li key={vendor.id} className="flex items-center gap-3">
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-xs font-bold text-white"
              style={{ backgroundColor: vendor.color }}
            >
              {vendor.initials}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold text-gray-900">{vendor.name}</p>
              {vendor.online ? (
                <p className="text-xs text-gray-500">{vendor.orders} orders today</p>
              ) : (
                <p className="flex items-center gap-1.5 text-xs text-red-600">
                  <span className="h-1.5 w-1.5 rounded-full bg-red-500" aria-hidden />
                  {vendor.statusLabel}
                </p>
              )}
            </div>
            {vendor.online ? (
              <span className="text-sm font-bold text-gray-900">{vendor.orders}</span>
            ) : null}
          </li>
        ))}
      </ul>
    </article>
  )
}
