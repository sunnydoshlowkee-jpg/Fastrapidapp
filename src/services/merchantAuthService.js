import api from './api'
import { setMerchantSignupEmail } from './merchantRegistrationService'
import { getApiFieldError } from '../utils/apiErrors'
import { clearPushTokenOnLogout, syncPushTokenAfterLogin } from './pushNotifications'
import {
  MERCHANT_ACCOUNTS_KEY,
  MERCHANT_TOKEN_KEY,
  MERCHANT_USER_KEY,
  activateNextMerchantAccount,
  clearActiveMerchantSessionKeys,
  clearAllMerchantAccounts,
  clearMerchantSession,
  ensureMerchantAccountsHydrated,
  getMerchantAccountLabel,
  getStoredMerchantSession,
  listMerchantAccounts,
  merchantAccountRedirectPath,
  removeMerchantAccount,
  storeMerchantSession,
  switchMerchantAccount as activateStoredMerchantAccount,
} from './merchantAccountStore'

export {
  MERCHANT_ACCOUNTS_KEY,
  MERCHANT_TOKEN_KEY,
  MERCHANT_USER_KEY,
  clearMerchantSession,
  getMerchantAccountLabel,
  getStoredMerchantSession,
  listMerchantAccounts,
  merchantAccountRedirectPath,
  storeMerchantSession,
}

const MERCHANT_RESET_EMAIL_KEY = 'rapid_merchant_reset_email'

export async function merchantLogin({ email, password, rememberMe = false, addAccount = false }) {
  try {
    // Preserve other accounts when adding; normal login still keeps the list
    // and upserts the new/active account (re-login of the same email updates it).
    if (!addAccount) {
      ensureMerchantAccountsHydrated()
    }

    const { data } = await api.post('/merchant/login', {
      email: email.trim(),
      password,
    })

    const session = {
      token: data?.data?.token,
      user: data?.data?.user,
      onboarding: data?.data?.onboarding ?? data?.data?.user?.onboarding ?? null,
      redirectPath: data?.data?.redirect_path ?? data?.data?.onboarding?.redirect_path ?? '/merchant',
      rememberMe,
      addAccount,
    }

    if (!session.token || !session.user) {
      throw new Error('Invalid login response from server.')
    }

    storeMerchantSession(session)
    window.dispatchEvent(new Event('rapid-auth-changed'))
    syncPushTokenAfterLogin()

    return session
  } catch (err) {
    const payload = err.response?.data?.data

    if (payload?.requires_email_verification) {
      const verifiedEmail = payload.email || email.trim()
      setMerchantSignupEmail(verifiedEmail)

      const verificationError = new Error(
        payload.message || 'Please verify your email to continue.',
      )
      verificationError.code = 'EMAIL_VERIFICATION_REQUIRED'
      verificationError.redirectPath = payload.redirect_path
      verificationError.debugOtp = payload.debug_otp
      throw verificationError
    }

    const apiErrors = err.response?.data?.errors
    if (apiErrors?.email?.[0]) {
      const error = new Error(apiErrors.email[0])
      error.code = 'INVALID_CREDENTIALS'
      throw error
    }

    const message = getApiFieldError(err, 'email')
    const error = new Error(message)
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }
}

export async function merchantGetMe() {
  const { data } = await api.get('/merchant/me')
  const user = data?.data?.user
  if (user) {
    const token = localStorage.getItem(MERCHANT_TOKEN_KEY)
    if (token) {
      storeMerchantSession({ token, user })
    }
  }
  return user
}

/**
 * Sign out the active merchant.
 * When other accounts remain and `switchToRemaining` is true, activates the next one.
 * @returns {{ switchedTo: { token: string, user: object } | null }}
 */
export async function merchantLogout({ switchToRemaining = true } = {}) {
  await clearPushTokenOnLogout()

  const session = getStoredMerchantSession()

  try {
    await api.post('/merchant/logout')
  } catch {
    // Clear local session even if the API call fails.
  }

  if (session?.user?.id != null) {
    removeMerchantAccount(session.user.id)
  }

  clearActiveMerchantSessionKeys()

  let switchedTo = null
  if (switchToRemaining) {
    switchedTo = activateNextMerchantAccount()
    if (switchedTo) {
      window.dispatchEvent(new Event('rapid-auth-changed'))
      syncPushTokenAfterLogin()
    }
  }

  if (!switchedTo) {
    window.dispatchEvent(new Event('rapid-auth-changed'))
  }

  return { switchedTo }
}

/** Sign out every stored merchant account (revokes the active token only). */
export async function merchantLogoutAll() {
  await clearPushTokenOnLogout()
  try {
    await api.post('/merchant/logout')
  } catch {
    // ignore
  } finally {
    clearAllMerchantAccounts()
    window.dispatchEvent(new Event('rapid-auth-changed'))
  }
  return { switchedTo: null }
}

/**
 * Switch to another signed-in merchant without logging them out.
 * Reloads the app so dashboard state remounts cleanly.
 */
export function switchMerchantAccount(userId, { reload = true } = {}) {
  const active = getStoredMerchantSession()
  if (active?.user?.id != null && String(active.user.id) === String(userId)) {
    return active
  }

  const next = activateStoredMerchantAccount(userId)
  if (!next) {
    throw new Error('That merchant account is not signed in on this device.')
  }

  window.dispatchEvent(new Event('rapid-auth-changed'))
  syncPushTokenAfterLogin()

  if (reload) {
    const path = merchantAccountRedirectPath(next.user)
    window.location.assign(path)
  }

  return next
}

function storeResetEmail(email) {
  sessionStorage.setItem(MERCHANT_RESET_EMAIL_KEY, email)
}

export async function merchantRequestPasswordReset(email) {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    const error = new Error('Enter a valid email address.')
    error.code = 'INVALID_EMAIL'
    throw error
  }

  try {
    const { data } = await api.post('/merchant/forgot-password', {
      email: normalizedEmail,
    })

    storeResetEmail(normalizedEmail)

    return {
      message: data?.message || data?.data?.message || `We've sent a 6-digit code to ${normalizedEmail}.`,
      email: data?.data?.email || normalizedEmail,
      debugOtp: data?.data?.debug_otp,
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'email') || getApiFieldError(err, 'form'))
  }
}

export function getMerchantResetEmail() {
  return sessionStorage.getItem(MERCHANT_RESET_EMAIL_KEY) || ''
}

export function clearMerchantResetEmail() {
  sessionStorage.removeItem(MERCHANT_RESET_EMAIL_KEY)
}

export async function merchantResendResetCode(email) {
  const normalizedEmail = (email || getMerchantResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Email is required to resend the code.')
  }

  try {
    const { data } = await api.post('/merchant/forgot-password/resend', {
      email: normalizedEmail,
    })

    storeResetEmail(normalizedEmail)

    return {
      message: data?.message || data?.data?.message || 'A new verification code has been sent.',
      email: data?.data?.email || normalizedEmail,
      debugOtp: data?.data?.debug_otp,
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'email') || getApiFieldError(err, 'form'))
  }
}

export async function merchantResetPassword({ email, code, newPassword, confirmPassword }) {
  const normalizedEmail = (email || getMerchantResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }

  try {
    const { data } = await api.post('/merchant/forgot-password/reset', {
      email: normalizedEmail,
      code,
      password: newPassword,
      password_confirmation: confirmPassword,
    })

    clearMerchantResetEmail()

    return {
      message: data?.message || 'Your password has been reset. You can sign in now.',
      email: data?.data?.email || normalizedEmail,
    }
  } catch (err) {
    const message =
      getApiFieldError(err, 'code') ||
      getApiFieldError(err, 'password') ||
      getApiFieldError(err, 'form')
    const error = new Error(message)
    if (getApiFieldError(err, 'code')) {
      error.code = 'INVALID_OTP'
    }
    throw error
  }
}
