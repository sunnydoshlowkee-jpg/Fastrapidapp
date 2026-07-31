import BrandedLoader from '../../ui/BrandedLoader'
import MerchantDashboardMobileEmpty from './MerchantDashboardMobileEmpty'
import MerchantDashboardActiveMobile from './MerchantDashboardActiveMobile'
import useMerchantDashboard from './useMerchantDashboard'

export default function MerchantDashboardMobile() {
  const {
    merchantId,
    storeStatus,
    stats,
    liveOrders,
    stockAlerts,
    hasLiveOrders,
    loading,
    error,
    handleOrderAction,
    refresh,
  } = useMerchantDashboard()

  if (loading) {
    return (
      <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas lg:hidden">
        <BrandedLoader fill className="p-8" />
      </div>
    )
  }

  if (hasLiveOrders) {
    return (
      <MerchantDashboardActiveMobile
        stats={stats}
        liveOrders={liveOrders}
        stockAlerts={stockAlerts}
        onOrderAction={handleOrderAction}
        onRefresh={refresh}
      />
    )
  }

  return (
    <MerchantDashboardMobileEmpty
      merchantId={merchantId}
      storeStatus={storeStatus}
      stats={stats}
      error={error}
    />
  )
}
