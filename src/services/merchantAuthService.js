import {
  MERCHANT_DUMMY_CREDENTIALS,
  MERCHANT_DUMMY_USER,
  MERCHANT_RESET_OTP,
} from './data/merchantAuth.mock'

const MERCHANT_RESET_EMAIL_KEY = 'rapid_merchant_reset_email'

const MERCHANT_TOKEN_KEY = 'rapid_merchant_token'
const MERCHANT_USER_KEY = 'rapid_merchant_user'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

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

export async function merchantLogin({ email, password, rememberMe = false }) {
  await delay()

  const normalizedEmail = email.trim().toLowerCase()
  const isValid =
    normalizedEmail === MERCHANT_DUMMY_CREDENTIALS.email &&
    password === MERCHANT_DUMMY_CREDENTIALS.password

  if (!isValid) {
    const error = new Error('Invalid email or password.')
    error.code = 'INVALID_CREDENTIALS'
    throw error
  }

  const session = {
    token: MERCHANT_DUMMY_USER.token,
    user: MERCHANT_DUMMY_USER,
    rememberMe,
  }

  if (rememberMe) {
    localStorage.setItem(MERCHANT_TOKEN_KEY, session.token)
    localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(session.user))
  }

  return session
}

export async function merchantRequestPasswordReset(email) {
  await delay(800)

  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    const error = new Error('Enter a valid email address.')
    error.code = 'INVALID_EMAIL'
    throw error
  }

  sessionStorage.setItem(MERCHANT_RESET_EMAIL_KEY, normalizedEmail)

  return {
    message: `We've sent a 6-digit code to ${normalizedEmail}.`,
    email: normalizedEmail,
  }
}

export function getMerchantResetEmail() {
  return sessionStorage.getItem(MERCHANT_RESET_EMAIL_KEY) || ''
}

export function clearMerchantResetEmail() {
  sessionStorage.removeItem(MERCHANT_RESET_EMAIL_KEY)
}

export async function merchantResendResetCode(email) {
  await delay(600)
  const normalizedEmail = (email || getMerchantResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Email is required to resend the code.')
  }
  sessionStorage.setItem(MERCHANT_RESET_EMAIL_KEY, normalizedEmail)
  return { message: 'A new verification code has been sent.', email: normalizedEmail }
}

export async function merchantResetPassword({ email, code, newPassword, confirmPassword }) {
  await delay(800)

  const normalizedEmail = (email || getMerchantResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }
  if (code !== MERCHANT_RESET_OTP) {
    const error = new Error('Invalid verification code. Try again.')
    error.code = 'INVALID_OTP'
    throw error
  }
  if (!newPassword || newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match.')
  }

  clearMerchantResetEmail()
  return { message: 'Your password has been reset. You can sign in now.', email: normalizedEmail }
}
