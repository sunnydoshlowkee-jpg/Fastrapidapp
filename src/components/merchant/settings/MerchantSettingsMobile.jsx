import { useNavigate } from 'react-router-dom'
import { MERCHANT_HELP_SUPPORT_PATH } from '../../../services/data/merchantHelpSupport.mock'
import { clearMerchantSession } from '../../../services/merchantAuthService'
import { MERCHANT_SETTINGS } from '../../../services/data/merchantSettings.mock'
import { MERCHANT_SETTINGS_CARD_ROUTES } from '../../../services/data/merchantSettingsRoutes'
import MerchantSettingsGrid from './MerchantSettingsGrid'
import MerchantSettingsMobileFooter from './mobile/MerchantSettingsMobileFooter'
import MerchantSettingsMobileHeader from './mobile/MerchantSettingsMobileHeader'

export default function MerchantSettingsMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_SETTINGS
  const mobile = data.mobile

  const handleSignOut = () => {
    clearMerchantSession()
    navigate('/merchant/login', { replace: true })
  }

  const handleSelectCard = (cardId) => {
    const card = mobile.cards.find((item) => item.id === cardId)
    const path = card?.to ?? MERCHANT_SETTINGS_CARD_ROUTES[cardId]
    if (path) navigate(path)
  }

  const handleQuickSupport = () => {
    navigate(MERCHANT_HELP_SUPPORT_PATH)
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantSettingsMobileHeader
        heading={data.heading}
        merchantId={mobile.merchantId}
      />

      <MerchantSettingsGrid
        cards={mobile.cards}
        variant="mobile"
        onSelectCard={handleSelectCard}
      />

      <MerchantSettingsMobileFooter
        signOutLabel={mobile.signOutLabel}
        quickSupportLabel={mobile.quickSupportLabel}
        onSignOut={handleSignOut}
        onQuickSupport={handleQuickSupport}
      />
    </div>
  )
}
