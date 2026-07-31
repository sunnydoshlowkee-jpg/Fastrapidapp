import { useEffect, useState } from 'react'
import MerchantInventoryAvailabilityToggle from '../../../inventory/list/MerchantInventoryAvailabilityToggle'
import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'

export default function MerchantBusinessProfileMobileStoreStatus({
  storeStatus,
  onTogglePaused,
  saving = false,
}) {
  const [paused, setPaused] = useState(storeStatus.paused)
  const [error, setError] = useState('')

  useEffect(() => {
    setPaused(storeStatus.paused)
  }, [storeStatus.paused])

  const handleChange = async (nextPaused) => {
    const previous = paused
    setPaused(nextPaused)
    setError('')
    try {
      await onTogglePaused?.(nextPaused)
    } catch (err) {
      setPaused(previous)
      setError(err?.message || 'Could not update store status.')
    }
  }

  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <h2 className="text-base font-bold text-merchant-ink">{storeStatus.title}</h2>
      <p className="mt-1 text-sm text-merchant-muted">{storeStatus.description}</p>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-merchant-input px-3.5 py-3">
        <span className="text-sm font-semibold text-merchant-ink">{storeStatus.pauseLabel}</span>
        <MerchantInventoryAvailabilityToggle
          enabled={paused}
          onChange={handleChange}
          label={storeStatus.pauseLabel}
          disabled={saving}
        />
      </div>
      {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
    </section>
  )
}
