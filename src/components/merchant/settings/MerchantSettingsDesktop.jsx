import { useNavigate, useOutletContext } from 'react-router-dom'
import { clearMerchantSession } from '../../../services/merchantAuthService'
import { MERCHANT_SETTINGS } from '../../../services/data/merchantSettings.mock'
import { MERCHANT_SETTINGS_CARD_ROUTES } from '../../../services/data/merchantSettingsRoutes'
import MerchantSettingsGrid from './MerchantSettingsGrid'
import MerchantSettingsHeader from './MerchantSettingsHeader'
import MerchantSettingsIntro from './MerchantSettingsIntro'
import MerchantSettingsLogout from './MerchantSettingsLogout'

export default function MerchantSettingsDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_SETTINGS

  const handleLogout = () => {
    clearMerchantSession()
    navigate('/merchant/login', { replace: true })
  }

  const handleSelectCard = (cardId) => {
    const card = data.cards.find((item) => item.id === cardId)
    const path = card?.to ?? MERCHANT_SETTINGS_CARD_ROUTES[cardId]
    if (path) navigate(path)
  }

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantSettingsHeader
        title={data.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <section className="rounded-merchant-stat bg-merchant-surface p-6 shadow-merchant-stat lg:p-8">
        <MerchantSettingsIntro heading={data.heading} subtitle={data.subtitle} />

        <div className="mt-8">
          <MerchantSettingsGrid cards={data.cards} onSelectCard={handleSelectCard} />
        </div>

        <div className="mt-8">
          <MerchantSettingsLogout label={data.logoutLabel} onLogout={handleLogout} />
        </div>
      </section>
    </div>
  )
}
