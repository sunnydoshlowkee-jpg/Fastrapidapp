import { Navigate } from 'react-router-dom'
import { MERCHANT_INVENTORY_MODE } from '../../../services/data/merchantInventory.mock'
import { MERCHANT_MENU_UPLOAD_PATH } from '../../../services/data/merchantMenuUpload.mock'
import MerchantInventoryPage from '../../../components/merchant/inventory/list/MerchantInventoryPage'

export default function Menu() {
  if (MERCHANT_INVENTORY_MODE !== 'active') {
    return <Navigate to={MERCHANT_MENU_UPLOAD_PATH} replace />
  }

  return <MerchantInventoryPage />
}
