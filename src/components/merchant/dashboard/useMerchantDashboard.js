import { useCallback, useEffect, useState } from 'react'
import {
  buildDashboardStats,
  getMerchantDashboard,
  mapLiveOrderFromApi,
  resolveMerchantOrderApiId,
  updateMerchantOrderStatus,
} from '../../../services/merchantOrdersService'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'

function mapStockAlerts(apiAlerts) {
  if (!apiAlerts) {
    return {
      badge: 'ALL CLEAR',
      items: [],
      inventoryHealth: {
        label: 'INVENTORY HEALTH',
        percent: 100,
        subtext: 'No products yet',
      },
    }
  }

  const health = apiAlerts.inventory_health || {}

  return {
    badge: apiAlerts.badge || (apiAlerts.items?.length ? 'ACTION REQUIRED' : 'ALL CLEAR'),
    items: (apiAlerts.items || []).map((item) => ({
      id: item.id,
      title: item.title,
      detail: item.detail,
      action: item.action || 'Restock Now',
      severity: item.severity || 'warning',
      showIcon: Boolean(item.show_icon ?? item.showIcon),
      badge: item.badge,
      badgeTone: item.badge_tone || item.badgeTone,
      dot: item.severity === 'warning' ? 'amber' : 'red',
    })),
    inventoryHealth: {
      label: health.label || MERCHANT_DASHBOARD_ACTIVE.stockAlerts.inventoryHealth.label,
      percent: Number(health.percent ?? 100),
      subtext: health.subtext || '',
    },
  }
}

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
  const stockAlerts = mapStockAlerts(dashboard?.stock_alerts)

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
    stockAlerts,
    hasLiveOrders: Boolean(dashboard?.has_live_orders) || liveOrders.length > 0,
    loading,
    error,
    refresh,
    handleOrderAction,
  }
}
