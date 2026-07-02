import { useCallback, useEffect, useRef, useState } from 'react'
import { Crosshair } from 'lucide-react'
import { useGoogleDirections } from '../../../hooks/useGoogleDirections'
import { useWatchPosition } from '../../../hooks/useWatchPosition'
import { isGoogleMapsConfigured, loadGoogleMaps } from '../../../lib/googleMaps'
import { DEFAULT_LOCATION } from '../../../utils/geo'

function MapPlaceholder({ message }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center px-6 text-center"
      style={{ background: 'linear-gradient(160deg, #0d1117 0%, #0a1628 50%, #0d1117 100%)' }}>
      <p className="text-white/80 text-sm font-semibold">{message}</p>
    </div>
  )
}

export default function RiderNavigationMap({
  destination,
  position: externalPosition,
  height = '100%',
  className = '',
  children,
  showLivePill = false,
  showRecenter = true,
  onDirectionsChange,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const rendererRef = useRef(null)
  const riderMarkerRef = useRef(null)
  const destMarkerRef = useRef(null)
  const [mapReady, setMapReady] = useState(false)
  const [mapsError, setMapsError] = useState(null)

  const internalWatch = useWatchPosition({
    enabled: isGoogleMapsConfigured() && !externalPosition,
  })
  const position = externalPosition ?? internalWatch.position
  const geoError = externalPosition ? null : internalWatch.error

  const origin = position ? { lat: position.lat, lng: position.lng } : null
  const { directions, error: directionsError } = useGoogleDirections(
    origin,
    destination,
    Boolean(destination) && mapReady,
  )

  useEffect(() => {
    onDirectionsChange?.(directions)
  }, [directions, onDirectionsChange])

  useEffect(() => {
    if (!isGoogleMapsConfigured() || !containerRef.current) return undefined

    let cancelled = false

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return

        const map = new google.maps.Map(containerRef.current, {
          center: {
            lat: DEFAULT_LOCATION.latitude,
            lng: DEFAULT_LOCATION.longitude,
          },
          zoom: 14,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'greedy',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        })

        mapRef.current = map
        rendererRef.current = new google.maps.DirectionsRenderer({
          map,
          suppressMarkers: true,
          polylineOptions: {
            strokeColor: '#5B5BFF',
            strokeWeight: 5,
            strokeOpacity: 0.9,
          },
        })

        riderMarkerRef.current = new google.maps.Marker({
          map,
          title: 'Your location',
          zIndex: 100,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 9,
            fillColor: '#4285F4',
            fillOpacity: 1,
            strokeColor: '#ffffff',
            strokeWeight: 3,
          },
        })

        destMarkerRef.current = new google.maps.Marker({
          map,
          title: 'Destination',
          zIndex: 99,
        })

        setMapReady(true)
      })
      .catch((err) => {
        if (!cancelled) setMapsError(err.message)
      })

    return () => {
      cancelled = true
      mapRef.current = null
      rendererRef.current = null
      riderMarkerRef.current = null
      destMarkerRef.current = null
      setMapReady(false)
    }
  }, [])

  useEffect(() => {
    if (!directions?.raw || !rendererRef.current) return

    rendererRef.current.setDirections(directions.raw)

    const leg = directions.raw.routes?.[0]?.legs?.[0]
    if (leg?.end_location && destMarkerRef.current) {
      destMarkerRef.current.setPosition(leg.end_location)
    }

    if (directions.bounds && mapRef.current) {
      mapRef.current.fitBounds(directions.bounds, {
        top: 100,
        right: 48,
        bottom: 48,
        left: 48,
      })
    }
  }, [directions])

  useEffect(() => {
    if (!position || !riderMarkerRef.current) return
    riderMarkerRef.current.setPosition({ lat: position.lat, lng: position.lng })
  }, [position])

  const recenter = useCallback(() => {
    if (!mapRef.current) return

    if (position) {
      mapRef.current.panTo({ lat: position.lat, lng: position.lng })
      mapRef.current.setZoom(16)
      return
    }

    if (directions?.bounds) {
      mapRef.current.fitBounds(directions.bounds)
    }
  }, [position, directions])

  if (!isGoogleMapsConfigured()) {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <MapPlaceholder message="Add VITE_GOOGLE_MAPS_KEY to enable Google Maps navigation." />
        {children}
      </div>
    )
  }

  if (mapsError) {
    return (
      <div className={`relative ${className}`} style={{ height }}>
        <MapPlaceholder message={mapsError} />
        {children}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div ref={containerRef} className="absolute inset-0" />

      {geoError && (
        <div className="absolute top-24 left-4 right-4 z-10 bg-amber-50 border border-amber-200 text-amber-800 text-xs font-semibold px-3 py-2 rounded-xl">
          Allow location access for live navigation and ETA updates.
        </div>
      )}

      {directionsError && !directions && (
        <div className="absolute top-24 left-4 right-4 z-10 bg-red-50 border border-red-200 text-red-700 text-xs font-semibold px-3 py-2 rounded-xl">
          Could not load route. Check your Google Maps API key and enabled APIs.
        </div>
      )}

      {showLivePill && position && (
        <div className="absolute bottom-4 left-4 z-10">
          <div className="flex items-center gap-2 bg-gray-900/70 backdrop-blur-sm px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-xs font-bold">Live Tracking Active</span>
          </div>
        </div>
      )}

      {showRecenter && (
        <div className="absolute right-4 top-24 flex flex-col gap-2 z-10">
          <button
            type="button"
            onClick={recenter}
            className="w-11 h-11 bg-white rounded-2xl flex items-center justify-center shadow-lg"
            aria-label="Recenter map"
          >
            <Crosshair size={18} className="text-gray-700" />
          </button>
        </div>
      )}

      {children}
    </div>
  )
}
