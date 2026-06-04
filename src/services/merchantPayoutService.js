import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchMerchantPayoutBanks() {
  try {
    const { data } = await api.get('/merchant/payout/banks')
    return data?.data ?? []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function fetchMerchantPayout() {
  try {
    const { data } = await api.get('/merchant/payout')
    return data?.data ?? null
  } catch (err) {
    if (err.response?.status === 404) {
      return null
    }
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function resolveMerchantBankAccount({ bankCode, accountNumber }) {
  try {
    const { data } = await api.post('/merchant/payout/resolve', {
      bank_code: bankCode,
      account_number: accountNumber,
    })
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function saveMerchantPayout({ bankCode, accountNumber, accountName }) {
  try {
    const { data } = await api.put('/merchant/payout', {
      bank_code: bankCode,
      account_number: accountNumber,
      account_name: accountName,
    })
    return data?.data ?? null
  } catch (err) {
    const apiErrors = err.response?.data?.errors
    if (apiErrors) {
      const fieldErrors = {}
      Object.keys(apiErrors).forEach((key) => {
        fieldErrors[key] = apiErrors[key][0]
      })
      const error = new Error(err.response?.data?.message || 'Unable to save payout details.')
      error.fieldErrors = fieldErrors
      throw error
    }

    throw new Error(getApiFieldError(err, 'form'))
  }
}
