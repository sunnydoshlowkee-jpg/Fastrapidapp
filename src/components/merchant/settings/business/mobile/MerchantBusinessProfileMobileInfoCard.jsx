import { Mail, MapPin, Phone } from 'lucide-react'
import MerchantBusinessProfileLogo from '../MerchantBusinessProfileLogo'
import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'

function ContactRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-medium text-merchant-link">
      <Icon size={16} strokeWidth={1.75} className="shrink-0" aria-hidden />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

export default function MerchantBusinessProfileMobileInfoCard({ businessInfo, onLogoUpdated }) {
  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <div className="flex gap-3">
        <MerchantBusinessProfileLogo
          initialLogoUrl={businessInfo.logoUrl}
          onLogoUpdated={onLogoUpdated}
          sizeClass="h-16 w-16"
        />
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-merchant-ink">{businessInfo.name}</h2>
          {businessInfo.categoryLabel ? (
            <p className="mt-1 text-xs font-semibold uppercase tracking-[0.04em] text-merchant-primary">
              {businessInfo.categoryLabel}
            </p>
          ) : null}
          <p className="mt-1 text-sm leading-relaxed text-merchant-muted">{businessInfo.description}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3 rounded-lg bg-merchant-input p-3">
        <ContactRow icon={Mail}>{businessInfo.email}</ContactRow>
        <ContactRow icon={Phone}>{businessInfo.phone}</ContactRow>
        <ContactRow icon={MapPin}>{businessInfo.location}</ContactRow>
      </div>
    </section>
  )
}
