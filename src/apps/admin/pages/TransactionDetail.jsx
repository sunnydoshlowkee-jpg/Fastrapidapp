import { Navigate, useParams } from 'react-router-dom'
import AdminTransactionDetailPage from '../../../components/admin/transactions/AdminTransactionDetailPage'
import { ADMIN_TRANSACTIONS_PATH } from '../../../services/data/adminTransactions.mock'

export default function TransactionDetail() {
  const { transactionId } = useParams()
  if (!transactionId) return <Navigate to={ADMIN_TRANSACTIONS_PATH} replace />
  return <AdminTransactionDetailPage />
}
