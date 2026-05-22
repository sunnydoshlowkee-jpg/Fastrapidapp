import { ADMIN_DASHBOARD } from '../../../services/data/adminDashboard.mock'
import AdminDashboardAvailability from './AdminDashboardAvailability'
import AdminDashboardExceptionAlerts from './AdminDashboardExceptionAlerts'
import AdminDashboardKpiCards from './AdminDashboardKpiCards'
import AdminDashboardLiveTelemetry from './AdminDashboardLiveTelemetry'
import AdminDashboardTopVendors from './AdminDashboardTopVendors'

export default function AdminDashboardPage() {
  const data = ADMIN_DASHBOARD

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.greeting.title}</h1>
          <p className="mt-1 text-sm text-gray-500">{data.greeting.subtitle}</p>
        </div>
        <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden />
          {data.greeting.systemStatus}
        </span>
      </div>

      <AdminDashboardKpiCards kpis={data.kpis} />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <AdminDashboardLiveTelemetry telemetry={data.telemetry} />
        </div>
        <div>
          <AdminDashboardExceptionAlerts exceptions={data.exceptions} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <AdminDashboardTopVendors topVendors={data.topVendors} />
        <AdminDashboardAvailability availability={data.availability} />
      </div>
    </div>
  )
}
