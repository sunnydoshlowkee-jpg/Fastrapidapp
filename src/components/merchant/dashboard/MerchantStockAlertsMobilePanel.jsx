const dotClass = {
  red: 'bg-red-500',
  brown: 'bg-amber-800',
}

const badgeClass = {
  critical: 'bg-red-50 text-red-700',
  running: 'bg-amber-100 text-amber-900',
  out: 'bg-red-50 text-red-800',
}

export default function MerchantStockAlertsMobilePanel({ stockAlerts }) {
  const { items, inventoryHealth } = stockAlerts

  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <h2 className="text-base font-semibold text-merchant-ink">Stock Alerts</h2>

      <ul className="mt-4 flex flex-col gap-3">
        {items.map((item) => (
          <li key={item.id} className="flex items-center gap-3">
            <span
              className={`h-2 w-2 shrink-0 rounded-full ${dotClass[item.dot] || dotClass.red}`}
              aria-hidden
            />
            <span className="min-w-0 flex-1 text-sm font-semibold text-merchant-ink">{item.title}</span>
            <span
              className={`shrink-0 rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${badgeClass[item.badgeTone] || badgeClass.critical}`}
            >
              {item.badge}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex items-center justify-between text-sm font-semibold">
        <button type="button" className="text-merchant-primary hover:text-[#3837e6]">
          Restock Now
        </button>
        <button type="button" className="text-merchant-muted hover:text-merchant-body">
          View Vendors
        </button>
      </div>

      <div className="mt-4 rounded-lg border border-merchant-divider bg-merchant-surface p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-merchant-ink">{inventoryHealth.label}</span>
          <span className="text-sm font-bold text-merchant-primary">{inventoryHealth.percent}%</span>
        </div>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-merchant-divider">
          <div
            className="h-full rounded-full bg-merchant-primary"
            style={{ width: `${inventoryHealth.percent}%` }}
            role="progressbar"
            aria-valuenow={inventoryHealth.percent}
            aria-valuemin={0}
            aria-valuemax={100}
          />
        </div>
      </div>
    </section>
  )
}
