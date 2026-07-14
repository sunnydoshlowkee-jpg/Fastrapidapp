import useMerchantOrderDetail from './useMerchantOrderDetail'

export default function useOrderDetailPhase() {
  const { phase } = useMerchantOrderDetail()
  return phase
}
