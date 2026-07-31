import { Capacitor } from '@capacitor/core'

export const APP_ROLES = {
  user: 'user',
  rider: 'rider',
  merchant: 'merchant',
}

const ROLE_CONFIG = {
  user: {
    tokenKey: 'rapid_token',
    biometricServer: 'fastrapid.app.user',
    biometricEnabledKey: 'rapid_biometric_unlock_enabled_user',
    homePath: '/app',
    loginPath: '/auth/login',
    biometricUnlockPath: '/auth/biometric-unlock',
    splashPath: '/',
    privacyPath: '/app/profile/privacy-security',
    brandLabel: 'FastRapid',
  },
  rider: {
    tokenKey: 'rider_token',
    biometricServer: 'fastrapid.app.rider',
    biometricEnabledKey: 'rapid_biometric_unlock_enabled_rider',
    homePath: '/dispatch',
    loginPath: '/dispatch/login',
    biometricUnlockPath: '/dispatch/auth/biometric-unlock',
    splashPath: '/dispatch/splash',
    privacyPath: '/dispatch/profile/privacy-security',
    brandLabel: 'Rapid Rider',
  },
  merchant: {
    tokenKey: 'rapid_merchant_token',
    biometricServer: 'fastrapid.app.merchant',
    biometricEnabledKey: 'rapid_biometric_unlock_enabled_merchant',
    homePath: '/merchant',
    loginPath: '/merchant/login',
    biometricUnlockPath: '/merchant/auth/biometric-unlock',
    splashPath: '/merchant/splash',
    privacyPath: '/merchant/settings/privacy-security',
    brandLabel: 'Rapid Merchant',
  },
}

const PERSONA_TO_ROLE = {
  user: APP_ROLES.user,
  dispatch: APP_ROLES.rider,
  rider: APP_ROLES.rider,
  merchant: APP_ROLES.merchant,
}

export function getNativePersona() {
  return import.meta.env.VITE_APP_PERSONA || 'user'
}

export function getNativeAppRole() {
  return PERSONA_TO_ROLE[getNativePersona()] || APP_ROLES.user
}

/**
 * App route path that works with BrowserRouter and HashRouter (Capacitor).
 * Prefer this over raw `window.location.pathname` outside React Router.
 */
export function getAppPathname() {
  const hash = window.location.hash || ''
  if (hash.startsWith('#')) {
    const withoutHash = hash.slice(1)
    const path = (withoutHash.startsWith('/') ? withoutHash : `/${withoutHash}`).split('?')[0]
    return path || '/'
  }

  return window.location.pathname || '/'
}

/**
 * Navigate within the SPA (hash on native Capacitor, path on web).
 */
export function navigateAppPath(path) {
  if (!path || typeof path !== 'string') return
  const normalized = path.startsWith('/') ? path : `/${path}`

  if (Capacitor.isNativePlatform()) {
    if (window.location.hash !== `#${normalized}`) {
      window.location.hash = normalized
    }
    return
  }

  if (window.location.pathname !== normalized) {
    window.location.href = normalized
  }
}

export function detectAppRole(pathname = getAppPathname()) {
  // Dedicated Capacitor flavor builds pin the role via VITE_APP_PERSONA.
  if (import.meta.env.VITE_APP_PERSONA) {
    return getNativeAppRole()
  }

  if (pathname.startsWith('/dispatch')) return APP_ROLES.rider
  if (pathname.startsWith('/merchant')) return APP_ROLES.merchant
  return APP_ROLES.user
}

export function getRoleConfig(role = detectAppRole()) {
  return ROLE_CONFIG[role] || ROLE_CONFIG.user
}
