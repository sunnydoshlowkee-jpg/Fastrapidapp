import { MERCHANT_OPERATING_HOURS } from '../../../../services/data/merchantOperatingHours.mock'
import MerchantOperatingHoursMobileEmergency from './mobile/MerchantOperatingHoursMobileEmergency'
import MerchantOperatingHoursMobileHeader from './mobile/MerchantOperatingHoursMobileHeader'
import MerchantOperatingHoursMobileHolidays from './mobile/MerchantOperatingHoursMobileHolidays'
import MerchantOperatingHoursMobileSchedule from './mobile/MerchantOperatingHoursMobileSchedule'

export default function MerchantOperatingHoursMobile() {
  const data = MERCHANT_OPERATING_HOURS
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-0 lg:hidden">
      <MerchantOperatingHoursMobileHeader title={mobile.pageTitle} />

      <p className="text-sm leading-relaxed text-merchant-muted">{mobile.subtitle}</p>

      <MerchantOperatingHoursMobileSchedule schedule={mobile.weeklySchedule} />

      <MerchantOperatingHoursMobileEmergency emergency={mobile.emergency} />

      <MerchantOperatingHoursMobileHolidays holidays={mobile.holidays} />

      <button
        type="button"
        className="mt-2 w-full rounded-lg bg-merchant-input py-3.5 text-sm font-bold text-merchant-ink"
      >
        {mobile.discardLabel}
      </button>
    </div>
  )
}
