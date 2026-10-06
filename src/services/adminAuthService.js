import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

const ADMIN_TOKEN_KEY = 'rapid_admin_token'
const ADMIN_SESSION_TOKEN_KEY = 'rapid_admin_session_token'
const ADMIN_USER_KEY = 'rapid_admin_user'
const ADMIN_PENDING_KEY = 'rapid_admin_pending_session'
const ADMIN_PENDING_BACKUP_KEY = 'rapid_admin_pending_session_backup'
const ADMIN_RESET_EMAIL_KEY = 'rapid_admin_reset_email'

function writePendingSession(session) {
  const json = JSON.stringify(session)
  sessionStorage.setItem(ADMIN_PENDING_KEY, json)
  try {
    localStorage.setItem(ADMIN_PENDING_BACKUP_KEY, json)
  } catch {
    // localStorage may be unavailable in private mode
  }
}

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
  const raw =
    sessionStorage.getItem(ADMIN_PENDING_KEY) ||
    localStorage.getItem(ADMIN_PENDING_BACKUP_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearAdminPendingSession() {
  sessionStorage.removeItem(ADMIN_PENDING_KEY)
  localStorage.removeItem(ADMIN_PENDING_BACKUP_KEY)
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
    null
  )
}

/** True only after login + 2FA (excludes pending verification). */
export function isAdminAuthenticated() {
  if (getStoredAdminSession()?.token) return true
  return Boolean(sessionStorage.getItem(ADMIN_SESSION_TOKEN_KEY))
}

function persistAdminSession(session) {
  sessionStorage.setItem(ADMIN_SESSION_TOKEN_KEY, session.token)
  if (session.rememberMe) {
    localStorage.setItem(ADMIN_TOKEN_KEY, session.token)
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(session.user))
  } else {
    localStorage.removeItem(ADMIN_TOKEN_KEY)
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(session.user))
  }
}

export async function adminLogin({ email, password, rememberMe = false }) {
  try {
    const { data } = await api.post('/admin/login', {
      email: email.trim(),
      password,
      remember_me: Boolean(rememberMe),
    })

    const session = {
      challengeId: data.data.challenge_id,
      user: data.data.user,
      rememberMe,
      method: data.data.method || 'email',
    }

    writePendingSession(session)
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
  const pending = getAdminPendingSession()
  if (!pending?.challengeId) {
    const error = new Error('Session expired. Please sign in again.')
    error.code = 'SESSION_EXPIRED'
    throw error
  }

  const normalized = String(code).replace(/\D/g, '')

  if (!/^\d{6}$/.test(normalized)) {
    const error = new Error('Please enter a valid 6-digit code.')
    error.code = 'INVALID_OTP'
    throw error
  }

  try {
    const { data } = await api.post('/admin/2fa/verify', {
      challenge_id: pending.challengeId,
      code: normalized,
    })

    const session = {
      token: data.data.token,
      user: data.data.user,
      rememberMe: Boolean(data.data.remember_me ?? pending.rememberMe),
    }

    persistAdminSession(session)
    clearAdminPendingSession()
    return session
  } catch (err) {
    const message = err.response?.data?.message || 'Invalid code. Please try again.'
    const error = new Error(message)
    error.code = 'INVALID_OTP'
    throw error
  }
}

export async function adminResend2fa() {
  const pending = getAdminPendingSession()
  if (!pending?.challengeId) {
    throw new Error('Session expired. Please sign in again.')
  }

  const { data } = await api.post('/admin/2fa/resend', {
    challenge_id: pending.challengeId,
  })

  return { message: data?.message || 'A new code has been sent to your email.' }
}

export async function adminLogout() {
  try {
    await api.post('/admin/logout')
  } catch {
    // Clear local session even if the API call fails.
  } finally {
    clearAdminSession()
  }
}

export async function adminRequestPasswordReset(email) {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    const error = new Error('Enter a valid email address.')
    error.code = 'INVALID_EMAIL'
    throw error
  }

  try {
    const { data } = await api.post('/admin/forgot-password', { email: normalizedEmail })
    sessionStorage.setItem(ADMIN_RESET_EMAIL_KEY, normalizedEmail)
    return {
      message: data?.message || `We've sent a secure code to ${normalizedEmail}.`,
      email: normalizedEmail,
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Could not send reset code.')
  }
}

export function getAdminResetEmail() {
  return sessionStorage.getItem(ADMIN_RESET_EMAIL_KEY) || ''
}

export function clearAdminResetEmail() {
  sessionStorage.removeItem(ADMIN_RESET_EMAIL_KEY)
}

export async function adminResendResetCode(email) {
  const normalizedEmail = (email || getAdminResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }
  return adminRequestPasswordReset(normalizedEmail)
}

export async function adminResetPassword({ email, code, newPassword, confirmPassword }) {
  const normalizedEmail = (email || getAdminResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
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

  try {
    const { data } = await api.post('/admin/forgot-password/reset', {
      email: normalizedEmail,
      code: String(code).replace(/\D/g, ''),
      password: newPassword,
      password_confirmation: confirmPassword,
    })
    clearAdminResetEmail()
    return {
      message: data?.message || 'Password reset successful. Sign in with your new password.',
      email: normalizedEmail,
    }
  } catch (err) {
    const message = err.response?.data?.message || 'Invalid verification code. Try again.'
    const error = new Error(message)
    error.code = 'INVALID_OTP'
    throw error
  }
}

/**
 * Change the current administrator's password. Required on first login for
 * invited admins who signed in with a temporary password. Clears the
 * `must_change_password` flag via the updated user payload.
 */
export async function changeAdminPassword({ currentPassword, newPassword, confirmPassword }) {
  const password = newPassword || ''
  if (!currentPassword) {
    throw new Error('Enter your current password.')
  }
  if (password.length < 8) {
    throw new Error('Password must be at least 8 characters.')
  }
  if (!/[A-Z]/.test(password) || !/[a-z]/.test(password)) {
    throw new Error('Password must include upper and lower case letters.')
  }
  if (!/\d/.test(password) || !/[^A-Za-z0-9]/.test(password)) {
    throw new Error('Password must include at least 1 number and 1 symbol.')
  }
  if (password !== confirmPassword) {
    throw new Error('Passwords do not match.')
  }

  try {
    const { data } = await api.post('/admin/change-password', {
      current_password: currentPassword,
      password,
      password_confirmation: confirmPassword,
    })

    const updatedUser = data?.data?.user
    if (updatedUser) updateStoredAdminUser(updatedUser)

    return {
      message: data?.message || 'Password changed successfully.',
      user: updatedUser,
    }
  } catch (err) {
    const message = err.response?.data?.message || 'Unable to change your password.'
    const error = new Error(message)
    error.code = err.response?.status === 422 ? 'INVALID_CURRENT_PASSWORD' : 'CHANGE_FAILED'
    throw error
  }
}

function updateStoredAdminUser(user) {
  try {
    localStorage.setItem(ADMIN_USER_KEY, JSON.stringify(user))
  } catch {
    // ignore storage failures
  }
}
