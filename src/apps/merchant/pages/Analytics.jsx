import MerchantAnalyticsDesktop from '../../../components/merchant/analytics/MerchantAnalyticsDesktop'
import MerchantAnalyticsMobile from '../../../components/merchant/analytics/MerchantAnalyticsMobile'
import useMerchantAnalytics from '../../../components/merchant/analytics/useMerchantAnalytics'
import BrandedLoader from '../../../components/ui/BrandedLoader'
import { MERCHANT_ANALYTICS_PERIODS } from '../../../services/merchantAnalyticsService'

export default function Analytics() {
  const {
    data,
    loading,
    error,
    activePeriod,
    setActivePeriod,
    customRange,
    setCustomRange,
    refresh,
  } = useMerchantAnalytics('today')

  if (loading) {
    return <BrandedLoader fill className="p-8" />
  }

  if (error || !data) {
    return (
      <div className="flex flex-1 flex-col items-center justify-center gap-3 p-8 text-center">
        <p className="text-sm text-merchant-error">{error || 'Analytics unavailable.'}</p>
        <button
          type="button"
          onClick={() => refresh(activePeriod)}
          className="text-sm font-semibold text-merchant-primary hover:text-merchant-link"
        >
          Try again
        </button>
      </div>
    )
  }

  return (
    <>
      <MerchantAnalyticsMobile
        data={data}
        periods={MERCHANT_ANALYTICS_PERIODS}
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />
      <MerchantAnalyticsDesktop
        data={data}
        periods={MERCHANT_ANALYTICS_PERIODS}
        activePeriod={activePeriod}
        onPeriodChange={setActivePeriod}
        customRange={customRange}
        onCustomRangeChange={setCustomRange}
      />
    </>
  )
}
