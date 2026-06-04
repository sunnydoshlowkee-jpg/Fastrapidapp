import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { saveMerchantLocationHours } from './merchantLocationHoursService'
import { saveMerchantPayout } from './merchantPayoutService'

export async function getMerchantOnboardingState() {
  try {
    const { data } = await api.get('/merchant/onboarding')
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function advanceMerchantOnboarding(step) {
  try {
    const { data } = await api.post('/merchant/onboarding/advance', { step })
    return {
      onboarding: data?.data?.onboarding ?? null,
      user: data?.data?.user ?? null,
      redirectPath: data?.data?.onboarding?.redirect_path ?? null,
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'step'))
  }
}

export function merchantRedirectPath(onboarding) {
  return onboarding?.redirect_path ?? '/merchant/signup/documents'
}

/** Ordered signup routes — used to allow back navigation to completed steps. */
const SIGNUP_STEP_ORDER = [
  '/merchant/signup',
  '/merchant/signup/verify',
  '/merchant/signup/documents',
  '/merchant/signup/location-hours',
  '/merchant/signup/bank-details',
  '/merchant/signup/pending',
]

export function signupStepIndex(pathname) {
  if (pathname === '/merchant/signup' || pathname === '/merchant/signup/verify') {
    return 0
  }

  const index = SIGNUP_STEP_ORDER.indexOf(pathname)

  return index === -1 ? -1 : index
}

/**
 * True when the user may view this signup path (current step or an earlier one).
 */
export function assertAllVerificationDocumentsUploaded(documents) {
  const missing = documents.filter((doc) => !doc.file)

  if (missing.length === 0) {
    return
  }

  const labels = missing.map((doc) => doc.section?.title ?? doc.id).join(', ')
  const error = new Error(`Please upload all required documents: ${labels}.`)
  error.code = 'DOCUMENTS_INCOMPLETE'
  throw error
}

export async function completeDocumentsOnboardingStep(documents) {
  assertAllVerificationDocumentsUploaded(documents)

  return advanceMerchantOnboarding('documents')
}

export async function completeLocationOnboardingStep(locationPayload) {
  await saveMerchantLocationHours(locationPayload)

  return advanceMerchantOnboarding('location')
}

export async function completePayoutOnboardingStep(payoutPayload) {
  if (payoutPayload?.bankCode && payoutPayload?.accountNumber && payoutPayload?.accountName) {
    await saveMerchantPayout({
      bankCode: payoutPayload.bankCode,
      accountNumber: payoutPayload.accountNumber,
      accountName: payoutPayload.accountName,
    })
  }

  return advanceMerchantOnboarding('payout')
}

export function canVisitSignupPath(pathname, onboarding) {
  const targetPath = merchantRedirectPath(onboarding).split('?')[0]
  const currentIdx = signupStepIndex(pathname)
  const targetIdx = signupStepIndex(targetPath)

  if (currentIdx === -1 || targetIdx === -1) {
    return false
  }

  return currentIdx <= targetIdx
}
