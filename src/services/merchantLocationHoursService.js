import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchMerchantLocationHours() {
  try {
    const { data } = await api.get('/merchant/location-hours')
    return data?.data ?? null
  } catch (err) {
    if (err.response?.status === 404) {
      return null
    }
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function saveMerchantLocationHours(payload) {
  try {
    const { data } = await api.put('/merchant/location-hours', payload)
    return data?.data ?? null
  } catch (err) {
    const apiErrors = err.response?.data?.errors
    if (apiErrors) {
      const fieldErrors = {}
      Object.keys(apiErrors).forEach((key) => {
        fieldErrors[key] = apiErrors[key][0]
      })
      const error = new Error(err.response?.data?.message || 'Unable to save location and hours.')
      error.fieldErrors = fieldErrors
      throw error
    }

    throw new Error(getApiFieldError(err, 'form'))
  }
}
