import api from './api'
import { getAdminAuthToken } from './adminAuthService'
import { ADMIN_MERCHANT_DETAIL_UI } from './data/adminMerchantDetail.ui'
import { ADMIN_MERCHANTS_PATH } from './data/adminMerchants.mock'
import { ADMIN_MERCHANTS_UI } from './data/adminMerchants.ui'

function formatNaira(amount) {
  const value = Number(amount) || 0
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(1)}K`
  }
  return `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}

/**
 * @param {{ search?: string, status?: string, page?: number, perPage?: number }} params
 */
export async function fetchAdminMerchants({
  search = '',
  status = 'all',
  page = 1,
  perPage = 15,
} = {}) {
  const { data } = await api.get('/admin/merchants', {
    params: {
      search: search.trim() || undefined,
      status,
      page,
      per_page: perPage,
    },
  })

  return data.data
}

/**
 * @param {Record<string, unknown>} source
 */
export function mapMerchantReviewActionsFromApi(source) {
  return {
    reviewable: Boolean(source.reviewable),
    approveContext: source.approve_context
      ? {
          id: source.approve_context.id,
          numericId: source.approve_context.numeric_id,
          name: source.approve_context.name,
          entityType: source.approve_context.entity_type,
          riskScore: source.approve_context.risk_score,
          riskTone: source.approve_context.risk_tone,
          contactName: source.approve_context.contact_name,
          contactEmail: source.approve_context.contact_email,
        }
      : null,
    rejectContext: source.reject_context
      ? {
          id: source.reject_context.id,
          numericId: source.reject_context.numeric_id,
          name: source.reject_context.name,
        }
      : null,
  }
}

/**
 * @param {Record<string, unknown>} merchant
 */
export function mapAdminMerchantFromApi(merchant) {
  return {
    numericId: merchant.id,
    id: merchant.display_id,
    name: merchant.name,
    logoTone: merchant.logo_tone,
    logoGlyph: merchant.logo_glyph,
    type: merchant.type,
    typeTone: merchant.type_tone,
    location: merchant.location,
    status: merchant.status,
    statusLabel: merchant.status_label,
    verification: merchant.verification,
    verificationLabel: merchant.verification_label,
    orders: merchant.orders,
    gmv: merchant.gmv,
    joined: merchant.joined,
    ...mapMerchantReviewActionsFromApi(merchant),
  }
}

/**
 * @param {ReturnType<typeof mapAdminMerchantFromApi>} merchant
 */
export function mapAdminMerchantForMobile(merchant) {
  const categoryIcon =
    merchant.type?.toLowerCase().includes('food') ||
    merchant.type?.toLowerCase().includes('restaurant')
      ? 'utensils'
      : merchant.type?.toLowerCase().includes('electron')
        ? 'monitor'
        : 'shopping-cart'

  return {
    id: merchant.numericId,
    name: merchant.name,
    category: merchant.type,
    categoryIcon,
    location: merchant.location?.split(',')[0] ?? merchant.location,
    status: merchant.status === 'review' ? 'pending' : merchant.status,
    statusLabel: merchant.statusLabel,
    logoKind: 'gradient',
    logoBg: mobileLogoBg(merchant.logoTone),
    logoText: merchant.logoGlyph,
    logoTextColor: '#FFFFFF',
    orders: merchant.orders,
    actionLabel: merchant.reviewable ? 'Review' : 'View Details',
    actionType: merchant.reviewable ? 'review' : 'view',
    dimmed: merchant.status === 'suspended',
    strikethrough: merchant.status === 'rejected',
  }
}

function mobileLogoBg(tone) {
  if (tone?.includes('orange')) {
    return 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
  }
  if (tone?.includes('emerald')) {
    return 'linear-gradient(135deg, #4A5D4F 0%, #2E3A33 100%)'
  }
  if (tone?.includes('violet')) {
    return 'linear-gradient(135deg, #7C3AED 0%, #5B21B6 100%)'
  }
  return 'linear-gradient(135deg, #3A6A8D 0%, #1F3A4D 100%)'
}

/**
 * @param {{ from: number|null, to: number|null, total: number }} pagination
 */
export function formatMerchantPaginationSummary(pagination) {
  const from = pagination.from ?? 0
  const to = pagination.to ?? 0
  const total = pagination.total ?? 0

  return {
    showingRange: total === 0 ? '0-0' : `${from}-${to}`,
    showingSuffix: `of ${total.toLocaleString()} merchants`,
  }
}

/**
 * @param {{ current_page: number, last_page: number }} pagination
 */
export function buildMerchantPaginationPages(pagination) {
  const { current_page: current, last_page: last } = pagination
  if (last <= 7) {
    return Array.from({ length: last }, (_, i) => i + 1)
  }

  const pages = [1]
  if (current > 3) pages.push('…')
  for (let p = Math.max(2, current - 1); p <= Math.min(last - 1, current + 1); p += 1) {
    pages.push(p)
  }
  if (current < last - 2) pages.push('…')
  pages.push(last)

  return pages
}

/**
 * @param {Record<string, number>} tabCounts
 */
export function buildMerchantTabs(tabCounts = {}) {
  return ADMIN_MERCHANTS_UI.tabs.map((tab) => {
    if (tab.id === 'pending' && tabCounts.pending > 0) {
      return { ...tab, count: tabCounts.pending }
    }
    return tab
  })
}

/**
 * Opens a merchant document using the admin API (includes auth token).
 * @param {string} fileUrl
 */
export async function openAdminDocumentFile(fileUrl) {
  const token = getAdminAuthToken()
  if (!token) {
    throw new Error('Please sign in again to view this file.')
  }

  const resolvedUrl = resolveDocumentFileUrl(fileUrl)
  const response = await fetch(resolvedUrl, {
    headers: { Authorization: `Bearer ${token}` },
  })

  if (!response.ok) {
    throw new Error('Unable to open file. It may have been removed from storage.')
  }

  const blob = await response.blob()
  const objectUrl = URL.createObjectURL(blob)
  window.open(objectUrl, '_blank', 'noopener,noreferrer')
  window.setTimeout(() => URL.revokeObjectURL(objectUrl), 60_000)
}

/**
 * Rewrites legacy storage URLs to the API host.
 * @param {string} fileUrl
 */
export function resolveDocumentFileUrl(fileUrl) {
  if (!fileUrl) return fileUrl

  const apiRoot =
    import.meta.env.VITE_API_URL?.replace(/\/api\/?$/, '') || 'http://127.0.0.1:8000'

  if (fileUrl.startsWith('http://localhost/storage/')) {
    return `${apiRoot}${fileUrl.replace('http://localhost', '')}`
  }

  if (fileUrl.startsWith('/storage/')) {
    return `${apiRoot}${fileUrl}`
  }

  if (fileUrl.startsWith('/api/')) {
    return `${apiRoot}${fileUrl}`
  }

  return fileUrl
}

export async function fetchAdminMerchantDetail(merchantId) {
  const { data } = await api.get(`/admin/merchants/${merchantId}`)
  return data.data
}

export async function fetchAdminMerchantOrders(merchantId, { page = 1, perPage = 15 } = {}) {
  const { data } = await api.get(`/admin/merchants/${merchantId}/orders`, {
    params: { page, per_page: perPage },
  })

  return {
    orders: data?.data || [],
    pagination: data?.pagination || null,
  }
}

export function mapAdminMerchantOrderFromApi(order) {
  return {
    id: order.display_id || `#ORD-${order.id}`,
    numericId: order.id,
    customer: {
      name: order.customer?.name || 'Customer',
      phone: order.customer?.phone || '—',
    },
    items: order.items ?? 0,
    total: order.total || '0',
    status: order.status,
    statusLabel: order.status_label,
    paymentStatusLabel: order.payment_status_label || order.payment_status || '—',
  }
}

/**
 * @param {Record<string, unknown>} doc
 */
export function mapAdminMerchantDocumentFromApi(doc) {
  return {
    id: doc.id,
    documentType: doc.document_type,
    title: doc.title,
    uploadedBy: doc.uploaded_by,
    uploadedAt: doc.uploaded_at,
    size: doc.size,
    fileType: doc.file_type,
    status: doc.status,
    statusLabel: doc.status_label,
    fileUrl: resolveDocumentFileUrl(doc.file_url),
    preview: {
      issuer: doc.preview?.issuer,
      issuerSub: doc.preview?.issuer_sub ?? [],
      heading: doc.preview?.heading,
      paragraphs: doc.preview?.paragraphs ?? [],
      signature: doc.preview?.signature,
      fileUrl: resolveDocumentFileUrl(doc.preview?.file_url ?? doc.file_url),
    },
  }
}

/**
 * @param {number|string} merchantId
 * @param {string} documentType
 * @param {'approved'|'rejected'} status
 */
export async function updateAdminMerchantDocument(merchantId, documentType, status) {
  const { data } = await api.patch(
    `/admin/merchants/${merchantId}/documents/${documentType}`,
    { status },
  )
  return mapAdminMerchantDocumentFromApi(data.data)
}

/**
 * @param {number|string} merchantId
 * @param {{ notify?: boolean }} [options]
 */
export async function approveAdminMerchant(merchantId, { notify = true } = {}) {
  const { data } = await api.post(`/admin/merchants/${merchantId}/approve`, { notify })
  return data.data
}

/**
 * @param {number|string} merchantId
 * @param {{ reasonId: string, message: string, allowReapply?: boolean }} payload
 */
export async function rejectAdminMerchant(merchantId, payload) {
  const { data } = await api.post(`/admin/merchants/${merchantId}/reject`, {
    reason_id: payload.reasonId,
    message: payload.message,
    allow_reapply: payload.allowReapply ?? false,
  })
  return data.data
}

/**
 * @param {Record<string, unknown>} payload
 */
export function mapAdminMerchantDetailFromApi(payload) {
  const ui = ADMIN_MERCHANT_DETAIL_UI
  const profile = payload.profile ?? {}
  const metrics = payload.metrics ?? {}
  const contact = payload.contact ?? {}
  const location = payload.location ?? {}
  const systemMeta = payload.system_meta ?? {}
  const documentsPayload = payload.documents ?? {}
  const reviewPayload = payload.document_review ?? {}

  const ordersCount = Number(metrics.orders_count ?? 0)

  return {
    numericId: profile.id,
    id: profile.display_id,
    name: profile.name,
    logoTone: profile.logo_tone,
    logoGlyph: profile.logo_glyph,
    verified: Boolean(profile.verified),
    type: profile.type,
    typeLabel: profile.type_label,
    typeTone: profile.type_tone,
    status: profile.status,
    statusLabel: profile.status_label,
    suspendLabel: profile.suspend_label,
    ...mapMerchantReviewActionsFromApi(payload),
    kpis: [
      {
        id: 'orders',
        label: ui.kpis.orders.label,
        value: ordersCount.toLocaleString(),
        showTrend: ui.kpis.orders.showTrend,
        cornerAccent: 'gray',
      },
      {
        id: 'revenue',
        label: ui.kpis.revenue.label,
        value: formatNaira(metrics.gmv),
        valueTone: ui.kpis.revenue.valueTone,
        meta: ui.kpis.revenue.meta,
        metaTone: 'text-gray-400',
      },
      {
        id: 'rating',
        label: ui.kpis.rating.label,
        value: metrics.avg_rating != null ? String(metrics.avg_rating) : '—',
        showStars: ui.kpis.rating.showStars,
        divider: 'violet',
      },
    ],
    tabs: ui.tabs,
    contact: {
      title: ui.contact.title,
      primaryOwnerLabel: ui.contact.primaryOwnerLabel,
      primaryOwner: contact.primary_owner,
      roleLabel: ui.contact.roleLabel,
      role: contact.role,
      phoneLabel: ui.contact.phoneLabel,
      phone: contact.phone,
      emailLabel: ui.contact.emailLabel,
      email: contact.email,
    },
    location: {
      title: ui.location.title,
      registeredAddressLabel: ui.location.registeredAddressLabel,
      lines: location.lines ?? ['—'],
      viewMapLabel: ui.location.viewMapLabel,
      latitude: location.latitude,
      longitude: location.longitude,
    },
    operatingHours: {
      title: ui.operatingHours.title,
      rows: (payload.operating_hours ?? []).map((row) => ({
        id: row.id,
        label: row.label,
        value: row.value,
        tone: row.tone ?? '',
      })),
    },
    systemMeta: {
      title: ui.systemMeta.title,
      onboardingDateLabel: ui.systemMeta.onboardingDateLabel,
      onboardingDate: systemMeta.onboarding_date,
      lastSyncLabel: ui.systemMeta.lastSyncLabel,
      lastSync: systemMeta.last_sync,
      apiVersionLabel: ui.systemMeta.apiVersionLabel,
      apiVersion: systemMeta.api_version ?? 'v1',
    },
    documents: {
      title: ui.documents.title,
      subtitle: ui.documents.subtitle,
      defaultSelectedId: documentsPayload.default_selected_id,
      items: (documentsPayload.items ?? []).map((doc) =>
        mapAdminMerchantDocumentFromApi(doc),
      ),
    },
    documentReview: {
      pageTitle: ui.documentReview.pageTitle,
      sectionTitle: ui.documentReview.sectionTitle,
      rejectLabel: ui.documentReview.rejectLabel,
      verifyLabel: ui.documentReview.verifyLabel,
      merchant: {
        name: reviewPayload.merchant?.name,
        category: reviewPayload.merchant?.category,
        categoryIcon: 'store',
        avatarInitials: reviewPayload.merchant?.avatar_initials,
      },
      documents: (reviewPayload.documents ?? []).map((doc) => ({
        id: doc.id,
        title: doc.title,
        description: doc.description,
        status: doc.status,
        statusLabel: doc.status_label,
        viewLabel: 'View Document',
        pageLabel: 'Page 1 of 1',
        hasViewer: Boolean(doc.has_viewer),
        fileUrl: doc.file_url,
      })),
    },
    breadcrumbs: [
      { label: 'Merchants', path: ADMIN_MERCHANTS_PATH },
      { label: profile.name },
    ],
  }
}
