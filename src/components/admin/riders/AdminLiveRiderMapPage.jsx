import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import GoogleMapView from '../../maps/GoogleMapView'
import {
  fetchAdminRiderLocation,
  fetchAdminRiderLocations,
} from '../../../services/adminRiderTrackingService'
import { DEFAULT_LOCATION } from '../../../utils/geo'

const POLL_MS = 15000

export default function AdminLiveRiderMapPage({ fleet = false } = {}) {
  const { riderId } = useParams()
  const [riders, setRiders] = useState([])
  const [selected, setSelected] = useState(null)
  const [onlineOnly, setOnlineOnly] = useState(true)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [updatedAt, setUpdatedAt] = useState(null)

  useEffect(() => {
    let cancelled = false
    let timer

    const load = async () => {
      try {
        if (riderId && !fleet) {
          const one = await fetchAdminRiderLocation(riderId)
          if (!cancelled) {
            setSelected(one)
            setRiders(one?.lat != null ? [one] : [])
            setUpdatedAt(new Date())
            setError('')
          }
        } else {
          const list = await fetchAdminRiderLocations({ onlineOnly })
          if (!cancelled) {
            setRiders(list)
            setSelected((prev) => {
              if (riderId) return list.find((r) => String(r.rider_id) === String(riderId)) || prev
              if (prev) return list.find((r) => r.rider_id === prev.rider_id) || list[0] || null
              return list[0] || null
            })
            setUpdatedAt(new Date())
            setError('')
          }
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load rider map.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    timer = setInterval(load, POLL_MS)
    return () => {
      cancelled = true
      clearInterval(timer)
    }
  }, [riderId, fleet, onlineOnly])

  const center = useMemo(() => {
    if (selected?.lat != null && selected?.lng != null) {
      return { lat: selected.lat, lng: selected.lng }
    }
    if (riders[0]?.lat != null) return { lat: riders[0].lat, lng: riders[0].lng }
    return { lat: DEFAULT_LOCATION.latitude, lng: DEFAULT_LOCATION.longitude }
  }, [selected, riders])

  const markers = useMemo(() => {
    const points = []
    riders.forEach((r) => {
      if (r.lat == null || r.lng == null) return
      points.push({
        id: `rider-${r.rider_id}`,
        lat: r.lat,
        lng: r.lng,
        title: r.name,
      })
      if (r.pickup?.lat != null && r.pickup?.lng != null) {
        points.push({
          id: `pickup-${r.rider_id}`,
          lat: r.pickup.lat,
          lng: r.pickup.lng,
          title: 'Pickup',
        })
      }
      if (r.destination?.lat != null && r.destination?.lng != null) {
        points.push({
          id: `dest-${r.rider_id}`,
          lat: r.destination.lat,
          lng: r.destination.lng,
          title: 'Dropoff',
        })
      }
    })
    return points
  }, [riders])

  const path = useMemo(() => {
    if (!selected?.pickup?.lat || !selected?.lat || !selected?.destination?.lat) return null
    return [
      { lat: selected.pickup.lat, lng: selected.pickup.lng },
      { lat: selected.lat, lng: selected.lng },
      { lat: selected.destination.lat, lng: selected.destination.lng },
    ]
  }, [selected])

  return (
    <div className="flex h-full min-h-[70vh] flex-col lg:flex-row">
      <div className="relative min-h-[420px] flex-1">
        <GoogleMapView
          center={center}
          zoom={riders.length > 1 ? 12 : 14}
          markers={markers}
          path={path}
          height="100%"
          className="h-full min-h-[420px] w-full"
        />
        {loading ? (
          <div className="absolute left-3 top-3 rounded-lg bg-white/90 px-3 py-1.5 text-xs font-semibold text-gray-600 shadow">
            Updating map…
          </div>
        ) : null}
      </div>

      <aside className="w-full border-t border-gray-200 bg-white p-4 lg:w-80 lg:border-l lg:border-t-0">
        <h1 className="text-lg font-bold text-gray-900">
          {riderId && !fleet ? `Rider #${riderId}` : 'Live rider map'}
        </h1>
        <p className="mt-1 text-xs text-gray-500">
          Polls every {POLL_MS / 1000}s
          {updatedAt ? ` · ${updatedAt.toLocaleTimeString()}` : ''}
        </p>

        {!riderId || fleet ? (
          <label className="mt-3 flex items-center gap-2 text-sm text-gray-600">
            <input
              type="checkbox"
              checked={onlineOnly}
              onChange={(e) => setOnlineOnly(e.target.checked)}
            />
            Online riders only
          </label>
        ) : (
          <Link
            to="/admin/rider-map"
            className="mt-3 inline-block text-sm font-semibold text-rapid-orange hover:underline"
          >
            Open fleet map
          </Link>
        )}

        {error ? (
          <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </p>
        ) : null}

        <ul className="mt-4 max-h-[50vh] space-y-2 overflow-auto">
          {riders.length === 0 ? (
            <li className="text-sm text-gray-500">
              No riders with GPS coordinates
              {onlineOnly ? ' online' : ''} right now.
            </li>
          ) : (
            riders.map((r) => (
              <li key={r.rider_id}>
                <button
                  type="button"
                  onClick={() => setSelected(r)}
                  className={`w-full rounded-lg border px-3 py-2 text-left text-sm ${
                    selected?.rider_id === r.rider_id
                      ? 'border-rapid-orange bg-orange-50'
                      : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                >
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <p className="text-xs text-gray-500">
                    {r.is_online ? 'Online' : 'Offline'}
                    {r.active_order_id ? ` · Order #${r.active_order_id}` : ''}
                  </p>
                  <Link
                    to={`/admin/riders/${r.rider_id}`}
                    className="mt-1 inline-block text-xs font-semibold text-rapid-orange"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Rider profile
                  </Link>
                </button>
              </li>
            ))
          )}
        </ul>
      </aside>
    </div>
  )
}
