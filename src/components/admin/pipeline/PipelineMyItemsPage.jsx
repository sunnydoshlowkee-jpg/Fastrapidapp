import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, ChevronLeft, ChevronRight, AlertCircle } from 'lucide-react'
import { usePipelineItems } from '../../../hooks/usePipeline'
import { PIPELINE_STAGES, getStageConfig, getTypeConfig, formatDate, pipelineBasePath } from '../../../utils/pipeline'
import Button from '../../ui/Button'

function StageBadge({ stage }) {
  const config = getStageConfig(stage)
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${config.bg} ${config.text}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${config.dot}`} aria-hidden />
      {config.label}
    </span>
  )
}

function TypeBadge({ typeKey }) {
  const config = getTypeConfig(typeKey)
  return (
    <span
      className="inline-flex items-center rounded-md px-2 py-0.5 text-[10px] font-semibold"
      style={{ backgroundColor: config.bgColor, color: config.textColor }}
    >
      {config.label}
    </span>
  )
}

function TeamBadge({ name }) {
  return (
    <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-0.5 text-[10px] font-semibold text-gray-600">
      {name}
    </span>
  )
}

function MobileCard({ item, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 text-left transition-all hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-2 mb-2">
        <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{item.title}</p>
        <TypeBadge typeKey={item.type} />
      </div>

      <div className="flex items-center gap-2 mb-2">
        <StageBadge stage={item.stage} />
      </div>

      {item.teams && item.teams.length > 0 && (
        <div className="flex flex-wrap items-center gap-1 mb-2">
          {item.teams.slice(0, 3).map(t => (
            <TeamBadge key={t.id || t.name} name={t.name} />
          ))}
          {item.teams.length > 3 && (
            <span className="text-[10px] font-semibold text-gray-400">+{item.teams.length - 3}</span>
          )}
        </div>
      )}

      <p className="text-[11px] text-gray-400">{formatDate(item.created_at)}</p>
    </button>
  )
}

function Pagination({ pagination, page, setPage }) {
  if (!pagination || pagination.last_page <= 1) return null

  const pages = []
  const start = Math.max(1, page - 2)
  const end = Math.min(pagination.last_page, start + 4)
  for (let i = start; i <= end; i++) pages.push(i)

  return (
    <footer className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-100 px-4 py-4">
      <p className="text-sm text-gray-500">
        Showing {pagination.from || 1}–{pagination.to || pagination.total} of {pagination.total}
      </p>
      <nav className="flex items-center gap-1" aria-label="Pagination">
        <button
          type="button"
          disabled={page <= 1}
          onClick={() => setPage(p => Math.max(1, p - 1))}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronLeft size={16} />
        </button>
        {pages.map(n => (
          <button
            key={n}
            type="button"
            onClick={() => setPage(n)}
            className={`min-w-[2rem] rounded-lg px-3 py-1.5 text-sm font-semibold ${
              page === n ? 'bg-rapid-orange text-white' : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {n}
          </button>
        ))}
        <button
          type="button"
          disabled={page >= pagination.last_page}
          onClick={() => setPage(p => Math.min(pagination.last_page, p + 1))}
          className="rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 disabled:opacity-40"
        >
          <ChevronRight size={16} />
        </button>
      </nav>
    </footer>
  )
}

export default function PipelineMyItemsPage() {
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const [activeStage, setActiveStage] = useState('all')
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)

  const userId = useMemo(() => {
    try {
      const stored = localStorage.getItem('admin_user') || localStorage.getItem('admin_token')
      if (!stored) return null
      const parsed = JSON.parse(stored)
      return parsed?.id || parsed?.user_id || null
    } catch {
      return null
    }
  }, [])

  const filters = useMemo(() => ({
    owner_id: userId || undefined,
    stage: activeStage !== 'all' ? activeStage : undefined,
    search: search || undefined,
    page,
    per_page: 15,
  }), [userId, activeStage, search, page])

  const { items, pagination, loading, error, refresh } = usePipelineItems(filters)

  const tabs = useMemo(() => [
    { key: 'all', label: 'All', count: pagination?.total || 0 },
    ...PIPELINE_STAGES.map(s => ({ key: s.key, label: s.label, count: 0 })),
  ], [pagination])

  return (
    <div className="space-y-5 p-5 lg:p-6 bg-[#F5F6F8] min-h-screen">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">My Items</h1>
        <p className="mt-1 text-sm text-gray-500">Pipeline items assigned to you.</p>
      </header>

      <nav className="flex flex-wrap gap-2" aria-label="Stage filters">
        {tabs.map(tab => (
          <button
            key={tab.key}
            type="button"
            onClick={() => { setActiveStage(tab.key); setPage(1) }}
            className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
              activeStage === tab.key
                ? 'bg-rapid-orange text-white shadow-sm'
                : 'bg-white text-gray-600 ring-1 ring-gray-200 hover:bg-gray-50'
            }`}
          >
            {activeStage !== tab.key && tab.key !== 'all' && (
              <span className={`h-1.5 w-1.5 rounded-full ${getStageConfig(tab.key).dot}`} aria-hidden />
            )}
            {tab.label}
            <span className={`text-xs ${activeStage === tab.key ? 'text-white/70' : 'text-gray-400'}`}>
              {tab.count}
            </span>
          </button>
        ))}
      </nav>

      <div className="max-w-md">
        <div className="relative">
          <Search size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="search"
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1) }}
            placeholder="Search your items..."
            className="w-full rounded-xl border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-rapid-orange/30"
          />
        </div>
      </div>

      <div className="lg:hidden">
        <div className="space-y-3">
          {loading ? (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
              Loading items...
            </div>
          ) : error ? (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-red-600 shadow-sm">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-xl bg-white p-6 text-center text-sm text-gray-500 shadow-sm">
              No items match this filter.
            </div>
          ) : (
            items.map(item => (
              <MobileCard
                key={item.id}
                item={item}
                onClick={() => navigate(`${base}/${item.id}`)}
              />
            ))
          )}
        </div>
        {!loading && <Pagination pagination={pagination} page={page} setPage={setPage} />}
      </div>

      <div className="hidden lg:block">
        <div className="overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] border-collapse text-left">
              <thead>
                <tr className="border-b border-gray-200 bg-gray-50/80">
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Title</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Type</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Stage</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Teams</th>
                  <th className="px-4 py-3 text-[10px] font-bold uppercase tracking-wider text-gray-500">Created</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-500">
                      Loading items...
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-red-600">
                      {error}
                    </td>
                  </tr>
                ) : items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-4 py-12 text-center text-sm text-gray-500">
                      No items match this filter.
                    </td>
                  </tr>
                ) : (
                  items.map(item => (
                    <tr
                      key={item.id}
                      onClick={() => navigate(`${base}/${item.id}`)}
                      className="cursor-pointer border-b border-gray-50 transition-colors hover:bg-gray-50/50 last:border-0"
                    >
                      <td className="px-4 py-4">
                        <p className="text-sm font-semibold text-gray-900 line-clamp-1">{item.title}</p>
                      </td>
                      <td className="px-4 py-4">
                        <TypeBadge typeKey={item.type} />
                      </td>
                      <td className="px-4 py-4">
                        <StageBadge stage={item.stage} />
                      </td>
                      <td className="px-4 py-4">
                        <div className="flex flex-wrap items-center gap-1">
                          {(item.teams || []).slice(0, 2).map(t => (
                            <TeamBadge key={t.id || t.name} name={t.name} />
                          ))}
                          {(item.teams || []).length > 2 && (
                            <span className="text-[10px] font-semibold text-gray-400">
                              +{(item.teams || []).length - 2}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm text-gray-500 whitespace-nowrap">
                        {formatDate(item.created_at)}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          <Pagination pagination={pagination} page={page} setPage={setPage} />
        </div>
      </div>
    </div>
  )
}
