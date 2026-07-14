import { BadgeCheck, FileWarning } from 'lucide-react'

const config = {
  tier_3: { Icon: BadgeCheck, tone: 'text-emerald-600' },
  tier_2: { Icon: BadgeCheck, tone: 'text-emerald-600' },
  tier_1: { Icon: BadgeCheck, tone: 'text-gray-500' },
  docs_required: { Icon: FileWarning, tone: 'text-gray-500' },
}

export default function AdminMerchantVerificationCell({ verification, label }) {
  const { Icon, tone } = config[verification] ?? config.docs_required
  return (
    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700">
      <Icon size={16} className={tone} strokeWidth={2} aria-hidden />
      {label}
    </span>
  )
}
