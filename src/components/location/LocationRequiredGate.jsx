import { MapPin } from 'lucide-react'
import { useState } from 'react'
import { useLocation } from '../../context/LocationContext'
import { LOCATION_AREAS } from '../../utils/geo'

/**
 * Blocks customer browsing until a location is set (GPS or explicit area pick).
 */
export default function LocationRequiredGate({ children }) {
  const {
    hasLocation,
    loading,
    detecting,
    error,
    detectCurrentLocation,
    setUserLocation,
  } = useLocation()
  const [picking, setPicking] = useState(false)

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-gray-50 p-6">
        <p className="text-sm text-gray-500">Checking your location…</p>
      </div>
    )
  }

  if (hasLocation) {
    return children
  }

  const pickArea = async (area) => {
    setPicking(true)
    try {
      await setUserLocation({
        ...area,
        source: 'manual',
      })
    } finally {
      setPicking(false)
    }
  }

  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gray-50 px-6 py-10">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-50 text-[#1A1AF5]">
          <MapPin size={28} />
        </div>
        <h1 className="text-center text-xl font-bold text-gray-900">
          Enable location to continue
        </h1>
        <p className="mt-2 text-center text-sm leading-6 text-gray-500">
          FastRapid only shows merchants and products within <strong>10km</strong> of you.
          Turn on location so we can load nearby stores.
        </p>

        {error ? (
          <p className="mt-4 rounded-xl bg-red-50 px-3 py-2 text-center text-sm text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="button"
          disabled={detecting || picking}
          onClick={() => detectCurrentLocation()}
          className="mt-5 w-full rounded-2xl bg-[#1A1AF5] px-4 py-3.5 text-sm font-semibold text-white disabled:opacity-60"
        >
          {detecting ? 'Detecting…' : 'Use my current location'}
        </button>

        <div className="mt-6">
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
            Or pick a nearby area
          </p>
          <div className="grid grid-cols-2 gap-2">
            {LOCATION_AREAS.map((area) => (
              <button
                key={area.location_label}
                type="button"
                disabled={picking || detecting}
                onClick={() => pickArea(area)}
                className="rounded-xl border border-gray-200 px-3 py-2.5 text-left text-sm font-medium text-gray-700 hover:border-[#1A1AF5] hover:text-[#1A1AF5] disabled:opacity-60"
              >
                {area.location_label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
