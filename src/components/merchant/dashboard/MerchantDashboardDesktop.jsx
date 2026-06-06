import { useOutletContext } from 'react-router-dom'
import MerchantDashboardHeader from './MerchantDashboardHeader'
import MerchantStatCard from './MerchantStatCard'
import MerchantEmptyState from './MerchantEmptyState'
import MerchantTipCard from './MerchantTipCard'
import MerchantDashboardActiveDesktop from './MerchantDashboardActiveDesktop'
import {
  MERCHANT_DASHBOARD_MODE,
  MERCHANT_DASHBOARD_OVERVIEW,
} from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardDesktop() {
  const { openMobileNav } = useOutletContext()

  if (MERCHANT_DASHBOARD_MODE === 'active') {
    return <MerchantDashboardActiveDesktop />
  }

  const { merchantId, storeStatus, stats, emptyState, tips } = MERCHANT_DASHBOARD_OVERVIEW

  const handleViewCustomerLink = () => {
    window.open(emptyState.customerLink, '_blank', 'noopener,noreferrer')
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
          onSecondaryClick={handleViewCustomerLink}
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
