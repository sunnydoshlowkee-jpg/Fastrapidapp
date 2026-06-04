import { Check, Mail, MapPin, Phone, Store } from 'lucide-react'

function BusinessLogo({ businessInfo }) {
  if (businessInfo.logoUrl) {
    return (
      <img
        src={businessInfo.logoUrl}
        alt=""
        className="h-[72px] w-[72px] rounded-xl object-cover lg:h-20 lg:w-20"
      />
    )
  }

  return (
    <div className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-[#1A1A1A] text-white/80 lg:h-20 lg:w-20">
      <Store size={28} strokeWidth={1.5} aria-hidden />
    </div>
  )
}
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

function ContactItem({ icon: Icon, children }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-2 text-sm text-merchant-body">
      <Icon size={16} className="shrink-0 text-merchant-muted" strokeWidth={1.75} aria-hidden />
      <span className="truncate">{children}</span>
    </span>
  )
}

export default function MerchantBusinessProfileInfoCard({ businessInfo }) {
  return (
    <section className={`${merchantBusinessProfileCardClass} h-full`}>
      <div className="flex gap-4 lg:gap-5">
        <div className="relative shrink-0">
          <BusinessLogo businessInfo={businessInfo} />
          {businessInfo.verified && (
            <span
              className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-merchant-primary text-white ring-2 ring-merchant-surface"
              aria-label="Verified business"
            >
              <Check size={14} strokeWidth={3} />
            </span>
          )}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h2 className="text-base font-bold text-merchant-ink lg:text-lg">{businessInfo.name}</h2>
            {businessInfo.verified && (
              <span className="inline-flex rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-semibold text-emerald-700">
                {businessInfo.verifiedLabel}
              </span>
            )}
          </div>
          <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{businessInfo.description}</p>
        </div>
      </div>

      <div className="mt-5 space-y-3 border-t border-merchant-divider pt-5 lg:mt-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:gap-x-8 sm:gap-y-3">
          <ContactItem icon={Mail}>{businessInfo.email}</ContactItem>
          <ContactItem icon={Phone}>{businessInfo.phone}</ContactItem>
        </div>
        <ContactItem icon={MapPin}>{businessInfo.location}</ContactItem>
      </div>
    </section>
  )
}



