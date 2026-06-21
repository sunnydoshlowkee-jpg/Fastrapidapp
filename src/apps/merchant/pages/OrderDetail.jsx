import MerchantOrderDetailDesktop from '../../../components/merchant/orders/detail/MerchantOrderDetailDesktop'
import MerchantOrderDetailMobile from '../../../components/merchant/orders/detail/MerchantOrderDetailMobile'
import { MerchantOrderDetailProvider } from '../../../components/merchant/orders/detail/useMerchantOrderDetail'

export default function OrderDetail() {
  return (
    <MerchantOrderDetailProvider>
      <MerchantOrderDetailMobile />
      <MerchantOrderDetailDesktop />
    </MerchantOrderDetailProvider>
  )
}
