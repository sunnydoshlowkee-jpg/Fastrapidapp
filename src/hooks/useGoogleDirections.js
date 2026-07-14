import { useEffect, useRef, useState } from 'react'
import { loadGoogleMaps } from '../lib/googleMaps'
import { distanceMeters } from '../utils/geolocation'

function stripHtml(value) {
  if (!value) return ''
  return String(value).replace(/<[^>]+>/g, '')
}

function fetchDirections(service, request) {
  return new Promise((resolve, reject) => {
    service.route(request, (result, status) => {
      if (status === 'OK') {
        resolve(result)
        return
      }
      reject(new Error(status || 'DIRECTIONS_FAILED'))
    })
  })
}

function summarizeDirections(response) {
  const route = response?.routes?.[0]
  const leg = route?.legs?.[0]
  if (!leg) return null

  const steps = leg.steps || []
  const currentStep = steps[0]
  const nextStep = steps[1]

  return {
    durationText: leg.duration?.text || '—',
    durationValue: leg.duration?.value || 0,
    distanceText: leg.distance?.text || '—',
    distanceValue: leg.distance?.value || 0,
    instruction: stripHtml(currentStep?.instructions) || 'Head to destination',
    nextInstruction: stripHtml(nextStep?.instructions) || '',
    nextDistanceText: currentStep?.distance?.text || '',
    bounds: route?.bounds || null,
    raw: response,
  }
}

const MIN_REFETCH_METERS = 40
const REFETCH_INTERVAL_MS = 15000

export function useGoogleDirections(origin, destination, enabled = true) {
  const [directions, setDirections] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const requestIdRef = useRef(0)
  const lastOriginRef = useRef(null)
  const lastFetchAtRef = useRef(0)
  const directionsRef = useRef(null)

  useEffect(() => {
    directionsRef.current = directions
  }, [directions])

  useEffect(() => {
    if (!enabled || !destination) {
      setDirections(null)
      setError(null)
      setLoading(false)
      return undefined
    }

    let cancelled = false
    const requestId = ++requestIdRef.current

    const run = async () => {
      const now = Date.now()
      const movedEnough = !lastOriginRef.current
        || !origin
        || distanceMeters(lastOriginRef.current, origin) >= MIN_REFETCH_METERS
      const staleEnough = now - lastFetchAtRef.current >= REFETCH_INTERVAL_MS

      if (origin && !movedEnough && !staleEnough && directionsRef.current) {
        return
      }

      setLoading(true)
      setError(null)

      try {
        const google = await loadGoogleMaps()
        if (cancelled || requestId !== requestIdRef.current) return

        const service = new google.maps.DirectionsService()
        const request = {
          destination,
          travelMode: google.maps.TravelMode.DRIVING,
        }

        if (origin) {
          request.origin = origin
        }

        const response = await fetchDirections(service, request)
        if (cancelled || requestId !== requestIdRef.current) return

        const summary = summarizeDirections(response)
        if (!summary) {
          throw new Error('No route found')
        }

        if (origin) {
          lastOriginRef.current = origin
        }
        lastFetchAtRef.current = Date.now()
        setDirections(summary)
      } catch (err) {
        if (!cancelled && requestId === requestIdRef.current) {
          setError(err?.message || 'Could not load directions')
        }
      } finally {
        if (!cancelled && requestId === requestIdRef.current) {
          setLoading(false)
        }
      }
    }

    const timer = setTimeout(run, origin ? 400 : 0)
    const interval = setInterval(run, REFETCH_INTERVAL_MS)

    return () => {
      cancelled = true
      clearTimeout(timer)
      clearInterval(interval)
    }
  }, [enabled, destination, origin?.lat, origin?.lng])

  return { directions, loading, error }
}
