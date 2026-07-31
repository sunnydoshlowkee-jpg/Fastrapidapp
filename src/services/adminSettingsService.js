import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminSettingsGroup(group) {
  try {
    const { data } = await api.get(`/admin/settings/${group}`)
    return data?.data || { group, data: {} }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load settings.')
  }
}

export async function saveAdminSettingsGroup(group, payload) {
  try {
    const { data } = await api.put(`/admin/settings/${group}`, { data: payload })
    return data?.data || { group, data: payload }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not save settings.')
  }
}

export async function fetchAdminSettingsTeam() {
  try {
    const { data } = await api.get('/admin/settings/team')
    return data?.data || []
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load admin team.')
  }
}

export async function fetchAdminSettingsIntegrations() {
  try {
    const { data } = await api.get('/admin/settings/integrations')
    return data?.data || {}
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load integrations.')
  }
}
