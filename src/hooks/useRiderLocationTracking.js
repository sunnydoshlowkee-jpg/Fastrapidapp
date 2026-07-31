import { useEffect, useRef, useState } from 'react'
import { pingLocation } from '../services/riderLocationService'
import { getDevicePosition, watchDevicePosition } from '../utils/nativeLocation'

const PING_INTERVAL_MS = 15000
export const LIVE_TRACKING_KEY = 'rider_live_tracking'

function isLiveTrackingEnabled() {
  const saved = localStorage.getItem(LIVE_TRACKING_KEY)
  return saved === null ? true : JSON.parse(saved) === true
}

export const useRiderLocationTracking = (isOnline) => {
  const lastPingAtRef = useRef(0)
  const lastPositionRef = useRef(null)
  const [position, setPosition] = useState(null)
  const [error, setError] = useState(null)
  const [prefVersion, setPrefVersion] = useState(0)

  useEffect(() => {
    const onPrefChange = () => setPrefVersion((v) => v + 1)
    window.addEventListener('rider-live-tracking-changed', onPrefChange)
    return () => window.removeEventListener('rider-live-tracking-changed', onPrefChange)
  }, [])

  useEffect(() => {
    const trackingAllowed = isLiveTrackingEnabled()
    if (!isOnline || !trackingAllowed) {
      lastPingAtRef.current = 0
      lastPositionRef.current = null
      setPosition(null)
      setError(trackingAllowed ? null : 'Live tracking is turned off in Edit Profile.')
      return undefined
    }

    let cancelled = false
    let stop = () => {}

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

    ;(async () => {
      try {
        const coords = await getDevicePosition()
        if (!cancelled) maybePing(coords)
      } catch (err) {
        if (!cancelled) {
          setError(err?.message || 'Enable location to receive nearby jobs.')
        }
      }

      stop = await watchDevicePosition(
        (coords) => {
          if (!cancelled) maybePing(coords)
        },
        (err) => {
          if (!cancelled) setError(err?.message || 'Location error')
        },
      )
    })()

    return () => {
      cancelled = true
      stop?.()
    }
  }, [isOnline, prefVersion])

  return { position, error, lastPositionRef }
}
