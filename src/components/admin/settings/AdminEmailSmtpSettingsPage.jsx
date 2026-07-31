import { useEffect, useState } from 'react'
import { fetchAdminSettingsIntegrations } from '../../../services/adminSettingsService'

export default function AdminEmailSmtpSettingsPage() {
  const [data, setData] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const result = await fetchAdminSettingsIntegrations()
        if (!cancelled) setData(result)
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load mail settings.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const mail = data?.mail
  const fcm = data?.fcm

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Email / SMTP</h1>
      <p className="mt-1 text-sm text-gray-500">
        Mail transport is configured on the server. Credentials are never shown in the admin UI.
      </p>

      {loading ? <p className="mt-6 text-sm text-gray-500">Loading…</p> : null}
      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      {mail ? (
        <article className="mt-6 max-w-xl space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <p className="text-sm">
            <span className="font-semibold text-gray-700">Mailer:</span> {mail.mailer || '—'}
          </p>
          <p className="text-sm">
            <span className="font-semibold text-gray-700">From:</span> {mail.from || '—'}
          </p>
          <p className="text-sm text-gray-500">{mail.note}</p>
        </article>
      ) : null}

      {fcm ? (
        <article className="mt-4 max-w-xl space-y-3 rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="text-base font-bold text-gray-900">Push (FCM)</h2>
          <p className="text-sm text-gray-600">
            {fcm.enabled ? 'Enabled' : 'Disabled'}
            {fcm.project_id ? ` · project ${fcm.project_id}` : ''}
          </p>
        </article>
      ) : null}
    </div>
  )
}
