import { useEffect, useState } from 'react'
import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantLiveOrdersMobilePanel from './MerchantLiveOrdersMobilePanel'
import MerchantStockAlertsMobilePanel from './MerchantStockAlertsMobilePanel'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardActiveMobile({
  stats,
  liveOrders: initialLiveOrders,
  onOrderAction,
}) {
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
      prev.map((o) => (o.id === orderId ? { ...o, status: 'ready', badge: 'Ready' } : o))
    )
  }

  const handleDelivered = async (orderId) => {
    const numericId = String(orderId).replace(/\D+/g, '')
    await onOrderAction?.(numericId, 'ready')
    setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5 lg:pb-8">
      <MerchantMobileHeader />

      <section aria-labelledby="overview-heading-active">
        <h2 id="overview-heading-active" className="text-lg font-semibold text-merchant-ink">
          Overview
        </h2>
        <p className="mt-0.5 text-sm text-merchant-muted">Today&apos;s performance</p>
        <div className="mt-4 grid grid-cols-2 gap-3">
          {stats.map((stat) => (
            <MerchantMobileStatCard key={stat.id} {...stat} />
          ))}
        </div>
      </section>

      <MerchantLiveOrdersMobilePanel
        orders={liveOrders}
        onAccept={handleAccept}
        onReject={handleRowReject}
        onDelivered={handleDelivered}
      />
      <MerchantStockAlertsMobilePanel stockAlerts={stockAlerts} />
    </div>
  )
}
