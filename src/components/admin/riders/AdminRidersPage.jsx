import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Star } from 'lucide-react'
import { getRiderTrackingPath } from '../../../services/data/adminRiderTracking.mock'
import { ADMIN_RIDERS, ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'
import AdminRiderStatusBadge from './AdminRiderStatusBadge'
import AdminRidersStatCards from './AdminRidersStatCards'

export default function AdminRidersPage() {
  const data = ADMIN_RIDERS
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    let list = data.riders
    if (activeTab !== 'all') {
      list = list.filter((r) => r.status === activeTab)
    }
    const q = search.trim().toLowerCase()
    if (!q) return list
    return list.filter(
      (r) =>
        r.id.toLowerCase().includes(q) ||
        r.name.toLowerCase().includes(q),
    )
  }, [activeTab, data.riders, search])

  return (
    <div className="p-6">
      <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">{data.title}</h1>
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
        >
          <Plus size={16} strokeWidth={2.5} aria-hidden />
          {data.onboardLabel}
        </button>
      </header>

      <AdminRidersStatCards stats={data.stats} />

      <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
          <nav className="flex flex-wrap gap-2" aria-label="Rider status filters">
            {data.tabs.map((tab) => {
              const isActive = activeTab === tab.id
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                    isActive
                      ? 'bg-gray-200 text-gray-900'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {tab.label}
                </button>
              )
            })}
          </nav>

          <div className="relative w-full max-w-xs sm:w-64">
            <Search
              size={16}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              aria-hidden
            />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={data.searchPlaceholder}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm outline-none placeholder:text-gray-400 focus:border-rapid-orange/40 focus:ring-2 focus:ring-rapid-orange/15"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] border-collapse text-left">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50/80">
                {Object.values(data.columns).map((label) => (
                  <th
                    key={label}
                    className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500 first:pl-6"
                  >
                    {label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                    No riders match this filter.
                  </td>
                </tr>
              ) : (
                filtered.map((rider) => (
                  <tr
                    key={rider.id}
                    className="border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                  >
                    <td className="px-6 py-4">
                      <Link
                        to={`${ADMIN_RIDERS_PATH}/${rider.id}`}
                        className="flex items-center gap-3 transition-colors hover:opacity-90"
                      >
                        <span
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${rider.avatarTone}`}
                        >
                          {rider.initials}
                        </span>
                        <div>
                          <p className="text-sm font-bold text-gray-900 transition-colors hover:text-rapid-orange">
                            {rider.name}
                          </p>
                          <p className="text-xs text-gray-500">{rider.id}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-sm font-semibold text-gray-900">{rider.vehicle}</p>
                      <p className="text-xs text-gray-500">{rider.plate}</p>
                    </td>
                    <td className="px-4 py-4">
                      {rider.status === 'on_trip' ? (
                        <Link
                          to={getRiderTrackingPath(rider.id)}
                          className="transition-opacity hover:opacity-80"
                        >
                          <AdminRiderStatusBadge status={rider.status} label={rider.statusLabel} />
                        </Link>
                      ) : (
                        <AdminRiderStatusBadge status={rider.status} label={rider.statusLabel} />
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex h-7 min-w-[1.75rem] items-center justify-center rounded-md bg-gray-100 px-2 text-sm font-bold text-gray-800">
                        {rider.activeOrders}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-800">
                      {rider.trips}
                    </td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-1 text-sm font-bold text-gray-900">
                        {rider.rating}
                        <Star
                          size={14}
                          className="fill-violet-500 text-violet-500"
                          strokeWidth={0}
                          aria-hidden
                        />
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-600">{rider.lastActive}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
