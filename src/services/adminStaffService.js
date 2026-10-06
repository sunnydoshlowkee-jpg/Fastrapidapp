import api from './api'

export const ADMIN_STAFF_PATH = '/admin/admins'

/**
 * @param {{ search?: string, status?: string, role?: string, page?: number, perPage?: number }} params
 */
export async function fetchAdminStaff({
  search = '',
  status = 'all',
  role = '',
  page = 1,
  perPage = 15,
} = {}) {
  const { data } = await api.get('/admin/admins', {
    params: {
      search: search.trim() || undefined,
      status,
      role: role || undefined,
      page,
      per_page: perPage,
    },
  })

  return data.data
}

export async function fetchAdminStaffDetail(adminId) {
  const { data } = await api.get(`/admin/admins/${adminId}`)
  const payload = data.data
  if (!payload) return payload
  return {
    ...payload,
    admin: mapAdminStaffFromApi(payload.admin),
  }
}

export async function createAdminInvitation({ name, email, role }) {
  const { data } = await api.post('/admin/admins', { name, email, role })
  return data
}

export async function updateAdminProfile(adminId, { name, phone }) {
  const { data } = await api.put(`/admin/admins/${adminId}`, {
    name,
    phone: phone || undefined,
  })
  return data
}

export async function changeAdminRole(adminId, role) {
  const { data } = await api.post(`/admin/admins/${adminId}/role`, { role })
  return data
}

export async function setAdminStatus(adminId, action) {
  const valid = ['suspend', 'activate', 'deactivate']
  if (!valid.includes(action)) {
    throw new Error('Unknown admin action.')
  }
  const { data } = await api.post(`/admin/admins/${adminId}/${action}`)
  return data
}

export async function resendAdminInvitation(adminId) {
  const { data } = await api.post(`/admin/admins/${adminId}/resend-invitation`)
  return data
}

export async function deleteAdmin(adminId) {
  const { data } = await api.delete(`/admin/admins/${adminId}`)
  return data
}

const STATUS_LABELS = {
  active: 'Active',
  pending: 'Pending',
  suspended: 'Suspended',
  deactivated: 'Deactivated',
}

export function mapAdminStaffFromApi(admin) {
  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    phone: admin.phone,
    role: admin.role,
    roleLabel: admin.role_label || admin.role,
    status: admin.status,
    statusLabel: STATUS_LABELS[admin.status] ?? admin.status,
    lastLoginAt: admin.last_login_at,
    createdAt: admin.created_at,
  }
}

/**
 * @param {ReturnType<typeof mapAdminStaffFromApi>} admin
 */
export function mapAdminStaffForMobile(admin) {
  const initials = (admin.name || admin.email || '?')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return {
    id: admin.id,
    name: admin.name,
    email: admin.email,
    initials: initials || '?',
    roleLabel: admin.roleLabel,
    status: admin.status,
    statusLabel: admin.statusLabel,
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

export function formatPaginationSummary(pagination) {
  const from = pagination.from ?? 0
  const to = pagination.to ?? 0
  const total = pagination.total ?? 0

  return {
    showingRange: total === 0 ? '0 to 0' : `${from} to ${to}`,
    showingSuffix: `of ${total.toLocaleString()} admins`,
  }
}

export function formatAdminDate(iso) {
  if (!iso) return 'Never'
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return '—'
  return d.toLocaleString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}
