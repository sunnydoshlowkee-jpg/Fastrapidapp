import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react'
import { PIPELINE_STAGES, PIPELINE_TYPES, pipelineBasePath } from '../../../utils/pipeline'
import { usePipelineMeta } from '../../../hooks/usePipeline'
import pipelineService from '../../../services/adminPipelineService'
import Input from '../../ui/Input'
import Button from '../../ui/Button'

const MAX_FILE_SIZE = 10 * 1024 * 1024
const MAX_FILES = 10

const INITIAL_FORM = {
  title: '',
  description: '',
  type: '',
  vertical_id: '',
  stage: 'signal',
  owner_id: '',
  team_ids: [],
  tagged_user_ids: [],
  source: '',
  source_url: '',
  competitor_name: '',
  consultant_name: '',
  consultant_company: '',
  consultant_date: '',
  date_identified: '',
}

export default function PipelineCreatePage() {
  const navigate = useNavigate()
  const base = pipelineBasePath()
  const { verticals, teams, staff, loading: metaLoading } = usePipelineMeta()
  const [form, setForm] = useState(INITIAL_FORM)
  const [files, setFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [errors, setErrors] = useState({})
  const [fileErrors, setFileErrors] = useState([])
  const [globalError, setGlobalError] = useState('')

  const set = (field) => (e) => {
    const val = e.target ? e.target.value : e
    setForm((prev) => ({ ...prev, [field]: val }))
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }))
  }

  const toggleTeam = (id) => {
    setForm((prev) => ({
      ...prev,
      team_ids: prev.team_ids.includes(id)
        ? prev.team_ids.filter((t) => t !== id)
        : [...prev.team_ids, id],
    }))
  }

  const toggleTagged = (id) => {
    setForm((prev) => ({
      ...prev,
      tagged_user_ids: prev.tagged_user_ids.includes(id)
        ? prev.tagged_user_ids.filter((t) => t !== id)
        : [...prev.tagged_user_ids, id],
    }))
  }

  const addFiles = (e) => {
    const incoming = Array.from(e.target.files || [])
    setFileErrors([])
    const newErrors = []
    const remaining = MAX_FILES - files.length
    const toAdd = incoming.slice(0, remaining)

    toAdd.forEach((f) => {
      if (f.size > MAX_FILE_SIZE) {
        newErrors.push(`${f.name} exceeds 10 MB limit.`)
      }
    })

    const valid = toAdd.filter((f) => f.size <= MAX_FILE_SIZE)
    if (incoming.length > remaining) {
      newErrors.push(`Maximum ${MAX_FILES} files allowed.`)
    }

    if (newErrors.length) setFileErrors(newErrors)
    if (valid.length) setFiles((prev) => [...prev, ...valid])
    e.target.value = ''
  }

  const removeFile = (idx) => {
    setFiles((prev) => prev.filter((_, i) => i !== idx))
  }

  const validate = () => {
    const errs = {}
    if (!form.title.trim()) errs.title = 'Title is required.'
    if (!form.description.trim()) errs.description = 'Description is required.'
    if (!form.type) errs.type = 'Type is required.'
    if (!form.vertical_id) errs.vertical_id = 'Vertical is required.'
    if (!form.owner_id) errs.owner_id = 'Owner is required.'
    if (form.type === 'competitor_signal' && !form.competitor_name.trim()) errs.competitor_name = 'Competitor name is required.'
    if (form.type === 'consultant_input') {
      if (!form.consultant_name.trim()) errs.consultant_name = 'Consultant name is required.'
      if (!form.consultant_company.trim()) errs.consultant_company = 'Consultant company is required.'
    }
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setGlobalError('')

    try {
      const payload = {
        title: form.title.trim(),
        description: form.description.trim(),
        type: form.type,
        vertical_id: form.vertical_id,
        stage: form.stage,
        owner_id: form.owner_id,
        team_ids: form.team_ids,
        tagged_user_ids: form.tagged_user_ids
          .map((id) => Number(id))
          .filter((id) => Number.isInteger(id) && staff.some((s) => s.id === id)),
        source: form.source.trim() || undefined,
        source_url: form.source_url.trim() || undefined,
        date_identified: form.date_identified || undefined,
      }

      if (form.type === 'competitor_signal') {
        payload.competitor_name = form.competitor_name.trim()
      }
      if (form.type === 'consultant_input') {
        payload.consultant_name = form.consultant_name.trim()
        payload.consultant_company = form.consultant_company.trim()
        payload.consultant_date = form.consultant_date || undefined
      }

      const res = await pipelineService.createItem(payload)
      const newItemId = res.data.data?.id

      if (files.length > 0 && newItemId) {
        const results = await Promise.allSettled(
          files.map((f) => pipelineService.uploadAttachment(newItemId, f))
        )
        const failed = results.filter(r => r.status === 'rejected').length
        if (failed > 0 && failed === results.length) {
          setGlobalError(`Pipeline item created, but ${failed} of ${files.length} file upload(s) failed. Please attach the files from the item's detail page.`)
          navigate(`${base}/board`)
          return
        }
        if (failed > 0) {
          setGlobalError(`Pipeline item created, but ${failed} of ${files.length} file upload(s) failed. Please re-upload them from the item's detail page.`)
        }
      }

      navigate(`${base}/board`)
    } catch (err) {
      setGlobalError(err.response?.data?.message || 'Failed to create pipeline item. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const showType = form.type

  return (
    <div className="min-h-screen bg-[#F5F6F8] p-6">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="mb-6 inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 transition-colors hover:text-gray-900"
        >
          <ArrowLeft size={16} strokeWidth={2} />
          Back
        </button>

        <div className="rounded-xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="border-b border-gray-100 px-6 py-5">
            <h1 className="text-xl font-bold text-gray-900">Create Pipeline Item</h1>
            <p className="mt-1 text-sm text-gray-500">Add a new signal, update, or document to the pipeline.</p>
          </div>

          {globalError && (
            <div className="mx-6 mt-4 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700 ring-1 ring-red-200">
              {globalError}
            </div>
          )}

          {metaLoading ? (
            <div className="px-6 py-12 text-center text-sm text-gray-500">Loading form data…</div>
          ) : (
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <Input
                label="Title"
                id="pipeline-title"
                placeholder="e.g. Competitor launched new pricing tier"
                value={form.title}
                onChange={set('title')}
                error={errors.title}
                required
              />

              <div className="flex flex-col gap-1">
                <label htmlFor="pipeline-desc" className="text-sm font-medium text-gray-700">Description</label>
                <textarea
                  id="pipeline-desc"
                  rows={4}
                  placeholder="Describe the signal or update in detail…"
                  value={form.description}
                  onChange={set('description')}
                  className={`w-full rounded-xl border px-4 py-2.5 text-sm outline-none transition-colors placeholder:text-gray-400 ${
                    errors.description
                      ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                      : 'border-gray-200 focus:border-rapid-orange focus:ring-2 focus:ring-orange-100'
                  }`}
                />
                {errors.description && <p className="text-xs text-red-500">{errors.description}</p>}
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-1">
                  <label htmlFor="pipeline-type" className="text-sm font-medium text-gray-700">Type *</label>
                  <select
                    id="pipeline-type"
                    value={form.type}
                    onChange={set('type')}
                    className={`w-full appearance-none rounded-xl border px-4 py-2.5 pr-9 text-sm outline-none transition-colors ${
                      errors.type
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-rapid-orange focus:ring-2 focus:ring-orange-100'
                    }`}
                  >
                    <option value="">Select type…</option>
                    {PIPELINE_TYPES.map((t) => (
                      <option key={t.key} value={t.key}>{t.label}</option>
                    ))}
                  </select>
                  {errors.type && <p className="text-xs text-red-500">{errors.type}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="pipeline-vertical" className="text-sm font-medium text-gray-700">Vertical *</label>
                  <select
                    id="pipeline-vertical"
                    value={form.vertical_id}
                    onChange={set('vertical_id')}
                    className={`w-full appearance-none rounded-xl border px-4 py-2.5 pr-9 text-sm outline-none transition-colors ${
                      errors.vertical_id
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-rapid-orange focus:ring-2 focus:ring-orange-100'
                    }`}
                  >
                    <option value="">Select vertical…</option>
                    {verticals.map((v) => (
                      <option key={v.id} value={v.id}>{v.name}</option>
                    ))}
                  </select>
                  {errors.vertical_id && <p className="text-xs text-red-500">{errors.vertical_id}</p>}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="pipeline-stage" className="text-sm font-medium text-gray-700">Stage</label>
                  <select
                    id="pipeline-stage"
                    value={form.stage}
                    onChange={set('stage')}
                    className="w-full appearance-none rounded-xl border border-gray-200 px-4 py-2.5 pr-9 text-sm outline-none transition-colors focus:border-rapid-orange focus:ring-2 focus:ring-orange-100"
                  >
                    {PIPELINE_STAGES.map((s) => (
                      <option key={s.key} value={s.key}>{s.label}</option>
                    ))}
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="pipeline-owner" className="text-sm font-medium text-gray-700">Owner *</label>
                  <select
                    id="pipeline-owner"
                    value={form.owner_id}
                    onChange={set('owner_id')}
                    className={`w-full appearance-none rounded-xl border px-4 py-2.5 pr-9 text-sm outline-none transition-colors ${
                      errors.owner_id
                        ? 'border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-100'
                        : 'border-gray-200 focus:border-rapid-orange focus:ring-2 focus:ring-orange-100'
                    }`}
                  >
                    <option value="">Select owner…</option>
                    {staff.map((s) => (
                      <option key={s.id} value={s.id}>{s.name}</option>
                    ))}
                  </select>
                  {errors.owner_id && <p className="text-xs text-red-500">{errors.owner_id}</p>}
                </div>
              </div>

              {teams.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Teams</label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {teams.map((team) => (
                      <label
                        key={team.id}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
                          form.team_ids.includes(team.id)
                            ? 'border-rapid-orange bg-orange-50 text-rapid-orange'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.team_ids.includes(team.id)}
                          onChange={() => toggleTeam(team.id)}
                          className="sr-only"
                        />
                        <span className={`flex h-4 w-4 items-center justify-center rounded border ${
                          form.team_ids.includes(team.id)
                            ? 'border-rapid-orange bg-rapid-orange'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {form.team_ids.includes(team.id) && (
                            <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 text-white">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        {team.name}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {staff.length > 0 && (
                <div>
                  <label className="text-sm font-medium text-gray-700">
                    Tag Members <span className="text-gray-400 font-normal">(they will be notified by email)</span>
                  </label>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {staff.map((s) => (
                      <label
                        key={s.id}
                        className={`inline-flex cursor-pointer items-center gap-2 rounded-xl border px-3.5 py-2 text-sm font-medium transition-colors ${
                          form.tagged_user_ids.includes(s.id)
                            ? 'border-rapid-orange bg-orange-50 text-rapid-orange'
                            : 'border-gray-200 bg-white text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={form.tagged_user_ids.includes(s.id)}
                          onChange={() => toggleTagged(s.id)}
                          className="sr-only"
                        />
                        <span className={`flex h-4 w-4 items-center justify-center rounded border ${
                          form.tagged_user_ids.includes(s.id)
                            ? 'border-rapid-orange bg-rapid-orange'
                            : 'border-gray-300 bg-white'
                        }`}>
                          {form.tagged_user_ids.includes(s.id) && (
                            <svg viewBox="0 0 12 12" fill="none" className="h-2.5 w-2.5 text-white">
                              <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          )}
                        </span>
                        {s.name}
                      </label>
                    ))}
                  </div>
                  {form.tagged_user_ids.length > 0 && (
                    <p className="mt-1.5 text-xs text-gray-400">
                      Tagged: {form.tagged_user_ids.map((id) => staff.find((s) => s.id === id)?.name).filter(Boolean).join(', ')}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <Input
                  label="Source"
                  id="pipeline-source"
                  placeholder="e.g. Internal Slack, News article"
                  value={form.source}
                  onChange={set('source')}
                />
                <Input
                  label="Source URL"
                  id="pipeline-source-url"
                  type="url"
                  placeholder="https://"
                  value={form.source_url}
                  onChange={set('source_url')}
                />
              </div>

              <Input
                label="Date Identified"
                id="pipeline-date-identified"
                type="date"
                value={form.date_identified}
                onChange={set('date_identified')}
              />

              {showType === 'competitor_signal' && (
                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Competitor Details</p>
                  <Input
                    label="Competitor Name"
                    id="pipeline-competitor"
                    placeholder="e.g. Company X"
                    value={form.competitor_name}
                    onChange={set('competitor_name')}
                    error={errors.competitor_name}
                    required
                  />
                </div>
              )}

              {showType === 'consultant_input' && (
                <div className="rounded-xl border border-gray-200 bg-gray-50/50 p-4 space-y-4">
                  <p className="text-xs font-bold uppercase tracking-wider text-gray-500">Consultant Details</p>
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <Input
                      label="Consultant Name"
                      id="pipeline-consultant-name"
                      placeholder="Full name"
                      value={form.consultant_name}
                      onChange={set('consultant_name')}
                      error={errors.consultant_name}
                      required
                    />
                    <Input
                      label="Consultant Company"
                      id="pipeline-consultant-company"
                      placeholder="Company name"
                      value={form.consultant_company}
                      onChange={set('consultant_company')}
                      error={errors.consultant_company}
                      required
                    />
                  </div>
                  <Input
                    label="Consultation Date"
                    id="pipeline-consultant-date"
                    type="date"
                    value={form.consultant_date}
                    onChange={set('consultant_date')}
                  />
                </div>
              )}

              <div className="flex flex-col gap-1">
                <label className="text-sm font-medium text-gray-700">
                  Attachments <span className="text-gray-400 font-normal">(max 10 MB each, up to 10 files)</span>
                </label>
                <label className="flex cursor-pointer items-center justify-center gap-2 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50/50 px-6 py-8 text-sm text-gray-500 transition-colors hover:border-rapid-orange hover:bg-orange-50/30 hover:text-rapid-orange">
                  <Upload size={20} strokeWidth={1.5} />
                  <span>Click to upload files</span>
                  <input
                    type="file"
                    multiple
                    onChange={addFiles}
                    className="sr-only"
                    accept=".jpg,.jpeg,.png,.gif,.webp,.svg,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt,.csv"
                  />
                </label>
                {fileErrors.length > 0 && (
                  <div className="mt-1 space-y-0.5">
                    {fileErrors.map((err, i) => (
                      <p key={i} className="text-xs text-red-500">{err}</p>
                    ))}
                  </div>
                )}
                {files.length > 0 && (
                  <div className="mt-2 space-y-2">
                    {files.map((f, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-lg bg-white px-3 py-2 ring-1 ring-gray-200">
                        <div className="flex-1 min-w-0">
                          <p className="truncate text-sm font-medium text-gray-900">{f.name}</p>
                          <p className="text-xs text-gray-400">{(f.size / 1024 / 1024).toFixed(1)} MB</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeFile(i)}
                          className="shrink-0 rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-red-500"
                          aria-label={`Remove ${f.name}`}
                        >
                          <X size={16} strokeWidth={2} />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-3 border-t border-gray-100 pt-6">
                <Button type="submit" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Creating…
                    </>
                  ) : (
                    'Create Pipeline Item'
                  )}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => navigate(-1)}
                  disabled={submitting}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
