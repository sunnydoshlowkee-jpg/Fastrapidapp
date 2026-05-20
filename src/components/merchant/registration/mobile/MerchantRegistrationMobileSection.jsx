import { FileText, Lock, MapPin, Shield, Store, UserRound } from 'lucide-react'

const iconMap = {
  store: Store,
  user: UserRound,
  lock: Lock,
  shield: Shield,
  file: FileText,
  location: MapPin,
}

export default function MerchantRegistrationMobileSection({ section, children }) {
  const Icon = iconMap[section.icon] ?? Store

  return (
    <section className="rounded-merchant-stat bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="mb-4 flex items-center gap-2 border-b border-merchant-divider pb-3">
        <Icon size={16} className="text-merchant-primary" strokeWidth={1.75} aria-hidden />
        <h2 className="text-[11px] font-bold uppercase tracking-[0.08em] text-merchant-muted">
          {section.title}
        </h2>
      </div>
      <div className="space-y-4">{children}</div>
    </section>
  )
}
