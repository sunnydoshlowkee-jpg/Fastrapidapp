import { useCallback, useEffect, useState } from 'react'
import { getMerchantAnalytics } from '../../../services/merchantAnalyticsService'

function defaultCustomRange() {
  const to = new Date()
  const from = new Date()
  from.setDate(to.getDate() - 6)
  const fmt = (d) => d.toISOString().slice(0, 10)
  return { from: fmt(from), to: fmt(to) }
}

export default function useMerchantAnalytics(initialPeriod = 'today') {
  const [activePeriod, setActivePeriod] = useState(initialPeriod)
  const [customRange, setCustomRange] = useState(defaultCustomRange)
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const refresh = useCallback(
    async (period = activePeriod, range = customRange) => {
      setLoading(true)
      setError('')

      try {
        const params =
          period === 'custom'
            ? { period: 'custom', from: range.from, to: range.to }
            : { period }
        const next = await getMerchantAnalytics(params)
        setData(next)
      } catch (err) {
        setData(null)
        setError(err?.message || 'Could not load analytics.')
      } finally {
        setLoading(false)
      }
    },
    [activePeriod, customRange],
  )

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError('')

      try {
        const params =
          activePeriod === 'custom'
            ? { period: 'custom', from: customRange.from, to: customRange.to }
            : { period: activePeriod }
        const next = await getMerchantAnalytics(params)
        if (!cancelled) setData(next)
      } catch (err) {
        if (!cancelled) {
          setData(null)
          setError(err?.message || 'Could not load analytics.')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [activePeriod, customRange])

  return {
    data,
    loading,
    error,
    activePeriod,
    setActivePeriod,
    customRange,
    setCustomRange,
    refresh,
  }
}
