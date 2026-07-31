import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminRiderLocations({ onlineOnly = true } = {}) {
  try {
    const { data } = await api.get('/admin/riders/locations', {
      params: { online: onlineOnly ? 1 : 0 },
    })
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load rider locations.')
  }
}

export async function fetchAdminRiderLocation(riderId) {
  try {
    const { data } = await api.get(`/admin/riders/${riderId}/location`)
    return data?.data || null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load rider location.')
  }
}
