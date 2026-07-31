import MerchantOperatingHoursMobileDayRow from './MerchantOperatingHoursMobileDayRow'

export default function MerchantOperatingHoursMobileSchedule({
  schedule,
  onToggle,
  onTimeChange,
}) {
  return (
    <section className="rounded-merchant-stat bg-merchant-surface px-4 py-1 shadow-merchant-stat">
      <ul>
        {schedule.days.map((day) => (
          <MerchantOperatingHoursMobileDayRow
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
