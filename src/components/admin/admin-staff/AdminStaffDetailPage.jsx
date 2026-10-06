import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { fetchAdminStaffDetail, formatAdminDate } from '../../../services/adminStaffService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import AdminStaffStatusBadge from './AdminStaffStatusBadge'

export default function AdminStaffDetailPage() {
  const { adminId } = useParams()
  const [admin, setAdmin] = useState(null)
  const [activity, setActivity] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view this administrator.')
      setLoading(false)
      return
    }
    setLoading(true)
    setError('')
    try {
      const result = await fetchAdminStaffDetail(adminId)
      setAdmin(result.admin)
      setActivity(result.activity || [])
    } catch (err) {
      setError(err.response?.data?.message || 'Unable to load this administrator.')
    } finally {
      setLoading(false)
    }
  }, [adminId])

  useEffect(() => {
    load()
  }, [load])

  if (loading) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-sm text-gray-500">
        Loading administrator…
      </div>
    )
  }

  if (error || !admin) {
    return (
      <div className="p-6">
        <Link
          to="/admin/admins"
          className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} strokeWidth={2} /> Back to Admin Users
        </Link>
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error || 'Administrator not found.'}
        </div>
      </div>
    )
  }

  const initials = (admin.name || admin.email || '?')
    .split(' ')
    .filter(Boolean)
    .map((p) => p[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <div className="h-full overflow-y-auto p-6">
      <Link
        to="/admin/admins"
        className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-gray-500 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} /> Back to Admin Users
      </Link>

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="border-b border-gray-100 p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-base font-bold text-rapid-orange">
              {initials}
            </span>
            <div className="min-w-0">
              <h1 className="text-lg font-bold text-gray-900">{admin.name}</h1>
              <p className="text-sm text-gray-500">{admin.email}</p>
              <div className="mt-1.5 flex flex-wrap items-center gap-2">
                <span className="rounded-md bg-gray-100 px-2 py-0.5 text-xs font-semibold text-gray-700">
                  {admin.roleLabel}
                </span>
                <AdminStaffStatusBadge status={admin.status} label={admin.statusLabel} />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-3">
          <DetailBlock label="Phone">
            <p className="text-sm text-gray-900">{admin.phone || '—'}</p>
          </DetailBlock>
          <DetailBlock label="Last Login">
            <p className="text-sm text-gray-900">{formatAdminDate(admin.lastLoginAt)}</p>
          </DetailBlock>
          <DetailBlock label="Created At">
            <p className="text-sm text-gray-900">{formatAdminDate(admin.createdAt)}</p>
          </DetailBlock>
        </div>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-100">
        <div className="border-b border-gray-100 px-6 py-4">
          <h2 className="text-sm font-bold text-gray-900">Recent Activity</h2>
        </div>
        {activity.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-gray-500">No recorded activity yet.</p>
        ) : (
          <ul className="divide-y divide-gray-50">
            {activity.map((log) => (
              <li key={log.id} className="flex items-start justify-between gap-4 px-6 py-3.5">
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">{log.description || log.action}</p>
                  {log.category ? (
                    <p className="text-xs text-gray-400 uppercase tracking-wide">{log.category}</p>
                  ) : null}
                </div>
                <div className="shrink-0 text-right">
                  <p className="text-xs text-gray-500">{formatAdminDate(log.created_at)}</p>
                  {log.ip_address ? <p className="text-[11px] text-gray-400">{log.ip_address}</p> : null}
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  )
}

function DetailBlock({ label, children }) {
  return (
    <div>
      <p className="text-xs font-bold uppercase tracking-wider text-gray-400">{label}</p>
      {children}
    </div>
  )
}
