import { useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantEmptyState from './MerchantEmptyState'
import MerchantTipCard from './MerchantTipCard'
import MerchantDashboardActiveDesktop from './MerchantDashboardActiveDesktop'
import useMerchantDashboard from './useMerchantDashboard'
import { MERCHANT_DASHBOARD_OVERVIEW } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardDesktop() {
  const { openMobileNav } = useOutletContext()
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

  const tips = MERCHANT_DASHBOARD_OVERVIEW.tips
  const customerLink = `${window.location.origin}/app/vendor/${merchantId}`

  if (loading) {
    return (
      <div className="flex min-h-full flex-1 items-center justify-center bg-merchant-canvas p-8 text-sm text-merchant-muted">
        Loading dashboard...
      </div>
    )
  }

  if (hasLiveOrders) {
    return (
      <MerchantDashboardActiveDesktop
        merchantId={merchantId}
        stats={stats}
        liveOrders={liveOrders}
        onOrderAction={handleOrderAction}
        onRefresh={refresh}
      />
    )
  }

  const emptyState = {
    ...MERCHANT_DASHBOARD_OVERVIEW.emptyState,
    customerLink,
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas">
      <MerchantDashboardHeader
        variant="bar"
        title="Dashboard Overview"
        merchantId={merchantId}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <div className="flex flex-1 flex-col gap-8 px-8 pb-12 pt-8">
        {error ? (
          <div className="rounded-merchant-stat border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
          aria-label="Dashboard statistics"
        >
          {stats.map((stat) => (
            <MerchantStatCard key={stat.id} {...stat} />
          ))}
        </section>

        <MerchantEmptyState
          storeStatus={storeStatus}
          title={emptyState.title}
          description={emptyState.description}
          primaryAction={emptyState.primaryAction}
          secondaryAction={emptyState.secondaryAction}
          onPrimaryClick={() => {}}
          onSecondaryClick={() => window.open(customerLink, '_blank', 'noopener,noreferrer')}
        />

        <section
          className="grid grid-cols-1 gap-6 md:grid-cols-3"
          aria-label="Merchant tips"
        >
          {tips.map((tip) => (
            <MerchantTipCard key={tip.id} {...tip} />
          ))}
        </section>
      </div>
    </div>
  )
}
