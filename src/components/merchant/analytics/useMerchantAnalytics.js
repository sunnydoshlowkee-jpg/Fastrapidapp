import { useCallback, useEffect, useState } from 'react'
import { getMerchantAnalytics } from '../../../services/merchantAnalyticsService'

export default function useMerchantAnalytics(initialPeriod = 'today') {
  const [activePeriod, setActivePeriod] = useState(initialPeriod)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(async (period = activePeriod) => {
    setLoading(true)
    setError('')

    try {
      const next = await getMerchantAnalytics({ period })
      setData(next)
    } catch (err) {
      setData(null)
      setError(err?.message || 'Could not load analytics.')
    } finally {
      setLoading(false)
    }
  }, [activePeriod])

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const next = await getMerchantAnalytics({ period: activePeriod })
        if (!cancelled) {
          setData(next)
        }
      } catch (err) {
        if (!cancelled) {
          setData(null)
          setError(err?.message || 'Could not load analytics.')
        }
      } finally {
        if (!cancelled) {
          setLoading(false)
        }
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [activePeriod])

  return {
    data,
    loading,
    error,
    activePeriod,
    setActivePeriod,
    refresh,
  }
}
