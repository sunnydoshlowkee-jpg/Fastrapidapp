import { useOutletContext } from 'react-router-dom'
import { MERCHANT_ACCOUNT_SETTINGS } from '../../../../services/data/merchantAccountSettings.mock'
import MerchantAccountSettingsDangerZone from './MerchantAccountSettingsDangerZone'
import MerchantAccountSettingsHeader from './MerchantAccountSettingsHeader'
import MerchantAccountSettingsProfileForm from './MerchantAccountSettingsProfileForm'
import MerchantAccountSettingsTeam from './MerchantAccountSettingsTeam'

export default function MerchantAccountSettingsDesktop() {
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_ACCOUNT_SETTINGS

  return (
    <div className="hidden flex-1 flex-col gap-8 p-6 lg:flex lg:gap-10 lg:p-8">
      <MerchantAccountSettingsHeader
        title={data.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <div className="mx-auto flex w-full max-w-5xl flex-col gap-10 lg:gap-12">
        <MerchantAccountSettingsProfileForm profile={data.profile} />
        <MerchantAccountSettingsTeam team={data.team} />
        <MerchantAccountSettingsDangerZone dangerZone={data.dangerZone} />
      </div>
    </div>
  )
}
