import { Mail, MapPin, Phone, Store } from 'lucide-react'
import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'

function ContactRow({ icon: Icon, children }) {
  return (
    <div className="flex items-center gap-2.5 text-sm font-medium text-merchant-link">
      <Icon size={16} strokeWidth={1.75} className="shrink-0" aria-hidden />
      <span className="min-w-0 truncate">{children}</span>
    </div>
  )
}

export default function MerchantBusinessProfileMobileInfoCard({ businessInfo }) {
  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <div className="flex gap-3">
        {businessInfo.logoUrl ? (
          <img
            src={businessInfo.logoUrl}
            alt=""
            className="h-16 w-16 shrink-0 rounded-xl object-cover"
          />
        ) : (
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-[#1A1A1A] text-white/80">
            <Store size={24} strokeWidth={1.5} aria-hidden />
          </div>
        )}
        <div className="min-w-0 flex-1">
          <h2 className="text-base font-bold text-merchant-ink">{businessInfo.name}</h2>
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
