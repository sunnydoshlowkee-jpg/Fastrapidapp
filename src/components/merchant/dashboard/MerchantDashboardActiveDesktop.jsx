import { useEffect, useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantLiveOrdersPanel from './MerchantLiveOrdersPanel'
import MerchantStockAlertsPanel from './MerchantStockAlertsPanel'
import { resolveMerchantOrderApiId } from '../../../services/merchantOrdersService'

export default function MerchantDashboardActiveDesktop({
  merchantId,
  stats,
  liveOrders: initialLiveOrders,
  stockAlerts,
  onOrderAction,
}) {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
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

  const handleReady = async (orderId) => {
    try {
      await onOrderAction?.(resolveMerchantOrderApiId(orderId), 'ready')
      setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
    } catch (err) {
      alert(err?.message || 'Could not mark order as ready.')
    }
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
          <MerchantStockAlertsPanel
            stockAlerts={stockAlerts}
            onRestock={() => navigate('/merchant/menu')}
          />
        </div>
      </div>
    </div>
  )
}
