import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminFinanceOverview() {
  try {
    const { data } = await api.get('/admin/finance/overview')
    return data?.data || { kpis: [], recent: [], attention: null }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load finance overview.')
  }
}

export async function fetchAdminTransactions({
  search = '',
  audience = 'all',
  status = 'all',
  type = 'all',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const { data } = await api.get('/admin/transactions', {
      params: {
        search: search.trim() || undefined,
        audience,
        status,
        type,
        page,
        per_page: perPage,
      },
    })

    return {
      transactions: data?.data || [],
      pagination: data?.pagination || null,
      tabCounts: data?.tab_counts || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load transactions.')
  }
}

export async function fetchAdminPayouts({
  audience = 'all',
  status = 'all',
  page = 1,
  perPage = 20,
} = {}) {
  try {
    const { data } = await api.get('/admin/payouts', {
      params: {
        audience,
        status,
        page,
        per_page: perPage,
      },
    })

    return {
      payouts: data?.data || [],
      pagination: data?.pagination || null,
      summary: data?.summary || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load payouts.')
  }
}
