import { isGoogleMapsConfigured, loadGoogleMaps } from './googleMaps'
import api from '../services/api'

/**
 * @typedef {{ latitude: number, longitude: number, location_label: string, city?: string, state?: string, country_code?: string, place_id?: string }} GeocodedLocation
 */

function component(components, type) {
  const match = (components || []).find((c) => c.types?.includes(type))
  return match?.long_name || match?.short_name || ''
}

function parseGeocodeResult(result) {
  if (!result) return null

  const components = result.address_components || []
  const city =
    component(components, 'locality') ||
    component(components, 'postal_town') ||
    component(components, 'sublocality') ||
    component(components, 'administrative_area_level_2')
  const state = component(components, 'administrative_area_level_1')
  const country = component(components, 'country')
  const neighborhood =
    component(components, 'neighborhood') ||
    component(components, 'sublocality_level_1') ||
    component(components, 'sublocality')

  const location_label =
    neighborhood ||
    result.formatted_address?.split(',')[0]?.trim() ||
    city ||
    'Current location'

  return {
    location_label,
    city: city || undefined,
    state: state || undefined,
    country_code: country ? country.slice(0, 2).toUpperCase() : 'NG',
    formatted_address: result.formatted_address || location_label,
    place_id: result.place_id,
  }
}

/**
 * Reverse-geocode coordinates via Google Maps Geocoder (client).
 * Falls back to API proxy if Maps JS is unavailable.
 */
export async function reverseGeocode(lat, lng) {
  const latitude = Number(lat)
  const longitude = Number(lng)
  if (!Number.isFinite(latitude) || !Number.isFinite(longitude)) {
    return null
  }

  if (isGoogleMapsConfigured()) {
    try {
      const google = await loadGoogleMaps()
      const geocoder = new google.maps.Geocoder()
      const response = await geocoder.geocode({
        location: { lat: latitude, lng: longitude },
      })
      const parsed = parseGeocodeResult(response?.results?.[0])
      if (parsed) {
        return {
          latitude,
          longitude,
          ...parsed,
          source: 'google_geocode',
        }
      }
    } catch {
      // Fall through to API proxy.
    }
  }

  try {
    const { data } = await api.get('/geo/reverse', {
      params: { lat: latitude, lng: longitude },
    })
    const payload = data?.data
    if (payload?.latitude != null) {
      return {
        latitude: Number(payload.latitude),
        longitude: Number(payload.longitude),
        location_label: payload.location_label || 'Current location',
        city: payload.city,
        state: payload.state,
        country_code: payload.country_code || 'NG',
        formatted_address: payload.formatted_address,
        place_id: payload.place_id,
        source: 'google_geocode',
      }
    }
  } catch {
    // ignore
  }

  return {
    latitude,
    longitude,
    location_label: 'Current location',
    city: 'Lagos',
    state: 'Lagos',
    country_code: 'NG',
    source: 'gps',
  }
}

/**
 * Forward-geocode a free-text query (Places/Geocoder).
 */
export async function geocodeQuery(query) {
  const q = String(query || '').trim()
  if (!q || !isGoogleMapsConfigured()) return []

  const google = await loadGoogleMaps()
  const geocoder = new google.maps.Geocoder()
  const response = await geocoder.geocode({
    address: q,
    componentRestrictions: { country: 'ng' },
  })

  return (response?.results || []).slice(0, 6).map((result) => {
    const parsed = parseGeocodeResult(result)
    const loc = result.geometry?.location
    return {
      latitude: loc?.lat?.() ?? loc?.lat,
      longitude: loc?.lng?.() ?? loc?.lng,
      ...parsed,
      source: 'google_geocode',
    }
  })
}
