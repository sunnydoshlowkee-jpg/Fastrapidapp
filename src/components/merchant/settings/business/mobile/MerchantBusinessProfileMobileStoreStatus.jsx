import { useState } from 'react'
import MerchantInventoryAvailabilityToggle from '../../../inventory/list/MerchantInventoryAvailabilityToggle'
import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'

export default function MerchantBusinessProfileMobileStoreStatus({ storeStatus }) {
  const [paused, setPaused] = useState(storeStatus.paused)

  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <h2 className="text-base font-bold text-merchant-ink">{storeStatus.title}</h2>
      <p className="mt-1 text-sm text-merchant-muted">{storeStatus.description}</p>

      <div className="mt-4 flex items-center justify-between gap-4 rounded-lg bg-merchant-input px-3.5 py-3">
        <span className="text-sm font-semibold text-merchant-ink">{storeStatus.pauseLabel}</span>
        <MerchantInventoryAvailabilityToggle
          enabled={paused}
          onChange={setPaused}
          label={storeStatus.pauseLabel}
        />
      </div>
    </section>
  )
}
