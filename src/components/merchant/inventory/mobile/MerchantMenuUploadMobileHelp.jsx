import { Info } from 'lucide-react'

export default function MerchantMenuUploadMobileHelp({ help }) {
  return (
    <aside className="flex gap-3 rounded-merchant-stat bg-merchant-input p-4">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-merchant-nav-active text-merchant-primary">
        <Info size={18} strokeWidth={2} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-merchant-ink">{help.title}</p>
        <p className="mt-1.5 text-sm leading-relaxed text-merchant-body">{help.body}</p>
      </div>
    </aside>
  )
}
