import { useCallback, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Eye, Loader2, PencilLine, RefreshCw, Save } from 'lucide-react'
import {
  AUDIENCE_LABELS,
  fetchAdminEmailTemplate,
  previewAdminEmailTemplate,
  saveAdminEmailTemplate,
} from '../../../services/adminEmailTemplatesService'
import { ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH, ADMIN_SETTINGS_PATH } from '../../../services/data/adminPaths'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'
import { AdminSettingsFormField } from './AdminSettingsFormField'

export default function AdminEmailTemplateEditPage() {
  const { templateKey } = useParams()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [previewLoading, setPreviewLoading] = useState(false)
  const [error, setError] = useState('')
  const [previewError, setPreviewError] = useState('')
  const [message, setMessage] = useState('')
  const [template, setTemplate] = useState(null)
  const [activeTab, setActiveTab] = useState('edit')
  const [previewSubject, setPreviewSubject] = useState('')
  const [previewHtml, setPreviewHtml] = useState('')
  const [previewDevice, setPreviewDevice] = useState('mobile')
  const [name, setName] = useState('')
  const [subject, setSubject] = useState('')
  const [htmlBody, setHtmlBody] = useState('')
  const [description, setDescription] = useState('')
  const [isActive, setIsActive] = useState(true)

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await fetchAdminEmailTemplate(templateKey)
        if (!active) return

        setTemplate(data)
        setName(data?.name ?? '')
        setSubject(data?.subject ?? '')
        setHtmlBody(data?.html_body ?? '')
        setDescription(data?.description ?? '')
        setIsActive(data?.is_active ?? true)
      } catch (err) {
        if (active) setError(err?.message || 'Could not load template.')
      } finally {
        if (active) setLoading(false)
      }
    }

    if (templateKey) load()

    return () => {
      active = false
    }
  }, [templateKey])

  const loadPreview = useCallback(async () => {
    try {
      setPreviewLoading(true)
      setPreviewError('')
      const data = await previewAdminEmailTemplate(templateKey, {
        subject,
        html_body: htmlBody,
      })
      setPreviewSubject(data?.subject ?? '')
      setPreviewHtml(data?.html ?? '')
    } catch (err) {
      setPreviewError(err?.message || 'Could not generate preview.')
      setPreviewSubject('')
      setPreviewHtml('')
    } finally {
      setPreviewLoading(false)
    }
  }, [templateKey, subject, htmlBody])

  useEffect(() => {
    if (activeTab === 'preview' && template) {
      loadPreview()
    }
  }, [activeTab, template, loadPreview])

  const handleSave = async () => {
    try {
      setSaving(true)
      setError('')
      setMessage('')
      await saveAdminEmailTemplate(templateKey, {
        name,
        subject,
        html_body: htmlBody,
        description,
        is_active: isActive,
      })
      setMessage('Template saved successfully.')
    } catch (err) {
      setError(err?.message || 'Could not save template.')
    } finally {
      setSaving(false)
    }
  }

  const openPreview = () => {
    setActiveTab('preview')
  }

  if (loading) {
    return (
      <div className="flex items-center gap-2 p-6 text-sm text-gray-500">
        <Loader2 size={16} className="animate-spin" />
        Loading template...
      </div>
    )
  }

  if (!template) {
    return (
      <div className="p-6">
        <p className="text-sm text-red-600">{error || 'Template not found.'}</p>
        <Link
          to={ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH}
          className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-rapid-orange"
        >
          <ArrowLeft size={16} />
          Back to templates
        </Link>
      </div>
    )
  }

  return (
    <div className="p-6 pb-28">
      <header className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <AdminSettingsBreadcrumbs
          items={[
            { label: 'Settings', path: ADMIN_SETTINGS_PATH },
            { label: 'Email Templates', path: ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH },
            { label: template.name },
          ]}
        />
        <Link
          to={ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH}
          className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={16} />
          Back
        </Link>
      </header>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
        <article className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-5">
            <h1 className="text-xl font-bold text-gray-900">{template.name}</h1>
            <p className="mt-1 text-sm text-gray-500">{template.description}</p>

            <div className="mt-5 inline-flex rounded-lg border border-gray-200 bg-white p-1">
              <button
                type="button"
                onClick={() => setActiveTab('edit')}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'edit'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <PencilLine size={15} />
                Edit
              </button>
              <button
                type="button"
                onClick={openPreview}
                className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                  activeTab === 'preview'
                    ? 'bg-gray-900 text-white'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Eye size={15} />
                Preview
              </button>
            </div>
          </div>

          {activeTab === 'edit' ? (
            <div className="space-y-6 p-6">
              <AdminSettingsFormField
                id="template-name"
                label="Template name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <AdminSettingsFormField
                id="template-subject"
                label="Email subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <div>
                <label htmlFor="template-html" className="mb-2 block text-sm font-semibold text-gray-700">
                  HTML body
                </label>
                <textarea
                  id="template-html"
                  value={htmlBody}
                  onChange={(e) => setHtmlBody(e.target.value)}
                  rows={24}
                  className="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 font-mono text-xs leading-relaxed text-gray-800 outline-none ring-rapid-orange/20 focus:border-rapid-orange focus:ring-2"
                  spellCheck={false}
                />
              </div>
              <div>
                <label htmlFor="template-description" className="mb-2 block text-sm font-semibold text-gray-700">
                  Internal description
                </label>
                <textarea
                  id="template-description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-lg border border-gray-200 px-4 py-3 text-sm text-gray-800 outline-none ring-rapid-orange/20 focus:border-rapid-orange focus:ring-2"
                />
              </div>
              <label className="flex items-center gap-3 text-sm font-medium text-gray-700">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-300 text-rapid-orange focus:ring-rapid-orange"
                />
                Template is active
              </label>
            </div>
          ) : (
            <div className="space-y-4 p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-gray-500">Subject preview</p>
                  <p className="mt-1 text-sm font-semibold text-gray-900">
                    {previewSubject || 'Generating preview...'}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="inline-flex rounded-lg border border-gray-200 bg-gray-50 p-1">
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('mobile')}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                        previewDevice === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Mobile
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewDevice('desktop')}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold ${
                        previewDevice === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500'
                      }`}
                    >
                      Desktop
                    </button>
                  </div>
                  <button
                    type="button"
                    onClick={loadPreview}
                    disabled={previewLoading}
                    className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 disabled:opacity-60"
                  >
                    <RefreshCw size={14} className={previewLoading ? 'animate-spin' : ''} />
                    Refresh
                  </button>
                </div>
              </div>

              {previewError ? (
                <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {previewError}
                </div>
              ) : null}

              <div className="rounded-xl border border-gray-200 bg-[#ECEFF3] p-4 md:p-6">
                {previewLoading ? (
                  <div className="flex min-h-[420px] items-center justify-center gap-2 text-sm text-gray-500">
                    <Loader2 size={18} className="animate-spin" />
                    Rendering preview...
                  </div>
                ) : (
                  <div className="mx-auto transition-all" style={{ maxWidth: previewDevice === 'mobile' ? 390 : 720 }}>
                    <iframe
                      title="Email template preview"
                      srcDoc={previewHtml}
                      sandbox=""
                      className="min-h-[520px] w-full rounded-xl border border-gray-300 bg-white shadow-sm"
                    />
                  </div>
                )}
              </div>

              <p className="text-xs leading-relaxed text-gray-500">
                Preview uses sample placeholder data. Unsaved edits in the editor are reflected when you refresh the preview.
              </p>
            </div>
          )}
        </article>

        <aside className="space-y-4">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Details</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div>
                <dt className="text-gray-500">Key</dt>
                <dd className="font-mono text-gray-900">{template.key}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Audience</dt>
                <dd className="font-medium text-gray-900">
                  {AUDIENCE_LABELS[template.audience] ?? template.audience}
                </dd>
              </div>
            </dl>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="text-sm font-bold uppercase tracking-wide text-gray-500">Placeholders</h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-600">
              Use these tokens in the subject or HTML. Triple braces keep raw HTML unescaped.
            </p>
            <ul className="mt-4 space-y-2">
              {(template.placeholders ?? []).map((placeholder) => (
                <li key={placeholder}>
                  <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-800">{placeholder}</code>
                </li>
              ))}
            </ul>
          </div>

          {message ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              {message}
            </div>
          ) : null}

          {error ? (
            <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          ) : null}
        </aside>
      </div>

      <div className="fixed bottom-5 left-0 right-0 z-20 flex flex-col gap-3 px-5 lg:bottom-6 lg:left-60 lg:flex-row lg:px-6 xl:left-64">
        {activeTab === 'edit' ? (
          <button
            type="button"
            onClick={openPreview}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-8 py-4 text-xs font-bold uppercase tracking-[0.05em] text-gray-700 shadow-sm transition-colors hover:bg-gray-50 lg:max-w-xs"
          >
            <Eye size={14} strokeWidth={2.5} />
            Preview
          </button>
        ) : null}
        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs font-bold uppercase tracking-[0.05em] text-white shadow-[0px_12px_32px_rgba(26,28,29,0.06)] transition-opacity disabled:opacity-50 lg:max-w-md"
          style={{ backgroundImage: 'linear-gradient(135deg, #F97316 0%, #9D4300 100%)' }}
        >
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} strokeWidth={2.5} />}
          Save template
        </button>
      </div>
    </div>
  )
}
