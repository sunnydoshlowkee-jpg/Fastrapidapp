import { useNavigate, useParams } from 'react-router-dom'
import {
  getMerchantOrderDetail,
  orderDetailPreparingPath,
} from '../../../../services/data/merchantOrderDetail.mock'
import MerchantOrderDetailMobileActionBar from './MerchantOrderDetailMobileActionBar'
import MerchantOrderDetailMobileCustomerCard from './MerchantOrderDetailMobileCustomerCard'
import MerchantOrderDetailMobileHeader from './MerchantOrderDetailMobileHeader'
import MerchantOrderDetailMobileItemsCard from './MerchantOrderDetailMobileItemsCard'
import MerchantOrderDetailMobilePricingCard from './MerchantOrderDetailMobilePricingCard'
import MerchantOrderDetailMobileUrgencyBanner from './MerchantOrderDetailMobileUrgencyBanner'

export default function MerchantOrderDetailNewMobile() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = getMerchantOrderDetail(orderId, 'new')
  const { mobile } = order

  const handleAccept = () => navigate(orderDetailPreparingPath(order.id))
  const handleReject = () => navigate('/merchant/orders')

  return (
    <>
      <MerchantOrderDetailMobileHeader
        displayId={order.displayId}
        statusBadge={order.statusBadge}
      />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-44 pt-3">
        <MerchantOrderDetailMobileUrgencyBanner respondWithinSeconds={order.respondWithinSeconds} />

        <MerchantOrderDetailMobileCustomerCard customer={order.customer} />

        <MerchantOrderDetailMobileItemsCard
          lineItems={mobile.lineItems}
          totalValue={mobile.totalValue}
        />

        <MerchantOrderDetailMobilePricingCard pricing={mobile.pricing} />
      </div>

      <MerchantOrderDetailMobileActionBar
        disclaimer={order.acceptDisclaimer}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </>
  )
}
