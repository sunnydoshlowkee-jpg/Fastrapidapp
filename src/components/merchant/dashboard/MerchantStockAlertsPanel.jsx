import { AlertCircle, AlertTriangle, Package } from 'lucide-react'

const severityBar = {
  critical: 'bg-[#E67E22]',
  warning: 'bg-[rgba(230,126,34,0.55)]',
  out: 'bg-[#E67E22]',
}

function AlertIcon({ severity }) {
  if (severity === 'out') return <AlertCircle size={16} className="text-[#E67E22]" aria-hidden />
  if (severity === 'critical') return <AlertTriangle size={16} className="text-[#E67E22]" aria-hidden />
  return null
}

export default function MerchantStockAlertsPanel({ stockAlerts }) {
  const { badge, items, inventoryHealth } = stockAlerts

  return (
    <section className="flex flex-col rounded-merchant-stat bg-merchant-surface p-5 shadow-merchant-stat lg:p-6">
      <div className="mb-4 flex items-center justify-between gap-2">
        <h2 className="text-base font-semibold text-merchant-ink">Stock Alerts</h2>
        <span className="rounded-full bg-[rgba(230,126,34,0.14)] px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.06em] text-[#E67E22]">
          {badge}
        </span>
      </div>

      <ul className="flex flex-col gap-4">
        {items.map((item) => (
          <li key={item.id} className="flex gap-3">
            <span
              className={`mt-0.5 w-1 shrink-0 self-stretch rounded-full ${severityBar[item.severity] || severityBar.warning}`}
              aria-hidden
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-merchant-ink">{item.title}</p>
                {item.showIcon && <AlertIcon severity={item.severity} />}
              </div>
              <p className="mt-0.5 text-xs text-merchant-muted">{item.detail}</p>
              <button
                type="button"
                className="mt-1.5 text-xs font-semibold text-merchant-primary hover:text-[#3837e6]"
              >
                {item.action}
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-5 rounded-lg bg-merchant-icon-tile p-4">
        <div className="flex items-center gap-2">
          <Package size={16} className="text-merchant-primary" aria-hidden />
          <p className="text-[10px] font-bold uppercase tracking-[0.08em] text-merchant-muted">
            {inventoryHealth.label}
          </p>
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
        <p className="mt-2 text-xs font-medium text-merchant-body">{inventoryHealth.subtext}</p>
      </div>
    </section>
  )
}

