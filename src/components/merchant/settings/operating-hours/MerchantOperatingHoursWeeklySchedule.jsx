import { CalendarDays } from 'lucide-react'
import { merchantOperatingHoursCardClass } from './merchantOperatingHoursCardStyles'
import MerchantOperatingHoursDayRow from './MerchantOperatingHoursDayRow'

export default function MerchantOperatingHoursWeeklySchedule({
  schedule,
  onToggle,
  onTimeChange,
}) {
  return (
    <section className={merchantOperatingHoursCardClass}>
      <div className="flex items-center justify-between gap-4 border-b border-merchant-divider pb-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-merchant-primary text-white shadow-sm">
            <CalendarDays size={18} strokeWidth={2} aria-hidden />
          </span>
          <h2 className="text-lg font-bold text-merchant-ink">{schedule.title}</h2>
        </div>
        <span className="shrink-0 text-[10px] font-bold uppercase tracking-[0.14em] text-emerald-600">
          {schedule.liveBadge}
        </span>
      </div>

      <ul className="mt-4 space-y-2.5">
        {schedule.days.map((day) => (
          <MerchantOperatingHoursDayRow
            key={day.id}
            day={day}
            closedLabel={schedule.closedLabel}
            toLabel={schedule.toLabel}
            onToggle={onToggle}
            onTimeChange={onTimeChange}
          />
        ))}
      </ul>
    </section>
  )
}
