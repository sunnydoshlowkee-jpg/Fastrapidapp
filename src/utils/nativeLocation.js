import { Capacitor } from '@capacitor/core'
import { Geolocation } from '@capacitor/geolocation'
import { getCurrentPosition as getBrowserPosition } from './geolocation'

const NATIVE_POSITION_ATTEMPTS = [
  {
    enableHighAccuracy: false,
    timeout: 15000,
    maximumAge: 300000,
    enableLocationFallback: true,
  },
  {
    enableHighAccuracy: true,
    timeout: 20000,
    maximumAge: 120000,
    enableLocationFallback: true,
  },
  {
    enableHighAccuracy: false,
    timeout: 30000,
    maximumAge: 0,
    enableLocationFallback: true,
  },
]

function isPermissionGranted(status) {
  return status?.location === 'granted' || status?.coarseLocation === 'granted'
}

function isLocationServicesDisabledMessage(message = '') {
  return /not enabled|services are disabled|turned off|location disabled/i.test(message)
}

function isPermissionDeniedError(error) {
  const message = String(error?.message || '')
  const code = String(error?.code || '')

  return (
    code === '1'
    || /OS-PLUG-GLOC-0003/.test(code)
    || /permission.*denied|denied.*permission/i.test(message)
  )
}

function isTimeoutError(error) {
  const message = String(error?.message || '')
  const code = String(error?.code || '')

  return (
    code === '3'
    || /OS-PLUG-GLOC-0010/.test(code)
    || /timeout|in time/i.test(message)
  )
}

function mapLocationError(error, appLabel = 'FastRapid') {
  const message = String(error?.message || '')
  const code = error?.code

  if (isPermissionDeniedError(error)) {
    return `Location permission was denied. Allow location access for ${appLabel} in App Settings.`
  }

  if (isLocationServicesDisabledMessage(message) || /OS-PLUG-GLOC-0007|OS-PLUG-GLOC-0017/.test(String(code))) {
    return 'Location is turned off. Enable GPS/Location in your device settings, then try again.'
  }

  if (/OS-PLUG-GLOC-0016|settings error/i.test(String(code)) || /settings error/i.test(message)) {
    return 'Location settings need attention. Open Settings → Location, choose High accuracy, then try again.'
  }

  if (isTimeoutError(error)) {
    return 'Could not get your location yet. Keep Location on, move near a window, and tap Enable location again.'
  }

  return message || 'Could not verify your location. Turn on Location and try again.'
}

/**
 * @returns {Promise<{ granted: boolean, location: 'prompt' | 'granted' | 'denied' | 'unavailable', message?: string }>}
 */
export async function checkNativeLocationPermission() {
  if (!Capacitor.isNativePlatform()) {
    return { granted: true, location: 'granted' }
  }

  try {
    const status = await Geolocation.checkPermissions()
    const granted = isPermissionGranted(status)

    return {
      granted,
      location: granted ? 'granted' : (status?.location || status?.coarseLocation || 'prompt'),
    }
  } catch (error) {
    const message = String(error?.message || '')

    if (isLocationServicesDisabledMessage(message)) {
      return {
        granted: false,
        location: 'unavailable',
        message: 'Location is turned off on this device. Turn on Location (GPS) in Settings, then try again.',
      }
    }

    // Some devices report a false negative here even when location works.
    return {
      granted: false,
      location: 'prompt',
      message,
    }
  }
}

/**
 * Request location permission (native only).
 */
export async function requestNativeLocationPermission() {
  if (!Capacitor.isNativePlatform()) {
    return { granted: true, location: 'granted' }
  }

  try {
    const status = await Geolocation.requestPermissions({
      permissions: ['location', 'coarseLocation'],
    })
    const granted = isPermissionGranted(status)

    return {
      granted,
      location: granted ? 'granted' : (status?.location || status?.coarseLocation || 'denied'),
    }
  } catch (error) {
    const message = String(error?.message || '')

    if (isLocationServicesDisabledMessage(message)) {
      return {
        granted: false,
        location: 'unavailable',
        message: 'Turn on Location in your device settings to continue.',
      }
    }

    return {
      granted: false,
      location: 'denied',
      message: message || 'Turn on Location in your device settings to continue.',
    }
  }
}

async function readNativePosition(options = {}) {
  const position = await Geolocation.getCurrentPosition(options)

  return {
    lat: position.coords.latitude,
    lng: position.coords.longitude,
    accuracy: position.coords.accuracy,
    heading: position.coords.heading,
    speed: position.coords.speed,
    updatedAt: position.timestamp || Date.now(),
  }
}

/**
 * Get a fresh GPS fix. Uses Capacitor on native, browser geolocation on web.
 */
export async function getDevicePosition(options = {}) {
  if (!Capacitor.isNativePlatform()) {
    return getBrowserPosition()
  }

  const attempts = NATIVE_POSITION_ATTEMPTS.map((attempt) => ({
    ...attempt,
    ...options,
  }))

  let lastError = null

  for (const attempt of attempts) {
    try {
      return await readNativePosition(attempt)
    } catch (error) {
      lastError = error
      if (isPermissionDeniedError(error)) {
        throw error
      }
    }
  }

  throw lastError || new Error('Could not obtain location.')
}

/**
 * Continuous GPS watch. Prefer Capacitor on native APKs.
 * @returns {Promise<() => void>} stop function
 */
export async function watchDevicePosition(onUpdate, onError, options = {}) {
  if (Capacitor.isNativePlatform()) {
    try {
      const id = await Geolocation.watchPosition(
        {
          enableHighAccuracy: false,
          timeout: 20000,
          maximumAge: 60000,
          enableLocationFallback: true,
          ...options,
        },
        (position, err) => {
          if (err) {
            onError?.(err)
            return
          }
          if (!position?.coords) return
          onUpdate({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy,
            heading: position.coords.heading,
            speed: position.coords.speed,
            updatedAt: position.timestamp || Date.now(),
          })
        },
      )

      return () => {
        Geolocation.clearWatch({ id }).catch(() => {})
      }
    } catch (error) {
      onError?.(error)
      return () => {}
    }
  }

  const { watchPosition } = await import('./geolocation')
  return watchPosition(onUpdate, onError, options)
}

/**
 * Strict readiness check for native apps:
 * permission must be granted AND a live position must be obtainable (GPS on).
 *
 * @returns {Promise<{ ok: boolean, reason?: string, position?: object }>}
 */
export async function ensureStrictLocationReady({
  requestIfNeeded = true,
  appLabel = 'FastRapid',
} = {}) {
  if (!Capacitor.isNativePlatform()) {
    return { ok: true }
  }

  let permission = await checkNativeLocationPermission()

  if (!permission.granted && requestIfNeeded && permission.location !== 'unavailable') {
    permission = await requestNativeLocationPermission()
  }

  if (permission.location === 'unavailable') {
    return {
      ok: false,
      reason:
        permission.message ||
        'Location is turned off on this device. Turn on Location (GPS) in Settings, then try again.',
    }
  }

  if (!permission.granted) {
    return {
      ok: false,
      reason: `Location permission is required. Allow location access for ${appLabel} to continue.`,
    }
  }

  try {
    const position = await getDevicePosition()
    return { ok: true, position }
  } catch (error) {
    return {
      ok: false,
      reason: mapLocationError(error, appLabel),
    }
  }
}

export function isNativeMerchantApp() {
  return Capacitor.isNativePlatform()
}

export function isNativeApp() {
  return Capacitor.isNativePlatform()
}
