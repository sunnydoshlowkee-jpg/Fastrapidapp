import { Check, Shield } from 'lucide-react'

export default function MerchantOnboardingBankDetailsEnterpriseCard({ panel }) {
  const { security, partnerLabel, imageUrl } = panel

  return (
    <article className="rounded-merchant-stat border border-merchant-divider bg-merchant-surface p-4 shadow-merchant-stat">
      <div className="flex items-start gap-2.5">
        <Shield size={20} strokeWidth={2} className="mt-0.5 shrink-0 text-merchant-warning" aria-hidden />
        <h2 className="text-[11px] font-bold uppercase leading-snug tracking-[0.08em] text-merchant-ink">
          {security.title}
        </h2>
      </div>
      <img
        src={imageUrl}
        alt=""
        className="mt-4 w-full rounded-lg object-cover"
        style={{ maxHeight: '11rem' }}
      />
      <p className="mt-3 text-sm leading-relaxed text-merchant-body">{security.description}</p>
      <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-merchant-input px-3 py-1.5">
        <Check size={14} strokeWidth={2.5} className="text-merchant-primary" aria-hidden />
        <span className="text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-ink">
          {partnerLabel}
        </span>
      </div>
    </article>
  )
}
