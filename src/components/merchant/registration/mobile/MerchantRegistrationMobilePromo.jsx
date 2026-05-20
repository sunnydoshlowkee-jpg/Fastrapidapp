import { Sparkles } from 'lucide-react'

export default function MerchantRegistrationMobilePromo({ promo }) {
  return (
    <aside className="rounded-merchant-stat bg-merchant-nav-active p-4">
      <Sparkles size={20} className="text-amber-500" strokeWidth={2} aria-hidden />
      <h2 className="mt-2 text-base font-bold text-merchant-link">{promo.title}</h2>
      <ul className="mt-3 space-y-1.5">
        {promo.highlights.map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-sm font-semibold text-merchant-primary"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-merchant-primary" aria-hidden />
            {item}
          </li>
        ))}
      </ul>
    </aside>
  )
}
