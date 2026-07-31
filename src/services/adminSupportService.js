import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminSupportTickets({
  search = '',
  status = 'all',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const { data } = await api.get('/admin/support/tickets', {
      params: {
        search: search.trim() || undefined,
        status,
        page,
        per_page: perPage,
      },
    })

    return {
      tickets: data?.data || [],
      pagination: data?.pagination || null,
      tabCounts: data?.tab_counts || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load support tickets.')
  }
}

export async function fetchAdminSupportTicket(ticketId) {
  try {
    const { data } = await api.get(`/admin/support/tickets/${ticketId}`)
    return data?.data || null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load ticket.')
  }
}

export async function updateAdminSupportTicketStatus(ticketId, status) {
  try {
    const { data } = await api.patch(`/admin/support/tickets/${ticketId}/status`, { status })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not update ticket status.')
  }
}

export async function addAdminSupportMessage(ticketId, body, isInternal = false) {
  try {
    const { data } = await api.post(`/admin/support/tickets/${ticketId}/messages`, {
      body,
      is_internal: isInternal,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not send message.')
  }
}

export async function createAdminSupportTicket(payload) {
  try {
    const { data } = await api.post('/admin/support/tickets', payload)
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not create ticket.')
  }
}
