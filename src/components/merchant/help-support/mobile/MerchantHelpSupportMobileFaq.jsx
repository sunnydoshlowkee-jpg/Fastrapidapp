import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

export default function MerchantHelpSupportMobileFaq({ faq }) {
  const [openId, setOpenId] = useState(
    () => faq.items.find((item) => item.open)?.id ?? faq.items[0]?.id,
  )

  return (
    <section>
      <h2 className="text-base font-bold text-merchant-ink">{faq.title}</h2>

      <ul className="mt-3 space-y-2.5">
        {faq.items.map((item) => {
          const isOpen = openId === item.id

          return (
            <li key={item.id} className="overflow-hidden rounded-lg bg-merchant-input">
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-3 px-4 py-3.5 text-left"
                aria-expanded={isOpen}
              >
                <span className="text-sm font-semibold text-merchant-ink">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-merchant-muted transition-transform ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                  strokeWidth={2}
                  aria-hidden
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-3.5 pt-0">
                  <p className="text-sm leading-relaxed text-merchant-body">{item.answer}</p>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
