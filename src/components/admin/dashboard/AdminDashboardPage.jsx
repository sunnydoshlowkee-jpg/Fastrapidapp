import { useEffect, useState } from 'react'
import {
  fetchAdminDashboard,
  mapAdminDashboardFromApi,
} from '../../../services/adminDashboardService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import api from '../../../services/api'
import AdminDashboardAvailability from './AdminDashboardAvailability'
import AdminDashboardExceptionAlerts from './AdminDashboardExceptionAlerts'
import AdminDashboardKpiCards from './AdminDashboardKpiCards'
import AdminDashboardLiveTelemetry from './AdminDashboardLiveTelemetry'
import AdminDashboardTopVendors from './AdminDashboardTopVendors'

export default function AdminDashboardPage() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const load = async () => {
      if (!getAdminAuthToken()) {
        setError('Please sign in to view the dashboard.')
        setLoading(false)
        return
      }

      try {
        setLoading(true)
        setError('')

        let adminName = 'Admin'
        try {
          const { data: meData } = await api.get('/admin/me')
          adminName = meData?.data?.user?.name?.split(' ')[0] || adminName
        } catch {
          // Keep default greeting name.
        }

        const payload = await fetchAdminDashboard()
        setData(mapAdminDashboardFromApi(payload, adminName))
      } catch (err) {
        setData(null)
        setError(err.message || 'Could not load dashboard.')
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6 text-sm text-gray-500">
        Loading dashboard...
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6 text-center text-sm text-gray-500">
        {error || 'Dashboard unavailable.'}
      </div>
    )
  }

  return (
    <div className="space-y-6 p-5 lg:p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">
            {data.greeting.title}
          </h1>
          <p className="mt-1 text-sm text-[#584237]">{data.greeting.subtitle}</p>
        </div>
        <span className="hidden w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700 sm:inline-flex">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          {data.greeting.systemStatus}
        </span>
      </div>

      <AdminDashboardKpiCards kpis={data.kpis} />

      <AdminDashboardExceptionAlerts exceptions={data.exceptions} />

      <AdminDashboardLiveTelemetry telemetry={data.telemetry} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminDashboardAvailability availability={data.availability} />
        <div className="hidden lg:block">
          <AdminDashboardTopVendors topVendors={data.topVendors} />
        </div>
      </div>
    </div>
  )
}
