import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { ADMIN_2FA_OTP, ADMIN_RESET_OTP } from './data/adminAuth.mock'

const ADMIN_TOKEN_KEY = 'rapid_admin_token'
const ADMIN_SESSION_TOKEN_KEY = 'rapid_admin_session_token'
const ADMIN_USER_KEY = 'rapid_admin_user'
const ADMIN_PENDING_KEY = 'rapid_admin_pending_session'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

export function getStoredAdminSession() {
  const token = localStorage.getItem(ADMIN_TOKEN_KEY)
  const userJson = localStorage.getItem(ADMIN_USER_KEY)
  if (!token || !userJson) return null
  try {
    return { token, user: JSON.parse(userJson) }
  } catch {
    return null
  }
}

export function getAdminPendingSession() {
  const raw = sessionStorage.getItem(ADMIN_PENDING_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearAdminPendingSession() {
  sessionStorage.removeItem(ADMIN_PENDING_KEY)
}

export function clearAdminSession() {
  localStorage.removeItem(ADMIN_TOKEN_KEY)
  localStorage.removeItem(ADMIN_USER_KEY)
  sessionStorage.removeItem(ADMIN_SESSION_TOKEN_KEY)
  clearAdminPendingSession()
}

export function getAdminAuthToken() {
  return (
    localStorage.getItem(ADMIN_TOKEN_KEY) ||
    sessionStorage.getItem(ADMIN_SESSION_TOKEN_KEY) ||
    getAdminPendingSession()?.token ||
    null
  )
}

function persistAdminSession(session) {
  sessionStorage.setItem(ADMIN_SESSION_TOKEN_KEY, session.token)
  if (session.rememberMe) {
    localStorage.setItem(ADMIN_TOKEN_KEY, session.token)
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(session.user))
  }
}

export async function adminLogin({ email, password, rememberMe = false }) {
  try {
    const { data } = await api.post('/admin/login', {
      email: email.trim(),
      password,
    })

    const session = {
      token: data.data.token,
      user: data.data.user,
      rememberMe,
    }

    sessionStorage.setItem(ADMIN_PENDING_KEY, JSON.stringify(session))
    return session
  } catch (err) {
    const message = getApiFieldError(err, 'email') || err.response?.data?.message
    const error = new Error(message || 'Invalid email or password.')
    error.code =
      err.response?.status === 422 ? 'INVALID_CREDENTIALS' : 'LOGIN_FAILED'
    throw error
  }
}

export async function adminVerify2fa({ code }) {
  await delay()

  const pending = getAdminPendingSession()
  if (!pending) {
    const error = new Error('Session expired. Please sign in again.')
    error.code = 'SESSION_EXPIRED'
    throw error
  }

  if (code !== ADMIN_2FA_OTP) {
    const error = new Error('Invalid code. Please try again.')
    error.code = 'INVALID_OTP'
    throw error
  }

  persistAdminSession(pending)
  clearAdminPendingSession()
  return pending
}

export async function adminResend2fa() {
  await delay(400)
  if (!getAdminPendingSession()) {
    throw new Error('Session expired. Please sign in again.')
  }
  return { message: 'A new code has been sent to your authenticator app.' }
}

const ADMIN_RESET_EMAIL_KEY = 'rapid_admin_reset_email'

export async function adminRequestPasswordReset(email) {
  await delay(800)

  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    const error = new Error('Enter a valid email address.')
    error.code = 'INVALID_EMAIL'
    throw error
  }

  sessionStorage.setItem(ADMIN_RESET_EMAIL_KEY, normalizedEmail)

  return {
    message: `We've sent a secure reset link to ${normalizedEmail}.`,
    email: normalizedEmail,
  }
}

export function getAdminResetEmail() {
  return sessionStorage.getItem(ADMIN_RESET_EMAIL_KEY) || ''
}

export function clearAdminResetEmail() {
  sessionStorage.removeItem(ADMIN_RESET_EMAIL_KEY)
}

export async function adminResendResetCode(email) {
  await delay(600)
  const normalizedEmail = (email || getAdminResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }
  sessionStorage.setItem(ADMIN_RESET_EMAIL_KEY, normalizedEmail)
  return { message: 'A new verification code has been sent.', email: normalizedEmail }
}

export async function adminResetPassword({ email, code, newPassword, confirmPassword }) {
  await delay(800)

  const normalizedEmail = (email || getAdminResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }
  if (code !== ADMIN_RESET_OTP) {
    const error = new Error('Invalid verification code. Try again.')
    error.code = 'INVALID_OTP'
    throw error
  }
  if (!newPassword || newPassword.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }
  if (!/\d/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword)) {
    throw new Error('Password must include at least 1 number and 1 symbol.')
  }
  if (newPassword !== confirmPassword) {
    throw new Error('Passwords do not match.')
  }

  clearAdminResetEmail()
  return {
    message: 'Password reset successful. Sign in with your new password.',
    email: normalizedEmail,
  }
}
