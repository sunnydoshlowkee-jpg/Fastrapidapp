import { MERCHANT_INVENTORY_MODE } from '../../../services/data/merchantInventory.mock'
import MerchantInventoryPage from '../../../components/merchant/inventory/list/MerchantInventoryPage'
import MerchantMenuUploadPage from '../../../components/merchant/inventory/MerchantMenuUploadPage'

export default function Menu() {
  if (MERCHANT_INVENTORY_MODE === 'active') {
    return <MerchantInventoryPage />
  }

  return <MerchantMenuUploadPage />
}
