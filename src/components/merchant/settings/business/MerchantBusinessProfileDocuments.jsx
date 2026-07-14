import { Upload } from 'lucide-react'
import MerchantBusinessProfileDocumentRow from './MerchantBusinessProfileDocumentRow'
import { merchantBusinessProfileCardClass } from './merchantBusinessProfileCardStyles'

export default function MerchantBusinessProfileDocuments({ documents }) {
  return (
    <section className={merchantBusinessProfileCardClass}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0">
          <h2 className="text-base font-bold text-merchant-ink lg:text-lg">{documents.title}</h2>
          <p className="mt-1.5 max-w-2xl text-sm leading-relaxed text-merchant-muted">
            {documents.description}
          </p>
        </div>
        <button
          type="button"
          className="inline-flex shrink-0 items-center justify-center gap-2 self-start rounded-lg bg-merchant-input px-4 py-2.5 text-sm font-semibold text-merchant-ink transition-colors hover:bg-merchant-icon-tile"
        >
          <Upload size={16} strokeWidth={2} aria-hidden />
          {documents.uploadLabel}
        </button>
      </div>

      <ul className="mt-5 space-y-3 lg:mt-6">
        {documents.items.map((item) => (
          <MerchantBusinessProfileDocumentRow key={item.id} document={item} />
        ))}
      </ul>
    </section>
  )
}

