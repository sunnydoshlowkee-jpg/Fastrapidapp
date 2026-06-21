import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function getAddresses() {
  return api.get('/user/addresses')
}

export async function createAddress({ type, address, city, state, is_default }) {
  try {
    const { data } = await api.post('/user/addresses', {
      type,
      address: address?.trim(),
      city: city?.trim() || undefined,
      state: state?.trim() || undefined,
      is_default: Boolean(is_default),
    })
    return data
  } catch (err) {
    const message =
      getApiFieldError(err, 'address') ||
      getApiFieldError(err, 'type') ||
      getApiFieldError(err, 'form')
    throw new Error(message)
  }
}

export async function deleteAddress(id) {
  try {
    await api.delete(`/user/addresses/${id}`)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}

export async function setDefaultAddress(id) {
  try {
    const { data } = await api.put(`/user/addresses/${id}`)
    return data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form'))
  }
}
