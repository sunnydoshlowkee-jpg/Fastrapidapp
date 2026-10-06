import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

const TOKEN_KEY = 'rapid_pipeline_token'
const SESSION_TOKEN_KEY = 'rapid_pipeline_session_token'
const USER_KEY = 'rapid_pipeline_user'
const PENDING_KEY = 'rapid_pipeline_pending_session'
const PENDING_BACKUP_KEY = 'rapid_pipeline_pending_session_backup'
const RESET_EMAIL_KEY = 'rapid_pipeline_reset_email'

function writePendingSession(session) {
  const json = JSON.stringify(session)
  sessionStorage.setItem(PENDING_KEY, json)
  try {
    localStorage.setItem(PENDING_BACKUP_KEY, json)
  } catch {
    // localStorage may be unavailable in private mode
  }
}

export function getStoredPipelineSession() {
  const token = localStorage.getItem(TOKEN_KEY)
  const userJson = localStorage.getItem(USER_KEY)
  if (!token || !userJson) return null
  try {
    return { token, user: JSON.parse(userJson) }
  } catch {
    return null
  }
}

export function getPipelinePendingSession() {
  const raw =
    sessionStorage.getItem(PENDING_KEY) ||
    localStorage.getItem(PENDING_BACKUP_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw)
  } catch {
    return null
  }
}

export function clearPipelinePendingSession() {
  sessionStorage.removeItem(PENDING_KEY)
  localStorage.removeItem(PENDING_BACKUP_KEY)
}

export function clearPipelineSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(SESSION_TOKEN_KEY)
  clearPipelinePendingSession()
}

export function getPipelineAuthToken() {
  return (
    localStorage.getItem(TOKEN_KEY) ||
    sessionStorage.getItem(SESSION_TOKEN_KEY) ||
    null
  )
}

/** True only after pipeline login + 2FA (excludes pending verification). */
export function isPipelineAuthenticated() {
  if (getStoredPipelineSession()?.token) return true
  return Boolean(sessionStorage.getItem(SESSION_TOKEN_KEY))
}

function persistPipelineSession(session) {
  // Persist the token in localStorage as the source of truth. Mobile browsers
  // evict sessionStorage when a tab is backgrounded (then resumed after a
  // while), which made sessions appear to "log out" after 2-3 minutes.
  localStorage.setItem(TOKEN_KEY, session.token)
  localStorage.setItem(USER_KEY, JSON.stringify(session.user))

  try {
    sessionStorage.setItem(SESSION_TOKEN_KEY, session.token)
  } catch {
    // sessionStorage may be unavailable (private mode) - localStorage already holds it.
  }
}

export async function pipelineLogin({ email, password, rememberMe = false }) {
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

export async function pipelineVerify2fa({ code }) {
  const pending = getPipelinePendingSession()
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

    persistPipelineSession(session)
    clearPipelinePendingSession()
    return session
  } catch (err) {
    const message = err.response?.data?.message || 'Invalid code. Please try again.'
    const error = new Error(message)
    error.code = 'INVALID_OTP'
    throw error
  }
}

export async function pipelineResend2fa() {
  const pending = getPipelinePendingSession()
  if (!pending?.challengeId) {
    throw new Error('Session expired. Please sign in again.')
  }

  const { data } = await api.post('/admin/2fa/resend', {
    challenge_id: pending.challengeId,
  })

  return { message: data?.message || 'A new code has been sent to your email.' }
}

export async function pipelineLogout() {
  try {
    await api.post('/admin/pipeline/logout')
  } catch {
    // Clear local session even if the API call fails.
  } finally {
    clearPipelineSession()
  }
}

export async function pipelineRequestPasswordReset(email) {
  const normalizedEmail = email.trim().toLowerCase()
  if (!normalizedEmail || !normalizedEmail.includes('@')) {
    const error = new Error('Enter a valid email address.')
    error.code = 'INVALID_EMAIL'
    throw error
  }

  try {
    const { data } = await api.post('/admin/forgot-password', { email: normalizedEmail })
    sessionStorage.setItem(RESET_EMAIL_KEY, normalizedEmail)
    return {
      message: data?.message || `We've sent a secure code to ${normalizedEmail}.`,
      email: normalizedEmail,
    }
  } catch (err) {
    throw new Error(err.response?.data?.message || 'Could not send reset code.')
  }
}

export function getPipelineResetEmail() {
  return sessionStorage.getItem(RESET_EMAIL_KEY) || ''
}

export function clearPipelineResetEmail() {
  sessionStorage.removeItem(RESET_EMAIL_KEY)
}

export async function pipelineResendResetCode(email) {
  const normalizedEmail = (email || getPipelineResetEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Session expired. Please start again.')
  }
  return pipelineRequestPasswordReset(normalizedEmail)
}

export async function pipelineResetPassword({ email, code, newPassword, confirmPassword }) {
  const normalizedEmail = (email || getPipelineResetEmail()).trim().toLowerCase()
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
    clearPipelineResetEmail()
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