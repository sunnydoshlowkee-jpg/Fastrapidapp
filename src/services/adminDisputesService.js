import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminDisputes({
  search = '',
  status = 'all',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const { data } = await api.get('/admin/disputes', {
      params: {
        search: search.trim() || undefined,
        status,
        page,
        per_page: perPage,
      },
    })

    return {
      disputes: data?.data || [],
      pagination: data?.pagination || null,
      tabCounts: data?.tab_counts || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load disputes.')
  }
}

export async function fetchAdminDispute(disputeId) {
  try {
    const { data } = await api.get(`/admin/disputes/${disputeId}`)
    return data?.data || null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load dispute.')
  }
}

export async function updateAdminDisputeStatus(disputeId, status, note) {
  try {
    const { data } = await api.patch(`/admin/disputes/${disputeId}/status`, {
      status,
      note: note || undefined,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not update dispute status.')
  }
}

export async function resolveAdminDispute(disputeId, resolution, notes) {
  try {
    const { data } = await api.post(`/admin/disputes/${disputeId}/resolve`, {
      resolution,
      notes: notes || undefined,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not resolve dispute.')
  }
}

export async function addAdminDisputeNote(disputeId, body) {
  try {
    const { data } = await api.post(`/admin/disputes/${disputeId}/notes`, { body })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not add note.')
  }
}

export async function createAdminDispute(payload) {
  try {
    const { data } = await api.post('/admin/disputes', payload)
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not open dispute.')
  }
}
