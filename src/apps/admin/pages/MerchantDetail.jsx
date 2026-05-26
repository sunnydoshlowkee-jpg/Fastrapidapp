import { Navigate, useParams } from 'react-router-dom'
import AdminMerchantDetailPage from '../../../components/admin/merchants/AdminMerchantDetailPage'
import { getAdminMerchantDetail } from '../../../services/data/adminMerchantDetail.mock'
import { ADMIN_MERCHANTS_PATH } from '../../../services/data/adminMerchants.mock'

export default function MerchantDetail() {
  const { merchantId } = useParams()
  if (!merchantId) return <Navigate to={ADMIN_MERCHANTS_PATH} replace />

  const merchant = getAdminMerchantDetail(merchantId)
  return <AdminMerchantDetailPage merchant={merchant} />
}
