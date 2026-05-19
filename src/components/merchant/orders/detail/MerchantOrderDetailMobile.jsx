import useOrderDetailPhase from './useOrderDetailPhase'
import MerchantOrderDetailNewMobile from './MerchantOrderDetailNewMobile'
import MerchantOrderDetailPreparingMobile from './MerchantOrderDetailPreparingMobile'

export default function MerchantOrderDetailMobile() {
  const phase = useOrderDetailPhase()

  return (
    <div className="flex min-h-full flex-1 flex-col bg-merchant-canvas lg:hidden">
      {phase === 'preparing' ? <MerchantOrderDetailPreparingMobile /> : <MerchantOrderDetailNewMobile />}
    </div>
  )
}
