import { useNavigate, useOutletContext } from 'react-router-dom'
import { MERCHANT_MENU_IMPORT_SUCCESS } from '../../../../services/data/merchantMenuImportSuccess.mock'
import MerchantMenuImportSuccessHeader from './MerchantMenuImportSuccessHeader'
import MerchantMenuImportSuccessHero from './MerchantMenuImportSuccessHero'
import MerchantMenuImportSuccessNextSteps from './MerchantMenuImportSuccessNextSteps'
import MerchantMenuImportSuccessStats from './MerchantMenuImportSuccessStats'
import MerchantMenuImportSuccessWarehouse from './MerchantMenuImportSuccessWarehouse'

export default function MerchantMenuImportSuccessDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const data = MERCHANT_MENU_IMPORT_SUCCESS

  const handleReturnToInventory = () => {
    navigate('/merchant/menu')
  }

  const handleViewImportLogs = () => {
    // Placeholder for import logs view
  }

  return (
    <div className="hidden flex-1 flex-col gap-8 p-6 lg:flex lg:p-8">
      <MerchantMenuImportSuccessHeader
        title={data.pageTitle}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <MerchantMenuImportSuccessHero
        variant="desktop"
        headline={data.headline(data.importedCount)}
        description={data.description}
        actions={data.actions}
        onReturnToInventory={handleReturnToInventory}
        onViewImportLogs={handleViewImportLogs}
      />

      <MerchantMenuImportSuccessStats stats={data.stats} variant="desktop" />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <MerchantMenuImportSuccessNextSteps nextSteps={data.nextSteps} variant="desktop" />
        <MerchantMenuImportSuccessWarehouse warehouse={data.warehouse} variant="desktop" />
      </div>
    </div>
  )
}
