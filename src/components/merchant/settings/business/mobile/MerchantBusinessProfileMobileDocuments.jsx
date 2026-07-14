import { merchantBusinessProfileMobileCardClass } from './merchantBusinessProfileMobileCardStyles'
import MerchantBusinessProfileMobileDocumentRow from './MerchantBusinessProfileMobileDocumentRow'

export default function MerchantBusinessProfileMobileDocuments({ documents }) {
  return (
    <section className={merchantBusinessProfileMobileCardClass}>
      <h2 className="text-base font-bold text-merchant-ink">{documents.title}</h2>

      <ul className="mt-4 space-y-2.5">
        {documents.items.map((item) => (
          <MerchantBusinessProfileMobileDocumentRow key={item.id} document={item} />
        ))}
      </ul>
    </section>
  )
}
