import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { ADMIN_ORDER_DETAIL_STATIC } from './data/adminOrderDetail.mock'
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

export async function fetchAdminOrderDetail(orderId) {
  const { data } = await api.get(`/admin/orders/${orderId}`)
  return data?.data
}

export function mapAdminOrderDetailFromApi(source) {
  return {
    ...ADMIN_ORDER_DETAIL_STATIC,
    id: source.display_id || source.id,
    referenceId: source.reference_id || source.id,
    placedAt: source.placed_at || '—',
    placedAtMobile: source.placed_at_mobile || source.placed_at || '—',
    statusLabel: source.status_label || '—',
    estimateLabel: source.estimate_label || '—',
    statusBadge: source.status_badge || null,
    steps: source.steps || [],
    stakeholders: {
      customer: {
        title: source.stakeholders?.customer?.title || 'Customer',
        name: source.stakeholders?.customer?.short_name || source.stakeholders?.customer?.name || 'Customer',
        maskedPhone: source.stakeholders?.customer?.masked_phone || '—',
        actionLabel: source.stakeholders?.customer?.action_label || 'View profile',
        icon: source.stakeholders?.customer?.icon || 'user',
        iconTone: source.stakeholders?.customer?.icon_tone || 'purple',
      },
      merchant: {
        title: source.stakeholders?.merchant?.title || 'Merchant',
        name: source.stakeholders?.merchant?.name || '—',
        initials: source.stakeholders?.merchant?.initials || '—',
        distanceLabel: source.stakeholders?.merchant?.distance_label || '—',
        actionLabel: source.stakeholders?.merchant?.action_label || 'View store',
        icon: source.stakeholders?.merchant?.icon || 'store',
        iconTone: source.stakeholders?.merchant?.icon_tone || 'orange',
      },
      rider: {
        title: source.stakeholders?.rider?.title || 'Rider',
        name: source.stakeholders?.rider?.name || 'Unassigned',
        initials: source.stakeholders?.rider?.initials || '—',
        rating: source.stakeholders?.rider?.rating || '—',
        tripsLabel: source.stakeholders?.rider?.trips_label || '—',
        actionLabel: source.stakeholders?.rider?.action_label || 'Call rider',
        icon: source.stakeholders?.rider?.icon || 'bike',
        iconTone: source.stakeholders?.rider?.icon_tone || 'orange',
      },
    },
    items: {
      title: source.items?.title || 'Order Items',
      lines: (source.items?.lines || []).map((line) => ({
        id: line.id,
        qty: line.qty,
        name: line.name,
        note: line.note,
        price: line.price,
      })),
      subtotalLabel: source.items?.subtotal_label || 'Subtotal',
      subtotal: source.items?.subtotal || '0',
      deliveryLabel: source.items?.delivery_label || 'Delivery Fee',
      deliveryFee: source.items?.delivery_fee || '0',
      serviceLabel: source.items?.service_label || 'Service Fee',
      serviceCharge: source.items?.service_charge || '0',
      totalLabel: source.items?.total_label || 'Total',
      total: source.items?.total || '0',
    },
    refundSheet: {
      ...ADMIN_ORDER_DETAIL_STATIC.refundSheet,
      eligibleAmount: source.items?.total || ADMIN_ORDER_DETAIL_STATIC.refundSheet.eligibleAmount,
      defaultAmount: source.items?.total || ADMIN_ORDER_DETAIL_STATIC.refundSheet.defaultAmount,
    },
  }
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

export async function updateAdminOrderStatus(orderId, status, reason = '') {
  try {
    const { data } = await api.patch(`/admin/orders/${orderId}/status`, {
      status,
      reason: reason || undefined,
    })
    return data?.data
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || err.response?.data?.message || 'Could not update order status.')
  }
}
