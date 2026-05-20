import {
  MERCHANT_SIGNUP_EMAIL_KEY,
  MERCHANT_SIGNUP_OTP,
} from './data/merchantEmailVerification.mock'

const delay = (ms = 600) => new Promise((resolve) => setTimeout(resolve, ms))

export function getMerchantSignupEmail() {
  return sessionStorage.getItem(MERCHANT_SIGNUP_EMAIL_KEY) || ''
}

export function setMerchantSignupEmail(email) {
  const normalized = email.trim().toLowerCase()
  if (normalized) {
    sessionStorage.setItem(MERCHANT_SIGNUP_EMAIL_KEY, normalized)
  }
}

export function clearMerchantSignupEmail() {
  sessionStorage.removeItem(MERCHANT_SIGNUP_EMAIL_KEY)
}

export async function merchantVerifySignupEmail({ email, code }) {
  await delay(800)

  const normalizedEmail = (email || getMerchantSignupEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    const error = new Error('Email is required. Return to registration and try again.')
    error.code = 'MISSING_EMAIL'
    throw error
  }
  if (code.length !== 6) {
    const error = new Error('Enter the 6-digit verification code.')
    error.code = 'INVALID_OTP'
    throw error
  }
  if (code !== MERCHANT_SIGNUP_OTP) {
    const error = new Error('Invalid verification code. Try again.')
    error.code = 'INVALID_OTP'
    throw error
  }

  setMerchantSignupEmail(normalizedEmail)

  return {
    message: 'Email verified successfully.',
    email: normalizedEmail,
  }
}

export async function merchantResendSignupCode(email) {
  await delay(600)

  const normalizedEmail = (email || getMerchantSignupEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Email is required to resend the code.')
  }

  setMerchantSignupEmail(normalizedEmail)

  return {
    message: 'A new verification code has been sent.',
    email: normalizedEmail,
  }
}
