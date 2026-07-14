import { useOutletContext } from 'react-router-dom'
import MerchantAnalyticsCustomerInsights from './MerchantAnalyticsCustomerInsights'
import MerchantAnalyticsFeedback from './MerchantAnalyticsFeedback'
import MerchantAnalyticsHeader from './MerchantAnalyticsHeader'
import MerchantAnalyticsPeakHours from './MerchantAnalyticsPeakHours'
import MerchantAnalyticsPeriodTabs from './MerchantAnalyticsPeriodTabs'
import MerchantAnalyticsQuickStats from './MerchantAnalyticsQuickStats'
import MerchantAnalyticsRevenueCard from './MerchantAnalyticsRevenueCard'
import MerchantAnalyticsTopPerformers from './MerchantAnalyticsTopPerformers'

export default function MerchantAnalyticsDesktop({
  data,
  periods,
  activePeriod,
  onPeriodChange,
}) {
  const { openMobileNav } = useOutletContext()

  return (
    <div className="hidden flex-1 flex-col gap-6 p-6 lg:flex lg:gap-8 lg:p-8">
      <MerchantAnalyticsHeader
        title="Analytics Dashboard"
        dateFilterLabel={data.dateFilterLabel}
        showMenuButton
        onMenuClick={openMobileNav}
      />

      <MerchantAnalyticsPeriodTabs
        periods={periods}
        activePeriod={activePeriod}
        onChange={onPeriodChange}
      />

      <div className="grid grid-cols-1 gap-4 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <MerchantAnalyticsRevenueCard revenue={data.revenue} />
        </div>
        <MerchantAnalyticsQuickStats stats={data.quickStats} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MerchantAnalyticsPeakHours peakHours={data.peakHours} />
        <MerchantAnalyticsCustomerInsights insights={data.customerInsights} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <MerchantAnalyticsTopPerformers products={data.topPerformers} />
        <MerchantAnalyticsFeedback feedback={data.feedback} />
      </div>
    </div>
  )
}
