import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronRight, FileText, Loader2 } from 'lucide-react'
import {
  AUDIENCE_LABELS,
  fetchAdminEmailTemplates,
} from '../../../services/adminEmailTemplatesService'
import { ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH, ADMIN_SETTINGS_PATH } from '../../../services/data/adminPaths'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

const AUDIENCE_STYLES = {
  all: 'bg-violet-50 text-violet-700',
  customer: 'bg-sky-50 text-sky-700',
  merchant: 'bg-amber-50 text-amber-700',
  rider: 'bg-emerald-50 text-emerald-700',
  admin: 'bg-gray-100 text-gray-700',
}

export default function AdminEmailTemplatesPage() {
  const [templates, setTemplates] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true

    async function load() {
      try {
        setLoading(true)
        setError('')
        const data = await fetchAdminEmailTemplates()
        if (active) setTemplates(data)
      } catch (err) {
        if (active) setError(err?.message || 'Could not load email templates.')
      } finally {
        if (active) setLoading(false)
      }
    }

    load()

    return () => {
      active = false
    }
  }, [])

  return (
    <div className="p-6">
      <header className="mb-6">
        <AdminSettingsBreadcrumbs
          items={[
            { label: 'Settings', path: ADMIN_SETTINGS_PATH },
            { label: 'Email Templates' },
          ]}
        />
      </header>

      <div className="mx-auto max-w-4xl">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-900">Email Templates</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-[#584237]">
            Manage the HTML content and subjects for verification codes, merchant onboarding updates,
            approvals, and other system emails sent to customers, merchants, and riders.
          </p>
        </div>

        {loading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Loader2 size={16} className="animate-spin" />
            Loading templates...
          </div>
        ) : null}

        {error ? (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        {!loading && !error ? (
          <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <ul className="divide-y divide-gray-100">
              {templates.map((template) => {
                const audienceStyle = AUDIENCE_STYLES[template.audience] ?? AUDIENCE_STYLES.all

                return (
                  <li key={template.key}>
                    <Link
                      to={`${ADMIN_SETTINGS_EMAIL_TEMPLATES_PATH}/${template.key}`}
                      className="flex items-center gap-4 p-4 transition-colors hover:bg-gray-50"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F9F9FA] text-[#842BD2]">
                        <FileText size={18} strokeWidth={2} aria-hidden />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-base font-bold text-gray-900">{template.name}</p>
                          <span className={`rounded-full px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide ${audienceStyle}`}>
                            {AUDIENCE_LABELS[template.audience] ?? template.audience}
                          </span>
                          {!template.is_active ? (
                            <span className="rounded-full bg-gray-100 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wide text-gray-500">
                              Inactive
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-sm text-gray-500">{template.description || template.subject}</p>
                        <p className="mt-1 font-mono text-xs text-gray-400">{template.key}</p>
                      </div>
                      <ChevronRight size={16} className="shrink-0 text-[#E0C0B1]" aria-hidden />
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  )
}
