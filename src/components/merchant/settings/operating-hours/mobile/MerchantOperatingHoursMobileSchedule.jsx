import { useState } from 'react'
import MerchantOperatingHoursMobileDayRow from './MerchantOperatingHoursMobileDayRow'

export default function MerchantOperatingHoursMobileSchedule({ schedule }) {
  const [days, setDays] = useState(schedule.days)

  const handleToggle = (id, open) => {
    setDays((prev) =>
      prev.map((day) =>
        day.id === id
          ? {
              ...day,
              open,
              openTime: day.openTime ?? '09:00AM',
              closeTime: day.closeTime ?? '09:00PM',
            }
          : day,
      ),
    )
  }

  const handleTimeChange = (id, field, value) => {
    setDays((prev) => prev.map((day) => (day.id === id ? { ...day, [field]: value } : day)))
  }

  return (
    <section className="rounded-merchant-stat bg-merchant-surface px-4 py-1 shadow-merchant-stat">
      <ul>
        {days.map((day) => (
          <MerchantOperatingHoursMobileDayRow
            key={day.id}
            day={day}
            closedLabel={schedule.closedLabel}
            toLabel={schedule.toLabel}
            onToggle={handleToggle}
            onTimeChange={handleTimeChange}
          />
        ))}
      </ul>
    </section>
  )
}
