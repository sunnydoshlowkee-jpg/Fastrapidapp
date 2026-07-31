import { Download } from 'lucide-react'
import MerchantAnalyticsMobileCustomerInsights from './mobile/MerchantAnalyticsMobileCustomerInsights'
import MerchantAnalyticsMobileFeedback from './mobile/MerchantAnalyticsMobileFeedback'
import MerchantAnalyticsMobileHeader from './mobile/MerchantAnalyticsMobileHeader'
import MerchantAnalyticsMobilePeakHours from './mobile/MerchantAnalyticsMobilePeakHours'
import MerchantAnalyticsMobilePeriodTabs from './mobile/MerchantAnalyticsMobilePeriodTabs'
import MerchantAnalyticsMobileQuickStats from './mobile/MerchantAnalyticsMobileQuickStats'
import MerchantAnalyticsMobileRevenueCard from './mobile/MerchantAnalyticsMobileRevenueCard'
import MerchantAnalyticsMobileTopPerformers from './mobile/MerchantAnalyticsMobileTopPerformers'

export default function MerchantAnalyticsMobile({
  data,
  periods,
  activePeriod,
  onPeriodChange,
  customRange,
  onCustomRangeChange,
}) {
  const mobile = data.mobile

  return (
    <div className="flex flex-1 flex-col gap-4 px-4 pb-8 pt-5 lg:hidden">
      <MerchantAnalyticsMobileHeader title="Analytics Dashboard" />

      <button
        type="button"
        disabled
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-merchant-primary/60 py-3.5 text-sm font-semibold text-white shadow-merchant-btn"
      >
        <Download size={18} strokeWidth={2} aria-hidden />
        Export Data
      </button>

      <MerchantAnalyticsMobilePeriodTabs
        periods={periods}
        activePeriod={activePeriod}
        onChange={onPeriodChange}
        customRange={customRange}
        onCustomRangeChange={onCustomRangeChange}
      />

      <MerchantAnalyticsMobileRevenueCard
        revenue={data.revenue}
        highlightDay={mobile.revenue.highlightDay}
      />

      <MerchantAnalyticsMobileQuickStats stats={mobile.quickStats} />

      <MerchantAnalyticsMobilePeakHours peakHours={mobile.peakHours} />

      <MerchantAnalyticsMobileCustomerInsights insights={mobile.customerInsights} />

      <MerchantAnalyticsMobileTopPerformers products={mobile.topPerformers} />

      <MerchantAnalyticsMobileFeedback feedback={mobile.feedback} />
    </div>
  )
}
