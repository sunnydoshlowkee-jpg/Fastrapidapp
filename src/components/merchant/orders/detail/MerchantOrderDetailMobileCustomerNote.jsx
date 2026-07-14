import { MessageSquare } from 'lucide-react'

export default function MerchantOrderDetailMobileCustomerNote({ note }) {
  if (!note) return null

  return (
    <article className="flex gap-3 rounded-merchant-stat bg-merchant-input p-4 shadow-merchant-stat">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
        <MessageSquare size={18} strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-merchant-primary">
          Customer note
        </p>
        <p className="mt-1 text-sm font-medium text-merchant-ink">&ldquo;{note}&rdquo;</p>
      </div>
    </article>
  )
}
