import { Navigate } from 'react-router-dom'

/** Legacy mock approvals route — pending merchants live on the merchants list. */
export default function MerchantApprovals() {
  return <Navigate to="/admin/merchants?status=pending" replace />
}
