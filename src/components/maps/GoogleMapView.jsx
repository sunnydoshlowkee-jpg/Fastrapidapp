import { useEffect, useRef, useState } from 'react'
import { Crosshair } from 'lucide-react'
import { DEFAULT_LOCATION } from '../../utils/geo'
import { isGoogleMapsConfigured, loadGoogleMaps } from '../../lib/googleMaps'
import BrandedLoader from '../ui/BrandedLoader'

/**
 * Shared Google Map used by user / merchant / dispatch surfaces.
 */
export default function GoogleMapView({
  center,
  zoom = 14,
  markers = [],
  path = null,
  className = '',
  height = '100%',
  showRecenter = false,
  draggableMarker = false,
  onMarkerDragEnd,
  onMapReady,
  children,
}) {
  const containerRef = useRef(null)
  const mapRef = useRef(null)
  const markersRef = useRef([])
  const polylineRef = useRef(null)
  const [ready, setReady] = useState(false)
  const [error, setError] = useState(null)

  const fallbackCenter = {
    lat: center?.lat ?? center?.latitude ?? DEFAULT_LOCATION.latitude,
    lng: center?.lng ?? center?.longitude ?? DEFAULT_LOCATION.longitude,
  }

  useEffect(() => {
    if (!isGoogleMapsConfigured()) {
      setError('Google Maps is not configured.')
      return undefined
    }
    if (!containerRef.current) return undefined

    let cancelled = false

    loadGoogleMaps()
      .then((google) => {
        if (cancelled || !containerRef.current) return

        const map = new google.maps.Map(containerRef.current, {
          center: fallbackCenter,
          zoom,
          disableDefaultUI: true,
          zoomControl: true,
          gestureHandling: 'greedy',
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
          styles: [
            { featureType: 'poi', stylers: [{ visibility: 'off' }] },
          ],
        })

        mapRef.current = map
        setReady(true)
        onMapReady?.(map, google)
      })
      .catch((err) => {
        if (!cancelled) setError(err?.message || 'Could not load Google Maps.')
      })

    return () => {
      cancelled = true
      markersRef.current.forEach((m) => m.setMap(null))
      markersRef.current = []
      polylineRef.current?.setMap(null)
      polylineRef.current = null
      mapRef.current = null
      setReady(false)
    }
    // Initialize once per mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (!ready || !mapRef.current || !center) return
    const next = {
      lat: Number(center.lat ?? center.latitude),
      lng: Number(center.lng ?? center.longitude),
    }
    if (!Number.isFinite(next.lat) || !Number.isFinite(next.lng)) return
    mapRef.current.panTo(next)
  }, [center, ready])

  useEffect(() => {
    if (!ready || !mapRef.current || !window.google) return

    markersRef.current.forEach((m) => m.setMap(null))
    markersRef.current = []

    markers.forEach((marker, index) => {
      const position = {
        lat: Number(marker.lat ?? marker.latitude),
        lng: Number(marker.lng ?? marker.longitude),
      }
      if (!Number.isFinite(position.lat) || !Number.isFinite(position.lng)) return

      const mapMarker = new window.google.maps.Marker({
        map: mapRef.current,
        position,
        title: marker.title || '',
        icon: marker.icon,
        zIndex: marker.zIndex || 1,
        draggable: Boolean(draggableMarker && (marker.draggable ?? index === 0)),
      })

      if (draggableMarker && onMarkerDragEnd) {
        mapMarker.addListener('dragend', () => {
          const pos = mapMarker.getPosition()
          if (!pos) return
          onMarkerDragEnd({
            latitude: pos.lat(),
            longitude: pos.lng(),
            lat: pos.lat(),
            lng: pos.lng(),
          })
        })
      }

      markersRef.current.push(mapMarker)
    })
  }, [markers, ready, draggableMarker, onMarkerDragEnd])

  useEffect(() => {
    if (!ready || !mapRef.current || !window.google) return

    polylineRef.current?.setMap(null)
    polylineRef.current = null

    if (!path?.length) return

    const points = path
      .map((p) => ({
        lat: Number(p.lat ?? p.latitude),
        lng: Number(p.lng ?? p.longitude),
      }))
      .filter((p) => Number.isFinite(p.lat) && Number.isFinite(p.lng))

    if (points.length < 2) return

    polylineRef.current = new window.google.maps.Polyline({
      map: mapRef.current,
      path: points,
      strokeColor: '#5B5BFF',
      strokeOpacity: 0.9,
      strokeWeight: 5,
    })

    const bounds = new window.google.maps.LatLngBounds()
    points.forEach((p) => bounds.extend(p))
    mapRef.current.fitBounds(bounds, 48)
  }, [path, ready])

  const recenter = () => {
    if (!mapRef.current) return
    mapRef.current.panTo(fallbackCenter)
    mapRef.current.setZoom(zoom)
  }

  if (!isGoogleMapsConfigured() || error) {
    return (
      <div
        className={`relative flex items-center justify-center bg-slate-900 text-center ${className}`}
        style={{ height }}
      >
        <p className="px-6 text-sm font-semibold text-white/80">
          {error || 'Add VITE_GOOGLE_MAPS_KEY to enable Google Maps.'}
        </p>
        {children}
      </div>
    )
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      <div ref={containerRef} className="absolute inset-0" />
      {!ready ? (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50">
          <BrandedLoader size="sm" />
        </div>
      ) : null}
      {showRecenter ? (
        <button
          type="button"
          onClick={recenter}
          className="absolute right-4 top-4 z-10 flex h-11 w-11 items-center justify-center rounded-2xl bg-white shadow-lg"
          aria-label="Recenter map"
        >
          <Crosshair size={18} className="text-gray-700" />
        </button>
      ) : null}
      {children}
    </div>
  )
}
