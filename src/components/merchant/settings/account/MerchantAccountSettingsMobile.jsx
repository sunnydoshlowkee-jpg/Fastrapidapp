import MerchantAccountSettingsMobileDangerZone from './mobile/MerchantAccountSettingsMobileDangerZone'
import MerchantAccountSettingsMobileHeader from './mobile/MerchantAccountSettingsMobileHeader'
import MerchantAccountSettingsMobileProfile from './mobile/MerchantAccountSettingsMobileProfile'

export default function MerchantAccountSettingsMobile({ data }) {
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantAccountSettingsMobileHeader title={data.pageTitle} merchantId={mobile.merchantId} />

      <MerchantAccountSettingsMobileProfile profile={mobile.profile} />
      <MerchantAccountSettingsMobileDangerZone dangerZone={mobile.dangerZone} />
    </div>
  )
}
