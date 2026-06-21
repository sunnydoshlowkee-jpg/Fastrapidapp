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
    {
      id: 'offline',
      label: 'Offline',
      value: String(stats.offline ?? 0),
      subtext: 'Inactive status',
      statusDot: 'gray',
    },
  ]
}
