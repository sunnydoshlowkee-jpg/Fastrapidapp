import MerchantOrderDetailDesktop from '../../../components/merchant/orders/detail/MerchantOrderDetailDesktop'
import MerchantOrderDetailMobile from '../../../components/merchant/orders/detail/MerchantOrderDetailMobile'
import { MerchantOrderDetailProvider } from '../../../components/merchant/orders/detail/useMerchantOrderDetail'

export default function OrderDetail() {
  return (
    <div className="flex min-h-full flex-1 flex-col">
      <MerchantOrderDetailProvider>
        <MerchantOrderDetailMobile />
        <MerchantOrderDetailDesktop />
      </MerchantOrderDetailProvider>
    </div>
  )
}
