import MerchantOrdersDesktop from '../../../components/merchant/orders/MerchantOrdersDesktop'
import MerchantOrdersMobile from '../../../components/merchant/orders/MerchantOrdersMobile'

export default function Orders() {
  return (
    <>
      <div className="lg:hidden">
        <MerchantOrdersMobile />
      </div>
      <div className="hidden lg:block">
        <MerchantOrdersDesktop />
      </div>
    </>
  )
}
