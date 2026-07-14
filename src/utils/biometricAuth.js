import { Capacitor } from '@capacitor/core'
import { NativeBiometric } from '@capgo/capacitor-native-biometric'
import { detectAppRole, getRoleConfig } from './appRole'

function randomChallenge() {
  const bytes = new Uint8Array(32)
  window.crypto.getRandomValues(bytes)
  return Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('')
}

function isNativePlatform() {
  return Capacitor.isNativePlatform()
}

export function isBiometricAvailable() {
  if (isNativePlatform()) return true

  return typeof window !== 'undefined'
    && typeof window.PublicKeyCredential !== 'undefined'
    && typeof window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable === 'function'
}

export async function canUseBiometric() {
  if (isNativePlatform()) {
    try {
      const result = await NativeBiometric.isAvailable({ useFallback: true })
      return Boolean(result?.isAvailable)
    } catch {
      return false
    }
  }

  if (!isBiometricAvailable()) return false

  try {
    return await window.PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable()
  } catch {
    return false
  }
}

async function verifyNativeBiometric(reason = 'Confirm your identity', brandLabel = 'FastRapid') {
  await NativeBiometric.verifyIdentity({
    reason,
    title: brandLabel,
    subtitle: reason,
    description: 'Use your fingerprint or face to continue',
    useFallback: true,
    maxAttempts: 5,
  })
}

async function verifyWebBiometric() {
  if (!await canUseBiometric()) {
    throw new Error('Biometric unlock is not available on this device.')
  }

  const assertion = await navigator.credentials.get({
    publicKey: {
      challenge: Uint8Array.from(randomChallenge(), (c) => c.charCodeAt(0)),
      userVerification: 'required',
      timeout: 60_000,
    },
  })

  if (!assertion) {
    throw new Error('Biometric verification was cancelled.')
  }

  return assertion.id
}

export async function verifyBiometricCredential(reason = 'Confirm your identity', role = detectAppRole()) {
  const { brandLabel } = getRoleConfig(role)

  if (isNativePlatform()) {
    await verifyNativeBiometric(reason, brandLabel)
    return 'native'
  }

  return verifyWebBiometric()
}

export async function registerBiometricCredential(userLabel = 'FastRapid user', role = detectAppRole()) {
  const { brandLabel } = getRoleConfig(role)

  if (isNativePlatform()) {
    await verifyNativeBiometric(`Enable biometric unlock for ${brandLabel}`, brandLabel)
    return 'native'
  }

  if (!await canUseBiometric()) {
    throw new Error('Biometric unlock is not available on this device.')
  }

  const credential = await navigator.credentials.create({
    publicKey: {
      challenge: Uint8Array.from(randomChallenge(), (c) => c.charCodeAt(0)),
      rp: { name: brandLabel },
      user: {
        id: Uint8Array.from(randomChallenge(), (c) => c.charCodeAt(0)),
        name: userLabel,
        displayName: userLabel,
      },
      pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
      authenticatorSelection: {
        authenticatorAttachment: 'platform',
        userVerification: 'required',
        residentKey: 'preferred',
      },
      timeout: 60_000,
    },
  })

  return credential?.id || null
}

export async function enableDeviceBiometricUnlock(user, role = detectAppRole()) {
  if (!isNativePlatform()) return

  const { tokenKey, biometricServer, brandLabel } = getRoleConfig(role)
  const token = localStorage.getItem(tokenKey)
  if (!token) {
    throw new Error('Sign in before enabling biometric unlock.')
  }

  await verifyNativeBiometric(`Enable biometric unlock for ${brandLabel}`, brandLabel)

  const username = user?.email || user?.phone || `${role}_${user?.id || 'fastrapid'}`

  try {
    await NativeBiometric.deleteCredentials({ server: biometricServer })
  } catch {
    // Ignore stale secure credentials from older builds.
  }

  await NativeBiometric.setCredentials({
    username,
    password: token,
    server: biometricServer,
  })
}

export async function disableDeviceBiometricUnlock(role = detectAppRole()) {
  if (!isNativePlatform()) return

  const { biometricServer } = getRoleConfig(role)

  try {
    await NativeBiometric.deleteCredentials({ server: biometricServer })
  } catch {
    // Ignore if credentials were never stored.
  }
}

export async function unlockWithBiometric(reason = 'Unlock FastRapid', role = detectAppRole()) {
  const { tokenKey, biometricServer, brandLabel } = getRoleConfig(role)

  if (isNativePlatform()) {
    await verifyNativeBiometric(reason, brandLabel)

    if (!localStorage.getItem(tokenKey)) {
      try {
        const credentials = await NativeBiometric.getCredentials({ server: biometricServer })
        if (credentials?.password) {
          localStorage.setItem(tokenKey, credentials.password)
          if (role === 'rider') {
            localStorage.setItem('rapid_token', credentials.password)
          }
          window.dispatchEvent(new Event('rapid-auth-changed'))
        }
      } catch {
        throw new Error('Session expired. Please sign in again.')
      }
    }

    return true
  }

  await verifyWebBiometric()
  return true
}
