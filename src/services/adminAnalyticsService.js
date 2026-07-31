import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminAnalytics({ period = '7d', from, to } = {}) {
  try {
    const { data } = await api.get('/admin/analytics', {
      params: {
        period,
        from: from || undefined,
        to: to || undefined,
      },
    })

    return data?.data || { kpis: [], series: [], top_merchants: [], funnel: [] }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load analytics.')
  }
}
