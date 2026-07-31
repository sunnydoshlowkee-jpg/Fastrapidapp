import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Save } from 'lucide-react'
import { ADMIN_ALERT_SETTINGS } from '../../../services/data/adminAlertSettings.mock'
import { ADMIN_NOTIFICATIONS_PATH } from '../../../services/data/adminNotifications.mock'
import {
  fetchAdminSettingsGroup,
  saveAdminSettingsGroup,
} from '../../../services/adminSettingsService'
import AdminSettingsBreadcrumbs from './AdminSettingsBreadcrumbs'

export default function AdminAlertSettingsPage() {
  const data = ADMIN_ALERT_SETTINGS
  const [form, setForm] = useState({
    sla_minutes: 30,
    low_rider_online_threshold: 5,
    email_ops_on_payout_fail: true,
    slack_webhook_enabled: false,
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const result = await fetchAdminSettingsGroup('alerts')
        if (!cancelled && result.data) setForm((prev) => ({ ...prev, ...result.data }))
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load alert settings.')
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
    setError('')
    setMessage('')
    try {
      const result = await saveAdminSettingsGroup('alerts', form)
      setForm((prev) => ({ ...prev, ...(result.data || {}) }))
      setMessage('Alert settings saved.')
    } catch (err) {
      setError(err.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="p-6">
      <header className="mb-4 flex items-start justify-between gap-4">
        <AdminSettingsBreadcrumbs items={data.breadcrumbs} />
        <Link
          to={ADMIN_NOTIFICATIONS_PATH}
          className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:bg-gray-50"
          aria-label="Notifications"
        >
          <Bell size={18} strokeWidth={1.75} />
        </Link>
      </header>

      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Ops alert thresholds</h1>
          <p className="mt-1 text-sm text-gray-500">
            Live settings for SLA and rider availability alerts. Channel templates remain in Phase 3.
          </p>
        </div>
        <button
          type="button"
          disabled={loading || saving}
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-rapid-orange px-4 py-2 text-sm font-bold text-white disabled:opacity-50"
        >
          <Save size={16} />
          {saving ? 'Saving…' : 'Save changes'}
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

      <div className="max-w-xl space-y-4 rounded-xl border border-gray-200 bg-white p-6">
        <label className="block text-sm">
          <span className="font-semibold text-gray-700">SLA minutes</span>
          <input
            type="number"
            min={1}
            value={form.sla_minutes}
            onChange={(e) => setForm((p) => ({ ...p, sla_minutes: Number(e.target.value) }))}
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
          />
        </label>
        <label className="block text-sm">
          <span className="font-semibold text-gray-700">Low rider online threshold</span>
          <input
            type="number"
            min={0}
            value={form.low_rider_online_threshold}
            onChange={(e) =>
              setForm((p) => ({ ...p, low_rider_online_threshold: Number(e.target.value) }))
            }
            className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2"
          />
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(form.email_ops_on_payout_fail)}
            onChange={(e) =>
              setForm((p) => ({ ...p, email_ops_on_payout_fail: e.target.checked }))
            }
          />
          Email ops on payout failure
        </label>
        <label className="flex items-center gap-2 text-sm text-gray-700">
          <input
            type="checkbox"
            checked={Boolean(form.slack_webhook_enabled)}
            onChange={(e) =>
              setForm((p) => ({ ...p, slack_webhook_enabled: e.target.checked }))
            }
          />
          Slack webhook enabled (requires server config)
        </label>
      </div>
    </div>
  )
}
