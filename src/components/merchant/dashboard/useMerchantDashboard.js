import { useCallback, useEffect, useState } from 'react'
import {
  buildDashboardStats,
  getMerchantDashboard,
  mapLiveOrderFromApi,
  resolveMerchantOrderApiId,
  updateMerchantOrderStatus,
} from '../../../services/merchantOrdersService'

export default function useMerchantDashboard() {
  const [dashboard, setDashboard] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async () => {
    setLoading(true)
    setError('')

    try {
      const data = await getMerchantDashboard()
      setDashboard(data)
    } catch (err) {
      setError(err?.message || 'Could not load dashboard.')
      setDashboard(null)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    refresh()
  }, [refresh])

  const liveOrders = (dashboard?.live_orders || []).map(mapLiveOrderFromApi).filter(Boolean)
  const stats = buildDashboardStats(dashboard?.stats, liveOrders)

  const handleOrderAction = async (orderId, action) => {
    const numericId = resolveMerchantOrderApiId(orderId)
    if (!numericId) {
      throw new Error('Invalid order id.')
    }
    await updateMerchantOrderStatus(numericId, action)
    await refresh()
  }

  return {
    dashboard,
    merchantId: dashboard?.merchant_id || '—',
    storeStatus: dashboard?.store_status || 'STORE LIVE',
    stats,
    liveOrders,
    hasLiveOrders: Boolean(dashboard?.has_live_orders) || liveOrders.length > 0,
    loading,
    error,
    refresh,
    handleOrderAction,
  }
}
