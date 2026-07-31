import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export const SECURITY_METHODS = {
  email: {
    id: 'email',
    label: 'Email verification',
    description: 'Receive a one-time code in your inbox.',
  },
  totp: {
    id: 'totp',
    label: 'Authenticator app',
    description: 'Use Google Authenticator, Authy, or a similar app.',
  },
  biometric: {
    id: 'biometric',
    label: 'Biometric unlock',
    description: 'Use Face ID or fingerprint in the mobile app. Browsers use an email code instead.',
  },
  pin: {
    id: 'pin',
    label: 'Wallet PIN',
    description: 'Confirm with your 4-digit wallet PIN.',
  },
}

export const DEFAULT_AVAILABLE_METHODS = {
  login: ['email', 'totp', 'biometric'],
  transaction: ['email', 'totp', 'biometric', 'pin'],
  order: ['email', 'totp', 'biometric'],
}

export function normalizeSecuritySettings(data) {
  if (!data || typeof data !== 'object') {
    return null
  }

  const available = data.available_methods ?? {}

  return {
    login_method: data.login_method || 'email',
    transaction_method: data.transaction_method || 'pin',
    order_method: data.order_method || 'email',
    totp_enabled: Boolean(data.totp_enabled),
    biometric_enabled: Boolean(data.biometric_enabled),
    available_methods: {
      login: available.login ?? DEFAULT_AVAILABLE_METHODS.login,
      transaction: available.transaction ?? DEFAULT_AVAILABLE_METHODS.transaction,
      order: available.order ?? DEFAULT_AVAILABLE_METHODS.order,
    },
  }
}

export async function getSecuritySettings() {
  const { data } = await api.get('/user/security')
  return normalizeSecuritySettings(data?.data)
}

export async function updateSecurityPreferences(preferences) {
  const { data } = await api.put('/user/security/preferences', preferences)
  return normalizeSecuritySettings(data?.data)
}

export async function setupTotp() {
  const { data } = await api.post('/user/security/totp/setup')
  return data?.data
}

export async function confirmTotp(code) {
  const { data } = await api.post('/user/security/totp/confirm', { code })
  return normalizeSecuritySettings(data?.data)
}

export async function disableTotp(code) {
  const { data } = await api.post('/user/security/totp/disable', { code })
  return normalizeSecuritySettings(data?.data)
}

export async function enableBiometric(credentialId = null) {
  const { data } = await api.post('/user/security/biometric/enable', {
    credential_id: credentialId,
  })
  return normalizeSecuritySettings(data?.data)
}

export async function disableBiometric() {
  const { data } = await api.post('/user/security/biometric/disable')
  return normalizeSecuritySettings(data?.data)
}

export async function sendSecurityActionCode(purpose) {
  const { data } = await api.post('/user/security/action-code', { purpose })
  return data
}

export async function verifyLoginSecurity({ method, auth_code, biometric_verified = false }) {
  try {
    const { data } = await api.post('/user/security/verify', {
      purpose: 'login',
      method,
      auth_code,
      biometric_verified: Boolean(biometric_verified),
    })
    return data
  } catch (err) {
    const message =
      err.response?.data?.message ||
      getApiFieldError(err, 'auth_code') ||
      getApiFieldError(err, 'code') ||
      'Verification failed.'
    throw new Error(message)
  }
}
