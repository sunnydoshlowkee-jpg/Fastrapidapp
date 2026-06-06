import { Lightbulb } from 'lucide-react'

export default function MerchantMenuUploadHelp({ help, documentationUrl }) {
  return (
    <aside className="flex w-full max-w-[672px] gap-4 rounded-xl bg-merchant-input p-6">
      <Lightbulb size={15} strokeWidth={1.75} className="mt-0.5 shrink-0 text-merchant-warning" aria-hidden />
      <div className="min-w-0">
        <p className="text-sm font-semibold leading-5 text-merchant-ink">{help.title}</p>
        <p className="mt-1 text-xs leading-5 text-merchant-body">
          {help.bodyBefore}
          <a
            href={documentationUrl}
            className="font-semibold text-merchant-link hover:text-merchant-primary-dark hover:underline"
          >
            {help.linkLabel}
          </a>
          {help.bodyAfter}
        </p>
      </div>
    </aside>
  )
}
