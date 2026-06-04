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

export function useDiscovery() {
  const { location, loading: locationLoading } = useLocation()
  const [data, setData] = useState(EMPTY)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (locationLoading || !location?.latitude) {
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
          setData(response.data?.data ?? EMPTY)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err?.response?.data?.message || 'Could not load nearby results.')
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
