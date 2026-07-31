import { useEffect, useMemo, useState } from 'react'
import { Save } from 'lucide-react'
import {
  ADMIN_FEATURE_FLAGS,
} from '../../../services/data/adminFeatureFlags.mock'
import {
  fetchAdminSettingsGroup,
  saveAdminSettingsGroup,
} from '../../../services/adminSettingsService'
import AdminFeatureFlagCard from './AdminFeatureFlagCard'

export default function AdminFeatureFlagsPage() {
  const data = ADMIN_FEATURE_FLAGS
  const [flags, setFlags] = useState(() =>
    Object.fromEntries(data.flags.map((f) => [f.id, Boolean(f.enabled)])),
  )
  const [saved, setSaved] = useState(flags)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      try {
        const result = await fetchAdminSettingsGroup('feature_flags')
        const remote = result.data || {}
        const next = Object.fromEntries(
          data.flags.map((f) => [f.id, remote[f.id] ?? Boolean(f.enabled)]),
        )
        if (!cancelled) {
          setFlags(next)
          setSaved(next)
        }
      } catch (err) {
        if (!cancelled) setError(err.message || 'Could not load feature flags.')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [data.flags])

  const hasUnsaved = useMemo(
    () => data.flags.some((f) => flags[f.id] !== saved[f.id]),
    [data.flags, flags, saved],
  )

  const toggleFlag = (id) => {
    setFlags((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setMessage('')
    try {
      const result = await saveAdminSettingsGroup('feature_flags', flags)
      const remote = result.data || flags
      const next = Object.fromEntries(
        data.flags.map((f) => [f.id, remote[f.id] ?? flags[f.id]]),
      )
      setFlags(next)
      setSaved(next)
      setMessage('Feature flags saved.')
    } catch (err) {
      setError(err.message || 'Save failed.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="relative pb-28">
      <div className="px-5 py-6 lg:p-6">
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#584237] lg:text-base">
          {data.description}
        </p>
        {loading ? <p className="mb-4 text-sm text-gray-500">Loading flags…</p> : null}
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

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 xl:grid-cols-3">
          {data.flags.map((flag) => (
            <AdminFeatureFlagCard
              key={flag.id}
              flag={flag}
              enabled={flags[flag.id]}
              onToggle={toggleFlag}
            />
          ))}
        </div>
      </div>

      <div className="fixed bottom-5 left-0 right-0 z-20 px-5 lg:bottom-6 lg:left-60 lg:px-6 xl:left-64">
        <button
          type="button"
          onClick={handleSave}
          disabled={!hasUnsaved || saving || loading}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs font-bold uppercase tracking-[0.05em] text-white shadow-[0px_12px_32px_rgba(26,28,29,0.06)] transition-opacity disabled:opacity-50 lg:max-w-md"
          style={{
            backgroundImage: 'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
          }}
        >
          <Save size={14} strokeWidth={2.5} aria-hidden />
          {saving ? 'Saving…' : data.saveLabel}
        </button>
      </div>
    </div>
  )
}
