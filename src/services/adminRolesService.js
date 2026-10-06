import api from './api'

export const ADMIN_ROLES_PATH = '/admin/roles'

export async function fetchAdminRoles() {
  const { data } = await api.get('/admin/roles')
  return data.data
}

export async function fetchAdminRoleDetail(roleId) {
  const { data } = await api.get(`/admin/roles/${roleId}`)
  return data.data
}

export async function createAdminRole({ name, permissions }) {
  const { data } = await api.post('/admin/roles', {
    name,
    permissions: permissions || [],
  })
  return data
}

export async function updateAdminRole(roleId, { name, permissions }) {
  const { data } = await api.put(`/admin/roles/${roleId}`, {
    name,
    permissions: permissions || [],
  })
  return data
}

export async function deleteAdminRole(roleId) {
  const { data } = await api.delete(`/admin/roles/${roleId}`)
  return data
}

export async function fetchAllPermissions() {
  const { data } = await api.get('/admin/permissions')
  return data.data
}

export function mapAdminRoleFromApi(role) {
  return {
    id: role.id,
    name: role.name,
    label: role.label,
    isProtected: Boolean(role.is_protected),
    permissionCount: role.permission_count ?? 0,
    userCount: role.user_count ?? 0,
    createdAt: role.created_at,
  }
}
