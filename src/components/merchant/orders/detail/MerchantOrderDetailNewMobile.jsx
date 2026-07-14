import { useNavigate } from 'react-router-dom'
import MerchantOrderDetailMobileActionBar from './MerchantOrderDetailMobileActionBar'
import MerchantOrderDetailMobileCustomerCard from './MerchantOrderDetailMobileCustomerCard'
import MerchantOrderDetailMobileHeader from './MerchantOrderDetailMobileHeader'
import MerchantOrderDetailMobileItemsCard from './MerchantOrderDetailMobileItemsCard'
import MerchantOrderDetailMobilePricingCard from './MerchantOrderDetailMobilePricingCard'
import MerchantOrderDetailMobileUrgencyBanner from './MerchantOrderDetailMobileUrgencyBanner'
import MerchantOrderDetailState from './MerchantOrderDetailState'
import useMerchantOrderDetail from './useMerchantOrderDetail'

export default function MerchantOrderDetailNewMobile() {
  const navigate = useNavigate()
  const { order, loading, error, actionLoading, acceptOrder, rejectOrder } = useMerchantOrderDetail()

  const handleAccept = async () => {
    const ok = await acceptOrder()
    if (ok && order) {
      navigate(`/merchant/orders/${order.id}`, { replace: true })
    }
  }

  const handleReject = async () => {
    const ok = await rejectOrder()
    if (ok) {
      navigate('/merchant/orders')
    }
  }

  if (loading || error || !order) {
    return <MerchantOrderDetailState loading={loading} error={error} order={order} />
  }

  const { mobile } = order

  return (
    <>
      <MerchantOrderDetailMobileHeader
        displayId={order.displayId}
        statusBadge={order.statusBadge}
      />

      <div className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 pb-44 pt-3">
        {order.dbStatus === 'pending' ? (
          <MerchantOrderDetailMobileUrgencyBanner respondWithinSeconds={order.respondWithinSeconds} />
        ) : null}

        <MerchantOrderDetailMobileCustomerCard customer={order.customer} />

        <MerchantOrderDetailMobileItemsCard
          lineItems={mobile.lineItems}
          totalValue={mobile.totalValue}
        />

        <MerchantOrderDetailMobilePricingCard pricing={mobile.pricing} />
      </div>

      {order.dbStatus === 'pending' ? (
        <MerchantOrderDetailMobileActionBar
          disclaimer={order.acceptDisclaimer}
          onAccept={handleAccept}
          onReject={handleReject}
          disabled={actionLoading}
        />
      ) : null}
    </>
  )
}
