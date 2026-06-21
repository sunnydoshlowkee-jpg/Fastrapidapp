import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { ADMIN_ORDERS } from './data/adminOrders.mock'

export async function fetchAdminOrders({
  search = '',
  status = 'all',
  page = 1,
  perPage = 15,
} = {}) {
  try {
    const { data } = await api.get('/admin/orders', {
      params: {
        search: search.trim() || undefined,
        status,
        page,
        per_page: perPage,
      },
    })

    return {
      orders: data?.data || [],
      pagination: data?.pagination || null,
      tabCounts: data?.tab_counts || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load orders.')
  }
}

export function buildAdminOrderTabs(tabCounts = {}) {
  return ADMIN_ORDERS.tabs.map((tab) => ({
    ...tab,
    count: tabCounts[tab.id],
  }))
}

export function mapAdminOrderFromApi(order) {
  return {
    id: order.display_id || `#ORD-${order.id}`,
    numericId: order.id,
    customer: {
      name: order.customer?.name || 'Customer',
      phone: order.customer?.phone || '—',
      shortName: order.customer?.short_name || order.customer?.name || 'Customer',
    },
    merchant: {
      name: order.merchant?.name || '—',
      location: order.merchant?.location || '—',
      label: order.merchant?.label || order.merchant?.name || '—',
    },
    items: order.items ?? 0,
    total: order.total || '0',
    status: order.status,
    statusLabel: order.status_label,
    elapsed: order.elapsed || '—',
    elapsedSuffix: order.elapsed_suffix || 'elapsed',
    elapsedWarning: Boolean(order.elapsed_warning),
    mobileAction: order.mobile_action,
  }
}

export function formatAdminOrdersPaginationSummary(pagination) {
  if (!pagination?.total) {
    return 'No orders found'
  }

  const from = pagination.from ?? 1
  const to = pagination.to ?? pagination.total

  return `Showing ${from}–${to} of ${pagination.total} orders`
}

export function buildAdminOrdersPaginationPages(pagination) {
  if (!pagination?.last_page) return [1]

  const pages = []
  const last = pagination.last_page
  const current = pagination.current_page

  for (let page = 1; page <= last; page += 1) {
    if (page === 1 || page === last || Math.abs(page - current) <= 1) {
      pages.push(page)
    }
  }

  return [...new Set(pages)]
}
