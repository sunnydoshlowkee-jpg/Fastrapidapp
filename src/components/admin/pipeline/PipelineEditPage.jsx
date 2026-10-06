import { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Save, Loader2, Upload, Download, FileText, X } from 'lucide-react'
import Button from '../../ui/Button'
import Card from '../../ui/Modal'
import Input from '../../ui/Input'
import { usePipelineItem, usePipelineMeta } from '../../../hooks/usePipeline'
import { PIPELINE_STAGES, PIPELINE_TYPES, pipelineBasePath } from '../../../utils/pipeline'
import pipelineService from '../../../services/adminPipelineService'
import { getStoredPipelineSession } from '../../../services/pipelineAuthService'

function formatSize(bytes) {
  if (!bytes) return ''
  if (bytes < 1024) return `${bytes}B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)}KB`
  return `${(bytes / (1024 * 1024)).toFixed(1)}MB`
}

export default function PipelineEditPage() {
  const { itemId } = useParams()
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const { item, loading, error, uploadAttachment, deleteAttachment } = usePipelineItem(itemId)
  const { verticals, staff, teams } = usePipelineMeta()

  const [form, setForm] = useState(null)
  const [saving, setSaving] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [errors, setErrors] = useState({})
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (item && !form) {
      setForm({
        title: item.title || '',
        description: item.description || '',
        stage: item.stage || 'signal',
        type: item.type || 'internal_update',
        vertical_id: item.vertical?.id || '',
        owner_id: item.owner?.id || '',
        source: item.source || '',
        source_url: item.source_url || '',
        competitor_name: item.competitor_name || '',
        consultant_name: item.consultant_name || '',
        consultant_company: item.consultant_company || '',
        consultant_date: item.consultant_date || '',
        date_identified: item.date_identified || '',
        team_ids: (item.teams || []).map(t => t.id),
        tagged_user_ids: (item.tagged_users || []).map(u => u.id),
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item])

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-rapid-orange" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-12 px-4 text-center">
        <p className="text-red-600 mb-4">{error}</p>
        <Button variant="secondary" onClick={() => navigate(`${base}`)}>Back to Pipeline</Button>
      </div>
    )
  }

  if (!form) return null

  const currentUser = getStoredPipelineSession()?.user
  const isCreator = Boolean(currentUser?.id && item?.created_by && currentUser.id === item.created_by)

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    if (type === 'checkbox') {
      const field = name === 'team_ids' ? 'team_ids' : 'tagged_user_ids'
      setForm(prev => ({
        ...prev,
        [field]: checked ? [...prev[field], Number(value)] : prev[field].filter(id => id !== Number(value)),
      }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required'
    if (!form.description.trim()) errs.description = 'Description is required'
    if (!form.type) errs.type = 'Type is required'
    if (!form.vertical_id) errs.vertical_id = 'Vertical is required'
    if (!form.owner_id) errs.owner_id = 'Owner is required'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    e.target.value = ''
    if (!file || !itemId) return
    setUploading(true)
    setErrors(prev => ({ ...prev, file: undefined }))
    try {
      await uploadAttachment(itemId, file)
    } catch (err) {
      setErrors(prev => ({ ...prev, file: err.response?.data?.message || 'Upload failed. Please try again.' }))
    } finally {
      setUploading(false)
    }
  }

  const handleDeleteAttachment = async (attachmentId) => {
    if (!window.confirm('Remove this attachment?')) return
    setSaving(true)
    setErrors(prev => ({ ...prev, file: undefined }))
    try {
      await deleteAttachment(itemId, attachmentId)
    } catch (err) {
      setErrors(prev => ({ ...prev, file: err.response?.data?.message || 'Failed to remove attachment.' }))
    } finally {
      setSaving(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return
    setSaving(true)
    setErrors({})
    try {
      await pipelineService.updateItem(itemId, {
        title: form.title,
        description: form.description,
        stage: form.stage,
        type: form.type,
        vertical_id: Number(form.vertical_id),
        owner_id: Number(form.owner_id),
        source: form.source || null,
        source_url: form.source_url || null,
        competitor_name: form.competitor_name || null,
        consultant_name: form.consultant_name || null,
        consultant_company: form.consultant_company || null,
        consultant_date: form.consultant_date || null,
        date_identified: form.date_identified || null,
        team_ids: form.team_ids,
        tagged_user_ids: form.tagged_user_ids
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && staff.some((s) => s.id === id)),
      })
      navigate(`${base}/${itemId}`)
    } catch (err) {
      setErrors({ submit: err.response?.data?.message || 'Failed to update item' })
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F6F8] py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <Card className="!p-6 sm:!p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6">Edit Pipeline Item</h1>

          {errors.submit && (
            <div className="mb-6 rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {errors.submit}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <Input label="Title" name="title" value={form.title} onChange={handleChange} placeholder="Enter item title" error={errors.title} required />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Stage</label>
                <select name="stage" value={form.stage} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100">
                  {PIPELINE_STAGES.map(s => (
                    <option key={s.key} value={s.key}>{s.label}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select name="type" value={form.type} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100">
                  {PIPELINE_TYPES.map(t => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
                {errors.type && <p className="mt-1 text-xs text-red-600">{errors.type}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Vertical</label>
                <select name="vertical_id" value={form.vertical_id} onChange={handleChange} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100">
                  <option value="">Select vertical...</option>
                  {verticals.map(v => (
                    <option key={v.id} value={v.id}>{v.name}</option>
                  ))}
                </select>
                {errors.vertical_id && <p className="mt-1 text-xs text-red-600">{errors.vertical_id}</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Owner</label>
                <select name="owner_id" value={form.owner_id} onChange={handleChange} disabled={!isCreator} className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-500">
                  <option value="">Select owner...</option>
                  {staff.map(s => (
                    <option key={s.id} value={s.id}>{s.name}</option>
                  ))}
                </select>
                {!isCreator && (
                  <p className="mt-1 text-xs text-gray-500">Only the pipeline creator can change ownership.</p>
                )}
                {errors.owner_id && <p className="mt-1 text-xs text-red-600">{errors.owner_id}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={4} placeholder="Describe the pipeline item..." className="w-full rounded-xl border border-gray-200 px-4 py-2.5 text-sm resize-none outline-none focus:border-rapid-orange focus:ring-2 focus:ring-orange-100" />
              {errors.description && <p className="mt-1 text-xs text-red-600">{errors.description}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Source" name="source" value={form.source} onChange={handleChange} placeholder="Where was this identified" />
              <Input label="Source URL" name="source_url" value={form.source_url} onChange={handleChange} placeholder="https://..." type="url" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Input label="Competitor Name" name="competitor_name" value={form.competitor_name} onChange={handleChange} placeholder="Competitor (if applicable)" />
              <Input label="Date Identified" name="date_identified" value={form.date_identified} onChange={handleChange} type="date" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <Input label="Consultant Name" name="consultant_name" value={form.consultant_name} onChange={handleChange} placeholder="Consultant name" />
              <Input label="Consultant Company" name="consultant_company" value={form.consultant_company} onChange={handleChange} placeholder="Company" />
              <Input label="Consultant Date" name="consultant_date" value={form.consultant_date} onChange={handleChange} type="date" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Teams</label>
              <div className="space-y-1">
                {teams.map(t => (
                  <label key={t.id} className="flex items-center gap-3 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      value={t.id}
                      checked={form.team_ids.includes(t.id)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange"
                    />
                    <span className="text-sm text-gray-700">{t.name}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Tagged Members <span className="text-gray-400 font-normal">(they will be notified by email)</span></label>
              <div className="space-y-1">
                {staff.map(s => (
                  <label key={s.id} className="flex items-center gap-3 rounded-lg px-3 py-1.5 hover:bg-gray-50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      name="tagged_user_ids"
                      value={s.id}
                      checked={form.tagged_user_ids.includes(s.id)}
                      onChange={handleChange}
                      className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange"
                    />
                    <span className="text-sm text-gray-700">{s.name}</span>
                  </label>
                ))}
              </div>
              {form.tagged_user_ids.length > 0 && (
                <p className="mt-1 text-xs text-gray-400">
                  Tagged: {form.tagged_user_ids.map((id) => staff.find((s) => s.id === id)?.name).filter(Boolean).join(', ')}
                </p>
              )}
            </div>

            {errors.file && <p className="mt-1 text-xs text-red-600">{errors.file}</p>}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
              <div className="space-y-2">
                {(item.attachments || []).map(file => (
                  <div key={file.id} className="flex items-center justify-between rounded-lg bg-gray-50 border border-gray-100 px-3 py-2">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="h-8 w-8 shrink-0 flex items-center justify-center rounded-lg bg-rapid-orange/10 text-rapid-orange">
                        <FileText className="h-4 w-4" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-sm text-gray-800 font-medium truncate">{file.file_name}</p>
                        <p className="text-xs text-gray-400">{formatSize(file.file_size)} · {file.uploaded_by || 'uploaded'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <a
                        href={file.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-rapid-orange transition-colors"
                        title="Download"
                      >
                        <Download className="h-4 w-4" />
                      </a>
                      <button
                        type="button"
                        onClick={() => handleDeleteAttachment(file.id)}
                        disabled={saving}
                        className="rounded-lg p-2 text-gray-400 hover:bg-red-50 hover:text-red-600 transition-colors"
                        title="Remove"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                {(item.attachments || []).length === 0 && (
                  <p className="text-xs text-gray-400">No attachments yet.</p>
                )}
              </div>
              <div className="mt-3">
                <input
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  onChange={handleFileSelect}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="sm"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploading}
                >
                  {uploading ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Upload className="h-4 w-4 mr-1" />}
                  {uploading ? 'Uploading...' : 'Upload attachment'}
                </Button>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
              <Button type="submit" disabled={saving}>
                {saving ? <Loader2 className="h-4 w-4 animate-spin mr-1" /> : <Save className="h-4 w-4 mr-1" />}
                {saving ? 'Saving...' : 'Save Changes'}
              </Button>
              <Button type="button" variant="secondary" onClick={() => navigate(-1)}>Cancel</Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}