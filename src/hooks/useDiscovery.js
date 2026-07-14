import { useEffect, useMemo, useState } from 'react'
import { getDiscovery, getDiscoveryBrowse } from '../services/discoveryService'
import { useLocation } from '../context/LocationContext'
import { cacheKey, getCached, setCached } from '../utils/requestCache'

const EMPTY = {
  food: [],
  grocery: [],
  more: [],
  vendors: [],
  trending_food: [],
  trending_grocery: [],
  trending_more: [],
  recommended_for_you: [],
  nearby_count: 0,
  more_count: 0,
  radius_km: 10,
  city: 'Lagos',
}

const DISCOVERY_TTL_MS = 5 * 60 * 1000

function parseDiscoveryPayload(response) {
  const payload = response?.data?.data

  if (!payload || !Array.isArray(payload.food)) {
    throw new Error('Discovery API returned an unexpected response. Check VITE_API_URL and that the API is running.')
  }

  return payload
}

function parseBrowsePayload(response) {
  const payload = response?.data?.data

  if (!payload || !Array.isArray(payload.vendors)) {
    throw new Error('Browse API returned an unexpected response.')
  }

  return {
    ...EMPTY,
    vendors: payload.vendors,
    radius_km: payload.radius_km ?? 10,
    city: payload.city ?? 'Lagos',
  }
}

function buildDiscoveryCacheKey({ location, storeFormat, vertical, isBrowseVertical }) {
  return cacheKey([
    isBrowseVertical ? 'discovery-browse' : 'discovery',
    location?.latitude,
    location?.longitude,
    location?.city,
    storeFormat || '',
    vertical || '',
  ])
}

export function useDiscovery({ storeFormat = null, vertical = null } = {}) {
  const { location, loading: locationLoading } = useLocation()
  const isBrowseVertical = Boolean(vertical && !['food', 'grocery'].includes(vertical))

  const key = useMemo(() => {
    if (location?.latitude == null || location?.longitude == null) return null
    return buildDiscoveryCacheKey({ location, storeFormat, vertical, isBrowseVertical })
  }, [location, storeFormat, vertical, isBrowseVertical])

  const initialCached = key ? getCached(key, { ttlMs: DISCOVERY_TTL_MS }) : null
  const [data, setData] = useState(initialCached?.data ?? EMPTY)
  const [loading, setLoading] = useState(!initialCached)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (locationLoading || location?.latitude == null || location?.longitude == null || !key) {
      return
    }

    let cancelled = false
    const cached = getCached(key, { ttlMs: DISCOVERY_TTL_MS })

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
        const response = isBrowseVertical
          ? await getDiscoveryBrowse({
              latitude: location.latitude,
              longitude: location.longitude,
              city: location.city,
              location_label: location.location_label,
              vertical,
              store_format: storeFormat || undefined,
            })
          : await getDiscovery({
              latitude: location.latitude,
              longitude: location.longitude,
              city: location.city,
              country_code: location.country_code,
              location_label: location.location_label,
              store_format: storeFormat || undefined,
            })

        if (cancelled) return

        const next = isBrowseVertical ? parseBrowsePayload(response) : parseDiscoveryPayload(response)
        setCached(key, next)
        setData(next)
      } catch (err) {
        if (cancelled) return

        const message =
          err?.response?.data?.message ||
          err?.message ||
          'Could not load nearby results.'
        setError(message)
        if (!cached?.data) setData(EMPTY)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [location, locationLoading, storeFormat, vertical, isBrowseVertical, key])

  // Keep showing cached content while location resolves or a background refresh runs.
  const showLoading = (loading || locationLoading) && data === EMPTY

  return { data, loading: showLoading, error }
}
