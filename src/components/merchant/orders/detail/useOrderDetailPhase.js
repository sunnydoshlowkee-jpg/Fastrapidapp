import { useSearchParams } from 'react-router-dom'
import { getOrderDetailPhase } from '../../../../services/data/merchantOrderDetail.mock'

export default function useOrderDetailPhase() {
  const [searchParams] = useSearchParams()
  return getOrderDetailPhase(searchParams)
}
