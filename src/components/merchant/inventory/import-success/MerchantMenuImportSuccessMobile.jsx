import { useNavigate } from 'react-router-dom'
import { MERCHANT_MENU_IMPORT_SUCCESS } from '../../../../services/data/merchantMenuImportSuccess.mock'
import MerchantMenuImportSuccessHero from './MerchantMenuImportSuccessHero'
import MerchantMenuImportSuccessNextSteps from './MerchantMenuImportSuccessNextSteps'
import MerchantMenuImportSuccessStats from './MerchantMenuImportSuccessStats'
import MerchantMenuImportSuccessWarehouse from './MerchantMenuImportSuccessWarehouse'

export default function MerchantMenuImportSuccessMobile() {
  const navigate = useNavigate()
  const data = MERCHANT_MENU_IMPORT_SUCCESS
  const mobile = data.mobile

  const handleReturnToInventory = () => {
    navigate('/merchant/menu')
  }

  const handleViewImportLogs = () => {
    // Placeholder for import logs view
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuImportSuccessHero
        variant="mobile"
        headline={data.headline(data.importedCount)}
        description={mobile.description}
        actions={data.actions}
        onReturnToInventory={handleReturnToInventory}
        onViewImportLogs={handleViewImportLogs}
      />

      <MerchantMenuImportSuccessStats stats={mobile.stats} variant="mobile" />

      <MerchantMenuImportSuccessNextSteps nextSteps={mobile.nextSteps} variant="mobile" />

      <MerchantMenuImportSuccessWarehouse warehouse={mobile.warehouse} variant="mobile" />
    </div>
  )
}
