import { MapPin } from 'lucide-react'
import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'

export default function MerchantBusinessProfileMobileLocation({ location }) {
  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <h2 className="text-base font-bold text-merchant-ink">{location.title}</h2>

      <div
        className="relative mt-4 overflow-hidden rounded-lg bg-[#2B3038]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
        }}
      >
        <div className="flex aspect-[16/10] items-center justify-center">
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-merchant-primary text-white shadow-lg">
            <MapPin size={18} strokeWidth={2} aria-hidden />
          </span>
        </div>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-merchant-body">{location.address}</p>
    </section>
  )
}
