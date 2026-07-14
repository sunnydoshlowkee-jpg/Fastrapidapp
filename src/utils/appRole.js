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

export function detectAppRole(pathname = window.location.pathname) {
  if (pathname.startsWith('/dispatch')) return APP_ROLES.rider
  if (pathname.startsWith('/merchant')) return APP_ROLES.merchant
  return APP_ROLES.user
}

export function getRoleConfig(role = detectAppRole()) {
  return ROLE_CONFIG[role] || ROLE_CONFIG.user
}
