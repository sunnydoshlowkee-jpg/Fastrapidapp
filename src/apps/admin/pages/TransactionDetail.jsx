import { Navigate } from 'react-router-dom'

/** Transaction detail tools (refund/flag) stay Phase 2 — ledger list is live. */
export default function TransactionDetail() {
  return <Navigate to="/admin/transactions" replace />
}
