import { useNavigate, useOutletContext } from 'react-router-dom'
import MerchantOrderDetailHeader from './MerchantOrderDetailHeader'
import MerchantOrderDetailPreparingBanner from './MerchantOrderDetailPreparingBanner'
import MerchantOrderDetailPreparingItemsCard from './MerchantOrderDetailPreparingItemsCard'
import MerchantOrderDetailPreparingSidebar from './MerchantOrderDetailPreparingSidebar'
import MerchantOrderDetailProgressStepper from './MerchantOrderDetailProgressStepper'
import MerchantOrderDetailState from './MerchantOrderDetailState'
import useMerchantOrderDetail from './useMerchantOrderDetail'

export default function MerchantOrderDetailPreparingDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
  const { order, loading, error, actionLoading, markReady } = useMerchantOrderDetail()

  const handleMarkReady = async () => {
    const ok = await markReady()
    if (ok) {
      navigate('/merchant/orders')
    }
  }

  return (
    <MerchantOrderDetailState loading={loading} error={error} order={order}>
      <div className="flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:gap-6 lg:p-8">
        <MerchantOrderDetailHeader
          displayId={order.displayId}
          statusBadge={order.statusBadge}
          showMenuButton
          onMenuClick={openMobileNav}
        />

        <MerchantOrderDetailProgressStepper
          steps={order.progress.steps}
          currentStepId={order.progress.currentStep}
        />

        <MerchantOrderDetailPreparingBanner
          title={order.preparing.title}
          targetCompletion={order.preparing.targetCompletion}
          onMarkReady={handleMarkReady}
          disabled={actionLoading || order.dbStatus === 'ready_for_pickup'}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <MerchantOrderDetailPreparingItemsCard
              lineItems={order.preparingLineItems}
              pricing={order.preparingPricing}
            />
          </div>
          <MerchantOrderDetailPreparingSidebar customer={order.customer} delivery={order.delivery} />
        </div>
      </div>
    </MerchantOrderDetailState>
  )
}
