import api from './api'
import { ADMIN_USERS_PATH } from './data/adminUsers.mock'
import { ADMIN_USER_DETAIL_UI } from './data/adminUserDetail.ui'

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
export async function fetchAdminUsers({
  search = '',
  status = 'all',
  page = 1,
  perPage = 15,
} = {}) {
  const { data } = await api.get('/admin/users', {
    params: {
      search: search.trim() || undefined,
      status,
      page,
      per_page: perPage,
    },
  })

  return data.data
}

export async function fetchAdminUserDetail(userId) {
  const { data } = await api.get(`/admin/users/${userId}`)
  return data.data
}

/**
 * @param {Record<string, unknown>} payload
 */
export function mapAdminUserDetailFromApi(payload) {
  const ui = ADMIN_USER_DETAIL_UI
  const profile = payload.profile ?? {}
  const metrics = payload.metrics ?? {}
  const displayId = profile.display_id
  const numericId = profile.id

  return {
    id: displayId,
    numericId,
    name: profile.name,
    avatarTone: profile.avatar_tone,
    avatarGlyph: profile.avatar_glyph,
    verified: Boolean(profile.verified),
    verifiedLabel: profile.verified_label,
    email: profile.email,
    phone: profile.phone,
    joined: profile.joined_label ?? profile.joined,
    status: profile.status,
    suspendLabel: profile.suspend_label,
    banLabel: profile.ban_label,
    kpis: [
      {
        id: 'orders',
        label: 'Total Orders',
        value: Number(metrics.orders_count ?? 0).toLocaleString(),
        icon: 'truck',
      },
      {
        id: 'spent',
        label: 'Total Spent',
        value: formatNaira(metrics.total_spent),
        icon: 'bank',
      },
      {
        id: 'wallet',
        label: 'Wallet Balance',
        value: formatNaira(metrics.wallet_balance),
        icon: 'external',
        tone: 'violet',
      },
    ],
    tabs: ui.tabs.map((tab) => {
      if (tab.id === 'notes') {
        return { ...tab, count: (payload.notes ?? []).length }
      }
      if (tab.id === 'orders') {
        return { ...tab, count: metrics.orders_count ?? 0 }
      }
      if (tab.id === 'transactions') {
        return { ...tab, count: (payload.transactions ?? []).length }
      }
      return tab
    }),
    orderHistory: {
      columns: ui.orderHistory.columns,
      rows: (payload.orders ?? []).map((row) => ({
        id: row.id,
        dateDay: row.date_day,
        dateTime: row.date_time,
        destination: row.destination,
        amount: row.amount,
        status: row.status,
        statusLabel: row.status_label,
      })),
      viewAllLabel: ui.orderHistory.viewAllLabel,
    },
    transactions: {
      columns: ui.transactions.columns,
      rows: (payload.transactions ?? []).map((row) => ({
        id: row.id,
        dateDay: row.date_day,
        dateTime: row.date_time,
        channel: row.channel,
        amount: row.amount,
        amountTone: row.amount_tone,
        status: row.status,
        statusLabel: row.status_label,
      })),
    },
    notes: {
      ...ui.notes,
      items: (payload.notes ?? []).map((note) => ({
        id: note.id,
        author: note.author,
        createdAt: note.created_at,
        body: note.body,
      })),
    },
    suspendModal: {
      ...ui.suspendModal,
      targetLabel: `Target: ${displayId} • ID: ${numericId}`,
    },
    banModal: {
      ...ui.banModal,
      targetLabel: `Target: ${displayId} • ID: ${numericId}`,
    },
    breadcrumbs: [
      { label: 'Users', path: ADMIN_USERS_PATH },
      { label: profile.name },
    ],
  }
}

/**
 * @param {Record<string, unknown>} user
 */
export function mapAdminUserFromApi(user) {
  return {
    id: user.id,
    displayId: user.display_id,
    name: user.name,
    avatarTone: user.avatar_tone,
    avatarGlyph: user.avatar_glyph,
    email: user.email,
    phone: user.phone,
    status: user.status,
    statusLabel: user.status_label,
    orders: user.orders,
    wallet: user.wallet,
    joined: user.joined,
    last: user.last,
  }
}

/**
 * @param {ReturnType<typeof mapAdminUserFromApi>} user
 */
export function mapAdminUserForMobile(user) {
  return {
    id: user.id,
    name: user.name,
    initials: user.avatarGlyph,
    phone: user.phone,
    status: user.status,
    statusLabel: user.statusLabel,
    avatarKind: 'initials',
    avatarBg: mobileAvatarBg(user.avatarTone),
    avatarText: mobileAvatarText(user.avatarTone),
  }
}

function mobileAvatarBg(tone) {
  if (tone?.includes('violet')) return '#C0C1FF'
  if (tone?.includes('rose')) return '#FECDD3'
  if (tone?.includes('gray-900')) return '#191C1D'
  return '#E7E8E9'
}

function mobileAvatarText(tone) {
  if (tone?.includes('violet')) return '#06006C'
  if (tone?.includes('rose')) return '#9F1239'
  if (tone?.includes('gray-900')) return '#FFFFFF'
  return '#454557'
}

/**
 * @param {{ from: number|null, to: number|null, total: number }} pagination
 */
export function formatPaginationSummary(pagination) {
  const from = pagination.from ?? 0
  const to = pagination.to ?? 0
  const total = pagination.total ?? 0

  return {
    showingRange: total === 0 ? '0 to 0' : `${from} to ${to}`,
    showingSuffix: `of ${total.toLocaleString()} entries`,
  }
}

/**
 * @param {{ current_page: number, last_page: number }} pagination
 */
export function buildPaginationPages(pagination) {
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
