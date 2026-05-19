import { Lightbulb } from 'lucide-react'

export default function MerchantMenuUploadHelp({ help, documentationUrl }) {
  return (
    <aside className="flex gap-4 rounded-merchant-stat bg-merchant-input p-5 md:p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-merchant-nav-active text-merchant-primary">
        <Lightbulb size={20} strokeWidth={1.75} aria-hidden />
      </div>
      <div className="min-w-0">
        <p className="text-sm font-bold text-merchant-ink">{help.title}</p>
        <p className="mt-2 text-sm leading-relaxed text-merchant-body">
          {help.bodyBefore}
          <a
            href={documentationUrl}
            className="font-semibold text-merchant-primary hover:text-[#3837e6] hover:underline"
          >
            {help.linkLabel}
          </a>
          {help.bodyAfter}
        </p>
      </div>
    </aside>
  )
}
