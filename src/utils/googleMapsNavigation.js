import { hasValidCoords } from './deliveryRoute'

export function buildGoogleMapsDirectionsUrl(origin, destination) {
  if (!destination) return null

  const params = new URLSearchParams({
    api: '1',
    travelmode: 'driving',
  })

  if (typeof destination === 'string') {
    params.set('destination', destination)
  } else if (hasValidCoords(destination.lat, destination.lng)) {
    params.set('destination', `${destination.lat},${destination.lng}`)
  } else {
    return null
  }

  if (typeof origin === 'string') {
    params.set('origin', origin)
  } else if (origin && hasValidCoords(origin.lat, origin.lng)) {
    params.set('origin', `${origin.lat},${origin.lng}`)
  }

  return `https://www.google.com/maps/dir/?${params.toString()}`
}

export function openGoogleMapsDirections(origin, destination) {
  const url = buildGoogleMapsDirectionsUrl(origin, destination)
  if (!url) return false

  window.open(url, '_blank', 'noopener,noreferrer')
  return true
}
