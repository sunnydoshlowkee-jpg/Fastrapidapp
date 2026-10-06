import { useCallback, useEffect, useMemo, useState } from 'react'
import { Plus, Shield, Trash2 } from 'lucide-react'
import {
  createAdminRole,
  deleteAdminRole,
  fetchAdminRoleDetail,
  fetchAdminRoles,
  mapAdminRoleFromApi,
  updateAdminRole,
} from '../../../services/adminRolesService'
import { fetchAdminPermissions } from '../../../services/adminPermissionsService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import AdminRoleEditorModal from './AdminRoleEditorModal'

export default function RolesPage() {
  const [roles, setRoles] = useState([])
  const [selectedId, setSelectedId] = useState(null)
  const [groups, setGroups] = useState([])
  const [detail, setDetail] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [editorOpen, setEditorOpen] = useState(false)
  const [editorRole, setEditorRole] = useState(null) // null = create

  const loadRoles = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view roles.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const [rolesResult, permsResult] = await Promise.all([
        fetchAdminRoles(),
        fetchAdminPermissions(),
      ])
      setRoles(rolesResult.roles.map(mapAdminRoleFromApi))
      setGroups(permsResult.groups || [])
      if (selectedId == null && rolesResult.roles.length > 0) {
        setSelectedId(rolesResult.roles[0].id)
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load roles.')
    } finally {
      setLoading(false)
    }
  }, [selectedId])

  useEffect(() => {
    loadRoles()
  }, [loadRoles])

  const loadDetail = useCallback(async (id) => {
    setDetailLoading(true)
    setError('')
    try {
      const result = await fetchAdminRoleDetail(id)
      setDetail(result)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load role details.')
    } finally {
      setDetailLoading(false)
    }
  }, [])

  useEffect(() => {
    if (selectedId != null) {
      loadDetail(selectedId)
    } else {
      setDetail(null)
    }
  }, [selectedId, loadDetail])

  const selectedRole = roles.find((r) => r.id === selectedId) || null
  const selectedPermissions = useMemo(() => new Set(detail?.permission_ids || []), [detail])
  const selectedUsers = detail?.users || []

  const openCreate = () => {
    setEditorRole(null)
    setEditorOpen(true)
  }
  const openEdit = () => {
    setEditorRole(selectedRole)
    setEditorOpen(true)
  }

  const handleDelete = async () => {
    if (!selectedRole) return
    if (!window.confirm(`Delete role "${selectedRole.label}"?`)) return
    try {
      await deleteAdminRole(selectedRole.id)
      await loadRoles()
      setSelectedId(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to delete the role.')
    }
  }

  if (loading) {
    return <div className="flex h-full items-center justify-center p-12 text-sm text-gray-500">Loading roles…</div>
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col p-6">
      <header className="flex shrink-0 flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg font-bold text-gray-900">Roles</h1>
          <p className="text-sm text-gray-500">Roles are collections of permissions. Assign permissions through roles, not to individual users.</p>
        </div>
        <button
          type="button"
          onClick={openCreate}
          className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#E84A15]"
        >
          <Plus size={16} strokeWidth={2} aria-hidden />
          Create Role
        </button>
      </header>

      {error ? (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-4 grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[300px,1fr]">
        <aside className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          <div className="max-h-[70vh] overflow-y-auto p-2">
            {roles.map((role) => (
              <button
                key={role.id}
                type="button"
                onClick={() => setSelectedId(role.id)}
                className={`flex w-full items-start gap-3 rounded-lg px-3 py-3 text-left transition-colors ${
                  selectedId === role.id ? 'bg-orange-50 ring-1 ring-orange-100' : 'hover:bg-gray-50'
                }`}
              >
                <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${role.isProtected ? 'bg-amber-100 text-amber-700' : 'bg-orange-100 text-rapid-orange'}`}>
                  <Shield size={16} strokeWidth={2} />
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="truncate text-sm font-bold text-gray-900">{role.label}</p>
                    {role.isProtected ? (
                      <span className="inline-flex shrink-0 rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-700">Built-in</span>
                    ) : null}
                  </div>
                  <p className="mt-0.5 text-xs text-gray-500">
                    {role.permissionCount} permissions · {role.userCount} users
                  </p>
                </div>
              </button>
            ))}
            {roles.length === 0 ? (
              <p className="px-3 py-8 text-center text-sm text-gray-500">No roles found.</p>
            ) : null}
          </div>
        </aside>

        <section className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
          {!selectedRole ? (
            <div className="flex flex-col items-center justify-center gap-2 p-16 text-center">
              <Shield size={28} strokeWidth={1.5} className="text-gray-300" />
              <p className="text-sm text-gray-500">Select a role to manage its permissions and users.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-6 py-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-base font-bold text-gray-900">{selectedRole.label}</h2>
                    {selectedRole.isProtected ? (
                      <span className="inline-flex rounded-md bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-700">
                        Built-in · protected
                      </span>
                    ) : null}
                  </div>
                  <p className="text-xs text-gray-500">Role key: <code className="text-gray-700">{selectedRole.name}</code></p>
                </div>
                <div className="flex items-center gap-2">
                  {!selectedRole.isProtected ? (
                    <>
                      <button
                        type="button"
                        onClick={openEdit}
                        className="rounded-lg bg-rapid-orange px-3.5 py-2 text-sm font-bold text-white transition-colors hover:bg-[#E84A15]"
                      >
                        Edit permissions
                      </button>
                      <button
                        type="button"
                        onClick={handleDelete}
                        disabled={selectedRole.userCount > 0}
                        title={selectedRole.userCount > 0 ? 'Assigned to users and cannot be deleted.' : 'Delete role'}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-40"
                        aria-label={`Delete ${selectedRole.label}`}
                      >
                        <Trash2 size={16} strokeWidth={2} />
                      </button>
                    </>
                  ) : (
                    <span className="text-xs font-semibold text-gray-400">Protected role — cannot be modified</span>
                  )}
                </div>
              </div>

              <div className="grid min-h-0 grid-cols-1 gap-6 p-6 xl:grid-cols-[1fr,280px]">
                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Permissions ({selectedPermissions.size})</h3>
                  {detailLoading ? (
                    <p className="mt-4 text-sm text-gray-500">Loading permissions…</p>
                  ) : groups.length === 0 ? (
                    <p className="mt-4 text-sm text-gray-500">No permission catalog available.</p>
                  ) : (
                    <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
                      {groups.map((group) => {
                        const held = group.permissions.filter((p) => selectedPermissions.has(p.id))
                        if (held.length === 0) return null
                        return (
                          <div key={group.key} className="rounded-lg border border-gray-100 bg-gray-50/50 p-3">
                            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">{group.group}</p>
                            <ul className="mt-2 space-y-1">
                              {held.map((p) => (
                                <li key={p.id} className="flex items-start gap-2">
                                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-rapid-orange" />
                                  <span className="text-sm text-gray-700">{p.label}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      })}
                      {selectedPermissions.size === 0 ? (
                        <p className="text-sm text-gray-500">This role has no permissions assigned.</p>
                      ) : null}
                    </div>
                  )}
                </div>

                <aside className="rounded-lg border border-gray-100 p-4">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-gray-400">Assigned users ({selectedUsers.length})</h3>
                  {selectedUsers.length === 0 ? (
                    <p className="mt-3 text-sm text-gray-500">No users assigned.</p>
                  ) : (
                    <ul className="mt-3 space-y-3">
                      {selectedUsers.map((u) => (
                        <li key={u.id} className="flex items-center justify-between gap-2">
                          <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-gray-900">{u.name}</p>
                            <p className="truncate text-xs text-gray-500">{u.email}</p>
                          </div>
                          <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold ${u.status === 'active' ? 'bg-emerald-50 text-emerald-700' : 'bg-gray-100 text-gray-500'}`}>
                            {u.status}
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </aside>
              </div>
            </>
          )}
        </section>
      </div>

      <AdminRoleEditorModal
        isOpen={editorOpen}
        onClose={() => setEditorOpen(false)}
        role={editorRole}
        initialPermissions={detail?.permissions || []}
        groups={groups}
        onSubmit={async (payload) => {
          if (editorRole) {
            await updateAdminRole(editorRole.id, payload)
          } else {
            const created = await createAdminRole(payload)
            const createdRole = created?.data || created
            if (createdRole?.id) setSelectedId(createdRole.id)
          }
          await loadRoles()
        }}
      />
    </div>
  )
}
