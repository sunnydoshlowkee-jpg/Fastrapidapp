import { useMemo, useState } from 'react'
import { Save } from 'lucide-react'
import {
  ADMIN_FEATURE_FLAGS,
  getInitialFlagState,
} from '../../../services/data/adminFeatureFlags.mock'
import AdminFeatureFlagCard from './AdminFeatureFlagCard'

export default function AdminFeatureFlagsPage() {
  const data = ADMIN_FEATURE_FLAGS
  const baseline = useMemo(() => getInitialFlagState(data.flags), [data.flags])
  const [saved, setSaved] = useState(baseline)
  const [flags, setFlags] = useState(baseline)

  const hasUnsaved = useMemo(
    () => data.flags.some((f) => flags[f.id] !== saved[f.id]),
    [data.flags, flags, saved],
  )

  const toggleFlag = (id) => {
    setFlags((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleSave = () => setSaved({ ...flags })

  return (
    <div className="relative pb-28">
      <div className="px-5 py-6 lg:p-6">
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-[#584237] lg:text-base">
          {data.description}
        </p>

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
          disabled={!hasUnsaved}
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl px-8 py-4 text-xs font-bold uppercase tracking-[0.05em] text-white shadow-[0px_12px_32px_rgba(26,28,29,0.06)] transition-opacity disabled:opacity-50 lg:max-w-md"
          style={{
            backgroundImage:
              'linear-gradient(135deg, #F97316 0%, #9D4300 100%)',
          }}
        >
          <Save size={14} strokeWidth={2.5} aria-hidden />
          {data.saveLabel}
        </button>
      </div>
    </div>
  )
}
