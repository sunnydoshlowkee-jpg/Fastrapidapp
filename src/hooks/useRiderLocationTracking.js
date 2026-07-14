import { useEffect, useRef, useState } from 'react'
import { pingLocation } from '../services/riderLocationService'
import { getCurrentPosition, watchPosition } from '../utils/geolocation'

const PING_INTERVAL_MS = 15000

export const useRiderLocationTracking = (isOnline) => {
  const lastPingAtRef = useRef(0)
  const lastPositionRef = useRef(null)
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!isOnline) {
      lastPingAtRef.current = 0
      lastPositionRef.current = null
      setPosition(null)
      setError(null)
      return undefined
    }

    const maybePing = (next) => {
      const now = Date.now()
      lastPositionRef.current = next
      setPosition(next)
      setError(null)

      if (now - lastPingAtRef.current < PING_INTERVAL_MS) return

      lastPingAtRef.current = now
      pingLocation(next.lat, next.lng).catch((err) => {
        console.error('Failed to ping location', err)
      })
    }

    getCurrentPosition()
      .then((coords) => {
        maybePing(coords)
      })
      .catch((err) => {
        setError(err?.message || 'Enable location to receive nearby jobs.')
      })

    const stop = watchPosition(
      maybePing,
      (err) => setError(err?.message || 'Location error'),
    )

    return stop
  }, [isOnline])

  return { position, error, lastPositionRef }
}
