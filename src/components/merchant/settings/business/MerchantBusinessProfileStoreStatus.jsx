import { useEffect, useState } from 'react'
import MerchantInventoryAvailabilityToggle from '../../inventory/list/MerchantInventoryAvailabilityToggle'
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

export default function MerchantBusinessProfileStoreStatus({
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
    <section className={`${merchantBusinessProfileCardClass} flex h-full flex-col`}>
      <div>
        <h2 className="text-base font-bold text-merchant-ink lg:text-lg">{storeStatus.title}</h2>
        <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{storeStatus.description}</p>
      </div>

      <div className="mt-auto pt-6">
        <div className="flex items-center justify-between gap-4 rounded-lg bg-merchant-input px-4 py-3.5">
          <span className="text-sm font-semibold text-merchant-ink">{storeStatus.pauseLabel}</span>
          <MerchantInventoryAvailabilityToggle
            enabled={paused}
            onChange={handleChange}
            label={storeStatus.pauseLabel}
            disabled={saving}
          />
        </div>
        {error ? <p className="mt-2 text-xs text-red-600">{error}</p> : null}
      </div>
    </section>
  )
}
