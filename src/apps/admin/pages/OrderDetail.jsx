import { Navigate, useParams } from 'react-router-dom'
import AdminOrderDetailPage from '../../../components/admin/orders/AdminOrderDetailPage'
import { getAdminOrderDetail } from '../../../services/data/adminOrderDetail.mock'
import { ADMIN_ORDERS_PATH } from '../../../services/data/adminOrders.mock'

export default function OrderDetail() {
  const { orderId } = useParams()
  if (!orderId) return <Navigate to={ADMIN_ORDERS_PATH} replace />

  const order = getAdminOrderDetail(orderId)
  return <AdminOrderDetailPage order={order} />
}
