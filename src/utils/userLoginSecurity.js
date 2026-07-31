/**
 * Post-login / splash security routing helpers for the user app.
 */

import { Capacitor } from '@capacitor/core'

export const LOGIN_SECURITY_SESSION_KEY = 'rapid_login_security_ok'

export function isNativeApp() {
  return Capacitor.isNativePlatform()
}

export function markLoginSecurityVerified() {
  sessionStorage.setItem(LOGIN_SECURITY_SESSION_KEY, '1')
}

export function clearLoginSecurityVerified() {
  sessionStorage.removeItem(LOGIN_SECURITY_SESSION_KEY)
}

export function isLoginSecurityVerified() {
  return sessionStorage.getItem(LOGIN_SECURITY_SESSION_KEY) === '1'
}

/**
 * @param {object|null|undefined} user
 * @returns {{ method: 'email'|'totp'|'biometric', requiresChallenge: boolean, biometricEnabled: boolean, totpEnabled: boolean, requireBiometricUnlock: boolean }}
 */
export function resolveUserLoginSecurity(user) {
  const security = user?.security || {}
  const method = security.login_method || 'email'
  const biometricEnabled = Boolean(security.biometric_enabled)
  const totpEnabled = Boolean(security.totp_enabled)

  return {
    method,
    requiresChallenge: needsPostLoginSecurityChallenge(user),
    requireBiometricUnlock: biometricEnabled && isNativeApp(),
    biometricEnabled,
    totpEnabled,
  }
}

/**
 * Login challenge for the current platform.
 * Biometric preference applies on the native app only; browsers fall back to email.
 *
 * @param {object|null|undefined} user
 * @returns {'email'|'totp'|'biometric'}
 */
export function resolveEffectiveLoginMethod(user) {
  const security = user?.security || {}
  const method = security.login_method || 'email'
  const biometricEnabled = Boolean(security.biometric_enabled)
  const totpEnabled = Boolean(security.totp_enabled)

  if (method === 'totp' && totpEnabled) {
    return 'totp'
  }

  if (biometricEnabled || method === 'biometric') {
    return isNativeApp() ? 'biometric' : 'email'
  }

  return method
}

/**
 * Whether the user must complete a second step after OTP login (or before /app).
 */
export function needsPostLoginSecurityChallenge(user) {
  if (!user) return false

  const security = user?.security || {}
  const biometricEnabled = Boolean(security.biometric_enabled)
  const totpEnabled = Boolean(security.totp_enabled)
  const method = security.login_method || 'email'
  const effective = resolveEffectiveLoginMethod(user)

  if (effective === 'totp' && totpEnabled) return true
  if (!isNativeApp() && biometricEnabled && effective === 'email') return true
  if (!isNativeApp() && method === 'biometric' && biometricEnabled) return true

  return false
}

/**
 * Decide where to send the user after OTP login succeeds.
 * @returns {'app'|'totp'|'biometric'|'email'|'profile'}
 */
export function nextPathAfterUserLogin(user) {
  if (user?.status === 'pending_profile') {
    return 'profile'
  }

  const effective = resolveEffectiveLoginMethod(user)
  const security = resolveUserLoginSecurity(user)

  if (effective === 'totp') {
    return 'totp'
  }

  if (effective === 'biometric') {
    return 'biometric'
  }

  if (effective === 'email' && !isNativeApp() && security.biometricEnabled) {
    return 'email'
  }

  return 'app'
}

export function navigateAfterUserLogin(navigate, user, { signupMethod, phoneE164, phone } = {}) {
  const next = nextPathAfterUserLogin(user)

  if (next === 'profile') {
    navigate('/onboarding/profile', {
      state: { signupMethod, phoneE164, phone },
      replace: true,
    })
    return
  }

  if (next === 'totp') {
    clearLoginSecurityVerified()
    navigate('/auth/login-security', {
      state: { method: 'totp' },
      replace: true,
    })
    return
  }

  if (next === 'email') {
    clearLoginSecurityVerified()
    navigate('/auth/login-security', {
      state: { method: 'email' },
      replace: true,
    })
    return
  }

  if (next === 'biometric') {
    clearLoginSecurityVerified()
    navigate('/auth/biometric-unlock', {
      state: { setupDevice: true, fromLogin: true },
      replace: true,
    })
    return
  }

  markLoginSecurityVerified()
  navigate('/app', { replace: true })
}
