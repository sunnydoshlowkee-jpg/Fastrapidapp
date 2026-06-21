import api from './api'
import { getApiFieldError } from '../utils/apiErrors'

function formatRevenue(amount) {
  const value = Number(amount) || 0
  if (value >= 1_000_000) {
    return `₦${(value / 1_000_000).toFixed(1)}M`
  }
  if (value >= 1_000) {
    return `₦${(value / 1_000).toFixed(1)}K`
  }
  return `₦${value.toLocaleString('en-NG', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`
}

export function mapAdminDashboardFromApi(payload, adminName = 'Admin') {
  const kpis = payload?.kpis ?? {}
  const hour = new Date().getHours()
  const greeting =
    hour < 12 ? 'Good morning' : hour < 17 ? 'Good afternoon' : 'Good evening'

  return {
    greeting: {
      title: `${greeting}, ${adminName} 👋`,
      subtitle: "Here's your live operational overview.",
      systemStatus: 'System Online',
    },
    kpis: [
      {
        id: 'active-orders',
        variant: 'orders',
        label: 'Active Orders',
        value: String(kpis.active_orders ?? 0),
        trend: kpis.active_orders_trend || 'No change vs last hr',
        showTrendIcon: true,
      },
      {
        id: 'active-riders',
        variant: 'riders',
        label: 'Active Riders',
        value: String(kpis.active_riders ?? 0),
        trend: `${kpis.rider_utilization ?? 0}% Utilization`,
      },
      {
        id: 'sla-breaches',
        variant: 'sla',
        label: 'SLA Breaches',
        value: String(kpis.sla_breaches ?? 0),
        trend: Number(kpis.sla_breaches) > 0 ? 'Needs immediate attention' : 'All clear',
      },
      {
        id: 'revenue',
        variant: 'revenue',
        label: "Today's Revenue",
        value: formatRevenue(kpis.today_revenue),
        trend: kpis.today_revenue_label || 'Updated just now',
      },
    ],
    telemetry: {
      title: 'Live Telemetry',
      liveLabel: 'Live',
      events: (payload?.telemetry || []).map((event) => ({
        id: event.id,
        orderId: event.order_id,
        time: event.time,
        dotTone: event.dot_tone,
        statusLabel: event.status_label,
        statusTone: event.status_tone,
      })),
    },
    exceptions: {
      title: 'Exception Alerts',
      viewAllLabel: 'View All',
      items: (payload?.exceptions || []).map((item) => ({
        id: item.id,
        severity: item.severity,
        title: item.title,
        meta: item.meta,
        actionLabel: item.action_label,
        orderId: item.order_id,
      })),
    },
    topVendors: {
      title: 'Top Vendors',
      items: (payload?.top_vendors || []).map((vendor) => ({
        id: vendor.id,
        name: vendor.name,
        orders: vendor.orders,
        online: vendor.online,
        initials: vendor.initials,
        color: vendor.color,
        statusLabel: vendor.status_label,
      })),
    },
    availability: {
      title: 'Availability',
      zones: (payload?.availability?.zones || []).map((zone) => ({
        id: zone.id,
        name: zone.name,
        level: zone.level,
        levelLabel: zone.level_label,
        percent: zone.percent,
        ridersReady: zone.riders_ready,
      })),
      manageLabel: 'Manage Zones',
    },
  }
}

export async function fetchAdminDashboard() {
  try {
    const { data } = await api.get('/admin/dashboard')
    return data?.data ?? null
  } catch (err) {
    throw new Error(getApiFieldError(err, 'form') || 'Could not load dashboard.')
  }
}

export async function fetchAdminNavCounts() {
  try {
    const { data } = await api.get('/admin/nav-counts')
    return data?.data ?? {}
  } catch {
    return {}
  }
}
