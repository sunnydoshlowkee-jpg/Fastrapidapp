import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantLiveOrdersMobilePanel from './MerchantLiveOrdersMobilePanel'
import MerchantStockAlertsMobilePanel from './MerchantStockAlertsMobilePanel'
import { resolveMerchantOrderApiId } from '../../../services/merchantOrdersService'

export default function MerchantDashboardActiveMobile({
  stats,
  liveOrders: initialLiveOrders,
  stockAlerts,
  onOrderAction,
}) {
  const navigate = useNavigate()
  const [liveOrders, setLiveOrders] = useState(initialLiveOrders)

  useEffect(() => {
    setLiveOrders(initialLiveOrders)
  }, [initialLiveOrders])

  const handleRowReject = async (orderId) => {
    try {
      await onOrderAction?.(resolveMerchantOrderApiId(orderId), 'reject')
      setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
    } catch (err) {
      alert(err?.message || 'Could not reject order.')
    }
  }

  const handleAccept = async (orderId) => {
    try {
      await onOrderAction?.(resolveMerchantOrderApiId(orderId), 'accept')
      setLiveOrders((prev) =>
        prev.map((o) =>
          o.id === orderId ? { ...o, status: 'preparing', timeRemaining: '15 min' } : o
        )
      )
    } catch (err) {
      alert(err?.message || 'Could not accept order.')
    }
  }

  const handleDelivered = async (orderId) => {
    try {
      await onOrderAction?.(resolveMerchantOrderApiId(orderId), 'ready')
      setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
    } catch (err) {
      alert(err?.message || 'Could not update order.')
    }
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
      <MerchantStockAlertsMobilePanel
        stockAlerts={stockAlerts}
        onRestock={() => navigate('/merchant/menu')}
      />
    </div>
  )
}
