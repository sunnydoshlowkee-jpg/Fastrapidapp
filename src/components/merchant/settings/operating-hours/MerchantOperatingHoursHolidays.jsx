import { CalendarX, Pencil } from 'lucide-react'
import { merchantOperatingHoursCardClass } from './merchantOperatingHoursCardStyles'

export default function MerchantOperatingHoursHolidays({ holidays }) {
  return (
    <section className={`${merchantOperatingHoursCardClass} border border-merchant-divider`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
            <CalendarX size={17} strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="text-base font-bold text-merchant-ink">{holidays.title}</h2>
        </div>
        <button
          type="button"
          className="shrink-0 text-sm font-semibold text-merchant-primary transition-colors hover:text-merchant-link"
        >
          {holidays.addLabel}
        </button>
      </div>

      <ul className="mt-4 space-y-2.5">
        {holidays.items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between gap-3 rounded-lg bg-merchant-input px-3.5 py-3"
          >
            <div className="min-w-0">
              <p className="text-sm font-semibold text-merchant-ink">{item.name}</p>
              <p className="mt-0.5 text-xs text-merchant-muted">{item.date}</p>
            </div>
            <button
              type="button"
              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md text-merchant-muted transition-colors hover:bg-merchant-surface hover:text-merchant-ink"
              aria-label={`Edit ${item.name}`}
            >
              <Pencil size={15} strokeWidth={1.75} />
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
