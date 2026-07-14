import { Capacitor } from '@capacitor/core'
import { Preferences } from '@capacitor/preferences'
import { detectAppRole, getRoleConfig } from './appRole'

export const BIOMETRIC_SERVER = 'fastrapid.app'

export function hasAuthToken(role = detectAppRole()) {
  const { tokenKey } = getRoleConfig(role)
  return Boolean(localStorage.getItem(tokenKey))
}

export async function isBiometricUnlockEnabled(role = detectAppRole()) {
  const { biometricEnabledKey } = getRoleConfig(role)

  if (Capacitor.isNativePlatform()) {
    const { value } = await Preferences.get({ key: biometricEnabledKey })
    if (value === 'true') return true
  } else if (localStorage.getItem(biometricEnabledKey) === 'true') {
    return true
  }

  // Legacy user key from earlier builds.
  if (role === 'user') {
    if (Capacitor.isNativePlatform()) {
      const { value } = await Preferences.get({ key: 'rapid_biometric_unlock_enabled' })
      return value === 'true'
    }
    return localStorage.getItem('rapid_biometric_unlock_enabled') === 'true'
  }

  return false
}

export async function setBiometricUnlockEnabled(enabled, role = detectAppRole()) {
  const { biometricEnabledKey } = getRoleConfig(role)
  const value = enabled ? 'true' : 'false'

  if (Capacitor.isNativePlatform()) {
    await Preferences.set({ key: biometricEnabledKey, value })
  }

  localStorage.setItem(biometricEnabledKey, value)
}
