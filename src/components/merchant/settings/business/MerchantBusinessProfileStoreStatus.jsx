import { useState } from 'react'
import MerchantInventoryAvailabilityToggle from '../../inventory/list/MerchantInventoryAvailabilityToggle'
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

export default function MerchantBusinessProfileStoreStatus({ storeStatus }) {
  const [paused, setPaused] = useState(storeStatus.paused)

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
            onChange={setPaused}
            label={storeStatus.pauseLabel}
          />
        </div>
      </div>
    </section>
  )
}

