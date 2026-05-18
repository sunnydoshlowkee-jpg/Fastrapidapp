import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantMobileEmptyState from './MerchantMobileEmptyState'
import MerchantGettingStartedCard from './MerchantGettingStartedCard'
import { MERCHANT_DASHBOARD_MOBILE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardMobile() {
  const { overview, stats, emptyState, gettingStarted } = MERCHANT_DASHBOARD_MOBILE

  const handleViewCustomerLink = () => {
    window.open(emptyState.customerLink, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="flex flex-1 flex-col gap-5 px-4 pb-8 pt-5">
      <MerchantMobileHeader />

      <section aria-labelledby="overview-heading">
        <h2 id="overview-heading" className="text-lg font-semibold text-merchant-ink">
          {overview.title}
        </h2>
        <p className="mt-0.5 text-sm text-merchant-muted">{overview.subtitle}</p>

        <div className="mt-4 flex flex-col gap-3">
          {stats.map((stat) => (
            <MerchantMobileStatCard key={stat.id} {...stat} />
          ))}
        </div>
      </section>

      <MerchantMobileEmptyState
        title={emptyState.title}
        description={emptyState.description}
        action={emptyState.action}
        onAction={handleViewCustomerLink}
      />

      <section aria-labelledby="getting-started-heading">
        <h2 id="getting-started-heading" className="text-lg font-semibold text-merchant-ink">
          {gettingStarted.title}
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {gettingStarted.items.map((item) => (
            <MerchantGettingStartedCard key={item.id} {...item} />
          ))}
        </div>
      </section>
    </div>
  )
}
