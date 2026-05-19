import { useNavigate, useParams } from 'react-router-dom'
import { getMerchantOrderDetail } from '../../../../services/data/merchantOrderDetail.mock'
import MerchantOrderDetailMobileCustomerNote from './MerchantOrderDetailMobileCustomerNote'
import MerchantOrderDetailMobilePreparingCustomerInfo from './MerchantOrderDetailMobilePreparingCustomerInfo'
import MerchantOrderDetailMobilePreparingFooter from './MerchantOrderDetailMobilePreparingFooter'
import MerchantOrderDetailMobilePreparingOrderDetails from './MerchantOrderDetailMobilePreparingOrderDetails'
import MerchantOrderDetailPreparingMobileHeader from './MerchantOrderDetailPreparingMobileHeader'
import MerchantOrderDetailProgressStepperMobile from './MerchantOrderDetailProgressStepperMobile'

export default function MerchantOrderDetailPreparingMobile() {
  const { orderId } = useParams()
  const navigate = useNavigate()
  const order = getMerchantOrderDetail(orderId, 'preparing')
  const { mobile } = order

  const handleMarkReady = () => navigate('/merchant/orders')

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas lg:hidden">
      <MerchantOrderDetailPreparingMobileHeader
        displayId={order.displayId}
        statusBadge={mobile.statusBadge}
      />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-52 pt-3">
        <MerchantOrderDetailProgressStepperMobile
          steps={mobile.progressSteps}
          currentStepId={order.progress.currentStep}
        />

        <MerchantOrderDetailMobileCustomerNote note={mobile.customerNote} />

        <MerchantOrderDetailMobilePreparingOrderDetails
          lineItems={mobile.lineItems}
          pricing={mobile.pricing}
        />

        <MerchantOrderDetailMobilePreparingCustomerInfo
          customer={mobile.customer}
          delivery={mobile.delivery}
        />
      </div>

      <MerchantOrderDetailMobilePreparingFooter
        title={order.preparing.title}
        targetCompletion={order.preparing.targetCompletion}
        onMarkReady={handleMarkReady}
      />
    </div>
  )
}
