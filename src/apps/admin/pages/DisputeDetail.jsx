import { Navigate, useParams } from 'react-router-dom'
import AdminDisputeDetailMobile from '../../../components/admin/disputes/AdminDisputeDetailMobile'
import AdminDisputesPage from '../../../components/admin/disputes/AdminDisputesPage'
import {
  ADMIN_DISPUTES_PATH,
  getAdminDisputeById,
} from '../../../services/data/adminDisputes.mock'

export default function DisputeDetail() {
  const { disputeId } = useParams()
  if (!disputeId) return <Navigate to={ADMIN_DISPUTES_PATH} replace />

  const dispute = getAdminDisputeById(disputeId)

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminDisputeDetailMobile dispute={dispute} />
      </div>
      <div className="hidden h-full min-h-0 flex-1 lg:flex">
        <AdminDisputesPage initialDisputeId={dispute.id} />
      </div>
    </>
  )
}
