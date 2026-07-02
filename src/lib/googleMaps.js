import { Loader } from '@googlemaps/js-api-loader'

let loadPromise = null

export function getGoogleMapsApiKey() {
  return import.meta.env.VITE_GOOGLE_MAPS_KEY || ''
}

export function isGoogleMapsConfigured() {
  return Boolean(getGoogleMapsApiKey())
}

export function loadGoogleMaps() {
  const key = getGoogleMapsApiKey()
  if (!key) {
    return Promise.reject(
      new Error('Google Maps is not configured. Add VITE_GOOGLE_MAPS_KEY to your .env file.'),
    )
  }

  if (loadPromise) return loadPromise

  const loader = new Loader({
    apiKey: key,
    version: 'weekly',
  })

  loadPromise = loader.load()
  return loadPromise
}
