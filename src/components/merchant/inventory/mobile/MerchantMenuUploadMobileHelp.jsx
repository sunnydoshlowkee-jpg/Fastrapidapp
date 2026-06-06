import { Info } from 'lucide-react'

export default function MerchantMenuUploadMobileHelp({ help }) {
  return (
    <aside className="flex gap-3 rounded-xl bg-merchant-input p-4">
      <Info size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-merchant-mobile-muted" aria-hidden />
      <div className="min-w-0">
        <p className="text-[13px] font-semibold leading-5 text-merchant-ink">{help.title}</p>
        <p className="mt-1 text-xs leading-5 text-merchant-mobile-muted">{help.body}</p>
      </div>
    </aside>
  )
}
