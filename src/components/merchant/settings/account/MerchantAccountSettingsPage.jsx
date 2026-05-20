import MerchantAccountSettingsDesktop from './MerchantAccountSettingsDesktop'
import MerchantAccountSettingsMobile from './MerchantAccountSettingsMobile'

export default function MerchantAccountSettingsPage() {
  return (
    <>
      <MerchantAccountSettingsMobile />
      <MerchantAccountSettingsDesktop />
    </>
  )
}
