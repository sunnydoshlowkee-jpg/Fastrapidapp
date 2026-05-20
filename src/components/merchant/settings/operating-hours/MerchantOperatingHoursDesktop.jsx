import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { MERCHANT_OPERATING_HOURS } from '../../../../services/data/merchantOperatingHours.mock'
import MerchantOperatingHoursFooter from './MerchantOperatingHoursFooter'
import MerchantOperatingHoursHeader from './MerchantOperatingHoursHeader'
import MerchantOperatingHoursHolidays from './MerchantOperatingHoursHolidays'
import MerchantOperatingHoursInstantClose from './MerchantOperatingHoursInstantClose'
import MerchantOperatingHoursIntro from './MerchantOperatingHoursIntro'
import MerchantOperatingHoursTip from './MerchantOperatingHoursTip'
import MerchantOperatingHoursToast from './MerchantOperatingHoursToast'
import MerchantOperatingHoursWeeklySchedule from './MerchantOperatingHoursWeeklySchedule'

export default function MerchantOperatingHoursDesktop() {
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_OPERATING_HOURS
  const [toastVisible, setToastVisible] = useState(false)

  const showToast = () => {
    setToastVisible(true)
    window.setTimeout(() => setToastVisible(false), 3200)
  }

  return (
    <div className="relative hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantOperatingHoursHeader
        breadcrumbs={data.breadcrumbs}
        saveLabel={data.headerSaveLabel}
        showMenuButton
        onMenuClick={openMobileNav}
        onSave={showToast}
      />

      <MerchantOperatingHoursIntro title={data.pageTitle} description={data.pageDescription} />

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,380px)] xl:gap-6">
        <MerchantOperatingHoursWeeklySchedule schedule={data.weeklySchedule} />

        <div className="flex flex-col gap-4">
          <MerchantOperatingHoursInstantClose instantClose={data.instantClose} />
          <MerchantOperatingHoursHolidays holidays={data.holidays} />
          <MerchantOperatingHoursTip tip={data.tip} />
        </div>
      </div>

      <MerchantOperatingHoursFooter
        footer={data.footer}
        onDiscard={() => setToastVisible(false)}
        onSave={showToast}
      />

      <MerchantOperatingHoursToast message={data.toast.message} visible={toastVisible} />
    </div>
  )
}


