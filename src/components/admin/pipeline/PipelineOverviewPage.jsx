import { useState, useEffect, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Eye, FileText, RefreshCw, Users,
  ChevronDown, Edit3, Plus, LayoutGrid, Filter,
  AlertCircle,
} from 'lucide-react'
import { usePipelineDashboard, usePipelineMeta } from '../../../hooks/usePipeline'
import { PIPELINE_TYPES, formatDate, pipelineBasePath } from '../../../utils/pipeline'
import pipelineService from '../../../services/adminPipelineService'
import Button from '../../ui/Button'
import Modal from '../../ui/Card'

const TYPE_ICONS = { competitor_signal: Eye, internal_update: RefreshCw, document_push: FileText, consultant_input: Users }

function StatCard({ label, count, dotColor, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-xl bg-white p-4 shadow-sm ring-1 ring-gray-200 text-left transition-shadow hover:shadow-md w-full"
    >
      <div className="flex items-center gap-2 mb-2">
        <span className={`h-2.5 w-2.5 rounded-full ${dotColor}`} aria-hidden />
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">{label}</p>
      </div>
      <p className="text-3xl font-bold text-gray-900">{count}</p>
    </button>
  )
}

function HorizontalBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  return (
    <div className="flex items-center gap-3">
      <span className="w-36 shrink-0 text-sm text-gray-700 truncate">{label}</span>
      <div className="flex-1 h-3 rounded-full bg-gray-100 overflow-hidden">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="w-10 text-right text-sm font-semibold text-gray-900">{value}</span>
    </div>
  )
}

export default function PipelineOverviewPage() {
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const [selectedVertical, setSelectedVertical] = useState('')
  const { verticals } = usePipelineMeta()
  const { data, loading, error, refresh } = usePipelineDashboard(selectedVertical || undefined)

  const [visionMission, setVisionMission] = useState([{ type: 'vision', content: '' }, { type: 'mission', content: '' }])
  const [visionModal, setVisionModal] = useState(null)
  const [visionContent, setVisionContent] = useState('')
  const [savingVision, setSavingVision] = useState(false)
  const [visionError, setVisionError] = useState('')

  useEffect(() => {
    pipelineService.getVisionMission().then(res => {
      const entries = res.data.data
      if (Array.isArray(entries) && entries.length) {
        setVisionMission(entries)
      }
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (visionModal) {
      const entry = visionMission.find(v => v.type === visionModal)
      setVisionContent(entry?.content || '')
      setVisionError('')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visionModal])

  const handleSaveVision = useCallback(async () => {
    if (!visionModal) return
    setSavingVision(true)
    setVisionError('')
    try {
      await pipelineService.updateVisionMission(visionModal, visionContent)
      setVisionMission(prev => prev.map(v => v.type === visionModal ? { ...v, content: visionContent, updated_at: new Date().toISOString() } : v))
      setVisionModal(null)
    } catch (err) {
      setVisionError(err.response?.data?.message || 'Failed to save.')
    } finally {
      setSavingVision(false)
    }
  }, [visionModal, visionContent])

  if (loading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center p-6 text-sm text-gray-500">
        Loading pipeline dashboard...
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-3 p-6 text-center">
        <AlertCircle size={32} className="text-red-400" />
        <p className="text-sm text-red-600">{error}</p>
        <Button variant="secondary" onClick={refresh}>Retry</Button>
      </div>
    )
  }

  const dashboard = data || {}
  const stats = dashboard.summary || {}
  const verticalBreakdown = dashboard.by_vertical || []
  const typeBreakdown = dashboard.by_type || []
  const teamBreakdown = dashboard.by_team || []
  const ownerBreakdown = dashboard.by_owner || []

  const maxVertical = Math.max(...verticalBreakdown.map(v => v.count), 0)

  const stageCounts = [
    { label: 'Total Items', count: stats.total || 0, dotColor: 'bg-gray-900', stage: null },
    { label: 'Signal', count: stats.signal || 0, dotColor: 'bg-amber-500', stage: 'signal' },
    { label: 'Diagnosis', count: stats.diagnosis || 0, dotColor: 'bg-blue-500', stage: 'diagnosis' },
    { label: 'Solution', count: stats.solution || 0, dotColor: 'bg-violet-500', stage: 'solution' },
    { label: 'Shipped', count: stats.shipped || 0, dotColor: 'bg-emerald-500', stage: 'shipped' },
  ]

  return (
    <div className="space-y-6 p-5 lg:p-6 bg-[#F5F6F8] min-h-screen">
      <header className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Pipeline Overview</h1>
          <p className="mt-1 text-sm text-gray-500">Track ideas from signal to shipped.</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <select
              value={selectedVertical}
              onChange={e => setSelectedVertical(e.target.value)}
              className="appearance-none rounded-xl border border-gray-200 bg-white pl-4 pr-9 py-2.5 text-sm font-medium text-gray-700 outline-none focus:ring-2 focus:ring-rapid-orange/30 cursor-pointer"
            >
              <option value="">All Verticals</option>
              {verticals.map(v => (
                <option key={v.id} value={v.id}>{v.name}</option>
              ))}
            </select>
            <ChevronDown size={16} className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </header>

      {(visionMission.some(v => v.content)) && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {visionMission.filter(v => v.content).map(entry => (
            <div key={entry.type} className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{entry.type}</h3>
                <button
                  type="button"
                  onClick={() => setVisionModal(entry.type)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-semibold text-rapid-orange hover:bg-orange-50 transition-colors"
                >
                  <Edit3 size={13} strokeWidth={2.5} />
                  Edit
                </button>
              </div>
              <p className="text-sm text-gray-600 leading-relaxed whitespace-pre-wrap">
                {entry.content || 'No content yet.'}
              </p>
              {entry.updated_at && (
                <p className="mt-2 text-xs text-gray-400">Updated {formatDate(entry.updated_at)}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-5">
        {stageCounts.map(s => (
          <StatCard
            key={s.label}
            label={s.label}
            count={s.count}
            dotColor={s.dotColor}
            onClick={s.stage ? () => navigate(`${base}/board?stage=${s.stage}`) : undefined}
          />
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {verticalBreakdown.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Items by Vertical</h3>
            <div className="space-y-3">
              {verticalBreakdown.map(v => (
                <HorizontalBar
                  key={v.vertical_id}
                  label={v.vertical_name}
                  value={v.count}
                  max={maxVertical}
                  color="bg-rapid-orange"
                />
              ))}
            </div>
          </div>
        )}

        {typeBreakdown.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Items by Type</h3>
            <div className="space-y-3">
              {PIPELINE_TYPES.map(type => {
                const count = typeBreakdown[type.key]
                if (!count) return null
                const Icon = TYPE_ICONS[type.key] || Eye
                return (
                  <div key={type.key} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gray-100">
                        <Icon size={14} className="text-gray-600" />
                      </span>
                      <span className="text-sm text-gray-700">{type.label}</span>
                    </div>
                    <span className="text-sm font-semibold text-gray-900">{count}</span>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {teamBreakdown.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Items by Team</h3>
            <div className="space-y-2">
              {teamBreakdown.map(t => (
                <div key={t.id} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-gray-700">{t.name}</span>
                  <span className="text-sm font-semibold text-gray-900">{t.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {ownerBreakdown.length > 0 && (
          <div className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200">
            <h3 className="text-sm font-bold text-gray-900 mb-4">Items by Owner</h3>
            <div className="space-y-2">
              {ownerBreakdown.map(o => (
                <div key={o.owner_id} className="flex items-center justify-between py-1.5">
                  <span className="text-sm text-gray-700">{o.owner_name}</span>
                  <span className="text-sm font-semibold text-gray-900">{o.count}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap gap-3">
        <Button onClick={() => navigate(`${base}/create`)}>
          <Plus size={16} strokeWidth={2.5} />
          Create Pipeline Item
        </Button>
        <Button variant="secondary" onClick={() => navigate(`${base}/board`)}>
          <LayoutGrid size={16} strokeWidth={2} />
          View Board
        </Button>
        <Button variant="secondary" onClick={() => navigate(`${base}/my-items`)}>
          <Filter size={16} strokeWidth={2} />
          My Items
        </Button>
      </div>

      <Modal
        isOpen={!!visionModal}
        onClose={() => setVisionModal(null)}
        title={`Edit ${visionModal === 'vision' ? 'Vision' : 'Mission'}`}
        size="lg"
      >
        <div className="flex flex-col gap-4">
          <textarea
            value={visionContent}
            onChange={e => setVisionContent(e.target.value)}
            rows={5}
            className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-rapid-orange focus:ring-2 focus:ring-orange-100 resize-none"
            placeholder={`Enter ${visionModal === 'vision' ? 'vision' : 'mission'} statement...`}
          />
          {visionError && <p className="text-xs text-red-500">{visionError}</p>}
          <div className="flex justify-end gap-2">
            <Button variant="ghost" onClick={() => setVisionModal(null)}>Cancel</Button>
            <Button onClick={handleSaveVision} disabled={savingVision}>
              {savingVision ? 'Saving...' : 'Save Changes'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  )
}
