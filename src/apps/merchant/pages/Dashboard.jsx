import MerchantDashboardMobile from '../../../components/merchant/dashboard/MerchantDashboardMobile'
import MerchantDashboardDesktop from '../../../components/merchant/dashboard/MerchantDashboardDesktop'

export default function Dashboard() {
  return (
    <>
      <div className="lg:hidden">
        <MerchantDashboardMobile />
      </div>
      <div className="hidden lg:block">
        <MerchantDashboardDesktop />
      </div>
    </>
  )
}
