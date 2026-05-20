import MerchantInventoryAvailabilityToggle from '../../inventory/list/MerchantInventoryAvailabilityToggle'
import {
  merchantOperatingHoursTimeInputClass,
  merchantOperatingHoursTimeInputOnboardingMobileClass,
} from './merchantOperatingHoursCardStyles'

export default function MerchantOperatingHoursDayRow({
  day,
  closedLabel,
  toLabel,
  onToggle,
  onTimeChange,
  variant = 'default',
}) {
  const isOnboardingMobile = variant === 'onboardingMobile'
  const timeClass = isOnboardingMobile
    ? merchantOperatingHoursTimeInputOnboardingMobileClass
    : merchantOperatingHoursTimeInputClass
  const dayLabel = isOnboardingMobile ? day.label.slice(0, 3) : day.label

  return (
    <li
      className={
        isOnboardingMobile
          ? 'flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-merchant-divider py-4 last:border-b-0'
          : 'flex items-center gap-3 rounded-lg bg-merchant-input px-4 py-3.5'
      }
    >
      <MerchantInventoryAvailabilityToggle
        enabled={day.open}
        onChange={(open) => onToggle(day.id, open)}
        label={`Toggle ${day.label}`}
      />

      <span
        className={`shrink-0 text-sm font-medium ${
          day.open ? 'text-merchant-ink' : 'text-merchant-muted'
        }`}
      >
        {dayLabel}
      </span>

      {day.open ? (
        <div className="ml-auto flex shrink-0 flex-nowrap items-center gap-2">
          <input
            type="text"
            value={day.openTime}
            onChange={(e) => onTimeChange(day.id, 'openTime', e.target.value)}
            className={timeClass}
            aria-label={`${day.label} opening time`}
          />
          <span className="px-0.5 text-xs text-merchant-muted">{toLabel.toLowerCase()}</span>
          <input
            type="text"
            value={day.closeTime}
            onChange={(e) => onTimeChange(day.id, 'closeTime', e.target.value)}
            className={timeClass}
            aria-label={`${day.label} closing time`}
          />
        </div>
      ) : (
        <p
          className={
            isOnboardingMobile
              ? 'ml-auto min-w-[5.5rem] shrink-0 rounded-lg border border-merchant-divider bg-transparent px-3 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.12em] text-merchant-muted'
              : 'ml-auto shrink-0 text-[11px] font-semibold uppercase tracking-[0.12em] text-merchant-muted'
          }
        >
          {closedLabel}
        </p>
      )}
    </li>
  )
}
