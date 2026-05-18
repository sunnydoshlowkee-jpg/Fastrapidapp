import { useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantLiveOrdersPanel from './MerchantLiveOrdersPanel'
import MerchantStockAlertsPanel from './MerchantStockAlertsPanel'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardActiveDesktop() {
  const { openMobileNav } = useOutletContext()
  const { merchantId, stats, liveOrders, stockAlerts } = MERCHANT_DASHBOARD_ACTIVE

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
          <MerchantLiveOrdersPanel orders={liveOrders} />
        </div>
        <div className="xl:col-span-1">
          <MerchantStockAlertsPanel stockAlerts={stockAlerts} />
        </div>
      </div>
    </div>
  )
}
