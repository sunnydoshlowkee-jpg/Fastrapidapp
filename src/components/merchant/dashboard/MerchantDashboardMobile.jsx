import { MERCHANT_DASHBOARD_MODE } from '../../../services/data/merchantDashboard.mock'
import MerchantDashboardMobileEmpty from './MerchantDashboardMobileEmpty'
import MerchantDashboardActiveMobile from './MerchantDashboardActiveMobile'

export default function MerchantDashboardMobile() {
  if (MERCHANT_DASHBOARD_MODE === 'active') {
    return <MerchantDashboardActiveMobile />
  }
  return <MerchantDashboardMobileEmpty />
}
