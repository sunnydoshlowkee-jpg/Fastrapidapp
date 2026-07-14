const DEFAULT_OPTIONS = {
  enableHighAccuracy: true,
  timeout: 15000,
  maximumAge: 5000,
}

export function getCurrentPosition() {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Location is not available on this device.'))
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy,
          heading: position.coords.heading,
          speed: position.coords.speed,
          updatedAt: Date.now(),
        })
      },
      (error) => reject(error),
      DEFAULT_OPTIONS,
    )
  })
}

export function watchPosition(onUpdate, onError, options = {}) {
  if (!('geolocation' in navigator)) {
    onError?.(new Error('Location is not available on this device.'))
    return () => {}
  }

  const watchId = navigator.geolocation.watchPosition(
    (position) => {
      onUpdate({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
        heading: position.coords.heading,
        speed: position.coords.speed,
        updatedAt: Date.now(),
      })
    },
    (error) => onError?.(error),
    { ...DEFAULT_OPTIONS, ...options },
  )

  return () => navigator.geolocation.clearWatch(watchId)
}

export function distanceMeters(a, b) {
  if (!a || !b) return Infinity

  const toRad = (value) => (value * Math.PI) / 180
  const earthRadius = 6371000
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const lat1 = toRad(a.lat)
  const lat2 = toRad(b.lat)

  const sinLat = Math.sin(dLat / 2)
  const sinLng = Math.sin(dLng / 2)
  const h = sinLat * sinLat + Math.cos(lat1) * Math.cos(lat2) * sinLng * sinLng

  return 2 * earthRadius * Math.asin(Math.min(1, Math.sqrt(h)))
}
