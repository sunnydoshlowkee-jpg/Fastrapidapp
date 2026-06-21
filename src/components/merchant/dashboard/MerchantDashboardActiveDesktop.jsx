import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantLiveOrdersPanel from './MerchantLiveOrdersPanel'
import MerchantStockAlertsPanel from './MerchantStockAlertsPanel'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardActiveDesktop({
  merchantId,
  stats,
  liveOrders: initialLiveOrders,
  onOrderAction,
}) {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const [liveOrders, setLiveOrders] = useState(initialLiveOrders)
  const stockAlerts = MERCHANT_DASHBOARD_ACTIVE.stockAlerts

  useEffect(() => {
    setLiveOrders(initialLiveOrders)
  }, [initialLiveOrders])

  const handleRowReject = async (orderId) => {
    const numericId = String(orderId).replace(/\D+/g, '')
    await onOrderAction?.(numericId, 'reject')
    setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  const handleAccept = async (orderId) => {
    const numericId = String(orderId).replace(/\D+/g, '')
    await onOrderAction?.(numericId, 'accept')
    setLiveOrders((prev) =>
      prev.map((o) =>
        o.id === orderId ? { ...o, status: 'preparing', timeRemaining: '15 min' } : o
      )
    )
  }

  const handleReady = async (orderId) => {
    const numericId = String(orderId).replace(/\D+/g, '')
    await onOrderAction?.(numericId, 'ready')
    setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  return (
    <div className="flex flex-1 flex-col gap-8 p-6 lg:p-8">
      <MerchantDashboardHeader
        title="Dashboard Overview"
        merchantId={merchantId}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <section
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        aria-label="Dashboard statistics"
      >
        {stats.map((stat) => (
          <MerchantStatCard key={stat.id} {...stat} />
        ))}
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MerchantLiveOrdersPanel
            orders={liveOrders}
            onAccept={handleAccept}
            onReject={handleRowReject}
            onReady={handleReady}
          />
        </div>
        <div className="xl:col-span-1">
          <MerchantStockAlertsPanel stockAlerts={stockAlerts} />
        </div>
      </div>
    </div>
  )
}
