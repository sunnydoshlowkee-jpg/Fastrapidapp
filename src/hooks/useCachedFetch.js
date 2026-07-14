import { useCallback, useEffect, useMemo, useState } from 'react'
import { cacheKey, getCached, setCached } from '../utils/requestCache'

export function useCachedFetch(keyParts, fetcher, { ttlMs = 5 * 60 * 1000, enabled = true, initialData = null } = {}) {
  const key = useMemo(() => {
    if (!enabled) return null
    return cacheKey(Array.isArray(keyParts) ? keyParts : [keyParts])
  }, [enabled, keyParts])

  const initialCached = key ? getCached(key, { ttlMs }) : null
  const [data, setData] = useState(initialCached?.data ?? initialData)
  const [loading, setLoading] = useState(enabled && !initialCached?.data)
  const [error, setError] = useState(null)

  const refetch = useCallback(async ({ force = true } = {}) => {
    if (!key) return null

    if (!force) {
      const cached = getCached(key, { ttlMs })
      if (cached?.data) {
        setData(cached.data)
        setLoading(false)
        if (cached.fresh) return cached.data
      }
    }

    setLoading(true)
    setError(null)

    try {
      const next = await fetcher()
      setCached(key, next)
      setData(next)
      return next
    } catch (err) {
      setError(err)
      throw err
    } finally {
      setLoading(false)
    }
  }, [fetcher, key, ttlMs])

  useEffect(() => {
    if (!enabled || !key) return undefined

    let cancelled = false
    const cached = getCached(key, { ttlMs })

    if (cached?.data) {
      setData(cached.data)
      setLoading(false)
      if (cached.fresh) {
        return () => {
          cancelled = true
        }
      }
    } else {
      setLoading(true)
    }

    const load = async () => {
      setError(null)

      try {
        const next = await fetcher()
        if (cancelled) return
        setCached(key, next)
        setData(next)
      } catch (err) {
        if (cancelled) return
        setError(err)
        if (!cached?.data) setData(initialData)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [enabled, fetcher, initialData, key, ttlMs])

  return { data, loading, error, refetch }
}
