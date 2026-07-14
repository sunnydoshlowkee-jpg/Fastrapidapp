import { Bike, CreditCard, User } from 'lucide-react'

const sectionIcons = {
  personal: User,
  vehicle: Bike,
  payout: CreditCard,
}

export default function AdminRiderProfilePanel({ sections = [] }) {
  if (sections.length === 0) {
    return (
      <p className="px-6 py-12 text-center text-sm text-gray-500">No profile information available.</p>
    )
  }

  return (
    <div className="flex flex-col gap-6 p-6">
      {sections.map((section) => {
        const Icon = sectionIcons[section.id] ?? User

        return (
          <section
            key={section.id}
            className="rounded-xl border border-gray-100 bg-gray-50/60 p-5"
          >
            <div className="mb-4 flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-rapid-orange">
                <Icon size={16} strokeWidth={2} aria-hidden />
              </span>
              <h3 className="text-sm font-bold text-gray-900">{section.title}</h3>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {section.fields.map((field) => (
                <div key={`${section.id}-${field.label}`}>
                  <p className="text-[10px] font-bold uppercase tracking-wider text-gray-500">
                    {field.label}
                  </p>
                  {field.url ? (
                    <a
                      href={field.url}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-1 inline-block text-sm font-semibold text-rapid-orange hover:underline"
                    >
                      View file
                    </a>
                  ) : (
                    <p className="mt-1 text-sm font-semibold text-gray-900 break-words">
                      {field.value || '—'}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )
      })}
    </div>
  )
}
