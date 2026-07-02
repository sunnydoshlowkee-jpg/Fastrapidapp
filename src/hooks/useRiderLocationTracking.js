import { useEffect, useRef } from 'react'
import { pingLocation } from '../services/riderLocationService'
import { watchPosition } from '../utils/geolocation'

const PING_INTERVAL_MS = 15000

export const useRiderLocationTracking = (isOnline) => {
  const lastPingAtRef = useRef(0)
  const lastPositionRef = useRef(null)

  useEffect(() => {
    if (!isOnline) {
      lastPingAtRef.current = 0
      lastPositionRef.current = null
      return undefined
    }

    const maybePing = (position) => {
      const now = Date.now()
      if (now - lastPingAtRef.current < PING_INTERVAL_MS) return

      lastPingAtRef.current = now
      lastPositionRef.current = position
      pingLocation(position.lat, position.lng).catch((err) => {
        console.error('Failed to ping location', err)
      })
    }

    const stop = watchPosition(
      maybePing,
      (error) => console.error('Geolocation error', error),
    )

    return stop
  }, [isOnline])
}
