import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function getKycStatus() {
  try {
    const { data } = await api.get('/kyc/status')
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function getKycTiers() {
  try {
    const { data } = await api.get('/kyc/tiers')
    return data?.data ?? []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function verifyBvn(bvn) {
  try {
    const { data } = await api.post('/kyc/bvn/verify', { bvn, consent: true })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function verifyNin(nin) {
  try {
    const { data } = await api.post('/kyc/nin/verify', { nin, consent: true })
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export function isWalletAccessible(user) {
  if (!user?.kyc) return false
  return user.kyc.wallet_access === true || (user.kyc.tier_level ?? 0) >= 1
}

export function getUserKycTier(user) {
  return user?.kyc?.tier ?? 'tier_0'
}
