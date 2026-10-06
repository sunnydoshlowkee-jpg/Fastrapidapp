import { useState, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  ArrowLeft, ArrowRight, Pencil, Trash2, ExternalLink, Mail, Upload,
  Download, X, UserPlus, Users, Clock, FileText, Loader2, Check, Link2,
  ChevronDown, ChevronUp,
} from 'lucide-react'
import Button from '../../ui/Button'
import Modal from '../../ui/Card'
import Card from '../../ui/Modal'
import Input from '../../ui/Input'
import { usePipelineItem, usePipelineMeta } from '../../../hooks/usePipeline'
import { getStageConfig, getTypeConfig, formatDate, timeAgo, pipelineBasePath } from '../../../utils/pipeline'
import pipelineService from '../../../services/adminPipelineService'
import { getStoredPipelineSession } from '../../../services/pipelineAuthService'
import ActivityChangesCallout, { hasActivityDetails } from './ActivityChangesPopout'

const STAGE_ORDER = ['signal', 'diagnosis', 'solution', 'shipped']

function getNextStage(current) {
  const idx = STAGE_ORDER.indexOf(current)
  return idx >= 0 && idx < STAGE_ORDER.length - 1 ? STAGE_ORDER[idx + 1] : null
}

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

function StageProgression({ currentStage }) {
  const currentIdx = STAGE_ORDER.indexOf(currentStage)

  return (
    <div className="flex items-center gap-1 sm:gap-2">
      {STAGE_ORDER.map((stage, idx) => {
        const config = getStageConfig(stage)
        const isActive = idx === currentIdx
        const isComplete = idx < currentIdx

        return (
          <div key={stage} className="flex items-center">
            <div
              className={`
                flex items-center justify-center rounded-full text-xs font-semibold
                w-8 h-8 sm:w-10 sm:h-10 shrink-0 transition-all
                ${isActive ? 'bg-rapid-orange text-white ring-2 ring-rapid-orange/30' : ''}
                ${isComplete ? 'bg-emerald-100 text-emerald-700' : ''}
                ${!isActive && !isComplete ? 'bg-gray-100 text-gray-400' : ''}
              `}
            >
              {isComplete ? <Check className="h-4 w-4" /> : idx + 1}
            </div>
            <span
              className={`hidden sm:block ml-1 text-xs font-medium ${
                isActive ? 'text-rapid-orange' : isComplete ? 'text-emerald-600' : 'text-gray-400'
              }`}
            >
              {config.label}
            </span>
            {idx < STAGE_ORDER.length - 1 && (
              <div className={`w-3 sm:w-6 h-px mx-1 shrink-0 ${idx < currentIdx ? 'bg-emerald-300' : 'bg-gray-200'}`} />
            )}
          </div>
        )
      })}
    </div>
  )
}

function AttachmentRow({ file, onDelete }) {
  return (
    <div className="flex items-center justify-between rounded-lg bg-gray-50 px-3 py-2">
      <div className="flex items-center gap-2 min-w-0">
        <FileText className="h-4 w-4 text-gray-400 shrink-0" />
        <span className="text-sm text-gray-700 truncate">{file.file_name}</span>
        {file.file_size ? (
          <span className="text-xs text-gray-400 shrink-0">{formatSize(file.file_size)}</span>
        ) : null}
      </div>
      <div className="flex items-center gap-1 shrink-0">
        <a
          href={file.file_url || file.file_path}
          target="_blank"
          rel="noopener noreferrer"
          className="p-1.5 rounded hover:bg-gray-200 text-gray-500 hover:text-gray-700 transition-colors"
          title="Download"
        >
          <Download className="h-3.5 w-3.5" />
        </a>
        <button
          onClick={() => onDelete(file.id)}
          className="p-1.5 rounded hover:bg-red-50 text-gray-500 hover:text-red-600 transition-colors"
          title="Delete"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

function ActivityTimeline({ activities }) {
  const [expanded, setExpanded] = useState({})

  if (!activities || activities.length === 0) {
    return <p className="text-sm text-gray-400">No activity yet</p>
  }

  const toggle = (id) => setExpanded(prev => ({ ...prev, [id]: !prev[id] }))

  return (
    <div className="space-y-4">
      {activities.map((act, idx) => {
        const isOpen = Boolean(expanded[act.id])
        const canShowDetails = hasActivityDetails(act)
        return (
          <div key={act.id || idx} className="flex gap-3">
            <div className="flex flex-col items-center">
              <div className="h-2 w-2 rounded-full bg-rapid-orange mt-1.5 shrink-0" />
              {idx < activities.length - 1 && <div className="w-px flex-1 bg-gray-200 mt-1" />}
            </div>
            <div className="pb-4 min-w-0">
              <p className="text-sm text-gray-900">
                <span className="font-medium">{act.user || 'System'}</span> {act.description || act.action}
              </p>
              {canShowDetails && (
                <button
                  type="button"
                  onClick={() => toggle(act.id)}
                  className="mt-1.5 inline-flex items-center gap-1 rounded-md bg-gray-100 px-2 py-1 text-[11px] font-medium text-gray-600 transition-colors hover:bg-gray-200"
                >
                  {isOpen ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                  {isOpen ? 'Hide changes' : 'See what changed'}
                </button>
              )}
              {isOpen && <ActivityChangesCallout entry={act} />}
              <p className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {timeAgo(act.created_at)}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default function PipelineDetailPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const {
    item, loading, error,
    moveStage, deleteItem, uploadAttachment, deleteAttachment, changeOwner, assignTeams,
  } = usePipelineItem(itemId)
  const { staff, teams: allTeams } = usePipelineMeta()

  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [showOwnerModal, setShowOwnerModal] = useState(false)
  const [showTeamModal, setShowTeamModal] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState('')
  const [selectedTeams, setSelectedTeams] = useState([])
  const [busy, setBusy] = useState(false)
  const [moving, setMoving] = useState(false)
  const fileInputRef = useRef(null)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-rapid-orange" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button variant="secondary" onClick={() => navigate(`${base}`)}>Back</Button>
        </div>
      </div>
    )
  }

  if (!item) return null

  const currentUser = getStoredPipelineSession()?.user
  const isCreator = Boolean(currentUser?.id && item.created_by && currentUser.id === item.created_by)

  const stageConfig = getStageConfig(item.stage)
  const typeConfig = getTypeConfig(item.type)
  const nextStage = getNextStage(item.stage)

  const handleMoveNext = async () => {
    if (!nextStage) return
    setMoving(true)
    try {
      await moveStage(item.id, nextStage)
    } finally {
      setMoving(false)
    }
  }

  const handleDelete = async () => {
    setBusy(true)
    try {
      await deleteItem(item.id)
      navigate(`${base}`)
    } catch {
      setBusy(false)
    }
  }

  const handleUpload = async (file) => {
    if (!file) return
    await uploadAttachment(item.id, file)
  }

  const handleChangeOwner = async () => {
    if (!selectedOwner) return
    setBusy(true)
    try {
      await changeOwner(item.id, Number(selectedOwner))
      setShowOwnerModal(false)
    } finally {
      setBusy(false)
    }
  }

  const handleSaveTeams = async () => {
    setBusy(true)
    try {
      await assignTeams(item.id, selectedTeams)
      setShowTeamModal(false)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] py-8 px-4">
      <div className="max-w-5xl mx-auto">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        {/* Header */}
        <Card className="!p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div className="min-w-0">
              <h1 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h1>
              <div className="flex flex-wrap items-center gap-2">
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ backgroundColor: typeConfig.bgColor, color: typeConfig.textColor }}
                >
                  {typeConfig.label}
                </span>
                {item.vertical?.name && (
                  <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {item.vertical.name}
                  </span>
                )}
                <span
                  className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium"
                  style={{ backgroundColor: stageConfig.bgColor, color: stageConfig.textColor }}
                >
                  {stageConfig.label}
                </span>
                <span className="text-xs text-gray-400">
                  Created {timeAgo(item.created_at)}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button variant="secondary" size="sm" onClick={() => navigate(`${base}/${item.id}/edit`)}>
                <Pencil className="h-3.5 w-3.5 mr-1" />
                Edit
              </Button>
              <Button variant="danger" size="sm" onClick={() => setShowDeleteModal(true)}>
                <Trash2 className="h-3.5 w-3.5 mr-1" />
                Delete
              </Button>
            </div>
          </div>

          <StageProgression currentStage={item.stage} />

          {nextStage && (
            <div className="mt-4">
              <Button onClick={handleMoveNext} disabled={moving}>
                {moving ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : <ArrowRight className="h-4 w-4 mr-2" />}
                Move to {getStageConfig(nextStage).label}
              </Button>
            </div>
          )}
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-xs font-medium text-gray-500 mb-1">Description</p>
                  <p className="text-sm text-gray-700 whitespace-pre-wrap">{item.description}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {item.source && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Source</p>
                      <p className="text-sm text-gray-700">{item.source}</p>
                    </div>
                  )}
                  {item.source_url && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Source URL</p>
                      <a href={item.source_url} target="_blank" rel="noopener noreferrer" className="text-sm text-rapid-orange hover:underline inline-flex items-center gap-1 truncate max-w-full">
                        <Link2 className="h-3 w-3 shrink-0" />
                        {item.source_url}
                      </a>
                    </div>
                  )}
                  {item.competitor_name && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Competitor</p>
                      <p className="text-sm text-gray-700">{item.competitor_name}</p>
                    </div>
                  )}
                  {item.consultant_name && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Consultant</p>
                      <p className="text-sm text-gray-700">
                        {item.consultant_name}
                        {item.consultant_company && <span className="text-gray-400 ml-2">({item.consultant_company})</span>}
                      </p>
                    </div>
                  )}
                  {item.source && (
                    <div>
                      <p className="text-xs font-medium text-gray-500 mb-1">Date Identified</p>
                      <p className="text-sm text-gray-700">{formatDate(item.date_identified)}</p>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Attachments</h2>
              <div className="space-y-2">
                {item.attachments?.length === 0 && <p className="text-sm text-gray-400">No attachments</p>}
                {item.attachments?.map((file) => (
                  <AttachmentRow key={file.id} file={file} onDelete={(id) => deleteAttachment(item.id, id)} />
                ))}
              </div>
              <div className="mt-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  onChange={(e) => { handleUpload(e.target.files[0]); if (fileInputRef.current) fileInputRef.current.value = '' }}
                  className="hidden"
                />
                <Button variant="secondary" size="sm" onClick={() => fileInputRef.current?.click()}>
                  <Upload className="h-3.5 w-3.5 mr-1" />
                  Upload
                </Button>
              </div>
            </Card>

            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Activity</h2>
              <ActivityTimeline activities={item.activities} />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Owner</h2>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center h-10 w-10 rounded-full bg-gray-100 text-gray-600 font-semibold text-sm">
                      {item.owner?.name ? item.owner.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{item.owner?.name || 'Unassigned'}</p>
                      {item.owner?.email && (
                        <p className="text-xs text-gray-500 flex items-center gap-1">
                          <Mail className="h-3 w-3" />
                          {item.owner.email}
                        </p>
                      )}
                    </div>
                  </div>
                  {item.creator?.name && (
                    <p className="mt-2 text-xs text-gray-400">
                      Created by <span className="font-medium text-gray-500">{item.creator.name}</span>
                    </p>
                  )}
                </div>
                {isCreator ? (
                  <Button variant="secondary" size="sm" onClick={() => { setSelectedOwner(''); setShowOwnerModal(true) }}>
                    <UserPlus className="h-3.5 w-3.5 mr-1" />
                    Change
                  </Button>
                ) : (
                  <span className="text-[11px] text-gray-400 text-right">Owner change restricted to creator</span>
                )}
              </div>
            </Card>

            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Teams</h2>
              <div className="flex flex-wrap gap-2 mb-3">
                {item.teams?.length === 0 && <span className="text-sm text-gray-400">No teams assigned</span>}
                {item.teams?.map((team) => (
                  <span key={team.id} className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                    <Users className="h-3 w-3" />
                    {team.name}
                  </span>
                ))}
              </div>
              <Button variant="secondary" size="sm" onClick={() => { setSelectedTeams(item.teams?.map(t => t.id) || []); setShowTeamModal(true) }}>
                <Users className="h-3.5 w-3.5 mr-1" />
                Manage
              </Button>
            </Card>

            <Card className="!p-6">
              <h2 className="text-sm font-semibold text-gray-900 mb-4">Tagged Members</h2>
              {item.tagged_users?.length === 0 ? (
                <p className="text-sm text-gray-400">No members tagged</p>
              ) : (
                <div className="space-y-2">
                  {item.tagged_users?.map((user) => (
                    <div key={user.id} className="flex items-center gap-2.5">
                      <div className="flex items-center justify-center h-8 w-8 rounded-full bg-orange-50 text-rapid-orange font-semibold text-xs shrink-0">
                        {user.name ? user.name.split(' ').map(n => n[0]).join('').slice(0, 2) : '?'}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{user.name}</p>
                        {user.email && <p className="text-xs text-gray-500 truncate">{user.email}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        </div>

        {/* Delete Modal */}
        <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} title="Delete Pipeline Item">
          <p className="text-sm text-gray-600 mb-6">
            Are you sure you want to delete &quot;{item.title}&quot;? This action cannot be undone.
          </p>
          <div className="flex items-center gap-3 justify-end">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={handleDelete} disabled={busy}>
              {busy ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Trash2 className="h-4 w-4 mr-1" />}
              Delete
            </Button>
          </div>
        </Modal>

        {/* Owner Modal */}
        <Modal isOpen={showOwnerModal} onClose={() => setShowOwnerModal(false)} title="Change Owner">
          <p className="text-sm text-gray-500 mb-4">Select a new owner for this pipeline item.</p>
          <select
            value={selectedOwner}
            onChange={(e) => setSelectedOwner(e.target.value)}
            className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100"
          >
            <option value="">Select staff...</option>
            {staff.map((s) => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowOwnerModal(false)}>Cancel</Button>
            <Button onClick={handleChangeOwner} disabled={busy || !selectedOwner}>Save</Button>
          </div>
        </Modal>

        {/* Team Modal */}
        <Modal isOpen={showTeamModal} onClose={() => setShowTeamModal(false)} title="Manage Teams">
          <p className="text-sm text-gray-500 mb-4">Assign or remove teams for this pipeline item.</p>
          <div className="space-y-1 max-h-56 overflow-y-auto">
            {allTeams.map((t) => (
              <label key={t.id} className="flex items-center gap-3 rounded-lg px-3 py-2 hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={selectedTeams.includes(t.id)}
                  onChange={() => setSelectedTeams(prev => prev.includes(t.id) ? prev.filter(id => id !== t.id) : [...prev, t.id])}
                  className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange"
                />
                <span className="text-sm text-gray-700">{t.name}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex justify-end gap-2">
            <Button variant="secondary" onClick={() => setShowTeamModal(false)}>Cancel</Button>
            <Button onClick={handleSaveTeams} disabled={busy}>Save Teams</Button>
          </div>
        </Modal>
      </div>
    </div>
  )
}