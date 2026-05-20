import { Pencil } from 'lucide-react'

export default function MerchantOperatingHoursMobileHolidays({ holidays }) {
  return (
    <section>
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-base font-bold text-merchant-ink">{holidays.title}</h2>
        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-merchant-primary"
        >
          {holidays.addLabel}
        </button>
      </div>

      <ul className="mt-3 divide-y divide-merchant-divider">
        {holidays.items.map((item) => (
          <li key={item.id} className="flex items-center justify-between gap-3 py-3.5 first:pt-0">
            <div className="min-w-0">
              <p className="text-sm font-semibold text-merchant-ink">{item.name}</p>
              <p className="mt-0.5 text-xs text-merchant-muted">{item.date}</p>
            </div>
            <button
              type="button"
              className="flex h-9 w-9 shrink-0 items-center justify-center text-merchant-muted"
              aria-label={`Edit ${item.name}`}
            >
              <Pencil size={16} strokeWidth={1.75} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
