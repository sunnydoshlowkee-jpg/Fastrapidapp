/** Default center: Lagos */
export const DEFAULT_LOCATION = {
  latitude: 6.5244,
  longitude: 3.3792,
  location_label: 'Lagos',
  city: 'Lagos',
  state: 'Lagos',
  country_code: 'NG',
}

export const LOCATION_AREAS = [
  { location_label: 'Yaba', city: 'Lagos', latitude: 6.5158, longitude: 3.3696 },
  { location_label: 'Victoria Island', city: 'Lagos', latitude: 6.4281, longitude: 3.4219 },
  { location_label: 'Ikeja', city: 'Lagos', latitude: 6.6018, longitude: 3.3515 },
  { location_label: 'Lekki', city: 'Lagos', latitude: 6.4474, longitude: 3.4723 },
  { location_label: 'Surulere', city: 'Lagos', latitude: 6.4969, longitude: 3.3550 },
]

export function formatLocationDisplay(location) {
  if (!location) return 'Set location'
  if (location.display) return location.display

  const parts = [location.location_label, location.city, location.country_code].filter(Boolean)
  return parts.length ? parts.join(', ') : 'Set location'
}

export function readStoredLocation() {
  try {
    const raw = localStorage.getItem('rapid_location')
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (parsed?.latitude == null || parsed?.longitude == null) return null
    return parsed
  } catch {
    return null
  }
}

export function storeLocation(location) {
  localStorage.setItem('rapid_location', JSON.stringify(location))
}

export function requestDevicePosition() {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error('Geolocation is not supported on this device.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        })
      },
      (error) => reject(error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 60000 },
    )
  })
}
