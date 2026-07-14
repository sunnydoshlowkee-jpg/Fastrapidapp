import api from './api'
import { getNativePersona } from '../utils/appRole'

export function registerDeviceToken(token, { platform = 'android', appPersona, deviceId } = {}) {
  const persona = appPersona || getNativePersona()
  const path = deviceTokenPath(persona)

  return api.post(path, {
    token,
    platform,
    app_persona: persona === 'rider' ? 'dispatch' : persona,
    device_id: deviceId || null,
  })
}

export function unregisterDeviceToken(token, { appPersona } = {}) {
  const persona = appPersona || getNativePersona()
  const path = deviceTokenPath(persona)

  return api.delete(path, { data: { token } })
}

function deviceTokenPath(persona) {
  if (persona === 'merchant') return '/merchant/device-token'
  if (persona === 'dispatch' || persona === 'rider') return '/rider/device-token'
  return '/user/device-token'
}
