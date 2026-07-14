import { Lightbulb } from 'lucide-react'

export default function MerchantMenuItemCreateProTip({ proTip, compact = false }) {
  if (compact) {
    return (
      <aside className="flex gap-3 rounded-lg bg-merchant-input p-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
          <Lightbulb size={18} strokeWidth={1.75} aria-hidden />
        </div>
        <p className="text-xs leading-relaxed text-merchant-body">
          <span className="font-bold text-merchant-ink">{proTip.title}:</span>{' '}
          {proTip.body}
        </p>
      </aside>
    )
  }

  return (
    <aside className="flex gap-4 rounded-merchant-stat bg-merchant-nav-active/60 p-5 md:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
        <Lightbulb size={20} strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-merchant-ink">{proTip.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-merchant-body">{proTip.body}</p>
      </div>
    </aside>
  )
}
