import { useCallback, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Search, Star } from 'lucide-react'
import { ADMIN_RIDERS, ADMIN_RIDERS_PATH } from '../../../services/data/adminRiders.mock'
import {
  fetchAdminRiders,
  mapAdminRiderFromApi,
  mapAdminRiderStatsFromApi,
} from '../../../services/adminRidersService'
import { getAdminAuthToken } from '../../../services/adminAuthService'
import AdminRiderStatusBadge from './AdminRiderStatusBadge'
import AdminRidersMobilePage from './AdminRidersMobilePage'
import AdminRidersStatCards from './AdminRidersStatCards'

const pageConfig = ADMIN_RIDERS

export default function AdminRidersPage() {
  const [activeTab, setActiveTab] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [riders, setRiders] = useState([])
  const [stats, setStats] = useState(mapAdminRiderStatsFromApi())
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const loadRiders = useCallback(async () => {
    if (!getAdminAuthToken()) {
      setError('Please sign in to view riders.')
      setLoading(false)
      return
    }

    setLoading(true)
    setError('')

    try {
      const result = await fetchAdminRiders({
        search,
        status: activeTab,
        page,
        perPage: 15,
      })

      setRiders(result.riders.map(mapAdminRiderFromApi))
      setStats(mapAdminRiderStatsFromApi(result.stats))
    } catch (err) {
      setRiders([])
      setError(err.message || 'Could not load riders.')
    } finally {
      setLoading(false)
    }
  }, [activeTab, page, search])

  useEffect(() => {
    loadRiders()
  }, [loadRiders])

  const pageData = useMemo(
    () => ({
      ...pageConfig,
      riders,
      stats,
    }),
    [riders, stats],
  )

  const pendingCount = useMemo(() => {
    const pendingStat = stats.find((stat) => stat.id === 'pending')
    return Number.parseInt(pendingStat?.value ?? '0', 10) || 0
  }, [stats])

  return (
    <>
      <div className="flex h-full min-h-0 flex-1 lg:hidden">
        <AdminRidersMobilePage
          data={pageData}
          loading={loading}
          error={error}
          pendingCount={pendingCount}
        />
      </div>

      <div className="hidden p-6 lg:block">
        <header className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">{pageConfig.title}</h1>
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-[#E84A15]"
          >
            <Plus size={16} strokeWidth={2.5} aria-hidden />
            {pageConfig.onboardLabel}
          </button>
        </header>

        <AdminRidersStatCards stats={stats} />

        <div className="mt-6 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-gray-100 px-6 py-4">
            <nav className="flex flex-wrap gap-2" aria-label="Rider filters">
              {pageConfig.tabs.map((tab) => {
                const isActive = activeTab === tab.id
                const showBadge = tab.id === 'pending' && pendingCount > 0
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id)
                      setPage(1)
                    }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                      isActive
                        ? 'bg-rapid-orange text-white'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {tab.label}
                    {showBadge ? (
                      <span
                        className={`inline-flex h-5 min-w-[1.25rem] items-center justify-center rounded-full px-1.5 text-[10px] font-bold ${
                          isActive ? 'bg-white text-rapid-orange' : 'bg-rapid-orange text-white'
                        }`}
                      >
                        {pendingCount}
                      </span>
                    ) : null}
                  </button>
                )
              })}
            </nav>

            <div className="relative w-full max-w-xs">
              <Search
                size={16}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                aria-hidden
              />
              <input
                type="search"
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value)
                  setPage(1)
                }}
                placeholder={pageConfig.searchPlaceholder}
                className="w-full rounded-lg border border-gray-200 py-2 pl-9 pr-3 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-100 bg-gray-50/80">
                  {Object.values(pageConfig.columns).map((label) => (
                    <th
                      key={label}
                      className="px-6 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500"
                    >
                      {label}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                      Loading riders...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : riders.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center text-sm text-gray-500">
                      No riders found.
                    </td>
                  </tr>
                ) : (
                  riders.map((rider) => (
                    <tr
                      key={rider.id}
                      className="border-b border-gray-50 transition-colors hover:bg-gray-50/60 last:border-0"
                    >
                      <td className="px-6 py-4">
                        <Link
                          to={`${ADMIN_RIDERS_PATH}/${rider.numericId}`}
                          className="flex items-center gap-3"
                        >
                          <span
                            className={`flex h-10 w-10 items-center justify-center rounded-full text-xs font-bold ${rider.avatarTone}`}
                          >
                            {rider.initials}
                          </span>
                          <div>
                            <p className="text-sm font-semibold text-gray-900">{rider.name}</p>
                            <p className="text-xs text-gray-500">{rider.id}</p>
                          </div>
                        </Link>
                      </td>
                      <td className="px-6 py-4">
                        <p className="text-sm text-gray-900">{rider.vehicle}</p>
                        <p className="text-xs text-gray-500">{rider.plate}</p>
                      </td>
                      <td className="px-6 py-4">
                        <AdminRiderStatusBadge status={rider.status} label={rider.statusLabel} />
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {rider.activeOrders}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-700">{rider.trips}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 text-sm font-semibold text-amber-700">
                          <Star size={14} className="fill-amber-400 text-amber-400" aria-hidden />
                          {rider.rating}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{rider.lastActive}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}
