import { useCallback, useEffect, useMemo, useState } from 'react'
import { fetchAdminPermissions } from '../../../services/adminPermissionsService'
import { getAdminAuthToken } from '../../../services/adminAuthService'

export default function PermissionsPage() {
  const [groups, setGroups] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view permissions.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await fetchAdminPermissions()
      setGroups(result.groups || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load permissions.')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    load()
  }, [load])

  const totals = useMemo(() => {
    let count = 0
    groups.forEach((g) => {
      count += g.permissions.length
    })
    return { groups: groups.length, permissions: count }
  }, [groups])

  if (loading) {
    return <div className="flex h-full items-center justify-center p-12 text-sm text-gray-500">Loading permissions…</div>
  }

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col p-6">
      <header className="shrink-0">
        <h1 className="text-lg font-bold text-gray-900">Permissions</h1>
        <p className="mt-0.5 text-sm text-gray-500">
          Read-only catalog of all {totals.permissions} permissions across {totals.groups} modules.
          Permissions are assigned to roles, and roles are assigned to administrators.
        </p>
      </header>

      {error ? (
        <div role="alert" className="mt-4 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      <div className="mt-5 grid min-h-0 grid-cols-1 gap-5 overflow-y-auto pb-6 md:grid-cols-2">
        {groups.map((group) => (
          <section key={group.key} className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-100">
            <header className="flex items-center justify-between border-b border-gray-100 px-5 py-3">
              <h2 className="text-sm font-bold text-gray-900">{group.group}</h2>
              <span className="rounded-full bg-orange-50 px-2.5 py-0.5 text-[11px] font-bold text-rapid-orange">
                {group.permissions.length}
              </span>
            </header>
            <ul className="divide-y divide-gray-50">
              {group.permissions.map((permission) => (
                <li key={permission.id} className="flex items-start justify-between gap-3 px-5 py-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{permission.label}</p>
                    <p className="truncate text-xs text-gray-400">
                      <code>{permission.name}</code>
                    </p>
                  </div>
                  <span className="mt-1 shrink-0 rounded-md bg-gray-100 px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wide text-gray-500">
                    {permission.name?.split('.')?.[0] || 'perm'}
                  </span>
                </li>
              ))}
            </ul>
          </section>
        ))}
        {groups.length === 0 ? (
          <p className="col-span-full py-12 text-center text-sm text-gray-500">No permissions found.</p>
        ) : null}
      </div>
    </div>
  )
}
