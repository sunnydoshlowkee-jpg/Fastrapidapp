import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { updateLocation as updateLocationApi } from '../services/locationService'
import {
  DEFAULT_LOCATION,
  formatLocationDisplay,
  readStoredLocation,
  requestDevicePosition,
  storeLocation,
} from '../utils/geo'
import { useAuth } from './AuthContext'

const LocationContext = createContext(null)

function normalizeLocation(input) {
  if (!input?.latitude || !input?.longitude) return null

  const location = {
    latitude: Number(input.latitude),
    longitude: Number(input.longitude),
    location_label: input.location_label || input.area || 'Current location',
    city: input.city || DEFAULT_LOCATION.city,
    state: input.state || DEFAULT_LOCATION.state,
    country_code: input.country_code || DEFAULT_LOCATION.country_code,
  }

  return {
    ...location,
    display: formatLocationDisplay(location),
  }
}

export function LocationProvider({ children }) {
  const { user } = useAuth()
  const [location, setLocation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [detecting, setDetecting] = useState(false)
  const [error, setError] = useState(null)

  const applyLocation = useCallback((next) => {
    const normalized = normalizeLocation(next)
    if (!normalized) return null

    setLocation(normalized)
    storeLocation(normalized)
    setError(null)

    return normalized
  }, [])

  const syncToServer = useCallback(async (next) => {
    const token = localStorage.getItem('rapid_token')
    if (!token) return

    try {
      await updateLocationApi({
        latitude: next.latitude,
        longitude: next.longitude,
        location_label: next.location_label,
        city: next.city,
        state: next.state,
        country_code: next.country_code,
      })
    } catch {
      // Keep local location even if sync fails.
    }
  }, [])

  const setUserLocation = useCallback(async (input) => {
    const normalized = applyLocation(input)
    if (!normalized) return null

    await syncToServer(normalized)
    return normalized
  }, [applyLocation, syncToServer])

  const detectCurrentLocation = useCallback(async () => {
    setDetecting(true)
    setError(null)

    try {
      const coords = await requestDevicePosition()
      const normalized = await setUserLocation({
        ...coords,
        location_label: 'Current location',
        city: DEFAULT_LOCATION.city,
        state: DEFAULT_LOCATION.state,
        country_code: DEFAULT_LOCATION.country_code,
      })
      return normalized
    } catch (err) {
      const message = err?.code === 1
        ? 'Location permission denied. Pick an area below.'
        : (err?.message || 'Could not detect your location.')
      setError(message)
      return null
    } finally {
      setDetecting(false)
    }
  }, [setUserLocation])

  useEffect(() => {
    const stored = readStoredLocation()
    const fromUser = user?.location

    if (fromUser) {
      applyLocation(fromUser)
    } else if (stored) {
      applyLocation(stored)
    } else {
      applyLocation(DEFAULT_LOCATION)
    }

    setLoading(false)
  }, [user, applyLocation])

  const display = location?.display || formatLocationDisplay(location)

  return (
    <LocationContext.Provider
      value={{
        location,
        display,
        loading,
        detecting,
        error,
        setUserLocation,
        detectCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => useContext(LocationContext)
