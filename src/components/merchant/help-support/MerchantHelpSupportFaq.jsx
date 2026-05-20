import { useState } from 'react'
import { ChevronDown, FileText } from 'lucide-react'
import { merchantHelpSupportCardClass } from './merchantHelpSupportStyles'

export default function MerchantHelpSupportFaq({ faq }) {
  const [openId, setOpenId] = useState(
    () => faq.items.find((item) => item.open)?.id ?? faq.items[0]?.id,
  )

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <FileText size={18} className="text-merchant-primary" strokeWidth={1.75} aria-hidden />
        <h2 className="text-lg font-bold text-merchant-ink">{faq.title}</h2>
      </div>

      <ul className="space-y-2.5">
        {faq.items.map((item) => {
          const isOpen = openId === item.id

          return (
            <li key={item.id} className={`${merchantHelpSupportCardClass} overflow-hidden`}>
              <button
                type="button"
                onClick={() => setOpenId(isOpen ? null : item.id)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
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
                <div className="border-t border-merchant-divider px-5 pb-4 pt-1">
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
