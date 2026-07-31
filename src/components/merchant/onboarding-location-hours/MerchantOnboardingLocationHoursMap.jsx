import { useCallback, useEffect, useState } from 'react'
import { Crosshair, MapPin } from 'lucide-react'
import {
  DEFAULT_MERCHANT_MAP_COORDS,
  isDefaultMerchantPin,
} from '../../../utils/merchantLocationHours'
import { geocodeQuery } from '../../../lib/googleGeocode'
import GoogleMapView from '../../maps/GoogleMapView'

function toPin(coords) {
  const lat = Number(coords?.latitude ?? coords?.lat)
  const lng = Number(coords?.longitude ?? coords?.lng)
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  return { latitude: lat, longitude: lng, lat, lng }
}

export default function MerchantOnboardingLocationHoursMap({
  map,
  confirmed,
  onConfirm,
  error,
  coords,
  street = '',
  city = '',
}) {
  const [pin, setPin] = useState(() => toPin(coords) || { ...DEFAULT_MERCHANT_MAP_COORDS, lat: DEFAULT_MERCHANT_MAP_COORDS.latitude, lng: DEFAULT_MERCHANT_MAP_COORDS.longitude })
  const [busy, setBusy] = useState(false)
  const [localError, setLocalError] = useState('')

  useEffect(() => {
    const next = toPin(coords)
    if (next) setPin(next)
  }, [coords?.latitude, coords?.longitude, coords?.lat, coords?.lng])

  // Preview pin when street/city change (does not auto-confirm).
  useEffect(() => {
    const query = [street, city, 'Nigeria'].map((p) => String(p || '').trim()).filter(Boolean).join(', ')
    if (query.length < 8) return undefined

    let cancelled = false
    const timer = window.setTimeout(async () => {
      try {
        const results = await geocodeQuery(query)
        if (cancelled || !results?.[0]) return
        const next = toPin(results[0])
        if (next) setPin(next)
      } catch {
        // Keep current pin; confirm will surface errors.
      }
    }, 600)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
    }
  }, [street, city])

  const handleDragEnd = useCallback((next) => {
    const resolved = toPin(next)
    if (!resolved) return
    setPin(resolved)
    setLocalError('')
  }, [])

  const handleConfirm = async () => {
    setLocalError('')
    setBusy(true)
    try {
      let next = toPin(pin)
      const query = [street, city, 'Nigeria'].map((p) => String(p || '').trim()).filter(Boolean).join(', ')

      if (query) {
        const results = await geocodeQuery(query)
        if (results?.[0]) {
          next = toPin(results[0])
          if (next) setPin(next)
        }
      }

      if (!next) {
        setLocalError('Could not place your store on the map. Check the address and try again.')
        return
      }

      if (isDefaultMerchantPin(next.latitude, next.longitude) && query) {
        // Address was typed but geocode still landed on CBD default — ask user to drag.
        setLocalError('Drag the pin to your exact store location, then confirm again.')
        return
      }

      onConfirm?.({
        latitude: next.latitude,
        longitude: next.longitude,
      })
    } catch {
      setLocalError('Could not find that address. Drag the pin to your store and confirm.')
    } finally {
      setBusy(false)
    }
  }

  const hasCoords = Number.isFinite(pin?.lat) && Number.isFinite(pin?.lng)
  const displayError = localError || error

  return (
    <div>
      <div
        className={`relative mt-4 overflow-hidden rounded-lg border bg-[#e8eaef] ${
          confirmed ? 'border-merchant-primary/40' : 'border-merchant-divider'
        }`}
      >
        {hasCoords ? (
          <GoogleMapView
            center={pin}
            zoom={15}
            height="11rem"
            className="h-40 w-full sm:h-44"
            markers={[{ ...pin, title: 'Business location', draggable: true }]}
            draggableMarker
            onMarkerDragEnd={handleDragEnd}
          />
        ) : (
          <div
            className="h-40 w-full sm:h-44"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          >
            <div className="flex h-full items-center justify-center">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full text-white shadow-lg ${
                  confirmed ? 'bg-merchant-primary' : 'bg-merchant-primary/80'
                }`}
              >
                <MapPin size={20} strokeWidth={2} aria-hidden />
              </span>
            </div>
          </div>
        )}

        <button
          type="button"
          disabled={busy}
          onClick={handleConfirm}
          className="absolute bottom-3 left-1/2 flex -translate-x-1/2 items-center gap-2 rounded-lg bg-merchant-surface px-4 py-2.5 text-sm font-semibold text-merchant-ink shadow-merchant-stat transition-colors hover:bg-merchant-input disabled:opacity-60"
        >
          <Crosshair size={16} className="text-merchant-primary" strokeWidth={2} aria-hidden />
          {busy ? 'Finding location…' : confirmed ? 'Location confirmed' : map.confirmLabel}
        </button>
      </div>
      <p className="mt-2 text-xs text-merchant-body">
        Enter your street and city, then confirm. Drag the pin if it is not exact.
      </p>
      {displayError ? <p className="mt-2 text-sm text-merchant-error">{displayError}</p> : null}
    </div>
  )
}
