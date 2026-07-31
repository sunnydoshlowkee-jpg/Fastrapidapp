import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { updateLocation as updateLocationApi } from '../services/locationService'
import { reverseGeocode } from '../lib/googleGeocode'
import {
  DEFAULT_LOCATION,
  formatLocationDisplay,
  readStoredLocation,
  requestDevicePosition,
  storeLocation,
} from '../utils/geo'
import { watchDevicePosition } from '../utils/nativeLocation'
import { useAuth } from './AuthContext'

const LocationContext = createContext(null)

const WATCH_MOVE_METERS = 35
const GEOCODE_MIN_INTERVAL_MS = 45_000
const SERVER_SYNC_MIN_INTERVAL_MS = 20_000

function toRad(value) {
  return (value * Math.PI) / 180
}

function distanceMeters(a, b) {
  if (!a || !b) return Infinity
  const earth = 6371000
  const dLat = toRad(b.latitude - a.latitude)
  const dLng = toRad(b.longitude - a.longitude)
  const lat1 = toRad(a.latitude)
  const lat2 = toRad(b.latitude)
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2
  return 2 * earth * Math.asin(Math.min(1, Math.sqrt(h)))
}

function normalizeLocation(input) {
  if (input?.latitude == null || input?.longitude == null) return null

  const location = {
    latitude: Number(input.latitude),
    longitude: Number(input.longitude),
    location_label: input.location_label || input.area || 'Current location',
    city: input.city || DEFAULT_LOCATION.city,
    state: input.state || DEFAULT_LOCATION.state,
    country_code: input.country_code || DEFAULT_LOCATION.country_code,
    source: input.source || 'manual',
    accuracy: input.accuracy,
    updatedAt: input.updatedAt || Date.now(),
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
  const locationRef = useRef(null)
  const lastGeocodeAtRef = useRef(0)
  const lastSyncAtRef = useRef(0)

  const applyLocation = useCallback((next) => {
    const normalized = normalizeLocation(next)
    if (!normalized) return null

    setLocation(normalized)
    locationRef.current = normalized
    storeLocation(normalized)
    setError(null)

    return normalized
  }, [])

  const syncToServer = useCallback(async (next, { force = false } = {}) => {
    const token = localStorage.getItem('rapid_token')
    if (!token) return

    const now = Date.now()
    if (!force && now - lastSyncAtRef.current < SERVER_SYNC_MIN_INTERVAL_MS) return
    lastSyncAtRef.current = now

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

  const enrichAndApply = useCallback(async (coords, { forceGeocode = false } = {}) => {
    const base = {
      latitude: Number(coords.latitude ?? coords.lat),
      longitude: Number(coords.longitude ?? coords.lng),
      accuracy: coords.accuracy,
      updatedAt: coords.updatedAt || Date.now(),
      source: 'gps',
    }

    if (!Number.isFinite(base.latitude) || !Number.isFinite(base.longitude)) {
      return null
    }

    // Apply coords immediately so discovery can start without waiting on geocode.
    const previous = locationRef.current
    const quick = applyLocation({
      ...base,
      location_label: previous?.location_label || 'Current location',
      city: previous?.city || DEFAULT_LOCATION.city,
      state: previous?.state || DEFAULT_LOCATION.state,
      country_code: previous?.country_code || DEFAULT_LOCATION.country_code,
    })

    const now = Date.now()
    const movedFar =
      !previous || distanceMeters(previous, base) >= WATCH_MOVE_METERS
    const shouldGeocode =
      forceGeocode ||
      movedFar ||
      now - lastGeocodeAtRef.current >= GEOCODE_MIN_INTERVAL_MS

    if (shouldGeocode) {
      lastGeocodeAtRef.current = now
      try {
        const geo = await reverseGeocode(base.latitude, base.longitude)
        if (geo) {
          applyLocation({
            ...base,
            location_label: geo.location_label,
            city: geo.city || DEFAULT_LOCATION.city,
            state: geo.state || DEFAULT_LOCATION.state,
            country_code: geo.country_code || DEFAULT_LOCATION.country_code,
            source: geo.source || 'gps',
          })
        }
      } catch {
        // Keep quick GPS label.
      }
    }

    const current = locationRef.current || quick
    if (current) {
      await syncToServer(current, { force: forceGeocode || !previous })
    }

    return locationRef.current || quick
  }, [applyLocation, syncToServer])

  const setUserLocation = useCallback(async (input) => {
    const normalized = applyLocation(input)
    if (!normalized) return null

    await syncToServer(normalized, { force: true })
    return normalized
  }, [applyLocation, syncToServer])

  const detectCurrentLocation = useCallback(async () => {
    setDetecting(true)
    setError(null)

    try {
      const coords = await requestDevicePosition()
      return await enrichAndApply(coords, { forceGeocode: true })
    } catch (err) {
      const message = err?.code === 1
        ? 'Location permission denied. Enable location to see nearby stores.'
        : (err?.message || 'Could not detect your location.')
      setError(message)
      return null
    } finally {
      setDetecting(false)
    }
  }, [enrichAndApply])

  useEffect(() => {
    const stored = readStoredLocation()
    const fromUser = user?.location

    if (fromUser?.latitude != null && fromUser?.longitude != null) {
      applyLocation({ ...fromUser, source: fromUser.source || 'profile' })
    } else if (stored?.latitude != null && stored?.longitude != null) {
      applyLocation(stored)
    } else {
      setLocation(null)
      locationRef.current = null
    }

    setLoading(false)
  }, [user, applyLocation])

  // Live GPS watch — keeps discovery aligned with the user's realtime position.
  useEffect(() => {
    let cancelled = false
    let stop = () => {}

    ;(async () => {
      stop = await watchDevicePosition(
        (coords) => {
          if (cancelled) return
          enrichAndApply(coords)
        },
        (err) => {
          if (cancelled) return
          if (!locationRef.current) {
            setError(err?.message || 'Enable location to see nearby stores.')
          }
        },
      )
    })()

    return () => {
      cancelled = true
      stop?.()
    }
  }, [enrichAndApply])

  // One-shot prompt when we still have no location after hydrate.
  useEffect(() => {
    if (loading || location?.latitude != null) return undefined

    let cancelled = false
    ;(async () => {
      const result = await detectCurrentLocation()
      if (cancelled || result) return
    })()

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading])

  const display = location?.display || formatLocationDisplay(location)
  const hasLocation = location?.latitude != null && location?.longitude != null

  return (
    <LocationContext.Provider
      value={{
        location,
        display,
        loading,
        detecting,
        error,
        hasLocation,
        setUserLocation,
        detectCurrentLocation,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}

export const useLocation = () => useContext(LocationContext)
