import { useNavigate } from 'react-router-dom'
import MerchantOrderDetailMobileCustomerNote from './MerchantOrderDetailMobileCustomerNote'
import MerchantOrderDetailMobilePreparingCustomerInfo from './MerchantOrderDetailMobilePreparingCustomerInfo'
import MerchantOrderDetailMobilePreparingFooter from './MerchantOrderDetailMobilePreparingFooter'
import MerchantOrderDetailMobilePreparingOrderDetails from './MerchantOrderDetailMobilePreparingOrderDetails'
import MerchantOrderDetailPreparingMobileHeader from './MerchantOrderDetailPreparingMobileHeader'
import MerchantOrderDetailProgressStepperMobile from './MerchantOrderDetailProgressStepperMobile'
import MerchantOrderDetailState from './MerchantOrderDetailState'
import useMerchantOrderDetail from './useMerchantOrderDetail'

export default function MerchantOrderDetailPreparingMobile() {
  const navigate = useNavigate()
  const { order, loading, error, actionLoading, markReady } = useMerchantOrderDetail()

  const handleMarkReady = async () => {
    const ok = await markReady()
    if (ok) {
      navigate('/merchant/orders')
    }
  }

  if (loading || error || !order) {
    return <MerchantOrderDetailState loading={loading} error={error} order={order} />
  }

  const { mobile } = order

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
          lineItems={mobile.preparingLineItems}
          pricing={mobile.pricingPreparing}
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
        disabled={actionLoading || order.dbStatus === 'ready_for_pickup'}
      />
    </div>
  )
}
