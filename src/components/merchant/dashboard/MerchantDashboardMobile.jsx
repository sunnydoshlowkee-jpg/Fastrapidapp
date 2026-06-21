import MerchantDashboardMobileEmpty from './MerchantDashboardMobileEmpty'
import MerchantDashboardActiveMobile from './MerchantDashboardActiveMobile'
import useMerchantDashboard from './useMerchantDashboard'

export default function MerchantDashboardMobile() {
  const {
    merchantId,
    storeStatus,
    stats,
    liveOrders,
    hasLiveOrders,
    loading,
    error,
    handleOrderAction,
    refresh,
  } = useMerchantDashboard()

  if (loading) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-merchant-canvas p-8 text-sm text-merchant-muted lg:hidden">
        Loading dashboard...
      </div>
    )
  }

  if (hasLiveOrders) {
    return (
      <MerchantDashboardActiveMobile
        stats={stats}
        liveOrders={liveOrders}
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
