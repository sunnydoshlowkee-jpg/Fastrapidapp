import api from './api'
import { getApiFieldError } from '../utils/apiErrors'
import { resolveStorageUrl } from '../utils/mediaUrl'

const DEFAULT_ITEM_IMAGE = '/burger.png'

export function mapMerchantOrderDetailFromApi(order) {
  if (!order) return null

  const lineItems = (order.line_items || []).map((item) => ({
    id: String(item.id),
    name: item.name,
    description: item.description || '',
    quantityLabel: item.quantity_label,
    sku: item.sku,
    image: resolveStorageUrl(item.image_path) || DEFAULT_ITEM_IMAGE,
    quantity: item.quantity,
    unitPrice: item.unit_price,
    lineTotal: item.line_total,
  }))

  const mobileLineItems = lineItems.map((item) => ({
    id: item.id,
    name: item.name,
    quantity: `x${item.quantity}`,
    price: formatNaira(item.lineTotal),
    image: item.image,
  }))

  const preparingLineItems = lineItems.map((item) => ({
    id: item.id,
    name: `${item.quantity}x ${item.name}`,
    note: item.description || '—',
    price: formatNaira(item.lineTotal),
  }))

  const preparingMobileLineItems = lineItems.map((item) => ({
    id: item.id,
    quantity: `${item.quantity}x`,
    name: item.name,
    price: formatNaira(item.lineTotal),
  }))

  return {
    id: String(order.id),
    displayId: order.display_id,
    status: order.status,
    dbStatus: order.db_status,
    statusBadge: order.status_badge,
    phase: order.phase,
    respondWithinSeconds: order.respond_within_seconds ?? 180,
    customer: {
      name: order.customer?.name || 'Customer',
      initials: order.customer?.initials || 'CU',
      memberSince: order.customer?.member_since || 'Customer',
      rating: order.customer?.rating,
      phone: order.customer?.phone || '',
      address: order.customer?.address || 'Delivery address not provided',
      instructions: order.customer?.instructions || 'No delivery instructions provided.',
    },
    itemsHeader: {
      countLabel: order.items_header?.count_label || '0 Items to Prepare',
      totalValue: order.items_header?.total_value || formatNaira(0),
    },
    lineItems,
    pricing: {
      subtotal: order.pricing?.subtotal || formatNaira(0),
      deliveryFee: order.pricing?.delivery_fee || formatNaira(0),
      serviceCharge: order.pricing?.service_charge || formatNaira(0),
      grandTotal: order.pricing?.grand_total || formatNaira(0),
    },
    progress: {
      currentStep: order.progress?.current_step || 'accepted',
      steps: (order.progress?.steps || []).map((step) => ({
        id: step.id,
        label: step.label,
      })),
    },
    preparing: {
      title: order.preparing?.title || 'Preparing Order',
      targetCompletion: order.preparing?.target_completion || '—',
    },
    delivery: {
      address: order.customer?.address || 'Delivery address not provided',
      instructions: order.customer?.instructions || 'No delivery instructions provided.',
    },
    acceptDisclaimer:
      order.accept_disclaimer ||
      'Accepting this order confirms you have the items in stock and ready for immediate preparation.',
    mobile: {
      totalValue: order.items_header?.total_value || formatNaira(0),
      lineItems: mobileLineItems,
      pricing: {
        subtotal: order.pricing?.subtotal || formatNaira(0),
        deliveryFee: order.pricing?.delivery_fee || formatNaira(0),
        serviceCharge: order.pricing?.service_charge || formatNaira(0),
        grandTotal: order.pricing?.grand_total || formatNaira(0),
      },
      statusBadge: order.status_badge,
      progressSteps: (order.progress?.steps || []).slice(0, 4),
      customerNote: order.customer?.instructions || 'No delivery instructions provided.',
      preparingLineItems: preparingMobileLineItems,
      pricingPreparing: {
        subtotal: order.pricing?.subtotal || formatNaira(0),
        taxAndFees: order.pricing?.service_charge || formatNaira(0),
        total: order.pricing?.grand_total || formatNaira(0),
      },
      customer: {
        initials: order.customer?.initials || 'CU',
        name: order.customer?.name || 'Customer',
        badge: order.customer?.member_since || 'Customer',
        phone: order.customer?.phone || '',
      },
      delivery: {
        address: order.customer?.address || 'Delivery address not provided',
      },
    },
    preparingLineItems,
    preparingPricing: {
      subtotal: order.pricing?.subtotal || formatNaira(0),
      taxAndFees: order.pricing?.service_charge || formatNaira(0),
      total: order.pricing?.grand_total || formatNaira(0),
    },
  }
}

export function mapMerchantOrderFromApi(order) {
  if (!order) return null

  return {
    id: String(order.id),
    displayId: order.display_id,
    customer: {
      name: order.customer?.name || 'Customer',
      initials: order.customer?.initials || 'CU',
      avatarTone: order.customer?.avatar_tone || 'blue',
    },
    itemsSummary: order.items_summary || '',
    total: order.total,
    totalAmount: order.total_amount,
    status: order.status,
    dbStatus: order.db_status,
  }
}

export function mapLiveOrderFromApi(order) {
  if (!order) return null

  return {
    id: order.id,
    orderId: order.order_id,
    customer: order.customer,
    items: order.items,
    icon: order.icon || 'utensils',
    iconTone: order.icon_tone || 'blue',
    status: order.status,
    timeRemaining: order.time_remaining,
  }
}

export async function getMerchantDashboard() {
  try {
    const { data } = await api.get('/merchant/dashboard')
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load dashboard.')
  }
}

export async function getMerchantOrder(orderId) {
  try {
    const { data } = await api.get(`/merchant/orders/${orderId}`)
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load order.')
  }
}

export async function getMerchantOrders({ status = 'all', search = '', page = 1, perPage = 15 } = {}) {
  try {
    const { data } = await api.get('/merchant/orders', {
      params: {
        status: status === 'all' ? undefined : status,
        search: search || undefined,
        page,
        per_page: perPage,
      },
    })

    return {
      orders: (data?.data || []).map(mapMerchantOrderFromApi).filter(Boolean),
      meta: data?.meta || { current_page: 1, last_page: 1, total: 0, per_page: perPage },
      filterCounts: data?.filter_counts || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load orders.')
  }
}

export async function updateMerchantOrderStatus(orderId, action) {
  try {
    const { data } = await api.patch(`/merchant/orders/${orderId}/status`, { action })
    return mapMerchantOrderFromApi(data?.data)
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not update order.')
  }
}

export function formatNaira(amount) {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(Number(amount) || 0)
}

export function buildDashboardStats(stats = {}, liveOrders = []) {
  const revenue = Number(stats.revenue_today) || 0
  const liveCount = Number(stats.live_orders ?? liveOrders.length) || 0
  const completed = Number(stats.completed_today) || 0

  return [
    {
      id: 'revenue',
      label: "Today's Revenue",
      value: revenue > 0 ? formatNaira(revenue) : '—',
      subtext: revenue > 0 ? 'From paid orders today' : 'waiting for your first sale',
      subtextTone: revenue > 0 ? 'positive' : 'warning',
      icon: 'banknote',
    },
    {
      id: 'live-orders',
      label: 'Live Orders',
      value: String(liveCount),
      subtext: 'Currently in kitchen',
      subtextTone: 'muted',
      icon: 'refresh',
    },
    {
      id: 'completed',
      label: 'Completed',
      value: completed > 0 ? String(completed) : '—',
      subtext: 'Delivered orders',
      subtextTone: 'muted',
      icon: 'check',
    },
    {
      id: 'rating',
      label: 'Performance Rating',
      value: 'N/A',
      subtext: 'Top 5% in category',
      subtextTone: 'muted',
      icon: 'star',
      iconTone: 'warning',
    },
  ]
}
