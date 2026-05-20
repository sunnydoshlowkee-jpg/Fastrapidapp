import { useState } from 'react'
import { ChevronDown, Mail } from 'lucide-react'
import {
  merchantHelpSupportCardClass,
  merchantHelpSupportFieldClass,
  merchantHelpSupportLabelClass,
} from '../merchantHelpSupportStyles'

export default function MerchantHelpSupportMobileTicketForm({ ticket }) {
  const [category, setCategory] = useState(ticket.defaultCategory)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  return (
    <section className={`${merchantHelpSupportCardClass} p-4`}>
      <div className="flex items-center gap-2">
        <Mail size={18} className="text-merchant-primary" strokeWidth={1.75} aria-hidden />
        <h2 className="text-base font-bold text-merchant-ink">{ticket.title}</h2>
      </div>

      <form
        className="mt-4 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          <label htmlFor="mobile-support-category" className={merchantHelpSupportLabelClass}>
            {ticket.fields.category}
          </label>
          <div className="relative mt-2">
            <select
              id="mobile-support-category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className={`${merchantHelpSupportFieldClass} appearance-none pr-10`}
            >
              {ticket.categories.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-merchant-muted"
              aria-hidden
            />
          </div>
        </div>

        <div>
          <label htmlFor="mobile-support-subject" className={merchantHelpSupportLabelClass}>
            {ticket.fields.subject}
          </label>
          <input
            id="mobile-support-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={ticket.subjectPlaceholder}
            className={`${merchantHelpSupportFieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="mobile-support-description" className={merchantHelpSupportLabelClass}>
            {ticket.fields.description}
          </label>
          <textarea
            id="mobile-support-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={ticket.descriptionPlaceholder}
            rows={4}
            className={`${merchantHelpSupportFieldClass} mt-2 resize-none`}
          />
        </div>

        <button
          type="submit"
          className="w-full rounded-lg bg-merchant-primary py-3.5 text-sm font-semibold text-white shadow-merchant-btn"
        >
          {ticket.submitLabel}
        </button>
      </form>
    </section>
  )
}
