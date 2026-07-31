import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchRiderPayoutBanks() {
  try {
    const { data } = await api.get('/rider/payout/banks')
    return data?.data ?? []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function fetchRiderPayout() {
  try {
    const { data } = await api.get('/rider/payout')
    return data?.data ?? null
  } catch (err) {
    if (err.response?.status === 404) {
      return null
    }
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function resolveRiderPayoutAccount({ bankCode, accountNumber }) {
  try {
    const { data } = await api.post('/rider/payout/resolve', {
      bank_code: bankCode,
      account_number: accountNumber,
    })
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || err.response?.data?.message || 'Could not verify bank account.')
  }
}

export async function saveRiderPayout({ bankCode, accountNumber, accountName }) {
  try {
    const { data } = await api.put('/rider/payout', {
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

    throw new Error(getApiFieldError(err, 'form') || err.response?.data?.message || 'Unable to save payout details.')
  }
}
