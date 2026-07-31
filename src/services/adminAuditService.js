import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminAuditLog({
  search = '',
  category = 'all',
  page = 1,
  perPage = 25,
} = {}) {
  try {
    const { data } = await api.get('/admin/audit-log', {
      params: {
        search: search.trim() || undefined,
        category: category === 'all' ? undefined : category,
        page,
        per_page: perPage,
      },
    })

    return {
      entries: data?.data || [],
      pagination: data?.pagination || null,
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load audit log.')
  }
}
