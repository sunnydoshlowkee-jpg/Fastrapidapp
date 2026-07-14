import { MERCHANT_ACCOUNT_SETTINGS } from '../../../../services/data/merchantAccountSettings.mock'
import MerchantAccountSettingsMobileDangerZone from './mobile/MerchantAccountSettingsMobileDangerZone'
import MerchantAccountSettingsMobileHeader from './mobile/MerchantAccountSettingsMobileHeader'
import MerchantAccountSettingsMobileProfile from './mobile/MerchantAccountSettingsMobileProfile'
import MerchantAccountSettingsMobileTeam from './mobile/MerchantAccountSettingsMobileTeam'

export default function MerchantAccountSettingsMobile() {
  const data = MERCHANT_ACCOUNT_SETTINGS
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantAccountSettingsMobileHeader title={data.pageTitle} merchantId={mobile.merchantId} />

      <MerchantAccountSettingsMobileProfile profile={mobile.profile} />
      <MerchantAccountSettingsMobileTeam team={mobile.team} />
      <MerchantAccountSettingsMobileDangerZone dangerZone={mobile.dangerZone} />
    </div>
  )
}
