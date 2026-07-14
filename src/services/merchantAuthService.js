import api from './api'
import { setMerchantSignupEmail } from './merchantRegistrationService'
import { getApiFieldError } from '../utils/apiErrors'
import { clearPushTokenOnLogout, syncPushTokenAfterLogin } from './pushNotifications'

const MERCHANT_RESET_EMAIL_KEY = 'rapid_merchant_reset_email'

export const MERCHANT_TOKEN_KEY = 'rapid_merchant_token'
export const MERCHANT_USER_KEY = 'rapid_merchant_user'

export function getStoredMerchantSession() {
  const token = localStorage.getItem(MERCHANT_TOKEN_KEY)
  const userJson = localStorage.getItem(MERCHANT_USER_KEY)
  if (!token || !userJson) return null
  try {
    return { token, user: JSON.parse(userJson) }
  } catch {
    return null
  }
}

export function clearMerchantSession() {
  localStorage.removeItem(MERCHANT_TOKEN_KEY)
  localStorage.removeItem(MERCHANT_USER_KEY)
}

function storeMerchantSession({ token, user }) {
  localStorage.setItem(MERCHANT_TOKEN_KEY, token)
  localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(user))
}

export async function merchantLogin({ email, password, rememberMe = false }) {
  try {
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
      const email = payload.email || email.trim()
      setMerchantSignupEmail(email)

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
  return data?.data?.user
}

export async function merchantLogout() {
  await clearPushTokenOnLogout()
  try {
    await api.post('/merchant/logout')
  } catch {
    // Clear local session even if the API call fails.
  } finally {
    clearMerchantSession()
    window.dispatchEvent(new Event('rapid-auth-changed'))
  }
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
