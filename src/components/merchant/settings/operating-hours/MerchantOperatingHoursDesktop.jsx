import { useOutletContext } from 'react-router-dom'
import MerchantOperatingHoursFooter from './MerchantOperatingHoursFooter'
import MerchantOperatingHoursHeader from './MerchantOperatingHoursHeader'
import MerchantOperatingHoursInstantClose from './MerchantOperatingHoursInstantClose'
import MerchantOperatingHoursIntro from './MerchantOperatingHoursIntro'
import MerchantOperatingHoursTip from './MerchantOperatingHoursTip'
import MerchantOperatingHoursToast from './MerchantOperatingHoursToast'
import MerchantOperatingHoursWeeklySchedule from './MerchantOperatingHoursWeeklySchedule'

export default function MerchantOperatingHoursDesktop({
  data,
  schedule,
  error,
  saving,
  closingStore,
  storePaused,
  toastVisible,
  toastMessage,
  onToggle,
  onTimeChange,
  onSave,
  onDiscard,
  onInstantClose,
}) {
  const { openMobileNav } = useOutletContext()

  return (
    <div className="relative hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantOperatingHoursHeader
        breadcrumbs={data.breadcrumbs}
        saveLabel={saving ? 'Saving…' : data.headerSaveLabel}
        showMenuButton
        onMenuClick={openMobileNav}
        onSave={onSave}
      />

      <MerchantOperatingHoursIntro title={data.pageTitle} description={data.pageDescription} />

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.2fr)_minmax(300px,380px)] xl:gap-6">
        <MerchantOperatingHoursWeeklySchedule
          schedule={schedule}
          onToggle={onToggle}
          onTimeChange={onTimeChange}
        />

        <div className="flex flex-col gap-4">
          <MerchantOperatingHoursInstantClose
            instantClose={data.instantClose}
            onClose={onInstantClose}
            loading={closingStore}
            storePaused={storePaused}
          />
          <MerchantOperatingHoursTip tip={data.tip} />
        </div>
      </div>

      <MerchantOperatingHoursFooter
        footer={{
          ...data.footer,
          saveLabel: saving ? 'Saving…' : data.footer.saveLabel,
        }}
        onDiscard={onDiscard}
        onSave={onSave}
      />

      <MerchantOperatingHoursToast message={toastMessage} visible={toastVisible} />
    </div>
  )
}
