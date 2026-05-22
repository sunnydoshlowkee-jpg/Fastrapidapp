import { Navigate, useParams } from 'react-router-dom'
import AdminRiderDetailPage from '../../../components/admin/riders/AdminRiderDetailPage'
import { getAdminRiderDetail } from '../../../services/data/adminRiderDetail.mock'
import { ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'

export default function RiderDetail() {
  const { riderId } = useParams()
  if (!riderId) return <Navigate to={ADMIN_RIDERS_PATH} replace />

  const rider = getAdminRiderDetail(riderId)
  return <AdminRiderDetailPage rider={rider} />
}
