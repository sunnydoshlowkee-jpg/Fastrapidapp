import MerchantInventoryAvailabilityToggle from '../../../inventory/list/MerchantInventoryAvailabilityToggle'
import { merchantOperatingHoursMobileTimeInputClass } from './merchantOperatingHoursMobileStyles'

export default function MerchantOperatingHoursMobileDayRow({
  day,
  closedLabel,
  toLabel,
  onToggle,
  onTimeChange,
}) {
  return (
    <li className="border-b border-merchant-divider py-4 last:border-b-0">
      <div className="flex items-center gap-3">
        <MerchantInventoryAvailabilityToggle
          enabled={day.open}
          onChange={(open) => onToggle(day.id, open)}
          label={`Toggle ${day.label}`}
        />
        <span className="text-sm font-bold text-merchant-ink">{day.label}</span>
      </div>

      {day.open ? (
        <div className="mt-3 flex items-center gap-2">
          <input
            type="text"
            value={day.openTime}
            onChange={(e) => onTimeChange(day.id, 'openTime', e.target.value)}
            className={merchantOperatingHoursMobileTimeInputClass}
            aria-label={`${day.label} opening time`}
          />
          <span className="shrink-0 text-xs lowercase text-merchant-muted">{toLabel}</span>
          <input
            type="text"
            value={day.closeTime}
            onChange={(e) => onTimeChange(day.id, 'closeTime', e.target.value)}
            className={merchantOperatingHoursMobileTimeInputClass}
            aria-label={`${day.label} closing time`}
          />
        </div>
      ) : (
        <p
          className="mt-3 rounded-full bg-merchant-input py-2.5 text-center text-[11px] font-bold uppercase tracking-[0.1em] text-merchant-muted"
          aria-live="polite"
        >
          {closedLabel}
        </p>
      )}
    </li>
  )
}
