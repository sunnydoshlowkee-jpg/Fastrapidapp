import { Clock, Map as MapIcon, Mail, Phone, Workflow } from 'lucide-react'

function ContactIntelligence({ contact }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="text-base font-bold text-rapid-orange">{contact.title}</h3>

      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {contact.primaryOwnerLabel}
          </p>
          <p className="mt-1 text-sm font-bold text-gray-900">{contact.primaryOwner}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {contact.roleLabel}
          </p>
          <p className="mt-1 text-sm font-bold text-gray-900">{contact.role}</p>
        </div>

        <div className="flex gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rapid-orange">
            <Phone size={16} strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {contact.phoneLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.phone}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-orange-50 text-rapid-orange">
            <Mail size={16} strokeWidth={2} aria-hidden />
          </span>
          <div>
            <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
              {contact.emailLabel}
            </p>
            <p className="mt-0.5 text-sm font-semibold text-gray-900">{contact.email}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

function LocationData({ location }) {
  return (
    <section className="rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
      <h3 className="text-base font-bold text-rapid-orange">{location.title}</h3>
      <div className="mt-5 flex flex-wrap items-start justify-between gap-6">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {location.registeredAddressLabel}
          </p>
          <div className="mt-2 text-sm font-semibold text-gray-900">
            {location.lines.map((line) => (
              <p key={line}>{line}</p>
            ))}
          </div>
          <button
            type="button"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-xs font-semibold text-gray-700 transition-colors hover:bg-gray-200"
          >
            <MapIcon size={14} strokeWidth={2} aria-hidden />
            {location.viewMapLabel}
          </button>
        </div>
        <div
          className="h-28 w-32 shrink-0 rounded-lg bg-gray-900"
          style={{
            backgroundImage:
              'radial-gradient(ellipse at 60% 40%, rgba(255,255,255,0.18) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(255,255,255,0.08) 0%, transparent 40%)',
          }}
          aria-label="Map preview"
        />
      </div>
    </section>
  )
}

function OperatingHours({ hours }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
        <Clock size={16} className="text-gray-500" strokeWidth={2} aria-hidden />
        {hours.title}
      </h3>
      <ul className="mt-4 space-y-3 text-sm">
        {hours.rows.map((row) => (
          <li key={row.id} className="flex items-center justify-between gap-3">
            <span className="text-gray-600">{row.label}</span>
            <span className={`font-semibold ${row.tone ?? 'text-gray-800'}`}>{row.value}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}

function SystemMeta({ meta }) {
  return (
    <section className="rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-100">
      <h3 className="flex items-center gap-2 text-sm font-bold text-gray-900">
        <Workflow size={16} className="text-gray-500" strokeWidth={2} aria-hidden />
        {meta.title}
      </h3>
      <div className="mt-4 space-y-4 text-sm">
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {meta.onboardingDateLabel}
          </p>
          <p className="mt-0.5 font-semibold text-gray-900">{meta.onboardingDate}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {meta.lastSyncLabel}
          </p>
          <p className="mt-0.5 font-semibold text-gray-900">{meta.lastSync}</p>
        </div>
        <div>
          <p className="text-[11px] font-bold uppercase tracking-wider text-gray-500">
            {meta.apiVersionLabel}
          </p>
          <span className="mt-1 inline-flex items-center rounded-md bg-violet-100 px-2 py-0.5 text-xs font-bold text-violet-700">
            {meta.apiVersion}
          </span>
        </div>
      </div>
    </section>
  )
}

export default function AdminMerchantInfoPanel({ merchant }) {
  return (
    <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
      <div className="space-y-5 lg:col-span-2">
        <ContactIntelligence contact={merchant.contact} />
        <LocationData location={merchant.location} />
      </div>
      <div className="space-y-5">
        <OperatingHours hours={merchant.operatingHours} />
        <SystemMeta meta={merchant.systemMeta} />
      </div>
    </div>
  )
}
