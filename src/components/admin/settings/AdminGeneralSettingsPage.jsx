import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell } from 'lucide-react'
import { ADMIN_GENERAL_SETTINGS } from '../../../services/data/adminGeneralSettings.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import {
  fetchAdminSettingsGroup,
  saveAdminSettingsGroup,
} from '../../../services/adminSettingsService'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'
import { AdminSettingsFormField, AdminSettingsSelectField } from './AdminSettingsFormField'

export default function AdminGeneralSettingsPage() {
  const data = ADMIN_GENERAL_SETTINGS
  const brand = data.brandIdentity.fields
  const loc = data.localization.fields

  const [platformName, setPlatformName] = useState(brand.platformName.value)
  const [supportEmail, setSupportEmail] = useState(brand.supportEmail.value)
  const [description, setDescription] = useState(brand.description.value)
  const [currency, setCurrency] = useState(loc.currency.value)
  const [timezone, setTimezone] = useState(loc.timezone.value)
  const [dateFormat, setDateFormat] = useState(loc.dateFormat.value)
  const [maintenanceMode, setMaintenanceMode] = useState(data.maintenance.toggle.defaultOn)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const result = await fetchAdminSettingsGroup('general')
        const g = result.data || {}
        if (cancelled) return
        setPlatformName(g.platform_name ?? brand.platformName.value)
        setSupportEmail(g.support_email ?? brand.supportEmail.value)
        setDescription(g.description ?? brand.description.value)
        setCurrency(g.currency ?? loc.currency.value)
        setTimezone(g.timezone ?? loc.timezone.value)
        setDateFormat(g.date_format ?? loc.dateFormat.value)
        setMaintenanceMode(Boolean(g.maintenance_mode))
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load settings.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const handleSave = async () => {
    setSaving(true)
    setMessage('')
    setError('')
    try {
      await saveAdminSettingsGroup('general', {
        platform_name: platformName,
        support_email: supportEmail,
        description,
        currency,
        timezone,
        date_format: dateFormat,
        maintenance_mode: maintenanceMode,
      })
      setMessage('General settings saved.')
    } catch (err) {
      setError(err.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <header className="mb-6 flex items-start justify-between gap-4">
        <AdminSettingsBreadcrumbs items={data.breadcrumbs} />
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
        </Link>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-sm">
        <p className="text-sm text-gray-600">{data.intro}</p>
        <button
          type="button"
          disabled={loading || saving}
          onClick={handleSave}
          className="rounded-lg bg-rapid-orange px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-colors hover:bg-[#E84A15] disabled:opacity-50"
        >
          {saving ? 'Saving…' : data.saveLabel}
        </button>
      </div>

      {message ? (
        <p className="mb-4 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
          {message}
        </p>
      ) : null}
      {error ? (
        <p className="mb-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="space-y-6">
        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">{data.brandIdentity.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
            <AdminSettingsFormField
              id={brand.platformName.id}
              label={brand.platformName.label}
              value={platformName}
              onChange={(e) => setPlatformName(e.target.value)}
            />
            <AdminSettingsFormField
              id={brand.supportEmail.id}
              label={brand.supportEmail.label}
              type="email"
              value={supportEmail}
              onChange={(e) => setSupportEmail(e.target.value)}
            />
          </div>
          <div className="mt-6">
            <AdminSettingsFormField
              id={brand.description.id}
              label={brand.description.label}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              multiline
            />
          </div>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">{data.localization.title}</h2>
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <AdminSettingsSelectField
              id={loc.currency.id}
              label={loc.currency.label}
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              options={loc.currency.options}
            />
            <AdminSettingsSelectField
              id={loc.timezone.id}
              label={loc.timezone.label}
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              options={loc.timezone.options}
            />
            <AdminSettingsSelectField
              id={loc.dateFormat.id}
              label={loc.dateFormat.label}
              value={dateFormat}
              onChange={(e) => setDateFormat(e.target.value)}
              options={loc.dateFormat.options}
            />
          </div>
        </article>

        <article className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-bold text-gray-900">{data.maintenance.title}</h2>
              <p className="mt-1 text-sm text-gray-500">{data.maintenance.toggle.description}</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={maintenanceMode}
              onClick={() => setMaintenanceMode((v) => !v)}
              className={`relative h-7 w-12 rounded-full transition-colors ${
                maintenanceMode ? 'bg-rapid-orange' : 'bg-gray-300'
              }`}
            >
              <span
                className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${
                  maintenanceMode ? 'translate-x-5' : 'translate-x-0.5'
                }`}
              />
            </button>
          </div>
        </article>
      </div>
    </div>
  )
}
