import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

export async function fetchAdminRiders({
  search = '',
  status = 'all',
  page = 1,
  perPage = 15,
} = {}) {
  try {
    const { data } = await api.get('/admin/riders', {
      params: {
        search: search.trim() || undefined,
        status,
        page,
        per_page: perPage,
      },
    })

    return {
      riders: data?.data || [],
      pagination: data?.pagination || null,
      stats: data?.stats || {},
    }
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load riders.')
  }
}

export function mapAdminRiderFromApi(rider) {
  return {
    id: rider.display_id || `RD-${rider.id}`,
    numericId: rider.id,
    name: rider.name,
    initials: rider.initials,
    avatarTone: rider.avatar_tone,
    vehicle: rider.vehicle,
    plate: rider.plate,
    status: rider.status,
    statusLabel: rider.status_label,
    activeOrders: rider.active_orders ?? 0,
    trips: rider.trips,
    rating: rider.rating,
    lastActive: rider.last_active,
  }
}

export function mapAdminRiderStatsFromApi(stats = {}) {
  return [
    {
      id: 'total',
      label: 'Total Fleet',
      value: String(stats.total ?? 0),
      subtext: 'Registered riders',
      showTrend: false,
    },
    {
      id: 'pending',
      label: 'Pending Review',
      value: String(stats.pending ?? 0),
      subtext: 'Awaiting approval',
      valueTone: 'orange',
    },
    {
      id: 'available',
      label: 'Available',
      value: String(stats.available ?? 0),
      subtext: 'Ready for dispatch',
    },
    {
      id: 'on_trip',
      label: 'On Trip',
      value: String(stats.on_trip ?? 0),
      valueTone: 'purple',
      subtext: 'Currently active',
      statusDot: 'orange',
    },
  ]
}

export async function fetchAdminRiderDetail(riderId) {
  const { data } = await api.get(`/admin/riders/${riderId}`)
  return data?.data
}

export function mapAdminRiderDetailFromApi(source) {
  return {
    id: source.display_id || source.id,
    numericId: source.numeric_id || source.id,
    name: source.name,
    initials: source.initials,
    avatarTone: source.avatar_tone,
    status: source.approval_status,
    onlineLabel: source.online_label,
    joined: source.joined,
    breadcrumbs: source.breadcrumbs,
    defaultTab: source.default_tab,
    tabs: source.tabs,
    metrics: source.metrics,
    tripHistory: source.trip_history || [],
    documents: (source.documents || []).map((doc) => ({
      id: doc.id,
      documentType: doc.document_type,
      name: doc.name,
      meta: doc.meta,
      icon: doc.icon,
      status: doc.status,
      statusLabel: doc.status_label,
      actionLabel: doc.action_label,
      documentUrl: doc.document_url,
      verificationStatus: doc.verification_status,
    })),
    canApprove: source.can_approve,
    suspendLabel: source.suspend_label,
    editProfileLabel: source.edit_profile_label,
    approvalStatusLabel: source.approval_status_label,
    profileSections: (source.profile_sections || []).map((section) => ({
      id: section.id,
      title: section.title,
      fields: (section.fields || []).map((field) => ({
        label: field.label,
        value: field.value,
        url: field.url || null,
      })),
    })),
  }
}

export async function approveAdminRider(riderId) {
  const { data } = await api.post(`/admin/riders/${riderId}/approve`)
  return data?.data
}

export async function rejectAdminRider(riderId, reason = '') {
  const { data } = await api.post(`/admin/riders/${riderId}/reject`, { reason })
  return data?.data
}

export async function updateAdminRiderDocument(riderId, documentType, status) {
  const { data } = await api.patch(`/admin/riders/${riderId}/documents/${documentType}`, { status })
  return data?.data
}
