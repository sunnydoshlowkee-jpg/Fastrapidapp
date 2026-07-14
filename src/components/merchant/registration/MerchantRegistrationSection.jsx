import { FileText, Lock, MapPin, Shield, Store, UserRound } from 'lucide-react'

const iconMap = {
  store: Store,
  user: UserRound,
  lock: Lock,
  shield: Shield,
  file: FileText,
  location: MapPin,
}

export default function MerchantRegistrationSection({ section, children, variant = 'default' }) {
  const Icon = iconMap[section.icon] ?? Store
  const isSecurity = variant === 'security'
  const isRepresentative = variant === 'representative'

  if (isSecurity) {
    return (
      <section className="space-y-8 border-t border-[rgba(198,196,218,0.2)] pt-8">
        <div className="flex items-center gap-4">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-merchant-primary/10">
            <Icon size={16} className="text-merchant-link" strokeWidth={1.75} aria-hidden />
          </span>
          <h2 className="text-xl font-semibold leading-7 text-[#191C1D]">{section.title}</h2>
        </div>
        {children}
      </section>
    )
  }

  return (
    <section className={`space-y-7 ${isRepresentative ? 'pt-5' : ''}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} className="shrink-0 text-merchant-primary" strokeWidth={1.75} aria-hidden />
        <h2
          className={`text-xl leading-7 tracking-[-0.5px] text-merchant-ink ${
            isRepresentative ? 'font-bold' : 'font-normal'
          }`}
        >
          {section.title}
        </h2>
      </div>
      <div className="space-y-5">{children}</div>
    </section>
  )
}
