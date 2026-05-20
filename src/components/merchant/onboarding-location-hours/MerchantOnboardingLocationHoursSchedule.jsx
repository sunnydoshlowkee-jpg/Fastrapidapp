import { useState } from 'react'
import MerchantOperatingHoursDayRow from '../settings/operating-hours/MerchantOperatingHoursDayRow'
import MerchantOnboardingLocationHoursSection from './MerchantOnboardingLocationHoursSection'

export default function MerchantOnboardingLocationHoursSchedule({
  hours,
  hideSectionNumber = false,
  externalDays,
  onExternalDaysChange,
  descriptionOverride,
  dayRowVariant = 'default',
}) {
  const [internalDays, setInternalDays] = useState(() => hours.days.map((d) => ({ ...d })))
  const controlled = externalDays != null && onExternalDaysChange != null
  const days = controlled ? externalDays : internalDays

  const handleToggle = (id, open) => {
    const next = days.map((day) => (day.id === id ? { ...day, open } : day))
    if (controlled) onExternalDaysChange(next)
    else setInternalDays(next)
  }

  const handleTimeChange = (id, field, value) => {
    const next = days.map((day) => (day.id === id ? { ...day, [field]: value } : day))
    if (controlled) onExternalDaysChange(next)
    else setInternalDays(next)
  }

  const sectionDescription = descriptionOverride ?? hours.description

  return (
    <MerchantOnboardingLocationHoursSection
      number={hours.number}
      title={hours.title}
      description={sectionDescription}
      hideNumber={hideSectionNumber}
    >
      <ul className={dayRowVariant === 'onboardingMobile' ? 'space-y-0' : 'space-y-2'}>
        {days.map((day) => (
          <MerchantOperatingHoursDayRow
            key={day.id}
            day={day}
            closedLabel={hours.closedLabel}
            toLabel={hours.toLabel}
            onToggle={handleToggle}
            onTimeChange={handleTimeChange}
            variant={dayRowVariant}
          />
        ))}
      </ul>
    </MerchantOnboardingLocationHoursSection>
  )
}
