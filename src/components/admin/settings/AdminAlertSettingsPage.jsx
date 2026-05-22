import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AlertTriangle, Bell, Save, Store } from 'lucide-react'
import {
  ADMIN_ALERT_SETTINGS,
  getInitialAlertChannels,
} from '../../../services/data/adminAlertSettings.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminAlertChannelToggle from './AdminAlertChannelToggle'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

const sectionIcons = {
  alert: AlertTriangle,
  store: Store,
}

export default function AdminAlertSettingsPage() {
  const data = ADMIN_ALERT_SETTINGS
  const baseline = useMemo(
    () => getInitialAlertChannels(data.sections),
    [data.sections],
  )
  const [channels, setChannels] = useState(baseline)

  const toggleChannel = (eventId, channel) => {
    setChannels((prev) => ({
      ...prev,
      [eventId]: { ...prev[eventId], [channel]: !prev[eventId][channel] },
    }))
  }

  const handleReset = () => setChannels(baseline)

  return (
    <div className="p-6">
      <header className="mb-4 flex items-start justify-between gap-4">
        <AdminSettingsBreadcrumbs items={data.breadcrumbs} />
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </Link>
      </header>

      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <p className="max-w-2xl text-sm leading-relaxed text-gray-600">{data.description}</p>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={handleReset}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50"
          >
            {data.resetLabel}
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Save size={16} strokeWidth={2} aria-hidden />
            {data.saveLabel}
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {data.sections.map((section) => {
          const SectionIcon = sectionIcons[section.icon] ?? AlertTriangle
          return (
            <article
              key={section.id}
              className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm"
            >
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-4">
                <div className="flex items-center gap-3">
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg ${
                      section.id === 'critical'
                        ? 'bg-red-50 text-red-600'
                        : 'bg-amber-50 text-amber-800'
                    }`}
                  >
                    <SectionIcon size={18} strokeWidth={2} aria-hidden />
                  </span>
                  <h2 className="text-base font-bold text-gray-900">{section.title}</h2>
                </div>
                {section.priorityBadge ? (
                  <span className="rounded-full bg-pink-50 px-3 py-1 text-[10px] font-bold uppercase tracking-wide text-pink-700">
                    {section.priorityBadge}
                  </span>
                ) : null}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[640px] border-collapse">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50/50">
                      <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {data.eventTypeColumn}
                      </th>
                      <th className="w-28 px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {data.channels.inApp}
                      </th>
                      <th className="w-28 px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {data.channels.email}
                      </th>
                      <th className="w-28 px-3 py-3 text-center text-[10px] font-bold uppercase tracking-wider text-gray-500">
                        {data.channels.sms}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {section.events.map((event) => (
                      <tr
                        key={event.id}
                        className="border-b border-gray-50 last:border-0"
                      >
                        <td className="px-5 py-4">
                          <p className="text-sm font-semibold text-gray-900">{event.title}</p>
                          <p className="mt-0.5 text-xs text-gray-500">{event.description}</p>
                        </td>
                        {(['inApp', 'email', 'sms']).map((ch) => (
                          <td key={ch} className="px-3 py-4 text-center">
                            <AdminAlertChannelToggle
                              enabled={channels[event.id][ch]}
                              onChange={() => toggleChannel(event.id, ch)}
                              label={`${event.title} ${data.channels[ch]}`}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </article>
          )
        })}
      </div>
    </div>
  )
}
