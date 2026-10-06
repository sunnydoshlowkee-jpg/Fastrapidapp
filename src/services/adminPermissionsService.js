import api from './api'

export const ADMIN_PERMISSIONS_PATH = '/admin/permissions'

export async function fetchAdminPermissions() {
  const { data } = await api.get('/admin/permissions')
  return data.data
}

/**
 * Map the grouped permission catalog into a flat lookup for checkbox UIs.
 * @param {Array<{ id: number, name: string, label: string }>} permissions
 */
export function buildPermissionNameLookup(permissions) {
  const map = {}
  for (const p of permissions) {
    map[p.name] = p.label
  }
  return map
}
