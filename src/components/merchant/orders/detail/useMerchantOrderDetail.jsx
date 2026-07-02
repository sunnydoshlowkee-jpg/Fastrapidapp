import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
  getMerchantOrder,
  mapMerchantOrderDetailFromApi,
  updateMerchantOrderStatus,
} from '../../../../services/merchantOrdersService'

const MerchantOrderDetailContext = createContext(null)

export function MerchantOrderDetailProvider({ children }) {
  const { orderId } = useParams()
  const [order, setOrder] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [actionLoading, setActionLoading] = useState(false)

  const loadOrder = useCallback(async () => {
    if (!orderId) {
      setOrder(null)
      setLoading(false)
      return
    }

    try {
      setLoading(true)
      setError('')
      const data = await getMerchantOrder(orderId)
      setOrder(mapMerchantOrderDetailFromApi(data))
    } catch (err) {
      setOrder(null)
      setError(err.message || 'Could not load order.')
    } finally {
      setLoading(false)
    }
  }, [orderId])

  useEffect(() => {
    loadOrder()
  }, [loadOrder])

  const runAction = useCallback(
    async (action) => {
      if (!orderId) return null

      try {
        setActionLoading(true)
        await updateMerchantOrderStatus(orderId, action)
        await loadOrder()
        return true
      } catch (err) {
        setError(err.message || 'Could not update order.')
        alert(err.message || 'Could not update order.')
        return false
      } finally {
        setActionLoading(false)
      }
    },
    [loadOrder, orderId],
  )

  const value = useMemo(
    () => ({
      order,
      loading,
      error,
      actionLoading,
      phase: order?.phase || 'new',
      refresh: loadOrder,
      acceptOrder: () => runAction('accept'),
      rejectOrder: () => runAction('reject'),
      markReady: () => runAction('ready'),
      startPreparing: () => runAction('preparing'),
    }),
    [actionLoading, error, loadOrder, order, runAction],
  )

  return (
    <MerchantOrderDetailContext.Provider value={value}>{children}</MerchantOrderDetailContext.Provider>
  )
}

export default function useMerchantOrderDetail() {
  const context = useContext(MerchantOrderDetailContext)

  if (!context) {
    throw new Error('useMerchantOrderDetail must be used within MerchantOrderDetailProvider')
  }

  return context
}
