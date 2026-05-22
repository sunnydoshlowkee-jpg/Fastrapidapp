import { Bell, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminRiderTrackingMap from './AdminRiderTrackingMap'
import AdminRiderTrackingPanel from './AdminRiderTrackingPanel'

export default function AdminRiderTrackingPage({ tracking }) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col">
      <header className="flex shrink-0 items-center gap-4 border-b border-gray-200 bg-white px-6 py-3">
        <div className="relative mx-auto w-full max-w-xl flex-1">
          <Search
            size={18}
            className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            aria-hidden
          />
          <input
            type="search"
            placeholder={tracking.searchPlaceholder}
            className="w-full rounded-full border border-gray-200 bg-gray-50 py-2.5 pl-11 pr-4 text-sm text-gray-900 outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
          />
        </div>
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <div className="flex min-h-0 flex-1">
        <AdminRiderTrackingMap
          map={tracking.map}
          telemetryLabel={tracking.telemetryLabel}
          enRouteLabel={tracking.enRouteLabel}
          merchantLabel={tracking.merchantMarkerLabel}
          destinationLabel={tracking.destinationMarkerLabel}
        />
        <AdminRiderTrackingPanel
          rider={tracking.rider}
          stats={tracking.stats}
          order={tracking.order}
          liveLabel={tracking.liveLabel}
          estArrivalLabel={tracking.estArrivalLabel}
          distanceLeftLabel={tracking.distanceLeftLabel}
          orderTimelineTitle={tracking.orderTimelineTitle}
          callRiderLabel={tracking.callRiderLabel}
          messageLabel={tracking.messageLabel}
          reassignLabel={tracking.reassignLabel}
        />
      </div>
    </div>
  )
}
