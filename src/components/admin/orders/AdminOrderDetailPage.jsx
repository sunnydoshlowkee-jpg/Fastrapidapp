import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { ADMIN_ORDERS_PATH } from '../../../services/data/adminOrders.mock'
import AdminOrderDetailItems from './AdminOrderDetailItems'
import AdminOrderDetailMobilePage from './AdminOrderDetailMobilePage'
import AdminOrderDetailSidebar from './AdminOrderDetailSidebar'
import AdminOrderDetailStakeholders from './AdminOrderDetailStakeholders'
import AdminOrderDetailStepper from './AdminOrderDetailStepper'

export default function AdminOrderDetailPage({ order }) {
  return (
    <>
      <div className="lg:hidden">
        <AdminOrderDetailMobilePage order={order} />
      </div>

      <div className="hidden p-6 lg:block">
      <Link
        to={ADMIN_ORDERS_PATH}
        className="mb-4 inline-flex items-center gap-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
      >
        <ArrowLeft size={16} strokeWidth={2} aria-hidden />
        Back to orders
      </Link>

      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Order {order.id}</h1>
          <p className="mt-1 text-sm text-gray-500">
            {order.placedAt} • ID: {order.referenceId}
          </p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-bold uppercase tracking-wide text-gray-700 transition-colors hover:bg-gray-50"
          >
            {order.printReceiptLabel}
          </button>
          <button
            type="button"
            className="rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            {order.updateStatusLabel}
          </button>
        </div>
      </header>

      <div className="space-y-6">
        <AdminOrderDetailStepper steps={order.steps} />
        <AdminOrderDetailStakeholders stakeholders={order.stakeholders} />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
          <div className="xl:col-span-2">
            <AdminOrderDetailItems items={order.items} />
          </div>
          <div>
            <AdminOrderDetailSidebar adminActions={order.adminActions} notes={order.notes} />
          </div>
        </div>
      </div>
      </div>
    </>
  )
}
