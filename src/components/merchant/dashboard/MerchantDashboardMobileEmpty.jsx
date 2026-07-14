import { useState, useEffect } from 'react'
import MerchantMobileHeader from './MerchantMobileHeader'
import MerchantMobileStatCard from './MerchantMobileStatCard'
import MerchantMobileEmptyState from './MerchantMobileEmptyState'
import MerchantGettingStartedCard from './MerchantGettingStartedCard'
import { MERCHANT_DASHBOARD_MOBILE } from '../../../services/data/merchantDashboard.mock'

export default function MerchantDashboardMobileEmpty({
  merchantId,
  storeStatus,
  stats = [],
  error = '',
}) {
  const { overview, emptyState, gettingStarted } = MERCHANT_DASHBOARD_MOBILE
  const customerLink = `${window.location.origin}/app/vendor/${merchantId}`

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas lg:hidden">
      <MerchantMobileHeader variant="bar" />

      <div className="flex flex-col gap-8 px-6 pb-8 pt-6">
        {error ? (
          <div className="rounded-merchant-stat border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <section aria-labelledby="overview-heading">
          <h2
            id="overview-heading"
            className="text-base font-bold leading-6 tracking-[-0.4px] text-merchant-ink"
          >
            {overview.title}
          </h2>
          <p className="mt-1 text-base leading-6 text-merchant-mobile-muted">
            {overview.subtitle}
          </p>

          <div className="mt-4 flex flex-col gap-4">
            {stats.map((stat) => (
              <MerchantMobileStatCard key={stat.id} {...stat} />
            ))}
          </div>
        </section>

        <MerchantMobileEmptyState
          storeStatus={storeStatus}
          title={emptyState.title}
          description={emptyState.description}
          primaryAction={emptyState.primaryAction}
          secondaryAction={emptyState.secondaryAction}
          onPrimaryClick={() => {}}
          onSecondaryClick={() => window.open(customerLink, '_blank', 'noopener,noreferrer')}
        />

        <section aria-labelledby="getting-started-heading">
          <h2
            id="getting-started-heading"
            className="px-1 text-lg font-bold leading-[27px] tracking-[-0.45px] text-merchant-ink"
          >
            {gettingStarted.title}
          </h2>
          <div className="mt-4 flex flex-col gap-4">
            {gettingStarted.items.map((item) => (
              <MerchantGettingStartedCard key={item.id} {...item} />
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
