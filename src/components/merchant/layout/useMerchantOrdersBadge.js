import { useCallback, useEffect, useState } from 'react'
import { getMerchantOrdersBadge } from '../../../services/merchantOrdersService'

const POLL_INTERVAL_MS = 30_000
export const MERCHANT_ORDERS_CHANGED_EVENT = 'merchant-orders-changed'

export default function useMerchantOrdersBadge() {
  const [newOrdersCount, setNewOrdersCount] = useState(0)

  const refresh = useCallback(async () => {
    try {
      const count = await getMerchantOrdersBadge()
      setNewOrdersCount(count)
    } catch {
      setNewOrdersCount(0)
    }
  }, [])

  useEffect(() => {
    refresh()

    const intervalId = window.setInterval(refresh, POLL_INTERVAL_MS)
    const handleOrdersChanged = () => {
      refresh()
    }

    window.addEventListener(MERCHANT_ORDERS_CHANGED_EVENT, handleOrdersChanged)
    window.addEventListener('focus', refresh)

    return () => {
      window.clearInterval(intervalId)
      window.removeEventListener(MERCHANT_ORDERS_CHANGED_EVENT, handleOrdersChanged)
      window.removeEventListener('focus', refresh)
    }
  }, [refresh])

  return { newOrdersCount, refresh }
}
