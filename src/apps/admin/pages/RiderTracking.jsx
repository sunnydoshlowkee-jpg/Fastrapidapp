import { Navigate, useParams } from 'react-router-dom'
import AdminRiderTrackingPage from '../../../components/admin/riders/AdminRiderTrackingPage'
import { getAdminRiderTracking } from '../../../services/data/adminRiderTracking.mock'
import { ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'

export default function RiderTracking() {
  const { riderId } = useParams()
  if (!riderId) return <Navigate to={ADMIN_RIDERS_PATH} replace />

  const tracking = getAdminRiderTracking(riderId)
  return <AdminRiderTrackingPage tracking={tracking} />
}
