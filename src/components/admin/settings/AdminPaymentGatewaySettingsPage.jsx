import { useEffect, useState } from 'react'
import { CheckCircle2, XCircle } from 'lucide-react'
import { fetchAdminSettingsIntegrations } from '../../../services/adminSettingsService'

function StatusRow({ title, ok, detail, note }) {
  return (
    <article className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        {ok ? (
          <CheckCircle2 className="mt-0.5 shrink-0 text-emerald-600" size={20} />
        ) : (
          <XCircle className="mt-0.5 shrink-0 text-red-500" size={20} />
        )}
        <div>
          <h2 className="text-base font-bold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-600">{detail}</p>
          {note ? <p className="mt-2 text-xs text-gray-400">{note}</p> : null}
        </div>
      </div>
    </article>
  )
}

export default function AdminPaymentGatewaySettingsPage() {
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
        if (!cancelled) setError(err.message || 'Could not load payment integration status.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const paystack = data?.paystack
  const vtpass = data?.vtpass
  const twilio = data?.twilio
  const maps = data?.google_maps

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-gray-900">Payment & launch integrations</h1>
      <p className="mt-1 text-sm text-gray-500">
        Read-only env status. Secrets stay on the server and are not editable here.
      </p>

      {loading ? <p className="mt-6 text-sm text-gray-500">Loading…</p> : null}
      {error ? (
        <p className="mt-4 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="mt-6 grid max-w-3xl gap-3">
        {paystack ? (
          <StatusRow
            title="Paystack"
            ok={Boolean(paystack.configured)}
            detail={
              (paystack.configured ? 'Secret key configured' : 'Secret key missing') +
              (paystack.public_key_set ? ' · public key set' : ' · public key missing')
            }
            note={paystack.note}
          />
        ) : null}
        {vtpass ? (
          <StatusRow
            title="VTpass"
            ok={Boolean(vtpass.configured)}
            detail={vtpass.configured ? 'API credentials present' : 'VTPASS_* keys missing'}
            note={vtpass.note}
          />
        ) : null}
        {twilio ? (
          <StatusRow
            title="Twilio"
            ok={Boolean(twilio.configured)}
            detail={
              (twilio.configured ? 'Account configured' : 'Twilio credentials missing') +
              (twilio.enabled ? ' · enabled' : ' · disabled')
            }
            note={twilio.note}
          />
        ) : null}
        {maps ? (
          <StatusRow
            title="Google Maps"
            ok={Boolean(maps.configured)}
            detail={maps.configured ? 'Server maps key set' : 'GOOGLE_MAPS_API_KEY missing'}
            note={maps.note}
          />
        ) : null}
      </div>
    </div>
  )
}
