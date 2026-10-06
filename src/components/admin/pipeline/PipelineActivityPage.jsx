import { useEffect, useMemo, useState } from 'react'
import {
  ArrowRight,
  AtSign,
  ChevronDown,
  ChevronUp,
  FileUp,
  Pencil,
  Plus,
  RefreshCw,
  Trash2,
  UserPlus,
} from 'lucide-react'
import pipelineService from '../../../services/adminPipelineService'
import { getStageConfig, timeAgo } from '../../../utils/pipeline'
import BrandedLoader from '../../ui/BrandedLoader'
import ActivityChangesCallout, { hasActivityDetails } from './ActivityChangesPopout'

const ACTION_CONFIG = {
  created: { icon: Plus, color: 'text-emerald-600 bg-emerald-50', label: 'created this item' },
  stage_changed: { icon: ArrowRight, color: 'text-blue-600 bg-blue-50', label: 'moved to' },
  owner_changed: { icon: UserPlus, color: 'text-violet-600 bg-violet-50', label: 'changed owner' },
  updated: { icon: Pencil, color: 'text-amber-600 bg-amber-50', label: 'updated this item' },
  attachment_uploaded: { icon: FileUp, color: 'text-sky-600 bg-sky-50', label: 'uploaded an attachment' },
  attachment_deleted: { icon: FileUp, color: 'text-rose-600 bg-rose-50', label: 'deleted an attachment' },
  deleted: { icon: Trash2, color: 'text-rose-700 bg-rose-100', label: 'deleted this item' },
  member_tagged: { icon: AtSign, color: 'text-orange-600 bg-orange-50', label: 'tagged a member' },
}

function getActionConfig(actionType) {
  return ACTION_CONFIG[actionType] || { icon: RefreshCw, color: 'text-gray-600 bg-gray-50', label: actionType || 'acted' }
}

function getInitials(name) {
  if (!name) return '?'
  return name.split(' ').map((w) => w[0]).join('').toUpperCase().slice(0, 2)
}

function ActivityEntry({ entry }) {
  const config = getActionConfig(entry.action)
  const Icon = config.icon
  const [showDetails, setShowDetails] = useState(false)
  const canShowDetails = hasActivityDetails(entry)

  const stageLabel =
    entry.action === 'stage_changed' && entry.new_stage
      ? getStageConfig(entry.new_stage).label
      : null

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gray-100 text-xs font-bold text-gray-600">
          {getInitials(entry.user)}
        </div>
        <div className="mt-1 flex-1 w-px bg-gray-200" />
      </div>
      <div className="flex-1 pb-6">
        <p className="text-sm text-gray-900">
          <span className="font-semibold">{entry.user || 'Unknown'}</span>{' '}
          {config.label}
          {stageLabel ? (
            <span className="ml-1 inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-semibold text-blue-700">
              {stageLabel}
            </span>
          ) : null}{' '}
          <span className="text-gray-400">on</span>{' '}
          <span className="font-medium text-gray-700">{entry.item_title || 'a pipeline item'}</span>
        </p>
        {entry.description && (
          <p className="mt-1 text-xs text-gray-500">{entry.description}</p>
        )}
        {canShowDetails && (
          <button
            type="button"
            onClick={() => setShowDetails(v => !v)}
            className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 transition-colors hover:bg-gray-200"
          >
            {showDetails ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {showDetails ? 'Hide changes' : 'See what changed'}
          </button>
        )}
        {showDetails && <ActivityChangesCallout entry={entry} />}
        <p className="mt-1 text-xs text-gray-400">{timeAgo(entry.created_at)}</p>
      </div>
    </div>
  )
}

function DateGroup({ date, entries }) {
  return (
    <div>
      <div className="sticky top-0 z-10 flex items-center gap-3 bg-[#F5F6F8] py-2">
        <span className="text-xs font-bold uppercase tracking-wider text-gray-500">{date}</span>
        <div className="flex-1 h-px bg-gray-200" />
      </div>
      <div className="space-y-0">
        {entries.map((e, i) => (
          <ActivityEntry key={`${e.id || i}`} entry={e} />
        ))}
      </div>
    </div>
  )
}

export default function PipelineActivityPage() {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await pipelineService.getActivityFeed({ per_page: 50, page: 1 })
        if (cancelled) return
        setActivities(res.data.data || [])
      } catch (err) {
        if (cancelled) return
        setError(err.response?.data?.message || 'Failed to load activity')
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()
    return () => { cancelled = true }
  }, [])

  const grouped = useMemo(() => {
    const groups = {}
    for (const entry of activities) {
      const date = new Date(entry.created_at).toLocaleDateString('en-NG', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      })
      if (!groups[date]) groups[date] = []
      groups[date].push(entry)
    }
    return Object.entries(groups)
  }, [activities])

  return (
    <div className="p-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Activity</h1>
        <p className="mt-1 text-sm text-gray-500">
          Recent activity across all pipeline items.
        </p>
      </header>

      <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200 p-6">
        {loading ? (
          <BrandedLoader size="md" label="Loading activity…" />
        ) : error ? (
          <p className="py-8 text-center text-sm text-red-600">{error}</p>
        ) : grouped.length === 0 ? (
          <div className="py-12 text-center">
            <RefreshCw size={40} className="mx-auto text-gray-300" strokeWidth={1.5} />
            <p className="mt-3 text-sm font-medium text-gray-500">No activity found.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {grouped.map(([date, entries]) => (
              <DateGroup key={date} date={date} entries={entries} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}