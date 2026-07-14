const avatarTones = {
  blue: 'bg-[rgba(67,66,255,0.14)] text-merchant-primary',
  purple: 'bg-[rgba(139,92,246,0.14)] text-[#7C3AED]',
  teal: 'bg-[rgba(20,184,166,0.14)] text-[#0D9488]',
  pink: 'bg-[rgba(236,72,153,0.14)] text-[#DB2777]',
  amber: 'bg-[rgba(245,158,11,0.14)] text-[#D97706]',
  green: 'bg-[rgba(34,197,94,0.14)] text-[#16A34A]',
  indigo: 'bg-[rgba(99,102,241,0.14)] text-[#4F46E5]',
  rose: 'bg-[rgba(244,63,94,0.14)] text-[#E11D48]',
  slate: 'bg-merchant-icon-tile text-merchant-body',
  cyan: 'bg-[rgba(6,182,212,0.14)] text-[#0891B2]',
}

export default function MerchantOrdersCustomerCell({ customer }) {
  const tone = avatarTones[customer.avatarTone] || avatarTones.blue

  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <span
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[11px] font-bold ${tone}`}
        aria-hidden
      >
        {customer.initials}
      </span>
      <span className="truncate text-sm font-medium text-merchant-ink">{customer.name}</span>
    </div>
  )
}
