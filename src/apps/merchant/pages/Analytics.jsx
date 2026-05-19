import MerchantAnalyticsDesktop from '../../../components/merchant/analytics/MerchantAnalyticsDesktop'
import MerchantAnalyticsMobile from '../../../components/merchant/analytics/MerchantAnalyticsMobile'

export default function Analytics() {
  return (
    <>
      <MerchantAnalyticsMobile />
      <MerchantAnalyticsDesktop />
    </>
  )
}
