import { useNavigate, useOutletContext } from 'react-router-dom'
import MerchantOrderDetailActionBar from './MerchantOrderDetailActionBar'
import MerchantOrderDetailCustomerPanel from './MerchantOrderDetailCustomerPanel'
import MerchantOrderDetailHeader from './MerchantOrderDetailHeader'
import MerchantOrderDetailItemsPanel from './MerchantOrderDetailItemsPanel'
import MerchantOrderDetailState from './MerchantOrderDetailState'
import MerchantOrderDetailUrgencyBanner from './MerchantOrderDetailUrgencyBanner'
import useMerchantOrderDetail from './useMerchantOrderDetail'

export default function MerchantOrderDetailNewDesktop() {
  const navigate = useNavigate()
  const { openMobileNav } = useOutletContext()
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

  return (
    <div className="flex min-h-full flex-1 flex-col">
      <div className="flex flex-1 flex-col gap-5 p-4 sm:gap-6 sm:p-6 lg:gap-6 lg:p-8">
        <MerchantOrderDetailHeader
          displayId={order.displayId}
          statusBadge={order.statusBadge}
          showMenuButton
          onMenuClick={openMobileNav}
        />

        {order.dbStatus === 'pending' ? (
          <MerchantOrderDetailUrgencyBanner respondWithinSeconds={order.respondWithinSeconds} />
        ) : null}

        <div className="grid flex-1 grid-cols-1 gap-6 xl:grid-cols-2">
          <MerchantOrderDetailCustomerPanel customer={order.customer} />
          <MerchantOrderDetailItemsPanel
            itemsHeader={order.itemsHeader}
            lineItems={order.lineItems}
            pricing={order.pricing}
          />
        </div>
      </div>

      {order.dbStatus === 'pending' ? (
        <MerchantOrderDetailActionBar
          disclaimer={order.acceptDisclaimer}
          onAccept={handleAccept}
          onReject={handleReject}
          disabled={actionLoading}
        />
      ) : null}
    </div>
  )
}
