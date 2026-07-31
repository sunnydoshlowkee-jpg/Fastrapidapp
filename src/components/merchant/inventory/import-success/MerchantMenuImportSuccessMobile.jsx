import { useNavigate } from 'react-router-dom'
import MerchantMenuImportSuccessHero from './MerchantMenuImportSuccessHero'
import MerchantMenuImportSuccessNextSteps from './MerchantMenuImportSuccessNextSteps'
import MerchantMenuImportSuccessStats from './MerchantMenuImportSuccessStats'
import MerchantMenuImportSuccessWarehouse from './MerchantMenuImportSuccessWarehouse'

export default function MerchantMenuImportSuccessMobile({ data }) {
  const navigate = useNavigate()
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5 lg:hidden">
      <MerchantMenuImportSuccessHero
        variant="mobile"
        headline={data.headline(data.importedCount)}
        description={mobile.description}
        actions={data.actions}
        onReturnToInventory={() => navigate('/merchant/menu')}
        onViewImportLogs={() => navigate('/merchant/menu')}
      />

      <MerchantMenuImportSuccessStats stats={mobile.stats} variant="mobile" />

      <MerchantMenuImportSuccessNextSteps nextSteps={mobile.nextSteps} variant="mobile" />

      <MerchantMenuImportSuccessWarehouse warehouse={mobile.warehouse} variant="mobile" />
    </div>
  )
}
