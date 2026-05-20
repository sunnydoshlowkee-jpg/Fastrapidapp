import { useState } from 'react'
import { ChevronDown, Send } from 'lucide-react'
import {
  merchantHelpSupportCardClass,
  merchantHelpSupportFieldClass,
  merchantHelpSupportLabelClass,
} from './merchantHelpSupportStyles'

export default function MerchantHelpSupportTicketForm({ ticket }) {
  const [category, setCategory] = useState(ticket.defaultCategory)
  const [subject, setSubject] = useState('')
  const [description, setDescription] = useState('')

  return (
    <section className={`${merchantHelpSupportCardClass} p-5 lg:p-6`}>
      <h2 className="text-lg font-bold text-merchant-ink">{ticket.title}</h2>
      <p className="mt-1.5 text-sm leading-relaxed text-merchant-muted">{ticket.intro}</p>

      <form
        className="mt-5 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <div>
          <label htmlFor="support-category" className={merchantHelpSupportLabelClass}>
            {ticket.fields.category}
          </label>
          <div className="relative mt-2">
            <select
              id="support-category"
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
          <label htmlFor="support-subject" className={merchantHelpSupportLabelClass}>
            {ticket.fields.subject}
          </label>
          <input
            id="support-subject"
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder={ticket.subjectPlaceholder}
            className={`${merchantHelpSupportFieldClass} mt-2`}
          />
        </div>

        <div>
          <label htmlFor="support-description" className={merchantHelpSupportLabelClass}>
            {ticket.fields.description}
          </label>
          <textarea
            id="support-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={ticket.descriptionPlaceholder}
            rows={5}
            className={`${merchantHelpSupportFieldClass} mt-2 resize-none`}
          />
        </div>

        <button
          type="submit"
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-merchant-primary px-4 py-3 text-sm font-semibold text-white shadow-merchant-btn transition-colors hover:bg-[#3837e6]"
        >
          <Send size={16} strokeWidth={2} aria-hidden />
          {ticket.submitLabel}
        </button>
      </form>

      <div className="mt-5 flex items-center gap-3 border-t border-merchant-divider pt-5">
        <div className="flex -space-x-2">
          {ticket.agents.map((agent) => (
            <span
              key={agent.id}
              className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-merchant-surface text-[10px] font-bold text-white"
              style={{ backgroundColor: agent.color }}
              aria-hidden
            >
              {agent.initials}
            </span>
          ))}
          <span className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-merchant-surface bg-merchant-input text-[10px] font-bold text-merchant-muted">
            +{ticket.extraAgentsCount}
          </span>
        </div>
        <p className="text-xs text-merchant-muted">{ticket.agentsOnlineLabel}</p>
      </div>
    </section>
  )
}
