import { setOptions, importLibrary } from '@googlemaps/js-api-loader'

let loadPromise = null
let optionsConfigured = false

export function getGoogleMapsApiKey() {
  return String(import.meta.env.VITE_GOOGLE_MAPS_KEY || '').trim()
}

export function isGoogleMapsConfigured() {
  return Boolean(getGoogleMapsApiKey())
}

/**
 * Load Google Maps JS (Maps + Places + geometry).
 * Singleton — safe to call from many components.
 * Resolves to the global `google` namespace.
 */
export function loadGoogleMaps() {
  const key = getGoogleMapsApiKey()
  if (!key) {
    return Promise.reject(
      new Error('Google Maps is not configured. Add VITE_GOOGLE_MAPS_KEY to your .env file.'),
    )
  }

  if (typeof window !== 'undefined' && window.google?.maps?.Map) {
    return Promise.resolve(window.google)
  }

  if (loadPromise) return loadPromise

  if (!optionsConfigured) {
    setOptions({ key, v: 'weekly' })
    optionsConfigured = true
  }

  loadPromise = Promise.all([
    importLibrary('maps'),
    importLibrary('places'),
    importLibrary('geometry'),
  ])
    .then(() => {
      if (!window.google?.maps) {
        throw new Error('Google Maps failed to initialize.')
      }
      return window.google
    })
    .catch((err) => {
      loadPromise = null
      throw err
    })

  return loadPromise
}
