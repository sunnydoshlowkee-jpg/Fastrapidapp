import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { orderDetailPreparingPath } from '../../../services/data/merchantOrderDetail.mock'
import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantLiveOrdersMobilePanel from './MerchantLiveOrdersMobilePanel'
import MerchantStockAlertsMobilePanel from './MerchantStockAlertsMobilePanel'
import MerchantIncomingOrderDrawer from './MerchantIncomingOrderDrawer'
import { MERCHANT_DASHBOARD_ACTIVE_MOBILE } from '../../../services/data/merchantDashboard.mock'
import { MERCHANT_INCOMING_ORDER } from '../../../services/data/merchantIncomingOrder.mock'

export default function MerchantDashboardActiveMobile() {
  const navigate = useNavigate()
  const { stats, liveOrders: initialLiveOrders, stockAlerts } = MERCHANT_DASHBOARD_ACTIVE_MOBILE
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
          ? { ...o, status: 'ready', badge: 'Ready' }
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

  const handleDelivered = (orderId) => {
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
        onAccept={openIncomingForOrder}
        onReject={handleRowReject}
        onDelivered={handleDelivered}
      />
      <MerchantStockAlertsMobilePanel stockAlerts={stockAlerts} />

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
