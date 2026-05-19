import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { orderDetailPreparingPath } from '../../../services/data/merchantOrderDetail.mock'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantLiveOrdersPanel from './MerchantLiveOrdersPanel'
import MerchantStockAlertsPanel from './MerchantStockAlertsPanel'
import MerchantIncomingOrderDrawer from './MerchantIncomingOrderDrawer'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'
import { MERCHANT_INCOMING_ORDER } from '../../../services/data/merchantIncomingOrder.mock'

export default function MerchantDashboardActiveDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const { merchantId, stats, liveOrders: initialLiveOrders, stockAlerts } = MERCHANT_DASHBOARD_ACTIVE
  const [liveOrders, setLiveOrders] = useState(initialLiveOrders)
  const [incomingOpen, setIncomingOpen] = useState(false)
  const [incomingOrderId, setIncomingOrderId] = useState(null)

  const openIncomingForOrder = (orderId) => {
    setIncomingOrderId(orderId)
    setIncomingOpen(true)
  }

  const closeIncoming = () => {
    setIncomingOpen(false)
    setIncomingOrderId(null)
  }

  const handleRowReject = (orderId) => {
    setLiveOrders((prev) => prev.filter((o) => o.id !== orderId))
  }

  const handleDrawerAccept = () => {
    if (!incomingOrderId) return
    setLiveOrders((prev) =>
      prev.map((o) =>
        o.id === incomingOrderId && o.status === 'pending'
          ? { ...o, status: 'preparing', timeRemaining: '15 min' }
          : o
      )
    )
    closeIncoming()
    navigate(orderDetailPreparingPath('KA-8921'))
  }

  const handleDrawerReject = () => {
    if (incomingOrderId) {
      setLiveOrders((prev) => prev.filter((o) => o.id !== incomingOrderId))
    }
    closeIncoming()
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
            onAccept={openIncomingForOrder}
            onReject={handleRowReject}
          />
        </div>
        <div className="xl:col-span-1">
          <MerchantStockAlertsPanel stockAlerts={stockAlerts} />
        </div>
      </div>

      <MerchantIncomingOrderDrawer
        isOpen={incomingOpen}
        order={MERCHANT_INCOMING_ORDER}
        onClose={closeIncoming}
        onAccept={handleDrawerAccept}
        onReject={handleDrawerReject}
      />
    </div>
  )
}
