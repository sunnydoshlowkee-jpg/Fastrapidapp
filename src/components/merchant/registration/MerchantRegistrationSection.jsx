import { FileText, Lock, MapPin, Shield, Store, UserRound } from 'lucide-react'

const iconMap = {
  store: Store,
  user: UserRound,
  lock: Lock,
  shield: Shield,
  file: FileText,
  location: MapPin,
}

export default function MerchantRegistrationSection({ section, children }) {
  const Icon = iconMap[section.icon] ?? Store

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2.5">
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <Icon size={18} strokeWidth={1.75} aria-hidden />
        </span>
        <div className="min-w-0">
          <h2 className="text-base font-bold text-merchant-ink">{section.title}</h2>
          {section.subtitle ? (
            <p className="mt-0.5 text-sm leading-relaxed text-merchant-muted">{section.subtitle}</p>
          ) : null}
        </div>
      </div>
      {children}
    </section>
  )
}
