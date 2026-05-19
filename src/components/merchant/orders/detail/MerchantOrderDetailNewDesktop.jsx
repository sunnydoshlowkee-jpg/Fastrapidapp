import { useNavigate, useOutletContext, useParams } from 'react-router-dom'
import {
  getMerchantOrderDetail,
  orderDetailPreparingPath,
} from '../../../../services/data/merchantOrderDetail.mock'
import MerchantOrderDetailActionBar from './MerchantOrderDetailActionBar'
import MerchantOrderDetailCustomerPanel from './MerchantOrderDetailCustomerPanel'
import MerchantOrderDetailHeader from './MerchantOrderDetailHeader'
import MerchantOrderDetailItemsPanel from './MerchantOrderDetailItemsPanel'
import MerchantOrderDetailUrgencyBanner from './MerchantOrderDetailUrgencyBanner'

export default function MerchantOrderDetailNewDesktop() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const order = getMerchantOrderDetail(orderId, 'new')

  const handleAccept = () => navigate(orderDetailPreparingPath(order.id))
  const handleReject = () => navigate('/merchant/orders')

  return (
    <>
      <div className="flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:gap-6 lg:p-8">
        <MerchantOrderDetailHeader
          displayId={order.displayId}
          statusBadge={order.statusBadge}
          showMenuButton
          onMenuClick={openMobileNav}
        />

        <MerchantOrderDetailUrgencyBanner respondWithinSeconds={order.respondWithinSeconds} />

        <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          <MerchantOrderDetailCustomerPanel customer={order.customer} />
          <MerchantOrderDetailItemsPanel
            itemsHeader={order.itemsHeader}
            lineItems={order.lineItems}
            pricing={order.pricing}
          />
        </div>
      </div>

      <MerchantOrderDetailActionBar
        disclaimer={order.acceptDisclaimer}
        onAccept={handleAccept}
        onReject={handleReject}
      />
    </>
  )
}
