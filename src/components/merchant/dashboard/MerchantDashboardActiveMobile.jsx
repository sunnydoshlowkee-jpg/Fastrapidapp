import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantLiveOrdersPanel from './MerchantLiveOrdersPanel'
import MerchantStockAlertsPanel from './MerchantStockAlertsPanel'
import { MERCHANT_DASHBOARD_ACTIVE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardActiveMobile() {
  const { stats, liveOrders, stockAlerts, mobileOverview } = MERCHANT_DASHBOARD_ACTIVE
  const overview = mobileOverview ?? {
    title: 'Dashboard',
    subtitle: "Today's performance",
  }

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-4">
      <MerchantMobileHeader />

      <section aria-labelledby="active-mobile-overview">
        <h2 id="active-mobile-overview" className="text-lg font-semibold text-merchant-ink">
          {overview.title}
        </h2>
        <p className="mt-0.5 text-sm text-merchant-muted">{overview.subtitle}</p>
        <div className="mt-3 flex flex-col gap-2.5">
          {stats.map((stat) => (
            <MerchantMobileStatCard key={stat.id} {...stat} />
          ))}
        </div>
      </section>

      <MerchantLiveOrdersPanel orders={liveOrders} />

      <MerchantStockAlertsPanel stockAlerts={stockAlerts} />
    </div>
  )
}
