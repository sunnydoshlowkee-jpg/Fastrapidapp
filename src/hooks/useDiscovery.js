import { useEffect, useState } from 'react'
import { getDiscovery } from '../services/discoveryService'
import { useLocation } from '../context/LocationContext'

const EMPTY = {
  food: [],
  grocery: [],
  trending_food: [],
  trending_grocery: [],
  nearby_count: 0,
  radius_km: 20,
  city: 'Lagos',
}

function parseDiscoveryPayload(response) {
  const payload = response?.data?.data

  if (!payload || !Array.isArray(payload.food)) {
    throw new Error('Discovery API returned an unexpected response. Check VITE_API_URL and that the API is running.')
  }

  return payload
}

export function useDiscovery() {
  const { location, loading: locationLoading } = useLocation()
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (locationLoading || location?.latitude == null || location?.longitude == null) {
      return
    }

    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await getDiscovery({
          latitude: location.latitude,
          longitude: location.longitude,
          city: location.city,
          country_code: location.country_code,
          location_label: location.location_label,
        })

        if (!cancelled) {
          setData(parseDiscoveryPayload(response))
        }
      } catch (err) {
        if (!cancelled) {
          const message =
            err?.response?.data?.message ||
            err?.message ||
            'Could not load nearby results.'
          setError(message)
          setData(EMPTY)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [location, locationLoading])

  return { data, loading: loading || locationLoading, error }
}
