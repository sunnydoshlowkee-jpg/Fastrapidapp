import MerchantOperatingHoursMobileEmergency from './mobile/MerchantOperatingHoursMobileEmergency'
import MerchantOperatingHoursMobileHeader from './mobile/MerchantOperatingHoursMobileHeader'
import MerchantOperatingHoursMobileSchedule from './mobile/MerchantOperatingHoursMobileSchedule'
import MerchantOperatingHoursToast from './MerchantOperatingHoursToast'

export default function MerchantOperatingHoursMobile({
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
  const mobile = data.mobile

  return (
    <div className="relative flex flex-1 flex-col gap-5 px-4 pb-8 pt-0 lg:hidden">
      <MerchantOperatingHoursMobileHeader title={mobile.pageTitle} />

      <p className="text-sm leading-relaxed text-merchant-muted">{mobile.subtitle}</p>

      {error ? (
        <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <MerchantOperatingHoursMobileSchedule
        schedule={schedule}
        onToggle={onToggle}
        onTimeChange={onTimeChange}
      />

      <MerchantOperatingHoursMobileEmergency
        emergency={mobile.emergency}
        onClose={onInstantClose}
        loading={closingStore}
        storePaused={storePaused}
      />

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="mt-2 w-full rounded-lg bg-merchant-primary py-3.5 text-sm font-bold text-white disabled:opacity-60"
      >
        {saving ? 'Saving…' : data.footer.saveLabel}
      </button>

      <button
        type="button"
        onClick={onDiscard}
        className="w-full rounded-lg bg-merchant-input py-3.5 text-sm font-bold text-merchant-ink"
      >
        {mobile.discardLabel}
      </button>

      <MerchantOperatingHoursToast message={toastMessage} visible={toastVisible} />
    </div>
  )
}
