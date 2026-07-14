import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  fetchAdminMerchantOrders,
  mapAdminMerchantOrderFromApi,
} from '../../../services/adminMerchantsService'
import AdminOrdersStatusBadge from '../orders/AdminOrdersStatusBadge'

export default function AdminMerchantOrdersPanel({ merchantId }) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadOrders = useCallback(async () => {
    if (!merchantId) {
      setOrders([])
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')
      const result = await fetchAdminMerchantOrders(merchantId)
      setOrders(result.orders.map(mapAdminMerchantOrderFromApi))
    } catch (err) {
      setOrders([])
      setError(err.message || 'Could not load merchant orders.')
    } finally {
      setLoading(false)
    }
  }, [merchantId])

  useEffect(() => {
    loadOrders()
  }, [loadOrders])

  if (loading) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-sm text-gray-500">Loading orders...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-sm text-red-600">{error}</p>
      </div>
    )
  }

  if (orders.length === 0) {
    return (
      <div className="rounded-xl bg-white p-12 text-center shadow-sm ring-1 ring-gray-100">
        <p className="text-sm font-semibold text-gray-600">No orders yet for this merchant.</p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
      <div className="border-b border-gray-100 px-6 py-4">
        <h3 className="text-base font-bold text-gray-900">Merchant Orders</h3>
        <p className="mt-1 text-sm text-gray-500">
          Orders containing items sold by this merchant.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-100 bg-gray-50/80">
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Order ID
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Customer
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Items
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Merchant Total
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Status
              </th>
              <th className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">
                Payment
              </th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-gray-50 transition-colors hover:bg-gray-50/60 last:border-0"
              >
                <td className="px-6 py-4">
                  <Link
                    to={`/admin/orders/${order.numericId}`}
                    className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange"
                  >
                    {order.id}
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-semibold text-gray-900">{order.customer.name}</p>
                  <p className="text-xs text-gray-500">{order.customer.phone}</p>
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  {order.items} {order.items === 1 ? 'Item' : 'Items'}
                </td>
                <td className="px-6 py-4 text-sm font-bold text-violet-600">₦ {order.total}</td>
                <td className="px-6 py-4">
                  <AdminOrdersStatusBadge status={order.status} label={order.statusLabel} />
                </td>
                <td className="px-6 py-4 text-sm font-medium text-gray-700">
                  {order.paymentStatusLabel}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
