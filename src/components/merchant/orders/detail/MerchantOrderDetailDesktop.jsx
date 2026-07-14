import useOrderDetailPhase from './useOrderDetailPhase'
import MerchantOrderDetailNewDesktop from './MerchantOrderDetailNewDesktop'
import MerchantOrderDetailPreparingDesktop from './MerchantOrderDetailPreparingDesktop'

export default function MerchantOrderDetailDesktop() {
  const phase = useOrderDetailPhase()

  return (
    <div className="hidden min-h-full flex-1 flex-col lg:flex">
      {phase === 'preparing' ? <MerchantOrderDetailPreparingDesktop /> : <MerchantOrderDetailNewDesktop />}
    </div>
  )
}
