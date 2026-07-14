import { ShieldCheck } from 'lucide-react'

export default function MerchantOnboardingBankDetailsPanel({ panel }) {
  const { security, partnerLabel, imageUrl, insight } = panel

  return (
    <aside className="relative hidden overflow-hidden bg-merchant-input xl:flex xl:w-[min(420px,32vw)] xl:shrink-0 xl:flex-col">
      <div className="relative flex flex-1 flex-col p-8">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-merchant-nav-active text-merchant-primary">
            <ShieldCheck size={22} strokeWidth={1.75} aria-hidden />
          </span>
          <div>
            <h2 className="text-base font-bold text-merchant-ink">{security.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-merchant-body">{security.description}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-1 flex-col items-center justify-center rounded-merchant-stat bg-merchant-surface/80 p-6">
          <img
            src={imageUrl}
            alt=""
            className="max-h-40 w-full object-contain opacity-90"
          />
          <p className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-merchant-primary">
            <span className="h-1.5 w-1.5 rounded-full bg-merchant-primary" aria-hidden />
            {partnerLabel}
          </p>
        </div>

        <blockquote className="mt-8 border-l-4 border-merchant-primary bg-merchant-nav-active py-4 pl-4 pr-3">
          <p className="text-sm font-medium leading-relaxed text-merchant-ink">
            &ldquo;{insight.quote}&rdquo;
          </p>
          <footer className="mt-2 text-[10px] font-bold uppercase tracking-[0.12em] text-merchant-primary">
            — {insight.source}
          </footer>
        </blockquote>
      </div>
    </aside>
  )
}
