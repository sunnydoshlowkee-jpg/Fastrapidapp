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
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
        aria-label="Merchant tips"
      >
        {tips.map((tip) => (
          <MerchantTipCard key={tip.id} {...tip} />
        ))}
      </section>
    </div>
  )
}


