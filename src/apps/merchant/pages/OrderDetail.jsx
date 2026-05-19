import MerchantOrderDetailDesktop from '../../../components/merchant/orders/detail/MerchantOrderDetailDesktop'
import MerchantOrderDetailMobile from '../../../components/merchant/orders/detail/MerchantOrderDetailMobile'

export default function OrderDetail() {
  return (
    <>
      <MerchantOrderDetailMobile />
      <MerchantOrderDetailDesktop />
    </>
  )
}
