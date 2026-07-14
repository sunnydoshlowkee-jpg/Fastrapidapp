import { useEffect, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import AdminOrderDetailPage from '../../../components/admin/orders/AdminOrderDetailPage'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import {
  fetchAdminOrderDetail,
  mapAdminOrderDetailFromApi,
} from '../../../services/adminOrdersService'
import { ADMIN_ORDERS_PATH } from '../../../services/data/adminOrders.mock'

export default function OrderDetail() {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false

    async function load() {
      if (!orderId) {
        setError('Order not found.')
        setLoading(false)
        return
      }

      if (!getAdminAuthToken()) {
        setError('Please sign in to view this order.')
        setLoading(false)
        return
      }

      setLoading(true)
      setError('')

      try {
        const payload = await fetchAdminOrderDetail(orderId)
        if (!cancelled) {
          setOrder(mapAdminOrderDetailFromApi(payload))
        }
      } catch (err) {
        if (!cancelled) {
          setOrder(null)
          const message =
            err.response?.status === 404
              ? 'Order not found.'
              : err.response?.data?.message || 'Unable to load order details.'
          setError(message)
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [orderId])

  if (!orderId) return <Navigate to={ADMIN_ORDERS_PATH} replace />

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6 text-sm text-gray-500">
        Loading order details…
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-6 text-center">
        <p className="text-sm text-gray-600">{error || 'Order not found.'}</p>
        <Link
          to={ADMIN_ORDERS_PATH}
          className="text-sm font-semibold text-rapid-orange hover:underline"
        >
          Back to orders
        </Link>
      </div>
    )
  }

  return <AdminOrderDetailPage order={order} />
}
