import api from './api'
import { getStoredMerchantSession, merchantGetMe } from './merchantAuthService'
import { mapUserToRegistrationDraft } from '../utils/merchantRegistrationDraft'
import { MERCHANT_SIGNUP_EMAIL_KEY } from './data/merchantEmailVerification.mock'
import {
  buildMerchantRegistrationFormData,
  buildMerchantRegistrationPayload,
  validateMerchantRegistration,
} from '../utils/merchantRegistrationValidation'
import { getApiFieldError } from '../utils/apiErrors'

const MERCHANT_TOKEN_KEY = 'rapid_merchant_token'
const MERCHANT_USER_KEY = 'rapid_merchant_user'

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

function storeMerchantSession({ token, user }) {
  if (token) {
    localStorage.setItem(MERCHANT_TOKEN_KEY, token)
  }
  if (user) {
    localStorage.setItem(MERCHANT_USER_KEY, JSON.stringify(user))
  }
}

export async function fetchMerchantRegistrationDraft() {
  if (!getStoredMerchantSession()) {
    return null
  }

  try {
    const user = await merchantGetMe()
    return mapUserToRegistrationDraft(user)
  } catch {
    return null
  }
}

export async function merchantUpdateRegistration(values, logoFile) {
  const errors = validateMerchantRegistration(values, { isUpdate: true })
  if (Object.keys(errors).length > 0) {
    const error = new Error('Please fix the highlighted fields.')
    error.code = 'VALIDATION'
    error.fieldErrors = errors
    throw error
  }

  try {
    let response

    // PHP/Laravel does not parse multipart bodies on PUT; use JSON unless a logo file is attached.
    if (logoFile) {
      const formData = buildMerchantRegistrationFormData(values, logoFile)
      response = await api.post('/merchant/register/update', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      })
    } else {
      const payload = buildMerchantRegistrationPayload(values)
      if (!payload.password) {
        delete payload.password
        delete payload.confirm_password
      }
      response = await api.put('/merchant/register', payload)
    }

    const { data } = response

    const email = data?.data?.email || values.businessEmail?.trim().toLowerCase()
    if (email) {
      setMerchantSignupEmail(email)
    }

    const user = data?.data?.user
    if (user) {
      storeMerchantSession({
        token: getStoredMerchantSession()?.token,
        user,
      })
    }

    return data
  } catch (err) {
    const apiErrors = err.response?.data?.errors
    if (apiErrors) {
      const fieldErrors = {}
      const fieldMap = {
        business_name: 'legalName',
        legal_name: 'legalName',
        business_type: 'businessType',
        email: 'businessEmail',
        business_email: 'businessEmail',
        phone: 'phone',
        registered_address: 'address',
        address_street: 'addressStreet',
        representative_name: 'repName',
        rep_name: 'repName',
        representative_role: 'repRole',
        representative_phone: 'repPhone',
        password: 'password',
        password_confirmation: 'confirmPassword',
        confirm_password: 'confirmPassword',
        logo: 'logo',
      }

      Object.keys(apiErrors).forEach((key) => {
        const mapped = fieldMap[key] || key
        fieldErrors[mapped] = apiErrors[key][0]
      })

      const error = new Error(err.response?.data?.message || 'Unable to save your profile.')
      error.code = 'API_VALIDATION'
      error.fieldErrors = fieldErrors
      throw error
    }

    const error = new Error(getApiFieldError(err, 'form'))
    error.code = 'API_ERROR'
    throw error
  }
}

export async function merchantSaveRegistration(values, logoFile) {
  if (getStoredMerchantSession()) {
    return merchantUpdateRegistration(values, logoFile)
  }

  return merchantRegister(values, logoFile)
}

export async function merchantRegister(values, logoFile) {
  const errors = validateMerchantRegistration(values)
  if (Object.keys(errors).length > 0) {
    const error = new Error('Please fix the highlighted fields.')
    error.code = 'VALIDATION'
    error.fieldErrors = errors
    throw error
  }

  const formData = buildMerchantRegistrationFormData(values, logoFile)

  try {
    const { data } = await api.post('/merchant/register', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })

    const email = data?.data?.email || values.businessEmail?.trim().toLowerCase()
    setMerchantSignupEmail(email)

    return data
  } catch (err) {
    const apiErrors = err.response?.data?.errors
    if (apiErrors) {
      const fieldErrors = {}
      const fieldMap = {
        business_name: 'legalName',
        legal_name: 'legalName',
        business_type: 'businessType',
        email: 'businessEmail',
        business_email: 'businessEmail',
        phone: 'phone',
        registered_address: 'address',
        address_street: 'addressStreet',
        representative_name: 'repName',
        rep_name: 'repName',
        representative_role: 'repRole',
        representative_phone: 'repPhone',
        password: 'password',
        password_confirmation: 'confirmPassword',
        confirm_password: 'confirmPassword',
        logo: 'logo',
      }

      Object.keys(apiErrors).forEach((key) => {
        const mapped = fieldMap[key] || key
        fieldErrors[mapped] = apiErrors[key][0]
      })

      const error = new Error(err.response?.data?.message || 'Unable to complete registration.')
      error.code = 'API_VALIDATION'
      error.fieldErrors = fieldErrors
      throw error
    }

    const error = new Error(getApiFieldError(err, 'form'))
    error.code = 'API_ERROR'
    throw error
  }
}

export async function merchantVerifySignupEmail({ email, code }) {
  const normalizedEmail = (email || getMerchantSignupEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    const error = new Error('Email is required. Return to registration and try again.')
    error.code = 'MISSING_EMAIL'
    throw error
  }

  try {
    const { data } = await api.post('/merchant/register/verify-email', {
      email: normalizedEmail,
      code,
    })

    setMerchantSignupEmail(normalizedEmail)
    const user = data?.data?.user

    if (data?.data?.token) {
      storeMerchantSession({
        token: data?.data?.token,
        user,
      })
    }

    return {
      message: data?.message || 'Email verified successfully.',
      email: normalizedEmail,
      token: data?.data?.token,
      user,
      onboarding: user?.onboarding ?? null,
      redirectPath: user?.onboarding?.redirect_path ?? '/merchant/signup/documents',
    }
  } catch (err) {
    const message = getApiFieldError(err, 'code')
    const error = new Error(message)
    error.code = 'INVALID_OTP'
    throw error
  }
}

export async function merchantResendSignupCode(email) {
  const normalizedEmail = (email || getMerchantSignupEmail()).trim().toLowerCase()
  if (!normalizedEmail) {
    throw new Error('Email is required to resend the code.')
  }

  try {
    const { data } = await api.post('/merchant/register/resend-code', {
      email: normalizedEmail,
    })

    setMerchantSignupEmail(normalizedEmail)

    return {
      message: data?.message || 'A new verification code has been sent.',
      email: normalizedEmail,
      debugOtp: data?.data?.debug_otp,
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'email'))
  }
}

/** Where to go after saving the business profile step. */
export function resolvePostRegistrationPath(user) {
  if (!user) {
    return null
  }

  if (user.status === 'pending_email_verification') {
    const email = user.email || ''
    return `/merchant/signup/verify?email=${encodeURIComponent(email)}`
  }

  return user.onboarding?.redirect_path ?? '/merchant/signup/documents'
}
