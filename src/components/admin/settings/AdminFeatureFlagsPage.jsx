import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import {
  ADMIN_FEATURE_FLAGS,
  getInitialFlagState,
} from '../../../services/data/adminFeatureFlags.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import AdminFeatureFlagCard from './AdminFeatureFlagCard'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

export default function AdminFeatureFlagsPage() {
  const data = ADMIN_FEATURE_FLAGS
  const baseline = useMemo(() => getInitialFlagState(data.flags), [data.flags])
  const [saved, setSaved] = useState(baseline)
  const [flags, setFlags] = useState(baseline)

  const hasUnsaved = useMemo(
    () => data.flags.some((f) => flags[f.id] !== saved[f.id]),
    [data.flags, flags, saved],
  )

  const toggleFlag = (id) => {
    setFlags((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleDiscard = () => setFlags({ ...saved })

  const handleDeploy = () => setSaved({ ...flags })

  return (
    <div className={hasUnsaved ? 'pb-28' : ''}>
      <div className="p-6">
        <header className="mb-6 flex items-start justify-between gap-4">
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

        <div className="mb-6 max-w-3xl">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
          <p className="mt-2 text-sm leading-relaxed text-gray-600">{data.description}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {data.flags.map((flag) => (
            <AdminFeatureFlagCard
              key={flag.id}
              flag={flag}
              enabled={flags[flag.id]}
              onToggle={toggleFlag}
            />
          ))}
        </div>
      </div>

      {hasUnsaved ? (
        <div className="fixed bottom-0 left-0 right-0 z-20 border-t border-gray-200 bg-white px-6 py-4 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] lg:left-60 xl:left-64">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm font-bold text-gray-900">{data.unsavedBar.title}</p>
              <p className="text-sm text-gray-500">{data.unsavedBar.subtitle}</p>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleDiscard}
                className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-300"
              >
                {data.unsavedBar.discardLabel}
              </button>
              <button
                type="button"
                onClick={handleDeploy}
                className="rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15]"
              >
                {data.unsavedBar.deployLabel}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
